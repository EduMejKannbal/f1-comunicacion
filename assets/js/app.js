// Configuración de módulos
const MODULE_CONFIG = {
    1: {
        sections: [
            { id: 1, slide: 4 },
            { id: 2, slide: 9 },
            { id: 3, slide: 13 }
        ]
    },
    2: {
        sections: [
            { id: 1, slide: 3 },
            { id: 2, slide: 5 },
            { id: 3, slide: 7 },
            { id: 4, slide: 14 }
        ]
    },
    3: {
        sections: [
            { id: 1, slide: 3 },
            { id: 2, slide: 4 },
            { id: 3, slide: 6 },
            { id: 4, slide: 9 },
            { id: 5, slide: 11 },
            { id: 6, slide: 13 }
        ]
    }
};

// Diapositivas sin música
const NO_MUSIC_SLIDES = {
    1: [5, 6, 7, 10, 12, 13],
    2: [4, 6, 9, 10, 11, 12, 13, 15],
    3: [7, 10, 12, 13]
};
const JUEGOS_AUDIO_SLIDES = {
    1: [5],
    2: [9, 10, 11, 12],
    3: [11]
};

// Variables de estado
let strID;
let gAvMax = 4;
let myAvance = localStorage.getItem("myAvance") ? localStorage.getItem("myAvance") : {
    avModulos: 1,
    g_avance: 0,
    ganador: null,
    ch1: {
        estilosComunicacion: 1,
        logro_llanta: 0,
        logro_casco: 0,
        trofeo_1: 0,
        progress: 1
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
        progress: 1
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
        progress: 1
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
let dismissTimeouts = [];
let isAutoDismissEnabled = false;
let isPlaying = false;
let musicaJuegos = document.getElementById("musica_juegos")

// Referencias DOM
let $menu = $('#div_menu');
let video = document.getElementById('splash_1');

//Para ejecugtar ctrl_AvGeneral hasta que hayan datos en myAvance
const checkAvanceReady = setInterval(() => {
    if (myAvance?.avModulos > 0) {
        ctrl_AvGeneral();
        clearInterval(checkAvanceReady);
    }
}, 100);

// Funciones de control de audio
function playModuleAudio(moduleId) {
    console.log(`playModuleAudio called with moduleId: ${moduleId}, flagMus: ${flagMus}, isAudioPlaying: ${isAudioPlaying}`);
    let audioId = moduleId && moduleId !== "0" ? `musModu_${moduleId}` : `musModu_0`;
    const audio = document.getElementById(audioId);
    console.log(`Audio element: ${audioId}, found: ${!!audio}`);

    if (currentAudio === audio && !audio.paused) {
        console.log(`Audio ${audioId} ya está reproduciéndose, no se reinicia.`);
        return;
    }

    if (moduleId == 3) {
        audio.currentTime = 1;
    }

    pauseAllAudio(); // Pausar toda la música de fondo
    if (isPlaying) {
        playMusicaJuegos()
    } else {
        if (audio && flagMus === 1) {
            audio.loop = true;
            audio.volume = 0.3;
            audio.muted = false;
            currentAudio = audio;
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log(`Playing audio: ${audioId}`);
                    isAudioPlaying = true;
                    if (!$('#slide_vidWelcome_1').is(':visible')) {
                        $(".music").attr("src", "assets/img/icons/on.png").removeClass("hide");
                    }
                }).catch(err => {
                    console.warn(`Autoplay blocked or error playing audio: ${audioId}`, err);
                    isAudioPlaying = false;
                    if (!$('#slide_vidWelcome_1').is(':visible')) {
                        $(".music").attr("src", "assets/img/icons/off.png").removeClass("hide");
                    }
                    document.addEventListener('click', function retryAudio() {
                        audio.play().then(() => {
                            console.log(`Retry successful, playing audio: ${audioId}`);
                            isAudioPlaying = true;
                            $(".music").attr("src", "assets/img/icons/on.png").removeClass("hide");
                        }).catch(err => console.warn(`Retry failed for ${audioId}:`, err));
                        document.removeEventListener('click', retryAudio);
                    }, { once: true });
                });
            }
        } else if (flagMus === 0) {
            if (audio) {
                audio.loop = true;
                audio.volume = 0.3;
                audio.muted = true;
                currentAudio = audio;
                console.log(`Audio ${audioId} muted due to flagMus=0`);
            }
            isAudioPlaying = false;
            if (!$('#slide_vidWelcome_1').is(':visible')) {
                $(".music").attr("src", "assets/img/icons/off.png").removeClass("hide");
            }
        } else {
            console.warn(`Audio element ${audioId} not found`);
            isAudioPlaying = false;
            currentAudio = null;
            if (!$('#slide_vidWelcome_1').is(':visible')) {
                $(".music").attr("src", "assets/img/icons/off.png").removeClass("hide");
            }
        }
    }
}

