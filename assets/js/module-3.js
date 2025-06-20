$("#precache_mod_3").waitForImages({
    finished: function () {
        $("#loading_screen").fadeOut("slow");
        $("#precache_bas").hide();
        ctrl_slidesMod3();
        ctrl_avElem_chk(3, 'trofeoModal', myAvance.ch3.trofeoModal, $(".btn_trofeoModal").length + 1, 'myglow_img_white', true);
        ctrl_avElem_chk(3, 'vidManEm', myAvance.ch3.vidManEm, $(".btn_vidManEm").length + 1, 'myglow_img_blue', true);
        ctrl_avElem_chk(3, 'impactBio', myAvance.ch3.impactBio, $(".btn_impactBio").length + 1, 'myglow_img_white', true);
        ctrl_avElem_chk(3, 'caracter', myAvance.ch3.caracter, $(".btn_caracter").length + 1, 'myglow_img_blue', true);
        ctrl_avElem_chk(3, 'vidTemp', myAvance.ch3.vidTemp, $(".btn_caracter").length + 1, 'myglow_img_blue', true);

        autoNextSlide('module3', nSlides, ctrl_slidesMod3);
    },
    waitForAll: true
});

function ctrl_slidesMod3() {
    const $slides = $(".slide_module3");
    const totalSlides = $slides.length;
    const currentSlide = nSlides.numSlides_3;
    autoNextSlide('module3', nSlides, ctrl_slidesMod3);
    const $prevBtn = $("#module3_Prev");
    const $nextBtn = $("#module3_Next");
    reiniciarVideos(".mod3_videoSlide");
    $slides.hide();
    $("#slide_module3_" + currentSlide).show();
    console.log("#slide_module3_" + currentSlide);
    $prevBtn.show();
    $nextBtn.show();

    // Reproducir audio para el slide actual
    playAudio('module3_', currentSlide);

    if (currentSlide === 1) {
        $prevBtn.hide();
        $nextBtn.hide();
        reproducirHasta("vid_module3_1", 9.99);
    } else if (currentSlide === 3) {
        console.log('Slide 3: myAvance.ch3.trofeoModal =', myAvance.ch3.trofeoModal);
        $prevBtn.show();
        if (myAvance.ch3.emocion < 2) {
            $('.btn_emocion').addClass('myglow_img_white');
            $nextBtn.hide();
        } else {
            $('.btn_emocion').removeClass('myglow_img_white');
            $nextBtn.show();
            if (myAvance.ch3.progress < 2) {
                myAvance.ch3.progress = 2; // Unlock Manejo efectivo
                ctrl_menuAccess();
                localStorage.setItem('myAvance', JSON.stringify(myAvance));
            }
        }
    } else if (currentSlide === 4) {
        $prevBtn.show();
        if (myAvance.ch3.vidManEm < 2) {
            $nextBtn.hide();
        } else {
            $nextBtn.show();
            if (myAvance.ch3.progress < 3) {
                myAvance.ch3.progress = 3; // Unlock Bioimpactos
                ctrl_menuAccess();
            }
        }
    } else if (currentSlide === 5) {
        $prevBtn.show();
        $nextBtn.show();
        reproducirHasta("vid_module3_5", 4.99);
    } else if (currentSlide === 6) {
        $prevBtn.show();
        if (myAvance.ch3.impactBio < 3) {
            reproducirHasta("vid_module3_6", 4.99);
            $nextBtn.hide();
        } else {
            $nextBtn.show();
            if (myAvance.ch3.progress < 4) {
                myAvance.ch3.progress = 4; // Unlock Temperamento
                ctrl_menuAccess();
            }
        }
    } else if (currentSlide === 7) {
        reproducirHasta("vid_module3_7", 4.99);
        $prevBtn.hide();
        $nextBtn.hide();
    } else if (currentSlide === 8) {
        $prevBtn.show();
        if (myAvance.ch3.caracter < 2) {
            $nextBtn.hide();
        } else {
            $nextBtn.show();
        }
    } else if (currentSlide === 9) {
        reproducirHasta("vid_module3_9", 4.99);
        $prevBtn.show();
        if (myAvance.ch3.vidTemp < 2) {
            $nextBtn.hide();
        } else {
            $nextBtn.show();
            if (myAvance.ch3.progress < 5) {
                myAvance.ch3.progress = 5; // Unlock Evaluación Final
                ctrl_menuAccess();
            }
        }
    } else if (currentSlide === 10) {
        reproducirHasta("vid_module3_10", 4.99);
        $prevBtn.hide();
        $nextBtn.hide();
        $('#aud_logro').get(0).play();
        if (myAvance.ch3.logro_llantas2 === 0) {
            myAvance.ch3.logro_llantas2 = 1;
        }
    } else if (currentSlide === 11) {
        reproducirHasta("vid_module3_11", 4.99);
        $prevBtn.show();
        if (myAvance.ch3.finish_juego === 0) {
            console.log('Juego no completado, ocultando Next');
            $nextBtn.hide();
        } else {
            console.log('Juego completado, mostrando Next y actualizando progreso');
            $nextBtn.show();
            if (myAvance.ch3.progress < 6) {
                myAvance.ch3.progress = 6; // Unlock Cierre
                localStorage.setItem('myAvance', JSON.stringify(myAvance));
                ctrl_menuAccess();
            }
        }
    } else if (currentSlide === 12) {
        reproducirHasta("vid_module3_12", 4.99);
        $prevBtn.hide();
        $nextBtn.hide();
        $('#aud_logro').get(0).play();
        if (myAvance.ch3.logro_volante === 0) {
            myAvance.ch3.logro_volante = 1;
        }
    } else if (currentSlide === 13) {
        $prevBtn.show();
        $nextBtn.hide();
        reproducirHasta("vid_module3_13", 8.99);
        $('#aud_logro').get(0).play();
    } else if (currentSlide === totalSlides) {
        $prevBtn.show();
        $nextBtn.hide();
    } else {
        $prevBtn.show();
        $nextBtn.show();
    }

    // Control de música de fondo
    controlBackgroundMusic(3, currentSlide);
}

