var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var User = require('../models/User');

/*
 * Require authentication on ALL access to /tweets/*
 * Clients which are not logged in will receive a 403 error code.
 */
var requireAuthentication = function(req, res, next) {
    if (!req.currentUser) {
        utils.sendErrResponse(res, 403, 'Must be logged in to use this feature.');
    } else {
        next();
    }
};

/*
 * For create requests, require that the request body
 * contains a 'content' field. Send error code 400 if not.
 */
var requireContent = function(req, res, next) {
    if (!req.body.content) {
        utils.sendErrResponse(res, 400, 'Content required in request.');
    } else {
        next();
    }
};

/*
 * Grab a tweet from the store whenever one is referenced with an ID in the
 * request path (any routes defined with :tweet as a paramter).
 */
router.param('tweet', function(req, res, next, tweetId) {
  User.getTweet(req.currentUser.username, tweetId, function(err, tweet) {
    if (tweet) {
      req.tweet = tweet;
      next();
    } else {
      utils.sendErrResponse(res, 404, 'Resource not found.');
    }
  });
});

// Register the middleware handlers above
router.all('*', requireAuthentication);
router.post('*', requireContent);

/**
 * Returns the tweets collection of the current user
 *
 * GET /tweets
 * No request parameters
 * Response:
 *   - success: true if the server succeeded in getting the user's tweet
 *   - content: on success, an object with a single field 'tweets', which contains a list of the
 *   user's tweets
 *   - err: on failure, an error message
 */
router.get('/', function(req, res) {
    User.getTweets(req.currentUser.username, function(err, tweets) {
        if (err) {
            utils.sendErrResponse(res, 500, 'An unknown error occurred.');
        } else {
            utils.sendSuccessResponse(res, { tweets: tweets });
        }
    });
});

/**
 * Adds a tweet object that contains the creator's username and the content
 * to the current user's tweets collection
 *
 * POST /tweets
 * Request body:
 *  - content: the content of the tweet
 *  - creator: the creator of the tweet
 * Response:
 *  - success: true if the server succeeded in recording the user's tweet
 *  - err: on failure, an error message
 */
router.post('/', function(req, res) {
    User.addTweet(req.currentUser.username, {
        content: req.body.content,
        creator: req.currentUser.username
    }, function(err) {
        if (err) {
            utils.sendErrResponse(res, 500, 'An unknown error occurred.');
        } else {
            utils.sendSuccessResponse(res);
        }
    });
});

/**
 * Adds a retweet object that contains the creator's username and the content
 * to the current user's tweets collection
 *
 * POST /tweets/retweet
 * Request body:
 *  - content: the content of the tweet
 *  - creator: the creator of the tweet
 * Response:
 *  - success: true if the server succeeded in recording the user's tweet
 *  - err: on failure, an error message
 */
router.post('/retweet', function(req, res) {
    User.retweetTweet(req.currentUser.username, {
        content: req.body.content,
        creator: req.body.creator
    }, function(err) {
        if (err) {
            utils.sendErrResponse(res, 500, 'An unknown error occurred.');
        } else {
            utils.sendSuccessResponse(res);
        }
    });
});

/**
 * Returns the tweets collections of all users
 *
 * GET /tweets/all
 * No request parameters
 * Response:
 *   - success: true if the server succeeded in getting all tweets and retweeets
 *   - content: on success, an object with a single field 'allTweets', which contains 
 *              a list of all the tweets and retweets
 *   - err: on failure, an error message
 */
router.get('/all', function(req, res) {
    User.getAllTweets(req.currentUser.username, function(err, allTweets) {
        if (err) {
            utils.sendErrResponse(res, 500, 'An unknown error occurred.');
        } else {
            utils.sendSuccessResponse(res, { allTweets: allTweets });
        }
    });
});

/**
 * Returns a list of tweets and retweets by the usernames that the user follows
 *
 * GET /tweets/following
 * Request body:
 *  - username: the username of the user
 * Response:
 *  - success: true if the server succeeded in recording the user's tweet
 *  - content: on success, an object with a single field 'followingTweets', which contains 
 *              a list of the tweets and retweets by the usernames that the user follows
 *  - err: on failure, an error message
 */
router.get('/following', function(req, res) {
    User.getFollowingTweets(req.currentUser.username, function(err, followingTweets) {
        if (err) {
            utils.sendErrResponse(res, 500, 'An unknown error occurred.');
        } else {
            utils.sendSuccessResponse(res, { followingTweets: followingTweets });
        }
    });
});

/**
 * Returns the tweet with the unique id
 *
 * GET /tweets/:tweet
 * Request parameters:
 *   - tweet: the unique ID of the tweet within the current user's tweet collection
 * Response:
 *   - success: true if the server succeeded in getting the user's tweet
 *   - content: on success, the tweet object with ID equal to the tweet referenced in the URL
 *   - err: on failure, an error message
 */
router.get('/:tweet', function(req, res) {
    utils.sendSuccessResponse(res, req.tweet);
});

/**
 * Deletes the tweet with the unique id
 *
 * DELETE /tweets/:tweet
 * Request parameters:
 *   - tweet ID: the unique ID of the tweet within the logged in user's tweet collection
 * Response:
 *   - success: true if the server succeeded in deleting the user's tweet
 *   - err: on failure, an error message
 */
router.delete('/:tweet', function(req, res) {
    User.deleteTweet(
        req.currentUser.username, 
        req.tweet._id, 
        function(err) {
            if (err) {
                utils.sendErrResponse(res, 500, 'An unknown error occurred.');
            } else {
                utils.sendSuccessResponse(res);
            }
    });
});

module.exports = router;
