// State Variables
let strID;
let gAvMax = 4;
let myAvance = {
    avModulos: 1,
    g_avance: 0,
    ganador: null,
    ch1: {
        estilosComunicacion: 1,
        logro_llanta: 0,
        logro_casco: 0,
        trofeo_1: 0
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
        trofeo_2: 0
    },
    ch3: {
        vidManEm: 1,
        impactBio: 1,
        caracter: 1,
        vidTemp: 1,
        emocion: 1,
        logro_llantas2: 0,
        logro_volante: 0,
        finish_juego: 0,
        trofeo_3: 0
    }
};
let nSlides = {
    numSlides: 1,
    numSlides_2: 1,
    numSlides_3: 1,
    general: 1,
    test_1: 1
};
let currentAudio = null;
let isAudioPlaying = false;
let flagMus = 1;
let flagVoice = 1;
let numAudio = 0;
let flagLocution = 1;
let swiperInstance;
let prevFlagMus;
let selections = {
    pantera: 0,
    pavorreal: 0,
    delfin: 0,
    buho: 0
};
let totalQuestions = 14;
let testCompleted = false;
let testResults = null;
let userSelections = {};
let previousSlide = 0;

// DOM References
let $menu = $('#div_menu');
let video = document.getElementById('splash_1');

// Audio Control
function playModuleAudio(moduleId) {
    let audioId = moduleId && moduleId !== "0" ? `musModu_${moduleId}` : `musModu_0`;
    const audio = document.getElementById(audioId);

    if (currentAudio === audio && isAudioPlaying && flagMus === 1) {
        return;
    }

    pauseAllAudio();

    if (audio && flagMus === 1) {
        audio.loop = true;
        audio.volume = 0.3; // Set volume to 30%
        audio.play().then(() => {
            currentAudio = audio;
            isAudioPlaying = true;
            $(".music").attr("src", "assets/img/icons/on.png").removeClass("hide");
        }).catch(err => {
            console.warn("Autoplay blocked or error playing audio:", err);
            isAudioPlaying = false;
            $(".music").attr("src", "assets/img/icons/on.png").removeClass("hide");
        });
    } else if (flagMus === 0) {
        if (audio) {
            audio.loop = true;
            audio.volume = 0.3;
        }
        isAudioPlaying = false;
        $(".music").attr("src", "assets/img/icons/off.png").removeClass("hide");
    } else {
        console.warn(`Audio element ${audioId} not found`);
        isAudioPlaying = false;
        $(".music").attr("src", "assets/img/icons/off.png").removeClass("hide");
    }
}

function pauseAllAudio() {
    const audios = document.querySelectorAll("audio.back.musModu");
    audios.forEach(audio => {
        if (audio && typeof audio.pause === 'function') {
            audio.pause();
            try {
                audio.currentTime = 0;
            } catch (e) {
                console.warn("Error resetting audio time:", e);
            }
        }
    });
    currentAudio = null;
    isAudioPlaying = false;
}

function muteMe(e) {
    e.muted = true;
}

function unMuteMe(e) {
    e.muted = false;
}

function saveFlagMus() {
    prevFlagMus = flagMus;
}

function pauseMusicAndUpdateIcon() {
    saveFlagMus();
    pauseAllAudio();
    $(".music").attr("src", "assets/img/icons/off.png").removeClass("hide");
    flagMus = 0;
}

function restoreMusicAndIcon(moduleId) {
    if (prevFlagMus === 1 && !isAudioPlaying) {
        flagMus = 1;
        playModuleAudio(moduleId);
        $(".music").attr("src", "assets/img/icons/on.png").removeClass("hide");
    }
}

function playAudio(id, audPlay) {
    resetLocution();
    let audio = document.getElementById(id + audPlay);
    if (audio) {
        audio.play();
    } else {
        console.log("audio not found", id + audPlay);
    }
}

function stopLocution(e) {
    e.pause();
    e.currentTime = 0;
}

function resetAud() {
    $('.locution').each(function () {
        this.pause();
        this.currentTime = 0;
    });
}

function resetLocution() {
    var e = document.querySelectorAll(".locution");
    [].forEach.call(e, function (e) {
        if (!e.paused) {
            stopLocution(e);
        }
    });
}

function muteMe_Locut(e) {
    e.muted = true;
}

function unMuteMe_Locut(e) {
    e.muted = false;
}

// Video Control
function playSplashVideo() {
    if (video) {
        video.play().then(() => {
            console.log("Video splash iniciado");
        }).catch((error) => {
            console.log("Error al reproducir el video: ", error);
        });
    }
}

