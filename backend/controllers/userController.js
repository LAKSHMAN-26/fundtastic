const userModel = require('../models/userModel')
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';

const signup =  async (req, res) =>{
    try{

        const {username, email, password, usertype} = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username, 
            email,
            password: passwordHash,
            usertype
        });

        const user = await newUser.save();

        res.status(200).json(user);

    }catch(err){
        res.status(500).json({error: err.message});
    }
};

const login = async (req, res) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email:email});
        if(!user) return res.status(400).json({msg: "User does not exist"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid credentials"});
             
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

module.exports = { signup, login }