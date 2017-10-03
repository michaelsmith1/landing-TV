($(document).ready( function() {
  'use strict';
    var menu = $('.channels-list'),
        mobilemenu = $('.menu-mobile'),
        menu_item = $('.channels-list__item__link');

  $('.slider').slick({
      adaptiveHeight: false,
      infinite: true,
      autoplay: true,
      prevArrow: '<a href="#" class="slick-prev"><img class="slick-arrow-img" src="assets/img/back.png"></a>',
      nextArrow: '<a href="#" class="slick-next"><img class="slick-arrow-img" src="assets/img/back.png"></a>'
  });

    $('.lang__select').selecter();

    $(window).resize( function () {
        if($(document).width() > 768) {
            menu.css({'display': 'flex'});
            mobilemenu.find('.burger').removeClass('active');
        }
    });

    menu_item.on('click',function (e) {
        e.preventDefault();
        $(this).parent().siblings().find('.channels-list__item__link').next().slideUp('fast').stop(true,true);
        $(this).next().slideToggle('fast').stop(true,true);
    });
    mobilemenu.on('click',function (e) {
        e.preventDefault();
        $(this).next().slideToggle();
        $(this).find('.burger').toggleClass('active');
        console.log('werq');

    });

    $(document).mouseup(function (e) {
        if(!menu_item.is(e.target) && !$('.sub-list__item').is(e.target) && !$('.sub-list').is(e.target) && $(document).width() > 768) {
            menu_item.next().slideUp().stop(true,true);
        }
        else if(!menu.is(e.target) && !menu_item.is(e.target) && !mobilemenu.is(e.target) && mobilemenu.has(e.target).length === 0 && !$('.sub-list__item').is(e.target) && !$('.sub-list').is(e.target)
            && $(document).width() < 768) {
        // else if(!(mobilemenu.is(e.target))&& $(document).width() < 768) {
            mobilemenu.next().slideUp().stop(true,true);
            mobilemenu.find('.burger').removeClass('active').stop(true,true);
            console.log('tcnm');
        }
    });

    function checkSection () {
        $('.section').each(function () {
            var $this = $(this),
                topEdge = $this.offset().top - 100,
                bottomEdge = topEdge + $this.height(),
                wScroll = $(window).scrollTop();

            if(topEdge < wScroll && bottomEdge > wScroll){
                var currentId = $this.data('section'),
                    reqLink = $('.one-page-nav__item__link').filter('[href="#' + currentId + '"]');
                reqLink.closest('.one-page-nav__item').addClass('active').siblings().removeClass('active');
                window.location.hash = currentId;
            }

        })
    }

    function showSection(section, isAnimate) {
        var direction = section.replace(/#/,''),
            reqSection = $('.section').filter('[data-section="' + direction + '"]'),
            reqSectionPos = reqSection.offset().top;
        if (isAnimate){
            $('body, html').animate({scrollTop: reqSectionPos},500)
        } else{
            $('body, html').scrollTop(reqSectionPos);
        }
    }

    function up() {
        $('.up').on('click', function () {
            $("body, html").animate({
                scrollTop: 0
            }, 800);
            return false;
        })
    }

    $(window).scroll(function(){
        var bo = $(window).scrollTop();
        if ( bo > 200 ) { $(".up").css("display", "flex"); } else { $(".up").css("display", "none"); }
    });
    up();
    $(window).scroll( checkSection);
    showSection(window.location.hash, false);
    $('.one-page-nav__item__link').on('click',function (e) {
        e.preventDefault();
        showSection($(this).attr('href'), true);
    });
    new WOW({
        offset: 10
    }).init();
}));
