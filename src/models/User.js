const { response } = require('express');
const { use } = require('passport');

const {getJSON, saveJSON} = require('../utils/fileHelpers');

class User {
  constructor() {
    this.saveData = saveJSON;
    this.fetchData = getJSON;
  }   

  async create(user) {
    // fetch the users - fetch('../data/users.json')
    // append the user to all the users
    // save the users
    // return the saved user
    const data = getJSON();
    //const user_id = user.googleId;
    //let found_user = data.users.find(({googleId}) => googleId === user_id);
    /*if(found_user == undefined){
      data.users.push(user);
      saveJSON(data);
      return user;
    }*/
    data.users.push(user);
    saveJSON(data);
    return user;

  }
  
  async find(id) {
    // fetch the users
    // found the users
    //   if found return the user
    //   if not found return Promise.reject(new Error(`User with id ${id} not found`));
    const data = getJSON();
    let user = data.users.find(({googleId}) => googleId === id);
    if (user != undefined){
      return user;
    }
    else{
      return Promise.reject(new Error(`User with id ${id} not found`));
    }
  }

  
};

module.exports = new User();