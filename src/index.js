// import slick carousel
import 'slick-carousel';

// site config
let headerHeight = 140;
let headerHeightOnClickNavigation = 80;
let lAnimationDuration = 500;
let animationFlagClsRationPerSection = 1.3;
let twentyNumber = 0;
let eightyNumber = 0;

// hero section height
const heroSectionHeight = $('.section.hero').height() - headerHeight;

// function responsible for flagging if element(section) is in view
const isFullySeen = el =>
    el && typeof el.getBoundingClientRect === 'function'
    && el.getBoundingClientRect()['top'] +
    window.scrollY + (window.innerHeight / animationFlagClsRationPerSection - headerHeight) <= window.innerHeight + window.scrollY;

// on page ready
$(document).ready(function () {

    // initializing slider
    $('.slider').slick({ dots: true });

    // scrolling entire page to top on page load
    $('html, body').animate({ scrollTop: $('#hero').offset().top }, lAnimationDuration);
    setTimeout(function () { $('#hero').addClass('in-view'); }, lAnimationDuration);

    // on window scroll
    $(window).scroll(function () {
        const windscroll = $(window).scrollTop();

        // setting active cls on header nav items while scrolling
        if (windscroll >= (headerHeight * 2)) {
            $('.section:not(.vision)').each(function (i) {
                if ($(this).position().top <= windscroll + headerHeight) {
                    $('.nav-item:not(.sidemenu-list-item).active').removeClass('active');
                    $('.nav-item:not(.sidemenu-list-item)').eq(i).addClass('active');
                }
            });
        }

        // setting css classes to header and sections that inform them that header height is reduced or not
        if(windscroll >= heroSectionHeight) {
            headerHeight = headerHeightOnClickNavigation;
            $('.header').addClass('header-reduced');
            $('.section').addClass('header-reduced');
        } else {
            headerHeight = 140;
            $('.header').removeClass('header-reduced');
            $('.section').removeClass('header-reduced');
        }

        // iterating through every section
        $('.section').each(function() {

            /// scrolling on specific section result in giving that section in view section
            if (isFullySeen(this) === true) {
                $(this).addClass('in-view');
            }

            // scrolling to the VISION section result in triggering animation
            if(isFullySeen(this) === true && $(this).hasClass('vision')) {
                let myInterval = setInterval(function () {
                    if (twentyNumber < 20) {
                        twentyNumber += 1;
                        $('.c100').addClass(`p${twentyNumber}`);
                        $('#twenty-percent').text(`${twentyNumber}`)
                    } else {
                        clearInterval(myInterval);
                    }
                }, 100);

                let myInterval2 = setInterval(function () {
                    if (eightyNumber < 80) {
                        eightyNumber += 1;
                        $('#eighty-percent').text(`${eightyNumber}`)
                    } else {
                        clearInterval(myInterval2);
                    }
                }, 35);
            }
        });
    });

    // code responsible for navigation clicks
    $('.nav-item').click(function (e) {
        e.preventDefault();
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('.sidemenu-wrap').removeClass('shown');
        $('.navi-trigger').removeClass('cross');

        if ($(this).hasClass('was-wir-tun')) {
            $('html, body').animate({scrollTop: $('#was-wir-tun').offset().top - headerHeightOnClickNavigation}, lAnimationDuration);
            setTimeout( () => {$('#was-wir-tun').addClass('in-view');}, lAnimationDuration);
        }
        if ($(this).hasClass('markenidee')) {
            $('html, body').animate({scrollTop: $('#markenidee').offset().top - headerHeightOnClickNavigation}, lAnimationDuration);
            setTimeout(() => {$('#markenidee').addClass('in-view');}, lAnimationDuration);
        }
        if ($(this).hasClass('produkte')) {
            $('html, body').animate({scrollTop: $('#produkte').offset().top - headerHeightOnClickNavigation}, lAnimationDuration);
            setTimeout(() => {$('#produkte').addClass('in-view');}, lAnimationDuration);
        }
        if ($(this).hasClass('mission')) {
            $('html, body').animate({scrollTop: $('#mission').offset().top - headerHeightOnClickNavigation}, lAnimationDuration);
            setTimeout(() => {$('#mission').addClass('in-view');}, lAnimationDuration);
        }
        if ($(this).hasClass('hintergrund')) {
            $('html, body').animate({scrollTop: $('#hintergrund').offset().top - headerHeightOnClickNavigation}, lAnimationDuration);
            setTimeout(() => {$('#hintergrund').addClass('in-view');}, lAnimationDuration);
        }
        if ($(this).hasClass('wertschopfung')) {
            $('html, body').animate({scrollTop: $('#wertschopfung').offset().top - headerHeightOnClickNavigation}, lAnimationDuration);
            setTimeout(() => {$('#wertschopfung').addClass('in-view');}, lAnimationDuration);
        }
        if ($(this).hasClass('kontakt')) {
            $('html, body').animate({scrollTop: $('#kontakt').offset().top - headerHeightOnClickNavigation}, lAnimationDuration);
            setTimeout(() => {$('#kontakt').addClass('in-view');}, lAnimationDuration);
        }
    });

    // get start button listener
    $('.get-started').click(function () {
        $('.nav-item.hero').removeClass('active');
        $('.nav-item.was-wir-tun').addClass('active');
        $('html, body').animate({scrollTop: $('#was-wir-tun').offset().top - headerHeightOnClickNavigation}, lAnimationDuration);
    });

    /// hamburger fancier menu click handler
    $('.navi-trigger').click(function () {
        if ($(this).hasClass('cross')) {
            $(this).removeClass('cross');
            $('.sidemenu-wrap').removeClass('shown');
        } else {
            $(this).addClass('cross')
            $('.sidemenu-wrap').addClass('shown');
        }
    });

    /// scroll to top of the page
    $('#to-top').on('click', function () {
        $('html, body').animate({scrollTop: $('#hero').offset().top}, lAnimationDuration);
    });
});