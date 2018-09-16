var expect = require('expect');
var Message = require('./message');


describe('Message Class', () => {
  it('Should generate the correct message object for a standard message', () => {
    var from = 'Jen';
    var text = 'Some message';
    var newMessage = new Message(from, text);
    //assert from match
    expect(typeof newMessage.createdAt).toBe('number');
    expect(newMessage).toHaveProperty('from', from);
    expect(newMessage).toHaveProperty('data', text)
    //assert text match
  })

  it('Should generate the correct message object for a location message', () => {
    var from = 'Jen';
    var data = {
      latitude: '51.5288998',
      longitude: '-1.2906368'
    };
    var url = 'https://maps.google.com?q=51.5288998,-1.2906368';
    var newMessage = new Message(from, data, true);
    //assert from match
    expect(typeof newMessage.createdAt).toBe('number');
    expect(newMessage).toHaveProperty('from', from);
    expect(newMessage).toHaveProperty('url', url)
    //assert text match
  })
});
