/*////////////////////////////////////////////////
developed by Billal EM (https://khamsat.com/user/billal-em)
github repo https://github.com/billal-em/khamsat-unofficial-chrome-extension
version 1.0.0.0 26/05/2013
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
var slug1 = "إيقاف التنيهات";
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
init();
});
});