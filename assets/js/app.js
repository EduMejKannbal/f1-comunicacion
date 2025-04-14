let strID;
let gAvMax = 2
let myAvance = {
    avModulos: 0,
    g_avance: 0,
    ch2: {
        comic: 1,
        preg_1: null,
        preg_2: null,
        preg_3: null,
        preg_4: null,
    },
    ch3:{
        emocion_1:0,
        emocion_2:0,
        emocion_3:0,
        emocion_4:0,
        emocion_5:0,
        preg_1:null,
        preg_2:null,
        preg_3:null,
        preg_4:null

    }
};


let nSlides = {
    numSlides: 1,
    numSlides_2:1,
    numSlides_3:1,
    general: 1,
    test_1: 1
};
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

// Obtener el elemento del video
let video = document.getElementById('splash_1');

// Función para reproducir el video
function playSplashVideo() {
    if (video) {
        video.play().then(() => {
            console.log("Video splash iniciado");
        }).catch((error) => {
            console.log("Error al reproducir el video: ", error);
        });
    }
}

// Función para detener el video y reiniciar su duración
function stopSplashVideo() {
    if (video) {
        video.pause();              // Detiene el video
        video.currentTime = 0;      // Reinicia el video al inicio
        console.log("Video splash detenido y reiniciado");
    }
}

// Evento para detener el video cuando termine
video.addEventListener('ended', function () {
    stopSplashVideo();
});

// Tu código existente con las funciones integradas
$("#precache_index").waitForImages({
    finished: function () {
        // Iniciar el video manualmente
        playSplashVideo();

        setTimeout(function () {
            $("#loading_screen").fadeOut("slow", function () {
                // Detener el video cuando el loading screen se oculte
                stopSplashVideo();
            });
            $("#precache_index").hide();
            doStart();
            $('html,body').css({ 'overflow-y': 'hidden' });
            $('#modal_juego_1').loadHTML('void.html');
        }, 6000);
    },
    waitForAll: true
});
function muteMe(e) {
    e.muted = !0;
}
function unMuteMe(e) {
    e.muted = !1;
}
function saveFlagMus() {
    prevFlagMus = flagMus;
}

$(".music").click(function () {
    var e = document.querySelectorAll(".back");
    0 === flagMus ? (flagMus = 1,
        $(".music").attr("src", "assets/img/icons/on.png"),
        [].forEach.call(e, function (e) {
            unMuteMe(e);
        })) : 1 === flagMus && ($(".music").attr("src", "assets/img/icons/off.png"),
            flagMus = 0,
            [].forEach.call(e, function (e) {
                muteMe(e);
            })
        );
});

