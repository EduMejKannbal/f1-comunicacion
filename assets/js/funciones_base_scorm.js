var startTimeStamp = null,
  processedUnload = false,
  reachedEnd = false;
var strAvance = null,
  my_user_id = null,
  user_name = null;

function doStart() {
  localStorage.clear();
  console.log("entra doStart");
  startTimeStamp = new Date();
  ScormProcessInitialize();
  strAvance = ScormProcessGetValue("cmi.suspend_data");
  my_user_id = ScormProcessGetValue("cmi.core.student_id");
  user_name = ScormProcessGetValue("cmi.core.student_name");
  console.log("El ID del usuario es: " + my_user_id);
  var completionStatus = ScormProcessGetValue("cmi.core.lesson_status");
  console.log("el valor de completionStatus es: " + completionStatus);
  if (completionStatus === "not attempted") {
    ScormProcessSetValue("cmi.core.lesson_status", "incomplete");

    myAvance = {
      avModulos: 1,
      g_avance: 0,
      ganador: null,
      flagMus: 1,
      ch1: {
        estilosComunicacion: 1,
        logro_llanta: 0,
        logro_casco: 0,
        trofeo_1: 0,
        progress: 1,
        lastSlide: 1,
        isCompleted: false,
      },
      ch2: {
        comic: 1,
        preg_1: null,
        preg_2: null,
        preg_3: null,
        preg_4: null,
        logro_guantes: 0,
        logro_traje: 0,
        logro_zapatos: 0,
        trofeo_2: 0,
        progress: 1,
        vidMod2_3_visto: 0,
        lastSlide: 1,
        isCompleted: false,
      },
      ch3: {
        vidManEm: 1,
        impactBio: 1,
        caracter: 1,
        vidTemp: 1,
        trofeoModal: 1,
        logro_llantas2: 0,
        logro_volante: 0,
        finish_juego: 0,
        trofeo_3: 0,
        progress: 1,
        lastSlide: 1,
        isCompleted: false,
      },
    };
    save_Status();
    ctrl_AvGeneral();
  } else if (completionStatus === "incomplete") {
    if (strAvance !== "" || strAvance !== null) {
      load_strAvance();
    }
  } else if (
    completionStatus === "completed" ||
    completionStatus === "passed"
  ) {
    reachedEnd = true;
    console.log("Ya haz completado la actividad con éxito");
    load_strAvance();
  }
}

function save_Status() {
  if (typeof myAvance !== "undefined") {
    const avanceData = JSON.stringify(myAvance);
    console.log("Guardando progreso (JSON):", avanceData);
    ScormProcessSetValue("cmi.suspend_data", avanceData);
  } else {
    console.error("El objeto 'myAvance' no está definido al intentar guardar.");
  }
}

