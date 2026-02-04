ctrl_slidesMod1();
ctrl_avElem(
  1,
  "estilosComunicacion",
  myAvance.ch1.estilosComunicacion,
  $(".btn_estilosComunicacion").length + 1,
  "myglow_img_white",
  true
);
autoNextSlide("module1", nSlides, ctrl_slidesMod1);

function ctrl_slidesMod1() {
  // Clear previous timeouts
  dismissTimeouts.forEach((timeout) => clearTimeout(timeout));
  dismissTimeouts = [];
  const $slides = $(".slide_module1");
  const totalSlides = $slides.length;
  const currentSlide = nSlides.numSlides;
  myAvance.ch1.lastSlide = currentSlide;
  saveProgress();
  const $prevBtn = $("#module1_Prev");
  const $nextBtn = $("#module1_Next");
  $slides.hide();
  $("#slide_module1_" + currentSlide).show();
  console.log("#slide_module1_" + currentSlide);
  $prevBtn.show();
  $nextBtn.show();
  $(".music").removeClass("hide");

  if (JUEGOS_AUDIO_SLIDES[1].includes(currentSlide)) {
    isPlaying = true;
  } else {
    isPlaying = false;
  }

  // Control de música de fondo
  manageSlideAudio(1, currentSlide);

  playAudio("module1_", currentSlide);
  //Control de elementos
  autoDismissElements(1, currentSlide);

  if (currentSlide === 1) {
    $prevBtn.hide();
    $nextBtn.hide();

    const video = $("#vid_module1_1");

    $("#slideM1_pista, #slideM1_title").hide();

    video.one("canplaythrough", function () {
      $("#slideM1_pista, #slideM1_title").show();
      reproducirHasta("vid_module1_1", 9.99);
      autoNextSlide("module1", nSlides, ctrl_slidesMod1);
    });
  } else if (currentSlide === 2) {
    $prevBtn.hide();
    reproducirHasta("vid_module1_2", 4.99);
  } else if (currentSlide === 4) {
    reproducirHasta("vid_module1_4", 4.99);
    ctrl_carru_simple("test_1", nSlides.test_1);
    if (myAvance.testCompleted) {
      restoreSelections();
    }
    $prevBtn.hide();
    $nextBtn.hide();
  } else if (currentSlide === 5) {
    if (myAvance.testCompleted) {
      $prevBtn.show();
      $nextBtn.show();
    } else {
      $prevBtn.hide();
      $nextBtn.hide();
    }
  } else if (currentSlide === 6) {
    $prevBtn.hide();
    $nextBtn.hide();
    if (myAvance.testCompleted && myAvance.ch1.progress < 2) {
      myAvance.ch1.progress = 2; // Unlock Clasificación
      // localStorage.setItem("myAvance", JSON.stringify(myAvance));
      saveProgress();
      ctrl_menuAccess();
    }
    if (myAvance.testCompleted && myAvance.testResults) {
      showTestResults(testResults); // Restaurar resultados
    }
  } else if (currentSlide === 7) {
    $prevBtn.hide();
    $nextBtn.hide();
    $(".music").addClass("hide");
    playAudio("module1_", currentSlide);
    reproducirHasta("vid_module1_7", 8.99);
    setTimeout(() => {
      const logroAudio = $("#aud_logro").get(0);
      if (logroAudio) {
        logroAudio.volume = 0.3;
        logroAudio.muted = false;
        logroAudio.currentTime = 0;
        logroAudio
          .play()
          .catch((err) => console.warn("Error playing aud_logro:", err));
      }
    }, 100);
    if (myAvance.ch1.logro_llanta === 0) {
      myAvance.ch1.logro_llanta = 1;
      // localStorage.setItem("myAvance", JSON.stringify(myAvance));
      saveProgress();
    }
  } else if (currentSlide === 9) {
    if (
      myAvance.ch1.estilosComunicacion <
      $(".btn_estilosComunicacion").length + 1
    ) {
      $prevBtn.show();
      $nextBtn.hide();
    } else {
      $prevBtn.show();
      $nextBtn.show();
    }
  } else if (currentSlide === 10) {
    $prevBtn.hide();
    $nextBtn.hide();
    $(".music").addClass("hide");
    reproducirHasta("vid_module1_10", 4.99);
    $("#aud_logro").get(0).play();
    if (myAvance.ch1.logro_casco === 0) {
      myAvance.ch1.logro_casco = 1;
      if (myAvance.ch1.progress < 3) {
        myAvance.ch1.progress = 3; // Unlock Cierre
        // localStorage.setItem("myAvance", JSON.stringify(myAvance));
        saveProgress();
        ctrl_menuAccess();
      }
    }
  } else if (currentSlide === 12) {
    $prevBtn.hide();
    $nextBtn.hide();
    reproducirHasta("vid_module1_12", 9.99);
  } else if (currentSlide === totalSlides) {
    $prevBtn.show();
    $nextBtn.hide();
    $(".music").addClass("hide");
    reproducirHasta("vid_module1_13", 8.99);
    $("#aud_logro").get(0).play();
  }
}

