import * as mongoose from 'mongoose';

export const PetSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    breed: {type: String},
    description: {type: String, required: true},
    photos: [{type: String}],
    isLost: {type: Boolean, required: true},
    isDeleted: {type: Boolean, default: false},
}, {versionKey: false});