function load_strAvance() {
  if (strAvance && strAvance !== "" && strAvance !== "null") {
    try {
      myAvance = JSON.parse(strAvance);
      console.log("Progreso cargado y parseado:", myAvance);
    } catch (e) {
      console.error(
        "Error al parsear strAvance (datos corruptos):",
        strAvance,
        e
      );
    }
  } else {
    console.log(
      "No se encontró progreso guardado (strAvance está vacío). Empezando de nuevo."
    );
  }
  if (myAvance.testResults) {
    testResults = myAvance.testResults;
    userSelections = myAvance.userSelections;
    testCompleted = myAvance.testCompleted;
    selections = {
      pantera: Object.values(userSelections).filter((val) => val === "pantera")
        .length,
      pavorreal: Object.values(userSelections).filter(
        (val) => val === "pavorreal"
      ).length,
      delfin: Object.values(userSelections).filter((val) => val === "delfin")
        .length,
      buho: Object.values(userSelections).filter((val) => val === "buho")
        .length,
    };
  }

  if (myAvance.avModulos == 4) {
    $("#btn_salir").css({ display: "block", "pointer-events": "auto" });
  } else {
    $("#btn_salir").css({ display: "none", "pointer-events": "none" });
  }

  $(".music").addClass("hide").attr("src', 'assets/img/icons/icon.png");
  if (myAvance.flagMus) {
    if (myAvance.flagMus === 0) {
      $(".music").attr("src", "assets/img/icons/off.png");
    } else {
      $(".music").attr("src", "assets/img/icons/on.png");
    }
  }

  gsap.registerPlugin(
    Flip,
    ScrollTrigger,
    Observer,
    ScrollToPlugin,
    Draggable,
    MotionPathPlugin,
    EaselPlugin,
    PixiPlugin,
    TextPlugin,
    RoughEase,
    ExpoScaleEase,
    SlowMo,
    CustomEase
  );

  // const cards = document.querySelectorAll(".cardTest");
  // for (let i = 0; i < cards.length; i++) {
  //   const card = cards[i];
  //   card.addEventListener("mousemove", rotate);
  //   card.addEventListener("mouseout", stopRotate);
  // }

  setupCarouselControls("test_1");
  ctrl_menuAccess();
  ctrl_AvGeneral(myAvance.avModulos, 4);

  if (!testCompleted) {
    $(".body-answers > div > div").click(function () {
      if ($(this).hasClass("disabled")) return;
      const $this = $(this);
      const questionNum = parseInt($this.data("question"));
      const type = $this.parent().data("type");
      const $questionOptions = $(
        `.body-answers > div > div[data-question="${questionNum}"]`
      );
      $questionOptions.addClass("disabled");
      $questionOptions.off("click");
      $this.find(".answer-text").css("color", "#f8fafc");
      $questionOptions.not($this).find(".answer-text").css("color", "#475569");
      $this
        .find("img")
        .attr(
          "src",
          "assets/img/modules/module-1/slide-4/test/answers/select.png"
        );
      selections[type]++;
      userSelections[questionNum] = type;
      console.log(
        "Pregunta",
        questionNum,
        "seleccionada:",
        type,
        "Selections:",
        selections,
        "User selections:",
        userSelections
      );
      // localStorage.setItem("userSelections", JSON.stringify(userSelections));
      myAvance = { ...myAvance, userSelections };
      const totalSelections =
        selections.pantera +
        selections.pavorreal +
        selections.delfin +
        selections.buho;
      if (totalSelections === totalQuestions) {
        calculateResults();
      }
    });
  } else {
    restoreSelections();
  }
}

function setComplete() {
  ScormProcessSetValue("cmi.core.lesson_status", "completed");
  ScormProcessSetValue("cmi.core.score.raw", 100);
  ScormProcessSetValue("cmi.core.score.min", "0");
  ScormProcessSetValue("cmi.core.score.max", "100");
  reachedEnd = true;
  doExit();
}

// function setComplete() {
//   try {
//     if (typeof API !== "undefined" && API !== null) {
//       API.LMSSetValue("cmi.core.lesson_status", "completed");
//       API.LMSCommit("");
//     } else if (typeof API_1484_11 !== "undefined" && API_1484_11 !== null) {
//       API_1484_11.SetValue("cmi.completion_status", "completed");
//       API_1484_11.Commit("");
//     } else {
//       console.warn("SCORM API no detectada");
//     }
//   } catch (e) {
//     console.error("Error al marcar como completado:", e);
//   }
// }

function doExit() {
  //note use of short-circuit AND. If the user reached the end, don't prompt.
  //just exit normally and submit the results.
  if (
    reachedEnd === false &&
    confirm("Would you like to save your progress to resume later?")
  ) {
    //set exit to suspend
    ScormProcessSetValue("cmi.core.exit", "suspend");
  } else {
    //set exit to normal
    ScormProcessSetValue("cmi.core.exit", "");
  }
  //process the unload handler to close out the session.
  //the presense of an adl.nav.request will cause the LMS to
  //take the content away from the user.
  doUnload(false);

  // Espera 3 segundos y si el usuario sigue en la ventana, muestra alerta
  setTimeout(() => {
    if (!window.closed && document.visibilityState === "visible") {
      alert(
        "Tu progreso se ha guardado, pero parece que el LMS no cerró el contenido.\nPor favor, cierra esta ventana manualmente."
      );
    }
  }, 3000);
}

function RecordTest(score) {
  ScormProcessSetValue("cmi.core.score.raw", score);
  ScormProcessSetValue("cmi.core.score.min", "0");
  ScormProcessSetValue("cmi.core.score.max", "100");
  //if we get a test result, set the lesson status to passed/failed instead of completed
  //consider 70% to be passing
  if (score >= 70) {
    ScormProcessSetValue("cmi.core.lesson_status", "passed");
  } else {
    ScormProcessSetValue("cmi.core.lesson_status", "failed");
  }
}

