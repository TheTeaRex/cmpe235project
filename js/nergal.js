function getNotes() {
    var xhttp = new XMLHttpRequest();
    var str = "--- Starting of Notes ---";
    var count = 0;
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var json = JSON.parse(xhttp.responseText);

            for (var i = 0; i < json.length; i++) {
                if (json[i].className == document.getElementById('selectclassselectN').value) {
                    count++;
                    document.getElementById('editclassN').style.display = 'block';
                    //document.getElementById('selectclassnameN').value = json[i].className;
                    var compChildren = document.getElementById('editComponents').children;
                    //tag = compChildren[0].getElementsByTagName('input');

                    var classname = json[i].className;
                    var note = json[i].note;
                    //str += classname + "\n"+ note + "\n";
                    str += "\n"+ count + ". " + note + "\n";
		    str += "-----";
                                        
                }//if
            }//for
            str += "\n--- End of Notes ---";
            document.getElementById("savedNotes").innerHTML = str;
        }//if
    }

    xhttp.open('GET', 'http://thenergal.com/202project/getNotes.php', true);
    xhttp.send();

}



function submitFormNote(obj) {
    if (obj.value != '') {
        return noteValidation("notetext")
    } 

    return false;
}



function loadClassesToSelectNEW() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var json = JSON.parse(xhttp.responseText);
            if (json.length == 0) {
                document.getElementById('selectclassdivN').style.display = 'none';
                document.getElementById('noclassdiv').style.display = 'block';
            } else {
                document.getElementById('selectclassdivN').style.display = 'block';
                document.getElementById('noclassdivN').style.display = 'none';
                for (var i = 0; i < json.length; i++) {
                    var opt = document.createElement('option');
                    opt.text = json[i].className;
                    document.getElementById('selectclassselectN').add(opt);
                    //$('<option>').val(json[i].className).text(json[i].className).appendTo('#selectclassselectN');
                }
                $('#selectclassselectN').selectmenu('refresh', true);
            }
        }
    }

    xhttp.open('GET', 'http://tearexprojects.com/project/getClassesSorted.php', true);
    xhttp.send();
}



function loadClassInfoNEW() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var json = JSON.parse(xhttp.responseText);

            while (document.getElementById('editComponents').children.length > 1) {
               document.getElementById('editComponents').removeChild(document.getElementById('editComponents').children[1]);
            }

            for (var i = 0; i < json.length; i++) {
                if (json[i].className == document.getElementById('selectclassselectN').value) {
                    document.getElementById('editclassN').style.display = 'block';
                    document.getElementById('getmynote').style.display = 'block';   
                    break;
                }
            }
            getNotes();
        }
    }

    xhttp.open('GET', 'http://tearexprojects.com/project/getClassesSorted.php', true);
    xhttp.send();
}


$(document).on('pageinit', '#notes', function(){
    loadClassesToSelectNEW();
});



function noteValidation(noteinput) {
    // checking if the classname is provided
    if(document.getElementById('selectclassnameN').value.trim() == '') {
    //if(noteinput.trim() == '') { 
        alert('Please enter a note');
        return false;
    }
    return true;
   // document.getElementById('selectcl
}




  $(document).on('click','#insertnote',function(e) {
  var data = $("#addnote_form").serialize();
  if(noteValidation(data)) {
  alert("Note was successfully saved");

    $.ajax({
      data: data,
      type: "post",
      url: "http://thenergal.com/202project/insertNote.php",
      success: function(data){
        document.location.href = 'prof_menu.html#notes';

      }
  });

  }//if

  //navigate back to notes page
  else {
    loadNotesAgain();
  }
});


function loadNotesAgain() {  
  $.ajax({
    type: "get",
    url: "prof_menu.html#notes",
    success: function() {
    }
  });

}



