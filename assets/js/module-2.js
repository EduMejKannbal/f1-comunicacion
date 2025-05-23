var veoComic = 0;

$("#precache_mod_2").waitForImages({
    finished: function () {
  
      $("#precache_bas").hide();
      ctrl_slidesMod2();
      ctrl_avElem(2, 'comic', myAvance.ch2.comic, $(".btn_comic").length + 1, 'myglow_img_blue', true);
    },
    waitForAll: true
  });


function ctrl_slidesMod2() {
    const $slides = $(".slide_module2");
    const totalSlides = $slides.length;
    const currentSlide = nSlides.numSlides_2;  //
    const $prevBtn = $("#module2_Prev");
    const $nextBtn = $("#module2_Next");
    // resetLocution();
    reiniciarVideos(".mod2_videoSlide")
    $slides.hide();
    $("#slide_module2_" + currentSlide).show();
    console.log("#slide_module2_" + currentSlide);
    // playAudio('transporte_', currentSlide)
    $prevBtn.show();
    $nextBtn.show();
    if (currentSlide === 1) {
        $prevBtn.hide();
        $nextBtn.hide();
    } else if (currentSlide === 2 )  {
        $prevBtn.show();
        $nextBtn.show();
        reproducirHasta("vid_module2_2", 4.99);
   } else if (currentSlide === 4 )  {
        $prevBtn.hide();
        $nextBtn.hide();
        reproducirHasta("vid_module2_4", 9.99);
        $('#aud_logro').get(0).play()
    } else if ( currentSlide === 8 )  {
        $prevBtn.show();
        $nextBtn.hide();
    } else if (currentSlide === 5) {
        if (veoComic !== 1) {
            reproducirHasta("vid_module2_5", 4.99);
        } else {
            
        }

        if (myAvance.ch2.comic < 3) {
            $prevBtn.show();
            $nextBtn.hide();
        } else {
            $prevBtn.show();
            $nextBtn.show();
        }
    } else if (currentSlide === 6 ) {
        reproducirHasta("vid_module2_6", 9);
        $prevBtn.hide();
        $nextBtn.hide();
        $('#aud_logro').get(0).play()
    }  else if (currentSlide === 7 ) {
        reproducirHasta("vid_module2_7", 4.99);
        $prevBtn.hide();
        $nextBtn.hide();
    }  else if (currentSlide === 9 && myAvance.ch2.preg_1 === null) {
        $prevBtn.show();
        $nextBtn.hide();
    } else if (currentSlide === 10 && myAvance.ch2.preg_2 === null) {
        $prevBtn.show();
        $nextBtn.hide();
    } else if (currentSlide === 11 && myAvance.ch2.preg_3 === null) {
        $prevBtn.show();
        $nextBtn.hide();
    } else if (currentSlide === 12 && myAvance.ch2.preg_4 === null) {
        $prevBtn.show();
        $nextBtn.hide();
    } else if (currentSlide === 13) {
        $prevBtn.hide();
        $nextBtn.hide();
        reproducirHasta("vid_module2_13", 4.99);
        $('#aud_logro').get(0).play()
    } else if (currentSlide === 14) {
        $prevBtn.show();
        $nextBtn.show();
        reproducirHasta("vid_module2_14", 4.99);
    } else if (currentSlide === 15) {
        $prevBtn.show();
        $nextBtn.show();
        reproducirHasta("vid_module2_15", 9.99);
    } else if (currentSlide === totalSlides) {
        $nextBtn.hide();
        $prevBtn.show();
    }
    // unlock_menu();
}

$("#module2_Prev").click(() => {
    // resetLocution();
    1 < nSlides.numSlides_2 && nSlides.numSlides_2--;  // Cambiado a numSlides_2
    ctrl_slidesMod2();
    // $("#efct_next")[0].play();
});

$("#module2_Next").click(() => {
    // resetLocution();
    $('.slide_module2').length > nSlides.numSlides_2 && nSlides.numSlides_2++;  // Cambiado a numSlides_2
    ctrl_slidesMod2();
    // $("#efct_next")[0].play();
});



$('.btn_comic').click(function () {
    strID = $(this).attr("id").split("_")[2];
    $('#mod_comic_' + strID).show();
  });

  
