    //Карусель

$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
                //Создание классов для сликов
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
                //Параметры при другом расширении экрана
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: false,
                    arrows: false
                }
            }
        ]
    });

        //Табы

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
      

    function toggleSlide(item) {
        $(item).each(function(i){
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
          });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

        //Модальные окна

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');

    });

    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow')
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    //Валидация форм

    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                  },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя!",
                    minlength: jQuery.validator.format("Требуется не менее {0} символов!")
                  },
                phone: "Введите свой номер телефона!",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Ваш адрес электронной почты должен быть в формате name@domain.com!"
                }
            }
        });
    };

        //Применение переменной к блокам

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

        //Маска ввода номера на сайте
    
    $('input[name=phone]').mask("+8(999) 999-99-99");

    //Отправка писем на сайт

    $('form').submit(function(e) {
        e.preventDefault();
        if (!$(this).valid()){
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    }); 
});