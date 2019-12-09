(function($) {

	"use strict";
    


    /*------------------------------------------
        = FUNCTIONS
    -------------------------------------------*/
    // Check ie and version
    function isIE () {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1], 10) : false;
    }


    // Toggle mobile navigation
    function toggleMobileNavigation() {
        var navbar = $("#navbar");
        var openBtn = $(".navbar-header .open-btn");
        var closeBtn = $("#navbar .close-navbar");
        var navLinks = $("#navbar > ul > li > a:not(.dropdown-toggle)");

        openBtn.on("click", function() {
            if (!navbar.hasClass("slideInn")) {
                navbar.addClass("slideInn");
            }
            return false;
        })

        closeBtn.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;            
        })

        navLinks.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;            
        })
    }

    toggleMobileNavigation();

    
    //ACTIVE CURRENT MENU WHILE SCROLLING
    // function for active menuitem
    function activeMenuItem($links) {
        var cur_pos = $(window).scrollTop() + 2,
            bottomPosition = $(document).height() - $(window).height() - $(window).scrollTop(),
            sections = $("section"),
            nav = $links,
            nav_height = nav.outerHeight(),
            home = nav.find(" > ul > li:first");

        sections.each(function() {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find("> ul > li > a").parent().removeClass("current");
                nav.find("a[href='#" + $(this).attr('id') + "']").parent().addClass("current");
            } else if (cur_pos === 2) {
                nav.find("> ul > li > a").parent().removeClass("current");
                home.addClass("current");
            }
        });
    }


    // smooth-scrolling
    function smoothScrolling($links, $topGap = 0) {
        var links = $links;
        var topGap = $topGap;

        links.on("click", function() {
            if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) +"]");
                if (target.length) {
                    $("html, body").animate({
                    scrollTop: target.offset().top - topGap
                }, 1000, "easeInOutExpo");
                    return false;
                }
            }
            return false;
        });
    }


    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function() {
                var height = $(this).position().top;
                var resize     = height - $(window).scrollTop();
                var doParallax = -(resize/5);
                var positionValue   = doParallax + "px";
                var img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });
            });
        }
    }

    bgParallax();


    // function for setting two coloumn height equial
    function setTwoColEqHeight($col1, $col2) {
        var firstCol = $col1,
            secondCol = $col2,
            firstColHeight = $col1.innerHeight(),
            secondColHeight = $col2.innerHeight();

        if (firstColHeight > secondColHeight) {
            secondCol.css({
                "height": firstColHeight + 1 + "px"
            })
        } else {
            firstCol.css({
                "height": secondColHeight + 1 + "px"
            })
        }
    }

    // sticky menu
    function stickyMenu() {
        var header = $(".site-header-s1"),
            headerS2 = $(".header-style2"),
            headerS3 = $(".header-style3"),
            scroll = $(window).scrollTop(),
            top = 300,  
            headerHeight = $(".site-header-s1").height(),  
            pageWrapper = $(".page-wrapper");  

        if (scroll > top) {
            header.addClass("sticky");
            headerS2.addClass("sticky-s2");
            headerS3.addClass("sticky-s3");
            pageWrapper.css({
                "padding-top": headerHeight + "px"
            });

        } else {
            header.removeClass("sticky");
            headerS2.removeClass("sticky-s2");
            headerS3.removeClass("sticky-s3");
            pageWrapper.css({
                "padding-top": 0
            });            
        }
    }


    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
    });


    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(500, function() {

                //active wow
                wow.init();

                $(window).on("scroll", function() {
                    stickyMenu();
                })
            });
        }
    }


    /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/  
    if ($(".fancybox").length) {
        $(".fancybox").fancybox({
            openEffect  : "elastic",
            closeEffect : "elastic",
            wrapCSS     : "project-fancybox-title-style"
        });
    }


    /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/  
    if ($(".video-play").length) {
        $(".video-play").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {  
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });    
    }
    

    /*------------------------------------------
        = ACTIVE GALLERY POPUP IMAGE
    -------------------------------------------*/  
    if ($(".popup-gallery").length) {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',

            gallery: {
              enabled: true
            },

            zoom: {
                enabled: true,

                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });    
    }


    /*------------------------------------------
        = FUNCTION FORM SORTING GALLERY
    -------------------------------------------*/
    function sortingGallery() {
        if ($(".sortable-gallery .gallery-filters").length) {
            var $container = $('.gallery-container');
            $container.isotope({
                filter:'*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });

            $(".gallery-filters li a").on("click", function() {
                $('.gallery-filters li .current').removeClass('current');
                $(this).addClass('current');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter:selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
        }
    }

    sortingGallery(); 



    /*------------------------------------------
        = MASONRY GALLERY SETTING
    -------------------------------------------*/
    function masonryGridSetting() {
        if ($('.masonry-gallery').length) {
            var $grid =  $('.masonry-gallery').masonry({
                itemSelector: '.grid',
                columnWidth: '.grid',
                percentPosition: true
            });

            $grid.imagesLoaded().progress( function() {
                $grid.masonry('layout');
            });
        }
    }

    masonryGridSetting();


    /*------------------------------------------
        = PROGRESS BAR
    -------------------------------------------*/
    function progressBar() {
        if ($(".progress-bar").length) {
            var $progress_bar = $('.progress-bar');
            $progress_bar.appear();
            $(document.body).on('appear', '.progress-bar', function() {
                var current_item = $(this);
                if (!current_item.hasClass('appeared')) {
                    var percent = current_item.data('percent');
                    current_item.css('width', percent + '%').addClass('appeared').parent().append('<span>' + percent + '%' + '</span>');
                }
                
            });
        };
    }

    progressBar();


    /*------------------------------------------
        = FUN FACT COUNT
    -------------------------------------------*/
    if ($(".start-count").length) {
        $('.counter').appear();
        $(document.body).on('appear', '.counter', function(e) {
            var $this = $(this),
            countTo = $this.attr('data-count');

            $({ countNum: $this.text()}).animate({
                countNum: countTo
            }, {
                duration: 3000,
                easing:'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    } 


    /*------------------------------------------
        = AGENCY TESTIMONIALS SLIDER
    -------------------------------------------*/
    if ($(".agency-testimonials-slider").length) {
        $(".agency-testimonials-slider").owlCarousel({
            autoplay:true,
            mouseDrag: false,
            smartSpeed:300,
            margin: 30,
            loop:true,
            dots:false,
            autoplayHoverPause:true,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
            responsive: {
                0 : {
                    items: 1
                },

                992 : {
                    items: 2
                }
            }
        });
    }


    /*-----------------------------------------------------
        =  CV  HOME PAGE PORTFOLIO MOUSE HOVER EFFECT
    ------------------------------------------------------*/
    if ($(".cv-portfolio-grids .box-inner").length) {
        $(".cv-portfolio-grids .box-inner").on("mousemove", function(e) {
            var parentOffset = $(this).parent().offset(); 
            var relX = e.pageX - parentOffset.left;
            var relY = e.pageY - parentOffset.top;

            $('.cv-portfolio .box-inner i').css({'top': relY}); 
            $('.cv-portfolio .box-inner i').css({'left': relX});
        })
    }


    /*------------------------------------------
        = AGENCY NEWS SLIDER
    -------------------------------------------*/
    if ($(".agency-news-slider").length) {
        $(".agency-news-slider").owlCarousel({
            items: 3,
            mouseDrag: false,
            smartSpeed:300,
            margin: 30,
            stagePadding: 5,
            loop:true,
            responsive: {
                0 : {
                    items: 1
                },

                600 : {
                    items: 2
                },

                992 : {
                    items: 3
                }
            }
        });
    }


    /*------------------------------------------
        = PERSONAL CV TYPED TEXT
    -------------------------------------------*/
    if ($(".typed-element").length) {
        $(".typed-element").typed({
            strings: ["Designer.", "and developer."],
            typeSpeed: 100,
            loop: true,
            showCursor: true,
            cursorChar: "|"
        });
    }


    /*------------------------------------------
        = APP SERVICES SLIDER
    -------------------------------------------*/
    if ($(".app-services-slider").length) {
        $(".app-services-slider").owlCarousel({
            mouseDrag: false,
            smartSpeed:300,
            margin: 30,
            loop:true,
            responsive: {
                0 : {
                    items: 1
                },

                550 : {
                    items: 2
                },

                992 : {
                    items: 3
                }
            }
        });
    }


    /*------------------------------------------
        = APP SCREENSHOT SLIDER
    -------------------------------------------*/
    if ($(".screenshot-slider").length) {
        $(".screenshot-slider").owlCarousel({
            autoplay: false,
            loop: true,
            autoplayTimeout: 1500,
            items: 1,
            smartSpeed:300,
            margin: 50,
            slideBy: 1,
            dots: false,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]            
        });
    }


    /*------------------------------------------
        = APP TESTIMONIALS SLIDER
    -------------------------------------------*/
    if ($(".app-testimonial-slider").length) {
        $(".app-testimonial-slider").owlCarousel({
            items: 1,
            mouseDrag: false,
            smartSpeed:300,
        });
    }


    /*-------------------------------------------------------------
        = POPUP GOOGLE MAP FOR APP LANDING PAGE CONTACT SECTION
    -------------------------------------------------------------*/  
    if ($(".map-link").length) {
        $('.map-link').magnificPopup({
            type: 'iframe'
        }); 
    }


    /*-----------------------------------------------------
        =  APP LANDING HOME  SCROLL DOTS SETTING
    ------------------------------------------------------*/
    function settingApplandingScroolDots() {
        if ($(".home-app-landing").length) {
            var dots = $(".home-app-landing #navbar > ul");
            var pageWrapper = $(".home-app-landing");
            var currentItem = dots.find(".current a");
            var allitem = dots.find("a");
            
            allitem.each(function() {
                var $this = $(this);
                var $text = $this.text();
                $this.append("<span class='t-tips'>" + $text +"</span>");
            });

            dots.clone().appendTo(pageWrapper).wrap( "<div class='scroll-pointer'></div>" );
        }
    }

    settingApplandingScroolDots();


    /*------------------------------------------
        = GOOGLE MAP
    -------------------------------------------*/  
    function map() {

        var myLatLng = new google.maps.LatLng(36.169941,-115.139830);
        var mapProp = {
            center: myLatLng,
            zoom: 11,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROAD
        };

        var map = new google.maps.Map(document.getElementById("map"),mapProp);
        var marker = new google.maps.Marker({
            position: myLatLng
        });

        marker.setMap(map);

        map.set('styles',
            [
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#444444"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#4e3d68"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                }
            ]
        );
    };


    /*------------------------------------------
        = CONTACT FORM SUBMISSION
    -------------------------------------------*/  
    /*** Home cv contact form ***/
    if ($("#contact-form2").length) {
        $("#contact-form2").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: "required"
            },

            messages: {
                name: "Please enter your name",
                email: "Please enter your email"
            },

            submitHandler: function (form) {
                $("#loader").css("display", "inline-block");
                $.ajax({
                    type: "POST",
                    url: "mail2.php",
                    data: $(form).serialize(),
                    success: function () {
                        $( "#loader").hide();
                        $( "#success").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#success").slideUp( "slow" );
                        }, 3000);
                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 3000);
                    }
                });
                
                return false; // required to block normal submit since you used ajax
            }
        });
    }

    /*** Home app landing contact form ***/
    if ($("#contact-form").length) {
        $("#contact-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: "required",
                
                topic: {
                    required: true
                }
            },

            messages: {
                name: "Please enter your name",
                email: "Please enter your email",
                topic: "Select your consult topic",
            },

            submitHandler: function (form) {
                $("#loader").css("display", "inline-block");
                $.ajax({
                    type: "POST",
                    url: "mail.php",
                    data: $(form).serialize(),
                    success: function () {
                        $( "#loader").hide();
                        $( "#success").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#success").slideUp( "slow" );
                        }, 3000);
                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 3000);
                    }
                });
                
                return false; // required to block normal submit since you used ajax
            }
        });
    }



    /*==========================================================================
        WHEN DOCUMENT LOADING 
    ==========================================================================*/
        $(window).on('load', function() {

            preloader();

            masonryGridSetting();

            if ($(".map").length) {
                map();
            }

            bgParallax();

            // Set agency FAQ section's two col equal height
            if ($(".agency-faq").length) {
                setTwoColEqHeight($(".agency-faq .left-col"), $(".agency-faq .right-col"));
            }

            // All page smooth scrolling except app landing home 
            if ($(".default-scroll").length) {
                smoothScrolling($("#navbar > ul > li > a:not(.dropdown-toggle)"), -5);
            }

            // App landing home smooth scrolling
            if ($(".home-app-landing").length) {
                smoothScrolling($(".scroll-pointer > ul > li > a:not(.dropdown-toggle)"));

                if ($(window).innerWidth() < 975) {
                    smoothScrolling($("#navbar > ul > li > a:not(.dropdown-toggle)"), -5);
                    console.log($(window).innerWidth());
                }
            }

        });



    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function() {

        activeMenuItem($("#navbar"));

        activeMenuItem($(".scroll-pointer"));

        bgParallax();

    });


})(window.jQuery);
