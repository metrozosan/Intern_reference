$(function() {
  // チェックボックスのクリックを無効化します。
  $('.image_box .disabled_checkbox').click(function() {
    return false;
  });

  // 画像がクリックされた時の処理です。
  $('img.thumbnail').on('click', function() {
    if (!$(this).is('.checked')) {
      // チェックが入っていない画像をクリックした場合、チェックを入れます。
      $(this).removeClass('unchecked');
      $('.checked').each(function(){
        $(this).removeClass('checked');
        $(this).addClass('unchecked');
      });
      $(this).addClass('checked');
      alert($(this).attr("id"));
      var id=$(this).attr("id");
      $('#next_btn').each(function(){
        $(this).attr('href',"javascript:window.location.href = 'https://hacku.project/multi.html'" +id+ "'/';");
      });
      /*$('.checked').each(function(){
        alert($(this).attr("id"));
      });*/
    } else {
      // チェックが入っている画像をクリックした場合、チェックを外します。
      $(this).removeClass('checked');
      $(this).addClass('unchecked');
    }
  });
});