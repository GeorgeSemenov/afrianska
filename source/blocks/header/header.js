$(document).ready(function(){
  $('.header__sandwich-ico-container').click(function(){
    $('.header').toggleClass('header_expanded');
  });
  if ( $('.header').offset().top >=100 ){//При загрузке страници, если хедер отстаёт от начала документа более чем на 100 пыкселей то будет выполнятся следующие действия
    $(".header").addClass('header_theme_small header_theme_white');
  }
  $(window).scroll(function () {//При скроле более чем на 100 px хедер получает модификатор, который изменяет его высоту(только для десктопа и плоншетов)
    if (($(window).scrollTop()>=(100)) ){
      $(".header").addClass('header_theme_small header_theme_white');
    }
    else{
      $(".header").removeClass('header_theme_small header_theme_white');
    }
  });
})
