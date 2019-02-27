let commenturl =
"https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=dQw4w9WgXcQ&key=AIzaSyAwzRLehoMPKA4cyls3k_wlE6LRHrjEbXo";

getComments();

function getComments() {
  let listo = [];
 
  $.getJSON(commenturl, function(responseJSON){
    console.log(responseJSON.items.forEach((data) => listo.push(data.snippet.topLevelComment.snippet.textOriginal)));

    $('div.listing').children().remove();
      for (let i = 0; i < listo.length; i++) {
        if (i % 2 === 0) {
          $('div.listing').append('<div class="comments style1">'+listo[i]+'</div>');
        } else {
          $('div.listing').append('<div class="comments style2">'+listo[i]+'</div>');

        }
      }
  });
};

setInterval(getComments, 10000);
