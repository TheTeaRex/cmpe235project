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
        <a href='#gradescutoff' data-transition='pop' class='ui-btn ui-shadow ui-corner-all'>Setting for Grade Cut Off</a>
        <a href='#samplestudentgrade' data-transition='pop' class='ui-btn ui-shadow ui-corner-all'>Sample Student's Grade</a>
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
        <h1>Select a Class to Edit</h1>
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
    <!-- end of the select a class -->


    <!-- setting grade cutoff -->
    <div data-role='page' id='gradescutoff'>
      <div data-role='header'>
        <a href='#menu' data-transition='slide' data-icon='back'>Back</a>
        <h1>Grades Cutoff</h1>
      </div>

      <div data-role='content'>
        <!-- if there a class to select -->
        <div name='selectclassdiv1' id='selectclassdiv1' align='center' style='display:none'>
          <form name='setgrade_form' id='setgrade_form' method ='post' action='saveGrades_confirmation.php'>
            <div align='center'>
              <b>Select a Class</b>
              <select name='gradesclassselect' id='gradesclassselect' data-native-menu='false' onChange='loadClassGrade()'>
                <option value="choose_one" data-placeholder="true">Choose one...</option>
              </select>
            </div>
            <div name='editclassgrades' id='editclassgrades' style='display:none'>
              <div class='ui-grid-b'>
                <div class='ui-block-a' align='center'><b>Min</b></div>
                <div class='ui-block-b' align='center'><b>Max</b></div>
                <div class='ui-block-c' align='center'><b>Grade</b></div>
              </div>
              <div id='adiv'>
                <div class='ui-grid-b'>
                  <div class='ui-block-a'><input type='text' style='text-align:center' name='amin' id='amin' onChange='previewgrades(false)'></div>
                  <div class='ui-block-b'><input type='text' style='text-align:center' name='amax' id='amax' disabled></div>
                  <div class='ui-block-c'><input type='text' style='text-align:center' value='A' disabled></div>
                </div>
              </div>
              <div id='bdiv'>
                <div class='ui-grid-b'>
                  <div class='ui-block-a'><input type='text' style='text-align:center' name='bmin' id='bmin' onChange='previewgrades(false)'></div>
                  <div class='ui-block-b'><input type='text' style='text-align:center' name='bmax' id='bmax' disabled></div>
                  <div class='ui-block-c'><input type='text' style='text-align:center' value='B' disabled></div>
                </div>
              </div>
              <div id='cdiv'>
                <div class='ui-grid-b'>
                  <div class='ui-block-a'><input type='text' style='text-align:center' name='cmin' id='cmin' onChange='previewgrades(false)'></div>
                  <div class='ui-block-b'><input type='text' style='text-align:center' name='cmax' id='cmax' disabled></div>
                  <div class='ui-block-c'><input type='text' style='text-align:center' value='C' disabled></div>
                </div>
              </div>
              <div id='ddiv'>
                <div class='ui-grid-b'>
                  <div class='ui-block-a'><input type='text' style='text-align:center' name='dmin' id='dmin' onChange='previewgrades(false)'></div>
                  <div class='ui-block-b'><input type='text' style='text-align:center' name='dmax' id='dmax' disabled></div>
                  <div class='ui-block-c'><input type='text' style='text-align:center' value='D' disabled></div>
                </div>
              </div>
              <div id='fdiv'>
                <div class='ui-grid-b'>
                  <div class='ui-block-a'><input type='text' style='text-align:center' name='fmin' id='fmin' disabled></div>
                  <div class='ui-block-b'><input type='text' style='text-align:center' name='fmax' id='fmax' disabled></div>
                  <div class='ui-block-c'><input type='text' style='text-align:center' value='F' disabled></div>
                </div>
              </div>
              <br>

              <div>
                <a href='#' onClick='setDefaultGrades()' class='ui-btn ui-shadow ui-corner-all'>Default Configuration</a>
              </div>
              <input type='submit' class='ui-btn ui-btn-b ui-shadow ui-corner-all' onClick='return previewgrades(true)' value='Save'>
            </div>
          </form>
        </div>

        <!-- no class to show -->
        <div name='noclassdiv1' id='noclassdiv1' align='center' style='display:block'>
          <p><b>
            Currently there isn't a class in the database
            <br>
            Please add one and come back!
          </b></p>
        </div>
      </div>
    </div>
    <!-- end of the setting grade cutoff -->


    <!-- sample student grade -->
    <div data-role='page' id='samplestudentgrade'>
      <div data-role='header'>
        <a href='#menu' data-transition='slide' data-icon='back'>Back</a>
        <h1>Sample Student for Grade</h1>
      </div>

      <div data-role='content'>
        <!-- if there a class to select -->
        <div name='selectclassdiv2' id='selectclassdiv2' style='display:none'>
          <div>
            <b>Select a Class</b>
            <select name='studentclassselect' id='studentclassselect' data-native-menu='false' onChange='loadClassConfigForSample()'>
              <option value="choose_one" data-placeholder="true">Choose one...</option>
            </select>
            <div name='samplegrades' id='samplegrades' style='display:none'>
            </div>
          </div>
        </div>

        <!-- no class to show -->
        <div name='noclassdiv2' id='noclassdiv2' align='center' style='display:block'>
          <p><b>
            Currently there isn't a class in the database
            <br>
            Please add one and come back!
          </b></p>
        </div>
      </div>
    </div>
    <!-- end of sample student grade -->
  </body>
</html>

