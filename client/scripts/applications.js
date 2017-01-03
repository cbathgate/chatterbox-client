$(document).ready( () => {
  $('#main').on('click', 'button', function(event) {
    $(this).toggleClass('friend');
    let username = $(this).val();
    console.log(username);
    $('.messages').each(function(index) {
      console.log($(this).val());
      if ( $(this).hasClass(username) ) {
        console.log('hi');
        $(this).toggleClass('bold');
      }
    });
    app.handleUsernameClick();
  });
  let username = prompt('What is your name?');
  let roomname = prompt('Enter your roomname');
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
  $('#roomSelect').change( () => {
    app.room = $('#roomSelect').val();
    app.clearMessages();
    app.fetch();
  });
  app.fetch();
  setTimeout( () => {
    app.renderRoom();
  }, 1000);
  setInterval( () => {
    app.clearMessages();
    app.fetch();
  }, 10000);
});