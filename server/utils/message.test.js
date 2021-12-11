// this file will be used for testing the utils functions using mocha
// npm i expect mocha --save.dev

let expect = require('expect');

var {generateMessage} = require('./message');

describe('Generate Message', () => {
    it("should generate correct message object", ()=>{
        let from = "WDJ",
            text = "Some random test"
            message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});