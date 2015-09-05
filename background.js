// var urlRegex = /https?:\/\/([^\.]+\.)?flipkart.com/;
// chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
//     if (info.url && urlRegex.test(info.url)) {
//          The tab with ID `tabId` has been updated to a URL
//          * in the `google.com` domain. Let's do something... 
//         console.log("savedsdf sd sdf sd sdf asdf");
//         chrome.pageAction.show(tabId);
//     }
// });

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (~tab.url.indexOf('.flipkart.com')) {
    chrome.pageAction.show(tabId);
  }
});