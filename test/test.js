var assert = require("assert");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {});

var User = require('../models/User');

describe('Testing User Model', function() {
    before(function() {
        return User.remove({});
    });

    describe('createNewUser and findByUsername', function() {
        it('createNewUser1: should make a User object and return it when the username doesn\'t exist', function(done) {
            User.createNewUser('user1', 'user1', function(err, user) {
                assert(err === null);
                assert(user.username !== undefined && user.tweets !== undefined);
                done();
            });
        });

        it('createNewUser2: should return a message saying the username is taken when the username exists', function(done) {
            User.createNewUser('user1', 'user1', function(err, user) {
                assert(err !== null);
                assert(err.taken);
                done();
            });
        });

        it('findByUsername1: should return an error message when the username doesn\'t exist', function(done) {
            User.findByUsername('newUser', function(err, user) {
                assert(err !== null);
                assert.equal(err.msg, 'No such user exists');
                done();
            });
        });

        it('findByUsername2: should return a User object when the username exists', function(done) {
            User.findByUsername('user1', function(err, user) {
                assert.equal('user1', user.username);
                done();
            });
        });
    });

    describe('addTweet, retweetTweet, deleteTweet, getTweet, getTweets, and getAllTweets', function() {
        var testTweet = { 'creator':'user1', 'content':'testContent' };
        var testTweet2 = { 'creator':'user2', 'content':'testContent2' };

        it('addTweet1: should return an error message when the username doesn\'t exist', function(done) {
            User.addTweet('newUser', testTweet, function(err, tweets) {
                assert(err !== null);
                assert.equal(err.msg, 'No such user exists');
                done();
            });
        });

        it('addTweet2: should return null for error and modified tweets collection for tweets when the username exists', function(done) {
            User.addTweet('user1', testTweet, function(err, tweets) {
                assert(err === null);
                assert(tweets.filter(function(tweet) { 
                    return tweet.content === testTweet.content && tweet.creator === testTweet.creator
                }).length > 0);
                done();
            });
        });

        it('retweetTweet1: should return an error message when the username doesn\'t exist', function(done) {
            User.addTweet('newUser', testTweet, function(err, tweets) {
                assert(err !== null);
                assert.equal(err.msg, 'No such user exists');
                done();
            });
        });

        it('retweetTweet2: should return null for error and modified tweets collection for tweets when the username exists', function(done) {
            User.createNewUser('user2', 'user2', function(err, user) {
                User.retweetTweet('user2', testTweet, function(err, tweets) {
                    assert(err === null);
                    assert(tweets.filter(function(tweet) { 
                        return tweet.content === testTweet.content && tweet.creator === testTweet.creator && tweet.retweeter === 'user2';
                    }).length > 0);
                    done();
                });
            });
        });

        it('deleteTweet1: should return an error message when the username doesn\'t exist', function(done) {
            User.deleteTweet('newUser', '0', function(err, tweets) {
                assert(err !== null);
                assert.equal(err.msg, 'No such user exists');
                done();
            });
        });

        it('deleteTweet2: should return null for error and unmodified tweets collections for tweets when the username exists and the id is incorrect', function(done) {
            User.deleteTweet('user1', '10', function(err, tweets) {
                assert(err === null);
                assert(tweets.filter(function(tweet) { 
                    return tweet.content === testTweet.content && tweet.creator === testTweet.creator
                }).length > 0);
                done();
            });
        });

        it('deleteTweet3: should return null for error and undefined for tweet when the username exists and the id is correct', function(done) {
            User.deleteTweet('user1', '0', function(err, tweets) {
                assert(err === null);
                assert(tweets.filter(function(tweet) { 
                    return tweet.content === testTweet.content && tweet.creator === testTweet.creator
                }).length === 0);
                done();
            });
        });

        it('getTweet1: should return an error message when the username doesn\'t exist', function(done) {
            User.getTweet('newUser', '0', function(err, tweet) {
                assert(err !== null);
                assert.equal(err.msg, 'No such user exists');
                done();
            });
        });

        it('getTweet2: should return an error message when the username exists and the id is incorrect', function(done) {
            User.getTweet('user1', '10', function(err, tweet) {
                assert(err !== null);
                assert.equal(err.msg, 'No such tweet exists');
                done();
            });
        });

        it('getTweet3: should return null for error and a tweet object for tweet when the username exists and the id is correct', function(done) {
            User.addTweet('user1', testTweet, function(err, tweet) {
                User.getTweet('user1', '0', function(err, addedTweet) {
                    assert(err === null);
                    assert(addedTweet.creator !== undefined && addedTweet.content !== undefined);
                    done();
                });
            });
        });

        it('getTweets1: should return an error message when the username doesn\'t exist', function(done) {
            User.getTweets('newUser', function(err, tweets) {
                assert(err !== null);
                assert.equal(err.msg, 'No such user exists');
                done();
            });
        });

        it('getTweet2: should return a tweets collection when the username exists', function(done) {
            User.getTweets('user1', function(err, tweets) {
                assert(err === null);
                assert(tweets.length > 0);
                done();
            });
        });

        it('getAllTweets1: should return an error message when the username doesn\'t exist', function(done) {
            User.getAllTweets('newUser', function(err, allTweets) {
                assert(err !== null);
                assert.equal(err.msg, 'No such user exists');
                done();
            });
        });

        it('getAllTweets2: should return a allTweets collection when the username exists', function(done) {
            User.addTweet('user2', testTweet2, function(err, tweet) {
                User.getAllTweets('user2', function(err, allTweets) {
                    assert(err === null);
                    assert(allTweets.filter(function(tweet) { 
                        return tweet.creator === 'user1'
                    }).length > 0);
                    assert(allTweets.filter(function(tweet) { 
                        return tweet.creator === 'user2'
                    }).length > 0);
                    done();
                });
            });
        });
    });
});