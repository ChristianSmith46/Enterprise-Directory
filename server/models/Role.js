const { Schema, model } = require('mongoose');

const roleSchema = new Schema(
    {
        id: {
            type: Number,
            primaryKey: true,
            autoIncrement: true
        },
        roleName: {
            type: String,
            required: true
        }
    }
);

const Role = model('Role', roleSchema);

module.exports = Role;