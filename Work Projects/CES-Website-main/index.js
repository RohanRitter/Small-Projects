const cube = $('.cube');
var currentIndex = 0;
let scrolling = false;
var contactshow = false;

// Page Content
var pages = [
    {
        title: '<h2> </h2>',
        image: './Pictures/Blank.png',
        context: ' '
    },
    {
        title: '<h2>Home</h2>',
        image: './Pictures/Logo_big.png',
        context: '<h3>Welcome to Coreline Engineering Solutions</h3><br>At Coreline Engineering Solutions, we are dedicated to revolutionizing the telecommunications industry through our expert design services. As a South African based provider, we bring a unique perspective to the global telecommunications outside plant design market. Our team of highly skilled engineers is focused on delivering innovative and efficient solutions to connect communities and businesses around the world. Join us in our mission to build a connected future.'
    },
    {
        title: '<h2>About</h2>',
        image: './Pictures/Logo_big.png',
        context: '<br><br>At Coreline Engineering Solutions, we are dedicated to revolutionizing the telecommunications industry through our expert design services. As a South African based provider, we bring a unique perspective to the global telecommunications outside plant design market.<br><br> Our team of highly skilled engineers is focused on delivering innovative and efficient solutions to connect communities and businesses around the world. Join us in our mission to build a connected future.'
    },
    {
        title: '<h2>Services</h2>',
        image: './Pictures/Logo_big.png',
        context: '<br><br>Our team specializes in access planning, permits, fiber optic engineering, and transmission planning. We excel in fiber optic system design, and route surveys, ensuring comprehensive project details for cost estimation and implementation. We utilize GIS mapping, AutoCAD, Google Earth, Global Mapper, and MapSource for our work.'
    },
];

//Contact Button
var contactshow = false;
        $('#contact-button').click(function () {
            if (contactshow === true) {
                $('#contactdetails').slideUp(500);
                contactshow = false;
            } else {
                $('#contactdetails').slideDown(500);
                contactshow = true;
            }
        });

//      LISTENERS: Phone Swipe, Computer Scroll and Click
//      Debounce Function
//      Page Cycle Function

// Phone Swipe Listener
var cubeListen = $('.cube')[0];
var titleListen = $('#title')[0];
var contextListen = $('#context')[0];

var phoneListeners = [cubeListen, titleListen, contextListen];

phoneListeners.forEach(function (plistener) {
  var hammer = new Hammer(plistener);

  hammer.on('swipe', function (event) {
    if (!scrolling) {
      scrolling = true;

      if (event.direction === Hammer.DIRECTION_LEFT) {
        // Next page = Swipe left
        currentIndex = (currentIndex + 1) % pages.length;
        if (currentIndex === 0) {
          $('.cube').addClass('end');
          preSpinPrep();
        } else {
          preSpinPrep();
        }
      } else if (event.direction === Hammer.DIRECTION_RIGHT) {
        // Previous page = Swipe right
        currentIndex = (currentIndex - 1 + pages.length) % pages.length;
        if (currentIndex === 0) {
          $('.cube').addClass('end');
          preSpinPrep();
        } else {
          preSpinPrep();
        }
      }

      setTimeout(() => {
        scrolling = false;
      }, 5000);
    }
  });
});


//Computer Scroll and Click Listener
function setupInputListener(selector) {
    $(selector).on('wheel mousedown', (event) => {
        if ((event.type === 'wheel' || (event.type === 'mousedown' && event.button === 0)) && !scrolling) {
            scrolling = true;
            debouncedScroll(event);
            setTimeout(() => {
                scrolling = false;
            }, 4000);
        }
    });
}
setupInputListener('.cube');
setupInputListener('#title');
setupInputListener('#context');

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Page Cycle Function
const debouncedScroll = debounce((event) => {
    // User scrolled Up
    if (event.originalEvent.deltaY < 0) {
        currentIndex = (currentIndex - 1 + pages.length) % pages.length;
    } else if (event.originalEvent.deltaY > 0) {
        currentIndex = (currentIndex + 1) % pages.length;
    } else if (event.type === 'mousedown' && event.button === 0) {
        // User scrolled Up
        currentIndex = (currentIndex + 1) % pages.length;
    }
    if (currentIndex === 0) {
        $('.cube').addClass('end');
    }
    preSpinPrep();
}, 200);

//      Pre Spin Prepare
//      Spin

//Pre spin Prepare
function preSpinPrep() {

    //Hides Text for content change
    $('#title').fadeOut(400, function() {
        $('#title').hide();
    });
    $('#context').fadeOut(400, function() {
        $('#context').hide();
    });

    setTimeout(() => { 
        
        if (window.matchMedia("(max-width: 970px)").matches) { // phone
            if ($('.cube').hasClass('start')) {
                spin();   
            } else {// Change flat Cube back to cube
                reversePcube(function() {
                    // spin when cube is cube again
                    spin(); 
                }); 
            }
        } else { // computer
            if ($('.cube').hasClass('start')) {
                spin();   
            } else {// Change flat Cube back to cube
                reverseCcube(function() {
                    // spin when cube is cube again
                    spin(); 
                }); 
            }
        }
    }, 500);
}

