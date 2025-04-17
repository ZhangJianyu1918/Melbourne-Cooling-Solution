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
        <!-- Search box -->
        <div style="margin-bottom: 10px; text-align: center;">
          <input ref="searchInput" v-model="searchText" placeholder="Please Type In Your Area Name" type="text"
            style="width: 100%; max-width: 600px; padding: 8px; font-size: 16px; height: 60px; border-radius: 20px; border: 1px solid #dcdfe6;" />
          <el-button @click="searchPlace" type="primary" plain
            style="padding: 8px 16px; margin-left: 10px; height: 45px;">
            Search
          </el-button>
        </div>
        <div style="height: 20px;"></div>
  
        <div class="google-map" ref="mapElement"></div>
        <WeatherCard :temp="weather.temp" :placeName="marker?.title" :icon="weather.icon" @find-shade="findShadedArea" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, reactive } from 'vue';
  import { Loader } from '@googlemaps/js-api-loader';
  import waterBottleIcon from '@/assets/water-bottle.png';
  import frostIcon from '@/assets/frost.png';
  import WeatherCard from '../components/WeatherCard.vue';
  import validateAndSanitize from '../js/validation';
  import decryptData from '@/js/decryption';
  import axios from 'axios';
  
  // Reactive state
  const searchText = ref('');
  const mapElement = ref(null);
  const searchInput = ref(null);
  let map = null;
  let google = null;
  let marker = ref(null);
  let autocomplete = null;
  let directionsService = null;
  const directionsRenderer = ref([]);
  const weather = reactive({
    temp: null,
    humidity: null,
    description: null,
    icon: null,
    loading: false
  });
  const routePolylines = ref([]);
  let routeInfoWindow = null;
  const markers = ref([]);
  let circle = null;
  let melbourneBounds = null;
  let infoWindow = null;
  let render = null;
  let polyline = null;
  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  
  // Initialize map on component mount
  onMounted(async () => {
    await initMap();
  });
  
  // Methods
  const fetchWeatherData = async (lat, lng) => {
    weather.loading = true;
    try {
      // Replace with your API key
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${WEATHER_API_KEY}`
      );
  
      if (!response.ok) {
        throw new Error('Weather data request failed');
      }
  
      const data = await response.json();
  
      weather.temp = Math.round(data.main.temp);
      weather.humidity = data.main.humidity;
      weather.description = data.weather[0].description;
      weather.icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weather.loading = false;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      weather.loading = false;
    }
  };
  
  const initMap = async () => {
    const loader = new Loader({
      apiKey: GOOGLE_API_KEY,
      version: 'quarterly',
      libraries: ['places', 'geometry'],
    });
  
    try {
      google = await loader.load();
      const MelbourneCenter = { lat: -37.8136, lng: 144.9631 };
      map = new google.maps.Map(mapElement.value, {
        center: MelbourneCenter,
        zoom: 13,
      });
  
      infoWindow = new google.maps.InfoWindow()
      melbourneBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-37.906, 144.862), // 西南角
        new google.maps.LatLng(-37.754, 145.056)  // 东北角
      );
  
      fetchWeatherData(MelbourneCenter.lat, MelbourneCenter.lng);
  
      autocomplete = new google.maps.places.Autocomplete(searchInput.value, {
        bounds: melbourneBounds,
        strictBounds: true,
        componentRestrictions: { country: 'au' },
        types: ['geocode', 'establishment']
      });
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          searchText.value = place.name
          updateMap(place);
        } else {
          console.log('No details available for input: ' + place.name);
        }
      });
      directionsService = new google.maps.DirectionsService();
  
      map.addListener("click", (event) => handleMapClick(event));
    } catch (error) {
      console.error('Failed to load Google Maps API:', error);
    }
  };
  
  const handleMapClick = async (event) => {
    if (!event || !event.latLng) {
      console.error('Event or event.latLng is undefined');
      return;
    }
    const clickedLocation = event.latLng;
    const lat = clickedLocation.lat();
    const lng = clickedLocation.lng();
  
    // Clear previous markers and circle
    clearMarkersAndCircle();
  
    // Draw a 300 meter circle
    circle = new google.maps.Circle({
      strokeColor: "#00BFFF",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#87CEFA",
      fillOpacity: 0.35,
      map: map,
      center: clickedLocation,
      radius: 300 // 300 meters radius
    });
  
    // Get nearby places
    await fetchNearbyPlaces(lat, lng);
  };
  
  const clearMarkersAndCircle = () => {
    if (circle) {
      circle.setMap(null);
      circle = null;
    }
  
    // Clear all markers
    markers.value.forEach((icon) => {
      icon.setVisible(false);
      icon.setMap(null);
      icon = null;
    });
    markers.value = [];
    markers.value.length = 0;
  };
  
  const fetchNearbyPlaces = async (latitude, longitude) => {
    loadDrinkingFountains(latitude, longitude);
    loadCoolingPlaces(latitude, longitude);
  };
  
  const loadMelbourneBoundary = async () => {
    try {
      const response = await fetch(
        'https://data.melbourne.vic.gov.au/api/explore/v2.1/catalog/datasets/municipal-boundary/records?limit=20'
      );
      const data = await response.json();
  
      if (!data.results || data.results.length === 0) {
        console.error('The data is empty.');
        return;
      }
  
      // Extract GeoJSON coordinates
      const geoJsonData = {
        type: "FeatureCollection",
        features: data.results.map(item => ({
          type: "Feature",
          geometry: item.geo_shape.geometry,
          properties: item.geo_shape.properties || {}
        }))
      };
  
      // Add GeoJSON data to the map
      map.data.addGeoJson(geoJsonData);
  
      // Set styling to display only borders (no fill)
      map.data.setStyle({
        fillOpacity: 0,            // Hide the fill by setting opacity to 0
        strokeColor: '#FF0000',    // Border color
        strokeOpacity: 1,          // Border opacity
        strokeWeight: 3            // Border thickness
      });
    } catch (error) {
      console.error('Error Message:', error);
    }
  };
  
  const loadDrinkingFountains = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        'https://03c5tdcr17.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_drinking_foundtains'
      );
      // console.log(response.data.data);
      
      // const data = JSON.parse(response.data.data);
      const data = response.data.data;
      if (!data || data.length === 0) {
        console.error('No drinking fountain data found');
        return;
      }
      let decrypt_data = decryptData(data);
      console.log(decrypt_data);
      // let decrypt_data = data;
      const image = new Image();
      image.src = waterBottleIcon;
  
      image.onload = () => {
        const radius = 15; // Half of the 30x30 size
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
  
        canvas.width = radius * 2 + 4; // Add space for border
        canvas.height = radius * 2 + 4; // Add space for border
  
        // Create white circle boundary
        context.beginPath();
        context.arc(radius + 2, radius + 2, radius + 2, 0, 2 * Math.PI);
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
          scaledSize: new google.maps.Size(30, 30), // Ensure the size remains 30x30
          anchor: new google.maps.Point(radius, radius), // Center the image
        };
  
        for (let i = 0; i < decrypt_data.length; i++) {
          const fountain = decrypt_data[i];
          const distance = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(latitude, longitude),
            new google.maps.LatLng(fountain.lat, fountain.lon)
          );
  
          if (distance > 300) {
            continue;
          }
          if (fountain) {
            const position = {
              lat: Number(fountain.lat),
              lng: Number(fountain.lon),
              description: fountain.Description
            };
            const markerInstance = new google.maps.Marker({
              position,
              map: map,
              title: 'Drinking Fountain',
              icon: markerIcon
            });
  
            markerInstance.addListener('click', () => {
              infoWindow.setContent(`<p><strong>${position.description}</strong></p>`);
              infoWindow.open(map, markerInstance);
            });
  
            markers.value.push(markerInstance);
          }
        }
      };
    } catch (error) {
      console.error('Error fetching drinking fountain data:', error);
    }
  };
  
  const loadCoolingPlaces = async (latitude, longitude) => {
    try {
      const response = await fetch('https://03c5tdcr17.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_cooling_place', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
  
      let decrypt_data;
      if (typeof data === 'string') {
        decrypt_data = JSON.parse(decryptData(data.body));
      } else {
        decrypt_data = decryptData(data.body);
      }
  
      const places = decrypt_data;
  
      if (!places || !Array.isArray(places)) {
        console.error('Parsed data is not an array:', places);
        return [];
      }
      if (!data) {
        console.error('Invalid response data');
        return [];
      }
  
      const image = new Image();
      image.src = frostIcon;
  
      image.onload = () => {
        const radius = 15; // Half of the 30x30 size
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
  
        canvas.width = radius * 2 + 4; // Add space for border
        canvas.height = radius * 2 + 4; // Add space for border
  
        // Create white circle boundary
        context.beginPath();
        context.arc(radius + 2, radius + 2, radius + 2, 0, 2 * Math.PI);
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
          scaledSize: new google.maps.Size(30, 30), // Ensure the size remains 30x30
          anchor: new google.maps.Point(radius, radius), // Center the image
        };
  
        for (let i = 0; i < places.length; i++) {
          const place = places[i];
          if (place) {
            const distance = google.maps.geometry.spherical.computeDistanceBetween(
              new google.maps.LatLng(latitude, longitude),
              new google.maps.LatLng(place.Latitude, place.Longitude)
            );
            if (distance > 300) {
              continue;
            }
            const position = {
              lat: Number(place.Latitude),
              lng: Number(place.Longitude),
              description: place["Place Name"]
            };
  
            const markerInstance = new google.maps.Marker({
              position,
              map: map,
              title: 'Cooling Place',
              icon: markerIcon
            });
  
            markerInstance.addListener('click', () => {
              infoWindow.setContent(`<p><strong>${position.description}</strong></p>`);
              infoWindow.open(map, markerInstance);
            });
  
            markers.value.push(markerInstance);
          }
        }
      };
    } catch (error) {
      console.error('Error parsing API data:', error);
      return [];
    }
  };
  
  const searchPlace = () => {
    const input = searchInput.value?.value;
    if (!input) {
      alert('Please enter a search term');
      return;
    }
    if (!validateAndSanitize(input).valid) {
      searchText.value = '';
      alert('Please input validate places.');
      return;
    }
  
    const service = new google.maps.places.PlacesService(map);
    service.textSearch(
      {
        query: input + " Melbourne", // 添加"Melbourne"作为关键词
        bounds: melbourneBounds,
        location: new google.maps.LatLng(-37.8136, 144.9631), // 墨尔本中心位置
        radius: 15000, // 搜索半径（米）
        region: 'au' // 澳大利亚区域
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
          // 过滤结果，只保留墨尔本市区内的位置
          const melbourneResults = results.filter(place =>
            melbourneBounds.contains(place.geometry.location) &&
            place.formatted_address.toLowerCase().includes('melbourne')
          );
          if (melbourneResults.length > 0) {
            updateMap(melbourneResults[0]);
          } else {
            alert('No results found');
          }
        } else {
          alert('No results found in Melbourne area');
        }
      }
    );
  };
  
  const updateMap = (place) => {
    const location = place.geometry.location;
    fetchWeatherData(location.lat(), location.lng());
    map.setCenter(location);
    map.setZoom(15);
  
    if (marker.value) {
      marker.value.setVisible(false);
      marker.value.setMap(null);
    }
  
    marker.value = new google.maps.Marker({
      position: location,
      map: map,
      title: place.name,
    });
  
    const navButton = document.createElement("button");
    navButton.innerText = "Navigate Here";
    navButton.style = "background: #19619e; color: white; padding: 10px; border: none; border-radius: 10px; cursor: pointer; margin-top: 10px;";
    navButton.onclick = () => calculateRoute(location);
  
    if (directionsRenderer.value.length > 0) {
      clearPreviousRoutes();
    }
  
    const infoWindow = new google.maps.InfoWindow({
      content: navButton
    });
  
    marker.value.addListener("click", () => {
      infoWindow.open(map, marker.value);
    });
  };
  
  const calculateRoute = (destination) => {
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
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false, // 只生成一条路线
      };
  
      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          clearPreviousRoutes(); // 清除之前的路线
  
          // 只处理第一条路线（唯一路线）
          const route = result.routes[0];
          const currentColor = getRandomColor();
  
          // 创建 DirectionsRenderer
          render = new google.maps.DirectionsRenderer({
            map: map,
            directions: result,
            routeIndex: 0, // 固定为 0，因为只有一条路线
            polylineOptions: {
              strokeColor: currentColor,
              strokeWeight: 4,
            },
            suppressMarkers: true,
          });
          directionsRenderer.value.push(render);
  
          // 创建 Polyline
          polyline = new google.maps.Polyline({
            path: route.overview_path,
            strokeColor: currentColor,
            strokeWeight: 8,
            map: map,
          });
          routePolylines.value.push(polyline);
  
          // 计算路线上的标记数量
          const count = countMarkersOnRoute(polyline.getPath());
  
          // 添加点击事件
          polyline.addListener("click", (event) => {
            showRouteInfoWindow(event, route, count);
          });
          render.addListener("click", (event) => {
            showRouteInfoWindow(event, route, count);
          });
        } else {
          alert("Directions request failed due to " + status);
        }
      });
    }, () => {
      alert("Unable to retrieve your location.");
    });
  };
  
  const countMarkersOnRoute = (routePath) => {
    let count = 0;
  
    // Iterate over existing markers
    markers.value.forEach((marker) => {
      const markerPosition = marker.getPosition();
  
      // Check if marker is within the route polyline
      routePath.forEach((pathPoint) => {
        // Check if the marker is near the route (within a certain tolerance)
        const distance = google.maps.geometry.spherical.computeDistanceBetween(markerPosition, pathPoint);
        if (distance < 150) { // You can adjust the tolerance distance
          count++;
        }
      });
    });
  
    console.log(`Number of markers near the route: ${count}`);
    return count;
  };
  
  const clearPreviousRoutes = () => {
    if (render != null) {
      render.setMap(null);
    }
    if (polyline != null) {
      polyline.setMap(null);
    }
    directionsRenderer.value.forEach(render => {
      console.log(render);
      render.setMap(null);
    });
    directionsRenderer.value = [];
  
    routePolylines.value.forEach(polyline => {
      console.log(polyline);
      polyline.setMap(null);
    });
    routePolylines.value = [];
  
    if (routeInfoWindow) {
      routeInfoWindow.close();
    }
  };
  
  const getRandomColor = () => {
    const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFA500", "#800080"];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const showRouteInfoWindow = (event, route, count) => {
    if (routeInfoWindow != null) {
      routeInfoWindow.close();
    }
    const leg = route.legs[0]; // Only take the first leg of the route
    const distance = leg.distance.text;
    const duration = leg.duration.text;
    const startAddress = leg.start_address;
    const endAddress = leg.end_address;
  
    routeInfoWindow = new google.maps.InfoWindow({
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
  
    routeInfoWindow.open(map);
  };
  
  // Define findShadedArea function (was missing in original code)
  const findShadedArea = () => {
    console.log("Finding shaded areas nearby");
    // Implementation would go here
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
    height: 500px;
    border-radius: 35px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  /* Position WeatherCard inside the map */
  .google-map .weather-card {
    position: absolute;
    bottom: 0px;
    left: 20px;
    z-index: 10;
  }
  
  .temp {
    font-size: 36px;
    font-weight: bold;
    color: #333;
    margin: 5px 0;
  }
  </style>