function stopSplashVideo() {
    if (video) {
        video.pause();
        video.currentTime = 0;
        console.log("Video splash detenido y reiniciado");
    }
}

function reproducirHasta(idVideo, tiempoFinal) {
    const $video = $("#" + idVideo);
    if ($video.length === 0) {
        console.error("No se encontró el video con ID:", idVideo);
        return;
    }
    const video = $video[0];
    video.removeAttribute('controls');
    $video.removeAttr('controls');
    video.currentTime = 0;
    video.play();
    $video.on("timeupdate", function () {
        if (this.currentTime >= tiempoFinal) {
            this.pause();
            $video.off("timeupdate");
            this.removeAttribute('controls');
        }
    });
}

function reiniciarVideos(ptrvidSLides) {
    $(ptrvidSLides).each(function () {
        const video = this;
        if (video && typeof video.pause === 'function') {
            video.pause();
            try {
                video.currentTime = 0;
            } catch (e) {
                console.warn("Error resetting video time:", e);
            }
        }
    });
}

// Slide and Carousel Control
function autoNextSlide(moduleId, numSlidesObj, callback) {
    const slideKey = moduleId === 'module1' ? 'numSlides' : `numSlides_${moduleId.slice(-1)}`;
    if (numSlidesObj[slideKey] === 1) {
        clearTimeout(window[`autoSlideTimer_${moduleId}`]);
        window[`autoSlideTimer_${moduleId}`] = setTimeout(() => {
            if (numSlidesObj[slideKey] === 1) {
                numSlidesObj[slideKey]++;
                callback();
            }
        }, 5000);
    }
}


function ctrl_carru_simple(ptrCarruClass, ptrSlideActual) {
    // resetLocution();
    $(".carru_" + ptrCarruClass).hide();
    $("#carru_" + ptrCarruClass + "_" + ptrSlideActual).show();
    // playAudio(ptrCarruClass + '_', ptrSlideActual);
    console.log('ptrCarruClass, ptrSlideActual', ptrCarruClass, ptrSlideActual);
    if (ptrSlideActual <= 1) {
        $("#" + ptrCarruClass + "_Prev").hide();
        $("#" + ptrCarruClass + "_Next").show();
    } else if (ptrSlideActual >= $(".carru_" + ptrCarruClass).length) {
        $("#" + ptrCarruClass + "_Prev").show();
        $("#" + ptrCarruClass + "_Next").hide();
    } else {
        $("#" + ptrCarruClass + "_Prev,#" + ptrCarruClass + "_Next").show();
    }
    if (testCompleted) {
        restoreSelections();
    }
}

function setupCarouselControls(carruClass) {
    $("#" + carruClass + "_Prev").click(function () {
        if (nSlides[carruClass] > 1) {
            nSlides[carruClass]--;
            ctrl_carru_simple(carruClass, nSlides[carruClass]);
        }
    });

    $("#" + carruClass + "_Next").click(function () {
        if (nSlides[carruClass] < $(".carru_" + carruClass).length) {
            nSlides[carruClass]++;
            ctrl_carru_simple(carruClass, nSlides[carruClass]);
        }
    });
}

function resetSlide(variableName) {
    if (typeof nSlides !== "undefined" && typeof variableName === "string") {
        nSlides[variableName] = 1;
    } else {
        console.error("nSlides no está definido o el nombre de la variable no es una cadena.");
    }
}

// Test Logic
function showTestResults(results) {
    const $cardItems = $("#slide_module1_6 .cardTest-item");
    const percentages = [
        { index: 0, value: results.pantera },
        { index: 1, value: results.pavorreal },
        { index: 2, value: results.delfin },
        { index: 3, value: results.buho }
    ];
    const maxPercentage = percentages.reduce((max, current) =>
        current.value > max.value ? current : max, percentages[0]);

    $cardItems.each(function (index) {
        const $percentageText = $(this).find(".testResult-relative p");
        const $progressFill = $(this).find(".progress-bar-fill");
        const $card = $(this);

        $progressFill.css("width", "0%");
        $card.css("transform", "scale(0.9)");

        setTimeout(() => {
            switch (index) {
                case 0:
                    $percentageText.text(`${results.pantera}%`);
                    $progressFill.css("width", `${results.pantera}%`);
                    if (maxPercentage.index === 0) {
                        $card.css("transform", "scale(1.05)");
                    }
                    break;
                case 1:
                    $percentageText.text(`${results.pavorreal}%`);
                    $progressFill.css("width", `${results.pavorreal}%`);
                    if (maxPercentage.index === 1) {
                        $card.css("transform", "scale(1.05)");
                    }
                    break;
                case 2:
                    $percentageText.text(`${results.delfin}%`);
                    $progressFill.css("width", `${results.delfin}%`);
                    if (maxPercentage.index === 2) {
                        $card.css("transform", "scale(1.05)");
                    }
                    break;
                case 3:
                    $percentageText.text(`${results.buho}%`);
                    $progressFill.css("width", `${results.buho}%`);
                    if (maxPercentage.index === 3) {
                        $card.css("transform", "scale(1.05)");
                    }
                    break;
            }
        }, 100);
    });
}

