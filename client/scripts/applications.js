$(document).ready(function() {
  $('#main').on('click', function(event) {
    app.handleUsernameClick();
  });
  var username = prompt('What is your name?');
  $('#main').on('submit', function(event) {
    app.handleSubmit();
    var text = $('#message').val();
    let message = {
      username: username,
      text: text,
      roomname: 'lobby'
    };
    app.send(message);
    return false;
  });
  app.fetch();
  setInterval( function() {
    app.clearMessages();
    app.fetch();
  }, 20000);
});