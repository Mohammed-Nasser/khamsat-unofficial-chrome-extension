/*////////////////////////////////////////////////
developed by Billal EM (https://khamsat.com/user/billal-em)
github repo https://github.com/billal-em/khamsat-unofficial-chrome-extension
version 1.0.0.0 26/05/2013
////////////////////////////////////////////////*/


	var backPage;
	var items_;
	var notifShowTime = 15;
	var res ="";
	
	function openWebsite(a) {	
			openURL(a.href);
			return false;
		}
	function openURL(uu) {
	
			chrome.tabs.create({
				url: uu
			});			
		}
	
	function init(){
		backPage = chrome.extension.getBackgroundPage();
		items_ = backPage.items;
		notifShowTime_ = backPage.notifShowTime;
		//var content = document.getElementById('content');
		
		for(var i = 0;i<items_.length;i++){
		
			res +='<div class="icon'+(i==0 ? " new" : "")+'"><table>\
					<tr>\
					<td><img width="40" height="40" class="image" src="'+items_[i].img+'"  ></td>\
					<td><a href="'+items_[i].url+'" >\
					'+items_[i].text+ '</a>\
					</td>\
					</tr>\
					</table></div>';
			
			/*res +="<div class='icon'><img src='" + items_[i].img + "'<a onclick='openWebsite(this)' href='" + items_[i].url + "'>" + items_[i].text + "</a></div>";*/
		}
		$('#content').html(res);
		setTimeout(function(){
			close();
		},notifShowTime_ * 1000);
		
	}
$(document).ready(function(){
init();
$('a').click(function(event){
event.preventDefault();
openWebsite(this);
})

});

