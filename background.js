// var urlRegex = /https?:\/\/([^\.]+\.)?flipkart.com/;
// chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
//     if (info.url && urlRegex.test(info.url)) {
//          The tab with ID `tabId` has been updated to a URL
//          * in the `google.com` domain. Let's do something... 
//         console.log("savedsdf sd sdf sd sdf asdf");
//         chrome.pageAction.show(tabId);
//     }
// });

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   console.log(tab.url);
//   // if (tab.url.indexOf('.geeksforgeeks.org')) {
//     chrome.pageAction.show(tab.id);
//   // }
// });



// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
// If the tabs url starts with "http://specificsite.com"...
console.log(tab.url);
if (tab.url.indexOf('http://www.geeksforgeeks.org') == 0) {
// ... show the page action.
chrome.pageAction.show(tabId);
}
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);


// // Show page action icon in omnibar.
// function showPageAction( tabId, changeInfo, tab ) {
//     chrome.pageAction.show(tabId);
// };
// // Call the above function when the url of a tab changes.
// chrome.tabs.onUpdated.addListener(showPageAction);