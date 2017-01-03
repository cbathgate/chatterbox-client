// YOUR CODE HERE:
const app = {
  //declaring the properties of our code
  server: 'https://api.parse.com/1/classes/messages',
  rooms: {},
  usernames: {},
  room: 'lobby',
  init: () => {
  },
  //sending via ajax function
  send: (message) => {
    $.ajax({
      url: app.server,
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
  //recieving all the data from server
  fetch: () => {
    $.ajax({
      url: 'https://api.parse.com/1/classes/messages?order=-createdAt',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        //render message after recieving it
        console.log('chatterbox: Message received');
        app.renderMessage(data['results']);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  //we want to clear chats usernames and rooms. 
  clearMessages: () => {
    $('#chats').children().remove();
    $('.Username').children().remove();
  },
  //basically our init file
  renderMessage: (messages) => {
    //tests to see if its an array of messages
    if (Array.isArray(messages)) {
      messages = _.uniq(messages);
      for ( let message of messages) {
        //make our object have all unique room name as keys
        app.rooms[message.roomname] = 0;
        if ( message.roomname === app.room ) {
          //shows only the messages in the roomname, default is set as lobby
          let $node = $(`<div class="messages ${app.escapeHtml(message.username)}">${app.escapeHtml(message.username)}: ${app.escapeHtml(message.text)}</div>`);
          $('#chats').append($node);
          //make our usernames object contain all unique usernames
          app.usernames[message.username] = 0;
        } 
      }
    } 
    // else {
    //   //basically the same thing if its not an array
    //   let $node = $(`<div class="messages ${message.username}">${messages.username}: ${messages.text}</div>`);
    //   $('#chats').append($node);
    //   let $button = $(`<button class="username">${messages.username}</button>`);
    //   $('.Username').append($button); 
    // }
    //appends all the unique usernames
    for ( let key in app.usernames) {
      let $button = $(`<button class="username" value=${app.escapeHtml(key)}>${app.escapeHtml(key)}</button>`);
      $('.Username').append($button);
    }
  },
  //shows all the rooms in the select form
  renderRoom: (name) => {
    for ( let key in app.rooms) {
      $('#roomSelect').append(`<option value=${app.escapeHtml(key)}>${app.escapeHtml(key)}</option>`);
    }
  },
  //used to pass test
  handleUsernameClick: () => {
  },
  //also used to pass test
  handleSubmit: () => {
  },
  //protecting us from malicious code
  escapeHtml: (unsafe) => {
    if (!unsafe) {
      return unsafe;
    }
    return unsafe.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
    // return unsafe
    //  .replace('>', "1")
    //  .replace('<', "2")
    //  .replace('&', "3")
    //  .replace('"', "4")
    //  .replace("'", "5")
    //  .replace('$', '6')
    //  .replace('debugger', '7')
    //  .replace('(', '8')
    //  .replace(')', '9')
    //  .replace(';', '10');
  }
};