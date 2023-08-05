import { getActiveTabURL } from "./utils.js";
const activeTabs1 = await getActiveTabURL();


function disableBtn() {
  document.getElementById("myRange").disabled = true;
}

function undisableBtn() {
  document.getElementById("myRange").disabled = false;
}

if(!document.getElementById("checkBtn").checked){
  disableBtn();
}

if (activeTabs1.url.includes("youtube.com")) {
  document.getElementsByClassName("btnStatus")[0].style.color = "grey";
  document.getElementById("checkBtn").addEventListener("click", async () => {
    const activeTabs = await getActiveTabURL();
    const tabId = activeTabs.id;
    const toSet2 = document.getElementById("myRange").value;
    if(!document.getElementById("checkBtn").checked){
      disableBtn();
      document.getElementById('rangeHeading').innerHTML = "Plaese Enable to use";
      document.getElementsByClassName("btnStatus")[1].style.color = "grey";
      document.getElementsByClassName("btnStatus")[0].style.color = "white";
      document.getElementById('mode').innerHTML = 'LEISURE MODE';
      chrome.tabs.sendMessage(tabId, {
        type: "REMOVE_BLUR",
        blurValue: 0,
      });
    } else if(document.getElementById("checkBtn").checked){
      undisableBtn();
      document.getElementById('rangeHeading').innerHTML = "Select the blur intensity";
      document.getElementsByClassName("btnStatus")[0].style.color = "grey";
      document.getElementsByClassName("btnStatus")[1].style.color = "white";
      document.getElementById('mode').innerHTML = 'FOCUS MODE';
      chrome.tabs.sendMessage(tabId, {
        type: "BLUR",
        blurValue: toSet2*3,
      });
    }
  })
  
  document.getElementById("myRange").addEventListener('change', async () => {
    const activeTabs = await getActiveTabURL();
    const tabId = activeTabs.id;
    const toSet = document.getElementById("myRange").value;
    chrome.tabs.sendMessage(tabId, {
      type: "CHANGE_BLUR",
      blurValue: toSet*3,
    });
  })
} else {
  document.getElementById('checkBtn').checked = false;
  document.getElementById("checkBtn").disabled = true;
  disableBtn();
  document.getElementById("pageStatus").innerHTML = "Only available for youtube";
  document.getElementById('toggleHeading').innerHTML = "Toggling not available"
  document.getElementById('rangeHeading').innerHTML = "Toggling not available";
  document.getElementById('mode').innerHTML = '';
  const paras = document.getElementsByTagName("p");
  for (let ele in paras) {
    if (paras[ele]) {
      paras[ele].style.color = "grey";
    }
  }
}

