var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var User = require('../models/User');

/*
* Returns true if an error code was sent when the user is logged in, 
* or when the client did not provide a username and password
*/
var isLoggedInOrInvalidBody = function(req, res) {
    if (req.currentUser) {
        utils.sendErrResponse(res, 403, 'There is already a user logged in.');
        return true;
    } else if (!(req.body.username && req.body.password)) {
        utils.sendErrResponse(res, 400, 'Username or password not provided.');
        return true;
    }
    return false;
};

/**
 * Verifies the password and returns the username if correct
 *
 * POST /users/login
 * Request body:
 *      - username
 *      - password
 * Response:
 *      - success: true if login succeeded; false otherwise
 *      - content: on success, an object with a single field 'user', the object of the logged in user
 *      - err: on error, an error message
 */
router.post('/login', function(req, res) {
    if (isLoggedInOrInvalidBody(req, res)) {
        return;
    }

    User.verifyPassword(req.body.username, req.body.password, function(err, match) {
        if (match) {
            req.session.username = req.body.username;
            utils.sendSuccessResponse(res, { user : req.body.username });
        } else {
            utils.sendErrResponse(res, 403, 'Username or password invalid.');
        }
    });
});

/**
 * Logs out the user if there is a current user logged in
 *
 * POST /users/logout
 * Request body: empty
 * Response:
 *      - success: true if logout succeeded; false otherwise
 *      - err: on error, an error message
 */
router.post('/logout', function(req, res) {
    if (req.currentUser) {
        req.session.destroy();
        utils.sendSuccessResponse(res);
    } else {
        utils.sendErrResponse(res, 403, 'There is no user currently logged in.');
    }
});

/**
 * Creates a new user if the username isn't taken and returns an error message otherwise
 *
 * POST /users
 * Request body:
 *      - username
 *      - password
 * Response:
 *      - success: true if login succeeded; false otherwise
 *      - content: on success, the username of the created user
 *      - err: on error, an error message
 */
router.post('/', function(req, res) {
    if (isLoggedInOrInvalidBody(req, res)) {
        return;
    }

    User.createNewUser(req.body.username, req.body.password, req.body.profile, 
        function(err, user) {
            if (err) {
                if (err.taken) {
                    utils.sendErrResponse(res, 400, 'That username is already taken!');
                } else {
                    utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
                }
            } else {
                utils.sendSuccessResponse(res, user.username);
            }
    });
});

/**
 * Determine whether there is a current user logged in
 *
 * GET /users/current
 * No request parameters
 * Response:
 *      - success.loggedIn: true if there is a user logged in; false otherwise
 *      - success.user: if success.loggedIn, the currently logged in user
 */
router.get('/current', function(req, res) {
    if (req.currentUser) {
        utils.sendSuccessResponse(res, { loggedIn : true, user : req.currentUser.username });
    } else {
        utils.sendSuccessResponse(res, { loggedIn : false });
    }
});

/**
 * Fetch the current user's profile
 *
 * GET /users/profile
 * No request parameters
 * Response:
 *      - success.loggedIn: true if there is a user logged in; false otherwise
 *      - success.user: if success.loggedIn, the currently logged in user
 */
router.get('/profile', function(req, res) {
    if (req.currentUser) {
        utils.sendSuccessResponse(res, { profile : req.currentUser.profile});
    } else {
        utils.sendSuccessResponse(res, null);
    }
});

module.exports = router;
