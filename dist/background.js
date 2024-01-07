(()=>{"use strict";var e={332:(e,o)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.sendClickEventData=void 0,o.sendClickEventData=function(e){chrome.storage.local.get(["trackingEnabled"],(o=>{o.trackingEnabled&&console.log("Sending click event data:",e)}))}},6299:(e,o,n)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.messageListener=void 0;const a=n(2107),s=n(332);o.messageListener=function(){chrome.runtime.onMessage.addListener(((e,o,n)=>{"urlChange"===e.type?(console.log("URL changed to:",e.url),(0,a.sendPageView)(e.url)):"onClick"===e.type&&(console.log("Click event detected:",e.clickData),(0,s.sendClickEventData)(e.clickData))}))}},7699:(e,o,n)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.navigationListener=void 0;const a=n(2107);o.navigationListener=function(){chrome.webNavigation.onCompleted.addListener((e=>{0===e.frameId?(console.log("Main frame navigation completed:",e),(0,a.sendPageView)(e.url)):console.log("Subframe navigation completed, ignored.")}))}},2107:(e,o,n)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.sendPageView=void 0;const a=n(850);o.sendPageView=function(e){chrome.storage.local.get(["trackingEnabled","userAddress"],(o=>{if(console.log("Storage result:",o),console.log("Tracking enabled:",o.trackingEnabled),console.log("User address from storage:",o.userAddress),o.trackingEnabled){const n={url:e};console.log("Sending page view for URL:",e),o.userAddress?(console.log("User address is available:",o.userAddress),(0,a.postDataToServer)(n,"pageView",o.userAddress)):(console.log("User address is not available, not sending user address."),(0,a.postDataToServer)(n,"pageView"))}else console.log("Tracking is disabled, not sending page view.")}))}},850:(e,o)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.postDataToServer=void 0,o.postDataToServer=function(e,o,n){if("pageView"===o){const o={type:"pageView",client_id:"d3859a90-3d1e-44bf-8925-eb14935442c8",event_data:{client_app:"Masa Chrome Extension",client_name:"Masa",page:e.url}};n&&(o.user_address=n),console.log("Payload to be sent:",o),fetch("http://localhost:3008/tracking",{method:"POST",headers:{"Content-Type":"application/json",accept:"application/json"},body:JSON.stringify(o)}).then((e=>{console.log("Data sent successfully:",e)})).catch((e=>{console.error("Error sending data:",e)}))}}}},o={};function n(a){var s=o[a];if(void 0!==s)return s.exports;var t=o[a]={exports:{}};return e[a](t,t.exports,n),t.exports}(()=>{const e=n(7699),o=n(6299);console.log("Background script loaded."),(0,e.navigationListener)(),(0,o.messageListener)()})()})();