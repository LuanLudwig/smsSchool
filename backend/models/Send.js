const mongoose = require('../db/conn')
const { Schema } = mongoose


const Send = mongoose.model(
    'Send',
    new Schema({
        phone: {
            type: String,
            required: true
        },
        mensagem: {
            type: String,
            required: true
        },
        user: Object,
        class: Object,
    }, {timestamps: true}
    )
)


module.exports = Send