// Eventos de navegación
$("#module3_Prev").click(() => {
    if (myAvance.avModulos >= 2) {
        myAvance.ch1.trofeo_1 = 1;
    }
    1 < nSlides.numSlides_3 && nSlides.numSlides_3--;
    ctrl_slidesMod3();
});

$("#module3_Next").click(() => {
    $('.slide_module3').length > nSlides.numSlides_3 && nSlides.numSlides_3++;
    ctrl_slidesMod3();
});

// Eventos de botones de comienzo
$('.btn_comenzarModule').click(function () {
    const strID = $(this).attr('id').split("_")[2];
    if (strID === '3') {
        nSlides.numSlides_3 = 2;
        ctrl_slidesMod3();
    }
});

// Eventos de emociones
$('.btn_emocion').click(function () {
    pauseMusicAndUpdateIcon();
    $('#mod_emocion_6').fadeIn();
    var video = $('#emoc_6').get(0);
    video.currentTime = 0;
    video.play();
});

$('.cls_trofeoModal').click(function () {
    $('#mod_trofeoModal_1').fadeOut();
    var video = $('#emoc_6').get(0);
    video.currentTime = 0;
    video.pause();
    if (myAvance.ch3.trofeoModal < 2) {
        myAvance.ch3.trofeoModal = 2;
        localStorage.setItem('myAvance', JSON.stringify(myAvance));
        console.log('Updated myAvance.ch3.trofeoModal to 2');
    }
    console.log('After closing modal, myAvance.ch3.trofeoModal =', myAvance.ch3.trofeoModal);
    restoreMusicAndIcon('3');
    ctrl_slidesMod3();
});

// Eventos de video manejo emocional
$('.btn_vidManEm').click(function () {
    strID = $(this).attr('id').split("_")[2];
    pauseMusicAndUpdateIcon();
    $('#mod_vidManEm_' + strID).show();
    $('#vidManEm_' + strID).get(0).play();
});

$('.cls_vidManEm').click(function () {
    strID = $(this).attr('id').split("_")[2];
    $('#mod_vidManEm_' + strID).hide();
    if (strID >= myAvance.ch3.vidManEm) {
        ctrl_avElem_chk(3, 'vidManEm', myAvance.ch3.vidManEm, $(".btn_vidManEm").length + 1, 'myglow_img_blue', false);
    }
    ctrl_slidesMod3();
    var video = $('#vidManEm_' + strID).get(0);
    video.pause();
    video.currentTime = 0;
    restoreMusicAndIcon('1');
});

// Eventos de impacto biológico
$('.btn_impactBio').click(function () {
    strID = $(this).attr('id').split("_")[2];
    pauseMusicAndUpdateIcon();
    $('#mod_impactBio_' + strID).show();
    $('#impactBio_' + strID).get(0).play();
});

