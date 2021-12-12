const moment = require('moment');

// will go to use moment to dsiplay time in required formate

let generateMessage = (from, text) => {
    return {
        from, 
        text,
        createdAt: new Date().getTime()
    };
};

let generateLocationMessage = (from, lat, lng) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat}, ${lng}`,
        createdAt: new Date().getTime()
    }
}

module.exports = {generateMessage, generateLocationMessage};