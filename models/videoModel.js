const fs = require("fs");

const fetchVideoList = () => {
  let videoList = JSON.parse(fs.readFileSync("./data/video-details.json"));
  return videoList;
};

const writeVideoData = (data) => {
  fs.writeFileSync("./data/video-details.json", JSON.stringify(data));
};

module.exports = { fetchVideoList, writeVideoData };
