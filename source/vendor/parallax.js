frontpage && $(window).bind('scroll', function (e) {
  parallaxScroll();
});

function parallaxScroll() {
  var scrolled = $(window).scrollTop();
  $('.milk-big').css({
    'top': (480 + (scrolled * .25)) + 'px', // изначальная позиция сверху, индекс отвечает за скорость
    'right': (-131 + (scrolled * .15)) + 'px', // изначальная позиция справа 
    'transform': 'rotate(-' + (scrolled * .02) + 'deg)'
  });
  $('.milk-small').css({
    'top': (200 - (scrolled * .5)) + 'px',
    'left': (131 + (scrolled * .25)) + 'px',
    'transform': 'rotate(' + (scrolled * .02) + 'deg)'
  });
  $('.butter').css({
    'top': (94 + (scrolled * .55)) + 'px',
    'left': (61 - (scrolled * .25)) + 'px',
    'transform': 'rotate(-' + (scrolled * .02) + 'deg)'
  });
  $('.bottle').css({
    'top': (530 + (scrolled * .3)) + 'px',
    'left': (-110 + (scrolled * .25)) + 'px',
    'transform': 'rotate(' + (scrolled * .02) + 'deg)'
  });
  $('.cheese-big').css({
    'top': (87 - (scrolled * .5)) + 'px',
    'right': (0 + (scrolled * .05)) + 'px',
    'transform': 'rotate(-' + (scrolled * .02) + 'deg)'
  });
  $('.cheese-small').css({
    'top': (679 - (scrolled * .15)) + 'px',
    'left': (487 - (scrolled * .05)) + 'px',
    'transform': 'rotate(' + (scrolled * .02) + 'deg)'
  });
  $('.list').css({
    'top': (-22 + (scrolled * .55)) + 'px',
    'left': (807 - (scrolled * .55)) + 'px',
    'transform': 'rotate(-' + (scrolled * .02) + 'deg)'
  });
}
