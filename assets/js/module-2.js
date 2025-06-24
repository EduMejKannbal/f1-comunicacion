// Variables de estado
let veoComic = parseInt(localStorage.getItem('veoComic')) || 0;
let gameAttempts = parseInt(localStorage.getItem('gameAttempts')) || 0;
const maxGameAttempts = 3;

$("#precache_mod_2").waitForImages({
  finished: function () {
    $("#precache_bas").hide();
    ctrl_slidesMod2();
    ctrl_avElem(2, 'comic', myAvance.ch2.comic, $(".btn_comic").length + 1, 'myglow_img_blue', true);
    autoNextSlide('module2', nSlides, ctrl_slidesMod2);
  },
  waitForAll: true
});

function ctrl_slidesMod2() {
  // Clear previous timeouts
  dismissTimeouts.forEach(timeout => clearTimeout(timeout));
  dismissTimeouts = [];

  const $slides = $(".slide_module2");
  const totalSlides = $slides.length;
  let currentSlide = nSlides.numSlides_2;

  // Validar que la diapositiva actual sea accesible según el progreso
  const section = MODULE_CONFIG[2].sections.find(s => s.slide === currentSlide);
  if (section && section.id > myAvance.ch2.progress) {
    console.warn(`[ctrl_slidesMod2] Intento de acceder a diapositiva ${currentSlide} (sección ${section.id}) no desbloqueada. Redirigiendo a la última sección desbloqueada.`);
    currentSlide = MODULE_CONFIG[2].sections.find(s => s.id === myAvance.ch2.progress)?.slide || 1;
    nSlides.numSlides_2 = currentSlide;
  }

  autoNextSlide('module2', nSlides, ctrl_slidesMod2);
  const $prevBtn = $("#module2_Prev");
  const $nextBtn = $("#module2_Next");
  reiniciarVideos(".mod2_videoSlide");
  $slides.hide();
  $(`#slide_module2_${currentSlide}`).show();
  console.log(`[ctrl_slidesMod2] Mostrando diapositiva: #slide_module2_${currentSlide}`);

  // Control de música de fondo
  controlBackgroundMusic(2, currentSlide);
  playAudio('module2_', currentSlide);
  // Control de elementos
  autoDismissElements(2, currentSlide);

  $prevBtn.show();
  $nextBtn.show();

  if (currentSlide === 1) {
    $prevBtn.hide();
    $nextBtn.hide();
    reproducirHasta("vid_module2_1", 9.99);
  } else if (currentSlide === 2) {
    $prevBtn.show();
    $nextBtn.show();
    reproducirHasta("vid_module2_2", 4.99);
  } else if (currentSlide === 4) {
    $prevBtn.hide();
    $nextBtn.hide;
    reproducirHasta("vid_module2_4", 8.99);
    $('#aud_logro').get(0).play();
    if (myAvance.ch2.logro_traje === 0) {
      myAvance.ch2.logro_traje = 1;
      if (myAvance.ch2.progress < 2) {
        myAvance.ch2.progress = 2; // Unlock Ejemplos
        localStorage.setItem('myAvance', JSON.stringify(myAvance));
        console.log("[ctrl_slidesMod2] Progreso actualizado: ch2.logro_traje = 1, ch2.progress = 2");
        ctrl_menuAccess();
      }
    }
  } else if (currentSlide === 5) {
    if (veoComic !== 1) {
      reproducirHasta("vid_module2_5", 4.99);
    }
    if (myAvance.ch2.comic < 3) {
      $prevBtn.show();
      $nextBtn.hide();
    } else {
      $prevBtn.show();
      $nextBtn.show();
    }
  } else if (currentSlide === 6) {
    $prevBtn.hide();
    $nextBtn.hide;
    reproducirHasta("vid_module2_6", 9);
    $('#aud_logro').get(0).play();
    if (myAvance.ch2.logro_guantes === 0) {
      myAvance.ch2.logro_guantes = 1;
      localStorage.setItem('myAvance', JSON.stringify(myAvance));
      console.log("[ctrl_slidesMod2] Progreso actualizado: ch2.logro_guantes = 1");
    }
  } else if (currentSlide === 7) {
    $prevBtn.hide();
    $nextBtn.hide;
    reproducirHasta("vid_module2_7", 4.99);
    if (myAvance.ch2.progress < 3) {
      myAvance.ch2.progress = 3; // Unlock Evaluación
      localStorage.setItem('myAvance', JSON.stringify(myAvance));
      console.log("[ctrl_slidesMod2] Progreso actualizado: ch2.progress = 3");
      ctrl_menuAccess();
    }
  } else if (currentSlide === 8) {
    $prevBtn.show();
    $nextBtn.hide();
  } else if (currentSlide === 9 && myAvance.ch2.preg_1 === null) {
    resetearBotonesPregunta('1');
    $prevBtn.show();
    $nextBtn.hide();
  } else if (currentSlide === 10 && myAvance.ch2.preg_2 === null) {
    resetearBotonesPregunta('2');
    $prevBtn.show();
    $nextBtn.hide();
  } else if (currentSlide === 11 && myAvance.ch2.preg_3 === null) {
    resetearBotonesPregunta('3');
    $prevBtn.show();
    $nextBtn.hide();
  } else if (currentSlide === 12 && myAvance.ch2.preg_4 === null) {
    resetearBotonesPregunta('4');
    $prevBtn.show();
    $nextBtn.hide();
  } else if (currentSlide === 13) {
    $prevBtn.hide();
    $nextBtn.hide;
    reproducirHasta("vid_module2_13", 4.99);
    $('#aud_logro').get(0).play();
    if (myAvance.ch2.logro_zapatos === 0) {
      myAvance.ch2.logro_zapatos = 1;
      if (myAvance.ch2.progress < 4) {
        myAvance.ch2.progress = 4; // Unlock Cierre
        localStorage.setItem('myAvance', JSON.stringify(myAvance));
        console.log("[ctrl_slidesMod2] Progreso actualizado: ch2.logro_zapatos = 1, ch2.progress = 4");
        ctrl_menuAccess();
      }
    }
  } else if (currentSlide === 14) {
    $prevBtn.show();
    $nextBtn.hide;
    reproducirHasta("vid_module2_14", 4.99);
  } else if (currentSlide === 15) {
    $prevBtn.show();
    $nextBtn.hide;
    reproducirHasta("vid_module2_15", 8.99);
  } else if (currentSlide === 16) {
    $prevBtn.show();
    $nextBtn.hide;
    reproducirHasta("vid_module2_16", 4.99);
  } else if (currentSlide === totalSlides) {
    $prevBtn.show();
    $nextBtn.hide;
  }

  if (previousSlide === 5 && currentSlide !== 5) {
    restoreMusicAndIcon('2');
  }

  previousSlide = currentSlide;
}

