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
    $('#juego3').loadHTML('juego3.html');
    //initializeDragDropGame();   
});



$("#btn_fin_mod310").click(function () {
    nSlides.numSlides_3 = 11;  
    ctrl_slidesMod3();
  });

$("#btn_finmod3").click(function () {
    myAvance.avModulos = 3;
    nSlides.numSlides_3 = 1;  
    $("#carga_materia").hide().empty();
     $('.content-home').show();
  });



