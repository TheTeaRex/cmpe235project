function addComponent(){
    var components = document.getElementById('components');
    var i = components.children.length;
    var str = "<div class='ui-grid-c'>";
        str += "<div class='ui-block-a main'><input type='text' name='component' id='component' placeholder='Component'></div>";
        str += "<div class='ui-block-b point'><input type='text' name='point' id='point' placeholder='Max Point'></div>";
        str += "<div class='ui-block-c per'><input type='text' name='percentage' id='percentage' placeholder='Percentage'></div>";
        str += "<div class='ui-block-d rm'><button type='button' onClick='rmComponent(this)' class='ui-btn ui-icon-delete ui-shadow ui-corner-all ui-btn-icon-notext'></button></div>";
        str += "</div>";
    $(components).append(str).trigger('create');
}

function rmComponent(obj){
    document.getElementById('components').removeChild(obj.parentElement.parentElement);
}

function formValidation(){
    setCorrectName();
    // checking if the classname is provided
    if(document.getElementById('classname').value.trim() == '' ) {
        alert('Please enter a class name.');
        return false;
    }

    var compChildren = document.getElementById('components').children;
    var compSize = compChildren.length;
    var percentage = 0;
    for( var i = 0; i < compSize; i++ ){
        var temp = compChildren[i];
        if( temp.getElementsByTagName('input')[0].value.trim() == '' ||
            temp.getElementsByTagName('input')[1].value.trim() == '' ||
            temp.getElementsByTagName('input')[2].value.trim() == ''  ){
                alert('Please enter all the fields.');
                return false;
        }
        if( isNaN(temp.getElementsByTagName('input')[1].value.trim()) ||
            isNaN(temp.getElementsByTagName('input')[2].value.trim())  ){
                alert('Please make sure all the Max Point and Percentage enteries are integers');
                return false;
        }
        percentage += parseInt(temp.getElementsByTagName('input')[2].value.trim());
    }
    if(percentage != 100){
        alert('The percentage enteries do not add up to 100.');
        return false;
    }
}

function setCorrectName(){
    var compChildren = document.getElementById('components').children;
    compSize = compChildren.length;
    for( var i = 0; i < compSize ; i++ ){
        compChildren[i].getElementsByTagName('input')[0].name = 'component' + i;
        compChildren[i].getElementsByTagName('input')[1].name = 'point' + i;
        compChildren[i].getElementsByTagName('input')[2].name = 'per' + i;

        compChildren[i].getElementsByTagName('input')[0].id = 'component' + i;
        compChildren[i].getElementsByTagName('input')[1].id = 'point' + i;
        compChildren[i].getElementsByTagName('input')[2].id = 'per' + i;
    }
}
