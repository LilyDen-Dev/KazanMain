$(document).ready(function () {
    toggleHideMap();
    Dropboxes();
    DropMenu();
    SendFormAll();
    InputActive();
    ShowCategories();
    feedback();
    SelectСategory();
    ShowTypeAccountPage();
    CheackFiltrs();
    SlideContent();
    Inputs();
    ShowPhone();

});

function toggleHideMap ()
{
    // кнопка скрыть карту
    $('.js-hide-map').on('click', function (e)
    {
        if ($(this).hasClass('active')) {
            $(this).parents('.js-map-place').find('.js-map-search').stop().slideUp(300, function ()
            {
                var map = $(this).parents('.js-map-place');
                map.find('.js-hide-map').removeClass('active');
                map.find('.js-hide-map').hide();

                map.find('.js-show-map').addClass('active');
                map.find('.js-show-map').show();
            });
        }
    });
    // кнопка показать карту
    $('.js-show-map').on('click', function (e) {

        if ($(this).hasClass('active')) {
            $(this).parents('.js-map-place').find('.js-map-search').stop().slideDown(300, function ()
            {
                var map = $(this).parents('.js-map-place');
                map.find('.js-show-map').removeClass('active');
                map.find('.js-show-map').hide();

                map.find('.js-hide-map').addClass('active');
                map.find('.js-hide-map').show();
            });
        }
    });
}

function Dropboxes()
{
    $('.js-dropbox').on('click', function (event) {

        $('.js-dropbox').each( function ()
        {
            if ($(this).hasClass('active')) {
                $(this).find('.js-dropbox-drop').stop().slideUp(300, function ()
                {
                    $(this).parents('.js-dropbox').removeClass('active');
                });
            }
        });

        $(this).addClass('active');
        $(this).find('.js-dropbox-drop').stop().slideDown(300);
    });


    $('.js-dropbox-drop > *').on('click', function (event) {

        event.stopPropagation();
        if (!$(this).hasClass('js-item-name'))
        {
            var drop = $(this).parents('.js-dropbox');
            var text = $(this).text();
            drop.find('input').val(text);
            drop.find('.js-arrow').addClass('remove');
            drop.find('input').addClass('active');
            $(this).parents('.js-dropbox-drop').stop().slideUp(300, function ()
            {
                $(this).parents('.js-dropbox').removeClass('active');
            });
            drop.find('input').trigger('change');
        }

    });

    $('.js-arrow').on('click', function (event)
    {
        if ($(this).hasClass('remove'))
        {
            event.stopPropagation();

            var drop = $(this).parents('.js-dropbox');
            $(this).removeClass('remove');
            drop.find('input').val('');
            drop.find('input').removeClass('active');
            drop.find('.js-dropbox-drop').stop().slideUp(300, function ()
            {
                $(this).parents('.js-dropbox').removeClass('active');
            });
            drop.find('input').trigger('change');
        }
        else
        {
            $(this).parents('.js-dropbox').addClass('active');
            $(this).find('.js-dropbox-drop').stop().slideDown(300);
        }
    });

    $('html').on('click', function (event) {
        if ($(event.target).parents('.js-dropbox').length == 0 && !$(event.target).hasClass('js-dropbox'))
        {
            $('.js-dropbox').removeClass('active');
            $('.js-dropbox-drop').stop().slideUp(300);
        }
    });
}

function DropMenu()
{
    $('.js-burger-menu').on('click', function() {

        if ($(this).hasClass('active')) {
            $(this).find('.js-menu-wrap').stop().slideUp(300, function ()
            {
                var menu = $(this).parents('.js-burger-menu');
                menu.removeClass('active');
                menu.find('.image').removeClass('close');

            });
            return;
        }

        $(this).addClass('active');
        $(this).find('.image').addClass('close');
        $(this).find('.js-menu-wrap').stop().slideDown(300, function ()
        {
            var menu = $(this).parents('.js-burger-menu');


        });
    });

    $('html').on('click', function (e) {
        if ($(e.target).parents('.js-burger-menu').length == 0 && !$(e.target).hasClass('js-burger-menu')) {
            $('.js-menu-wrap').stop().slideUp(300, function ()
            {
                var menu = $(this).parents('.js-burger-menu');
                menu.removeClass('active');
                menu.find('.image').removeClass('close');

            });
        }
    });
}