$('.cls_comic').click(function () {
    strID = $(this).attr("id").split("_")[2];
    $('#mod_comic_' + strID).fadeOut();
    if (strID >= myAvance.ch2.comic ) {
      ctrl_avElem(2, 'comic', myAvance.ch2.comic, $(".btn_comic").length + 1, 'myglow_img_blue', false);
    }
    veoComic = 1;
    ctrl_slidesMod2();
  });


  $('#slide3_play').click(function(){
    $('#mod_2sarp_1').show(); 
    $('#vidSarp_1').get(0).play();
});

$('#cls_2sarp_1').click(function(){
    $('#mod_2sarp_1').hide(); 
    var video = $('#vidSarp_1').get(0);
    video.pause();
    video.currentTime = 0;
});

$('#btn_start').click(function(){
    nSlides.numSlides_2 = 2;  
    ctrl_slidesMod2();
});

$('.btn_avanceModal').click(function() {
    const currentSlideNum = parseInt(this.id.match(/slide(\d+)_/)[1]);
    nSlides.numSlides_2 = currentSlideNum + 1;
    
    ctrl_slidesMod2();
});

$('#btn_start_exam').click(function(){
    nSlides.numSlides_2 = 8;  
    ctrl_slidesMod2();
});




$('.btn_resp').click(function () {
    //btn_resp_x_op_n
    strOp = $(this).attr("id").split("_")[4];
    strPreg = $(this).attr("id").split("_")[2];

        for(let n = 1; n <= 4; n++) {
            $('#btn_resp_'+strPreg+'_op_'+ n).css({
                'opacity': '0.5',
                'pointer-events': 'none'
            });
        }

    $('#btn_resp_'+ strPreg +'_op_'+ strOp).css({'opacity':'1'}).doAnim({"animation":"heartBeat"});

    if (strPreg === '1' && strOp === '1'){
        myAvance.ch2["preg_"+strPreg] = '1';
        $('#aud_win').get(0).play();
    }else if (strPreg === '2' && strOp === '2'){
        myAvance.ch2["preg_"+strPreg] = '1';
        $('#aud_win').get(0).play();
    }else if (strPreg === '3' && strOp === '3'){
        myAvance.ch2["preg_"+strPreg] = '1';
        $('#aud_win').get(0).play();
    }else if (strPreg === '4' && strOp === '4'){
        myAvance.ch2["preg_"+strPreg] = '1';
        $('#aud_win').get(0).play();
    }else{
        myAvance.ch2["preg_"+strPreg] = '0';
        $('#aud_error').get(0).play();
    }   

    ctrl_slidesMod2();
    if (strPreg === '4'){
        verificarSumaPreguntas();
    }
            
  });

  function verificarSumaPreguntas() {
    const ch2 = myAvance.ch2;
    let suma = 0;
    
    Object.keys(ch2).forEach(key => {
        if (key.startsWith('preg_')) {
            const valor = ch2[key];
            const numero = Number(valor) || 0; 
            suma += numero;
        }
    });
    console.log(suma);
    
    if (suma === 4) {
        $('#slide_ok_1').show();
    } else {
        $('#slide_error_1').show();
}
  }

  $('#btn_cls_ok_modal').click(function(){
    $('#slide_ok_1').hide();
    nSlides.numSlides_2 += 1;  
    ctrl_slidesMod2();
});

$('#btn_cls_error_modal').click(function(){
    $('#slide_error_1').hide();
    nSlides.numSlides_2 += 1;  
    ctrl_slidesMod2();
});




$('#btn_cls_slide4_modal').click(function(){
    nSlides.numSlides_2 = 5;  
    ctrl_slidesMod2();
});


$('#btn_cls_slide6_modal').click(function(){
    nSlides.numSlides_2 = 7;  
    ctrl_slidesMod2();
});


$('#btn_cls_slide13_modal').click(function(){
    nSlides.numSlides_2 = 14;  
    ctrl_slidesMod2();
});

$('#btn_cls_slide16_modal').click(function(){
    nSlides.numSlides_2 = 17;  
    ctrl_slidesMod2();
});

$("#btn_finmod2").click(function () {
    myAvance.avModulos = 3;
    nSlides.numSlides_2 = 1;  
    $("#carga_materia").hide().empty();
     $('.content-home').show();
  });

    $(".elem_click").click(function () {
    const audio = $("#efct_clic2")[0];
    audio.currentTime = 0; // Reinicia desde el principio
    audio.play().catch((err) => {
      console.warn("No se pudo reproducir el audio:", err);
    });
  });
  