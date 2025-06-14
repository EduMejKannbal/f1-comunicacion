ctrl_slidesMod1();
ctrl_avElem(1, 'estilosComunicacion', myAvance.ch1.estilosComunicacion, $(".btn_estilosComunicacion").length + 1, 'myglow_img_white', true);
autoNextSlide('module1', nSlides, ctrl_slidesMod1);

function ctrl_slidesMod1() {
  const $slides = $(".slide_module1");
  const totalSlides = $slides.length;
  const currentSlide = nSlides.numSlides;
  autoNextSlide('module1', nSlides, ctrl_slidesMod1);
  const $prevBtn = $("#module1_Prev");
  const $nextBtn = $("#module1_Next");
  $slides.hide();
  $("#slide_module1_" + currentSlide).show();
  console.log("#slide_module1_" + currentSlide);
  $prevBtn.show();
  $nextBtn.show();
  playAudio('module1_', currentSlide);

  if (currentSlide === 1) {
    $prevBtn.hide();
    $nextBtn.hide();
    reproducirHasta("vid_module1_1", 9.99);
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
  } else if (currentSlide === 2) {
    reproducirHasta("vid_module1_2", 4.99);
  } else if (currentSlide === 6) {
    $prevBtn.hide();
    $nextBtn.hide();
    if (testCompleted && myAvance.ch1.progress < 2) {
      myAvance.ch1.progress = 2; // Unlock Clasificación
      ctrl_menuAccess();
      showTestResults(testResults);
    }
  } else if (currentSlide === 7) {
    $prevBtn.hide();
    $nextBtn.hide();
    playAudio('module1_', currentSlide);
    reproducirHasta("vid_module1_7", 9.99);
    $('#aud_logro').get(0).play();
    if (myAvance.ch1.logro_llanta === 0) {
      myAvance.ch1.logro_llanta = 1;
    }
  } else if (currentSlide === 9) {
    if (myAvance.ch1.estilosComunicacion < $(".btn_estilosComunicacion").length + 1) {
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
    $('#aud_logro').get(0).play();
    if (myAvance.ch1.logro_casco === 0) {
      myAvance.ch1.logro_casco = 1;
      if (myAvance.ch1.progress < 3) {
        myAvance.ch1.progress = 3; // Unlock Cierre
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
    $('#aud_logro').get(0).play();
  }

  if (previousSlide === 5 && currentSlide !== 5) {
    restoreMusicAndIcon('1');
  }

  previousSlide = currentSlide;
}

$("#module1_Prev").click(() => {
  resetLocution();
  1 < nSlides.numSlides && nSlides.numSlides--;
  ctrl_slidesMod1();
  // $("#efct_next")[0].play();
});
$("#module1_Next").click(() => {
  resetLocution();
  $('.slide_module1').length > nSlides.numSlides && nSlides.numSlides++;
  ctrl_slidesMod1();
  // $("#efct_next")[0].play();
});


function calculateResults() {
  var totalSelections = selections.pantera + selections.pavorreal + selections.delfin + selections.buho;
  if (totalSelections === totalQuestions) {
    testResults = {
      pantera: Math.round((selections.pantera / totalQuestions) * 100),
      pavorreal: Math.round((selections.pavorreal / totalQuestions) * 100),
      delfin: Math.round((selections.delfin / totalQuestions) * 100),
      buho: Math.round((selections.buho / totalQuestions) * 100)
    };

    console.log("Resultados del Test:", testResults);
    testCompleted = true;
    nSlides.numSlides = 6;
    ctrl_slidesMod1();

    // 🔹 Detectar el tipo con mayor resultado
    let maxType = null;
    let maxValue = -1;

    for (let type in testResults) {
      if (testResults[type] > maxValue) {
        maxValue = testResults[type];
        maxType = type;
      }
    }

    myAvance.ganador = maxType;
    console.log("Ganador asignado a myAvance.ganador:", myAvance.ganador);

    // 🔹 Aplicar clase especial
    $('.cardTest').removeClass('mayor-resultado');
    const indexMap = { pantera: 1, pavorreal: 2, delfin: 3, buho: 4 };
    $(`.cardTest:nth-of-type(${indexMap[maxType]})`).addClass('mayor-resultado');

    // 🔹 Animar resultados
    animateCalif(".cardTest:nth-of-type(1) .testResult-text", testResults.pantera, 1500);
    animateCalif(".cardTest:nth-of-type(2) .testResult-text", testResults.pavorreal, 1500);
    animateCalif(".cardTest:nth-of-type(3) .testResult-text", testResults.delfin, 1500);
    animateCalif(".cardTest:nth-of-type(4) .testResult-text", testResults.buho, 1500);
  } else {
    console.log("Por favor responde todas las preguntas. Faltan " + (totalQuestions - totalSelections) + " preguntas por responder.");
  }
}

setupCarouselControls('test_1');
if (!testCompleted) {
  $(".body-answers > div > div").click(function () {
    if ($(this).hasClass('disabled'))
      return;

    var $thisDiv = $(this); // El div clicado
    var questionNum = $thisDiv.data('question');
    var type = $thisDiv.parent().data('type');
    var $questionOptions = $(".body-answers > div > div[data-question='" + questionNum + "']");
    // Deshabilitar todas las opciones de esta pregunta
    $questionOptions.addClass('disabled');
    $questionOptions.off('click');
    // Cambiar colores:
    $thisDiv.find('.answer-text').css('color', '#f8fafc');
    // - Otras opciones (deshabilitadas): #475569
    $questionOptions.not($thisDiv).find('.answer-text').css('color', '#475569');
    // Cambiar la imagen a "select.png" solo en el elemento clicado
    $thisDiv.find('img').attr('src', 'assets/img/modules/module-1/slide-4/test/answers/select.png');
    // Actualizar selecciones
    selections[type]++;
    userSelections[questionNum] = type; // Guardar la selección del usuario

    // Verificar si se han respondido todas las preguntas
    var totalSelections = selections.pantera + selections.pavorreal + selections.delfin + selections.buho;
    if (totalSelections === totalQuestions) {
      calculateResults();
    }
  });
}

function animateCalif(ptrClass, ptrTarget, ptrDuration, current = 0) {
  $({ Counter: current }).animate({ Counter: ptrTarget }, {
    duration: ptrDuration,
    easing: 'swing',
    step: function (now) {
      $(ptrClass).text(Math.ceil(now) + '%');
    }
  });
}

const cards = document.querySelectorAll('.cardTest');
for (let i = 0; i < cards.length; i++) {
  const card = cards[i];
  card.addEventListener('mousemove', rotate);
  card.addEventListener('mouseout', stopRotate)
}

function rotate(e) {
  const cardItem = this.querySelector('.cardTest-item');
  const halfHeight = cardItem.offsetHeight / 2;

  cardItem.style.transform =
    'rotateX(' + -(e.offsetY - halfHeight) / 7 + 'deg) rotateY(' + (e.offsetX - halfHeight) / 7 + 'deg)';
}

function stopRotate() {
  const cardItem = this.querySelector('.cardTest-item');
  cardItem.style.transform = 'rotate(0)';
}

const $buttons = $('.btn_estilosComunicacion');
const $container = $('#slide_module1_9');

// Crear dinámicamente las imágenes hover si no existen
$buttons.each(function () {
  var num = $(this).attr('id').split('_')[2];
  if ($('#hov_estilosComunicacion_' + num).length === 0) {
    $('<img>')
      .attr({ id: 'hov_estilosComunicacion_' + num, src: 'assets/img/modules/module-1/slide-9/no_' + num + '.png' })
      .addClass('absolute hov_estilosComunicacion')
      .appendTo($container);
  }
});

// Manejar el hover
$buttons.hover(
  function () {
    var num = $(this).attr('id').split('_')[2];
    const $hoverImg = $(`#hov_estilosComunicacion_${num}`);
    const $audio = $(`#aud_estilosComunicacion_${num}`)[0];

    // Ocultar todas las imágenes y remover animaciones
    $('.hov_estilosComunicacion').hide().removeClass('animated fadeInRight');
    // Mostrar la imagen correspondiente con animación
    $hoverImg.show().addClass('animated fadeInRight');
    // Efectos en botones
    $buttons.css('opacity', '0.5');
    $(this).css({ 'opacity': '1', 'transform': 'scale(1.05)' });

    // Reproducir el audio
    if ($audio) {
      $audio.currentTime = 0; // Reinicia el audio
      $audio.play();
    }
  },
  function () {
    var num = $(this).attr('id').split('_')[2];
    const $audio = $(`#aud_estilosComunicacion_${num}`)[0]; // Selecciona el audio correspondiente

    // Ocultar todas las imágenes y remover animaciones
    $('.hov_estilosComunicacion').hide().removeClass('animated fadeInRight');
    // Restaurar estilos de botones
    $buttons.css({ 'opacity': '1', 'transform': 'scale(1)' });

    // Pausar el audio y reiniciar
    if ($audio) {
      $audio.pause();
      $audio.currentTime = 0;
    }
  }
);


$buttons.click(function () {
  strID = $(this).attr('id').split("_")[2];
  pauseMusicAndUpdateIcon();
  console.log('#mod_estilosComunicacion_' + strID);
  $('#mod_estilosComunicacion_' + strID).show();
  $('#vid_estilosComunicacion_' + strID).get(0).play();
});

$('.cls_estilosComunicacion').click(function () {
  strID = $(this).attr('id').split("_")[2];
  $('#mod_estilosComunicacion_' + strID).fadeOut();
  var video = $('#vid_estilosComunicacion_' + strID).get(0);
  video.pause();
  video.currentTime = 0;

  if (strID >= myAvance.ch1.estilosComunicacion) {
    ctrl_avElem(1, 'estilosComunicacion', myAvance.ch1.estilosComunicacion, $(".btn_estilosComunicacion").length + 1, 'myglow_img_white', false);
  }
  ctrl_slidesMod1();
  restoreMusicAndIcon('1');
});


$('.module1_3-comenzar').click(function () {
  nSlides.numSlides = 5;
  ctrl_slidesMod1();
});


$('#btn_cls_slide7_modal').click(function () {
  nSlides.numSlides = 8;
  ctrl_slidesMod1();
});


$('#btn_cls_slide10_modal').click(function () {
  nSlides.numSlides = 11;
  ctrl_slidesMod1();
});


$('#btn_cls_slide12_modal').click(function () {
  nSlides.numSlides = 13;
  ctrl_slidesMod1();
});


$('#btn_res_cont').click(function () {
  nSlides.numSlides = 7;
  ctrl_slidesMod1();
});


$("#btn_finmod1").click(function () {
  myAvance.avModulos = 2;
  nSlides.numSlides = 1;
  if (myAvance.avModulos >= 2) {
    myAvance.ch1.trofeo_1 = 1;
  }
  pauseAllAudio();
  $(".music").addClass("hide");
  resetFondo(1, 2);
  $('#slide_index_1').show();
  $("#carga_materia").hide().empty();
  ctrl_AvGeneral(1, gAvMax);
  playModuleAudio(null);
  ctrl_menuAccess();
});


$('#btn_comenzarModule_1').click(function () {
  nSlides.numSlides = 2;
  ctrl_slidesMod1();
});


