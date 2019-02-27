
let commenturl =
"https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=dQw4w9WgXcQ&key=AIzaSyAxPRheqC6lE3mv7BLRkm6WTLuVT6BPHpA";


$(function () {
  const apiKey = 'AIzaSyAxPRheqC6lE3mv7BLRkm6WTLuVT6BPHpA';
  const items = ['statistics','status','contentDetails'];
  let videoId = '';
  let urlEndpoint = '';
  console.log(urlEndpoint);
  let htmlStr = '';
  function doPoll(){
    $.get(urlEndpoint, function(data) {
      $('#simpleTbl').empty();
      if (data.items.length > 0) {
        let stats = data.items[0].statistics;
        for (let index in stats){
          const row = document.createElement('tr');
          switch (index) {
            case 'viewCount':
              htmlStr = '<td>Number of Views</td><td>' + stats[index] +'<td>';
              break;
            case 'likeCount':
              htmlStr = '<td>Number of Likes</td><td>' + stats[index] +'<td>';
              break;
            case 'dislikeCount':
              htmlStr = '<td>Number of Dislikes</td><td>' + stats[index] +'<td>';
              break;
            case 'favoriteCount':
              htmlStr = '<td>Number of Favorites</td><td>' + stats[index] +'<td>';
              break;
            case 'commentCount':
              htmlStr = '<td>Number of Comments</td><td>' + stats[index] +'<td>';
              break;
          }
          row.innerHTML = htmlStr;
          $('#simpleTbl').append(row);
        }
      } else {
        const row = document.createElement('tr');
        htmlStr = 'Video Not Found';
        row.innerHTML = htmlStr;
        $('#simpleTbl tbody').append(row);
      } 
      setTimeout(doPoll, 10000);
    });
  }
  $("#submit_button").click(function(){
    user_input = $("#video_id").val();
    if (user_input.includes('=')) {
      user_input = user_input.split('=')[1];
    }


    urlEndpoint = 'https://www.googleapis.com/youtube/v3/videos?id='+user_input+'&key='+apiKey+'&part='+items.join(',');
	user_input = $("#video_id").val();
	let commenturl =
	  'https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId='
	  + user_input + '&key=AIzaSyAxPRheqC6lE3mv7BLRkm6WTLuVT6BPHpA';
  	getComments();
    doPoll();
    playYTVideo();
    });

});


getComments();

function getComments() {
  let listo = [];

  let comment_input = $("#video_id").val();
  if (comment_input) {
    if (comment_input.includes('=')) {
      comment_input = comment_input.split('=')[1];
    }
    let comment_url =
      'https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId='
      + comment_input + '&key=AIzaSyAxPRheqC6lE3mv7BLRkm6WTLuVT6BPHpA';

    $.getJSON(comment_url, function(responseJSON){
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
  }
};


setInterval(getComments, 10000);
