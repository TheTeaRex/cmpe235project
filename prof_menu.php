<!doctype html>
<html>
  <head>
    <title>Welcome to Professor Menu</title>
    <link rel='stylesheet' href='/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.css' />
    <link rel='stylesheet' href='css/prof_menu.css' />
    <script src='/jquery.mobile-1.4.5/jquery.min.js'></script>
    <script src='/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.js'></script>
    <script src='js/prof_menu.js'></script>
  </head>
  <body>
    <!-- menu -->
    <div data-role='page' id='menu'>
      <div data-role='header'>
        <h1>Professor's Menu</h1>
      </div>

      <div data-role='content'>
        <a href='#addaclass' data-transition='pop' class='ui-btn ui-shadow ui-corner-all'>Add a Class</a>
        <a href='#selectaclass' data-transition='pop' class='ui-btn ui-shadow ui-corner-all'>Edit a Class</a>
        <a href='#editstudentscore' data-transition='pop' class='ui-btn ui-shadow ui-corner-all'>Edit a Student's Score</a>
      </div>

    </div>
    <!-- end of the menu -->

    <!-- add a class -->
    <div data-role='page' id='addaclass'>
      <div data-role='header'>
        <a href='#menu' data-transition='slide' data-icon='back'>Back</a>
        <h1>Add a Class</h1>
      </div>

      <div data-role='content'>
        <form name='addclass_form' id='addclass_form' method ='post' action='addclass_confirmation.php'>
          <div>
            <b>Class Name</b>
            <input type='text' name='classname' id='classname' placeholder='Enter Class Name'>
          </div>
          <div class='ui-grid-c'>
            <div class='ui-block-a main'><b>Component</b></div>
            <div class='ui-block-b point'><b>Max Point</b></div>
            <div class='ui-block-c per'><b>Percentage</b></div>
          </div>
          <div id='components'>
            <div class='ui-grid-c'>
              <div class='ui-block-a main'><input type='text' name='component0' id='component' placeholder='Component'></div>
              <div class='ui-block-b point'><input type='text' name='point0' id='point' placeholder='Max Point'></div>
              <div class='ui-block-c per'><input type='text' name='percentage0' id='percentage0' placeholder='Percentage'></div>
              <div class='ui-block-d rm'><button type='button' class='ui-btn ui-icon-delete ui-shadow ui-corner-all ui-btn-icon-notext' disabled></button></div>
            </div>
          </div>
          <div>
            <a href='#' onClick='addComponent("components")' class='ui-btn ui-shadow ui-corner-all'>Add another component</a>
          </div>
          <br>
          <input type='hidden' name='compSize' id='compSize'>
          <input type='submit' class='ui-btn ui-btn-b ui-shadow ui-corner-all' onClick='return submitForm(this)' value='Create Class'>
        </form>
      </div>
    </div>
    <!-- end of the add a class -->


    <!-- select a class -->
    <div data-role='page' id='selectaclass'>
      <div data-role='header'>
        <a href='#menu' data-transition='slide' data-icon='back'>Back</a>
        <h1>Select a Class</h1>
      </div>

      <div data-role='content'>
        <!-- if there is a class to select -->
        <div name='selectclassdiv' id='selectclassdiv' style='display:none'>
          <form name='selectclass_form' id=selectclass_form' method ='post' action='updateClass_confirmation.php'>

            <b>Select A Class:</b>
            <select name='selectclassselect' id='selectclassselect' data-native-menu='false' onChange='loadClassInfo()'>
              <option value="choose_one" data-placeholder="true">Choose one...</option>
            </select>

            <div name='editclass' id='editclass' style='display:none'>
              <div>
                <b>Class Name</b>
                <input type='text' name='selectclassname' id='selectclassname' disabled>
              </div>
              <div class='ui-grid-c'>
                <div class='ui-block-a main'><b>Component</b></div>
                <div class='ui-block-b point'><b>Max Point</b></div>
                <div class='ui-block-c per'><b>Percentage</b></div>
              </div>
              <div id='editComponents'>
                <div class='ui-grid-c'>
                  <div class='ui-block-a main'><input type='text' name='component0' id='component' placeholder='Component'></div>
                  <div class='ui-block-b point'><input type='text' name='point0' id='point' placeholder='Max Point'></div>
                  <div class='ui-block-c per'><input type='text' name='percentage0' id='percentage0' placeholder='Percentage'></div>
                  <div class='ui-block-d rm'><button type='button' class='ui-btn ui-icon-delete ui-shadow ui-corner-all ui-btn-icon-notext' disabled></button></div>
                </div>
              </div>

              <div>
                <a href='#' onClick='addComponent("editComponents")' class='ui-btn ui-shadow ui-corner-all'>Add another component</a>
              </div>
              <br>
              <input type='hidden' name='selectcompSize' id='selectcompSize'>
              <div class='ui-grid-a'>
                <div class='ui-block-a'><input type='submit' onClick='return submitForm(this)' name='action' class='ui-btn ui-btn-b ui-shadow ui-corner-all' data-icon='delete' value='Delete Class'></div>
                <div class='ui-block-b'><input type='submit' onClick='return submitForm(this)' name='action' class='ui-btn ui-btn-b ui-shadow ui-corner-all' data-icon='check' value='Submit'></div>
              </div>

            </div>

          </form>
        </div>
        <!-- if there is no class to select -->
        <div name='noclassdiv' id='noclassdiv' align='center' style='display:block'>
          <p><b>
            Currently there isn't a class in the database
            <br>
            Please add one and come back!
          </b></p>
        </div>
      </div>
    </div>
    <!-- end of the add a class -->
  </body>
</html>

