const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const carModelSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model("CarModel", carModelSchema);