function restoreSelections() {
    $(".body-answers > div > div").each(function () {
        var questionNum = $(this).data('question');
        var type = $(this).parent().data('type');
        if (userSelections[questionNum] === type) {
            $(this).find('img').attr('src', 'assets/img/modules/module-1/slide-4/test/answers/select.png');
            $(this).find('.answer-text').css('color', '#f8fafc');
        } else {
            $(this).find('.answer-text').css('color', '#475569');
        }
        $(this).addClass('disabled').off('click');
    });
}

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
        $('.cardTest').removeClass('mayor-resultado');
        const indexMap = { pantera: 1, pavorreal: 2, delfin: 3, buho: 4 };
        $(`.cardTest:nth-of-type(${indexMap[maxType]})`).addClass('mayor-resultado');
        animateCalif(".cardTest:nth-of-type(1) .testResult-text", testResults.pantera, 1500);
        animateCalif(".cardTest:nth-of-type(2) .testResult-text", testResults.pavorreal, 1500);
        animateCalif(".cardTest:nth-of-type(3) .testResult-text", testResults.delfin, 1500);
        animateCalif(".cardTest:nth-of-type(4) .testResult-text", testResults.buho, 1500);
    } else {
        console.log("Por favor responde todas las preguntas. Faltan " + (totalQuestions - totalSelections) + " preguntas por responder.");
    }
}

// Progress and Achievements
function ctrl_AvGeneral(ptrID, ptrAvMax) {
    $('.btn_avModulos').removeClass('myglow_img_blue animated pulse infinite custom-pulse active-button-glow').css({ 'pointer-events': 'none' }).addClass('w3-opacity');
    if (myAvance.avModulos <= ptrAvMax) {
        for (let i = 1; i < myAvance.avModulos; i++) {
            $(`#btn_avModulos_${i}`).css('pointer-events', 'auto').removeClass('w3-opacity');
        }
        if (myAvance.avModulos >= 1 && myAvance.avModulos <= 3) {
            $(`#btn_avModulos_${myAvance.avModulos}`).addClass('active-button-glow').css('pointer-events', 'auto').removeClass('w3-opacity');
        }
    } else if (myAvance.avModulos >= ptrAvMax) {
        $('.btn_avModulos').css('pointer-events', 'auto').removeClass('w3-opacity');
    }
}

function ctrl_avElem(ptrChptr, ptrClass, ptrID, ptrAvMax, ptrAnimClass, isInit) {
    $('.btn_' + ptrClass).removeClass(ptrAnimClass).css({ 'pointer-events': 'none' }).addClass('w3-opacity');
    if ((myAvance["ch" + ptrChptr][ptrClass] < ptrAvMax) && (myAvance["ch" + ptrChptr][ptrClass] <= parseInt(ptrID))) {
        !1 === isInit && (myAvance["ch" + ptrChptr][ptrClass] = parseInt(ptrID) + 1);
        for (i = 0; i < myAvance["ch" + ptrChptr][ptrClass]; i++) {
            $('#btn_' + ptrClass + '_' + i).css('pointer-events', 'auto').removeClass('w3-opacity ' + ptrAnimClass);
        }
        $('#btn_' + ptrClass + '_' + myAvance["ch" + ptrChptr][ptrClass]).addClass(ptrAnimClass).css('pointer-events', 'auto').removeClass('w3-opacity');
    } else if ((myAvance["ch" + ptrChptr][ptrClass]) >= ptrAvMax) {
        $('.btn_' + ptrClass).css('pointer-events', 'auto').removeClass('w3-opacity');
    }
}

