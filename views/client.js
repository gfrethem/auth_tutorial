/**
 * Created by gfrethem on 10/21/15.
 */
$(function () {

    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'https://api.twitter.com/1.1/users/show.json?screen_name=gseven330',
        success: function (data) {
            console.log(data);
        }
    })});
