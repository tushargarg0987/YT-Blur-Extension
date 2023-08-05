(() => {
  const blurAll = (value) => {
    const images = document.getElementsByClassName("yt-core-image");
    for (ele in images) {
      if (images[ele].style) {
        images[ele].style.filter = `blur(${value}px)`;
        console.log("Done")
      }
    }
  };

  const changeBlur = (value) => {
    const images = document.getElementsByClassName("yt-core-image");
    for (ele in images) {
      images[ele].style.filter = `blur(${value}px)`;
    }
  }

  const removeBlur = () => {
    const images = document.getElementsByClassName("yt-core-image");
    for (ele in images) {
      images[ele].style.filter = 'blur(0)';
    }
  }

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, blurValue} = obj;

    if (type === "BLUR") {
      setTimeout(blurAll(blurValue),1000)
    } else if (type === "REMOVE_BLUR") {
      removeBlur();
    } else if (type === "CHANGE_BLUR") {
      changeBlur(blurValue);
    }
  });

})();
