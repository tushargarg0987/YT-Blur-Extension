chrome.tabs.onUpdated.addListener((tabId,changedInfo, tab) => {
  if (changedInfo.status === "complete" && tab.url && tab.url.includes("youtube.com")) {
    console.log("Sent")
    chrome.tabs.sendMessage(tabId, {
      type: "BLUR",
      blurValue: 20,
    });
  }
});
