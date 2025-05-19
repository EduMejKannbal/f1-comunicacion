ctrl_slides();

function ctrl_slides() {
    const $slides = $(".slide_module1");
    const totalSlides = $slides.length;
    const currentSlide = nSlides.numSlides;
    const $prevBtn = $("#module1_Prev");
    const $nextBtn = $("#module1_Next");

    $slides.hide();
    $("#slide_module1_" + currentSlide).show();
    console.log("#slide_module1_" + currentSlide);

    $prevBtn.show();
    $nextBtn.show();

    if (currentSlide === 1) {
        $prevBtn.hide();
    } else if (currentSlide === 4) {
        reproducirHasta("vid_module1_4", 4.99);
        ctrl_carru_simple("test_1", nSlides.test_1);
        if (testCompleted) {
            restoreSelections();
        }
    }  else if (currentSlide === 2) {
       reproducirHasta("vid_module1_2", 4.99);
    } else if (currentSlide === 6 && testCompleted) {
        showTestResults(testResults);
    } else if (currentSlide === 7 )  {
        $prevBtn.hide();
        $nextBtn.hide();
        reproducirHasta("vid_module1_7", 9.99);
        $('#aud_logro').get(0).play()
    }  else if (currentSlide === totalSlides) {
        reproducirHasta("vid_module1_12", 9.99);
        $nextBtn.hide();
    }
}
$("#module1_Prev").click(() => {
    // resetLocution();
    1 < nSlides.numSlides && nSlides.numSlides--;
    ctrl_slides();
    // $("#efct_next")[0].play();
});
$("#module1_Next").click(() => {
    // resetLocution();
    $('.slide_module1').length > nSlides.numSlides && nSlides.numSlides++;
    ctrl_slides();
    // $("#efct_next")[0].play();
});

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

        animateCalif(".cardTest:nth-of-type(1) .testResult-text", testResults.pantera, 1500);
        animateCalif(".cardTest:nth-of-type(2) .testResult-text", testResults.pavorreal, 1500);
        animateCalif(".cardTest:nth-of-type(3) .testResult-text", testResults.delfin, 1500);
        animateCalif(".cardTest:nth-of-type(4) .testResult-text", testResults.buho, 1500);

    } else {
        console.log("Por favor responde todas las preguntas. Faltan " + (totalQuestions - totalSelections) + " preguntas por responder.");
    }
}

setupCarouselControls('test_1');
if (!testCompleted) {
    $(".body-answers > div > div").click(function () {
        if ($(this).hasClass('disabled')) return;

        var $thisDiv = $(this); // El div clicado
        var questionNum = $thisDiv.data('question');
        var type = $thisDiv.parent().data('type');
        var $questionOptions = $(".body-answers > div > div[data-question='" + questionNum + "']");

        // Deshabilitar todas las opciones de esta pregunta
        $questionOptions.addClass('disabled');
        $questionOptions.off('click');

        // Cambiar colores:
        // - Opción seleccionada: #f8fafc
        $thisDiv.find('.answer-text').css('color', '#f8fafc');
        // - Otras opciones (deshabilitadas): #475569
        $questionOptions.not($thisDiv).find('.answer-text').css('color', '#475569');
        // Cambiar la imagen a "select.png" solo en el elemento clicado
        $thisDiv.find('img').attr('src', 'assets/img/modules/module-1/slide-4/test/answers/select.png');

        // Actualizar selecciones
        selections[type]++;
        userSelections[questionNum] = type; // Guardar la selección del usuario

        // Verificar si se han respondido todas las preguntas
        var totalSelections = selections.pantera + selections.pavorreal + selections.delfin + selections.buho;
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
    card.addEventListener('mouseout', stopRotate)
}

function rotate(e) {
    const cardItem = this.querySelector('.cardTest-item');
    const halfHeight = cardItem.offsetHeight / 2;

    cardItem.style.transform = 'rotateX(' + -(e.offsetY - halfHeight) / 7 + 'deg) rotateY(' + (e.offsetX - halfHeight) / 7 + 'deg)';
}
function stopRotate() {
    const cardItem = this.querySelector('.cardTest-item');
    cardItem.style.transform = 'rotate(0)';
}

const $buttons = $('.btn_estilosComunicacion');
const $container = $('#slide_module1_9');

// Crear dinámicamente las imágenes hover si no existen
$buttons.each(function () {
    const num = $(this).attr('id').split('_')[2];
    if ($(`#hov_estilosComunicacion_${num}`).length === 0) {
        $('<img>')
            .attr({
                id: `hov_estilosComunicacion_${num}`,
                src: `assets/img/modules/module-1/slide-9/no_${num}.png`
            })
            .addClass('absolute hov_estilosComunicacion')
            .appendTo($container);
    }
});

// Manejar el hover
$buttons.hover(
    function () {
        const num = $(this).attr('id').split('_')[2];
        const $hoverImg = $(`#hov_estilosComunicacion_${num}`);

        // Ocultar todas y remover animaciones
        $('.hov_estilosComunicacion')
            .hide()
            .removeClass('animated fadeInRight');

        // Mostrar la correspondiente con animación
        $hoverImg
            .show()
            .addClass('animated fadeInRight');

        // Efectos en botones
        $buttons.css('opacity', '0.5');
        $(this).css({
            'opacity': '1',
            'transform': 'scale(1.05)'
        });
    },
    function () {
        $('.hov_estilosComunicacion')
            .hide()
            .removeClass('animated fadeInRight');
        $buttons.css({
            'opacity': '1',
            'transform': 'scale(1)'
        });
    }
);




$('#btn_cls_slide7_modal').click(function(){
    nSlides.numSlides = 8;  
    ctrl_slides();
});