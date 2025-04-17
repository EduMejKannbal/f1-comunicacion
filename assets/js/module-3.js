$("#precache_mod_3").waitForImages({
    finished: function () {
      $("#loading_screen").fadeOut("slow");
      $("#precache_bas").hide();
      ctrl_slidesMod3();
      ctrl_avElem_chk(3, 'emocion', myAvance.ch3.emocion, $(".btn_emocion").length + 1, 'myglow_img_blue', true);
    },
    waitForAll: true
});

//

function ctrl_slidesMod3() {
    const $slides = $(".slide_module3");
    const totalSlides = $slides.length;
    const currentSlide = nSlides.numSlides_3;
    const $prevBtn = $("#module3_Prev");
    const $nextBtn = $("#module3_Next");
    // resetLocution();
    $slides.hide();
    $("#slide_module3_" + currentSlide).show();
    console.log("#slide_module3_" + currentSlide);
    // playAudio('transporte_', currentSlide)

    if (currentSlide === 1) {
        $prevBtn.hide();
        $nextBtn.hide();
    } else if (currentSlide === 3 && myAvance.ch3.emocion < 6 ) {
        $prevBtn.show();
        $nextBtn.hide();
    }  else if (currentSlide === 9 && myAvance.ch3.finish_juego === 0) {
        $prevBtn.show();
        $nextBtn.hide();
    } else if (currentSlide === 10) {
        $prevBtn.show();
        $nextBtn.hide();
    } else if (currentSlide === totalSlides) {
        $nextBtn.hide();
    }else{
            $prevBtn.show();
    $nextBtn.show();
    }
}

$("#module3_Prev").click(() => {
    // resetLocution();
    1 < nSlides.numSlides_3 && nSlides.numSlides_3--;
    ctrl_slidesMod3();
    // $("#efct_next")[0].play();
});

$("#module3_Next").click(() => {
    // resetLocution();
    $('.slide_module3').length > nSlides.numSlides_3 && nSlides.numSlides_3++;
    ctrl_slidesMod3();
    // $("#efct_next")[0].play();
});

//Control de avance de elementos clickeables
function ctrl_avElem_chk(ptrChptr, ptrClass, ptrID, ptrAvMax, ptrAnimClass, isInit) {
    $('.btn_' + ptrClass).removeClass(ptrAnimClass).css({ 'pointer-events': 'none' }).addClass('w3-opacity');
    if ((myAvance["ch" + ptrChptr][ptrClass] < ptrAvMax) && (myAvance["ch" + ptrChptr][ptrClass] <= parseInt(ptrID))) {
        !1 === isInit && (myAvance["ch" + ptrChptr][ptrClass] = parseInt(ptrID) + 1);
        for (i = 0; i < myAvance["ch" + ptrChptr][ptrClass]; i++) {
            $('#btn_' + ptrClass + '_' + i).css('pointer-events', 'auto').removeClass('w3-opacity ' + ptrAnimClass);
            $('#chk_emocion_' +i ).show();
        }
        $('#btn_' + ptrClass + '_' + myAvance["ch" + ptrChptr][ptrClass]).addClass(ptrAnimClass).css('pointer-events', 'auto').removeClass('w3-opacity');
    } else if ((myAvance["ch" + ptrChptr][ptrClass]) >= ptrAvMax) {
        $('.btn_' + ptrClass).css('pointer-events', 'auto').removeClass('w3-opacity');
    }
}

$('.btn_comenzarModule').click(function () {
    const strID = $(this).attr('id').split("_")[2];
    if (strID === '3') {
        nSlides.numSlides_3 = 2;
        ctrl_slidesMod3();
    }
});


$('.btn_comenzarModule').click(function () {
    const strID = $(this).attr('id').split("_")[2];
    if (strID === '3') {
        nSlides.numSlides_3 = 2;
        ctrl_slidesMod3();
    }
});


$('.btn_emocion').click(function(){
    strID = $(this).attr('id').split("_")[2];
    $('#mod_emocion_' + strID).show(); 
});


$('.cls_emocion').click(function(){
     strID = $(this).attr('id').split("_")[2];
    $('#mod_emocion_' + strID).hide(); 
   
    
    if (strID >=  myAvance.ch3.emocion ) {
        ctrl_avElem_chk(3, 'emocion', myAvance.ch3.emocion, $(".btn_emocion").length + 1, 'myglow_img_blue', false);
      }
      ctrl_slidesMod3();

});


$('#slideM3-9-btn').click(function(){
    //nSlides.numSlides_3 = 10;  
    //ctrl_slidesMod3();
    $('#juego3').show();
    initializeDragDropGame();   
});