$('.cls_impactBio').click(function () {
    strID = $(this).attr('id').split("_")[2];
    $('#mod_impactBio_' + strID).hide();
    if (strID >= myAvance.ch3.impactBio) {
        ctrl_avElem_chk(3, 'impactBio', myAvance.ch3.impactBio, $(".btn_impactBio").length + 1, 'myglow_img_white', false);
    }
    ctrl_slidesMod3();
    var video = $('#impactBio_' + strID).get(0);
    video.pause();
    video.currentTime = 0;
    restoreMusicAndIcon('1');
});

// Eventos de caracter
$('.btn_caracter').click(function () {
    strID = $(this).attr('id').split("_")[2];
    pauseMusicAndUpdateIcon();
    $('#mod_caracter_' + strID).show();
    $('#caracter_' + strID).get(0).play();
});

$('.cls_caracter').click(function () {
    strID = $(this).attr('id').split("_")[2];
    $('#mod_caracter_' + strID).hide();
    if (strID >= myAvance.ch3.caracter) {
        ctrl_avElem_chk(3, 'caracter', myAvance.ch3.caracter, $(".btn_caracter").length + 1, 'myglow_img_blue', false);
    }
    ctrl_slidesMod3();
    var video = $('#caracter_' + strID).get(0);
    video.pause();
    video.currentTime = 0;
    restoreMusicAndIcon('1');
});

// Eventos de video temporal
$('.btn_vidTemp').click(function () {
    strID = $(this).attr('id').split("_")[2];
    pauseMusicAndUpdateIcon();
    $('#mod_vidTemp_' + strID).show();
    $('#vidTemp_' + strID).get(0).play();
});

$('.cls_vidTemp').click(function () {
    strID = $(this).attr('id').split("_")[2];
    $('#mod_vidTemp_' + strID).hide();
    if (strID >= myAvance.ch3.vidTemp) {
        ctrl_avElem_chk(3, 'vidTemp', myAvance.ch3.vidTemp, $(".btn_caracter").length + 1, 'myglow_img_blue', false);
    }
    ctrl_slidesMod3();
    var video = $('#vidTemp_' + strID).get(0);
    video.pause();
    video.currentTime = 0;
    restoreMusicAndIcon('1');
});

// Botones de finalización
$("#btn_fin_mod310").click(function () {
    nSlides.numSlides_3 = 11;
    ctrl_slidesMod3();
});

$("#btn_fin_mod312").click(function () {
    nSlides.numSlides_3 = 13;
    ctrl_slidesMod3();
});

$("#btn_finmod3").click(function () {
    resetLocution();
    myAvance.avModulos = 4;
    nSlides.numSlides_3 = 1;
    if (myAvance.avModulos >= 4) {
        myAvance.ch3.trofeo_3 = 1;
    }
    pauseAllAudio();
    $(".music").removeClass("hide");
    if (myAvance.ganador !== null) {
        $('#slide_ganador_1').show();
        const videoSrc = `assets/vid/ganador/piloto_${myAvance.ganador}.mp4`;
        const $video = $('#vid_ganador_1');
        if ($video.length) {
            $video.attr('src', videoSrc);
            $video.get(0).volume = 0.3;
            $video.get(0).load();
            $video.get(0).play().catch(err => console.warn("Error playing winner video:", err));
        } else {
            console.warn("Element #vid_ganador_1 not found");
        }
    } else {
        console.log("No winner assigned in myAvance.ganador");
    }
    resetFondo(3, 2);
    $('#slide_index_1').show();
    $("#carga_materia").hide().empty();
    ctrl_AvGeneral(3, gAvMax);
    ctrl_menuAccess();
    playModuleAudio(null);
    localStorage.setItem('myAvance', JSON.stringify(myAvance));
});

$("#btn_fin_mod37").click(function () {
    nSlides.numSlides_3 = 8;
    ctrl_slidesMod3();
});

// Efecto de click
$(".elem_click").click(function () {
    const audio = $("#efct_clic3")[0];
    audio.currentTime = 0;
    audio.play().catch((err) => {
        console.warn("No se pudo reproducir el audio:", err);
    });
});

// Juego
$('#slideM3-9-btn').click(function () {
    $('#juego3').show();
    $('#juego3').loadHTML('juego3.html');
});
