var express = require('express');
var app = express();
var data,tweets;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); 

// TWITTER
var Twit = require('twit');
var fs = require('fs');
var config = require('./twitter_keys');
var T = new Twit(config);

app.post('/search', function(req, res) {

  var search = req.body.textfield;
  var textrsp = "";

  var parameters = { 
  q: textrsp + search, 
  lang: 'en',
  count: 200
  };

  htmlStr = "<html><link rel=\"stylesheet\" type=\"text/css\" href=\"styles.css\" /><body> <div id=\"containe\" style=\"background-color: none;\"> <form id = \"um\" action = \"/search\" method = \"POST\"> <div style=\"margin-top: 20px;vertical-align: top;margin-left:80px;\"> <img src=\"evilTwit.png\" style=\"width: 4%;vertical-align: top; margin-right: 15px\"> <input id = \"search\" type=\"text\" name=\"textfield\"  value=\"\"> <input id = \"button\" type=\"submit\" name=\"submitbutton\" value=\"Search Twitter\"/> </div></form> </div>" + 
  "<div class=\"wrapper\">";

  //Rest API
  T.get('search/tweets', parameters, function (err, data, response) { 

  	tweets = data.statuses; 
  	//console.log(parameters.q);
    for (var i = 0; i < tweets.length; i++) {
       var tweetObj = tweets[i]
       var tweetTxt = tweetObj.text

       if (tweetObj.entities.hasOwnProperty('media')) {
          var mediaUrl = tweetObj.entities.media[0].media_url;
          //var img="<img src=" + mediaUrl + ">";
          var img=  "<img class=\"search\" src=" + mediaUrl + "" + ">";
          htmlStr += img;
        }
      }
      
      htmlStr += "</div> </body></html>";
      res.send(htmlStr);
      console.log(htmlStr);
  
  });
});


app.use(express.static('public'));


//anonymous function 
app.listen(3001, function () {
  console.log('Server listening on port 3001!')
})
