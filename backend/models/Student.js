const mongoose = require('../db/conn')
const { Schema } = mongoose 

const Student = mongoose.model(
    'Student',
    new Schema({
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        user: Object,
        class: Object,
    }, { timestamps: true}
    )
)

module.exports = Student