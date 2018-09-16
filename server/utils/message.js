var moment = require('moment');
class Message {
  constructor(from = '', data = null, location = false) {
    if (!location) {
      return {
        from,
        data,
        createdAt: moment().valueOf()
      }
    } else {
      return {
        from,
        url: `https://maps.google.com?q=${data.latitude},${data.longitude}`,
        createdAt: moment().valueOf()
      }
    }
  }
}

module.exports = Message;
