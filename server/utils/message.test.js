var expect = require('expect');
var Message = require('./message');


describe('generateMessage', () => {
  it('Should generate the correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var newMessage = new Message(from, text);
    //assert from match
    expect(typeof newMessage.createdAt).toBe('number');
    expect(newMessage).toHaveProperty('from', from);
    expect(newMessage).toHaveProperty('text', text)
    //assert text match
  })
});
