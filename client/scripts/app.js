// YOUR CODE HERE:
const app = {
  server: 'https://api.parse.com/1/classes/messages',
  init: () => {
    app.clearMessages();
  },
  send: (message) => {
    $.ajax({
      url: 'https://api.parse.com/1/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: () => {
    $.ajax({
      url: 'https://api.parse.com/1/classes/messages',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message received');
        console.log(data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  clearMessages: () => {
    $('#chats').children().remove();
  },
  renderMessage: (message) => {
    let $node = $(`<div>${message.username}: ${message.text}</div>`);
    $('#chats').append($node);
    let $button = $(`<button class=username>${message.username}</button>`);
    $('#main').append($button);
  },
  renderRoom: (name) => {
    $('#roomSelect').append(`<div>${name}</div>`);
  },
  handleUsernameClick: () => {
  },
  handleSubmit: () => {
    let message = {
      username: 'peaceful moon goddess',
      text: message,
      roomname: 'lobby'
    };
  }
};
