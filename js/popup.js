/*////////////////////////////////////////////////
developed by Billal EM (https://khamsat.com/user/billal-em)
github repo https://github.com/billal-em/khamsat-unofficial-chrome-extension
version 1.0.1.0 26/05/2013
////////////////////////////////////////////////*/


function setParam(key,obj){
localStorage[key] = obj;
}

function getParam(key){
if (!(key in localStorage)){		
		return undefined;		
		}
	try {
		return localStorage[key];
	} catch (ex) {	
	console.error("@getParam" + ex);		
		return undefined;
		}
}
function init(){
if(getParam('canNotif') === undefined){
setParam('canNotif','1');
}
var canNotif = (getParam('canNotif') == '1' ? true : false);
var slug ="";
var slug1 = "إيقاف التنبيهات";
var slug2 = "تشغيل التنبيهات";
if(canNotif){
slug =slug1;
chrome.browserAction.setIcon({path:"imgs/icon-128.png"});
}else{
chrome.browserAction.setIcon({path:"imgs/icon-128-b.png"});
slug = slug2;
}

$("#notifs").text(slug);

}

$(document).ready(function(){
init();
$("#currentNotifs").click(function(event){
event.preventDefault();
var backPage = chrome.extension.getBackgroundPage();
backPage.showNotification();
});

$("#notifs").click(function(event){
event.preventDefault();
setParam('canNotif',(getParam('canNotif') == '1' ? '0' : '1'));
var backPage = chrome.extension.getBackgroundPage();
backPage.checkAllNotifs(true);

init();
});
});

//google-analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-41255300-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

