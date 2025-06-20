var veoComic = 0;

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
  const $slides = $(".slide_module2");
  const totalSlides = $slides.length;
  const currentSlide = nSlides.numSlides_2;
  autoNextSlide('module2', nSlides, ctrl_slidesMod2);
  const $prevBtn = $("#module2_Prev");
  const $nextBtn = $("#module2_Next");
  reiniciarVideos(".mod2_videoSlide");
  $slides.hide();
  $("#slide_module2_" + currentSlide).show();
  console.log("#slide_module2_" + currentSlide);
  $prevBtn.show();
  $nextBtn.show();

  // Control de música de fondo
  controlBackgroundMusic(2, currentSlide);
  playAudio('module2_', currentSlide)

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
    $nextBtn.hide();
    reproducirHasta("vid_module2_4", 9.99);
    $('#aud_logro').get(0).play();
    if (myAvance.ch2.logro_traje === 0) {
      myAvance.ch2.logro_traje = 1;
      if (myAvance.ch2.progress < 2) {
        myAvance.ch2.progress = 2; // Unlock Ejemplos
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
    reproducirHasta("vid_module2_6", 9);
    $prevBtn.hide();
    $nextBtn.hide();
    $('#aud_logro').get(0).play();
    if (myAvance.ch2.logro_guantes === 0) {
      myAvance.ch2.logro_guantes = 1;
    }
  } else if (currentSlide === 7) {
    reproducirHasta("vid_module2_7", 4.99);
    $prevBtn.hide();
    $nextBtn.hide();
    if (myAvance.ch2.progress < 3) {
      myAvance.ch2.progress = 3; // Unlock Evaluación
      ctrl_menuAccess();
    }
  } else if (currentSlide === 8) {
    $prevBtn.show();
    $nextBtn.hide();
  } else if (currentSlide === 9 && myAvance.ch2.preg_1 === null) {
    resetearBotonesPregunta('1'); // Restablecer botones de pregunta 1
    $prevBtn.show();
    $nextBtn.hide();
  } else if (currentSlide === 10 && myAvance.ch2.preg_2 === null) {
    resetearBotonesPregunta('2'); // Restablecer botones de pregunta 2
    $prevBtn.show();
    $nextBtn.hide();
  } else if (currentSlide === 11 && myAvance.ch2.preg_3 === null) {
    resetearBotonesPregunta('3'); // Restablecer botones de pregunta 3
    $prevBtn.show();
    $nextBtn.hide();
  } else if (currentSlide === 12 && myAvance.ch2.preg_4 === null) {
    resetearBotonesPregunta('4'); // Restablecer botones de pregunta 4
    $prevBtn.show();
    $nextBtn.hide();
  } else if (currentSlide === 13) {
    $prevBtn.hide();
    $nextBtn.hide();
    reproducirHasta("vid_module2_13", 4.99);
    $('#aud_logro').get(0).play();
    if (myAvance.ch2.logro_zapatos === 0) {
      myAvance.ch2.logro_zapatos = 1;
      if (myAvance.ch2.progress < 4) {
        myAvance.ch2.progress = 4; // Unlock Cierre
        ctrl_menuAccess();
      }
    }
  } else if (currentSlide === 14) {
    $prevBtn.show();
    $nextBtn.hide();
    reproducirHasta("vid_module2_14", 4.99);
  } else if (currentSlide === 15) {
    $prevBtn.show();
    $nextBtn.hide();
    reproducirHasta("vid_module2_15", 9.99);
  } else if (currentSlide === totalSlides) {
    $nextBtn.hide();
    $prevBtn.hide();
  }
}

$("#module2_Prev").click(() => {
  // resetLocution();
  1 < nSlides.numSlides_2 && nSlides.numSlides_2--;  // Cambiado a numSlides_2
  ctrl_slidesMod2();
  // $("#efct_next")[0].play();
});

$("#module2_Next").click(() => {
  // resetLocution();
  $('.slide_module2').length > nSlides.numSlides_2 && nSlides.numSlides_2++;  // Cambiado a numSlides_2
  ctrl_slidesMod2();
  // $("#efct_next")[0].play();
});



$('.btn_comic').click(function () {
  console.log('click en comic');
  strID = $(this).attr("id").split("_")[2];
  $('#mod_comic_' + strID).show();
});


$('.cls_comic').click(function () {
  console.log('saliendo comic');
  strID = $(this).attr("id").split("_")[2];
  $('#mod_comic_' + strID).fadeOut();
  if (strID >= myAvance.ch2.comic) {
    ctrl_avElem(2, 'comic', myAvance.ch2.comic, $(".btn_comic").length + 1, 'myglow_img_blue', false);
  }
  veoComic = 1;
  ctrl_slidesMod2();
});


$('#slide3_play').click(function () {
  pauseMusicAndUpdateIcon();
  $('#mod_2sarp_1').show();
  $('#vidSarp_1').get(0).play();
});

$('#cls_2sarp_1').click(function () {
  $('#mod_2sarp_1').hide();
  var video = $('#vidSarp_1').get(0);
  video.pause();
  video.currentTime = 0;
  restoreMusicAndIcon('1');
});