function SendFormAll()
{
    $('.js-find, .js-add').on('click', function ()
    {
        var data = Collect($('.js-search-form, .js-add-form'));
    });

}

function InputActive()
{
    $('input:visible').on("keypress keyup blur change",function (event)
    {
        if ($(this).hasClass('js-only-num'))
        {
            $(this).val($(this).val().replace(/[^0-9\s\.]/g,''));
            if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57))
            {
                event.preventDefault();
            }
        }
        var inputVal = $(this).val();
        // $(this).trigger('change');

        if ($(this).is('[type=checkbox]'))
            inputVal = Number($(this).is(':checked'));

        if (inputVal)
            $(this).addClass('active');
        else
            $(this).removeClass('active');


    });
}

function ShowCategories()
{
    $('.js-show').on('click', function ()
    {
        $('.js-list').slideToggle(400);
        if ($(this).is("[data-alt]"))
        {
            var currentText = $(this).text();
            var altText = $(this).attr('data-alt');
            $(this).text(altText);
            $(this).attr('data-alt', currentText);
        }
    });
}

function feedback()
{

    $('.js-send').on('click', function ()
    {
        if (!Validate($('.js-feedback-form')))
        {
            return;
        }
        else
        {
            Collect($('.js-feedback-form'));
        }
    });
}

function SelectСategory()
{
    $('.js-filter').on('click', function ()
    {
        var text = $(this).text();

        if($(this).hasClass('active'))
        {
            $(this).removeClass('active');
            $(this).find('.js-remove').removeClass('active');
            $(this).find('inputl').val("");
        }
        else
        {
            $(this).addClass('active');
            $(this).find('.js-remove').addClass('active');
            $(this).find('input').val(text);
        }
    });
}

function ShowTypeAccountPage()
{
    $('.js-types input[type=radio]').on('click', function ()
    {
        var types = Collect($('.js-types'));

        if ($('.js-radio-form').hasClass('active'))
        {
            $('.js-radio-form').hide();
            $('.js-radio-form').removeClass('active');
        }

        $('.js-' + types['type-deal'] + "-" + types['type-area']).slideDown(500, function ()
        {
            $('.js-' + types['type-deal'] + "-" + types['type-area']).addClass('active');
        });
    });
}

function CheackFiltrs()
{
    var count = 0;
    $('input').on('keypress change keyup', function ()
    {
        // console.log(1);
        count = $('input.active').length;
        console.log(count);
        $('.js-filters-numb').text(count);
    });
}

function SlideContent()
{
    $('.js-tab').on('click', function (event)
    {

        var name;
        var eventName = $(this).attr('name');

        console.log(eventName);

        if ($(this).hasClass('active'))
        {
            return false;
        }
        else
        {
            $('.js-content').each(function ()
            {
                if ($(this).hasClass('active'))
                {
                    $(this).stop().slideUp(500, function ()
                    {
                        $(this).removeClass('active');
                    })
                }
                $('.js-tab').removeClass('active');
            });
            name = $(this).attr('name');

            $('.js-tab').each(function ()
            {
               if ($(this).is('[name=' + eventName + ']'))
               {
                   console.log('has atr eventName');
                   $(this).addClass('active');
               }
            });

            $(this).addClass('active');
            $('.js-' + name).stop().slideDown(500, function ()
            {
                $('.js-' + name).addClass('active');
            });
        }

    })
}
function ShowPhone()
{
    $('.js-show-phone').on('click', function ()
    {
        var phoneText = "+7 (920) 815 28 28";
        $(this).hide(300);
        $(this).parents('.js-wrap').find('.js-phone-text').text(phoneText);

    })
}

