class Message {
  constructor(from, text) {
    return {
      from,
      text,
      createdAt: new Date().getTime()
    }
  }
}

module.exports = Message;
