// YOUR CODE HERE:
const app = {
  server: 'https://api.parse.com/1/classes/messages',
  rooms: {},
  usernames: {},
  room: 'lobby',
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
        app.rooms[message.roomname] = 0;
        if ( message.roomname === app.room ) {
          let $node = $(`<div class="messages ${message.username}">${message.username}: ${app.escapeHtml(message.text)}</div>`);
          $('#chats').append($node);
          app.usernames[message.username] = 0;
        } 
      }
    } else {
      let $node = $(`<div class="messages ${message.username}">${messages.username}: ${messages.text}</div>`);
      $('#chats').append($node);
      let $button = $(`<button class="username">${messages.username}</button>`);
      $('.Username').append($button); 
    }
    for ( let key in app.usernames) {
      let $button = $(`<button class="username" value=${key}>${key}</button>`);
      $('.Username').append($button); 
    }
  },
  renderRoom: (name) => {
    for ( let key in app.rooms) {
      $('#roomSelect').append(`<option value=${key}>${key}</option>`);
    }
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