function mostrar_trofeos() {
    let trofeosDesbloqueados = 0;
    if (myAvance.ch1.trofeo_1 === 1) trofeosDesbloqueados++;
    if (myAvance.ch2.trofeo_2 === 1) trofeosDesbloqueados++;
    if (myAvance.ch3.trofeo_3 === 1) trofeosDesbloqueados++;
    $('#txt_trofeo2_ntrofeo').text(trofeosDesbloqueados);
    $('#txt_trofeo_1').css('pointer-events', myAvance.ch1.trofeo_1 === 1 ? 'auto' : 'none')
        .toggleClass('w3-opacity-max', myAvance.ch1.trofeo_1 !== 1);
    $('#txt_trofeo_2').css('pointer-events', myAvance.ch2.trofeo_2 === 1 ? 'auto' : 'none')
        .toggleClass('w3-opacity-max', myAvance.ch2.trofeo_2 !== 1);
    $('#txt_trofeo_3').css('pointer-events', myAvance.ch3.trofeo_3 === 1 ? 'auto' : 'none')
        .toggleClass('w3-opacity-max', myAvance.ch3.trofeo_3 !== 1);
}

function mostrar_logros() {
    let logrosDesbloqueados = 0;
    if (myAvance.ch1.logro_llanta === 1) logrosDesbloqueados++;
    if (myAvance.ch1.logro_casco === 1) logrosDesbloqueados++;
    if (myAvance.ch2.logro_traje === 1) logrosDesbloqueados++;
    if (myAvance.ch2.logro_zapatos === 1) logrosDesbloqueados++;
    if (myAvance.ch3.logo_llantas2 === 1) logrosDesbloqueados++;
    if (myAvance.ch3.logro_volante === 1) logrosDesbloqueados++;
    $('#txt_trofeo2_nlogros').text(logrosDesbloqueados);
    $('#txt_logro_llanta').css('pointer-events', myAvance.ch1.logro_llanta === 1 ? 'auto' : 'none')
        .toggleClass('w3-opacity-max', myAvance.ch1.logro_llanta !== 1);
    $('#txt_logro_casco').css('pointer-events', myAvance.ch1.logro_casco === 1 ? 'auto' : 'none')
        .toggleClass('w3-opacity-max', myAvance.ch1.logro_casco !== 1);
    $('#txt_logro_traje').css('pointer-events', myAvance.ch2.logro_traje === 1 ? 'auto' : 'none')
        .toggleClass('w3-opacity-max', myAvance.ch2.logro_traje !== 1);
    $('#txt_logro_guantes').css('pointer-events', myAvance.ch2.logro_guantes === 1 ? 'auto' : 'none')
        .toggleClass('w3-opacity-max', myAvance.ch2.logro_guantes !== 1);
    $('#txt_logro_zapatos').css('pointer-events', myAvance.ch2.logro_zapatos === 1 ? 'auto' : 'none')
        .toggleClass('w3-opacity-max', myAvance.ch2.logro_zapatos !== 1);
    $('#txt_logro_llantas2').css('pointer-events', myAvance.ch3.logo_llantas2 === 1 ? 'auto' : 'none')
        .toggleClass('w3-opacity-max', myAvance.ch3.logo_llantas2 !== 1);
    $('#txt_logro_volante').css('pointer-events', myAvance.ch3.logro_volante === 1 ? 'auto' : 'none')
        .toggleClass('w3-opacity-max', myAvance.ch3.logro_volante !== 1);
}

// Animations
function anim_fondo(ptrDuracion, ptrNumFondo, ptrTop, ptrLeft, ptrWidth, ptrHeight) {
    var duracionAnimacion = ptrDuracion * 1000;
    $("#back_fondo_" + ptrNumFondo).css({ top: "0", left: "0", width: "100%", height: "100%" });
    $('#back_fondo_' + ptrNumFondo).animate({ top: ptrTop, left: ptrLeft, width: ptrWidth, height: ptrHeight }, duracionAnimacion, 'swing', () => console.log('¡Animación completada!'));
}

