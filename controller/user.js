import Aluminis from "../model/model.js";
import nodemailer from "nodemailer";
import joi from "joi";

export const addAluminis = async (req, res) => {

    const schema = joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().email().required(),
        phone: joi.number().min(10).required(),
        courseType: joi.string().required(),
        batch: joi.string().required(),
        department: joi.string().required(),
        gender: joi.string().required(),
        transportlocation: joi.string().allow("", null),
        familymembers: joi.number().required(),
        needstransport: joi.boolean(),
        childrens: joi.number().required(),
        participatingevent: joi.boolean(),
        performancetype: joi.string(),
    })

    req.body.transportlocation = req.body.transportlocation || "";

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
        console.log(error)
    }

    const { name, email, phone, courseType, batch, department, gender, transportlocation, familymembers, needstransport, childrens, participatingevent, performancetype } = req.body;

    const aluminiStudent = new Aluminis({
        name,
        email,
        phone,
        courseType,
        batch,
        department,
        gender,
        transportlocation,
        familymembers,
        needstransport,
        childrens,
        participatingevent,
        performancetype
    })

    try {

        const existingUser = await Aluminis.findOne({ email, phone })

        if (existingUser) {
            return res.status(400).json({ message: "User already registered!" })
        }

        await aluminiStudent.save()

        console.log("Successfully saved");

        res.json({
            "Status": "Successfully saved",
            "success": true
        });

        // const mail = await Aluminis.findOne({_id: userId}, 'email');

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "jitalumnicommunity@gmail.com",
                pass: "zsov adkv jgxf kwce"
            }
        });

        const mailOptions = {
            from: "venkatesh.s.23jitit209@gmail.com",
            to: email,
            subject: " 🎉 Registration Confirmed – JIT Alumni Reunion Meet 2025",
            text: "Join us for an unforgettable night at the Alumni Reunion DJ Night!",

                  attachments: [
                    {
                      filename: "Alumni_Invitation.jpg",
                      path:"./image/Alumni_Invitation.jpg",
                      cid: "unique@nodemailer.com"
                    }
                  ],

                  html: "<h2>You're Invited! 🎉</h2><p>Dear "+name+",</p><p>\n Thank you for registering for the JIT Alumni Reunion Meet 2025! We are thrilled to have you join us for an unforgettable evening of reconnecting, reliving memories, and rejoicing with old friends and  batchmate </p><img src='cid:unique@nodemailer.com' width='400'/><p>Next Steps:</p><p>\n Stay Tuned for Event Updates – Follow us on social media for the latest announcements.</p><p>\n Instagram - https://www.instagram.com/jit_alumni?utm_source=qr&igsh=czVyMHkwYjF3Z3ln </p><p>\n ------ </p><p>\n Contact Us: </p><p>\n If you have any questions, feel free to reach out at Mr Senthil </p><p>\n Email - alumni.community@jeppiaarinstitute.org </p><p>\n We can’t wait to see you there! \n Reconnect | Relive | Rejoice</p><p> \n Best regards, <br> JIT connects Alumni Association </p>"

        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error Sending Email", error)
            } else {
                console.log("Email sent successfully", info.response)
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error })
        console.log(error)
    }

}

export const findAluminis = async (req, res) => {
    const aluminiStudents = await Aluminis.find();
    res.json({
        "ALUMINI": aluminiStudents
    });
}
