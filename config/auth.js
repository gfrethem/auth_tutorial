/**
 * Created by gfrethem on 10/20/15.
 */
// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {


    //'facebookAuth' : {
    //    'clientID'      : 'your-secret-clientID-here', // your App ID
    //    'clientSecret'  : 'your-client-secret-here', // your App Secret
    //    'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    //},

    'twitterAuth' : {
        'consumerKey'       : process.env.twitter_consumer_key,
        'consumerSecret'    : process.env.twitter_consumer_secret,

        // Local
        //'callbackURL'       : 'http://192.168.0.7:5000/auth/twitter/callback'

        // Heroku
        'callbackURL'       : 'http://sleepy-escarpment-7806.herokuapp.com/auth/twitter/callback'
    }

    //'googleAuth' : {
    //    'clientID'      : 'your-secret-clientID-here',
    //    'clientSecret'  : 'your-client-secret-here',
    //    'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    //}

};