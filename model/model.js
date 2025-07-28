import mongoose from "mongoose";

const aluminis = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    courseType: {
        type: String,
    },
    batch: {
        type: String,
    },
    department: {
        type: String,
    },
    gender: {
        type: String,
    },
    transportlocation: {
        type: String,
    },
    familymembers: {
        type: Number,
    },
    needstransport: {
        type: Boolean,
    },
    childrens: {
        type: Number,
    },
    participatingevent: {
        type: Boolean,
    },
    performancetype: {
        type: String
    }

})

const Aluminis = mongoose.model("aluminis", aluminis);

export default Aluminis;