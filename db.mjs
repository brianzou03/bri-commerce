import mongoose from 'mongoose';

mongoose.connect(process.env.DSN);

const BrianSchema = new mongoose.Schema({
    exampleValue: String,
    exampleValue2: Number
});

mongoose.model('BrianSchema', BrianSchema);

export default BrianSchema;