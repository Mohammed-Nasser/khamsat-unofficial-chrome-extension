/*////////////////////////////////////////////////
developed by Billal EM (https://khamsat.com/user/billal-em)
github repo https://github.com/billal-em/khamsat-unofficial-chrome-extension
version 1.0.0.0 26/05/2013
////////////////////////////////////////////////*/
var notifUrl = "https://khamsat.com/";
var items = [];
var notifShowTime = 25;
var updateInterval = 15
var doc;

function setParam(key,obj){
localStorage[key] = obj;
}

function getParam(key){
if (!(key in localStorage))
		return undefined;
	try {
		return localStorage[key];
	} catch (ex) {	
	console.error("@getParam" + ex);
		return undefined;
	}
}



function fetchUrl(url, callback) {
	var results = null;
	var html = document.createElement('html');
	var request = new XMLHttpRequest();
	request.open("GET", url + '?rand=' + Math.round(Math.random()*100000), true);
	request.onreadystatechange = function() {
		if (this.readyState == XMLHttpRequest.DONE) {		
				results = this.responseText;
				html.innerHTML = results;
				callback(html);
		}		
	}
	request.send();
	
}

function getNotificationURL() {
	var notifyPageURL = chrome.extension.getURL("notify.html");
	return notifyPageURL;
}


function showNotification() {
	var notifyPageURL = getNotificationURL();
	var notification = webkitNotifications.createHTMLNotification(notifyPageURL);
	notification.show();	
}


function checkNotifsUpdates(nURL) {
	fetchUrl(nURL, function(document) {
		if (document) {	
		
		var lastNotif = getParam('lastNotif');	
		var an = $(document).find('#forum_posts a');
		if(an.length > 0 && lastNotif != $(an[1]).find('li').html()){
			setParam('lastNotif',$(an[1]).find('li').html());
			items = [];
		}else{
			return;
		}
			//parsing
			for(i=1;i<an.length;++i){
				var u,txt,img;
				u = notifUrl + "community/" + an[i].href.split('community/')[1];				
				txt = $(an[i]).find('li').html();
				img = $(an[i]).find('li')[0].style.backgroundImage.replace('url(','').replace(')','');
				items[items.length] = {"url": u,"text": txt , "img" : img};
			}
			if(items.length)
			showNotification();
		}
	});
}


function checkAllNotifs(oneTimeOnly) {
	if(getParam('canNotif') == '1'){		
	try { 
		
		checkNotifsUpdates(notifUrl);
	} catch (ex) {		
		console.error("@checkAllNotifs" + ex);
	}
	}
	setTimeout(checkAllNotifs, 1000 * updateInterval);
}

function init() {
if(getParam('canNotif') === undefined){
setParam('canNotif','1');
}
var canNotif = (getParam('canNotif') == '1' ? true : false);
	if(canNotif){

		chrome.browserAction.setIcon({path:"imgs/icon-128.png"});
		}else{
		chrome.browserAction.setIcon({path:"imgs/icon-128-b.png"});	
		}
	
	checkAllNotifs();
	} 
 

$(document).ready(function(){
init();
});


