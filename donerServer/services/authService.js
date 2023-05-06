const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = '1jop43JP"or;iwaeh4213-o';

async function register(email, username, password){
    const isUsernametaken = await User.findOne({username}).collation({locale:"en", strength: 2});
    if ( isUsernametaken ) { 
        throw new Error('Username is taken');
    }

    const isEmailtaken = await User.findOne({email}).collation({locale: "en", strength: 2});
    if ( isEmailtaken ) {
        throw new Error ('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await User.create({
        email,
        username,
        hashedPassword
    });

    return createSession(user);

}

async function login(username, password){
  const user = await User.findOne( { username }).collation({ locale: 'en', strength: 2});
  if(!user){
    throw new Error('Incorrect username or password');
  };
  const hasMatch = await bcrypt.compare(password, user.hashedPassword);
  if(!hasMatch) {
    throw new Error('Incorrect username or password');
  };
  return createSession(user);
}

async function logout(){};

function createSession({ _id, email, username}){
    const payload = {
        _id,
        email,
        username
    };

    return jwt.sign(payload, JWT_SECRET);
};

function verifyToken(token){
    return jwt.verify(token, JWT_SECRET);
};

module.exports = {
    register,
    login,
    verifyToken
}