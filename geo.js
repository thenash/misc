var map, infobox, covidLayer, synhLayer;
var synhData = './synhlocations.geojson';
var covidData = './covid.geojson';

function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {
        zoom: 2
    });

    //Create an infobox.
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });
    infobox.setMap(map);


    //Create a layer to add the GeoJSON data to.
    covidLayer = new Microsoft.Maps.Layer();
    synhLayer = new Microsoft.Maps.Layer();
    map.layers.insert(covidLayer);
    map.layers.insert(synhLayer);

    //Add click event to the layer.
    Microsoft.Maps.Events.addHandler(covidLayer, 'click', showInfobox);
    Microsoft.Maps.Events.addHandler(synhLayer, 'click', showInfobox2);

    //Load the GeoJSON module and read the GeoJSON feed.
    Microsoft.Maps.loadModule('Microsoft.Maps.GeoJson', function() {
        // var tools = new Microsoft.Maps.DrawingTools(map);

        Microsoft.Maps.GeoJson.readFromUrl(covidData, function(shapes) {
            //Add shapes to the layer.
            covidLayer.add(shapes);
        });
        /*
        Microsoft.Maps.GeoJson.readFromUrl(synhData, function(shapes) {
            //Add shapes to the layer.
            synhLayer.add(shapes);
        });
        */
    });
}

function showInfobox(e) {
    var shape = e.target; //Get the clicked shape.
    var loc = e.location; //Default to the location of the mouse event to show the infobox.

    //If the shape is a pushpin, use it's location to display the infobox.
    if (shape instanceof Microsoft.Maps.Pushpin) {
        loc = shape.getLocation();
    }

    //Display the infoboc
    infobox.setOptions({
        location: loc,
        title: shape.metadata.confirmed + "\n" + shape.metadata.deaths + "\n" + shape.metadata.recovered + "\n" + shape.metadata.active,
        visible: true
    });
}

function showInfobox2(e) {
    var shape = e.target; //Get the clicked shape.
    var loc = e.location; //Default to the location of the mouse event to show the infobox.

    //If the shape is a pushpin, use it's location to display the infobox.
    if (shape instanceof Microsoft.Maps.Pushpin) {
        loc = shape.getLocation();
    }

    //Display the infoboc
    infobox.setOptions({
        location: loc,
        title: shape.metadata.office_address,
        visible: true
    });
}