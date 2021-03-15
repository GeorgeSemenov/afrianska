$(document).ready(function(){
  $('.header__sandwich-ico-container').click(function(){
    $('.header').toggleClass('header_expanded');
  });
  $(window).scroll(function () {//При скроле более чем на 100 px хедер получает модификатор, который изменяет его высоту(только для десктопа и плоншетов)
    if (($(window).scrollTop()>=(100)) && ($(window).width()>=767) ){
      $(".header").addClass('header_theme_small');
    }
    else{
      $(".header").removeClass('header_theme_small');
    }
  });
})
