// Inicialización del módulo 1
ctrl_slidesMod1();
ctrl_avElem(1, 'estilosComunicacion', myAvance.ch1.estilosComunicacion, $(".btn_estilosComunicacion").length + 1, 'myglow_img_white', true);
autoNextSlide('module1', nSlides, ctrl_slidesMod1);

function ctrl_slidesMod1() {
  // Clear previous timeouts
  dismissTimeouts.forEach(timeout => clearTimeout(timeout));
  dismissTimeouts = [];

  const $slides = $(".slide_module1");
  const totalSlides = $slides.length;
  let currentSlide = nSlides.numSlides;

  // Validar que la diapositiva actual sea accesible según el progreso
  const section = MODULE_CONFIG[1].sections.find(s => s.slide === currentSlide);
  if (section && section.id > myAvance.ch1.progress) {
    console.warn(`[ctrl_slidesMod1] Intento de acceder a diapositiva ${currentSlide} (sección ${section.id}) no desbloqueada. Redirigiendo a la última sección desbloqueada.`);
    currentSlide = MODULE_CONFIG[1].sections.find(s => s.id === myAvance.ch1.progress)?.slide || 1;
    nSlides.numSlides = currentSlide;
  }

  autoNextSlide('module1', nSlides, ctrl_slidesMod1);
  const $prevBtn = $("#module1_Prev");
  const $nextBtn = $("#module1_Next");
  $slides.hide();
  $(`#slide_module1_${currentSlide}`).show();
  console.log(`[ctrl_slidesMod1] Mostrando diapositiva: #slide_module1_${currentSlide}`);

  // Control de música de fondo
  controlBackgroundMusic(1, currentSlide);
  playAudio('module1_', currentSlide);
  // Control de elementos
  autoDismissElements(1, currentSlide);

  $prevBtn.show();
  $nextBtn.show();

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
      localStorage.setItem('myAvance', JSON.stringify(myAvance));
      console.log("[ctrl_slidesMod1] Progreso actualizado: ch1.progress = 2");
      ctrl_menuAccess();
    }
    if (testCompleted && testResults) {
      showTestResults(testResults); // Restaurar resultados
    }
  } else if (currentSlide === 7) {
    $prevBtn.hide();
    $nextBtn.hide();
    reproducirHasta("vid_module1_7", 8.99);
    playAudio('module1_', currentSlide);
    setTimeout(() => {
      const logroAudio = $('#aud_logro').get(0);
      if (logroAudio) {
        logroAudio.volume = 0.3;
        logroAudio.muted = false;
        logroAudio.currentTime = 0;
        logroAudio.play().catch(err => console.warn("Error playing aud_logro:", err));
      }
    }, 100);
    if (myAvance.ch1.logro_llanta === 0) {
      myAvance.ch1.logro_llanta = 1;
      localStorage.setItem('myAvance', JSON.stringify(myAvance));
      console.log("[ctrl_slidesMod1] Progreso actualizado: ch1.logro_llanta = 1");
    }
  } else if (currentSlide === 9) {
    // Validar estilosComunicacion desde localStorage
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
        localStorage.setItem('myAvance', JSON.stringify(myAvance));
        console.log("[ctrl_slidesMod1] Progreso actualizado: ch1.progress = 3, logro_casco = 1");
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
  if (nSlides.numSlides > 1) {
    nSlides.numSlides--;
    ctrl_slidesMod1();
  }
});

$("#module1_Next").click(() => {
  resetLocution();
  const nextSlide = nSlides.numSlides + 1;
  const nextSection = MODULE_CONFIG[1].sections.find(s => s.slide === nextSlide);
  if (nextSlide <= $('.slide_module1').length && (!nextSection || nextSection.id <= myAvance.ch1.progress)) {
    nSlides.numSlides++;
    ctrl_slidesMod1();
  } else {
    console.log(`[module1_Next] No se puede avanzar a la diapositiva ${nextSlide}. Sección no desbloqueada o inválida.`);
  }
});

