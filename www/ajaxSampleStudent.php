<?php
  $response_array['lastname'] = 'Smith';
  $response_array['firstname'] = 'John';
  $response_array['email'] = 'john.smith001@sjsu.edu';
  $response_array['sid'] = '009421432';

  header('Content-Type: application/json');
  echo json_encode($response_array);
?>
