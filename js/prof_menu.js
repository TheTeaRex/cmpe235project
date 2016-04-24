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
    setCorrectName();
}

function formValidation(){
    setCorrectName();
    // checking if the classname is provided
    if(document.getElementById('classname').value.trim() == '' ) {
        alert('Please enter a class name.');
        return false;
    }
}

function setCorrectName(){
    var components = document.getElementById('components');
    compSize = components.children.length;
    blocks = components.children;
    for( var i = 0; i < compSize ; i++){
        blocks[i].getElementsByTagName('input')[0].name = 'component' + i;
        blocks[i].getElementsByTagName('input')[1].name = 'point' + i;
        blocks[i].getElementsByTagName('input')[2].name = 'per' + i;

        blocks[i].getElementsByTagName('input')[0].id = 'component' + i;
        blocks[i].getElementsByTagName('input')[1].id = 'point' + i;
        blocks[i].getElementsByTagName('input')[2].id = 'per' + i;
    }
}