function playMusic() {
    if (flagMus === 0) { // Solo reproducimos si la música está pausada
        var elements = document.querySelectorAll(".back");
        $(".music").attr("src", "assets/img/icons/on.png");
        [].forEach.call(elements, function (element) {
            unMuteMe(element);
        });
        flagMus = 1; // Cambiamos el estado de la música a sonando
    }
}
function pauseMusic() {
    if (flagMus === 1) { // Solo pausamos si la música está sonando
        var elements = document.querySelectorAll(".back");
        $(".music").attr("src", "assets/img/icons/off.png");
        [].forEach.call(elements, function (element) {
            muteMe(element);
        });
        flagMus = 0; // Cambiamos el estado de la música a pausado
    }
}
//Inicio botón locución
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
function playAudio(id, audPlay) {
    resetLocution();
    let audio = document.getElementById(id + audPlay);
    if (audio) {
        audio.play();
        // console.log("audio ", id + audPlay);
    } else {
        // console.log("audio not found", id + audPlay);
    }
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
    e.muted = !0;
}
function unMuteMe_Locut(e) {
    e.muted = !1;
}
$('.btn_module').click(function () {
    strID = $(this).attr("id").split("_")[2];
    $('.content-home').hide();
    $('#carga_materia, #loading_screen').show();
    $('#carga_materia').load('module_' + strID + '.html'); // Concatenamos strID dinámicamente
    playSplashVideo();
    setTimeout(function () {
        $("#loading_screen").fadeOut("slow");
        stopSplashVideo();
    }, 6000);
});
//Control general para curruseles sencillos
function ctrl_carru_simple(ptrCarruClass, ptrSlideActual) {
    resetLocution();
    $(".carru_" + ptrCarruClass).hide();
    $("#carru_" + ptrCarruClass + "_" + ptrSlideActual).show();
    playAudio(ptrCarruClass + '_', ptrSlideActual)
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
        restoreSelections(); // Restaurar las selecciones previas
    }
}
// Funciones genéricas para Prev y Next
function setupCarouselControls(carruClass) {
    // Prev
    $("#" + carruClass + "_Prev").click(function () {
        if (nSlides[carruClass] > 1) {
            nSlides[carruClass]--;
            ctrl_carru_simple(carruClass, nSlides[carruClass]);
        }
    });

    // Next
    $("#" + carruClass + "_Next").click(function () {
        if (nSlides[carruClass] < $(".carru_" + carruClass).length) {
            nSlides[carruClass]++;
            ctrl_carru_simple(carruClass, nSlides[carruClass]);
        }
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
        ctrl_slides();
    } else {
        console.log("Por favor responde todas las preguntas. Faltan " + (totalQuestions - totalSelections) + " preguntas por responder.");
    }
}
function showTestResults(results) {
    const $cardItems = $("#slide_module1_6 .cardTest-item"); // Cambiar a slide_module1_6

    // Encontrar el mayor porcentaje
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
                case 0: // Pantera
                    $percentageText.text(`${results.pantera}%`);
                    $progressFill.css("width", `${results.pantera}%`);
                    if (maxPercentage.index === 0) {
                        $card.css("transform", "scale(1.05)");
                    }
                    break;
                case 1: // Pavo real
                    $percentageText.text(`${results.pavorreal}%`);
                    $progressFill.css("width", `${results.pavorreal}%`);
                    if (maxPercentage.index === 1) {
                        $card.css("transform", "scale(1.05)");
                    }
                    break;
                case 2: // Delfín
                    $percentageText.text(`${results.delfin}%`);
                    $progressFill.css("width", `${results.delfin}%`);
                    if (maxPercentage.index === 2) {
                        $card.css("transform", "scale(1.05)");
                    }
                    break;
                case 3: // Búho
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
            // Opción seleccionada: imagen "select.png" y color #f8fafc
            $(this).find('img').attr('src', 'assets/img/modules/module-1/slide-4/test/answers/select.png');
            $(this).find('.answer-text').css('color', '#f8fafc');
        } else {
            // Otras opciones (deshabilitadas): color #475569
            $(this).find('.answer-text').css('color', '#475569');
        }
        $(this).addClass('disabled').off('click'); // Deshabilitar interacción
    });
}
function resetSlide(variableName) {
    if (typeof nSlides !== "undefined" && typeof variableName === "string") {
        nSlides[variableName] = 1;
    } else {
        console.error("nSlides no está definido o el nombre de la variable no es una cadena.");
    }
}
// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(Flip, ScrollTrigger, Observer, ScrollToPlugin, Draggable, MotionPathPlugin, EaselPlugin, PixiPlugin, TextPlugin, RoughEase, ExpoScaleEase, SlowMo, CustomEase)
    // gsap code here!
});
//Control de avance de elementos clickeables
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

//conoceCoach
$('.btn_conoceCoach').click(function () {
    strID = $(this).attr('id').split("_")[2];
    resetLocution();
    $('#mod_conoceCoach_' + strID).show();


});
$('.close_conoceCoach').click(function () {
    strID = $(this).attr('id').split("_")[2];
    $('#mod_conoceCoach_' + strID).hide();

});
