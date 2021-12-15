const expect = require("expect");

const {Users} = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: "aashish",
            room: "GOT"
        },
        {
            id: '2',
            name: "aayush",
            room: "loki"
        },
        {
            id: '3',
            name: "abhinandan",
            room: "crank"
        },
        {
            id: '4',
            name: "abhishek",
            room: "loki"
        }];
    })

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id : "laura lassan",
            name : "WDJ",
            room : "The office fans"
        };

        let reUsers = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for the loki fans', () => {
        let userList = users.getUserList('loki');

        expect(userList).toEqual(['aayush', 'abhishek']);
    });

    it('should return names for GOT fans', () => {
        let userList = users.getUserList('GOT');

        expect(userList).toEqual(['aashish']);
    });

    it('should find the user', () =>{
        let userID = '2',
            user = users.getUser(userID);

        expect(user.id).toBe(userID);
    });

    it('should not find user', () => {
        let userID = '150',
            user = users.getUser(userID);

        expect(user).toBeUndefined();
    });

    it('should remove a user', () =>{
        let userID = '1',
            user = users.removeUser(userID);

        expect(user.id).toBe(userID);
        expect(users.users.length).toBe(3);
    });

    it('should not remove a user', () => {
        let userID = '100',
            user = users.removeUser(userID);

        expect(user).toBeUndefined();
        expect(users.users.length).toBe(4);
    });
});