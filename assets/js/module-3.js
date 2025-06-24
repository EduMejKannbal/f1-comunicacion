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
    // Clear previous timeouts
    dismissTimeouts.forEach(timeout => clearTimeout(timeout));
    dismissTimeouts = [];

    const $slides = $(".slide_module3");
    const totalSlides = $slides.length;
    let currentSlide = nSlides.numSlides_3;

    // Validar que la diapositiva actual sea accesible según el progreso
    const section = MODULE_CONFIG[3].sections.find(s => s.slide === currentSlide);
    if (section && section.id > myAvance.ch3.progress) {
        console.warn(`[ctrl_slidesMod3] Intento de acceder a diapositiva ${currentSlide} (sección ${section.id}) no desbloqueada. Redirigiendo a la última sección desbloqueada.`);
        currentSlide = MODULE_CONFIG[3].sections.find(s => s.id === myAvance.ch3.progress)?.slide || 2;
        nSlides.numSlides_3 = currentSlide;
    }

    autoNextSlide('module3', nSlides, ctrl_slidesMod3);
    const $prevBtn = $("#module3_Prev");
    const $nextBtn = $("#module3_Next");
    reiniciarVideos(".mod3_videoSlide");
    $slides.hide();
    $(`#slide_module3_${currentSlide}`).show();
    console.log(`[ctrl_slidesMod3] Mostrando diapositiva: #slide_module3_${currentSlide}`);

    controlBackgroundMusic(3, currentSlide);
    playAudio('module3_', currentSlide);
    autoDismissElements(3, currentSlide);

    $prevBtn.show();
    $nextBtn.show();

    if (currentSlide === 1) {
        $prevBtn.hide();
        $nextBtn.hide();
        reproducirHasta("vid_module3_1", 9.99);
    } else if (currentSlide === 3) {
        console.log(`[ctrl_slidesMod3] Slide 3: myAvance.ch3.trofeoModal = ${myAvance.ch3.trofeoModal}`);
        $prevBtn.show();
        $('.btn_trofeoModal').css('pointer-events', 'auto')
            .addClass('elem_click_modal')
            .toggleClass('myglow_img_white', myAvance.ch3.trofeoModal < 2)
            .toggleClass('w3-opacity', myAvance.ch3.trofeoModal >= 2);
        if (myAvance.ch3.trofeoModal >= 2) {
            $nextBtn.show();
            if (myAvance.ch3.progress < 2) {
                myAvance.ch3.progress = 2; // Unlock Manejo efectivo
                localStorage.setItem('myAvance', JSON.stringify(myAvance));
                console.log("[ctrl_slidesMod3] Progreso actualizado: ch3.progress = 2");
                ctrl_menuAccess();
            }
        } else {
            $nextBtn.hide();
        }
    } else if (currentSlide === 4) {
        $prevBtn.show();
        if (myAvance.ch3.vidManEm < 2) {
            $nextBtn.hide();
        } else {
            $nextBtn.show();
            if (myAvance.ch3.progress < 3) {
                myAvance.ch3.progress = 3; // Unlock Bioimpactos
                localStorage.setItem('myAvance', JSON.stringify(myAvance));
                console.log("[ctrl_slidesMod3] Progreso actualizado: ch3.progress = 3");
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
                localStorage.setItem('myAvance', JSON.stringify(myAvance));
                console.log("[ctrl_slidesMod3] Progreso actualizado: ch3.progress = 4");
                ctrl_menuAccess();
            }
        }
    } else if (currentSlide === 7) {
        $prevBtn.hide();
        $nextBtn.hide();
        reproducirHasta("vid_module3_7", 4.99);
    } else if (currentSlide === 8) {
        $prevBtn.show();
        if (myAvance.ch3.caracter < 2) {
            $nextBtn.hide();
        } else {
            $nextBtn.show();
        }
    } else if (currentSlide === 9) {
        $prevBtn.show();
        if (myAvance.ch3.vidTemp < 2) {
            reproducirHasta("vid_module3_9", 4.99);
            $nextBtn.hide();
        } else {
            $nextBtn.show();
            if (myAvance.ch3.progress < 5) {
                myAvance.ch3.progress = 5; // Unlock Evaluación Final
                localStorage.setItem('myAvance', JSON.stringify(myAvance));
                console.log("[ctrl_slidesMod3] Progreso actualizado: ch3.progress = 5");
                ctrl_menuAccess();
            }
        }
    } else if (currentSlide === 10) {
        $prevBtn.hide();
        $nextBtn.hide();
        reproducirHasta("vid_module3_10", 4.99);
        $('#aud_logro').get(0).play();
        if (myAvance.ch3.logro_llantas2 === 0) {
            myAvance.ch3.logro_llantas2 = 1;
            localStorage.setItem('myAvance', JSON.stringify(myAvance));
            console.log("[ctrl_slidesMod3] Progreso actualizado: ch3.logro_llantas2 = 1");
        }
    } else if (currentSlide === 11) {
        $prevBtn.show();
        if (myAvance.ch3.finish_juego === 0) {
            console.log('[ctrl_slidesMod3] Juego no completado, ocultando Next');
            $nextBtn.hide();
        } else {
            console.log('[ctrl_slidesMod3] Juego completado, mostrando Next');
            $nextBtn.show();
            if (myAvance.ch3.progress < 6) {
                myAvance.ch3.progress = 6; // Unlock Cierre
                localStorage.setItem('myAvance', JSON.stringify(myAvance));
                console.log("[ctrl_slidesMod3] Progreso actualizado: ch3.progress = 6");
                ctrl_menuAccess();
            }
        }
    } else if (currentSlide === 12) {
        $prevBtn.hide();
        $nextBtn.hide();
        reproducirHasta("vid_module3_12", 4.99);
        $('#aud_logro').get(0).play();
        if (myAvance.ch3.logro_volante === 0) {
            myAvance.ch3.logro_volante = 1;
            localStorage.setItem('myAvance', JSON.stringify(myAvance));
            console.log("[ctrl_slidesMod3] Progreso actualizado: ch3.logro_volante = 1");
        }
    } else if (currentSlide === 13) {
        $prevBtn.show();
        $nextBtn.hide();
        reproducirHasta("vid_module3_13", 8.99);
        $('#aud_logro').get(0).play();
    } else if (currentSlide === totalSlides) {
        $prevBtn.show();
        $nextBtn.hide();
    }

    if (previousSlide === 5 && currentSlide !== 5) {
        restoreMusicAndIcon('3');
    }

    previousSlide = currentSlide;
}

