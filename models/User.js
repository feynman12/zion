var mongoose = require("mongoose");

var nameSchema = mongoose.Schema({
    first: String,
    middle: String,
    last: String
});

var periodSchema = mongoose.Schema({
    start: Date,
    end: Date
});

var locationSchema = mongoose.Schema({
    city: String,
    state: String
});

var workSchema = mongoose.Schema({
    employer: String,
    position: String,
    location: locationSchema,
    timePeriod: periodSchema
});

var educationSchema = mongoose.Schema({
    school: String,
    degree: String,
    major: String,
    timePeriod: periodSchema
});

var relationshipStatusSchema = mongoose.Schema({
    status: String,
    other: String,
    timePeriod: periodSchema
});

var commentSchema = mongoose.Schema({
    _id: Number,
    date: Date,
    poster: String,
    text: String,
    liked: [String]
});

var photoSchema = mongoose.Schema({
    _id: Number,
    poster: String,
    date: Date,
    caption: String,
    tagged: [String],
    liked: [String],
    comments: [commentSchema]
});

var profileSchema = mongoose.Schema({
    name: nameSchema,
    email: String,
    sex: String,
    birthday: Date,
    education: educationSchema,
    residence: locationSchema,
    hometown: locationSchema,
    work: workSchema,
    interestedIn: String,
    relationshipStatus: relationshipStatusSchema,
    photo: photoSchema
});

var wallPostSchema = mongoose.Schema({
    _id: Number,
    date: Date,
    poster: String,
    text: String,
    photo: photoSchema,
    comments: [commentSchema]
});

var friendSchema = mongoose.Schema({
    username: String,
    close: Boolean
});

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    profile: profileSchema,
    friends: [friendSchema],
    photos: [photoSchema],
    wall: [wallPostSchema]
});

/**
 * Returns the User object that has the specified username
 *
 * @param {String} username the username of the desired User object
 * @param {Function} callback the callback function that is called at the end
 *                   with appropriate arguments for error and result
 */
userSchema.statics.findByUsername = function(username, callback) {
    this.findOne({ username : username }, function(err, user) {
        if (user !== null) {
            callback(null, user);
        } else {
            callback({ 'msg': 'No such user exists' });
        }
    });
}

/**
 * Checks if the entered password matches the password of the user
 *
 * @param {String} username the username of the desired User object
 * @param {String} candidatepw the password of the desired User object
 * @param {Function} callback the callback function that is called at the end
 *                   with appropriate arguments for error and result
 *
 * TODO: Store password hash with salt and compare
 */
userSchema.statics.verifyPassword = function(username, candidatepw, callback) {
    this.findOne({ username : username }, function(err, user) {
        if (user !== null) {
            if (candidatepw === user.password) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        } else {
            callback(null, false);
        }
    });
}

/**
 * Creates a User object under the specified username if the user is not
 * stored and returns a message saying the username is taken otherwise
 *
 * @param {String} username the username of the desired User object
 * @param {String} password the password of the desired User object
 * @param {Function} callback the callback function that is called at the end
 *                   with appropriate arguments for error and result
 */
userSchema.statics.createNewUser = function (username, password, profile, callback) {
    this.findOne({ username : username }, function(err, user) {
        if (user !== null) {
            callback({ taken: true });
        } else {
            var newUser = {
                username: username,
                password: password,
                profile: profile,
                friends: [],
                photos: [],
                wall: []
            };

            this.create(newUser, function(err, newUser) {
                if (err) {
                    callback({ 'msg' : 'An error occured while creating user in database' });
                } else {
                    callback(null, newUser);
                }
            });
        }
    }.bind(this));
};

var User = mongoose.model('User', userSchema);

module.exports = User;