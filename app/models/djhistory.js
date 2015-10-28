/**
 * Created by gfrethem on 10/26/15.
 */
var mongoose = require('mongoose');
var djHistorySchema = mongoose.Schema({
    singer: String,
    song: {title: String, artist: String, genre: String},
    performed: Boolean,
    performedDate: Date
});

module.exports = mongoose.model('DJHistory', djHistorySchema );