(function(window, document, undefined){
	'use strict';

	var embeds = Array.prototype.slice.call(document.querySelectorAll(".__bfEmbed__"));

	embeds.map(function(embed){
		var iframeId = 'bfEmbed' + Math.ceil(Math.random() * 10000000000);
		var iframe=document.createElement('iframe');
        iframe.src=embed.href + '&id=' + iframeId;
        iframe.style.border = '0';
        iframe.width = '100%';
        iframe.id = iframeId;
        embed.parentNode.insertBefore(iframe,embed);
        embed.remove();
	});

	// Create IE + others compatible event handler
	var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
	var eventer = window[eventMethod];
	var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

	// Listen to message from child window
	eventer(messageEvent,function(e) {
		if (typeof e.data === 'string') {
			var data = JSON.parse(e.data);
			var iframe = document.getElementById(data.id);

			iframe.height = data.height;
		}
	},false);

})(window, document, undefined);