$(function () {
  const apiKey = 'AIzaSyB3nerfUInHAox-TqKLclp6uHwuzyR4fAU';
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
    urlEndpoint = 'https://www.googleapis.com/youtube/v3/videos?id='+user_input+'&key='+apiKey+'&part='+items.join(',');
    doPoll();
    })  

});
