$("#precache_mod_3").waitForImages({
    finished: function () {
      $("#loading_screen").fadeOut("slow");
      $("#precache_bas").hide();
      ctrl_slidesMod3();
    },
    waitForAll: true
});

//

function ctrl_slidesMod3() {
    const $slides = $(".slide_module3");
    const totalSlides = $slides.length;
    const currentSlide = nSlides.numSlides_3;  // Cambiado a numSlides_3
    const $prevBtn = $("#module3_Prev");
    const $nextBtn = $("#module3_Next");
    // resetLocution();
    $slides.hide();
    $("#slide_module3_" + currentSlide).show();
    //console.log("#slide_module3_" + currentSlide);
    // playAudio('transporte_', currentSlide)
    $prevBtn.show();
    $nextBtn.show();
    if (currentSlide === 1) {
        $prevBtn.hide();
        $nextBtn.hide();
    } /*else if (currentSlide === 4 || currentSlide === 6 || currentSlide === 7 || currentSlide === 8 || currentSlide === 13) {
        $prevBtn.show();
        $nextBtn.hide();
    } else if (currentSlide === 5 && myAvance.ch3.comic < 3) {
        $prevBtn.show();
        $nextBtn.hide();
    } else if (currentSlide === 9 && myAvance.ch3.preg_1 === null) {
        $prevBtn.show();
        $nextBtn.hide();
    } else if (currentSlide === 10 && myAvance.ch3.preg_2 === null) {
        $prevBtn.show();
        $nextBtn.hide();
    } else if (currentSlide === 11 && myAvance.ch3.preg_3 === null) {
        $prevBtn.show();
        $nextBtn.hide();
    } else if (currentSlide === 12 && myAvance.ch3.preg_4 === null) {
        $prevBtn.show();
        $nextBtn.hide();
    }*/ else if (currentSlide === totalSlides) {
        $nextBtn.hide();
    }
    // unlock_menu();
}

$("#module3_Prev").click(() => {
    // resetLocution();
    1 < nSlides.numSlides_3 && nSlides.numSlides_3--;  // Cambiado a numSlides_3
    ctrl_slidesMod3();
    // $("#efct_next")[0].play();
});

$("#module3_Next").click(() => {
    // resetLocution();
    $('.slide_module3').length > nSlides.numSlides_3 && nSlides.numSlides_3++;  // Cambiado a numSlides_3
    ctrl_slidesMod3();
    // $("#efct_next")[0].play();
});

$('#btn_start').click(function(){
    nSlides.numSlides_3 = 2;  
    ctrl_slidesMod3();
});