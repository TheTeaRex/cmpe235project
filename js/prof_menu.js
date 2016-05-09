function addComponent(idInput) {
    var components = document.getElementById(idInput);
    var size = components.children.length;
    if (size >= 10) {
        alert('Sorry, you can only have maximum 10 components for your class.');
        return;
    }
    var str = "<div class='ui-grid-c'>";
    str += "<div class='ui-block-a main'><input type='text' name='component' id='component' placeholder='Component'></div>";
    str += "<div class='ui-block-b point'><input type='number' name='point' id='point' placeholder='Max Point'></div>";
    str += "<div class='ui-block-c per'><input type='number' name='percentage' id='percentage' placeholder='Percentage'></div>";
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

    return true;
}

$(document).ready( function(){
    $('#addclass_form').submit( function(event) {
        if ( !formValidation('classname', 'components', 'compSize')) {
            event.preventDefault();
        } else {
            event.preventDefault();
            var datastr = $('#addclass_form').serialize();
            console.log(datastr);
            $.ajax({
                type: 'POST',
                url: 'http://tearexprojects.com/project/addclass_confirmation.php',
                data: datastr,
                success: function(data) {
                    var result = $.parseJSON(data);
                    if (result.status == 'success') {
                        alert('Entry has been added successfully');
                        document.location.href = 'prof_menu.html';
                    } else if (result.status == 'dup') {
                        alert('Entry cannot be added due to duplication');
                    } else {
                        alert('Uhoh! We hit and error and cannot add the entry');
                    }
                    console.log(result);
                },
                error: function() {
                    alert('php error');
                }
            });
        }
    });

    $('#deleteClass').click (function(event) {
        var datastr = $('#selectclass_form').serialize() + '&action=Delete+Class';
        console.log(datastr);
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://tearexprojects.com/project/updateClass_confirmation.php',
            data: datastr,
            success: function(data) {
                var result = $.parseJSON(data);
                if (result.status == 'success') {
                    alert('Entry has been deleted');
                    document.location.href = 'prof_menu.html';
                } else {
                    alert('Uhoh! We hit and error and cannot delete the entry');
                }
                console.log(result);
            },
            error: function() {
                alert('php error');
            }
        });
    });

    $('#updateClass').click (function(event) {
        if (!formValidation("selectclassname", "editComponents", "selectcompSize")) {
            event.preventDefault();
        } else {
            var datastr = $('#selectclass_form').serialize() + '&action=Submit';
            console.log(datastr);
            event.preventDefault();
            $.ajax({
                type: 'POST',
                url: 'http://tearexprojects.com/project/updateClass_confirmation.php',
                data: datastr,
                success: function(data) {
                    var result = $.parseJSON(data);
                    if (result.status == 'success') {
                        alert('Entry has been updated');
                        document.location.href = 'prof_menu.html';
                    } else {
                        alert('Uhoh! We hit and error and cannot update the entry');
                    }
                    console.log(result);
                },
                error: function() {
                    alert('php error');
                }
            });
        }
    });

    $('#setgrade_form').submit (function(event) {
        if ( !previewgrades(true)) {
            event.preventDefault();
        } else {
            event.preventDefault();
            var datastr = $('#setgrade_form').serialize();
            console.log(datastr);
            $.ajax({
                type: 'POST',
                url: 'http://tearexprojects.com/project/saveGrades_confirmation.php',
                data: datastr,
                success: function(data) {
                    var result = $.parseJSON(data);
                    if (result.status == 'success') {
                        alert('Entry has been updated successfully');
                        document.location.href = 'prof_menu.html';
                    } else {
                        alert('Uhoh! We hit and error and cannot update the entry');
                    }
                    console.log(result);
                },
                error: function() {
                    alert('php error');
                }
            });
        }
    });
});

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

    xhttp.open('GET', 'http://tearexprojects.com/project/getClasses.php', true);
    xhttp.send();
}