$("#module3_Prev").click(() => {
    resetLocution();
    if (nSlides.numSlides_3 > 1) {
        nSlides.numSlides_3--;
        ctrl_slidesMod3();
    }
});

$("#module3_Next").click(() => {
    resetLocution();
    const nextSlide = nSlides.numSlides_3 + 1;
    const nextSection = MODULE_CONFIG[3].sections.find(s => s.slide === nextSlide);
    if (nextSlide <= $('.slide_module3').length && (!nextSection || nextSection.id <= myAvance.ch3.progress)) {
        nSlides.numSlides_3++;
        ctrl_slidesMod3();
    } else {
        console.log(`[module3_Next] No se puede avanzar a la diapositiva ${nextSlide}. Sección no desbloqueada o inválida.`);
    }
});

$('.btn_comenzarModule').click(function () {
    const strID = $(this).attr('id').split("_")[2];
    if (strID === '3') {
        const firstSectionSlide = MODULE_CONFIG[3].sections[0].slide;
        nSlides.numSlides_3 = firstSectionSlide;
        console.log(`[btn_comenzarModule] Iniciando módulo 3 en diapositiva ${firstSectionSlide}`);
        ctrl_slidesMod3();
    }
});

function ctrl_avElem_chk(ptrChptr, ptrClass, ptrID, ptrAvMax, ptrAnimClass, isInit) {
    $('.btn_' + ptrClass).removeClass(ptrAnimClass).css({ 'pointer-events': 'none' }).addClass('w3-opacity');
    if (myAvance["ch" + ptrChptr][ptrClass] < ptrAvMax && myAvance["ch" + ptrChptr][ptrClass] <= parseInt(ptrID)) {
        if (!isInit) {
            myAvance["ch" + ptrChptr][ptrClass] = parseInt(ptrID) + 1;
            localStorage.setItem('myAvance', JSON.stringify(myAvance));
            console.log(`[ctrl_avElem_chk] Actualizado myAvance.ch${ptrChptr}.${ptrClass} = ${myAvance["ch" + ptrChptr][ptrClass]}`);
        }
        for (let i = 0; i < myAvance["ch" + ptrChptr][ptrClass]; i++) {
            $(`#btn_${ptrClass}_${i}`).css('pointer-events', 'auto').removeClass('w3-opacity ' + ptrAnimClass);
        }
        $(`#btn_${ptrClass}_${myAvance["ch" + ptrChptr][ptrClass]}`).addClass(ptrAnimClass).css('pointer-events', 'auto').removeClass('w3-opacity');
    } else if (myAvance["ch" + ptrChptr][ptrClass] >= ptrAvMax) {
        $('.btn_' + ptrClass).css('pointer-events', 'auto').removeClass('w3-opacity');
        if (ptrClass === 'trofeoModal') {
            $('.btn_' + ptrClass).removeClass(ptrAnimClass + ' elem_click_modal').addClass('w3-opacity');
        }
    }
}

