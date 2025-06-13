let strID;
let gAvMax = 4;
let myAvance = {
    avModulos: 0,
    g_avance: 0,
    ganador: null,
    ch1:{
        estilosComunicacion:1,
        logro_llanta:0,
        logro_casco:0,
        trofeo_1:0
    },
    ch2: {
        comic: 1,
        preg_1: null,
        preg_2: null,
        preg_3: null,
        preg_4: null,
        logro_guantes:0,
        logro_traje:0,
        logro_zapatos:0,
        trofeo_2:0
    },
    ch3: {
        vidManEm:1,
        impactBio:1,
        caracter:1,
        vidTemp:1,
        emocion: 1,
        logro_llantas2:0,
        logro_volante:0,
        finish_juego: 0,
        trofeo_3:0
    }
};

let nSlides = {
    numSlides: 1,
    numSlides_2: 1,
    numSlides_3: 1,
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
let $menu = $('#div_menu');
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

function stopSplashVideo() {
    if (video) {
        video.pause();
        video.currentTime = 0;
        console.log("Video splash detenido y reiniciado");
    }
}

video.addEventListener('ended', function () {
    stopSplashVideo();
    $('#slide_vidWelcome_1').hide();
});


$("#precache_index").waitForImages({
    finished: function () {
        //$("#precache_index").hide();
        $('html,body').css({ 'overflow-y': 'hidden' });
    },
    waitForAll: true
});

$('#btn_close_loader').click(function () {
    $('#slide_vidWelcome_1').show();
    playSplashVideo();
    $("#loading_screen").hide();

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
    if (flagMus === 0) {
        var elements = document.querySelectorAll(".back");
        $(".music").attr("src", "assets/img/icons/on.png");
        [].forEach.call(elements, function (element) {
            unMuteMe(element);
        });
        flagMus = 1; 
    }
}
function pauseMusic() {
    if (flagMus === 1) {
        var elements = document.querySelectorAll(".back");
        $(".music").attr("src", "assets/img/icons/off.png");
        [].forEach.call(elements, function (element) {
            muteMe(element);
        });
        flagMus = 0; 
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
    $('.slide_index,.slide_portada').hide();
    $('#carga_materia').show();
    $('#carga_materia').load('module_' + strID + '.html');
});
//Control general para curruseles sencillos
function ctrl_carru_simple(ptrCarruClass, ptrSlideActual) {
    resetLocution();
    $(".carru_" + ptrCarruClass).hide();
    $("#carru_" + ptrCarruClass + "_" + ptrSlideActual).show();
    playAudio(ptrCarruClass + '_', ptrSlideActual);
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

function showTestResults(results) {
    const $cardItems = $("#slide_module1_6 .cardTest-item");

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



function reproducirHasta(idVideo, tiempoFinal) {
    const $video = $("#" + idVideo);
    
    if ($video.length === 0) {
        console.error("No se encontró el video con ID:", idVideo);
        return;
    }

    const video = $video[0];
    
    // Asegurar que los controles estén siempre ocultos
    video.removeAttribute('controls'); // Método nativo
    $video.removeAttr('controls');    // Método jQuery (redundante por seguridad)

    video.currentTime = 0;
    video.play();

    // Control del tiempo
    $video.on("timeupdate", function() {
        if (this.currentTime >= tiempoFinal) {
            this.pause();
            $video.off("timeupdate");
            // Asegurar nuevamente que los controles no aparezcan al pausarse
            this.removeAttribute('controls');
        }
    });
}
function reiniciarVideos(ptrvidSLides) {
    $(ptrvidSLides).each(function() {
        const video = $(this)[0]; 
        video.pause();            
        video.currentTime = 0;  
    });
}


$('#btn_menu').click(function () {
    $('#slide_menu_1').show();
    $('#slide_trofeo_1').hide();
});


$('#cls_menu').click(function () {
    $('#slide_menu_1').fadeOut();
});

$('.txt_menu').on({
  click: function () {
    const [, , strMod, strID] = $(this).attr('id').split("_").map(Number);
    const $cargaMateria = $('#carga_materia');

    $('#slide_index_1').hide();
    $cargaMateria.hide().empty().show();

    $cargaMateria.load('module_' + strMod + '.html', function () {

      if (strMod === 1) {
        1 === strID && (nSlides.numSlides = 4);
        2 === strID && (nSlides.numSlides = 9);
        3 === strID && (nSlides.numSlides = 13);
        ctrl_slidesMod1();
      }
      if (strMod === 2) {
        1 === strID && (nSlides.numSlides_2 = 3);
        2 === strID && (nSlides.numSlides_2 = 5);
        3 === strID && (nSlides.numSlides_2 = 7);
        4 === strID && (nSlides.numSlides_2 = 14);
        ctrl_slidesMod2();
      }
      if (strMod === 3) {
        1 === strID && (nSlides.numSlides_3 = 3);
        2 === strID && (nSlides.numSlides_3 = 4);
        3 === strID && (nSlides.numSlides_3 = 6);
        4 === strID && (nSlides.numSlides_3 = 9);
        5 === strID && (nSlides.numSlides_3 = 11);
        6 === strID && (nSlides.numSlides_3 = 13);
        ctrl_slidesMod3();
      }
      $('#slide_menu_1').fadeOut();
    });
  },
  mouseover: function () {
    strMod = $(this).attr('id').split("_")[2];
    strID = $(this).attr('id').split("_")[3];
    $('#img_menu_rect').show().css('top', $(this).css('top')).doAnim('slideInLeft');
  },
  mouseleave: function () {
    strMod = $(this).attr('id').split("_")[2];
    strID = $(this).attr('id').split("_")[3];
    $('#img_menu_rect').hide();
  }
});


$('#btn_homeComenzar_1').click(() => $('#mod_start').hide());

$('#btn_sobreMi_1').click(function () {
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

function anim_fondo(ptrDuracion, ptrNumFondo, ptrTop, ptrLeft, ptrWidth, ptrHeight) {
  var duracionAnimacion = ptrDuracion * 1000;

$("#back_fondo_"+ptrNumFondo).css({top:"0",left:"0",width:"100%",height:"100%"});
  $('#back_fondo_' + ptrNumFondo).animate({top: ptrTop, left: ptrLeft, width: ptrWidth, height: ptrHeight}, duracionAnimacion, 'swing', () => console.log('¡Animación completada!'));

}


function resetFondo(ptrDuracion, ptrNumFondo, ) {
  $("#back_fondo_" + ptrNumFondo).animate({top: "0", width: "100%", height: "100%"}, 1E3 * ptrDuracion);
}

$('.btn_marcador').click(function () {
  strID = $(this).attr('id').split("_")[2];
  $('#slide_portada_' + strID).show();
  "1" === strID && anim_fondo(2, strID, "-89%", "0%", "199%", "192%");
  "2" === strID && anim_fondo(2, strID, "-128%", "-66%", "204%", "229%");
  "3" === strID && anim_fondo(2, strID, "-57%", "-75%", "235%", "201%");
});



$('#menu_trigger, #div_menu').hover(() => $menu.stop().animate({bottom: '0%'}, 300),
        () => $menu.stop().animate({bottom: '-10%'}, 300));


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
        const relativeTop = $(this).position().top + 'px'; // top relativo al contenedor
        $('#img_menu_trofeo').show().css('top', relativeTop).doAnim('slideInLeft');
        $('#img_modTrof_1').show().attr('src','assets/img/grls/trofeos/trofeo_' + strID +'.gif' );
    },
    mouseleave: function () {
      $('#img_menu_trofeo').hide();
    }
  });
  
  $('.txt_logro').on({
    mouseover: function () {
        strID = $(this).attr('id').split("_")[2];
        const relativeTop = $(this).position().top + 'px'; // top relativo al contenedor
        $('#img_menu_trofeo').show().css('top', relativeTop).doAnim('slideInLeft');
        $('#img_modTrof_1').show().attr('src','assets/img/trofeos/logro_' + strID +'.gif' );
    },
    mouseleave: function () {
      $('#img_menu_trofeo').hide();
    }
  });

  
function mostrar_trofeos() {
    // Actualizar contador de trofeos
    let trofeosDesbloqueados = 0;
    if (myAvance.ch1.trofeo_1 === 1) trofeosDesbloqueados++;
    if (myAvance.ch2.trofeo_2 === 1) trofeosDesbloqueados++;
    if (myAvance.ch3.trofeo_3 === 1) trofeosDesbloqueados++;
    
    $('#txt_trofeo2_ntrofeo').text(trofeosDesbloqueados);

    // Controlar elementos de trofeos
    $('#txt_trofeo_1').css('pointer-events', myAvance.ch1.trofeo_1 === 1 ? 'auto' : 'none')
        .toggleClass('w3-opacity-max', myAvance.ch1.trofeo_1 !== 1);
    
    $('#txt_trofeo_2').css('pointer-events', myAvance.ch2.trofeo_2 === 1 ? 'auto' : 'none')
        .toggleClass('w3-opacity-max', myAvance.ch2.trofeo_2 !== 1);
    
    $('#txt_trofeo_3').css('pointer-events', myAvance.ch3.trofeo_3 === 1 ? 'auto' : 'none')
        .toggleClass('w3-opacity-max', myAvance.ch3.trofeo_3 !== 1);
}

function mostrar_logros() {
  // Actualizar contador de logros
  let logrosDesbloqueados = 0;
  if (myAvance.ch1.logro_llanta === 1)
    logrosDesbloqueados++;
  if (myAvance.ch1.logro_casco === 1)
    logrosDesbloqueados++;
  if (myAvance.ch2.logro_traje === 1)
    logrosDesbloqueados++;
  if (myAvance.ch2.logro_zapatos === 1)
    logrosDesbloqueados++;
  if (myAvance.ch3.logo_llantas2 === 1)
    logrosDesbloqueados++;
  if (myAvance.ch3.logro_volante === 1)
    logrosDesbloqueados++;

  $('#txt_trofeo2_nlogros').text(logrosDesbloqueados);

  // Controlar elementos de logros
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

$('#cls_ganador_1').click(() => $('#slide_ganador_1').fadeOut());

$(".elem_click").click(function () {
    const audio = $("#efct_clic")[0];
    audio.currentTime = 0;
    audio.play().catch((err) => {
        console.warn("No se pudo reproducir el audio:", err);
    });
});