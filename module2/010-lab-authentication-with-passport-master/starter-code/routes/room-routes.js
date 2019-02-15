const express        = require("express");
const router = express.Router();  //making const a router of express
// Require user model
const User = require('../models/user');
// Add bcrypt to encrypt passwords
const bcrypt  = require("bcryptjs");
const bcryptSalt = 10;
// Add passport 
const passport  = require("passport");