function doUnload(pressedExit) {
  console.log("entra doUnload");
  //don't call this function twice
  if (processedUnload == true) {
    return;
  }
  processedUnload = true;
  //record the session time
  var endTimeStamp = new Date();
  var totalMilliseconds = endTimeStamp.getTime() - startTimeStamp.getTime();
  var scormTime = ConvertMilliSecondsToSCORMTime(totalMilliseconds, false);
  console.log("scormTime " + scormTime);
  ScormProcessSetValue("cmi.core.session_time", scormTime);
  //if the user just closes the browser, we will default to saving
  //their progress data. If the user presses exit, he is prompted.
  //If the user reached the end, the exit normall to submit results.
  if (pressedExit == false && reachedEnd == false) {
    ScormProcessSetValue("cmi.core.exit", "suspend");
  }

  ScormProcessFinish();
}

//onbeforeunload="doUnload(false);" onunload="doUnload();
document.body.onbeforeunload = function () {
  save_Status();
  window.scrollTo(0, 0);
  doUnload(false);
};
document.body.addEventListener("unload", doUnload);

function ConvertMilliSecondsToSCORMTime(
  intTotalMilliseconds,
  blnIncludeFraction
) {
  var intHours,
    intintMinutes,
    intSeconds,
    intMilliseconds,
    intHundredths,
    strCMITimeSpan;

  if (blnIncludeFraction == null || blnIncludeFraction == undefined) {
    blnIncludeFraction = true;
  }

  //extract time parts
  intMilliseconds = intTotalMilliseconds % 1000;
  intSeconds = ((intTotalMilliseconds - intMilliseconds) / 1000) % 60;
  intMinutes =
    ((intTotalMilliseconds - intMilliseconds - intSeconds * 1000) / 60000) % 60;
  intHours =
    (intTotalMilliseconds -
      intMilliseconds -
      intSeconds * 1000 -
      intMinutes * 60000) /
    3600000;

  /*
   deal with exceptional case when content used a huge amount of time and interpreted CMITimstamp 
   to allow a number of intMinutes and seconds greater than 60 i.e. 9999:99:99.99 instead of 9999:60:60:99
   note - this case is permissable under SCORM, but will be exceptionally rare
   */

  if (intHours == 10000) {
    intHours = 9999;
    intMinutes = (intTotalMilliseconds - intHours * 3600000) / 60000;
    if (intMinutes == 100) {
      intMinutes = 99;
    }
    intMinutes = Math.floor(intMinutes);
    intSeconds =
      (intTotalMilliseconds - intHours * 3600000 - intMinutes * 60000) / 1000;
    if (intSeconds == 100) {
      intSeconds = 99;
    }
    intSeconds = Math.floor(intSeconds);
    intMilliseconds =
      intTotalMilliseconds -
      intHours * 3600000 -
      intMinutes * 60000 -
      intSeconds * 1000;
  }
  //drop the extra precision from the milliseconds
  intHundredths = Math.floor(intMilliseconds / 10);
  //put in padding 0's and concatinate to get the proper format
  strCMITimeSpan =
    ZeroPad(intHours, 4) +
    ":" +
    ZeroPad(intMinutes, 2) +
    ":" +
    ZeroPad(intSeconds, 2);

  if (blnIncludeFraction) {
    strCMITimeSpan += "." + intHundredths;
  }
  //check for case where total milliseconds is greater than max supported by strCMITimeSpan
  if (intHours > 9999) {
    strCMITimeSpan = "9999:99:99";
    if (blnIncludeFraction) {
      strCMITimeSpan += ".99";
    }
  }
  return strCMITimeSpan;
}

function ZeroPad(intNum, intNumDigits) {
  var strTemp;
  var intLen;
  var i;

  strTemp = new String(intNum);
  intLen = strTemp.length;

  if (intLen > intNumDigits) {
    strTemp = strTemp.substr(0, intNumDigits);
  } else {
    for (i = intLen; i < intNumDigits; i++) {
      strTemp = "0" + strTemp;
    }
  }
  return strTemp;
}
