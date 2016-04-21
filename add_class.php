<!doctype html>
<html>
  <head>
    <title>Forms with jQuery Mobile</title>
    <link rel="stylesheet" href="/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.css" />
    <script src="/jquery.mobile-1.4.5/jquery.min.js"></script>
    <script src="/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.js"></script>
    <script src="js/form_check.js"></script>
  </head>
  <body>
    <section data-role="page" id="first">
      <header data-role="header">
        <h1>Form Demo</h1>
      </header>
      <article data-role="content">
        <form name="form1" method="post" onSubmit="return form_validation()"  action="backend.php">
          <label>
            First Name
            <input type="text" name="firstname" id="firstname">
          </label>
          <label>
            Middle Name
            <input type="text" name="middlename" id="middlename">
          </label>
          <label>
            Last Name
            <input type="text" name="lastname" id="lastname">
          </label>
          <label>
            Home Phone Number
            <input type="text" name="hphone" id="hphone">
          </label>
          <label>
            Cell Phone Number
            <input type="text" name="cphone" id="cphone">
          </label>
          <label>
            Address
            <input type="text" name="address" id="address">
          </label>
          <label for="gender" class="select">Gender</label>
          <select name="gender" id="gender" data-native-menu="false">
            <option id="male" value="Male">Male</option>
            <option id="female" value="Female">Female</option>
          </select>
          <label>Suggestion
          <textarea name="suggestion" id="suggestion" cols="45" rows="5"></textarea>
          </label>
          <label>
            I agree that all the information above are correct.
            <input type="checkbox" name="agree" id="agree">
          </label>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <input type="submit" value="Submit">
        </form>
      </article>
      <footer data-role="footer">
        <h1>Form Demo Footer</h1>
      </footer>
    </section>
  </body>
</html>

