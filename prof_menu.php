<!doctype html>
<html>
  <head>
    <title>Forms with jQuery Mobile</title>
    <link rel='stylesheet' href='/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.css' />
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
        <a href='#editaclass' class='ui-btn ui-shadow ui-corner-all'>Edit a Class</a>
        <a href='#editstudentscore' class='ui-btn ui-shadow ui-corner-all'>Edit a Student's Score</a>
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
        <form name='addclass_form' method ='post' action='backend.php'>
          <label>
            Class Name:
            <input type='text' name='classname' id='classname' placeholder='Enter Class Name Here'>
          </label>
          <label>
            <button type='button' class='ui-btn ui-shadow ui-corner-all'>Add another item</button> 
          </label>
          <br>
          <label>
            <input type='submit' class='ui-btn ui-btn-b ui-shadow ui-corner-all' value='Create Class'> 
          </label>
        </form>
      </div>

    </div>
    <!-- end of the add a class -->
  </body>
</html>