function loadClassesToSelectGrade() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var json = JSON.parse(xhttp.responseText);
            if (json.length == 0) {
                document.getElementById('selectclassdiv1').style.display = 'none';
                document.getElementById('noclassdiv1').style.display = 'block';
            } else {
                document.getElementById('selectclassdiv1').style.display = 'block';
                document.getElementById('noclassdiv1').style.display = 'none';
                for (var i = 0; i < json.length; i++) {
                    var opt = document.createElement('option');
                    opt.text = json[i].className;
                    document.getElementById('gradesclassselect').add(opt);
                    //$('<option>').val(json[i].className).text(json[i].className).appendTo('#selectclassselect');
                }
                $('#gradesclassselect').selectmenu('refresh', true);
            }
        }
    }

    xhttp.open('GET', 'http://tearexprojects.com/project/getClasses.php', true);
    xhttp.send();
}

function loadClassesToSetGrade() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var json = JSON.parse(xhttp.responseText);
            if (json.length == 0) {
                document.getElementById('selectclassdiv2').style.display = 'none';
                document.getElementById('noclassdiv2').style.display = 'block';
            } else {
                document.getElementById('selectclassdiv2').style.display = 'block';
                document.getElementById('noclassdiv2').style.display = 'none';
                for (var i = 0; i < json.length; i++) {
                    var opt = document.createElement('option');
                    opt.text = json[i].className;
                    document.getElementById('studentclassselect').add(opt);
                    //$('<option>').val(json[i].className).text(json[i].className).appendTo('#selectclassselect');
                }
                $('#studentclassselect').selectmenu('refresh', true);
            }
        }
    }

    xhttp.open('GET', 'http://tearexprojects.com/project/getClasses.php', true);
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
                        str += "<div class='ui-block-b point'><input type='number' name='point' id='point' placeholder='Max Point'></div>";
                        str += "<div class='ui-block-c per'><input type='number' name='percentage' id='percentage' placeholder='Percentage'></div>";
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

    xhttp.open('GET', 'http://tearexprojects.com/project/getClasses.php', true);
    xhttp.send();
}

function loadClassGrade() {
    var xhttp = new XMLHttpRequest();
    var max = 100;
    var min = 0;

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var json = JSON.parse(xhttp.responseText);

            for (var i = 0; i < json.length; i++) {
                if (json[i].className == document.getElementById('gradesclassselect').value) {
                    document.getElementById('editclassgrades').style.display = 'block';
                    document.getElementById('amax').value = max;
                    document.getElementById('amin').value = json[i].A;
                    document.getElementById('bmax').value = json[i].A - 1;
                    document.getElementById('bmin').value = json[i].B;
                    document.getElementById('cmax').value = json[i].B - 1;
                    document.getElementById('cmin').value = json[i].C;
                    document.getElementById('dmax').value = json[i].C - 1;
                    document.getElementById('dmin').value = json[i].D;
                    document.getElementById('fmax').value = json[i].D - 1;
                    document.getElementById('fmin').value = min;
                    break;
                }
            }
        }
    }

    xhttp.open('GET', 'http://tearexprojects.com/project/getClasses.php', true);
    xhttp.send();
}

function loadSampleStudentInfo() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var json = JSON.parse(xhttp.responseText);

			console.log(json);
			document.getElementById('samplelastname').innerHTML = json.lastname;
			document.getElementById('samplefirstname').innerHTML = json.firstname;
			document.getElementById('sampleemail').innerHTML = json.email;
			document.getElementById('samplesid').innerHTML = json.sid;
        }
    }

    xhttp.open('GET', 'http://tearexprojects.com/project/ajaxSampleStudent.php', true);
    xhttp.send();
}

