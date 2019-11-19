function Collect(form)
{
    var data = {};

    form.find('input:visible, textarea:visible').each(function() {
        var value = "";
        var name = $(this).attr('name');

        if (name)
        {
            if ($(this).is('[type=checkbox]'))
            {
                value = Number($(this).is(':checked'));

                if (data[name] != undefined)
                    data[name] = data[name] + "," + value;
                else
                    data[name] = value;
            }
            else if($(this).is('[type=radio]'))
            {
                if ($(this).is(':checked'))
                {
                    value = $(this).val();
                    data[name] = value;
                }
            }
            else
            {
                value = $(this).val();
                data[name] = value;
            }
        }
    });

    console.log(data);

    return data;
}

function Validate(wrap)
{
    var inputErrors = 0;
    $(wrap).find('input:visible.js-required, textarea:visible.js-required').each(function() {
        if (!$(this).val())
        {
            $(this).addClass('js-invalid');
            $(this).parents('.js-error').addClass('error');
            $(this).parents('.js-wrap').find('.js-block-error').show();

            inputErrors++;
        }
        else
        {
            if ($(this).hasClass('js-email'))
            {
                if (!EmailValidate($(this).val()))
                {
                    $(this).addClass('js-invalid');
                    $(this).parents('.js-error').addClass('error');
                    $(this).parents('.js-wrap').find('.js-block-error').show();

                    inputErrors++;
                }
            }
        }
    });

    if (inputErrors > 0)
    {
        return false;
    }
    else
    {
        $('.js-invalid').parents('.js-error').removeClass('error');
        $('.js-invalid').parents('.js-wrap').find('.js-block-error').hide();
        $('.js-invalid').removeClass('js-invalid');

        return true;
    }
}

function EmailValidate(email)
{
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(email);
};

function Inputs()
{
    $('input, textarea').on('keydown change', function() {
        $(this).parents('.js-error').removeClass('js-invalid, error');
        $(this).parents('.js-wrap').find('.js-block-error').hide();
        $(this).removeClass('js-invalid, error');

    });
}



