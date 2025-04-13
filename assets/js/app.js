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

$("#precache_index").waitForImages({
    finished: function () {
        $("#loading_screen").fadeOut("slow");
        $("#precache_index").hide();
        doStart();
        $('html,body').css({ 'overflow-y': 'hidden' });
        $('#modal_juego_1').loadHTML('void.html');
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
    setTimeout(function () {
        $("#loading_screen").fadeOut("slow");
    }, 800);
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


// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(Flip, ScrollTrigger, Observer, ScrollToPlugin, Draggable, MotionPathPlugin, EaselPlugin, PixiPlugin, TextPlugin, RoughEase, ExpoScaleEase, SlowMo, CustomEase)
    // gsap code here!
});



//Control de avance de elementos clickeables
function  ctrl_avElem(ptrChptr, ptrClass, ptrID, ptrAvMax, ptrAnimClass, isInit) {
    $('.btn_' + ptrClass).removeClass(ptrAnimClass).css({'pointer-events': 'none'}).addClass('w3-opacity');
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