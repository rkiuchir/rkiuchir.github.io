/*
$(function(){
  $('.hoge2A').click(function(){
    $(this).css('background-color','green')
  });
})
*/

var navFlg = false;
$(function(){
  $('.menu').on('click',function(){
    $('.menu__line').toggleClass('active');
    $('.menu_triangle').toggleClass('active');
    $('.menu__line').css('background', 'white');
    $('.gnav').fadeToggle();
    if(!navFlg){
        $('.gnav__menu__item').each(function(i){
            $(this).delay(i*100).animate({
                'margin-left' : 0,
                'opacity' : 1,
            },500);
        });
        navFlg = true;
    }
    else{
        $('.gnav__menu__item').css({
            'margin-left' : 100,
            'opacity' : 0,
        });
        $('.menu__line').css('background', '#fff');
        navFlg = false;
    }
});
})

/*
$(function(){
  $('.menu').on('click',function(){
      $('.menu__line').toggleClass('active');
      $('.gnav').fadeToggle();
  });
})
*/
/*
$(function(){
  $('#nav-toggle').click(function(){
    $('body').toggleClass('open')
  });
})
*/
