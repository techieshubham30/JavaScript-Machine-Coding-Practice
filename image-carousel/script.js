const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

const image = document.getElementById("image");

const imageUrlArray = [];
let index = 0;

const fetchImages = async () => {
  const data = await fetch("https://www.reddit.com/r/aww/top/.json?t=all");
  const jsonData = await data.json();
  const imageUrls = jsonData.data.children
    .map((ele) => ele.data.url_overridden_by_dest)
    .filter((elem) => elem.includes("jpg"));

  imageUrlArray.push(...imageUrls);
  image.src = imageUrlArray[0];

  console.log(imageUrlArray);
};

const showImage = (idx) => {
  image.src = imageUrlArray[idx];
};

const handleClick = (dir) => {
  const lastIndex = imageUrlArray.length - 1;
  if (dir === "left") {
    index = index === 0 ? lastIndex : index - 1;
  } else {
    index = index === lastIndex ? 0 : index + 1;
  }
  showImage(index);
};

prevButton.addEventListener("click", () => handleClick("left"));
nextButton.addEventListener("click", () => handleClick("right"));
fetchImages();
setInterval(() => handleClick("right"), 3000);
