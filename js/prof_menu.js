$(function() {
    var components = $('#components');
    var i = $('#components #block').size() + 1;

    console.log(i);

    $('#addclass_form').on('click', '#addComponent', function() {
        $(components).append("<div class='ui-grid-b'><div id='block' class='ui-block-a big'><input type='text' name='component[]' id='item" + i + "' placeholder='Component'></div><div class='ui-block-b mid'><input type='text' name='percentage[]' id='percentage' placeholder='Percentage'></div><div class='ui-block-c sma'><button type='button' id='rmComp' class='ui-btn ui-icon-delete ui-shadow ui-corner-all ui-btn-icon-notext'></button></div></div>").trigger('create');
        i++;
        return false;
    });

    $('#addclass_form').on('click', '#rmComp', function() {
        $(this).parent('div').parent('div').remove();
        i--;
        return false;
    });
});
