// YOUR CODE HERE:
const app = {
  server: 'https://api.parse.com/1/classes/messages',
  // username: 
  init: () => {
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
      url: 'https://api.parse.com/1/classes/messages?order=-createdAt',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message received');
        app.renderMessage(data['results']);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  clearMessages: () => {
    $('#chats').children().remove();
    $('.Username').children().remove();
  },
  renderMessage: (messages) => {
    if (Array.isArray(messages)) {
      messages = _.uniq(messages);
      for ( let message of messages) {
        let $node = $(`<div>${message.username}: ${app.escapeHtml(message.text)}</div>`);
        $('#chats').append($node);
        let $button = $(`<button class=username>${message.username}</button>`);
        $('.Username').append($button); 
      }
    } else {
      let $node = $(`<div>${message.username}: ${message.text}</div>`);
      $('#chats').append($node);
      let $button = $(`<button class=username>${message.username}</button>`);
      $('.Username').append($button); 
    }
  },
  renderRoom: (name) => {
    $('#roomSelect').append(`<div>${name}</div>`);
  },
  handleUsernameClick: () => {
  },
  handleSubmit: () => {
  },
  escapeHtml: (unsafe) => {
    if (!unsafe) {
      return unsafe;
    }
    return unsafe
     .replace('>', "&amp;")
     .replace('<', "&lt;")
     .replace('&', "&gt;")
     .replace('"', "&quot;")
     .replace("'", "&#039;");
  }
};
