var transformRequest = (url, resourceType) => {
  var isMapboxRequest =
    url.slice(8, 22) === "api.mapbox.com" ||
    url.slice(10, 26) === "tiles.mapbox.com";
  return {
    url: isMapboxRequest
      ? url.replace("?", "?pluginName=sheetMapper&")
      : url,
  };
};
 
mapboxgl.accessToken = 'pk.eyJ1IjoiYWZhcm9yZyIsImEiOiJjbDIwajV3YTUwMGc3M2xwNDdiYWJiMjUzIn0.Pjt9AndPk1Axv99wez-5TA';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-102.182698, 37.131563],
    zoom: 3,
   
    //left, bottom, right, top
});

var nav = new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: true
      });

map.addControl(nav, "bottom-right");



$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: 'https://docs.google.com/spreadsheets/d/1umfhXq5WEPLEABV81-tZUayAw7WZrmqe/gviz/tq?tqx=out:csv&sheet=Sheet1',
    dataType: "text",
    success: function (csvData) { makeGeoJSON(csvData); }
  });



  function makeGeoJSON(csvData) {
    csv2geojson.csv2geojson(csvData, {
      latfield: 'Latitude',
      lonfield: 'Longitude',
      delimiter: ','
    }, function (err, data) {
      map.on('load', function () {

        map.addLayer({
          'id': 'rfovProjects',
          'type': 'circle',
          'source': {
            'type': 'geojson',
            'data': data
          },
          'paint': {
            'circle-radius': 7,
            'circle-color': "blue",
            'circle-opacity': 0.5,
          }
        });

      });

    });
  };
});

map.on('mouseenter', 'rfovProjects', function () {
  map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'rfovProjects', function () {
  map.getCanvas().style.cursor = '';
});


map.on('click', function(e) {

    if(!e.originalEvent.defaultPrevented) {
      e.originalEvent.preventDefault();
    }

    var features = map.queryRenderedFeatures(e.point, {
        layers: ['rfovProjects']
    });

    if (!features.length) {
        return;
    }

    var feature = features[0];

    var popupContent = '<h3 style="display:inline">' + feature.properties.Name + '</h3><br><p style="display:inline"><b>'
    /*popupContent += feature.properties.time ? '</b>, ' + feature.properties.time : '</b>'*/ 
    popupContent += '<br> <a href=" ' + feature.properties.Website + ' " target="_blank" rel="noopener noreferrer">Website Link</a> </p>'

    var popup = new mapboxgl.Popup({ offset: [0, 0] })
        .setLngLat(e.lngLat)
        .setHTML(popupContent)
        .addTo(map);
});


//basemap toggles
/*
var tRadio = document.getElementById('topoRadio');
tRadio.addEventListener('change', function() {
  if (this.checked) {
    map.setLayoutProperty('mapbox-satellite', 'visibility', 'none');
  }
});

var iRadio = document.getElementById('imageryRadio');
iRadio.addEventListener('change', function() {
  if (this.checked) {
    map.setLayoutProperty('mapbox-satellite', 'visibility', 'visible');
  }
});*/
//
map.doubleClickZoom.enable();
map.on('dblclick', function(e) {
map.getZoom() +10;
});
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,


    mapboxgl: mapboxgl,

    flyTo: {
      zoom: 12,
      easing: function(t) {
        return t;
      }
    },

    marker: false

  })
);

map.addControl(new mapboxgl.NavigationControl());

var filters = {};

function updateFilters() {
  var compositeFilter = ['Program'];
  for (let filterValue in filters) {
    if (filters[filterValue]) {
      compositeFilter.push(['==', ['get', filterValue], 'Nathan Shock Centers of Excellence in the Basic Biology of Aging']);
    }
  }
  if (compositeFilter.length > 1)
    map.setFilter('rfovProjects', compositeFilter);
  else {
    map.setFilter('rfovProjects', null);
  }
}

var checkbox = document.getElementById('Nathan');
checkbox.addEventListener('change', function() {
  filters['Program'] = this.checked;
  updateFilters();
});

var checkbox = document.getElementById('Pepper');
checkbox.addEventListener('change', function() {
  filters['Program'] = this.checked;
  updateFilters();
});

var checkbox = document.getElementById('Aging');
checkbox.addEventListener('change', function() {
  filters['Program'] = this.checked;
  updateFilters();
});
var checkbox = document.getElementById('Minority');
checkbox.addEventListener('change', function() {
  filters['Program'] = this.checked;
  updateFilters();
});