$('.btn_trofeoModal').click(function () {
    pauseMusicAndUpdateIcon();
    console.log('[btn_trofeoModal] Mostrando modal: #mod_trofeoModal_1');
    $('#mod_trofeoModal_1').fadeIn();
    const video = $('#emoc_6').get(0);
    video.currentTime = 0;
    video.play();
    const audio = $("#efct_clic_mod_3")[0];
    audio.currentTime = 0;
    audio.play().catch((err) => {
        console.warn("Error playing audio efct_clic_mod_3:", err);
    });
});

$('.cls_trofeoModal').click(function () {
    console.log('[cls_trofeoModal] Cerrando modal: #mod_trofeoModal_1');
    $('#mod_trofeoModal_1').fadeOut();
    const video = $('#emoc_6').get(0);
    video.currentTime = 0;
    video.pause();
    if (myAvance.ch3.trofeoModal < 2) {
        myAvance.ch3.trofeoModal = 2;
        localStorage.setItem('myAvance', JSON.stringify(myAvance));
        console.log('[cls_trofeoModal] Actualizado: myAvance.ch3.trofeoModal = 2');
    }
    $('#btn_trofeoModal_1').css('pointer-events', 'auto')
        .addClass('elem_click_modal')
        .removeClass('myglow_img_white')
        .toggleClass('w3-opacity', myAvance.ch3.trofeoModal >= 2);
    restoreMusicAndIcon('3');
    ctrl_slidesMod3();
});

$('.btn_vidManEm').click(function () {
    const strID = $(this).attr('id').split("_")[2];
    pauseMusicAndUpdateIcon();
    console.log(`[btn_vidManEm] Mostrando video: #mod_vidManEm_${strID}`);
    $(`#mod_vidManEm_${strID}`).show();
    $(`#vidManEm_${strID}`).get(0).play();
});

$('.cls_vidManEm').click(function () {
    const strID = $(this).attr('id').split("_")[2];
    console.log(`[cls_vidManEm] Cerrando video: #mod_vidManEm_${strID}`);
    $(`#mod_vidManEm_${strID}`).hide();
    const video = $(`#vidManEm_${strID}`).get(0);
    video.pause();
    video.currentTime = 0;
    if (parseInt(strID) >= myAvance.ch3.vidManEm) {
        ctrl_avElem_chk(3, 'vidManEm', myAvance.ch3.vidManEm, $(".btn_vidManEm").length + 1, 'myglow_img_blue', false);
    }
    restoreMusicAndIcon('3');
    ctrl_slidesMod3();
});

$('.btn_impactBio').click(function () {
    const strID = $(this).attr('id').split("_")[2];
    pauseMusicAndUpdateIcon();
    console.log(`[btn_impactBio] Mostrando video: #mod_impactBio_${strID}`);
    $(`#mod_impactBio_${strID}`).show();
    $(`#impactBio_${strID}`).get(0).play();
});

$('.cls_impactBio').click(function () {
    const strID = $(this).attr('id').split("_")[2];
    console.log(`[cls_impactBio] Cerrando video: #mod_impactBio_${strID}`);
    $(`#mod_impactBio_${strID}`).hide();
    const video = $(`#impactBio_${strID}`).get(0);
    video.pause();
    video.currentTime = 0;
    if (parseInt(strID) >= myAvance.ch3.impactBio) {
        ctrl_avElem_chk(3, 'impactBio', myAvance.ch3.impactBio, $(".btn_impactBio").length + 1, 'myglow_img_white', false);
    }
    restoreMusicAndIcon('3');
    ctrl_slidesMod3();
});

$('.btn_caracter').click(function () {
    const strID = $(this).attr('id').split("_")[2];
    pauseMusicAndUpdateIcon();
    console.log(`[btn_caracter] Mostrando video: #mod_caracter_${strID}`);
    $(`#mod_caracter_${strID}`).show();
    $(`#caracter_${strID}`).get(0).play();
});

$('.cls_caracter').click(function () {
    const strID = $(this).attr('id').split("_")[2];
    console.log(`[cls_caracter] Cerrando video: #mod_caracter_${strID}`);
    $(`#mod_caracter_${strID}`).hide();
    const video = $(`#caracter_${strID}`).get(0);
    video.pause();
    video.currentTime = 0;
    if (parseInt(strID) >= myAvance.ch3.caracter) {
        ctrl_avElem_chk(3, 'caracter', myAvance.ch3.caracter, $(".btn_caracter").length + 1, 'myglow_img_blue', false);
    }
    restoreMusicAndIcon('3');
    ctrl_slidesMod3();
});

