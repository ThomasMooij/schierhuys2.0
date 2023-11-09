import mongoose, { Schema, Types } from "mongoose";

const unavailablesSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
        },
    dates: {
        type: [Date],
        required: true
        }
}, {timestamps: true})  