
var intPuntos = 0

$("#btn_mod4_start").click(function () {
  $(".slide_juego_mod4").hide();
  $("#slide_juego_mod4_2").show();
  init_gameDG();
});

function init_gameDG() {
  $("html,body").css({"overflow-y": "hidden"});
  $("#drag_1").draggable({revert: true});
  $("#drag_2").draggable({revert: true});
  $("#drag_3").draggable({revert: true});
  $("#drag_4").draggable({revert: true});
  $("#drag_5").draggable({revert: true});
  $("#drag_6").draggable({revert: true});
  $("#drag_7").draggable({revert: true});
  $("#drag_8").draggable({revert: true});
  $("#drag_9").draggable({revert: true});
  $("#drag_10").draggable({revert: true});
  $("#drag_11").draggable({revert: true});
  $("#drag_12").draggable({revert: true});
  $("#drag_13").draggable({revert: true});
  $("#drag_14").draggable({revert: true});
  $("#drag_15").draggable({revert: true});
  $("#drag_16").draggable({revert: true});
  $("#drag_17").draggable({revert: true});
  $("#drag_18").draggable({revert: true});
  $("#drag_19").draggable({revert: true});
  $("#drag_20").draggable({revert: true});
  $("#drag_21").draggable({revert: true});
  $("#drag_22").draggable({revert: true});
  $('.drop_items').show();
}


$(".drop_items").droppable({
  drop: function (event, ui) {
    var strDragId = ui.draggable.attr('id').split('_')[1];
    var strDropId = $(this).attr('id').split('_')[1];
    if (strDragId === strDropId) {
      ui.draggable.draggable({disabled: true}, {revert: false});
      $(this).droppable({disabled: true}).hide();
      $('#aud_win').get(0).play();
      intPuntos++;
      if (intPuntos === 22) {
        setTimeout(function (){
          $('#mod4_juego').hide().empty();
        }, 2000);
      }
    } else {
      $('#aud_error').get(0).play();
    }
  }
});