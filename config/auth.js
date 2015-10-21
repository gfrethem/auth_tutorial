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
        'consumerKey'       : 'ipcoEpKbdVbSMsT7z1hvQpRpP',
        'consumerSecret'    : 'h5PI22ZOx4GFj6ZP6T0t0gonYW9PFUhgV4GeCv5okkF0uBVd1q',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    }

    //'googleAuth' : {
    //    'clientID'      : 'your-secret-clientID-here',
    //    'clientSecret'  : 'your-client-secret-here',
    //    'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    //}

};