setupCarouselControls('test_1');
if (!testCompleted) {
  $(".body-answers > div > div").click(function () {
    if ($(this).hasClass('disabled')) return;

    const $thisDiv = $(this);
    const questionNum = $thisDiv.data('question');
    const type = $thisDiv.parent().data('type');
    const $questionOptions = $(`.body-answers > div > div[data-question='${questionNum}']`);
    
    $questionOptions.addClass('disabled').off('click');
    $thisDiv.find('.answer-text').css('color', '#f8fafc');
    $questionOptions.not($thisDiv).find('.answer-text').css('color', '#475569');
    $thisDiv.find('img').attr('src', 'assets/img/modules/module-1/slide-4/test/answers/select.png');
    
    selections[type]++;
    userSelections[questionNum] = type;
    localStorage.setItem('userSelections', JSON.stringify(userSelections));
    console.log(`[Test] Pregunta ${questionNum} seleccionada: ${type}, Selecciones:`, selections);

    const totalSelections = selections.pantera + selections.pavorreal + selections.delfin + selections.buho;
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
  card.addEventListener('mouseout', stopRotate);
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

$buttons.each(function () {
  const num = $(this).attr('id').split('_')[2];
  if ($(`#hov_estilosComunicacion_${num}`).length === 0) {
    $('<img>')
      .attr({ id: `hov_estilosComunicacion_${num}`, src: `assets/img/modules/module-1/slide-9/no_${num}.png` })
      .addClass('absolute hov_estilosComunicacion')
      .appendTo($container);
  }
});

$buttons.hover(
  function () {
    const num = $(this).attr('id').split('_')[2];
    const $hoverImg = $(`#hov_estilosComunicacion_${num}`);
    const $audio = $(`#aud_estilosComunicacion_${num}`)[0];

    $('.hov_estilosComunicacion').hide().removeClass('animated fadeInRight');
    $hoverImg.show().addClass('animated fadeInRight');
    $buttons.css('opacity', '0.5');
    $(this).css({ 'opacity': '1', 'transform': 'scale(1.05)' });

    if ($audio) {
      $audio.currentTime = 0;
      $audio.play().catch(err => console.warn(`Error playing audio aud_estilosComunicacion_${num}:`, err));
    }
  },
  function () {
    const num = $(this).attr('id').split('_')[2];
    const $audio = $(`#aud_estilosComunicacion_${num}`)[0];

    $('.hov_estilosComunicacion').hide().removeClass('animated fadeInRight');
    $buttons.css({ 'opacity': '1', 'transform': 'scale(1)' });

    if ($audio) {
      $audio.pause();
      $audio.currentTime = 0;
    }
  }
);

$buttons.click(function () {
  strID = $(this).attr('id').split("_")[2];
  pauseMusicAndUpdateIcon();
  console.log(`#mod_estilosComunicacion_${strID}`);
  $(`#mod_estilosComunicacion_${strID}`).show();
  $(`#vid_estilosComunicacion_${strID}`).get(0).play();
});

$('.cls_estilosComunicacion').click(function () {
  strID = $(this).attr('id').split("_")[2];
  $(`#mod_estilosComunicacion_${strID}`).fadeOut();
  const video = $(`#vid_estilosComunicacion_${strID}`).get(0);
  video.pause();
  video.currentTime = 0;

  if (parseInt(strID) >= myAvance.ch1.estilosComunicacion) {
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
  resetLocution();
  if (myAvance.ch1.progress >= 3) { // Verificar que el módulo 1 esté completo
    myAvance.avModulos = Math.max(myAvance.avModulos, 2);
    myAvance.ch1.trofeo_1 = 1;
    localStorage.setItem('myAvance', JSON.stringify(myAvance));
    console.log("[btn_finmod1] Progreso actualizado: avModulos = 2, ch1.trofeo_1 = 1");
  } else {
    console.warn("[btn_finmod1] No se puede completar el módulo 1. Progreso insuficiente:", myAvance.ch1.progress);
    alert("Debes completar todas las secciones del Módulo 1 antes de continuar.");
    return;
  }
  
  nSlides.numSlides = 1;
  pauseAllAudio();
  $(".music").removeClass("hide");
  resetFondo(1, 2);
  $('#slide_index_1').show();
  $("#carga_materia").hide().empty();
  ctrl_AvGeneral(myAvance.avModulos, gAvMax);
  ctrl_menuAccess();
  playModuleAudio(null);
});

$('#btn_comenzarModule_1').click(function () {
  const firstSectionSlide = MODULE_CONFIG[1].sections[0].slide; // Diapositiva de la primera sección
  nSlides.numSlides = firstSectionSlide;
  ctrl_slidesMod1();
});

$(".elem_click_reto").click(function () {
  const audio = $("#efct_clic_jue")[0];
  audio.currentTime = 0;
  audio.play().catch((err) => {
    console.warn("No se pudo reproducir el audio:", err);
  });
});