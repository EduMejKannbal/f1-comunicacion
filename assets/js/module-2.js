ctrl_slidesMod2();


function ctrl_slidesMod2() {
    const $slides = $(".slide_module2");
    const totalSlides = $slides.length;
    const currentSlide = nSlides.numSlides;
    const $prevBtn = $("#module2_Prev");
    const $nextBtn = $("#module2_Next");
    // resetLocution();
    $slides.hide();
    $("#slide_module2_" + currentSlide).show();
    //console.log("#slide_module2_" + currentSlide);
    // playAudio('transporte_', currentSlide)
    $prevBtn.show();
    $nextBtn.show();
    if (currentSlide === 1) {
        $prevBtn.hide();
        // $nextBtn.hide();
    } else if (currentSlide === 5 && testCompleted) {
        showTestResults(testResults); // Mostrar resultados en slide 5
    } else if (currentSlide === totalSlides) {
        $nextBtn.hide();
    }
    // unlock_menu();
}
$("#module2_Prev").click(() => {
    // resetLocution();
    1 < nSlides.numSlides && nSlides.numSlides--;
    ctrl_slidesMod2();
    // $("#efct_next")[0].play();
});
$("#module2_Next").click(() => {
    // resetLocution();
    $('.slide_module2').length > nSlides.numSlides && nSlides.numSlides++;
    ctrl_slidesMod2();
    // $("#efct_next")[0].play();
});