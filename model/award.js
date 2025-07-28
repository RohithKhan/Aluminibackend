import mongoose from "mongoose";

const award = new mongoose.Schema({
    photo: {
        type: String,
    },
    name: {
        type: String,
    },
    batch: {
        type: String,
    },
    department: {
        type: String,
    },
    dob: {
        type: String,
    },
    contactnumber: {
        type: Number,
    },
    alternativenumber: {
        type: Number
    },
    email: {
        type: String,
    },
    companyname: {
        type: String,
    },
    jobtitle: {
        type: String,
    },
    linkdinprofile: {
        type: String
    },
    currentlocation: {
        type: String,
    },
    awardcategory: {
        type: String,
    },
    deservethisaward: {
        type: String,
    },
    achievements: {
        type: String,
    },
    socialcontribution: {
        type: String,
    },
    recognition: {
        type: String,
    },
    receivedanyaward: {
        type: Boolean
    },
    awardandyear: {
       type: String
    },
    supportingdocuments: {
        type: String,
    },
    mediamention: {
        type: String,
    },
    referencename: {
        type: String,
    },
    organizationname: {
        type: String,
    },
    numberandemail: {
        type: String,
    },
    relationship: {
        type: String,
    },
    declaration: {
        type: Boolean,
    }
})

const Award = mongoose.model("award", award);

export default Award;