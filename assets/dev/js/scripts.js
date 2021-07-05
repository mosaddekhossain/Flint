/* ---------------------------------------------
 common scripts
 --------------------------------------------- */

;(function () {

    "use strict"; // use strict to start

    var $body = $('body'),
        $window = $(window);

    /* ---------------------------------------------
     pre loader
     --------------------------------------------- */

    $window.on('load', function() {
        $("#loader").fadeOut("slow", function(){
            $("#preloader").delay(300).fadeOut("slow");
        });

    });

    $('#slider').vegas({
        slides: [
        { src: "assets/img/slider/s-1.jpg" },
        { src: "assets/img/slider/s-2.jpg" },
        { src: "assets/img/slider/s-3.jpg" }
        ],
        animation: 'kenburns'
    });

    /* ---------------------------------------------
     WOW init
     --------------------------------------------- */

    new WOW().init();

    $(document).ready(function () {

        /* ---------------------------------------------
         menu scrolling
         --------------------------------------------- */
        $('.navbar-nav').onePageNav({
            currentClass: 'current',
            scrollSpeed: 100,
	        scrollThreshold: 0.5,
            easing: 'swing',
            filter: ':not(.external)'
        });

        $('.go-down a, .next').on('click', function(e) {
            e.preventDefault();
            var element_id = $(this).attr('href');
            $('html, body').animate({
                scrollTop: $(element_id).offset().top -10
            },500);
        });


        /* ---------------------------------------------
         Closes the Responsive Menu on Menu Item Click
         --------------------------------------------- */

        $('.navbar-collapse ul li a').on('click', function() {
            $('.navbar-toggler:visible').click();
        });


        /* ---------------------------------------------
         height 100%
         --------------------------------------------- */

        $(".full-height").height($window.height());

        $window.on('resize', function(){
            $(".full-height").height($window.height());
        });


        /* ---------------------------------------------
         portfolio filtering
         --------------------------------------------- */

        var $portfolio = $('.portfolio-grid');
        if ($.fn.imagesLoaded && $portfolio.length > 0) {
            imagesLoaded($portfolio, function () {
                $portfolio.isotope({
                    itemSelector: '.portfolio-item',
                    filter: '*'
                });
                $window.trigger("resize");
            });
        }

        $('.portfolio-filter').on('click', 'a', function (e) {
            e.preventDefault();
            $(this).parent().addClass('active').siblings().removeClass('active');
            var filterValue = $(this).attr('data-filter');
            $portfolio.isotope({filter: filterValue});
        });


        /*----------------------------------------------------
         Owl Carousel
         ------------------------------------------------------ */
        $('#owl-slider').owlCarousel({
            nav: true,
            loop: true,
            autoplay: true,
            margin:0,
            //dots: false,
            //responsiveClass:true,
            navText: ["<a><span></span></a>","<a><span></span></a>"],
            responsive:{
                0:{
                    items:1,
                    dots:false
                },
                600:{
                    items:1,
                    dots:false
                },
                1000:{
                    items:1
                }
            }
        });

        /* ---------------------------------------------
         testimonial
         --------------------------------------------- */

        $("#testimonial-list").owlCarousel({
            autoplay: true,
            //autoplayTimeout: 5000,
            loop: true,
            items: 1,
            navigation : true,
            pagination: false,
        });



        /* ---------------------------------------------
         Fun facts
         --------------------------------------------- */
        function animateFacts(fact) {
            if($.fn.visible && $(fact).visible() && ! $(fact).hasClass('animated') ) {
                $(fact).animateNumber({
                    number: parseInt($(fact).data('target'),10)
                }, 2000);
                $(fact).addClass('animated');
            }
        }

        function initFunFacts() {
            var funFacts = $('.fun-box').find('.value');
            funFacts.each(function() {
                animateFacts(this);
            });
        }

        initFunFacts();

        $window.on("scroll", function () {
            initFunFacts();
        });


        /*-----------------------------------------------------
         magnific popup init
         ------------------------------------------------------- */

        $(".portfolio-gallery").each(function () { // the containers for all your galleries
            $(this).find(".popup-gallery").magnificPopup({
                type: "image",
                gallery: {
                    enabled: true
                }
            });
        });


        /*-----------------------------------------------------
         Back to top
         ------------------------------------------------------- */

        $body.append('<a id="go-top" data-scroll class="go-top-hide" href="#"><i class="fa fa-long-arrow-up"></i></a>');

        var scrollBack = $('#go-top');
        $window.on('scroll', function() {
            if($(this).scrollTop() > 250 ) {
                scrollBack
                    .addClass('go-top-show')
                    .removeClass('go-top-hide');
            } else {
                scrollBack
                    .addClass('go-top-hide')
                    .removeClass('go-top-show');
            }
        });

        scrollBack.on('click', function(e){
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 400 );
        });

    });

})(jQuery);