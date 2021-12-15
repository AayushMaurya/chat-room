// this class will handel the information of all the users connected to the server
// and it's methods will help to use or change the user data

// formate of user data
// [{
//     id: 'userId',
//     name: 'userName',
//     room: 'Room user joined'
// }]

//details of all users
class Users {
    // creating new users list
    constructor(){
        this.users = [];
    }

    addUser(id, name, room)
    {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    // getting list of users of particular room
    getUserList (room){
        let users = this.users.filter((user) => user.room === room);        // filttering users with given name

        let namesArray = users.map((user) => user.name);        // storing only names of the users filtered

        return namesArray;
    }

    // getting user info by it's id
    getUser (id) {
        let userList = this.users.filter((user) => user.id === id);

        return userList[0];
    }

    // removing a user
    removeUser (id)
    {
        let user = this.getUser(id);

        if(user)
            this.users = this.users.filter((user) => user.id !== id);

        return user;
    }
}

module.exports = {Users};