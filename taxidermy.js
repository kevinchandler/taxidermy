// Description:
//   random image from http://crappytaxidermy.com as requested by Justin Jones
//
// Dependencies:
//   crawler, url
//
// Configuration:
// None
//
// Commands:
//   Hubot taxidermy - returns a random image from http://crappytaxidermy.com

var Crawler = require("crawler");
var url = require('url');

module.exports = function(robot) {
  robot.respond(/sensitivity|taxider me|taxidermy/i, function(msg) {
    taxidermyImages = []

    // website pages 1 - 170
    var randomNumber = Math.round(Math.random(1, 170)*100)

    var c = new Crawler({
        maxConnections : 10,
        callback : function (error, result, $) {
          $('.post .post-wrapper .post-photo img').each(function(index, img) {
            taxidermyImages.push(img.attribs.src)
          });
          var randomImage = taxidermyImages[Math.floor(Math.random()*taxidermyImages.length)]
          return msg.send(randomImage);
        }
    });
    c.queue('http://crappytaxidermy.com/page/' + randomNumber);
  })
}
