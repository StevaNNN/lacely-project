// import slick carousel
import 'slick-carousel';

// site config
let headerHeight = 140;
let headerHeightOnClickNavigation = 80;
let lAnimationDuration = 300;
let animationFlagClsRationPerSection = 2.3;
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
        $('.section:not(.vision)').each(function (i) {
            if ($(this).position().top <= windscroll + headerHeight) {
                $('.nav-item:not(.sidemenu-list-item).active').removeClass('active');
                $('.nav-item:not(.sidemenu-list-item)').eq(i).addClass('active');
            }
        });

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
                setTimeout(function () {
                    let myInterval = setInterval(function () {
                        if (twentyNumber < 20) {
                            twentyNumber += 1;
                            $('.c100').addClass(`p${twentyNumber}`);
                            $('#twenty-percent').text(`${twentyNumber}`)
                        } else {
                            clearInterval(myInterval);
                        }
                    }, 150);
                },1000);

                setTimeout(function () {
                    let myInterval2 = setInterval(function () {
                        if (eightyNumber < 80) {
                            eightyNumber += 1;
                            $('#eighty-percent').text(`${eightyNumber}`)
                        } else {
                            clearInterval(myInterval2);
                        }
                    }, 150);
                }, 1000);
            }
        });
    });

    // code responsible for navigation clicks
    $('.nav-item').click(function (e) {
        e.preventDefault();
        $('.sidemenu-wrap').removeClass('shown');
        $('.navi-trigger').removeClass('cross');
        $('html').removeClass('no-scroll-y');

        if ($(this).hasClass('was-wir-tun')) {
            $('html, body').animate({scrollTop: Math.round($('#was-wir-tun').offset().top - headerHeightOnClickNavigation)}, lAnimationDuration);
            setTimeout( () => {$('#was-wir-tun').addClass('in-view');}, lAnimationDuration);
        }
        if ($(this).hasClass('markenidee')) {
            $('html, body').animate({scrollTop: Math.round($('#markenidee').offset().top - headerHeightOnClickNavigation)}, lAnimationDuration);
            setTimeout(() => {$('#markenidee').addClass('in-view');}, lAnimationDuration);
        }
        if ($(this).hasClass('produkte')) {
            $('html, body').animate({scrollTop: Math.round($('#produkte').offset().top - headerHeightOnClickNavigation)}, lAnimationDuration);
            setTimeout(() => {$('#produkte').addClass('in-view');}, lAnimationDuration);
        }
        if ($(this).hasClass('mission')) {
            $('html, body').animate({scrollTop: Math.round($('#mission').offset().top - headerHeightOnClickNavigation)}, lAnimationDuration);
            setTimeout(() => {$('#mission').addClass('in-view');}, lAnimationDuration);
        }
        if ($(this).hasClass('hintergrund')) {
            $('html, body').animate({scrollTop: Math.round($('#hintergrund').offset().top - headerHeightOnClickNavigation)}, lAnimationDuration);
            setTimeout(() => {$('#hintergrund').addClass('in-view');}, lAnimationDuration);
        }
        if ($(this).hasClass('wertschopfung')) {
            $('html, body').animate({scrollTop: Math.round($('#wertschopfung').offset().top - headerHeightOnClickNavigation)}, lAnimationDuration);
            setTimeout(() => {$('#wertschopfung').addClass('in-view');}, lAnimationDuration);
        }
        if ($(this).hasClass('wir')) {
            $('html, body').animate({scrollTop: Math.round($('#wir').offset().top - headerHeightOnClickNavigation)}, lAnimationDuration);
            setTimeout(() => {$('#wir').addClass('in-view');}, lAnimationDuration);
        }
        if ($(this).hasClass('kontakt')) {
            $('html, body').animate({scrollTop: Math.round($('#kontakt').offset().top - headerHeightOnClickNavigation + 1)}, lAnimationDuration); // fix for not setting active cls on kontakt nav item
            setTimeout(() => {$('#kontakt').addClass('in-view');}, lAnimationDuration);
        }
    });

    // get start button listener
    $('.get-started').click(function () {
        $('.nav-item.hero').removeClass('active');
        $('html, body').animate({scrollTop: $('#was-wir-tun').offset().top - headerHeightOnClickNavigation}, lAnimationDuration);
    });

    /// hamburger fancier menu click handler
    $('.navi-trigger').click(function (e) {
        e.preventDefault();
        if ($(this).hasClass('cross')) {
            $(this).removeClass('cross');
            $('.sidemenu-wrap').removeClass('shown');
            $('html').removeClass('no-scroll-y');
        } else {
            $(this).addClass('cross');
            $('.sidemenu-wrap').addClass('shown');
            $('html').addClass('no-scroll-y');
        }
    });

    /// handling removed scroll on html when side menu is opened and appears below 1024px
    /// basicly just remove cls which is glued when user clicks to open side menu, side menu stays opened, and than go back to desktop size
    const checkPosition = () => {
        if (window.matchMedia('(min-width: 1024px)').matches) {
            $('html').removeClass('no-scroll-y');
            $('.navi-trigger').removeClass('cross');
            $('.sidemenu-wrap').removeClass('shown');
        }
    }

    // on resize handler for function above
    $(window).on('resize', function(){
        checkPosition();
    });

    // scroll to top of the page
    $('#to-top').on('click', function () {
        $('html, body').animate({scrollTop: $('#hero').offset().top}, lAnimationDuration);
    });

    var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
        isMobile = true;
    }
    !isMobile ? $('html').removeClass('on-mobile-device') : $('html').addClass('on-mobile-device');
});

var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) !== -1) {
                return data[i].identity;
            }
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
            return;
        }

        var rv = dataString.indexOf("rv:");
        if (this.versionSearchString === "Trident" && rv !== -1) {
            return parseFloat(dataString.substring(rv + 3));
        } else {
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        }
    },

    dataBrowser: [
        {string: navigator.userAgent, subString: "Edge", identity: "MS Edge"},
        {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
        {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
        {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
        {string: navigator.userAgent, subString: "Opera", identity: "Opera"},
        {string: navigator.userAgent, subString: "OPR", identity: "Opera"},
        {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
        {string: navigator.userAgent, subString: "Safari", identity: "Safari"}
    ]
};

BrowserDetect.init();

var bv= BrowserDetect.browser;

if( bv == "Chrome"){
    $("body").addClass("chrome");
}
else if(bv == "MS Edge"){
    $("body").addClass("edge");
}
else if(bv == "Explorer"){
    $("body").addClass("ie");
}
else if(bv == "Firefox"){
    $("body").addClass("firefox");
}