
document.addEventListener("DOMContentLoaded", function() {

    // VideoID getter.
  var user_input;

  $("#submit_button").click(function(){
    user_input = $("#video_id").val();
    $.ajax({
      type: "POST",
      url: "https://www.youtube.com/watch?v=" + user_input,
      success: function(data) {
        onYouTubeIframeAPIReady(user_input);
      },
      error: function() {
        onYouTubeIframeAPIReady('dQw4w9WgXcQ');
      }
    })
  })
  
  // This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement("script");
  
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
  // This function creates an <iframe> (and YouTube player)
  // after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady(video_id) {
    player = new YT.Player("player", {
      height: "400",
      width: "100%",
      videoId: video_id,
      events: {
        "onReady": onPlayerReady
      }
    });
  }
  
  // The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.playVideo();
  }
  
})