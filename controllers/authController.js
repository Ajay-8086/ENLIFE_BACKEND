const userModel = require('../models/userRegistration')
const validation = require('../utilities/validation')
const bcrypt = require('bcrypt')
const sendMail  =require('../utilities/sendMail')
const jwt = require('jsonwebtoken')
module.exports = {
 
    postUserSignup:async(req,res)=>{
        try {
            
            const {
                fullname,
                email,
                password,
                confirmPassword,
                mobile,
                dob,
                gender,
                houseName,
                city,
                district,
                state,
                pin,
                bloodGroup,
                last_date
            } =req.body
                
            const userExist  = await userModel.findOne({email})
            if(userExist){
               return res.status(400).json({message: 'User already exists Please login'})
            }else if(!validation.validationFields(
                [
                    fullname,
                    email,
                    password,
                    confirmPassword,
                    mobile,
                    dob,
                    gender,
                    houseName,
                    city,
                    district,
                    state,
                    pin,
                    bloodGroup,
                ])){
                return  res.status(400).json({message:'All fields are required'})
              }else if(!validation.emailValidation(email)){
                  return  res.status(400).json({message: 'Invalid email format'})
              }else if(!validation.pwdValidation(password)){
                  return  res.status(400).json({message: 'Invalid password format'})
              }else if(!validation.confirmPwd(password,confirmPassword)){
                  return  res.status(400).json({message: 'password and confirm password should match'})
              }else if(!validation.mobileValidation(mobile)){
                return  res.status(400).json({message: 'Please enter a valid mobile number'})
              }else{
                const hashPassword  =await bcrypt.hash(password,10) 
                const newUser =new userModel({
                fullName:fullname,
                email,
                password:hashPassword,
                mobileNumber:mobile,
                dob,
                gender,
                address:[{
                houseName,
                city,
                district,
                state,
                pin,
                }],
                bloodGroup,
                last_Donated_Date:last_date
                })
                await newUser.save()
                const token = jwt.sign({id: newUser._id, type: 'user'},
                process.env.SECRET_STR, {expiresIn: process.env.LOGIN_EXPIRES});
                console.log(token);
                const generateOTP = Math.floor(1000 + Math.random() * 9000);
                await sendMail(email, `${generateOTP}`);
                res.status(200).json({message:'User signup successfull', token})
              }
        } catch (error) {
            console.log(error);
            res.status(500).json('Internal server errror')
        }
    },

    otpverify: (req, res) =>{
        console.log(req.body);
    }
}