function resetFondo(ptrDuracion, ptrNumFondo) {
    $("#back_fondo_" + ptrNumFondo).animate({ top: "0", width: "100%", height: "100%" }, 1E3 * ptrDuracion);
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

// Event Handlers
video.addEventListener('ended', function () {
    stopSplashVideo();
    $('#slide_vidWelcome_1').hide();
    playModuleAudio(null)
});

$("#precache_index").waitForImages({
    finished: function () {
        $('html,body').css({ 'overflow-y': 'hidden' });
        ctrl_AvGeneral(myAvance.avModulos, gAvMax);
    },
    waitForAll: true
});

$('#btn_close_loader').click(function () {
    $('#slide_vidWelcome_1').show();
    playSplashVideo();
    $("#loading_screen").hide();
});

$(".music").click(function () {
    const audios = document.querySelectorAll(".back.musModu");
    if (flagMus === 0) {
        flagMus = 1;
        $(".music").attr("src", "assets/img/icons/on.png");
        if (currentAudio && !isAudioPlaying) {
            unMuteMe(currentAudio);
            currentAudio.volume = 0.3; // Set volume to 30% on unmute
            currentAudio.play().then(() => {
                isAudioPlaying = true;
            }).catch(err => console.warn("Error al reproducir audio:", err));
        }
    } else {
        flagMus = 0;
        $(".music").attr("src", "assets/img/icons/off.png");
        audios.forEach(audio => muteMe(audio));
        isAudioPlaying = false;
    }
});

$('.btn_module').click(function () {
    strID = $(this).attr("id").split("_")[2];
    $('.slide_index,.slide_portada').hide();
    $('#carga_materia').show();
    $('#carga_materia').load(`module_${strID}.html`, function () {
        playModuleAudio(strID);
        bindClickEffect();
        if (strID === "1") {
            ctrl_slidesMod1();
        } else if (strID === "2") {
            ctrl_slidesMod2();
        } else if (strID === "3") {
            ctrl_slidesMod3();
        }
    });
});

$('#btn_menu').click(function () {
    $('#slide_menu_1').show();
    $('#slide_trofeo_1').hide();
    playModuleAudio(null);
});

$('#cls_menu').click(function () {
    $('#slide_menu_1').fadeOut();
});

$('.txt_menu').on({
    click: function () {
        const [, , strMod, strID] = $(this).attr('id').split("_").map(Number);
        const $cargaMateria = $('#carga_materia');
        $('#slide_index_1, .w3-modal, .slide_vidWelcome, .slide_index, .slide_portada, .slide_ganador').hide();
        $cargaMateria.hide().empty().show();
        document.dispatchEvent(new Event('click'));
        $cargaMateria.load(`module_${strMod}.html`, function () {
            playModuleAudio(strMod);
            bindClickEffect();
            if (strMod === 1) {
                if (strID === 1) nSlides.numSlides = 4;
                if (strID === 2) nSlides.numSlides = 9;
                if (strID === 3) nSlides.numSlides = 13;
                ctrl_slidesMod1();
            }
            if (strMod === 2) {
                if (strID === 1) nSlides.numSlides_2 = 3;
                if (strID === 2) nSlides.numSlides_2 = 5;
                if (strID === 3) nSlides.numSlides_2 = 7;
                if (strID === 4) nSlides.numSlides_2 = 14;
                ctrl_slidesMod2();
            }
            if (strMod === 3) {
                if (strID === 1) nSlides.numSlides_3 = 3;
                if (strID === 2) nSlides.numSlides_3 = 4;
                if (strID === 3) nSlides.numSlides_3 = 6;
                if (strID === 4) nSlides.numSlides_3 = 9;
                if (strID === 5) nSlides.numSlides_3 = 11;
                if (strID === 6) nSlides.numSlides_3 = 13;
                ctrl_slidesMod3();
            }
            $('#slide_menu_1').fadeOut();
        });
    },
    mouseover: function () {
        const [, , strMod, strID] = $(this).attr('id').split("_").map(Number);
        $('#img_menu_rect').show().css('top', $(this).css('top')).doAnim('slideInLeft');
    },
    mouseleave: function () {
        $('#img_menu_rect').hide();
    }
});

$('#btn_homeComenzar_1').click(() => $('#mod_start').hide());

$('#btn_sobreMi_1').click(function () {
    pauseAllAudio();
    $('#mod_BienvVid_1').show();
    $('#BienvVid_1').get(0).play();
});

$('#cls_BienvVid_1').click(function () {
    $('#mod_BienvVid_1').hide();
    var video = $('#BienvVid_1').get(0);
    video.pause();
    video.currentTime = 0;
});

$('#btn_sobreMi_2').click(() => $('#mod_conoceCoach_2').show());

$('#cls_conoceCoach_2').click(() => $('#mod_conoceCoach_2').fadeOut());

$('.btn_avModulos').click(function () {
    strID = $(this).attr('id').split("_")[2];
    $('#slide_portada_' + strID).show();
    "1" === strID && anim_fondo(2, strID, "-89%", "0%", "199%", "192%");
    "2" === strID && anim_fondo(2, strID, "-128%", "-66%", "204%", "229%");
    "3" === strID && anim_fondo(2, strID, "-57%", "-75%", "235%", "201%");
});

$('#menu_trigger, #div_menu').hover(() => $menu.stop().animate({ bottom: '0%' }, 300),
    () => $menu.stop().animate({ bottom: '-10%' }, 300));

$('#btn_trofeo').click(function () {
    mostrar_trofeos();
    mostrar_logros();
    $('#slide_trofeo_1').show();
    $('#slide_menu_1').hide();
});

$('#cls_trofeo_1').click(function () {
    $('#slide_trofeo_1').hide();
});

$('.txt_trofeo').on({
    mouseover: function () {
        strID = $(this).attr('id').split("_")[2];
        const relativeTop = $(this).position().top + 'px';
        $('#img_menu_trofeo').show().css('top', relativeTop).doAnim('slideInLeft');
        $('#img_modTrof_1').show().attr('src', 'assets/img/grls/trofeos/trofeo_' + strID + '.gif');
    },
    mouseleave: function () {
        $('#img_menu_trofeo').hide();
    }
});

$('.txt_logro').on({
    mouseover: function () {
        strID = $(this).attr('id').split("_")[2];
        const relativeTop = $(this).position().top + 'px';
        $('#img_menu_trofeo').show().css('top', relativeTop).doAnim('slideInLeft');
        $('#img_modTrof_1').show().attr('src', 'assets/img/trofeos/logro_' + strID + '.gif');
    },
    mouseleave: function () {
        $('#img_menu_trofeo').hide();
    }
});

$('#cls_ganador_1').click(() => $('#slide_ganador_1').fadeOut());

$('.btn_conoceCoach').click(function () {
    strID = $(this).attr('id').split("_")[2];
    console.log('conoceCoach ID:', strID);
    resetLocution();
    $('#mod_conoceCoach_' + strID).show();
});

$('.close_conoceCoach').click(function () {
    strID = $(this).attr('id').split("_")[2];
    $('#mod_conoceCoach_' + strID).hide();
});


$('#btn_comenzarModule_1').click(function () {
    nSlides.numSlides = 2;
    ctrl_slidesMod1();
});


$(".elem_click").click(function () {
    const audio = $("#efct_clic")[0];
    audio.currentTime = 0;
    audio.play().catch((err) => {
        console.warn("No se pudo reproducir el audio:", err);
    });
});

$(".elem_click_modal").click(function () {
    const audio = $("#efct_clic_mod")[0];
    audio.currentTime = 0;
    audio.play().catch((err) => {
        console.warn("No se pudo reproducir el audio:", err);
    });
});


function bindClickEffect() {
    $(document).off('click', '.elem_click');
    $(document).on('click', '.elem_click', function () {
        const audio = $("#efct_clic1")[0];
        if (audio && typeof audio.play === 'function') {
            try {
                audio.currentTime = 0;
                audio.play().catch((err) => {
                    console.warn("No se pudo reproducir el audio:", err);
                });
            } catch (e) {
                console.warn("Error resetting click audio:", e);
            }
        } else {
            console.warn("Audio element #efct_clic1 not found");
        }
    });
}

// Initialization
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(Flip, ScrollTrigger, Observer, ScrollToPlugin, Draggable, MotionPathPlugin, EaselPlugin, PixiPlugin, TextPlugin, RoughEase, ExpoScaleEase, SlowMo, CustomEase);

    const cards = document.querySelectorAll('.cardTest');
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        card.addEventListener('mousemove', rotate);
        card.addEventListener('mouseout', stopRotate);
    }

    setupCarouselControls('test_1');

    if (!testCompleted) {
        $(".body-answers > div > div").click(function () {
            if ($(this).hasClass('disabled')) return;
            var $thisDiv = $(this);
            var questionNum = $thisDiv.data('question');
            var type = $thisDiv.parent().data('type');
            var $questionOptions = $(".body-answers > div > div[data-question='" + questionNum + "']");
            $questionOptions.addClass('disabled');
            $questionOptions.off('click');
            $thisDiv.find('.answer-text').css('color', '#f8fafc');
            $questionOptions.not($thisDiv).find('.answer-text').css('color', '#475569');
            $thisDiv.find('img').attr('src', 'assets/img/modules/module-1/slide-4/test/answers/select.png');
            selections[type]++;
            userSelections[questionNum] = type;
            var totalSelections = selections.pantera + selections.pavorreal + selections.delfin + selections.buho;
            if (totalSelections === totalQuestions) {
                calculateResults();
            }
        });
    }
});