$('.btn_vidTemp').click(function () {
    const strID = $(this).attr('id').split("_")[2];
    pauseMusicAndUpdateIcon();
    console.log(`[btn_vidTemp] Mostrando video: #mod_vidTemp_${strID}`);
    $(`#mod_vidTemp_${strID}`).show();
    $(`#vidTemp_${strID}`).get(0).play();
});

$('.cls_vidTemp').click(function () {
    const strID = $(this).attr('id').split("_")[2];
    console.log(`[cls_vidTemp] Cerrando video: #mod_vidTemp_${strID}`);
    $(`#mod_vidTemp_${strID}`).hide();
    const video = $(`#vidTemp_${strID}`).get(0);
    video.pause();
    video.currentTime = 0;
    if (parseInt(strID) >= myAvance.ch3.vidTemp) {
        ctrl_avElem_chk(3, 'vidTemp', myAvance.ch3.vidTemp, $(".btn_caracter").length + 1, 'myglow_img_blue', false);
    }
    restoreMusicAndIcon('3');
    ctrl_slidesMod3();
});

$("#btn_fin_mod310").click(function () {
    nSlides.numSlides_3 = 11;
    console.log('[btn_fin_mod310] Avanzando a diapositiva 11');
    ctrl_slidesMod3();
});

$("#btn_fin_mod312").click(function () {
    nSlides.numSlides_3 = 13;
    console.log('[btn_fin_mod312] Avanzando a diapositiva 13');
    ctrl_slidesMod3();
});

$("#btn_finmod3").click(function () {
    resetLocution();
    if (myAvance.ch3.progress >= 6) {
        myAvance.avModulos = Math.max(myAvance.avModulos, 4);
        myAvance.ch3.trofeo_3 = 1;
        localStorage.setItem('myAvance', JSON.stringify(myAvance));
        console.log("[btn_finmod3] Progreso actualizado: avModulos = 4, ch3.trofeo_3 = 1");
    } else {
        console.warn("[btn_finmod3] No se puede completar el módulo 3. Progreso insuficiente:", myAvance.ch3.progress);
        alert("Debes completar todas las secciones del Módulo 3 antes de continuar.");
        return;
    }

    nSlides.numSlides_3 = 1;
    pauseAllAudio();
    $(".music").removeClass("hide");
    if (myAvance.ganador != null) {
        $('#slide_ganador_1').show();
        const videoSrc = `assets/vid/ganador/piloto_${myAvance.ganador}.mp4`;
        const $video = $('#vid_ganador_1');
        if ($video.length) {
            $video.attr('src', videoSrc);
            $video.get(0).volume = 0.3;
            $video.get(0).load();
            $video.get(0).play().catch(err => console.warn("Error playing winner video:", err));
        } else {
            console.warn("[btn_finmod3] Element #vid_ganador_1 not found");
        }
    } else {
        console.warn("[btn_finmod3] No winner assigned in myAvance.ganador, skipping winner video");
    }
    resetFondo(3, 2);
    $('#slide_index_1').show();
    $("#carga_materia").hide().empty();
    ctrl_AvGeneral(myAvance.avModulos, gAvMax);
    ctrl_menuAccess();
    playModuleAudio(null);
});

$("#btn_fin_mod37").click(function () {
    nSlides.numSlides_3 = 8;
    console.log('[btn_fin_mod37] Avanzando a diapositiva 8');
    ctrl_slidesMod3();
});

$(".elem_click").click(function () {
    const audio = $("#efct_clic3")[0];
    audio.currentTime = 0;
    audio.play().catch((err) => {
        console.warn("Error playing audio efct_clic3:", err);
    });
});

$('#slideM3-9-btn').click(function () {
    if (myAvance.ch3.progress < 5) {
        console.warn("[slideM3-9-btn] No se puede iniciar el juego, progreso insuficiente:", myAvance.ch3.progress);
        alert("Debes completar las secciones anteriores para iniciar el juego.");
        return;
    }
    pauseMusicAndUpdateIcon();
    console.log('[slideM3-9-btn] Iniciando juego: #juego3');
    const $prevBtn = $("#module3_Prev");
    const $nextBtn = $("#module3_Next");
    $prevBtn.hide();
    $nextBtn.hide();
    $('#juego3').show();
    $('#juego3').loadHTML('juego3.html');
});