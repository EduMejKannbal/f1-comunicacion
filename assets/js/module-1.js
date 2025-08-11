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
  autoNextSlide("module1", nSlides, ctrl_slidesMod1);
  const $prevBtn = $("#module1_Prev");
  const $nextBtn = $("#module1_Next");
  $slides.hide();
  $("#slide_module1_" + currentSlide).show();
  console.log("#slide_module1_" + currentSlide);
  $prevBtn.show();
  $nextBtn.show();

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
    reproducirHasta("vid_module1_1", 9.99);
  } else if (currentSlide === 2) {
    reproducirHasta("vid_module1_2", 4.99);
  } else if (currentSlide === 4) {
    reproducirHasta("vid_module1_4", 4.99);
    ctrl_carru_simple("test_1", nSlides.test_1);
    if (testCompleted) {
      restoreSelections();
    }
    $prevBtn.hide();
    $nextBtn.hide();
  } else if (currentSlide === 5) {
    if (testCompleted) {
      $prevBtn.show();
      $nextBtn.show();
    } else {
      $prevBtn.hide();
      $nextBtn.hide();
      pauseMusicAndUpdateIcon();
    }
  } else if (currentSlide === 6) {
    $prevBtn.hide();
    $nextBtn.hide();
    if (testCompleted && myAvance.ch1.progress < 2) {
      myAvance.ch1.progress = 2; // Unlock Clasificación
      localStorage.setItem("myAvance", JSON.stringify(myAvance));
      ctrl_menuAccess();
    }
    if (testCompleted && testResults) {
      showTestResults(testResults); // Restaurar resultados
    }
  } else if (currentSlide === 7) {
    $prevBtn.hide();
    $nextBtn.hide();
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
      localStorage.setItem("myAvance", JSON.stringify(myAvance));
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
    reproducirHasta("vid_module1_10", 4.99);
    $("#aud_logro").get(0).play();
    if (myAvance.ch1.logro_casco === 0) {
      myAvance.ch1.logro_casco = 1;
      if (myAvance.ch1.progress < 3) {
        myAvance.ch1.progress = 3; // Unlock Cierre
        localStorage.setItem("myAvance", JSON.stringify(myAvance));
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

setupCarouselControls("test_1");
$(".body-answers > div > div").click(function () {
  if (testCompleted) return;
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

const cards = document.querySelectorAll(".cardTest");
for (let i = 0; i < cards.length; i++) {
  const card = cards[i];
  card.addEventListener("mousemove", rotate);
  card.addEventListener("mouseout", stopRotate);
}

function rotate(e) {
  const cardItem = this.querySelector(".cardTest-item");
  const halfHeight = cardItem.offsetHeight / 2;

  cardItem.style.transform =
    "rotateX(" +
    -(e.offsetY - halfHeight) / 7 +
    "deg) rotateY(" +
    (e.offsetX - halfHeight) / 7 +
    "deg)";
}

function stopRotate() {
  const cardItem = this.querySelector(".cardTest-item");
  cardItem.style.transform = "rotate(0)";
}

const $buttons = $(".btn_estilosComunicacion");
const $container = $("#slide_module1_9");

// Crear dinámicamente las imágenes hover si no existen
$buttons.each(function () {
  var num = $(this).attr("id").split("_")[2];
  if ($("#hov_estilosComunicacion_" + num).length === 0) {
    $("<img>")
      .attr({
        id: "hov_estilosComunicacion_" + num,
        src: "assets/img/modules/module-1/slide-9/no_" + num + ".png",
      })
      .addClass("absolute hov_estilosComunicacion")
      .appendTo($container);
  }
});

// Manejar el hover
$buttons.hover(
  function () {
    var num = $(this).attr("id").split("_")[2];
    const $hoverImg = $(`#hov_estilosComunicacion_${num}`);
    const $audio = $(`#aud_estilosComunicacion_${num}`)[0];

    // Ocultar todas las imágenes y remover animaciones
    $(".hov_estilosComunicacion").hide().removeClass("animated fadeInRight");
    // Mostrar la imagen correspondiente con animación
    $hoverImg.show().addClass("animated fadeInRight");
    // Efectos en botones
    $buttons.css("opacity", "0.5");
    $(this).css({ opacity: "1", transform: "scale(1.05)" });

    // Reproducir el audio
    if ($audio) {
      $audio.currentTime = 0; // Reinicia el audio
      $audio.play();
    }
  },
  function () {
    var num = $(this).attr("id").split("_")[2];
    const $audio = $(`#aud_estilosComunicacion_${num}`)[0]; // Selecciona el audio correspondiente

    // Ocultar todas las imágenes y remover animaciones
    $(".hov_estilosComunicacion").hide().removeClass("animated fadeInRight");
    // Restaurar estilos de botones
    $buttons.css({ opacity: "1", transform: "scale(1)" });

    // Pausar el audio y reiniciar
    if ($audio) {
      $audio.pause();
      $audio.currentTime = 0;
    }
  }
);

$buttons.click(function () {
  strID = $(this).attr("id").split("_")[2];
  pauseMusicAndUpdateIcon();
  console.log("#mod_estilosComunicacion_" + strID);
  $("#mod_estilosComunicacion_" + strID).show();
  $("#vid_estilosComunicacion_" + strID)
    .get(0)
    .play();
});

$(".cls_estilosComunicacion").click(function () {
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
  localStorage.setItem("myAvance", JSON.stringify(myAvance)); // Save progress
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
