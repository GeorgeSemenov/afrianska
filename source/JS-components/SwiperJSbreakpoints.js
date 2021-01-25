import Swiper from '../vendor/swiperJS/swiper-bundle.js';
export let SwiperJSBreackpoints = function(brObj){
  if (brObj == undefined)
    {brObj = {};}

  if (brObj.desWidth == undefined)
    {brObj.desWidth = '(min-width:1440px)';}
  if (brObj.carouselName == undefined)
    {brObj.carouselName = '.picture-line';}
  if (brObj.spvMobile == undefined)
    {brObj.spvMobile = 1;}
  if (brObj.sbMobile == undefined)
    {brObj.sbMobile = 0;}
  if (brObj.spvTablet == undefined)
    {brObj.spvTablet = 2;}
  if (brObj.sbTablet == undefined)
    {brObj.sbTablet = 10;}
  if (brObj.spvDesktop == undefined)
    {brObj.spvDesktop = 3;}
  if (brObj.sbDesktop == undefined)
    {brObj.sbDesktop = 0;}
  if (brObj.navRight == undefined)
    {brObj.navRight = ".picture-line__arrow_right";}
  if (brObj.navLeft == undefined)
    {brObj.navLeft = ".picture-line__arrow_left";}

  var breakpoint = window.matchMedia(brObj.desWidth);
  var swiper;

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
      swiper = new Swiper(brObj.carouselName, {
      slidesPerView: brObj.spvMobile,
      spaceBetween: brObj.sbMobile,
      navigation: {
        nextEl: brObj.navRight,
        prevEl: brObj.navLeft,
      },
      autoplay: ((brObj.delay == undefined) ? undefined : {delay: brObj.delay,disableOnInteraction: false}),
      breakpoints:{
        510:{
          slidesPerView: brObj.spvTablet,
          spaceBetween: brObj.sbTablet,
        },
        1100:{
          slidesPerView: brObj.spvDesktop,
          spaceBetween: brObj.sbDesktop,
        }
      }
    });
  };

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
}