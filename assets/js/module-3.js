ctrl_slidesMod3();

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
    $prevBtn.show();
    $nextBtn.show();
    if (currentSlide === 1) {
        $prevBtn.hide();
        $nextBtn.hide();
    } else if (currentSlide === 10) {
        initializeDragDropGame();
    } else if (currentSlide === totalSlides) {
        $nextBtn.hide();
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

$('.btn_comenzarModule').click(function () {
    const strID = $(this).attr('id').split("_")[2];
    if (strID === '3') {
        nSlides.numSlides_3 = 2;
        ctrl_slidesMod3();
    }
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
    passingScore: 0.8 // 80% (4/4)
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
            nSlides.numSlides_3 = 11;
            ctrl_slidesMod3();
        });

        $("#close_retroIncorrect_1").on("click", () => {
            $("#mod_retroIncorrect_1").fadeOut(300);
            if (attempts < gameConfig.maxAttempts) {
                console.log(`[Game] Reintentando, intento ${attempts + 1}`);
                resetGame();
            } else {
                console.log("[Game] Intentos agotados, avanzando a diapositiva 11");
                nSlides.numSlides_3 = 11;
                ctrl_slidesMod3();
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