const gameConfig = {
    questions: [
        {
            image: "assets/img/modules/module-3/slide-9/juego/quest/q1.png",
            correctAnswer: "emociones",
            dropzoneImage: "assets/img/modules/module-3/slide-9/juego/answers/emociones.png",
            dropzoneClass: "dropzone-1"
        },
        {
            image: "assets/img/modules/module-3/slide-9/juego/quest/q2.png",
            correctAnswer: "reacciones",
            dropzoneImage: "assets/img/modules/module-3/slide-9/juego/answers/reacciones.png",
            dropzoneClass: "dropzone-2"
        },
        {
            image: "assets/img/modules/module-3/slide-9/juego/quest/q3.png",
            correctAnswer: "temperamento",
            dropzoneImage: "assets/img/modules/module-3/slide-9/juego/answers/temperamento.png",
            dropzoneClass: "dropzone-3"
        },
        {
            image: "assets/img/modules/module-3/slide-9/juego/quest/q4.png",
            correctAnswer: "caracter",
            dropzoneImage: "assets/img/modules/module-3/slide-9/juego/answers/caracter.png",
            dropzoneClass: "dropzone-4"
        }
    ],
    passingScore: 0.8,
    maxAttempts:1
};



function initializeDragDropGame() {
    const $questionContainer = $("#question-container");
    let currentQuestionIndex = 0;
    let correctAnswersCount = 0;
    let attempts = 0;

    // Mostrar pregunta
    function showQuestion() {
        const question = gameConfig.questions[currentQuestionIndex];
        console.log(`[Game] Pregunta ${currentQuestionIndex + 1}: ${question.image}, Dropzone: ${question.dropzoneClass}`);

        $questionContainer.html(`
            <img src="assets/img/modules/module-3/found-round.png" class="absolute retross_round">
            <img src="${question.image}" alt="Pregunta ${currentQuestionIndex + 1}" class="question animate zoomIn" />
            <div class="dropzone ${question.dropzoneClass}"></div>
        `);

        // Configurar dropzone
        $(".dropzone").droppable({
            accept: ".draggable",
            drop: function (event, ui) {
                const droppedAnswer = ui.draggable.data("answer");
                const isCorrect = droppedAnswer === question.correctAnswer;
                console.log(`[Game] Soltado: ${droppedAnswer}, Correcto: ${question.correctAnswer}, Es correcto: ${isCorrect}`);

                if (isCorrect) {
                    correctAnswersCount++;
                    $(this).html(`<img src="${question.dropzoneImage}" alt="Respuesta correcta" />`);
                    // $("#successSound")[0].play();
                    console.log(`[Game] Aciertos: ${correctAnswersCount}`);
                } else {
                    $(this).html(`<img src="${ui.draggable.attr("src")}" alt="Incorrecto" />`);
                    // $("#errorSound")[0].play();
                }

                // Avanzar a la siguiente pregunta o mostrar modal
                setTimeout(() => {
                    currentQuestionIndex++;
                    if (currentQuestionIndex < gameConfig.questions.length) {
                        showQuestion();
                    } else {
                        showResultModal();
                    }
                }, 1000);
            }
        });
    }

    // Mostrar modal de resultado
    function showResultModal() {
        const score = correctAnswersCount / gameConfig.questions.length;
        const isApproved = score >= gameConfig.passingScore;
        const $modalCorrect = $("#mod_retroCorrect_1");
        const $modalIncorrect = $("#mod_retroIncorrect_1");

        if (isApproved) {
            $modalCorrect.fadeIn(300);
            console.log(`[Game] Mostrando modal correcto, Aciertos: ${correctAnswersCount}/${gameConfig.questions.length}`);
        } else {
            attempts++;
            $modalIncorrect.fadeIn(300);
            console.log(`[Game] Mostrando modal incorrecto, Aciertos: ${correctAnswersCount}/${gameConfig.questions.length}`);
        }
    }

    // Configurar arrastrables
    function setupDraggables() {
        $(".draggable").draggable({
            revert: "invalid",
            helper: "clone",
            start: function () {
                $(this).css("opacity", "0.5");
            },
            stop: function () {
                $(this).css("opacity", "1");
            }
        });
    }

    // Configurar botones de cierre de modales
    function setupModalButtons() {
        $("#close_retroCorrect_1").on("click", () => {
            $("#mod_retroCorrect_1").fadeOut(300);
            console.log("[Game] Aprobado, avanzando a diapositiva 11");
            nSlides.numSlides_3 = 10;
            ctrl_slidesMod3();
            $('#juego3').hide();
            if (myAvance.ch3.finish_juego === 0){
                myAvance.ch3.finish_juego =  1;
            }
        });

        $("#close_retroIncorrect_1").on("click", () => {
            $("#mod_retroIncorrect_1").fadeOut(300);
            if (attempts < gameConfig.maxAttempts) {
                console.log(`[Game] Reintentando, intento ${attempts + 1}`);
                resetGame();
            } else {
                console.log("[Game] Intentos agotados, avanzando a diapositiva 10");
                nSlides.numSlides_3 = 10;
                ctrl_slidesMod3();
                $('#juego3').hide();
                if (myAvance.ch3.finish_juego === 0){
                    myAvance.ch3.finish_juego =  1;
                }
            }
        });
    }

    // Inicializar juego
    function init() {
        $questionContainer.empty();
        $("#mod_retroCorrect_1, #mod_retroIncorrect_1").hide();
        setupDraggables();
        setupModalButtons();
        showQuestion();
    }

    init();
}


$("#btn_fin_mod310").click(function () {
    nSlides.numSlides_3 = 11;  
    ctrl_slidesMod3();
  });

$("#btn_finmod3").click(function () {
    myAvance.avModulos = 3;
    $("#carga_materia").hide().empty();
     $('.content-home').show();
  });