$("#module2_Prev").click(() => {
  resetLocution();
  if (nSlides.numSlides_2 > 1) {
    nSlides.numSlides_2--;
    ctrl_slidesMod2();
  }
});

$("#module2_Next").click(() => {
  resetLocution();
  const nextSlide = nSlides.numSlides_2 + 1;
  const nextSection = MODULE_CONFIG[2].sections.find(s => s.slide === nextSlide);
  if (nextSlide <= $('.slide_module2').length && (!nextSection || nextSection.id <= myAvance.ch2.progress)) {
    nSlides.numSlides_2++;
    ctrl_slidesMod2();
  } else {
    console.log(`[module2_Next] No se puede avanzar a la diapositiva ${nextSlide}. Sección no desbloqueada o inválida.`);
  }
});

$('.btn_comic').click(function () {
  strID = $(this).attr("id").split("_")[2];
  console.log(`[btn_comic] Mostrando comic: #mod_comic_${strID}`);
  $(`#mod_comic_${strID}`).show();
});

$('.cls_comic').click(function () {
  strID = $(this).attr("id").split("_")[2];
  console.log(`[cls_comic] Cerrando comic: #mod_comic_${strID}`);
  $(`#mod_comic_${strID}`).fadeOut();
  if (parseInt(strID) >= myAvance.ch2.comic) {
    ctrl_avElem(2, 'comic', myAvance.ch2.comic, $(".btn_comic").length + 1, 'myglow_img_blue', false);
  }
  veoComic = 1;
  localStorage.setItem('veoComic', veoComic);
  console.log(`[cls_comic] veoComic actualizado: ${veoComic}`);
  ctrl_slidesMod2();
});

$('#slide3_play').click(function () {
  pauseMusicAndUpdateIcon();
  console.log('[slide3_play] Mostrando video: #mod_2sarp_1');
  $('#mod_2sarp_1').show();
  $('#vidSarp_1').get(0).play();
});

$('#cls_2sarp_1').click(function () {
  console.log('[cls_2sarp_1] Cerrando video: #mod_2sarp_1');
  $('#mod_2sarp_1').hide();
  const video = $('#vidSarp_1').get(0);
  video.pause();
  video.currentTime = 0;
  restoreMusicAndIcon('2');
});