function pauseAllAudio() {
    const audios = document.querySelectorAll("audio.back.musModu");
    audios.forEach(audio => {
        if (audio && typeof audio.pause === 'function' && !audio.paused) {
            audio.pause();
            try {
                audio.currentTime = 0;
                audio.muted = true;
            } catch (e) {
                console.warn("Error resetting audio time:", e);
            }
        }
    });
    pauseMusicaJuegos();
    isAudioPlaying = false;
    console.log("Background audio paused");
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

function pauseMusicaJuegos() {
    musicaJuegos.muted = true;
    musicaJuegos.currentTime = 0
    musicaJuegos.pause()
}

function playMusicaJuegos() {
    musicaJuegos.loop = true;
    musicaJuegos.volume = 0.3;
    musicaJuegos.muted = false;
    currentAudio = musicaJuegos;

    musicaJuegos.play().then(() => {
        isAudioPlaying = true;
        $(".music").attr("src", "assets/img/icons/on.png").removeClass("hide");
        console.log("Música de juego activada correctamente");
    }).catch(err => {
        console.warn("Error al reproducir música de juego:", err);
        isAudioPlaying = false;
        $(".music").attr("src", "assets/img/icons/off.png").removeClass("hide");

        document.addEventListener('click', function retryPlay() {
            musicaJuegos.play().then(() => {
                isAudioPlaying = true;
                $(".music").attr("src", "assets/img/icons/on.png").removeClass("hide");
            }).catch(err => console.warn("Retry falló para musica_juegos:", err));
            document.removeEventListener('click', retryPlay);
        }, { once: true });
    });
}


function manageSlideAudio(moduleId, currentSlide) {
    // Si es una slide de juego y el usuario tiene audio activado
    if (JUEGOS_AUDIO_SLIDES[moduleId]?.includes(currentSlide) && flagMus === 1) {
        isPlaying = true;
        pauseAllAudio();
        playMusicaJuegos();
    }
    // Si no está en lista negra y sonido activo, reproduce música del módulo
    else if (!NO_MUSIC_SLIDES[moduleId]?.includes(currentSlide) && flagMus === 1) {
        isPlaying = false;
        playModuleAudio(moduleId);
    }
    // Si está en NO_MUSIC_SLIDES o flagMus === 0, pausa todo
    else {
        isPlaying = false;
        pauseAllAudio();
        if (currentAudio) muteMe(currentAudio);
        $(".music").attr("src", "assets/img/icons/off.png").removeClass("hide");
    }
}


function pauseMusicAndUpdateIcon() {
    saveFlagMus();
    pauseAllAudio();
    $(".music").attr("src", "assets/img/icons/off.png").removeClass("hide");
    flagMus = 0;
    localStorage.setItem('flagMus', flagMus);
}

function restoreMusicAndIcon(moduleId) {
    if (prevFlagMus === 1 && !isAudioPlaying && currentAudio) {
        flagMus = 1;
        localStorage.setItem('flagMus', flagMus);
        unMuteMe(currentAudio);
        currentAudio.volume = 0.3;
        currentAudio.play().then(() => {
            isAudioPlaying = true;
            $(".music").attr("src", "assets/img/icons/on.png").removeClass("hide");
        }).catch(err => console.warn("Error restoring audio:", err));
    } else if (flagMus === 1) {
        playModuleAudio(moduleId);
    }
}

function playAudio(id, audPlay) {
    const targetAudioId = id + audPlay;
    const locutions = document.querySelectorAll(".locution");
    locutions.forEach(audio => {
        if (audio.id !== targetAudioId && !audio.paused) {
            stopLocution(audio);
        }
    });
    pauseMusicaJuegos()

    let audio = document.getElementById(targetAudioId);
    if (isPlaying) {
        playMusicaJuegos()
    } else if (audio) {
        audio.volume = 0.3;
        audio.muted = false;
        audio.currentTime = 0;
        audio.play().then(() => {
            console.log("Audio playing:", targetAudioId);
        }).catch(err => {
            console.warn("Error playing audio:", targetAudioId, err);
        });
    } else {
        console.warn("Audio not found:", targetAudioId);
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

// Funciones de control de video
function playSplashVideo() {
    if (video) {
        video.volume = 0.3;
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
    video.volume = 0.3;
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

// Funciones de control de diapositivas
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
    $(".carru_" + ptrCarruClass).hide();
    $("#carru_" + ptrCarruClass + "_" + ptrSlideActual).show();
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

function showTestResults(results) {
    console.log("Mostrando resultados con animación secuencial");
    const $cardItems = $("#slide_module1_6 .cardTest-item");
    const percentages = [
        { index: 0, value: results.pantera, type: 'pantera' },
        { index: 1, value: results.pavorreal, type: 'pavorreal' },
        { index: 2, value: results.delfin, type: 'delfin' },
        { index: 3, value: results.buho, type: 'buho' }
    ];
    const maxPercentage = percentages.reduce((max, current) =>
        current.value > max.value ? current : max, percentages[0]);

    $cardItems.css({ opacity: 0, transform: 'scale(0.8)' });

    const $winnerCard = $cardItems.eq(maxPercentage.index);
    const winnerDelay = 500;
    setTimeout(() => {
        console.log(`Animando card ganadora: ${maxPercentage.type} (${maxPercentage.value}%)`);
        const $percentageText = $winnerCard.find(".testResult-relative p");
        const $progressFill = $winnerCard.find(".progress-bar-fill");
        $percentageText.text(`${maxPercentage.value}%`);
        $progressFill.css("width", `${maxPercentage.value}%`);
        $winnerCard.parent().addClass('mayor-resultado');
        $winnerCard.css({ opacity: 1, transform: 'scale(1.05)' });
    }, winnerDelay);

    percentages
        .filter(p => p.index !== maxPercentage.index)
        .forEach((p, i) => {
            const $card = $cardItems.eq(p.index);
            const delay = winnerDelay + 500 + (i + 1) * 500;
            setTimeout(() => {
                console.log(`Animando card: ${p.type} (${p.value}%)`);
                const $percentageText = $card.find(".testResult-relative p");
                const $progressFill = $card.find(".progress-bar-fill");
                $percentageText.text(`${p.value}%`);
                $progressFill.css("width", `${p.value}%`);
                $card.css({ opacity: 1, transform: 'scale(0.9)' });
            }, delay);
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
    console.log("Usando la función calculateResults correcta con lógica de modal");
    var totalSelections = selections.pantera + selections.pavorreal + selections.delfin + selections.buho;
    console.log("Total selecciones:", totalSelections, "Total preguntas:", totalQuestions);
    if (totalSelections === totalQuestions) {
        console.log("Mostrando el modal de procesamiento");
        $('#processingModal').show();

        const processingAudio = $('#aud_processing').get(0);
        if (processingAudio) {
            processingAudio.volume = 0.3;
            processingAudio.currentTime = 0;
            processingAudio.play().catch(err => console.warn("Error al reproducir audio de procesamiento:", err));
        }

        testResults = {
            pantera: Math.round((selections.pantera / totalQuestions) * 100),
            pavorreal: Math.round((selections.pavorreal / totalQuestions) * 100),
            delfin: Math.round((selections.delfin / totalQuestions) * 100),
            buho: Math.round((selections.buho / totalQuestions) * 100)
        };

        console.log("Resultados del Test:", testResults);
        testCompleted = true;

        localStorage.setItem('testResults', JSON.stringify(testResults));
        localStorage.setItem('userSelections', JSON.stringify(userSelections));
        localStorage.setItem('testCompleted', JSON.stringify(testCompleted));
        localStorage.setItem('myAvance', JSON.stringify(myAvance));

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

        setTimeout(() => {
            console.log("Ocultando modal y pasando al slide 6");
            $('#processingModal').hide();
            nSlides.numSlides = 6;
            ctrl_slidesMod1();

            $('.cardTest').removeClass('mayor-resultado');
            const indexMap = { pantera: 1, pavorreal: 2, delfin: 3, buho: 4 };
            $(`.cardTest:nth-of-type(${indexMap[maxType]})`).addClass('mayor-resultado');

            animateCalif(".cardTest:nth-of-type(1) .testResult-text", testResults.pantera, 1500);
            animateCalif(".cardTest:nth-of-type(2) .testResult-text", testResults.pavorreal, 1500);
            animateCalif(".cardTest:nth-of-type(3) .testResult-text", testResults.delfin, 1500);
            animateCalif(".cardTest:nth-of-type(4) .testResult-text", testResults.buho, 1500);
        }, 3000);
    } else {
        console.log("Test incompleto. Faltan preguntas:", totalQuestions - totalSelections);
    }
}

function ctrl_AvGeneral() {
    let ptrAvMax = 3;

    $('.btn_avModulos')
        .removeClass('myglow_img_blue animated pulse infinite custom-pulse active-button-glow')
        .css({ 'pointer-events': 'none' })
        .addClass('w3-opacity');

    const actual = myAvance.avModulos;
    $(`#btn_avModulos_${actual}`)
        .css('pointer-events', 'auto')
        .removeClass('w3-opacity')
        .addClass('active-button-glow');

    if (actual <= ptrAvMax) {
        for (let i = 1; i < actual; i++) {
            $(`#btn_avModulos_${i}`)
                .css('pointer-events', 'auto')
                .removeClass('w3-opacity');
        }
    } else {
        $('.btn_avModulos')
            .css('pointer-events', 'auto')
            .removeClass('w3-opacity');
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
    if (myAvance.ch2.logro_guantes === 1) logrosDesbloqueados++;
    if (myAvance.ch2.logro_zapatos === 1) logrosDesbloqueados++;
    if (myAvance.ch3.logro_llantas2 === 1) logrosDesbloqueados++;
    if (myAvance.ch3.logro_volante === 1) logrosDesbloqueados++;
    $('#txt_trofeo2_nlogros').text(logrosDesbloqueados);
    $('#txt_logro_llanta').css('pointer-events', myAvance.ch1.logro_llanta === 0 ? 'none' : 'auto')
        .toggleClass('w3-opacity-max', myAvance.ch1.logro_llanta !== 1);
    $('#txt_logro_casco').css('pointer-events', myAvance.ch1.logro_casco === 1 ? 'auto' : 'none')
        .toggleClass('w3-opacity-max', myAvance.ch1.logro_casco !== 1);
    $('#txt_logro_traje').css('pointer-events', myAvance.ch2.logro_traje === 1 ? 'auto' : 'none')
        .toggleClass('w3-opacity-max', myAvance.ch2.logro_traje !== 1);
    $('#txt_logro_guantes').css('pointer-events', myAvance.ch2.logro_guantes === 1 ? 'auto' : 'none')
        .toggleClass('w3-opacity-max', myAvance.ch2.logro_guantes !== 1);
    $('#txt_logro_zapatos').css('pointer-events', myAvance.ch2.logro_zapatos === 1 ? 'auto' : 'none')
        .toggleClass('w3-opacity-max', myAvance.ch2.logro_zapatos !== 1);
    $('#txt_logro_llantas2').css('pointer-events', myAvance.ch3.logro_llantas2 === 1 ? 'auto' : 'none')
        .toggleClass('w3-opacity-max', myAvance.ch3.logro_llantas2 !== 1);
    $('#txt_logro_volante').css('pointer-events', myAvance.ch3.logro_volante === 1 ? 'auto' : 'none')
        .toggleClass('w3-opacity-max', myAvance.ch3.logro_volante !== 1);
}

// Funciones de animación
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

function controlBackgroundMusic(moduleId, currentSlide) {
    if (NO_MUSIC_SLIDES[moduleId].includes(currentSlide)) {
        pauseAllAudio();
        if (currentAudio) {
            muteMe(currentAudio);
        }
        $(".music").attr("src", "assets/img/icons/off.png").removeClass("hide");
    } else if (flagMus === 1 && !isAudioPlaying) {
        restoreMusicAndIcon(moduleId.toString());
    }
}

// Funciones de soporte para el menú
function stopPreviousAnimations($element) {
    $element.stop(true, true);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function resetMenuImages() {
    $('#img_menu_rect, #img_menu_trofeo, #img_modTrof_1')
        .hide()
        .removeClass('animated slideInLeft')
        .stop(true, true);
}

function autoDismissElements(moduleNum, slideNumber) {
    // Limpiar temporizadores existentes
    dismissTimeouts.forEach(timeout => clearTimeout(timeout));
    dismissTimeouts = [];

    // Salir temprano si el ocultamiento automático está deshabilitado
    if (!isAutoDismissEnabled) {
        console.log(`Ocultamiento automático deshabilitado para módulo ${moduleNum}, diapositiva ${slideNumber}`);
        return;
    }

    const moduleConfig = {
        1: {
            slides: [7, 10, 13],
            trofeoIds: ['#modal_trofeo1', '#modal_trofeo2', '#modal_trofeo3']
        },
        2: {
            slides: [4, 6, 13, 15],
            trofeoIds: ['#modal_trofeo2', '#modal_trofeo3', '#modal_trofeo3', '#modal_trofeo4']
        },
        3: {
            slides: [7, 10, 12],
            trofeoIds: ['#modal_trofeo1', '#modal_trofeo2', '#modal_trofeo3']
        }
    };

    const config = moduleConfig[moduleNum];
    if (!config || !config.slides.includes(slideNumber)) {
        console.log(`No hay configuración para el módulo ${moduleNum}, diapositiva ${slideNumber}`);
        return;
    }

    const contenidoClass = '.contenido-logro-animado';
    const contenidoDelay = 5000; // 5 segundos para contenido-logro-animado
    const trofeoDelay = 6000; // 6 segundos para trofeos (después de que termina la animación de contenido)

    // Ocultar contenido-logro-animado primero
    const $contenido = $(`#slide_module${moduleNum}_${slideNumber} ${contenidoClass}`);
    console.log(`Contenido encontrado:`, $contenido.length, `Visible:`, $contenido.is(':visible'));
    if ($contenido.length) {
        const timeout = setTimeout(() => {
            $contenido.removeClass('fadeIn').addClass('fadeOut');
            setTimeout(() => {
                $contenido.hide();
            }, 1000); // Esperar a que termine la animación fadeOut (1s)
        }, contenidoDelay);
        dismissTimeouts.push(timeout);
    }

    // Ocultar trofeos después del contenido
    config.trofeoIds.forEach(id => {
        const $element = $(`#slide_module${moduleNum}_${slideNumber} ${id}`);
        console.log(`Trofeo ${id} encontrado:`, $element.length, `Visible:`, $element.is(':visible'));
        if ($element.length) {
            const timeout = setTimeout(() => {
                $element.removeClass('slideInRight').addClass('slideOutRight');
                setTimeout(() => {
                    $element.hide();
                }, 1000); // Esperar a que termine la animación slideOutRight (1s)
            }, trofeoDelay);
            dismissTimeouts.push(timeout);
        }
    });
}

// Manejadores de eventos
video.addEventListener('ended', function () {
    stopSplashVideo();
    $('#slide_vidWelcome_1').hide();
    $('#mod_start').css('display', 'block');
    playModuleAudio(null);
});

$("#precache_index").waitForImages({
    finished: function () {
        $('html,body').css({ 'overflow-y': 'hidden' });
    },
    waitForAll: true
});

$('#btn_close_loader').click(function () {
    $('#slide_vidWelcome_1').show();
    playSplashVideo();
    $("#loading_screen").hide();
});

$(".music").click(function () {
    if (flagMus === 0) {
        flagMus = 1;
        localStorage.setItem('flagMus', flagMus);
        $(".music").attr("src", "assets/img/icons/on.png");
        if (currentAudio) {
            unMuteMe(currentAudio);
            currentAudio.volume = 0.3;
            currentAudio.play().then(() => {
                isAudioPlaying = true;
                console.log("Audio resumed after unmute");
            }).catch(err => console.warn("Error resuming audio:", err));
        } else {
            const moduleId = strID || null;
            playModuleAudio(moduleId);
        }
    } else {
        flagMus = 0;
        localStorage.setItem('flagMus', flagMus);
        $(".music").attr("src", "assets/img/icons/off.png");
        if (currentAudio) {
            muteMe(currentAudio);
            currentAudio.pause();
            isAudioPlaying = false;
            console.log("Audio muted and paused");
        }
    }
});

$('.btn_module').click(function () {
    strID = $(this).attr("id").split("_")[2];
    $('.slide_index,.slide_portada').hide();
    $('#carga_materia').show();
    $('#carga_materia').load(`module_${strID}.html`, function () {
        playModuleAudio(strID);
        restoreMusicAndIcon(strID);
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
    resetLocution();
    saveFlagMus();
    $('#slide_menu_1').show();
    $('#slide_trofeo_1').hide();
    ctrl_menuAccess();
    setTimeout(() => {
        const menuAudio = document.getElementById('musModu_4');
        if (menuAudio) {
            pauseAllAudio();
            menuAudio.loop = true;
            menuAudio.volume = 0.3;
            menuAudio.muted = false;
            menuAudio.play().then(() => {
                console.log("Playing menu audio: musModu_4");
                currentAudio = menuAudio;
                isAudioPlaying = true;
                $(".music").attr("src", "assets/img/icons/on.png").removeClass("hide");
            }).catch(err => {
                console.warn("Error playing menu audio: musModu_4", err);
                isAudioPlaying = false;
                $(".music").attr("src", "assets/img/icons/off.png").removeClass("hide");
            });
        }
    }, 100);
});

$('#cls_menu').click(function () {
    $('#slide_menu_1').fadeOut();
    pauseAllAudio();
    flagMus = prevFlagMus;
    localStorage.setItem('flagMus', flagMus);
    if (flagMus === 1) {
        playModuleAudio(null);
        $(".music").attr("src", "assets/img/icons/on.png").removeClass("hide");
    } else {
        $(".music").attr("src", "assets/img/icons/off.png").removeClass("hide");
    }
});

$('.txt_menu').each(function () {
    const $this = $(this);
    const [, , strMod, strID] = $this.attr('id').split("_").map(Number);

    $this.on({
        mouseover: debounce(function () {
            resetMenuImages();
            if (strMod <= myAvance.avModulos && strID <= myAvance[`ch${strMod}`].progress) {
                const $audio = $(`#aud_menuOver`)[0];
                const relativeTop = $this.position().top + 'px';
                const $imgMenuRect = $('#img_menu_rect');

                stopPreviousAnimations($imgMenuRect);

                $imgMenuRect
                    .show()
                    .css({ top: relativeTop, left: '0px' })
                    .addClass('animated slideInLeft');

                console.log(`[Menu] Mostrando img_menu_rect para txt_menu_${strMod}_${strID} en top: ${relativeTop}`);

                if ($audio) {
                    $audio.currentTime = 0;
                    $audio.play().catch(err => console.warn(`Error al reproducir aud_menuOver: ${err}`));
                }
            }
        }, 100),

        mouseleave: function () {
            const $imgMenuRect = $('#img_menu_rect');
            stopPreviousAnimations($imgMenuRect);
            $imgMenuRect.hide().removeClass('animated slideInLeft');
            console.log(`[Menu] Ocultando img_menu_rect para txt_menu_${strMod}_${strID}`);
        },

        click: function () {
            let canAccess = false;
            resetLocution();

            if (strMod <= myAvance.avModulos) {
                if (myAvance[`ch${strMod}`].progress >= strID) {
                    canAccess = true;
                }
            }

            if (canAccess) {
                const $cargaMateria = $('#carga_materia');
                $('#slide_index_1, .mod_estilosComunicacion, .modalesVideosContenido .w3-modal, .slide_vidWelcome, .slide_index, .slide_portada, .slide_ganador, #vid_in_modal').hide();
                $cargaMateria.hide().empty().show();
                document.dispatchEvent(new Event('click'));
                $cargaMateria.load(`module_${strMod}.html`, function () {
                    playModuleAudio(strMod);
                    restoreMusicAndIcon(strMod);
                    bindClickEffect();
                    const slide = MODULE_CONFIG[strMod].sections.find(s => s.id === strID)?.slide;

                    if (slide) {
                        if (strMod === 1) {
                            nSlides.numSlides = slide;
                            ctrl_slidesMod1();
                        } else if (strMod === 2) {
                            nSlides.numSlides_2 = slide;
                            ctrl_slidesMod2();
                        } else if (strMod === 3) {
                            nSlides.numSlides_3 = slide;
                            ctrl_slidesMod3();
                        }
                    }
                    $('#slide_menu_1').fadeOut();
                });
            } else {
                alert(`Debes completar la sección anterior del Módulo ${strMod} antes de continuar.`);
            }
        }
    });
});

// Función para resetear imágenes del menú
function resetMenuImages() {
    $('#img_menu_rect, #img_menu_trofeo, #img_modTrof_1')
        .stop(true, true) // Detiene todas las animaciones pendientes
        .hide() // Oculta explícitamente
        .removeClass('animated slideInLeft') // Elimina clases de animación
        .css('display', 'none'); // Asegura que el display sea none
}

// Manejador para trofeos
$('.txt_trofeo').each(function () {
    const $this = $(this);
    const strID = $this.attr('id').split("_")[2];

    $this.on({
        mouseover: debounce(function () {
            resetMenuImages();
            const relativeTop = $this.position().top + 'px';
            const $audio = $(`#aud_menutrof`)[0];
            const $imgMenuTrofeo = $('#img_menu_trofeo');
            const $imgModTrof = $('#img_modTrof_1');
            const trofeoSrc = `assets/img/grls/trofeos/trofeo_${strID}.gif`;

            stopPreviousAnimations($imgMenuTrofeo);
            stopPreviousAnimations($imgModTrof);

            $imgMenuTrofeo
                .css({ top: relativeTop, left: '0px', display: 'block' }) // Asegura que se muestre
                .addClass('animated slideInLeft');

            $imgModTrof
                .attr('src', trofeoSrc)
                .css('display', 'block'); // Asegura que se muestre

            console.log(`[Trofeo] Mostrando img_menu_trofeo y img_modTrof_1 (${trofeoSrc}) para txt_trofeo_${strID}`);

            if ($audio) {
                $audio.currentTime = 0;
                $audio.play().catch(err => console.warn(`Error al reproducir aud_menutrof: ${err}`));
            }
        }, 100),

        mouseleave: function () {
            const $imgMenuTrofeo = $('#img_menu_trofeo');
            const $imgModTrof = $('#img_modTrof_1');
            stopPreviousAnimations($imgMenuTrofeo);
            stopPreviousAnimations($imgModTrof);
            $imgMenuTrofeo
                .removeClass('animated slideInLeft')
                .css('display', 'none'); // Oculta explícitamente
            $imgModTrof
                .css('display', 'none'); // Oculta explícitamente
            console.log(`[Trofeo] Ocultando img_menu_trofeo y img_modTrof_1 para txt_trofeo_${strID}`);
        }
    });
});

// Manejador para logros
$('.txt_logro').each(function () {
    const $this = $(this);
    const strID = $this.attr('id').split("_")[2];

    $this.on({
        mouseover: debounce(function () {
            resetMenuImages();
            const relativeTop = $this.position().top + 'px';
            const $audio = $(`#aud_menulogro`)[0];
            const $imgMenuTrofeo = $('#img_menu_trofeo');
            const $imgModTrof = $('#img_modTrof_1');
            const logroSrc = `assets/img/trofeos/logro_${strID}.gif`;

            stopPreviousAnimations($imgMenuTrofeo);
            stopPreviousAnimations($imgModTrof);

            $imgMenuTrofeo
                .css({ top: relativeTop, left: '0px', display: 'block' }) // Asegura que se muestre
                .addClass('animated slideInLeft');

            $imgModTrof
                .attr('src', logroSrc)
                .css('display', 'block'); // Asegura que se muestre

            console.log(`[Logro] Mostrando img_menu_trofeo y img_modTrof_1 (${logroSrc}) para txt_logro_${strID}`);

            if ($audio) {
                $audio.currentTime = 0;
                $audio.play().catch(err => console.warn(`Error al reproducir aud_menulogro: ${err}`));
            }
        }, 100),

        mouseleave: function () {
            const $imgMenuTrofeo = $('#img_menu_trofeo');
            const $imgModTrof = $('#img_modTrof_1');
            stopPreviousAnimations($imgMenuTrofeo);
            stopPreviousAnimations($imgModTrof);
            $imgMenuTrofeo
                .removeClass('animated slideInLeft')
                .css('display', 'none'); // Oculta explícitamente
            $imgModTrof
                .css('display', 'none'); // Oculta explícitamente
            console.log(`[Logro] Ocultando img_menu_trofeo y img_modTrof_1 para txt_logro_${strID}`);
        }
    });
});

$('.btn_homeComenzar').click(function () {
    const $this = $(this);
    const strID = $this.attr('id').split("_")[2];
    const nextID = parseInt(strID) + 1;

    if (nextID <= 2) {
        // Transición para el texto
        $('.mod_start_txt').fadeOut(150, function () {
            $(this)
                .attr('src', `assets/img/menu/txt_mod_menu_${nextID}.svg`)
                .attr('id', `mod_start_txt_${nextID}`)
                .fadeIn(150);
        });

        // Transición para el botón
        $this.fadeOut(150, function () {
            $(this)
                .attr('src', `assets/img/icons/btn_${nextID}.png`)
                .attr('id', `btn_homeComenzar_${nextID}`)
                .fadeIn(150);
        });
    } else {
        $('#mod_start').fadeOut(200); // Transición al cerrar
    }
});


$('#btn_sobreMi_1').click(function () {
    pauseAllAudio();
    $('#mod_BienvVid_1').show();
    const bienvVideo = $('#BienvVid_1').get(0);
    bienvVideo.play();
});

$('#cls_BienvVid_1').click(function () {
    $('#mod_BienvVid_1').hide();
    var video = $('#BienvVid_1').get(0);
    video.pause();
    video.currentTime = 0;
    playModuleAudio(null);
});

$('#btn_sobreMi_2').click(() => $('#mod_conoceCoach_2').show());

$('#cls_conoceCoach_2').click(() => {
    $('#mod_conoceCoach_2').fadeOut();
});

$('.btn_avModulos').click(function () {
    resetLocution();
    strID = $(this).attr('id').split('_')[2];
    $('#slide_portada_' + strID).show();
    if (strID === "1") {
        anim_fondo(2, strID, "-89%", "0%", "199%", "192%");
    } else if (strID === "2") {
        anim_fondo(2, strID, "-128%", "-66%", "204%", "229%");
    } else if (strID === "3") {
        anim_fondo(2, strID, "-57%", "-75%", "235%", "201%");
    }
});

$('#menu_trigger, #div_menu').hover(() => $menu.stop().animate({ bottom: '0%' }, 300),
    () => $menu.stop().animate({ bottom: '-10%' }, 300));

$('#btn_trofeo').click(function () {
    pauseAllAudio();
    mostrar_trofeos();
    mostrar_logros();
    $('#slide_trofeo_1').show();
    setTimeout(() => {
        playModuleAudio(4);
        restoreMusicAndIcon();
    }, 100);
});

$('#cls_trofeo_1').click(function () {
    pauseAllAudio();
    $('#slide_trofeo_1').hide();
    setTimeout(() => {
        playModuleAudio(null);
        restoreMusicAndIcon(null);
    }, 100);
});

$('#cls_ganador_1').click(() => $('#slide_ganador_1').fadeOut());

$('.btn_conoceCoach').click(function () {
    strID = $(this).attr('id').split('_')[2];
    console.log('conoceCoach ID:', strID);
    resetLocution();
    $('#mod_conoceCoach_' + strID).show();
});

$('.close_conoceCoach').click(function () {
    strID = $(this).attr('id').split('_')[2];
    $('#mod_conoceCoach_' + strID).fadeOut();
});

$('#btn_comenzarModule_1').click(function () {
    nSlides.numSlides = numSlides2;
    ctrl_slidesMod1();
});

$("#module1_Prev").click(function () {
    resetLocution();
    if (1 < nSlides.numSlides) {
        nSlides.numSlides--;
        ctrl_slidesMod1();
    }
});

$("#module1_Next").click(function () {
    resetLocution();
    if ($('.slide_module1').length > nSlides.numSlides) {
        nSlides.numSlides++;
        ctrl_slidesMod1();
    }
});

$(".elem_click").click(function () {
    const audio = $("#efct_clic")[0];
    audio.currentTime = 0;
    audio.play().catch((err) => {
        console.warn("No se pudo reproducir el audio:", err);
        console.log("Error al reproducir el audio: ", err);
    });
});

$(".elem_click_modal").click(function () {
    const audio = $("#efct_clic_mod")[0];
    audio.currentTime = 0; audio.play().catch((err) => {
        console.warn("Error al reproducir el.span audio", err);
    });
});

$(".elem_click_reto").click(function () {
    const audio = $("#efct_clic_jue")[0];
    console.log("elemClick clic reto");
    audio.currentTime = 0;
    audio.play().catch(err => {
        console.warn("Error al reproducir el audio: ", err);
    });
});

function bindClickEffect() {
    $(document).off('click', '.elem_click');
    $(document).on('click', '.elem_click', function () {
        const audio = document.querySelector("#efct_clic1");
        if (audio && typeof audio.play === 'function') {
            try {
                audio.currentTime = 0;
                audio.play().catch((err) => {
                    console.warn("error al reproducir el audio:", err);
                });
            } catch (e) {
                console.warn("Error resetting el audio de click:", e);
            }
        } else {
            console.warn("Elemento de audio #efct_clic1 no encontrado");
        }
    });
}

function ctrl_menuAccess() {
    $('.txt_menu').each(function () {
        const [, , strMod, strID] = $(this).attr('id').split('_').map(Number);
        let isAccessible = false;

        if (strMod <= myAvance.avModulos) {
            const moduleProgress = myAvance[`ch${strMod}`].progress;
            if (strID <= moduleProgress) {
                isAccessible = true;
            }
        }

        if (isAccessible) {
            $(this).removeClass('w3-opacity-max locked').css('pointer-events', 'auto');
            $(this).find('.lock-icon').remove();
        } else {
            $(this).addClass('w3-opacity-max locked').css('pointer-events', 'none');
            if (!$(this).find('.lock-icon').length) {
                $(this).append('<span class="lock-icon">🔒</span>');
            }
        }
    });
}

const $buttons = $('.btn_estilosComunicacion');
const $container = $('#slide_module1_9');

$buttons.each(function () {
    var num = $(this).attr('id').split('_')[2];
    if (!$('#hov_estilosComunicacion_' + num).length) {
        $('<img>')
            .attr({ id: 'hov_estilosComunicacion_' + num, src: 'assets/img/modules/module-1/slide-9/no_' + num + '.png' })
            .addClass('absolute hov_estilosComunicacion')
            .appendTo($container);
    }
});

$buttons.hover(
    function () {
        var num = $(this).attr('id').split('_')[2];
        const $hoverImg = $(`#hov_estilosComunicacion_${num}`);
        const $audio = $(`#aud_estilosComunicacion_${num}`)[0];

        $('.hov_estilosComunicacion').hide().removeClass('animated fadeInRight');
        $hoverImg.show().addClass('animated fadeInRight');
        $buttons.css('opacity', '0.5');
        $(this).css({ 'opacity': '1', 'transform': 'scale(1.05)' });

        if ($audio) {
            $audio.currentTime = 0;
            $audio.play();
        }
    },
    function () {
        var num = $(this).attr('id').split('_')[2];
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
    nSlides.numSlides = 1;
    if (myAvance.avModulos < 2) {
        myAvance.avModulos = 2;
        myAvance.ch1.trofeo_1 = 1;
        ctrl_menuAccess();
    }
    pauseAllAudio();
    $(".music").removeClass("hide");
    resetFondo(1, 2);
    $('#slide_index_1').show();
    $("#carga_materia").hide().empty();
    ctrl_AvGeneral(myAvance.avModulos, gAvMax);
    playModuleAudio(null);
    localStorage.setItem('myAvance', JSON.stringify(myAvance));
});

// Inicialización
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem('testResults')) {
        testResults = JSON.parse(localStorage.getItem('testResults'));
        userSelections = JSON.parse(localStorage.getItem('userSelections'));
        testCompleted = JSON.parse(localStorage.getItem('testCompleted'));
        myAvance = JSON.parse(localStorage.getItem('myAvance')) || myAvance;
        selections = {
            pantera: Object.values(userSelections).filter(val => val === 'pantera').length,
            pavorreal: Object.values(userSelections).filter(val => val === 'pavorreal').length,
            delfin: Object.values(userSelections).filter(val => val === 'delfin').length,
            buho: Object.values(userSelections).filter(val => val === 'buho').length
        };
    }

    $(".music").addClass("hide").attr("src', 'assets/img/icons/icon.png");
    if (localStorage.getItem('flagMus')) {
        flagMus = parseInt(localStorage.getItem('flagMus'));
        if (flagMus === 0) {
            $(".music").attr("src", "assets/img/icons/off.png");
        } else {
            $(".music").attr("src", "assets/img/icons/on.png");
        }
    }

    gsap.registerPlugin(Flip, ScrollTrigger, Observer, ScrollToPlugin, Draggable, MotionPathPlugin, EaselPlugin, PixiPlugin, TextPlugin, RoughEase, ExpoScaleEase, SlowMo, CustomEase);

    const cards = document.querySelectorAll('.cardTest');
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        card.addEventListener('mousemove', rotate);
        card.addEventListener('mouseout', stopRotate);
    }

    setupCarouselControls('test_1');
    ctrl_menuAccess();

    if (!testCompleted) {
        $(".body-answers > div > div").click(function () {
            if ($(this).hasClass('disabled')) return;
            const $this = $(this);
            const questionNum = parseInt($this.data('question'));
            const type = $this.parent().data('type');
            const $questionOptions = $(`.body-answers > div > div[data-question="${questionNum}"]`);
            $questionOptions.addClass('disabled');
            $questionOptions.off('click');
            $this.find('.answer-text').css('color', '#f8fafc');
            $questionOptions.not($this).find('.answer-text').css('color', '#475569');
            $this.find('img').attr('src', 'assets/img/modules/module-1/slide-4/test/answers/select.png');
            selections[type]++;
            userSelections[questionNum] = type;
            console.log("Pregunta", questionNum, "seleccionada:", type, "Selections:", selections, "User selections:", userSelections);
            localStorage.setItem('userSelections', JSON.stringify(userSelections));
            const totalSelections = selections.pantera + selections.pavorreal + selections.delfin + selections.buho;
            if (totalSelections === totalQuestions) {
                calculateResults();
            }
        });
    } else {
        restoreSelections();
    }
});