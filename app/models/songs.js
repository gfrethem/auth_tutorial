/**
 * Created by gfrethem on 10/26/15.
 */
var mongoose = require('mongoose');
var songSchema = mongoose.Schema({
    title: String,
    artist: String,
    genre: String,
    duet: Boolean,
    foreignLanguage: Boolean
});

module.exports = mongoose.model('Song', songSchema);