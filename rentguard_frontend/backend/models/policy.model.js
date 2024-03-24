const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const policySchema = new Schema({
    maxPercentageIncrease: { type: Number, required: true },
    year: { type: Number, required: true },
});

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;