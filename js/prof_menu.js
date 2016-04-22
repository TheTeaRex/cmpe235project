function form_validation(){
  // trim the front and back space
  if(typeof(String.prototype.trim) === "undefined"){
    String.prototype.trim = function() {
      return String(this).replace(/^\s+|\s+$/g, '');
    };
  }

  var inputs = new Array();
  var input_var = ['firstname', 'middlename', 'lastname', 'hphone', 'cphone',
    'address', 'gender', 'suggestion'];

  for (var i = 0; i < input_var.length; i++){
    inputs[input_var[i]] = document.getElementById(input_var[i]).value.trim();
    if (inputs[input_var[i]] == ''){
      alert('Please fill in all the fields!');
      return false;
    }
  }

  var res = inputs['hphone'].search(/^(\(\d{3}\)\s\d{3}\s\d{4}|\(\d{3}\)\s\d{3}-\d{4}|\d{10}|\d{3}\s\d{3}\s\d{4})$/);
  if ( res == -1 ){
    alert('Please provide a valid home phone number!');
    return false;
  }
  res = inputs['cphone'].search(/^(\(\d{3}\)\s\d{3}\s\d{4}|\(\d{3}\)\s\d{3}-\d{4}|\d{10}|\d{3}\s\d{3}\s\d{4})$/);
  if ( res == -1 ){
    alert('Please provide a valid cell phone number!');
    return false;
  }

  if (document.getElementById('agree').checked == false){
    alert('You will have to check the I agree box.');
    return false;
  }

}