$("#module1_Prev").click(() => {
  resetLocution();
  1 < nSlides.numSlides && nSlides.numSlides--;
  ctrl_slidesMod1();
  // $("#efct_next")[0].play();
});
$("#module1_Next").click(() => {
  resetLocution();
  $(".slide_module1").length > nSlides.numSlides && nSlides.numSlides++;
  ctrl_slidesMod1();
  // $("#efct_next")[0].play();
});
$("#btn_mod_juego_1").click(function () {
  $("#mod_juego_1").fadeOut(150);
  $(".modal-backdrop").fadeOut(150);
});
setupCarouselControls("test_1");
$(".body-answers > div > div").click(function () {
  if (myAvance.testCompleted) return;
  if ($(this).hasClass("disabled")) return;

  var $thisDiv = $(this);
  var questionNum = $thisDiv.data("question");
  var type = $thisDiv.parent().data("type");
  var $questionOptions = $(
    ".body-answers > div > div[data-question='" + questionNum + "']"
  );

  // Restaurar colores e imágenes para todas las opciones
  $questionOptions.find(".answer-text").css("color", "#475569");
  $questionOptions
    .find("img")
    .attr(
      "src",
      "assets/img/modules/module-1/slide-4/test/answers/default.png"
    );

  // Marcar esta opción como seleccionada
  $thisDiv.find(".answer-text").css("color", "#f8fafc");
  $thisDiv
    .find("img")
    .attr("src", "assets/img/modules/module-1/slide-4/test/answers/select.png");

  // Restar selección anterior (si la había)
  var prevType = userSelections[questionNum];
  if (prevType !== undefined && selections[prevType] > 0) {
    selections[prevType]--;
  }

  // Sumar nueva selección
  selections[type]++;
  userSelections[questionNum] = type;

  // Verificar si se han respondido todas las preguntas
  var totalSelections =
    selections.pantera +
    selections.pavorreal +
    selections.delfin +
    selections.buho;
  if (totalSelections === totalQuestions) {
    calculateResults();
  }
});

function animateCalif(ptrClass, ptrTarget, ptrDuration, current = 0) {
  $({ Counter: current }).animate(
    { Counter: ptrTarget },
    {
      duration: ptrDuration,
      easing: "swing",
      step: function (now) {
        $(ptrClass).text(Math.ceil(now) + "%");
      },
    }
  );
}

$("#hotspot_1").on({
  mouseenter: function () {
    if (1 <= myAvance.ch1.estilosComunicacion) {
      $("#hov_estilosComunicacion_1").show().addClass("animated fadeInRight");
      $(".btn_estilosComunicacion").css("opacity", "0.5");
      $("#btn_estilosComunicacion_1").css({
        opacity: "1",
        transform: "scale(1.05)",
      });
      const audio = $("#aud_menuOver")[0];
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    }
  },
  mouseleave: function () {
    if (1 <= myAvance.ch1.estilosComunicacion) {
      $("#hov_estilosComunicacion_1")
        .hide()
        .removeClass("animated fadeInRight");
      $(".btn_estilosComunicacion").css({
        opacity: "1",
        transform: "scale(1)",
      });
      const audio = $("#aud_menuOver")[0];
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    }
  },
  click: function () {
    if (1 <= myAvance.ch1.estilosComunicacion) {
      saveFlagMus();
      pauseAllAudio();
      $(".music").addClass("hide");
      $("#mod_estilosComunicacion_1").show();
      $("#vid_estilosComunicacion_1").get(0).play();
    }
  },
});

$("#hotspot_2").on({
  mouseenter: function () {
    if (2 <= myAvance.ch1.estilosComunicacion) {
      $("#hov_estilosComunicacion_2").show().addClass("animated fadeInRight");
      $(".btn_estilosComunicacion").css("opacity", "0.5");
      $("#btn_estilosComunicacion_2").css({
        opacity: "1",
        transform: "scale(1.05)",
      });
      const audio = $("#aud_menuOver")[0];
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    }
  },
  mouseleave: function () {
    if (2 <= myAvance.ch1.estilosComunicacion) {
      $("#hov_estilosComunicacion_2")
        .hide()
        .removeClass("animated fadeInRight");
      $(".btn_estilosComunicacion").css({
        opacity: "1",
        transform: "scale(1)",
      });
      const audio = $("#aud_menuOver")[0];
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    }
  },
  click: function () {
    if (2 <= myAvance.ch1.estilosComunicacion) {
      saveFlagMus();
      pauseAllAudio();
      $(".music").addClass("hide");
      $("#mod_estilosComunicacion_2").show();
      $("#vid_estilosComunicacion_2").get(0).play();
    }
  },
});