//Spins the cube acordingly
function spin() {
    //Force Hides text
    $('#title').hide();
    $('#context').hide();

    if ($('.cube').hasClass('start')) {
        //Hide Logo
        setTimeout(() => {
            $('.logoName').fadeOut(400);
        }, 100);

        cube.css('animation', 'spin 1s linear infinite');
        $(".cube").removeClass("start"); 

        setTimeout(() => {
            cube.css('animation', 'none');
    
            //Timeout = space for cube to fold open
            setTimeout(() => {
                if (window.matchMedia("(max-width: 970px)").matches) {
                    // phone
                    mobileDisplay();
                } else {
                    // computer
                    computerDisplay();
                }
            }, 200);
    
            setTimeout(() => {
                $('#title').html(pages[currentIndex].title);
                $('#title').fadeIn(500);
                $('#context').html(pages[currentIndex].context);
                $('#context').fadeIn(500);
            }, 1500);
        }, 1000);

    // Check if this is the last spin
    } else if ($('.cube').hasClass('end')) {
        cube.css('animation', 'lastPageSpin 1s linear infinite');

        setTimeout(() => {
            cube.css('animation', 'none');
        }, 1000);

        setTimeout(() => {
            $('.logoName').fadeIn(800);
        }, 100);

        $(".cube").addClass("start"); 
        $(".cube").removeClass("end"); 
    } else {
        cube.css('animation', 'otherSpin 1s linear infinite');


        setTimeout(() => {
            cube.css('animation', 'none');
    
            //Timeout = space for cube to fold open
            setTimeout(() => {
                if (window.matchMedia("(max-width: 970px)").matches) {
                    // phone
                    mobileDisplay();
                } else {
                    // computer
                    computerDisplay();
                }
            }, 200);
    
            setTimeout(() => {
                $('#title').html(pages[currentIndex].title);
                $('#title').fadeIn(500);
                $('#context').html(pages[currentIndex].context);
                $('#context').fadeIn(500);
            }, 1500);
        }, 1000);
    }
}
// Folds open and close cube on Mobile screen devices:
// mobileDisplay
// reversePcube
// Folds open and close cube on Computer screen devices:
// computerDisplay
// reverseCcube

// Cube Rotation Mobile
function mobileDisplay() {
    //Stops spinning hide all
    $('.top, .right, .left, .bottom, .back').hide();
    //Change images to Blank and logo
    $('#frontImage').attr('src', './Pictures/Cube Faces/Blank.png');
    $('#topImage').attr('src', './Pictures/Cube Faces/Blank.png');
    $('#leftImage').attr('src', './Pictures/Cube Faces/Blank.png');
    $('#rightImage').attr('src', './Pictures/Cube Faces/Logo.png');
    $('#backImage').attr('src', './Pictures/Cube Faces/Blank.png');
    $('#bottomImage').attr('src', './Pictures/Cube Faces/Blank.png');

    setTimeout(() => { 
        $('.top').fadeIn(200, function() {
            $('.top').show();
            $('.left').fadeIn(200, function() {
                $('.left').show();
                $('.bottom').fadeIn(200, function() {
                    $('.bottom').show();
                    $('.right').fadeIn(200, function() {
                        $('.right').show();
                        $('.back').fadeIn(200, function() {
                            $('.back').show();
                        });
                    });
                });
            });
        }); 
    });

    // Reset shape to cube
    $(".front").css("transform", "rotateY(0deg) translateZ(2em) translateY(-0.1em)");
    $(".top").css("transform", "rotateX(180deg) rotateZ(0deg) translateY(5.2em) translateZ(-2em) translateY(-1em)");
    $(".right").css("transform", "rotateY(180deg) rotateX(180deg) rotateZ(180deg) translateZ(2em) translateX(4.1em) translateY(4em)");
    $(".left").css("transform", "rotateY(0deg) translateZ(2em) translateX(-4.1em) translateY(-0.1em)");
    $(".bottom").css("transform", "rotateX(0deg) translateZ(2em) translateY(4em)");
    $(".back").css("transform", "rotateY(0deg) rotateX(0deg) translateZ(2em) translateY(8.1em)");
}

