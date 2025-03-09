ctrl_slides();


function ctrl_slides() {
    const $slides = $(".slide_module1");
    const totalSlides = $slides.length;
    const currentSlide = nSlides.numSlides;
    const $prevBtn = $("#module1_Prev");
    const $nextBtn = $("#module1_Next");
    // resetLocution();
    $slides.hide();
    $("#slide_module1_" + currentSlide).show();
    console.log("#slide_module1_" + currentSlide)
    // playAudio('transporte_', currentSlide)
    $prevBtn.show();
    $nextBtn.show();
    if (currentSlide === 1) {
        $prevBtn.hide();
        // $nextBtn.hide();
    } else if (currentSlide === 4) {
        ctrl_carru_simple("test_1", nSlides.test_1);
        if (testCompleted) {
            restoreSelections(); // Restaurar selecciones al regresar
        }
    } else if (currentSlide === 5 && testCompleted) {
        showTestResults(testResults); // Mostrar resultados en slide 5
    } else if (currentSlide === totalSlides) {
        $nextBtn.hide();
    }
    // unlock_menu();
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
setupCarouselControls('test_1');
if (!testCompleted) {
    $(".body-answers img").click(function () {
        if ($(this).hasClass('disabled')) return;

        var questionNum = $(this).data('question');
        var type = $(this).parent().data('type');
        var $questionOptions = $(".body-answers img[data-question='" + questionNum + "']");

        $questionOptions.addClass('disabled');
        $questionOptions.off('click');
        $(this).attr('src', 'assets/img/modules/module-1/slide-4/test/answers/select.png');
        selections[type]++;
        userSelections[questionNum] = type; // Guardar la selección del usuario

        var totalSelections = selections.pantera + selections.pavorreal + selections.delfin + selections.buho;
        if (totalSelections === totalQuestions) {
            calculateResults();
        }
    });
}