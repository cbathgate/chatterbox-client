$(document).ready(function() {
  $('#main').on('click', function(event) {
    app.handleUsernameClick();
  });
  $('#main').on('submit', function(event) {
    console.log('submitted');
    app.handleSubmit();
    return false;
  });
});