import nodemailer from "nodemailer";
import Aluminis from "../model/model.js";
import fs from "fs";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth:{
        user:"venkatesh.s.23jitit209@gmail.com",
        pass: "ytip ejqw qciu dgtc"
    }
});

const mailOptions = {
    from:"venkatesh.s.23jitit209@gmail.com",
    to: "",
    subject:"You're Invited! 🎉 Alumni Reunion DJ Night",
    text: `Join us for an unforgettable night at the Alumni Reunion DJ Night!
    
    📅 Date: 1st March
    ⏰ Doors Open: 3:30 PM
    📍 Jeppiaar Institute of Technology, Sriperumbudur
    
    *Reconnect - Relive - Reignite.*`,
};

transporter.sendMail(mailOptions,(error, info)=>{
    if(error){
        console.error("Error Sending Email",error)
    }else{
        console.log("Email sent successfully",info.response)
    }
});

