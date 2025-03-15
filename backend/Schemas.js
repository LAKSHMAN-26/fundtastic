import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true, // Corrected to 'required'
    },
    email: {
        type: String,
        required: true, // Corrected to 'required'
        unique: true,
    },
    password: {
        type: String,
        required: true, // Corrected to 'required'
    },
    usertype: {
        type: String,
        required: true, // Corrected to 'required'
    },
});

const fundriserSchema = new Schema({
    applicantId: {
        type: String,
    },
    applicantName: {
        type: String,
    },
    applicantEmail: {
        type: String,
    },
    applicantMobile: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    bannerImage: {
        type: String,
    },
    fundriserPurpose: {
        type: String,
    },
    deadline: {
        type: String,
    },
    targetAmount: {
        type: Number,
    },
    collectedAmount: {
        type: Number,
        default: 0, // Added default value to avoid undefined issues
    },
    extraImg1: {
        type: String,
    },
    extraImg2: {
        type: String,
    },
    extraImg3: {
        type: String,
    },
});

const donationsSchema = new Schema({
    donarId: {
        type: String,
    },
    donarName: {
        type: String,
    },
    donarEmail: {
        type: String,
    },
    donationAmount: {
        type: Number,
    },
    remark: {
        type: String,
    },
    fundriserId: {
        type: String,
    },
    fundriserPurpose: {
        type: String,
    },
});

export const User = mongoose.model("users", userSchema);
export const Fundriser = mongoose.model("fundrisers", fundriserSchema);
export const Donation = mongoose.model("donations", donationsSchema);