$('#btn_start').click(function () {
  const firstSectionSlide = MODULE_CONFIG[2].sections[0].slide;
  nSlides.numSlides_2 = firstSectionSlide;
  console.log(`[btn_start] Iniciando módulo 2 en diapositiva ${firstSectionSlide}`);
  ctrl_slidesMod2();
});

$('.btn_avanceModal').click(function () {
  const currentSlideNum = parseInt(this.id.match(/slide(\d+)_/)[1]);
  nSlides.numSlides_2 = currentSlideNum + 1;
  console.log(`[btn_avanceModal] Avanzando a diapositiva ${nSlides.numSlides_2}`);
  ctrl_slidesMod2();
});

$('#btn_start_exam').click(function () {
  nSlides.numSlides_2 = 8;
  console.log('[btn_start_exam] Iniciando examen en diapositiva 8');
  ctrl_slidesMod2();
});

$('.btn_resp').click(function () {
  const strOp = $(this).attr("id").split("_")[4];
  const strPreg = $(this).attr("id").split("_")[2];

  for (let n = 1; n <= 4; n++) {
    $(`#btn_resp_${strPreg}_op_${n}`).css({
      'opacity': '0.5',
      'pointer-events': 'none'
    });
  }

  $(`#btn_resp_${strPreg}_op_${strOp}`).css({ 'opacity': '1' }).doAnim({ "animation": "heartBeat" });

  const correctAnswers = { '1': '1', '2': '2', '3': '3', '4': '4' };
  if (strOp === correctAnswers[strPreg]) {
    myAvance.ch2[`preg_${strPreg}`] = '1';
    $('#aud_win').get(0).play();
    console.log(`[btn_resp] Respuesta correcta para preg_${strPreg}: ${strOp}`);
  } else {
    myAvance.ch2[`preg_${strPreg}`] = '0';
    $('#aud_error').get(0).play();
    console.log(`[btn_resp] Respuesta incorrecta para preg_${strPreg}: ${strOp}`);
  }

  localStorage.setItem('myAvance', JSON.stringify(myAvance));
  console.log(`[btn_resp] Progreso guardado: ch2.preg_${strPreg} = ${myAvance.ch2[`preg_${strPreg}`]}`);

  ctrl_slidesMod2();
  if (strPreg === '4') {
    verificarSumaPreguntas();
  }
});

function verificarSumaPreguntas() {
  const ch2 = myAvance.ch2;
  let suma = 0;

  for (let i = 1; i <= 4; i++) {
    suma += Number(ch2[`preg_${i}`]) || 0;
  }
  console.log(`[verificarSumaPreguntas] Preguntas: ${ch2.preg_1}, ${ch2.preg_2}, ${ch2.preg_3}, ${ch2.preg_4}, Suma: ${suma}, Intento: ${gameAttempts + 1}`);

  $("#module2_Next").hide();
  $("#module2_Prev").hide();

  if (suma === 4) {
    $('#slide_ok_1').show();
    console.log('[verificarSumaPreguntas] Todas las respuestas correctas, mostrando modal de aprobación');
  } else {
    gameAttempts++;
    localStorage.setItem('gameAttempts', gameAttempts);
    console.log(`[verificarSumaPreguntas] gameAttempts actualizado: ${gameAttempts}`);
    if (gameAttempts < maxGameAttempts) {
      $('#slide_error_1').show();
      console.log('[verificarSumaPreguntas] Respuestas incorrectas, mostrando modal de error');
    } else {
      console.log('[verificarSumaPreguntas] Límite de intentos alcanzado, avanzando a diapositiva 13');
      advanceToSlide13();
    }
  }
}

function advanceToSlide13() {
  $('#slide_error_1').hide();
  $('#juego2').hide().empty();
  nSlides.numSlides_2 = 13;
  if (myAvance.ch2.logro_zapatos === 0) {
    myAvance.ch2.logro_zapatos = 1;
    if (myAvance.ch2.progress < 4) {
      myAvance.ch2.progress = 4; // Unlock Cierre
      localStorage.setItem('myAvance', JSON.stringify(myAvance));
      console.log("[advanceToSlide13] Progreso actualizado: ch2.logro_zapatos = 1, ch2.progress = 4");
      ctrl_menuAccess();
    }
    $('#aud_logro').get(0).play();
  }
  ctrl_slidesMod2();
}

