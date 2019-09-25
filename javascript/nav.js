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
        $('.gnav__menu__item, .gnav__menu__current').each(function(i){
            $(this).delay(i*100).animate({
                'margin-left' : 0,
                'opacity' : 1,
            },500);
        });
        navFlg = true;
    }
    else{
        $('.gnav__menu__item, .gnav__menu__current').css({
            'margin-left' : 100,
            'opacity' : 0,
        });
        $('.menu__line').css('background', '#fff');
        navFlg = false;
    }
});
})



/* Reload due to the window width change */
$(function(){

    $(".btn").click(function(){
        $(".box").css("background-color","red");
    })

    var timer = false;
    var prewidth = $(window).width()
    $(window).resize(function() {
        if (timer !== false) {
            clearTimeout(timer);
        };
        timer = setTimeout(function() {
            var nowWidth = $(window).width()
            if(prewidth < 1024){
              if(nowWidth >= 1024){
                location.reload();
              };
            };
            prewidth = nowWidth;
        }, 200);
    });
});


$(function() {
  var $win = $(window),
      $gnav__menu = $('.gnav__menu'),
      $gnav__menu__item = $('.gnav__menu__item'),
      $gnav__menu__current = $('.gnav__menu__current'),
      animationClass = 'change';
      animationClass2 = 'change2';

  $win.on('load scroll', function() {
    var value = $(this).scrollTop();
    if ( value > 200 ) {
      $gnav__menu.addClass(animationClass);
      $gnav__menu__item.addClass(animationClass2);
      $gnav__menu__current.addClass(animationClass2);
    } else {
      $gnav__menu.removeClass(animationClass);
      $gnav__menu__item.removeClass(animationClass2);
      $gnav__menu__current.removeClass(animationClass2);
    }
  });
});



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
