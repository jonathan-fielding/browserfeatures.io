var tableTemplate = require('../templates/compatability-table.html');
var feature = getParameterByName('feature');
var browsers = getParameterByName('browsers');
var iframeId = getParameterByName('id');
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];

if (feature) {
    fetch('//api.browserfeatures.io/v1/feature/' + feature, {
        method: 'get'
    }).then(function(response){
        return response.json();
    }).then(function(json) {
        document.getElementById('main').innerHTML = tableTemplate.render(json);
        setHeight();
    });
}

if (window.parent) {
    setHeight();
}

eventer('resize', setHeight);

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function setHeight() {
    window.parent.postMessage(JSON.stringify({
        id: iframeId,
        height: document.documentElement.offsetHeight
    }), '*');
}