function resetearBotonesPregunta(strPreg) {
  for (let n = 1; n <= 4; n++) {
    $(`#btn_resp_${strPreg}_op_${n}`).css({
      'opacity': '1',
      'pointer-events': 'auto'
    }).doAnim({ "animation": "" });
  }
}

$('#btn_cls_ok_modal').click(function () {
  $('#slide_ok_1').hide();
  console.log('[btn_cls_ok_modal] Aprobado, avanzando a diapositiva 13');
  advanceToSlide13();
});

$('#btn_cls_error_modal').click(function () {
  $('#slide_error_1').hide();
  if (gameAttempts < maxGameAttempts) {
    for (let i = 1; i <= 4; i++) {
      if (myAvance.ch2[`preg_${i}`] !== '1') {
        myAvance.ch2[`preg_${i}`] = null;
        resetearBotonesPregunta(i);
      }
    }
    localStorage.setItem('myAvance', JSON.stringify(myAvance));
    console.log('[btn_cls_error_modal] Reintentando juego, preguntas reiniciadas:', myAvance.ch2);
    nSlides.numSlides_2 = 9;
    ctrl_slidesMod2();
  } else {
    console.log('[btn_cls_error_modal] Límite de intentos alcanzado, avanzando a diapositiva 13');
    advanceToSlide13();
  }
});

$('#btn_cls_slide4_modal').click(function () {
  nSlides.numSlides_2 = 5;
  console.log('[btn_cls_slide4_modal] Avanzando a diapositiva 5');
  ctrl_slidesMod2();
});

$('#btn_cls_slide6_modal').click(function () {
  nSlides.numSlides_2 = 7;
  console.log('[btn_cls_slide6_modal] Avanzando a diapositiva 7');
  ctrl_slidesMod2();
});

$('#btn_cls_slide13_modal').click(function () {
  nSlides.numSlides_2 = 14;
  console.log('[btn_cls_slide13_modal] Avanzando a diapositiva 14');
  ctrl_slidesMod2();
});

$('#btn_cls_slide16_modal').click(function () {
  nSlides.numSlides_2 = 17;
  console.log('[btn_cls_slide16_modal] Avanzando a diapositiva 17');
  ctrl_slidesMod2();
});

$('.btn_mod2Continuar').click(function () {
  nSlides.numSlides_2 = 15;
  console.log('[btn_mod2Continuar] Avanzando a diapositiva 15');
  ctrl_slidesMod2();
});

$("#btn_finmod2").click(function () {
  resetLocution();
  if (myAvance.ch2.progress >= 4) {
    myAvance.avModulos = Math.max(myAvance.avModulos, 3);
    myAvance.ch2.trofeo_2 = 1;
    localStorage.setItem('myAvance', JSON.stringify(myAvance));
    console.log("[btn_finmod2] Progreso actualizado: avModulos = 3, ch2.trofeo_2 = 1");
  } else {
    console.warn("[btn_finmod2] No se puede completar el módulo 2. Progreso insuficiente:", myAvance.ch2.progress);
    alert("Debes completar todas las secciones del Módulo 2 antes de continuar.");
    return;
  }

  nSlides.numSlides_2 = 1;
  pauseAllAudio();
  $(".music").removeClass("hide");
  resetFondo(2, 2);
  $('#slide_index_1').show();
  $("#carga_materia").hide().empty();
  ctrl_AvGeneral(myAvance.avModulos, gAvMax);
  ctrl_menuAccess();
  playModuleAudio(null);
});

$(".elem_click").click(function () {
  const audio = $("#efct_clic2")[0];
  audio.currentTime = 0;
  audio.play().catch((err) => {
    console.warn("No se pudo reproducir el audio:", err);
  });
});

$(".elem_click_logro").click(function () {
  const audio = $("#efct_clic_logro_2")[0];
  audio.currentTime = 0;
  audio.play().catch((err) => {
    console.warn("No se pudo reproducir el audio:", err);
  });
});

$(".elem_click_cierre").click(function () {
  const audio = $("#efct_clic_feli")[0];
  audio.currentTime = 0;
  audio.play().then(() => {
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 10000);
  }).catch((err) => {
    console.warn("No se pudo reproducir el audio:", err);
  });
});

$(".elem_click_modal").click(function () {
  const audio = $("#efct_clic_mod_2")[0];
  audio.currentTime = 0;
  audio.play().catch((err) => {
    console.warn("No se pudo reproducir el audio:", err);
  });
});