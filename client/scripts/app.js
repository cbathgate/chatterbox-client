// YOUR CODE HERE:
const app = {
  //declaring the properties of our code
  server: 'https://api.parse.com/1/classes/messages',
  rooms: {},
  usernames: {},
  room: 'lobby',
  init: () => {
    app.username = prompt('What is your name?');

    //on click handlers
    $('#main').on('submit', event => {
      app.handleSubmit();
    });
    $('#roomSelect').change( () => {
      app.handleRoomChange();
    });
    $('#main').on('click', 'button', function(event) {
      app.handleUsernameClick();
    });

    //start interval
    app.fetch();
    setInterval( () => {
      app.fetch();
    }, 50000);
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
        app.messages = data['results'];
        app.renderMessage(data['results']);
        app.renderRoom(data['results']);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  //we want to clear chats usernames and rooms. 
  clearMessages: () => {
    $('#chats').html('');
    $('.Username').html('');
  },
  //basically our init file
  renderMessage: (messages) => {
    //tests to see if its an array of messages
    app.clearMessages();
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
    } else {
      //basically the same thing if its not an array
      let $node = $(`<div class="messages ${message.username}">${messages.username}: ${messages.text}</div>`);
      $('#chats').append($node);
      let $button = $(`<button class="username">${messages.username}</button>`);
      $('.Username').append($button); 
    }
    // appends all the unique usernames
    for ( let key in app.usernames) {
      let $button = $(`<button class="username" value=${app.escapeHtml(key)}>${app.escapeHtml(key)}</button>`);
      $('.Username').append($button);
    }
  },
  //shows all the rooms in the select form
  renderRoom: (name) => {
    $('#roomSelect').html('<option value="__newRoom">New room...</option>');
    for ( let key in app.rooms) {
      $('#roomSelect').val(key);
      var $option = $('<option/>').val(key).text(key);
      $('#roomSelect').append($option);
      // $('#roomSelect').append(`<option value=${app.escapeHtml(key)}>${app.escapeHtml(key)}</option>`);
    }
  },
  //used to pass test
  handleUsernameClick: () => {
    $(event.target).toggleClass('friend');
    let username = $(event.target).val();
    $('.messages').each(function(index) {
      if ( $(this).hasClass(username) ) {
        $(this).toggleClass('bold');
      }
    });
  },
  //also used to pass test
  handleSubmit: () => {
    let text = $('#message').val();
    let message = {
      username: app.username,
      text: text,
      roomname: app.roomname
    };
    app.send(message);
    event.preventDefault();
  },
  //handle room change
  handleRoomChange: () => {
    app.room = $('#roomSelect').val();
    let selectIndex = $('#roomSelect').prop('selectedIndex');
    if (selectIndex === 0) {
      var roomname = prompt('Enter room name');
      if (roomname) {
        app.room = roomname;
        app.renderRoom(roomname);
        $('#roomSelect').val(roomname);
      }
    }
    app.renderMessage(app.messages);
  },
  //protecting us from malicious code
  escapeHtml: (unsafe) => {
    if (!unsafe) {
      return unsafe;
    }
    return unsafe.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  }
};