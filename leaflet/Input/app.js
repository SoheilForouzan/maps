
        // Set up initial map center and zoom level
        var map = L.map('map', {
          center: [35.69439, 51.42151], // EDIT latitude, longitude to re-center map
          zoom: 15,  // EDIT from 1 to 18 -- decrease to zoom out, increase to zoom in
          scrollWheelZoom: true,
          tap: false
      });

      /* Control panel to display map layers */
      var controlLayers = L.control.layers(null, null, {
          position: "topright",
          collapsed: false
      }).addTo(map);

      // display Carto basemap tiles with light features and labels
      var light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
      }).addTo(map); // EDIT - insert or remove ".addTo(map)" before last semicolon to display by default
      controlLayers.addBaseLayer(light, 'سفید');

      /* Stamen colored terrain basemap tiles with labels */
      var terrain = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
          attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
      }); // EDIT - insert or remove ".addTo(map)" before last semicolon to display by default
      controlLayers.addBaseLayer(terrain, 'رنگی');

      // see more basemap options at https://leaflet-extras.github.io/leaflet-providers/preview/

      // Read markers data from data.csv

      // For each row in data, create a marker and add it to the map
      // For each row, columns `Latitude`, `Longitude`, and `Title` are required
      var marker = L.marker([35.69439, 51.42151], {
          opacity: .5,
          draggable: 'true'
      }).bindPopup("hi");

      marker.on('dragend', function(event) {
          var position = marker.getLatLng();
          marker.setLatLng(position, {
              draggable: 'true'
          }).bindPopup(position).update();
          $("#lat").val(position.lat);
          $("#long").val(position.lng).keyup();
          });
      
          $("#lat, #long").change(function() {
          var position = [parseInt($("#lat").val()), parseInt($("#long").val())];
          marker.setLatLng(position, {
              draggable: 'true'
          }).bindPopup(position).update();
          map.panTo(position);
      });

      marker.addTo(map);
      map.attributionControl.setPrefix(
          'From <a href="https://github.com/HandsOnDataViz/leaflet-map-csv" target="_blank">Iranian Salons</a>'
      );
