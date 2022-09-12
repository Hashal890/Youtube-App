let youtubeData = document.getElementById("youtubeData");
let suggestionsData = document.getElementById("suggestionsData");
const apiKey = `AIzaSyDSIVpcXYneEzkpQlzJe7YcVgaP5V3rUII`;
let stEffect;

let getDefault = async () => {
  try {
    let query = document.querySelector("#query").value;
    let keyUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&key=${apiKey}`;
    let res = await fetch(keyUrl);
    let data = await res.json();
    console.log(data);
    displayData(data.items);
  } catch (err) {
    alert("Some error is there!");
  }
};
getDefault();

let getData = async () => {
  try {
    let query = document.querySelector("#query").value;
    let keyUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${apiKey}`;
    let res = await fetch(keyUrl);
    let data = await res.json();
    // console.log(data);
    displayData(data.items);
  } catch (err) {
    alert("Some error is there!");
  }
};

let displayData = (data) => {
  suggestionsData.style.visibility = "hidden";
  youtubeData.innerHTML = null;
  data.forEach(
    ({
      id: { videoId },
      snippet: {
        title,
        thumbnails: {
          high: { url },
        },
        description,
        channelTitle,
      },
    }) => {
      let image = document.createElement("img");
      image.src = url;
      let Title = document.createElement("h4");
      Title.innerText = title;
      let chantitle = document.createElement("p");
      chantitle.innerText = channelTitle;
      let div = document.createElement("div");
      div.append(image, Title, chantitle);
      let video = {
        title,
        videoId,
        description,
      };
      div.onclick = () => {
        playVideo(video);
      };
      youtubeData.append(div);
    }
  );
};

let playVideo = (video) => {
  window.location.href = "./play.html";
  window.localStorage.setItem("videoData", JSON.stringify(video));
};

let homeReturn = () => {
  window.location.href = "./index.html";
};
