const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type : String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2002
        },
        Partner: Number,
        Admin: Number
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    cart: [],
    address: String,
    passwordChangeAt: Date,
    refreshToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date
},
{
    timestamps: true
}
)

const disable = "";

userSchema.pre('find', function(next) {
    this.select(disable); // Loại bỏ các trường 'password' và 'refreshToken'
    next();
});

userSchema.pre('findOne', function(next) {
    this.select(disable); // Loại bỏ các trường 'password' và 'refreshToken'
    next();
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.passwordResetExprise = Date.now() + 30 * 60 * 1000;
    return resetToken;
}

module.exports = mongoose.model('User', userSchema);