//Reverse Cube for Computer
function reversePcube(callback) {
    setTimeout(() => {
        // Fade out and hide the back element
        $('.back').fadeOut(200, function () {
            $('.back').hide();

            // Fade out and hide the bottom element
            $('.right').fadeOut(200, function () {
                $('.right').hide();

                // Fade out and hide the right element
                $('.bottom').fadeOut(200, function () {
                    $('.bottom').hide();

                    // Fade out and hide the left element
                    $('.left').fadeOut(200, function () {
                        $('.left').hide();

                        // Fade out and hide the top element
                        $('.top').fadeOut(200, function () {
                            $('.top').hide();

                            // Reset shape to cube
                            $(".front").css("transform", "rotateY(0deg) translateZ(2em)");
                            $(".top").css("transform", "rotateX(90deg) translateZ(2em)");
                            $(".right").css("transform", "rotateY(90deg) translateZ(2em)");
                            $(".left").css("transform", "rotateY(-90deg) translateZ(2em)");
                            $(".bottom").css("transform", "rotateX(-90deg) translateZ(2em)");
                            $(".back").css("transform", "rotateY(180deg) translateZ(2em)");

                            // Reset image faces
                            $("#frontImage").attr('src', './Pictures/Cube Faces/S.png');
                            $("#topImage").attr('src', './Pictures/Cube Faces/E.png');
                            $("#rightImage").attr('src', './Pictures/Cube Faces/C.png');
                            $("#leftImage").attr('src', './Pictures/Cube Faces/C.png');
                            $("#bottomImage").attr('src', './Pictures/Cube Faces/E.png');
                            $("#backImage").attr('src', './Pictures/Cube Faces/S.png');

                            // Show the hidden elements
                            $('.top, .right, .left, .bottom, .back').show();

                            // Call the callback function when animations are complete
                            if (typeof callback === 'function') {
                                callback();
                            }
                        });
                    });
                });
            });
        });
    }, 200);
}

// Cube Rotation Computer
function computerDisplay() {
    //Stops spinning hide all
    $('.top, .right, .left, .bottom, .back').hide();
    //Change images to Blank and logo
    $('#frontImage').attr('src', './Pictures/Cube Faces/Blank.png');
    $('#topImage').attr('src', './Pictures/Cube Faces/Blank.png');
    $('#leftImage').attr('src', './Pictures/Cube Faces/Blank.png');
    $('#rightImage').attr('src', './Pictures/Cube Faces/Blank.png');
    $('#backImage').attr('src', './Pictures/Cube Faces/Logo.png');
    $('#bottomImage').attr('src', './Pictures/Cube Faces/Blank.png');


    setTimeout(() => { 
        $('.top').fadeIn(200, function() {
            $('.top').show();
            $('.left').fadeIn(200, function() {
                $('.left').show();
                $('.right').fadeIn(200, function() {
                    $('.right').show();
                    $('.bottom').fadeIn(200, function() {
                        $('.bottom').show();
                        $('.back').fadeIn(200, function() {
                            $('.back').show();
                        });
                    });
                });
            });
        }); 
    });

    // Reset shape to cube
    $(".front").css("transform", "rotateY(0deg) translateZ(2em)");
    $(".top").css("transform", "rotateX(180deg) rotateZ(0deg) translateY(4.1em) translateZ(-2em)");
    $(".right").css("transform", "rotateY(180deg) rotateX(180deg) rotateZ(180deg) translateZ(2em) translateX(4.1em)");
    $(".left").css("transform", "rotateY(0deg) translateZ(2em) translateX(-4.1em) translateY(0em)");
    $(".bottom").css("transform", "rotateX(0deg) translateZ(2em) translateX(8.2em)");
    $(".back").css("transform", "rotateY(0deg) rotateX(0deg) translateZ(2em) translateX(4.1em) translateY(4.1em)");
}

//Reverse Cube for Computer
function reverseCcube(callback) {
    setTimeout(() => {
        // Fade out and hide the back element
        $('.back').fadeOut(200, function () {
            $('.back').hide();

            // Fade out and hide the bottom element
            $('.bottom').fadeOut(200, function () {
                $('.bottom').hide();

                // Fade out and hide the right element
                $('.right').fadeOut(200, function () {
                    $('.right').hide();

                    // Fade out and hide the left element
                    $('.left').fadeOut(200, function () {
                        $('.left').hide();

                        // Fade out and hide the top element
                        $('.top').fadeOut(200, function () {
                            $('.top').hide();

                            // Reset shape to cube
                            $(".front").css("transform", "rotateY(0deg) translateZ(2em)");
                            $(".top").css("transform", "rotateX(90deg) translateZ(2em)");
                            $(".right").css("transform", "rotateY(90deg) translateZ(2em)");
                            $(".left").css("transform", "rotateY(-90deg) translateZ(2em)");
                            $(".bottom").css("transform", "rotateX(-90deg) translateZ(2em)");
                            $(".back").css("transform", "rotateY(180deg) translateZ(2em)");

                            // Reset image faces
                            $("#frontImage").attr('src', './Pictures/Cube Faces/S.png');
                            $("#topImage").attr('src', './Pictures/Cube Faces/E.png');
                            $("#rightImage").attr('src', './Pictures/Cube Faces/C.png');
                            $("#leftImage").attr('src', './Pictures/Cube Faces/C.png');
                            $("#bottomImage").attr('src', './Pictures/Cube Faces/E.png');
                            $("#backImage").attr('src', './Pictures/Cube Faces/S.png');

                            // Show the hidden elements
                            $('.top, .right, .left, .bottom, .back').show();

                            // Call the callback function when animations are complete
                            if (typeof callback === 'function') {
                                callback();
                            }
                        });
                    });
                });
            });
        });
    }, 200);
}