function loadClassConfigForSample() {
    var xhttp = new XMLHttpRequest();
    var maxComp = 10;

    var str = "<div><b>{itemstr}:</b><b style='float:right' name='{perstr}' id='{perstr}'></b></div>";
    str += "<input type='range' name='{namestr}' id='{namestr}' min='0' max='{max}' value='{value}' onChange='updateGrade()'/>";

    var str1 = "<input type='hidden' name='studentacutoff' id='studentacutoff'>"
    str1 += "<input type='hidden' name='studentbcutoff' id='studentbcutoff'>"
    str1 += "<input type='hidden' name='studentccutoff' id='studentccutoff'>"
    str1 += "<input type='hidden' name='studentdcutoff' id='studentdcutoff'>"
    str1 += "<input type='hidden' name='studentcompsize' id='studentcompsize'>"
    str1 += "<br><div><b name='currentscore' id='currentscore'>Student's Final Score: TBD</b></div>"
    str1 += "<br><div><b name='currentgrade' id='currentgrade'>Student's Final Grade: TBD</b></div>"

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var json = JSON.parse(xhttp.responseText);

            while (document.getElementById('samplegrades').children.length > 1) {
               document.getElementById('samplegrades').removeChild(document.getElementById('samplegrades').children[1]);
            }

            for (var i = 0; i < json.length; i++) {
                if (json[i].className == document.getElementById('studentclassselect').value) {
                    document.getElementById('samplegrades').style.display = 'block';
                    for (var j = 0; j < maxComp; j++) {
                        var itemstr = json[i]['comp' + j];
                        var namestr = 'item' + j;
                        var point = 'mpoint' + j;
                        var per = 'itemper' + j;
                        if (itemstr ==  null) break;
                        var tempstr = str.replace(/{itemstr}/g, itemstr).replace(/{namestr}/g, namestr);
                        tempstr = tempstr.replace('{max}', json[i][point]).replace('{value}', json[i][point]/2);
                        tempstr = tempstr.replace(/{perstr}/g, per);
                        $('#samplegrades').append(tempstr).trigger('create');
                        document.getElementById(per).innerHTML = json[i]['percentage' + j] + ' %';
                    }
                    $('#samplegrades').append(str1).trigger('create');
                    document.getElementById('studentacutoff').value = json[i].A;
                    document.getElementById('studentbcutoff').value = json[i].B;
                    document.getElementById('studentccutoff').value = json[i].C;
                    document.getElementById('studentdcutoff').value = json[i].D;
                    document.getElementById('studentcompsize').value = j;
                    break;
                }
            }
        }
    }

    xhttp.open('GET', 'http://tearexprojects.com/project/getClasses.php', true);
    xhttp.send();
}

// load the classes when going to the selectclass id
$(document).on('pageinit', '#selectaclass', function(){
    loadClassesToSelect();
});
$(document).on('pageinit', '#gradescutoff', function(){
    loadClassesToSelectGrade();
});
$(document).on('pageinit', '#samplestudentgrade', function(){
    loadClassesToSetGrade();
});
$(document).on('pageinit', '#samplestudentinfo', function(){
    loadSampleStudentInfo();
});

function deleteClass() {
    var classname = document.getElementById('selectclassname').value;
    return confirm('Are you sure you want to delete ' + classname + '?');
}

