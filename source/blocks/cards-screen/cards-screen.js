import Swiper from '../../../node_modules/swiper/swiper-bundle.js';
$(document).ready(function(){

  var breakpoint= window.matchMedia('(min-width:991px)');
  var swiper; // объявляю переменную, чтобы она была видна во всех функциях

  var breakpointChecker = function(){
    if (breakpoint.matches === true) {
      if (swiper !== undefined) {
        return swiper.destroy();
      }
    } else if (breakpoint.matches === false) {
      return enableSwiper();
    }
  };

  var enableSwiper = function () {
      swiper = new Swiper('.cards-screen', {
      slidesPerView: 1,
      spaceBetween: 15,
      pagination: {
        el: '.cards-screen__pagination',
      },
      // autoplay: {
      //   delay: 3500,
      //   disableOnInteraction: false,
      // },
      breakpoints:{
        510:{
          slidesPerView: 2,
          spaceBetween: 15,
        },
      }
    });
  };
  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
})
