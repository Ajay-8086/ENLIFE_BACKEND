const userModel = require('../models/userRegistration')
const validation = require('../utilities/validation')
const bcrypt = require('bcrypt')
const sendMail  =require('../utilities/sendMail')
module.exports = {
    getUserSignup:(req,res)=>{
        try {
            res.status(200).json('Get user signup')
        } catch (error) {
           console.log(error); 
        }
    },
    postUserSignup:async(req,res)=>{
        try {
            const {
                fullName,
                email,
                password,
                confirmPassword,
                mobileNumber,
                dob,
                gender,
                houseName,
                citydistrict,
                state,
                pin,
                bloodGroup,
                last_Donated_Date
            } = req.body
            const userExist  = await userModel.findOne({email})
            if(userExist){
               return res.status(400).json('User already exists Please login')
            }else if(!validation.validationFields(
                [
                    fullName,
                    email,
                    password,
                    confirmPassword,
                    mobileNumber,
                    dob,
                    gender,
                    houseName,
                    citydistrict,
                    state,
                    pin,
                    bloodGroup,
                ])){
                return  res.status(400).json('All fields are required')
              }else if(!validation.emailValidation(email)){
                  return  res.status(400).json('Invalid email format')
              }else if(!validation.pwdValidation(password)){
                  return  res.status(400).json('Invalid password format')
              }else if(!validation.confirmPwd(password,confirmPassword)){
                  return  res.status(400).json('password and confirm password should match')
              }else if(!validation.mobileValidation(mobileNumber)){
                return  res.status(400).json('Please enter a valid mobile number')
              }else{
                const hasPassword  =await bcrypt.hash(password,10) 
                const newUser =new userModel({
                fullName,
                email,
                password:hasPassword,
                confirmPassword,
                mobileNumber,
                dob,
                gender,
                houseName,
                citydistrict,
                state,
                pin,
                bloodGroup,
                last_Donated_Date
                })
                await newUser.save()
                const generateOTP =  Math.floor(1000 + Math.random() * 9000);
               const hello = 'hgaaao'
                await sendMail(email, `${generateOTP}`);
                res.status(200).json('User signup successfull')
              }
        } catch (error) {
            console.log(error.message);
            res.status(500).json('Internal server errror')
        }
    }
}