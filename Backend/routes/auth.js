const express = require("express");
const Router = express.Router();
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const User = require("../models/User");
var bcrypt = require('bcryptjs');
const JWT_SECRET="JATIN";
var jwt = require('jsonwebtoken');
const fetch=require("../middleware/fetchUser");
Router.post(
  "/createUser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({success, errors: "Sorry,user already found" });
    }
    const salt =await bcrypt.genSalt(10);
    const securePassword =await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password:securePassword,
    });
    const data={
      user:{id:user.id}
    }
    success=true;
    const authToken=jwt.sign(data,JWT_SECRET);
    return res.json({success,authToken});
  }
);
Router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").exists()
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    const {email,password}=req.body;
    const user=await User.findOne({email:email})
    if(!user){
      return res.json({success,json:"Please try to log in with correct credentials"});
    }
  const passwordCompare=await bcrypt.compare(password,user.password);
  if(!passwordCompare){
    success=false;
    return res.json({json:"Please try to log in with correct credentials"});}
  const data={
    user:{id:user.id}
  }
  success=true;
  const authToken=jwt.sign(data,JWT_SECRET);
  return res.json({success,authToken});    
}
    catch(error){
   res.status(404).send("Internal server error occured")
    }
  }
);

Router.post(
  "/getuser",fetch,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    const userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    return res.send(user);
}
    catch(error){
   res.status(404).send("Internal server error occured")
    }
  }
);
module.exports = Router;
