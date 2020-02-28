var convertBtn = document.querySelector('.convert-button');
var URLinput = document.querySelector('.URL-input');
convertBtn.addEventListener('click', () => {
    console.log(`URL: ${URLinput.value}`);
    sendURL(URLinput.value);
});

function youtubeParser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

function sendURL(url) {
  let ytApiKey = "AIzaSyAAXUH2ywHr34ZCjlDzSyybsBc7_Wfgejg";
  let id = youtubeParser(url);
  $.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + id + "&key=" + ytApiKey, function(data) {
    window.title = data.items[0].snippet.title;
    console.log(window.title);
    window.location.href = `http://localhost:4000/download?URL=${url}&TITLE=${window.title}`;
  });
}
