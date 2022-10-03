$(document).ready(() => {

    $('#phone').click(() => {
        $('#call-container').css('display', 'flex');
    });

    $('#call-cancel-close, #call-container').click((e) => {
        if (e.target.id === 'call-container' || e.target.id === 'call-cancel-close') {
            $('#call-container').hide();
        }
    });

    $('#call-button > button').click(() => {
        $('.call-error').hide();

        let name = $('#nameCall');
        let phone = $('#callPhone');

        let hasError = false;

        if (!name.val()) {
            name.siblings('.call-error').show();
            name.css('border-color', 'red');
            hasError = true;
        } else if (name.val()) {
            name.css('border-color', 'rgb(160, 74, 51)');
        }
        if (!phone.val()) {
            phone.siblings('.call-error').show();
            phone.css('border-color', 'red');
            hasError = true;
        } else if (phone.val()) {
            phone.css('border-color', 'rgb(160, 74, 51)');
        }

        if (!hasError) {
            $.ajax({
                method: 'POST',
                url: 'mail.php',
                data: 'name=' + name.val() + '&phone=' + phone.val(),

                success: () => {
                    //$('#call-sent').show();
                    //$('#call-content').hide();
                },
                error: () => {
                    $('#call-sent').show();
                    $('#call-content').hide();
                    // $('#call-container').hide();
                    // alert('Ошибка заказа звонка. Свяжитесь, пожалуйста, с нами по номеру +7 965 070 8888');
                }
            })
        }
    });

    $('#products-card').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        appendArrows: $('.btns-pages'),
        prevArrow: '<button id="prev" type="button" class="btns-pages"><i class="btn-left" aria-hidden="true"></i></button>',
        nextArrow: '<button id="next" type="button" class="btns-pages"> <i class="btn-right" aria-hidden="true"></i></button>',
        appendDots: $('.new-dots'),
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 691,
                settings: {
                    slidesToShow: 0,
                    slidesToScroll: 0,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 479,
                settings: 'unslick'
            }
        ]
    });

    $('#all-review').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        appendArrows: $('.reviews-pages'),
        prevArrow: '<button id="prev" type="button" class="reviews-pages"><i class="btn-left" aria-hidden="true"></i></button>',
        nextArrow: '<button id="next" type="button" class="reviews-pages"> <i class="btn-right" aria-hidden="true"></i></button>',
        appendDots: $('.reviews-dots'),
        dotsClass:'reviews-dot',
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            //{
             //   breakpoint: 479,
              //  settings: 'unslick'
           // }
        ]
    });

    $('.action').click(function () {
        let text = $(this).attr('id');
        $("#bike option[value='" + text + "']").attr('selected', 'selected');
    });


    $('#submit').click(function () {
        $('.registration-error').hide();

        let loader = $('#loader');
        let bike = $('#bike')
        let name = $('#name');
        let phone = $('#phone-number');
        let checkbox = $('#checkbox')
        let check = $('.checkbox_label');
        let check2 = $('.checkbox_label2');
        let checkError = $('.check-error');

        let hasError = false;

        if (!bike.val()) {
            bike.siblings('.registration-error').show();
            bike.css('border-color', 'red');
            hasError = true;
        } else if (bike.val()) {
            bike.css('border-color', 'rgb(160, 74, 51)');
        }
        if (!name.val()) {
            name.siblings('.registration-error').show();
            name.css('border-color', 'red');
            hasError = true;
        } else if (name.val()) {
            name.css('border-color', 'rgb(160, 74, 51)');
        }
        if (!phone.val()) {
            phone.siblings('.registration-error').show();
            phone.css('border-color', 'red');
            hasError = true;
        } else if (phone.val()) {
            phone.css('border-color', 'rgb(160, 74, 51)');
        }
        if (!checkbox.is(':checked')) {
            check.removeClass('checkbox_label').addClass('checkbox_label2');
            checkError.show('.check-error');
            hasError = true;
        } else if (checkbox.is(':checked')) {
            check2.removeClass().addClass('checkbox_label');
            checkError.hide('.check-error');
            check.attr('checked', true);
        }

        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: 'POST',
                url: 'mail.php',
                data: {bike: bike.val(), name: name.val(), phone: phone.val(), checkbox: checkbox.is(':checked')},

                success: () => {
                    //loader.hide();
                    //$('#thanks').show();
                    // $('#registration').hide();
                },
                error: () => {
                    loader.hide();
                    $('#thanks').show();
                    $('#registration').hide();
                    // alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                }
            })
        }
    })

    $(window).resize(function () {
        if ($(window).width() <= 479) {
            var list = $('.product-card');
            var numToShow = 1; //сколько показывать элементов
            var button = $('#product-btn');
            var numInList = list.length;
            list.hide();
            if (numInList > numToShow) {
                button.show();
            }
            list.slice(0, numToShow).show();
            button.click(function () {
                var showing = list.filter(':visible').length;
                list.slice(showing - 1, showing + numToShow).fadeIn();
                var nowShowing = list.filter(':visible').length;
                if (nowShowing >= numInList) {
                    button.hide();
                }
            });
        }
    })

    new WOW({
        animateClass: 'animate__animated',
    }).init();


    $('#burger').click(() => {
        $('#header').toggleClass('menu-open');
    });

    $('#header #menu a').click(() => {
        $('#header').removeClass('menu-open');
    });

    $('#menu-cancel-close').click((e) => {
        if (e.target.id === 'menu-cancel-close') {
            $('#header').removeClass('menu-open');
        }
    });

    let arrow = $('#arrow');
    arrow.hide();

    $(window).scroll(function () {

        if ($(this).scrollTop() > 200) {
            arrow.fadeIn();
        } else {
            arrow.fadeOut();
        }
    });

    arrow.click(function () {
        $("html, body").animate({scrollTop: 0}, 600);
        return false;
    });

})
