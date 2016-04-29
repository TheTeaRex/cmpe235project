function addComponent(idInput) {
    var components = document.getElementById(idInput);
    var size = components.children.length;
    if (size >= 10) {
        alert('Sorry, you can only have maximum 10 components for your class.');
        return;
    }
    var str = "<div class='ui-grid-c'>";
    str += "<div class='ui-block-a main'><input type='text' name='component' id='component' placeholder='Component'></div>";
    str += "<div class='ui-block-b point'><input type='text' name='point' id='point' placeholder='Max Point'></div>";
    str += "<div class='ui-block-c per'><input type='text' name='percentage' id='percentage' placeholder='Percentage'></div>";
    str += "<div class='ui-block-d rm'><button type='button' onClick='rmComponent(this)' class='ui-btn ui-icon-delete ui-shadow ui-corner-all ui-btn-icon-notext'></button></div>";
    str += "</div>";
    $(components).append(str).trigger('create');
}

function rmComponent(obj) {
    obj.parentElement.parentElement.parentElement.removeChild(obj.parentElement.parentElement);
}

function formValidation(classinput, componentinput, sizeinput) {
    setCorrectName(componentinput);
    // checking if the classname is provided
    if(document.getElementById(classinput).value.trim() == '' ) {
        alert('Please enter a class name.');
        return false;
    }

    var compChildren = document.getElementById(componentinput).children;
    var compSize = compChildren.length;
    var percentage = 0;
    for (var i = 0; i < compSize; i++) {
        var temp = compChildren[i];
        if (temp.getElementsByTagName('input')[0].value.trim() == '' ||
            temp.getElementsByTagName('input')[1].value.trim() == '' ||
            temp.getElementsByTagName('input')[2].value.trim() == '' ) {
                alert('Please enter all the fields.');
                return false;
        }
        if (isNaN(temp.getElementsByTagName('input')[1].value.trim()) ||
            isNaN(temp.getElementsByTagName('input')[2].value.trim()) ) {
                alert('Please make sure all the Max Point and Percentage enteries are integers');
                return false;
        }
        percentage += parseInt(temp.getElementsByTagName('input')[2].value.trim());
    }
    if (percentage != 100) {
        alert('The percentage enteries do not add up to 100.');
        return false;
    }

    // it is ready to be sent to the back end
    document.getElementById(classinput).value = document.getElementById(classinput).value.toUpperCase();
    document.getElementById(sizeinput).value = compSize;
}

function setCorrectName(input) {
    var compChildren = document.getElementById(input).children;
    compSize = compChildren.length;
    for (var i = 0; i < compSize ; i++) {
        compChildren[i].getElementsByTagName('input')[0].name = 'component' + i;
        compChildren[i].getElementsByTagName('input')[1].name = 'point' + i;
        compChildren[i].getElementsByTagName('input')[2].name = 'per' + i;

        compChildren[i].getElementsByTagName('input')[0].id = 'component' + i;
        compChildren[i].getElementsByTagName('input')[1].id = 'point' + i;
        compChildren[i].getElementsByTagName('input')[2].id = 'per' + i;
    }
}

function loadClassesToSelect() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var json = JSON.parse(xhttp.responseText);
            if (json.length == 0) {
                document.getElementById('selectclassdiv').style.display = 'none';
                document.getElementById('noclassdiv').style.display = 'block';
            } else {
                document.getElementById('selectclassdiv').style.display = 'block';
                document.getElementById('noclassdiv').style.display = 'none';
                for (var i = 0; i < json.length; i++) {
                    var opt = document.createElement('option');
                    opt.text = json[i].className;
                    document.getElementById('selectclassselect').add(opt);
                    //$('<option>').val(json[i].className).text(json[i].className).appendTo('#selectclassselect');
                }
                $('#selectclassselect').selectmenu('refresh', true);
            }
        }
    }

    xhttp.open('GET', 'getClasses.php', true);
    xhttp.send();
}

function loadClassInfo() {
    var maxComp = 10;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var json = JSON.parse(xhttp.responseText);

            while (document.getElementById('editComponents').children.length > 1) {
               document.getElementById('editComponents').removeChild(document.getElementById('editComponents').children[1]);
            }

            for (var i = 0; i < json.length; i++) {
                if (json[i].className == document.getElementById('selectclassselect').value) {
                    document.getElementById('editclass').style.display = 'block';
                    document.getElementById('selectclassname').value = json[i].className;
                    var compChildren = document.getElementById('editComponents').children;
                    tag = compChildren[0].getElementsByTagName('input');
                    tag[0].value = json[i]['comp0'];
                    tag[1].value = json[i]['mpoint0'];
                    tag[2].value = json[i]['percentage0'];
                    for (var j = 1; j < maxComp; j++) {
                        comp = 'comp' + j;
                        point = 'mpoint' + j;
                        per = 'percentage' + j;
                        if (json[i][comp] == null) break;

                        var str = "<div class='ui-grid-c'>";
                        str += "<div class='ui-block-a main'><input type='text' name='component' id='component' placeholder='Component'></div>";
                        str += "<div class='ui-block-b point'><input type='text' name='point' id='point' placeholder='Max Point'></div>";
                        str += "<div class='ui-block-c per'><input type='text' name='percentage' id='percentage' placeholder='Percentage'></div>";
                        str += "<div class='ui-block-d rm'><button type='button' onClick='rmComponent(this)' class='ui-btn ui-icon-delete ui-shadow ui-corner-all ui-btn-icon-notext'></button></div>";
                        str += "</div>";
                        $('#editComponents').append(str).trigger('create');

                        var compChildren = document.getElementById('editComponents').children;
                        tag = compChildren[j].getElementsByTagName('input');
                        tag[0].value = json[i][comp];
                        tag[1].value = json[i][point];
                        tag[2].value = json[i][per];
                    }
                    break;
                }
            }
        }
    }

    xhttp.open('GET', 'getClasses.php', true);
    xhttp.send();
}

// load the classes when going to the selectclass id
$(document).on('pagebeforeshow', '#selectaclass', function(){
    loadClassesToSelect();
});

function deleteClass() {
    var classname = document.getElementById('selectclassname').value;
    return confirm('Are you sure you want to delete ' + classname + '?');
}

function submitForm(obj) {
    if (obj.value == 'Create Class') {
        return formValidation("classname", "components", "compSize")
    } else if (obj.value == 'Submit') {
        return formValidation("selectclassname", "editComponents", "selectcompSize")
    } else if (obj.value == 'Delete Class') {
        return deleteClass();
    }
    return false;
}
