'use strict';

fetch('//api.browserfeatures.io/v1/feature', {
    method: 'get'
}).then(function(response){
    return response.json();
}).then(function(json) {
    var selectBox = document.getElementById('embed-select');

    json.features.forEach(function(feature){
    	var element=document.createElement('option');
    	var textnode = document.createTextNode(feature);         // Create a text node
		element.appendChild(textnode); 
        element.value=feature;

        selectBox.appendChild(element)
    });
});