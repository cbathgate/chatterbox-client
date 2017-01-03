$(document).ready( () => {
  //our click handles( should've been in init but won't work with $(this))
  //our friend button
  $('#main').on('click', 'button', function(event) {
    $(this).toggleClass('friend');
    let username = $(this).val();
    $('.messages').each(function(index) {
      if ( $(this).hasClass(username) ) {
        $(this).toggleClass('bold');
      }
    });
    app.handleUsernameClick();
  });
  let username = prompt('What is your name?');
  let roomname = prompt('Enter your roomname');
  //our send button
  $('#main').on('submit', event => {
    app.handleSubmit();
    let text = $('#message').val();
    let message = {
      username: username,
      text: text,
      roomname: roomname
    };
    app.send(message);
    return false;
  });
  //our room select button
  $('#roomSelect').change( () => {
    app.room = $('#roomSelect').val();
    app.clearMessages();
    app.fetch();
  });
  //our init(basically)
  app.fetch();
  setTimeout( function() {
    app.renderRoom();
  }, 1000);
  //set interval to refresh page
  setInterval( () => {
    app.clearMessages();
    app.fetch();
  }, 50000);
});