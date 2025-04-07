
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
    const currentSlide = nSlides.numSlides_2;  // Cambiado a numSlides_2
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
        $nextBtn.hide();
    } else if (currentSlide === 4 || currentSlide === 6 || currentSlide === 7 || currentSlide === 8 || currentSlide === 13 )  {
        $prevBtn.show();
        $nextBtn.hide();
    } else if (currentSlide === 5 && myAvance.ch2.comic < 3) {
        $prevBtn.show();
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
    }else if (currentSlide === totalSlides) {
        $nextBtn.hide();
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
    $('#mod_comic_' + strID).hide();
    if (strID >= myAvance.ch2.comic ) {
      ctrl_avElem(2, 'comic', myAvance.ch2.comic, $(".btn_comic").length + 1, 'myglow_img_blue', false);
    }
    ctrl_slidesMod2();
  });


$('#btn_start').click(function(){
    nSlides.numSlides_2 = 2;  
    ctrl_slidesMod2();
});

$('.btn_avanceModal').click(function() {
    // Extraemos el número del ID (ej: "btn_cls_slide4_modal" → 4)
    const currentSlideNum = parseInt(this.id.match(/slide(\d+)_/)[1]);
    
    // Calculamos el slide destino (currentSlideNum + 1)
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

    $('#btn_resp_'+ strPreg +'_op_'+ strOp).css({'opacity':'1'});

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
    
    // Sumar solo los valores numéricos (ignorando null/undefined/strings)
    Object.keys(ch2).forEach(key => {
        if (key.startsWith('preg_')) {
            const valor = ch2[key];
            // Convierte strings a números (ej: "1" → 1)
            const numero = Number(valor) || 0; // Si falla la conversión, usa 0
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