$('#btn_start').click(function () {
  nSlides.numSlides_2 = 2;
  ctrl_slidesMod2();
});

$('.btn_avanceModal').click(function () {
  const currentSlideNum = parseInt(this.id.match(/slide(\d+)_/)[1]);
  nSlides.numSlides_2 = currentSlideNum + 1;

  ctrl_slidesMod2();
});

$('#btn_start_exam').click(function () {
  nSlides.numSlides_2 = 8;
  ctrl_slidesMod2();
});

$('.btn_resp').click(function () {
  //btn_resp_x_op_n
  strOp = $(this).attr("id").split("_")[4];
  strPreg = $(this).attr("id").split("_")[2];

  for (let n = 1; n <= 4; n++) {
    $('#btn_resp_' + strPreg + '_op_' + n).css({
      'opacity': '0.5',
      'pointer-events': 'none'
    });
  }

  $('#btn_resp_' + strPreg + '_op_' + strOp).css({ 'opacity': '1' }).doAnim({ "animation": "heartBeat" });

  if (strPreg === '1' && strOp === '1') {
    myAvance.ch2["preg_" + strPreg] = '1';
    $('#aud_win').get(0).play();
  } else if (strPreg === '2' && strOp === '2') {
    myAvance.ch2["preg_" + strPreg] = '1';
    $('#aud_win').get(0).play();
  } else if (strPreg === '3' && strOp === '3') {
    myAvance.ch2["preg_" + strPreg] = '1';
    $('#aud_win').get(0).play();
  } else if (strPreg === '4' && strOp === '4') {
    myAvance.ch2["preg_" + strPreg] = '1';
    $('#aud_win').get(0).play();
  } else {
    myAvance.ch2["preg_" + strPreg] = '0';
    $('#aud_error').get(0).play();
  }

  ctrl_slidesMod2();
  if (strPreg === '4') {
    verificarSumaPreguntas();
  }

});

function verificarSumaPreguntas() {
  const ch2 = myAvance.ch2;
  let suma = 0;

  Object.keys(ch2).forEach(key => {
    if (key.startsWith('preg_')) {
      const valor = ch2[key];
      const numero = Number(valor) || 0;
      suma += numero;
    }
  });
  console.log('Preguntas:', ch2.preg_1, ch2.preg_2, ch2.preg_3, ch2.preg_4, 'Suma:', suma);

  // Ocultar botones de navegación al mostrar cualquier modal
  $("#module2_Next").hide();
  $("#module2_Prev").hide();

  if (suma === 4) {
    $('#slide_ok_1').show();
  } else {
    $('#slide_error_1').show();
  }
}

function resetearBotonesPregunta(strPreg) {
  for (let n = 1; n <= 4; n++) {
    $(`#btn_resp_${strPreg}_op_${n}`).css({
      'opacity': '1',
      'pointer-events': 'auto'
    }).doAnim({ "animation": "" }); // Quitar animación si la tiene
  }
}

$('#btn_cls_ok_modal').click(function () {
  $('#slide_ok_1').hide();
  nSlides.numSlides_2 += 1;
  ctrl_slidesMod2();
});

$('#btn_cls_error_modal').click(function () {
  $('#slide_error_1').hide();

  // Reiniciar las preguntas que estén incorrectas o no contestadas
  for (let i = 1; i <= 4; i++) {
    if (myAvance.ch2[`preg_${i}`] !== '1') {
      myAvance.ch2[`preg_${i}`] = null; // Restablecer a null para repetir
    }
    // Restablecer botones de todas las preguntas
    resetearBotonesPregunta(i);
  }

  // Regresar a la primera pregunta (diapositiva 9)
  nSlides.numSlides_2 = 9;
  ctrl_slidesMod2();
});

$('#btn_cls_slide4_modal').click(function () {
  nSlides.numSlides_2 = 5;
  ctrl_slidesMod2();
});


$('#btn_cls_slide6_modal').click(function () {
  nSlides.numSlides_2 = 7;
  ctrl_slidesMod2();
});


$('#btn_cls_slide13_modal').click(function () {
  nSlides.numSlides_2 = 14;
  ctrl_slidesMod2();
});

$('#btn_cls_slide16_modal').click(function () {
  nSlides.numSlides_2 = 17;
  ctrl_slidesMod2();
});
//btn_mod2Continua
$('.btn_mod2Continuar').click(function () {
  nSlides.numSlides_2 = 15;
  ctrl_slidesMod2();
});

$("#btn_finmod2").click(function () {
  resetLocution();
  myAvance.avModulos = 3;
  nSlides.numSlides_2 = 1;
  if (myAvance.avModulos >= 3) {
    myAvance.ch2.trofeo_2 = 1;
  }
  pauseAllAudio();
  $(".music").removeClass("hide");
  resetFondo(2, 2);
  $('#slide_index_1').show();
  $("#carga_materia").hide().empty();
  ctrl_AvGeneral(2, gAvMax);
  ctrl_menuAccess();
  playModuleAudio(null);
  localStorage.setItem('myAvance', JSON.stringify(myAvance));
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
