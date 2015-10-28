/**
 * Created by gfrethem on 10/26/15.
 */
var mongoose = require('mongoose');
var savedSongsSchema = mongoose.Schema({
    singer: String,
    song: {title: String, artist: String}
});

module.exports = mongoose.model('SavedSongs', savedSongsSchema );