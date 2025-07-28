import uploadfiletos3 from "../controller/upload.js";
import nodemailer from "nodemailer";
import Award from "../model/award.js";
import joi from "joi";

export const addAward = async (req, res) => {
    try {
        let photoUploadUrl = null;
        let supportingDocumentUrl = null;

        if (req.files) {
            if (req.files.photo && req.files.photo.length > 0) {
                photoUploadUrl = await uploadfiletos3(req.files.photo[0]);
            }
            if (req.files.supportingdocuments && req.files.supportingdocuments.length > 0) {
                supportingDocumentUrl = await uploadfiletos3(req.files.supportingdocuments[0]);
            }
        }

        // Ensure fields are always strings
        req.body.photo = photoUploadUrl || "";
        req.body.supportingdocuments = supportingDocumentUrl || "";
        req.body.mediamention = req.body.mediamention || "";

        // Fix inconsistent field names
        if (req.body.mediamentions) {
            req.body.mediamention = req.body.mediamentions;
            delete req.body.mediamentions;
        }

        // Convert arrays to strings
        Object.keys(req.body).forEach(key => {
            if (Array.isArray(req.body[key])) {
                req.body[key] = req.body[key][0];
            }
        });

        const schema = joi.object({
            photo: joi.string().uri().allow("", null),
            supportingdocuments: joi.string().uri().allow("", null),
            name: joi.string().min(3).required(),
            batch: joi.string().required(),
            department: joi.string().required(),
            dob: joi.string().required(),
            contactnumber: joi.number().min(10).required(),
            alternativenumber: joi.number().min(10).allow("", null),
            email: joi.string().email().required(),
            companyname: joi.string().allow("", null),
            jobtitle: joi.string().allow("", null),
            linkdinprofile: joi.string().allow("", null),
            currentlocation: joi.string().allow("", null),
            awardcategory: joi.string().required(),
            deservethisaward: joi.string().max(1900).allow(),
            achievements: joi.string().allow("", null),
            socialcontribution: joi.string().allow("", null),
            recognition: joi.string().allow("", null),
            receivedanyaward: joi.boolean(),
            awardandyear: joi.string().allow("",null),
            mediamention: joi.string().allow("", null),
            referencename: joi.string().min(3).allow("", null),
            organizationname: joi.string().allow("", null),
            numberandemail: joi.string().allow("", null),
            relationship: joi.string().allow("", null),
            declaration: joi.boolean().required()
        });

        // Validate request
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        // Save to MongoDB
        const awardReference = new Award({
            photo: photoUploadUrl,
            name: req.body.name,
            batch: req.body.batch,
            department: req.body.department,
            dob: req.body.dob,
            contactnumber: req.body.contactnumber,
            alternativenumber: req.body.alternativenumber,
            email: req.body.email,
            companyname: req.body.companyname,
            jobtitle: req.body.jobtitle,
            linkdinprofile: req.body.linkdinprofile,
            currentlocation: req.body.currentlocation,
            awardcategory: req.body.awardcategory,
            deservethisaward: req.body.deservethisaward,
            achievements: req.body.achievements,
            socialcontribution: req.body.socialcontribution,
            recognition: req.body.recognition,
            receivedanyaward: req.body.receivedanyaward,
            awardandyear: req.body.awardandyear,
            supportingdocuments: supportingDocumentUrl,
            mediamention: req.body.mediamention,
            referencename: req.body.referencename,
            organizationname: req.body.organizationname,
            numberandemail: req.body.numberandemail,
            relationship: req.body.relationship,
            declaration: req.body.declaration
        });

        const existingUser = await Award.findOne({ email: req.body.email });

if (existingUser) {
    return res.status(400).json({ success: false, message: "User already registered!" });
}


        await awardReference.save();
        console.log("Successfully saved");

        res.json({
            "Status": "Successfully saved",
            "success": true,
            "uploadedFiles": {
                photo: photoUploadUrl,
                supportingdocuments: supportingDocumentUrl
            }
        });

        // Send Email Confirmation
        // const mail = await Award.findOne({}, 'email');
        // const recipientEmail = mail?.email || "default@example.com";

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "jitalumnicommunity@gmail.com",
                pass: "zsov adkv jgxf kwce"
            }
        });

        const mailOptions = {
            from: "venkatesh.s.23jitit209@gmail.com",
            to: req.body.email,
            subject: " 🎉 Your Application for JIT Alumni Excellence Awards 2025 is Received!",
            text: `Dear ${req.body.name},\n\nThank you for submitting your application for the JIT Alumni Excellence Awards 2025! 🎓🏆\n\nWe have successfully received your details and our jury will carefully review your submission.\n\n📌 Category Applied For: ${req.body.awardcategory}\n\nWhat’s Next?\n\n ✔ The evaluation process will take place over the next few weeks.\n✔ Shortlisted candidates will be contacted via email or phone.\n✔ The final winners will be announced at the JIT Alumni Meet 2025 on March 1, 2025.\n\nLooking forward to celebrating your achievements!\n\nBest Regards,\nJIT Alumni Awards Committee\n#Nostalgia2025 #JITAlumniMeet #JITExcellenceAwards #OnceAJITianAlwaysAJITian`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error Sending Email", error);
            } else {
                console.log("Email sent successfully", info.response);
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error saving award', details: error.message });
    }
};
