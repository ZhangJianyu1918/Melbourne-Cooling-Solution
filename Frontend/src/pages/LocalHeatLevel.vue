<template>
  <div class="container">
    <div style="height: 50px;"></div>
    <h2>This is local heat level page</h2>
    <div style="height: 20px;"></div>
    <p style="font-size: 22px;">
      Explore real-time heat in City of Melbourne local areas and find the nearest shaded, cooling spaces and public
      centres.
      Type your area name into the search bar and click on the icon on the map for more information.
    </p>
    <div>
      <!-- 搜索框 -->
      <div style="margin-bottom: 10px; text-align: center;">
        <input ref="searchInput" placeholder="Please Input"
          style="width: 600px; padding: 8px; font-size: 16px; height: 60px; border-radius: 20px; border: 1px solid #dcdfe6;" />
        <el-button @click="searchPlace" type="primary" plain
          style="padding: 8px 16px; margin-left: 10px; height: 45px;">
          Search
        </el-button>
      </div>
      <div style="height: 20px;"></div>
      <!-- 地图容器 -->
      <div class="google-map" ref="map"></div>
    </div>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';
import waterBottleIcon from '@/assets/water-bottle.png';
import frostIcon from '@/assets/frost.png'

export default {
  name: 'GoogleMap',
  data() {
    return {
      map: null,
      google: null,
      marker: null,
      autocomplete: null,
      directionsService: null,
      directionsRenderer: [],
      weather: {
        temp: null,
        humidity: null,
        description: null,
        icon: null,
        loading: false
      },
      routePolylines: [],
      routeInfoWindow: null,
      markers: []
    };
  },
  async mounted() {
    await this.initMap();
  },
  methods: {
    // Add this new method
    async fetchWeatherData(lat, lng) {
      this.weather.loading = true;
      try {
        // Replace with your API key
        const API_KEY = '7ee007781b59c818c0ddd4f14ecfe857';
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Weather data request failed');
        }

        const data = await response.json();

        this.weather = {
          temp: Math.round(data.main.temp),
          humidity: data.main.humidity,
          description: data.weather[0].description,
          icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          loading: false
        };

        // Create or update weather overlay
        this.updateWeatherOverlay();
      } catch (error) {
        console.error('Error fetching weather data:', error);
        this.weather.loading = false;
      }
    },

    updateWeatherOverlay() {
      // Create weather info card on the map
      const weatherDiv = document.createElement('div');
      weatherDiv.className = 'weather-card';

      // Use the current date (you can adjust the format as needed)
      const currentDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      // Assuming the place name is available (you might need to store the place name in data)
      const placeName = this.marker?.title || 'Melbourne'; // Fallback to 'Melbourne' if no marker title

      // Create the weather card HTML with styling similar to the image
      weatherDiv.innerHTML = `
        <div class="weather-content" style="background-color: rgb(255, 255, 255); display: flex;
          flex-direction: column; gap: 5px;   border-radius: 15px;
          padding: 15px;
          margin: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          width: 200px;">
          <h3 class="place-name" style="  font-size: 18px;font-weight: bold;color: #19619e;margin: 0;">${placeName}</h3>
          <p class="date" style="  font-size: 14px; color: #333; margin: 0;">${currentDate}</p>
          <div class="temp">${this.weather.temp}°C</div>
          <button class="shade-button" id="find-shaded-area" style="  background-color: #ff4d4d;color: white;border: none;border-radius: 20px;padding: 8px 16px;font-size: 14px;font-weight: bold;cursor: pointer;margin-top: 10px; hover: #e04343;">Find shaded area!</button>
        </div>
      `;

      // Remove existing weather control if it exists
      if (this.weatherControl) {
        this.map.controls[this.google.maps.ControlPosition.BOTTOM_LEFT].clear();
      }

      // Add the weather div to the bottom-left of the map
      this.weatherControl = weatherDiv;
      this.map.controls[this.google.maps.ControlPosition.BOTTOM_LEFT].push(weatherDiv);
    },

    async initMap() {
      const loader = new Loader({
        apiKey: 'AIzaSyC8ZRwMu4odONGFCfbUCIQblmDS0itPV_Y',
        version: 'quarterly',
        libraries: ['places', 'geometry'],
      });

      try {
        this.google = await loader.load();
        const MelbourneCenter = { lat: -37.8136, lng: 144.9631 }
        this.map = new this.google.maps.Map(this.$refs.map, {
          center: MelbourneCenter,
          zoom: 13,
        });

        this.fetchWeatherData(MelbourneCenter.lat, MelbourneCenter.lng)

        this.autocomplete = new this.google.maps.places.Autocomplete(
          this.$refs.searchInput
        );
        this.autocomplete.addListener('place_changed', () => {
          const place = this.autocomplete.getPlace();
          if (place.geometry) {
            this.updateMap(place);
          } else {
            console.log('No details available for input: ' + place.name);
          }
        });
        this.directionsService = new this.google.maps.DirectionsService();
        // this.directionsRenderer = new this.google.maps.DirectionsRenderer();
        // this.directionsRenderer.setMap(this.map);

        this.loadMelbourneBoundary()
        this.loadDrinkingFountains()
        this.loadCoolingPlaces()
      } catch (error) {
        console.error('Failed to load Google Maps API:', error);
      }
    },

    async loadMelbourneBoundary() {
      try {
        const response = await fetch(
          'https://data.melbourne.vic.gov.au/api/explore/v2.1/catalog/datasets/municipal-boundary/records?limit=20'
        );
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
          console.error('The data is empty.');
          return;
        }

        // 提取 GeoJSON 坐标
        const geoJsonData = {
          type: "FeatureCollection",
          features: data.results.map(item => ({
            type: "Feature",
            geometry: item.geo_shape.geometry,
            properties: item.geo_shape.properties || {}
          }))
        };

        // Add GeoJSON data to the map
        this.map.data.addGeoJson(geoJsonData);

        // Optionally, you can set styling for the polygons here
        this.map.data.setStyle({
          fillColor: '#FF0000',
          fillOpacity: 0.3,
          strokeWeight: 2
        });

      } catch (error) {
        console.error('Error Message:', error);
      }
    },
    async loadDrinkingFountains() {
      try {
        const response = await fetch(
          'https://03c5tdcr17.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_drinking_foundtains'
        );
        const data = await response.json();

        if (!data || data.length === 0) {
          console.error('No drinking fountain data found');
          return;
        }

        const image = new Image();
        image.src = waterBottleIcon; // Assuming waterBottleIcon is the image URL or import

        image.onload = () => {
          const radius = 15; // Half of the 30x30 size
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          canvas.width = radius * 2 + 4; // Add space for border
          canvas.height = radius * 2 + 4; // Add space for border

          // Create white circle boundary
          context.beginPath();
          context.arc(radius + 2, radius + 2, radius + 2, 0, 2 * Math.PI); // Adjusted to create space for the border
          context.fillStyle = 'white';
          context.fill();

          // Create circular clipping path
          context.beginPath();
          context.arc(radius + 2, radius + 2, radius, 0, 2 * Math.PI);
          context.clip();

          // Draw the image onto the canvas
          context.drawImage(image, 0, 0, image.width, image.height, 2, 2, canvas.width - 4, canvas.height - 4);

          const markerIcon = {
            url: canvas.toDataURL(), // Convert canvas to image data URL
            scaledSize: new this.google.maps.Size(30, 30), // Ensure the size remains 30x30
            anchor: new this.google.maps.Point(radius, radius), // Center the image
          };


          data.forEach((fountain) => {
            if (fountain) {
              const position = {
                lat: Number(fountain.lat),
                lng: Number(fountain.lon),
                description: fountain.Description
              };
              const marker = new this.google.maps.Marker({
                position,
                map: this.map,
                title: 'Drinking Fountain',
                icon: markerIcon
              });

              const infoWindow = new this.google.maps.InfoWindow({
                content: `<p><strong>${position.description}</strong></p>`,
              });

              marker.addListener('click', () => {
                infoWindow.open(this.map, marker);
              });

              this.markers.push(marker);
            }
          });
        }
      } catch (error) {
        console.error('Error fetching drinking fountain data:', error);
      }
    },

    async loadCoolingPlaces() {
      try {
        const response = await fetch('https://03c5tdcr17.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_cooling_place', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const data = await response.json();
        const places = JSON.parse(data.body);

        if (!places || !Array.isArray(places)) {
          console.error('Parsed data is not an array:', places);
          return [];
        }
        if (!data) {
          console.error('Invalid response data');
          return [];
        }
        const image = new Image();
        image.src = frostIcon; // Assuming waterBottleIcon is the image URL or import

        image.onload = () => {
          const radius = 15; // Half of the 30x30 size
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          canvas.width = radius * 2 + 4; // Add space for border
          canvas.height = radius * 2 + 4; // Add space for border

          // Create white circle boundary
          context.beginPath();
          context.arc(radius + 2, radius + 2, radius + 2, 0, 2 * Math.PI); // Adjusted to create space for the border
          context.fillStyle = 'white';
          context.fill();

          // Create circular clipping path
          context.beginPath();
          context.arc(radius + 2, radius + 2, radius, 0, 2 * Math.PI);
          context.clip();

          // Draw the image onto the canvas
          context.drawImage(image, 0, 0, image.width, image.height, 2, 2, canvas.width - 4, canvas.height - 4);

          const markerIcon = {
            url: canvas.toDataURL(), // Convert canvas to image data URL
            scaledSize: new this.google.maps.Size(30, 30), // Ensure the size remains 30x30
            anchor: new this.google.maps.Point(radius, radius), // Center the image
          };


          places.map((place) => {
            if (place) {
              const position = {
                lat: Number(place.Latitude),
                lng: Number(place.Longitude),
                description: place["Place Name"]
              };

              const marker = new this.google.maps.Marker({
                position,
                map: this.map,
                title: 'Cooling Place',
                icon: markerIcon
              });

              const infoWindow = new this.google.maps.InfoWindow({
                content: `<p><strong>${position.description}</strong></p>`,
              });

              marker.addListener('click', () => {
                infoWindow.open(this.map, marker);
              });

              this.markers.push(marker);
            }
          });
        }
      } catch (error) {
        console.error('Error parsing API data:', error);
        return [];
      }
    },
    searchPlace() {
      const input = this.$refs.searchInput?.value;
      if (!input) {
        alert('Please enter a search term');
        return;
      }

      const service = new this.google.maps.places.PlacesService(this.map);
      service.textSearch(
        {
          query: input,
          bounds: this.map.getBounds(),
        },
        (results, status) => {
          if (status === this.google.maps.places.PlacesServiceStatus.OK && results[0]) {
            this.updateMap(results[0]);
          } else {
            alert('No results found');
          }
        }
      );
    },
    updateMap(place) {
      const location = place.geometry.location;
      this.fetchWeatherData(location.lat(), location.lng())
      this.map.setCenter(location);
      this.map.setZoom(15);

      if (this.marker) {
        this.marker.setMap(null);
      }

      this.marker = new this.google.maps.Marker({
        position: location,
        map: this.map,
        title: place.name,
      });
      

      const navButton = document.createElement("button");
      navButton.innerText = "Navigate Here";
      navButton.style = "background: #19619e; color: white; padding: 10px; border: none; border-radius: 10px; cursor: pointer; margin-top: 10px;";
      navButton.onclick = () => this.calculateRoute(location);

      const infoWindow = new this.google.maps.InfoWindow({
        content: navButton
      });

      this.marker.addListener("click", () => {
        infoWindow.open(this.map, this.marker);
      });
    },
    calculateRoute(destination) {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition((position) => {
        const origin = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        const request = {
          origin: origin,
          destination: destination,
          travelMode: this.google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
        };

        this.directionsService.route(request, (result, status) => {
          if (status === this.google.maps.DirectionsStatus.OK) {
            this.clearPreviousRoutes();
            this.markerCount = 0;
            result.routes.forEach((route, index) => {
              const currentColor = this.getRandomColor()

              const render = new google.maps.DirectionsRenderer({
                map: this.map,
                directions: result,
                routeIndex: index,
                polylineOptions: {
                  strokeColor: currentColor,
                  strokeWeight: 4,
                },
                suppressMarkers: false,
                directions: result
              });
              
              
              this.directionsRenderer.push(render);

              const polyline = new google.maps.Polyline({
                path: route.overview_path,
                strokeColor: currentColor,
                strokeWeight: 8,
                map: this.map,
              });
              
              const count = this.countMarkersOnRoute(polyline.getPath());

              polyline.addListener("click", (event) => {
                this.showRouteInfoWindow(event, route, count);
              });
              render.addListener("click", (event) => {
                this.showRouteInfoWindow(event, route, count);
              });

            });
          } else {
            alert("Directions request failed due to " + status);
          }
        });
      },
        () => {
          alert("Unable to retrieve your location.");
        }
      );
    },
    countMarkersOnRoute(routePath) {
      let count = 0;

      // Iterate over existing markers
      this.markers.forEach((marker) => {
        const markerPosition = marker.getPosition();

        // Check if marker is within the route polyline
        routePath.forEach((pathPoint) => {
          // Check if the marker is near the route (within a certain tolerance)
          const distance = google.maps.geometry.spherical.computeDistanceBetween(markerPosition, pathPoint);
          // console.log(`Distance from marker to path point: ${distance} meters`);
          if (distance < 100) { // You can adjust the tolerance distance
            count++;
          }
        });
      });

      console.log(`Number of markers near the route: ${count}`);
      return count;
    },
    clearPreviousRoutes() {
      this.directionsRenderer.forEach(render => render.setMap(null));
      this.directionsRenderer = [];

      this.routePolylines.forEach(polyline => polyline.setMap(null));
      this.routePolylines = [];

      if (this.routeInfoWindow) {
        this.routeInfoWindow.close();
      }
    },

    getRandomColor() {
      const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFA500", "#800080"];
      return colors[Math.floor(Math.random() * colors.length)];
    },

    showRouteInfoWindow(event, route, count) {
      if (this.routeInfoWindow != null) {
        this.routeInfoWindow.close();
      }
      const leg = route.legs[0]; // 只取第一段路线
      const distance = leg.distance.text;
      const duration = leg.duration.text;
      const startAddress = leg.start_address;
      const endAddress = leg.end_address;

      this.routeInfoWindow = new google.maps.InfoWindow({
        content: `<div>
                <strong>Route Detail</strong><br>
                <strong>From:</strong> ${startAddress} <br>
                <strong>To:</strong> ${endAddress} <br>
                <strong>Distance:</strong>: ${distance} <br>
                <strong>Duration:</strong>: ${duration} <br>
                <strong>The Number of the Drinking Foundtains and Cooling Places:</strong>: ${count}
              </div>`,
        position: event.latLng,
      });

      this.routeInfoWindow.open(this.map);
    }
  },

};
</script>

<style scoped>
div {
  width: 100%;
}

h2 {
  color: #19619e;
  font-size: 3rem;
  font-weight: bold;
  font-family: 'Abril Fatface';
}

.google-map {
  justify-content: center;
  height: 500px;
  border-radius: 35px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.weather-card {


  /* Adjust width as needed */
}

.weather-content {}

.place-name {}

.date {}

.temp {
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin: 5px 0;
}

.shade-button {}

.shade-button:hover {}
</style>
