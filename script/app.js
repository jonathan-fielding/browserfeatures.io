'use strict';

var embedTemplate = require('../templates/embed-code.html');

fetch('//api.browserfeatures.io/v1/feature', {
    method: 'get'
}).then(function(response){
    return response.json();
}).then(function(json) {
    var selectBox = document.getElementById('embed-select');
        var embedCode = document.getElementById('embed-code');

    json.features.forEach(function(feature){
    	var element=document.createElement('option');
    	var textnode = document.createTextNode(feature);         // Create a text node
		element.appendChild(textnode); 
        element.value=feature;

        selectBox.appendChild(element);
    });

    embedCode.value = embedTemplate.render({
        selected: json.features[0]
    });
    
    selectBox.addEventListener('change', function(e){
        embedCode.value = embedTemplate.render({
            selected: this.value
        });
    });
});

