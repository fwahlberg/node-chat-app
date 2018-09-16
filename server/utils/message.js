class Message {
  constructor(from = '', data = null, location = false) {
    if (!location) {
      return {
        from,
        data,
        createdAt: new Date().getTime()
      }
    } else {
      return {
        from,
        url: `https://maps.google.com?q=${data.latitude},${data.longitude}`,
        createdAt: new Date().getTime()
      }
    }
  }
}

module.exports = Message;
