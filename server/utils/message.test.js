// this file will be used for testing the utils functions using mocha
// npm i expect mocha --save.dev

let expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('Generate Message', () => {
    it("should generate correct message object", ()=>{
        let from = "WDJ",
            text = "Some random test"
            message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});

describe('Generate location message', () => {
    it('Should generate correct location message object', () =>{
        let from = "Aayu",
            lat = 15,
            lng = 20
            url = `https://www.google.com/maps?q=${lat}, ${lng}`,
            message = generateLocationMessage(from, lat, lng);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
    });
});