function previewgrades(alertOn) {
    $('#amin').removeClass('invalid');
    $('#bmin').removeClass('invalid');
    $('#cmin').removeClass('invalid');
    $('#dmin').removeClass('invalid');
    var amin = document.getElementById('amin').value.trim()
    var bmin = document.getElementById('bmin').value.trim()
    var cmin = document.getElementById('cmin').value.trim()
    var dmin = document.getElementById('dmin').value.trim()

    var intError = false;
    if (isNaN(amin)) {
        $('#amin').addClass('invalid');
        intError = true;
    }
    if (isNaN(bmin)) {
        $('#bmin').addClass('invalid');
        intError = true;
    }
    if (isNaN(cmin)) {
        $('#cmin').addClass('invalid');
        intError = true;
    }
    if (isNaN(dmin)) {
        $('#dmin').addClass('invalid');
        intError = true;
    }
    if (intError) {
        if (alertOn)
            alert('Please make sure all inputs are integers');
        return false;
    }

    var emptyError = false;
    if (amin == '') {
        $('#amin').addClass('invalid');
        emptyError = true;
    }
    if (bmin == '') {
        $('#bmin').addClass('invalid');
        emptyError = true;
    }
    if (cmin == '') {
        $('#cmin').addClass('invalid');
        emptyError = true;
    }
    if (dmin == '') {
        $('#dmin').addClass('invalid');
        emptyError = true;
    }
    if (emptyError) {
        if (alertOn)
            alert('Please make sure all the fields have inputs');
        return false;
    }

    amin = parseInt(amin);
    bmin = parseInt(bmin);
    cmin = parseInt(cmin);
    dmin = parseInt(dmin);
    var alertstr = '';

    if (amin <= bmin) {
        alertstr += 'A Min needs to be larger than B Min.\n';
        $('#amin').addClass('invalid');
        $('#bmin').addClass('invalid');
    }
    if (bmin <= cmin) {
        alertstr += 'B Min needs to be larger than C Min.\n';
        $('#bmin').addClass('invalid');
        $('#cmin').addClass('invalid');
    }
    if (cmin <= dmin) {
        alertstr += 'C Min needs to be larger than D Min.\n';
        $('#cmin').addClass('invalid');
        $('#dmin').addClass('invalid');
    }
    if (amin >= 100) {
        alertstr += 'A Min needs to be smaller than 100.\n';
        $('#amin').addClass('invalid');
    }
    if (dmin <= 0) {
        alertstr += 'D Min needs to be larger than 0.\n';
        $('#dmin').addClass('invalid');
    }

    if (alertstr != '') {
        if (alertOn)
            alert(alertstr);
        return false;
    }

    document.getElementById('bmax').value = amin - 1;
    document.getElementById('cmax').value = bmin - 1;
    document.getElementById('dmax').value = cmin - 1;
    document.getElementById('fmax').value = dmin - 1;

    return true;
}

function setDefaultGrades(){
    $('#amin').removeClass('invalid');
    $('#bmin').removeClass('invalid');
    $('#cmin').removeClass('invalid');
    $('#dmin').removeClass('invalid');
    document.getElementById('amin').value = 90;
    document.getElementById('bmin').value = 80;
    document.getElementById('cmin').value = 70;
    document.getElementById('dmin').value = 60;
}

function updateGrade() {
    var acutoff = parseInt(document.getElementById('studentacutoff').value);
    var bcutoff = parseInt(document.getElementById('studentbcutoff').value);
    var ccutoff = parseInt(document.getElementById('studentccutoff').value);
    var dcutoff = parseInt(document.getElementById('studentdcutoff').value);

    var totalscore = 0;
    for (var i = 0; i < parseInt(document.getElementById('studentcompsize').value); i++) {
        item = 'item' + i;
        per = 'itemper' + i;
        var score = parseInt(document.getElementById(item).value);
        score = score / parseInt(document.getElementById(item).max);
        percentage = document.getElementById(per).innerHTML.replace(' %','');
        score *=  parseInt(percentage);
        totalscore += score;
    }

    document.getElementById('currentscore').innerHTML = "Student's Final Score: " + parseFloat(totalscore).toFixed(1) + "%";

    if ( acutoff <= totalscore && totalscore <= 100)
        document.getElementById('currentgrade').innerHTML = "Student's Final Grade: A";
    else if ( bcutoff <= totalscore && totalscore < acutoff)
        document.getElementById('currentgrade').innerHTML = "Student's Final Grade: B";
    else if ( ccutoff <= totalscore && totalscore < bcutoff)
        document.getElementById('currentgrade').innerHTML = "Student's Final Grade: C";
    else if ( dcutoff <= totalscore && totalscore < ccutoff)
        document.getElementById('currentgrade').innerHTML = "Student's Final Grade: D";
    else
        document.getElementById('currentgrade').innerHTML = "Student's Final Grade: F";
}
