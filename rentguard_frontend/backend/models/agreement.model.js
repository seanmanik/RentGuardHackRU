const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const agreementSchema = new Schema({
    tenant: { type: String, required: true },
    landlord: { type: String, required: true },
    rent: { type: Number, required: true },
    address: { type: String, required: true },
    image: { type: String, required: true },
    rentHiked: { type: Number, required: true },
    rentPaid: { type: Boolean, required: true },
});

const Agreement = mongoose.model('Agreement', agreementSchema);

module.exports = Agreement;