$("#hotspot_3").on({
  mouseenter: function () {
    if (3 <= myAvance.ch1.estilosComunicacion) {
      $("#hov_estilosComunicacion_3").show().addClass("animated fadeInRight");
      $(".btn_estilosComunicacion").css("opacity", "0.5");
      $("#btn_estilosComunicacion_3").css({
        opacity: "1",
        transform: "scale(1.05)",
      });
      const audio = $("#aud_menuOver")[0];
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    }
  },
  mouseleave: function () {
    if (3 <= myAvance.ch1.estilosComunicacion) {
      $("#hov_estilosComunicacion_3")
        .hide()
        .removeClass("animated fadeInRight");
      $(".btn_estilosComunicacion").css({
        opacity: "1",
        transform: "scale(1)",
      });
      const audio = $("#aud_menuOver")[0];
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    }
  },
  click: function () {
    if (3 <= myAvance.ch1.estilosComunicacion) {
      saveFlagMus();
      pauseAllAudio();
      $(".music").addClass("hide");
      $("#mod_estilosComunicacion_3").show();
      $("#vid_estilosComunicacion_3").get(0).play();
    }
  },
});

$("#hotspot_4").on({
  mouseenter: function () {
    if (4 <= myAvance.ch1.estilosComunicacion) {
      $("#hov_estilosComunicacion_4").show().addClass("animated fadeInRight");
      $(".btn_estilosComunicacion").css("opacity", "0.5");
      $("#btn_estilosComunicacion_4").css({
        opacity: "1",
        transform: "scale(1.05)",
      });
      const audio = $("#aud_menuOver")[0];
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    }
  },
  mouseleave: function () {
    if (4 <= myAvance.ch1.estilosComunicacion) {
      $("#hov_estilosComunicacion_4")
        .hide()
        .removeClass("animated fadeInRight");
      $(".btn_estilosComunicacion").css({
        opacity: "1",
        transform: "scale(1)",
      });
      const audio = $("#aud_menuOver")[0];
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    }
  },
  click: function () {
    if (4 <= myAvance.ch1.estilosComunicacion) {
      saveFlagMus();
      pauseAllAudio();
      $(".music").addClass("hide");
      $("#mod_estilosComunicacion_4").show();
      $("#vid_estilosComunicacion_4").get(0).play();
    }
  },
});

$(".cls_estilosComunicacion").click(function () {
  $(".music").removeClass("hide");
  strID = $(this).attr("id").split("_")[2];
  $("#mod_estilosComunicacion_" + strID).fadeOut();
  var video = $("#vid_estilosComunicacion_" + strID).get(0);
  video.pause();
  video.currentTime = 0;

  if (strID >= myAvance.ch1.estilosComunicacion) {
    ctrl_avElem(
      1,
      "estilosComunicacion",
      myAvance.ch1.estilosComunicacion,
      $(".btn_estilosComunicacion").length + 1,
      "myglow_img_white",
      false
    );
  }
  ctrl_slidesMod1();
  restoreMusicAndIcon("1");
});

$(".module1_3-comenzar").click(function () {
  nSlides.numSlides = 5;
  ctrl_slidesMod1();
});

$("#btn_cls_slide7_modal").click(function () {
  nSlides.numSlides = 8;
  ctrl_slidesMod1();
});

$("#btn_cls_slide10_modal").click(function () {
  nSlides.numSlides = 11;
  ctrl_slidesMod1();
});

$("#btn_cls_slide12_modal").click(function () {
  nSlides.numSlides = 13;
  ctrl_slidesMod1();
});

$("#btn_res_cont").click(function () {
  nSlides.numSlides = 7;
  ctrl_slidesMod1();
});

$("#btn_finmod1").click(function () {
  resetLocution();
  nSlides.numSlides = 1;
  if (myAvance.avModulos <= 2) {
    myAvance.avModulos = 2;
    myAvance.ch1.trofeo_1 = 1;
    ctrl_menuAccess();
  }
  myAvance.ch1.isCompleted = true;
  resetModuleProgress("1");
  pauseAllAudio();
  $(".music").removeClass("hide");

  resetFondo(1, 2);
  $("#slide_index_1").show();
  $("#carga_materia").hide().empty();
  ctrl_AvGeneral(1, gAvMax);
  playModuleAudio(null);
  playBackgroundHome();
  saveProgress();
  // localStorage.setItem("myAvance", JSON.stringify(myAvance)); // Save progress
});

$("#btn_comenzarModule_1").click(function () {
  nSlides.numSlides = 2;
  ctrl_slidesMod1();
});

$(".elem_click_reto").click(function () {
  const audio = $("#efct_clic_jue")[0];
  audio.currentTime = 0;
  audio.play().catch((err) => {
    console.warn("No se pudo reproducir el audio:", err);
  });
});
