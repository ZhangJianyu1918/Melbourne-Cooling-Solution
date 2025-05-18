<template>
  <div class="container">
    <!-- <el-button type="success" @click="drawer = true" size="large"
      style="position: fixed; bottom: 120px; right:30px; z-index: 1000;">
      User GuideLine
    </el-button> -->
    <el-drawer v-model="drawer" title="User GuideLine" :direction="direction" :before-close="handleClose">
      <h3>Close this drawer</h3>
      <p>Click anywhere outside of this drawer area.</p>
      <h3>Search Place</h3>
      <p>Input place name at input area. And click the autocomplete content or click 'Search' button.</p>
      <h3>Navigate Route</h3>
      <p>User should choose travel options, route type and input starting and ending points. The place name also need
        'VIC' as suffix.</p>
      <h3>Map</h3>
      <p>When user click the map, this map will display a circle. And map will display the cooling places and drinking
        foudtains icon in this circle.</p>
      <h3>Tree Icon</h3>
      <img src="../assets/tree.png" style="width: 50px; border-radius: 50px;" alt="">
      <h3>Cooling Place Icon</h3>
      <img src="../assets/frost.png" style="width: 50px; border-radius: 50px;" alt="">
      <h3>Drinking Foundtain Icon</h3>
      <img src="../assets/water-bottle.png" style="width: 50px; border-radius: 50px;" alt="">
    </el-drawer>
    <div style="height: 50px;"></div>
    <h2>Find your Local Heat Level</h2>
    <div style="height: 20px;"></div>
    <!-- <p style="font-size: 22px;">
      Explore real-time heat in City of Melbourne local areas and find the nearest shaded, cooling spaces and public
      centres.
      Type your area name into the search bar and click on the icon on the map for more information.
    </p> -->
    <div
      style="display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-radius: 12px;">

      <!-- Left text block: 75% -->
      <div style="flex: 3;">
        <p style="font-size: 15px; font-style: italic; color: #5a6e7f; margin-bottom: 6px;">
          Explore real-time heat in City of Melbourne local areas and find the nearest shaded, cooling spaces and water
          fountains.
        </p>
        <p style="font-size: 15px; color: #5a6e7f; margin: 0;">
          <strong style="font-weight: bold; color: #2c3e50;">How to use:</strong>
          <span style="font-style: italic;"> Type your area name into the search bar and click on the icon on the map
            for more information.</span>
        </p>
      </div>

      <!-- Right legend block: 25% -->
      <div
        style="flex: 1; display: flex; flex-direction: column; gap: 10px; align-items: flex-start; padding-left: 24px;">
        <div style="display: flex; align-items: center;">
          <img src="../assets/frost.png" alt="Cooling Place" style="width: 24px; height: 24px; margin-right: 10px;" />
          <span style="color: #2c3e50;">Cooling Place</span>
        </div>
        <div style="display: flex; align-items: center;">
          <img src="../assets/water-bottle.png" alt="Water Fountain"
            style="width: 24px; height: 24px; margin-right: 10px;" />
          <span style="color: #2c3e50;">Water Fountain</span>
        </div>
      </div>
    </div>



    <div>
      <!-- Search box -->
      <transition name="fade-zoom">
        <div>
          <div v-show="!isExpand" style="margin-bottom: 10px; text-align: center;">
            <el-row class="searchInputArea">
              <el-col :span="18">
                <el-input ref="searchInput" v-model="searchText" placeholder="Please Enter the Search Area" type="text"
                  @keyup.enter="searchPlace()" size="large" style="--el-border-radius-base: 20px">
                  <template #suffix>
                    <el-icon>
                      <Search />
                    </el-icon>
                  </template>
                </el-input>
              </el-col>
              <el-col :span="2" style="margin-left: 30px;">
                <el-button type="primary" size="large" @click="searchPlace()">
                  Search Place
                </el-button>
              </el-col>
              <el-col :span="2" style="margin-left: 30px;">
                <el-button type="primary" size="large" @click="expandInputArea">
                  Navigate Route
                </el-button>
              </el-col>
            </el-row>
          </div>

          <div v-show="isExpand" class="searchArea">
            <!-- Step 1 & 2 and Step 3 layout -->
            <el-row type="flex" justify="space-between" align="top">
              <!-- Left: Step 1 and 2 stacked -->
              <el-col :span="10">
                <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px; margin-left: 60px;">Step 1: Trip
                  mode
                  selection</div>
                <el-radio-group v-model="navigationForm.type" 
                style="display: flex; gap: 20px; margin-bottom: 20px; margin-left: 50px;" class="custom-radio-group">
                  <el-radio label="WALKING" border>
                    <font-awesome-icon :icon="['fas', 'person-walking']" />  Walking
                  </el-radio>
                  <el-radio label="BICYCLING" border>
                    <font-awesome-icon :icon="['fas', 'person-biking']" />  Biking
                  </el-radio>
                </el-radio-group>


                <div
                  style="font-weight: bold; font-size: 16px; margin-bottom: 8px; margin-top: 70px; margin-left: 60px;">
                  Step 2:
                  Route selection</div>
                <el-radio-group v-model="navigationForm.path" style="display: flex; gap: 20px; margin-left: 60px;">
                  <el-radio label="Coolest">Coolest</el-radio>
                  <el-radio label="Shortest">Shortest</el-radio>
                </el-radio-group>
              </el-col>

              <!-- Right: Step 3 and Navigate Button -->
              <el-col :span="14">
                <div
                  style="display: flex; justify-content: space-between; align-items: flex-start; position: relative;">
                  <div style="flex: 1;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px;">Step 3: Enter Start point and
                        Destination</div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                      <!-- From row -->
                      <div style="display: flex; align-items: center;">
                        <div style="width: 24px; text-align: center;">
                          <font-awesome-icon :icon="['fas', 'circle']" style="color: #1e90ff;" />
                          <font-awesome-icon :icon="['fas', 'chevron-down']"
                            style="color: #1e90ff; margin-top: 10px;" />
                        </div>
                        <input ref="fromInput" v-model="navigationForm.from" placeholder="Enter the Start Location"
                          size="large" class="newInputCSS" @focus="handleFocus"
                        @blur="handleBlur"/>
                      </div>
                      <!-- To row -->
                      <div style="display: flex; align-items: center;">
                        <div
                          style="width: 24px; text-align: center; display: flex; flex-direction: column; align-items: center;">
                          <font-awesome-icon :icon="['fas', 'location-dot']" style="color: #ff4500;" />
                        </div>
                        <input ref="toInput" v-model="navigationForm.to" placeholder="Enter the Destination"
                          size="large" class="newInputCSS" @focus="handleFocus"
                        @blur="handleBlur"/>
                      </div>
                    </div>
                  </div>
                  <el-button type="primary" plain @click="calculateRoute"
                    style="height: 100px; width: 90px; border-radius: 12px; margin-left: 16px; margin-top: 35px;">
                    Navigate
                  </el-button>
                  <el-button type="text" @click="isExpand = false" style="font-size: 20px; padding: 0;">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                  </el-button>
                </div>
                <!-- Summary stats row -->
                <el-row type="flex" justify="space-between" align="middle" style="margin-top: 20px;">
                  <el-col :span="4" style="text-align: center;">
                    <el-statistic title="Cooling place" :value="maxCoolingPlace" />
                  </el-col>
                  <el-col :span="4" style="text-align: center;">
                    <el-statistic title="Water fountain" :value="maxDrinkingFountains" />
                  </el-col>
                  <el-col :span="4" style="text-align: center;">
                    <el-statistic title="Tree" :value="maxTrees" />
                  </el-col>
                  <el-col :span="4" style="text-align: center;">
                    <el-statistic title="Distance (m)" :value="routeDistance" />
                  </el-col>
                  <el-col :span="4" style="text-align: center;">
                    <el-statistic title="Duration (min)" :value="routeDuration" />
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>

      </transition>

      <div style="height: 20px;"></div>
      <div class="google-map" ref="mapElement"></div>
      <WeatherCard :temp="weather.temp" :placeName="marker?.title" :icon="weather.icon" @find-shade="findShadedArea" />
    </div>
    <div style="text-align: end;">
      <el-button type="text" @click="$router.push('/personal-cooling-guide')"
        style="font: 1.2em sans-serif; padding-top: 30px;">
        <el-icon class="mr-1"><arrow-right /></el-icon>
        Go to Personal Guide Page
      </el-button>
    </div>
    <el-dialog v-model="centerDialogVisible" title="Warning" width="500" align-center>
      <span>The temperature is {{ weather.temp }}°C!</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, onMounted, reactive, nextTick } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';
import waterBottleIcon from '@/assets/water-bottle.png';
import frostIcon from '@/assets/frost.png';
import WeatherCard from '../components/WeatherCard.vue';
import validateAndSanitize from '../js/validation';
import decryptData from '@/js/decryption';
import axios from 'axios';
import { Search, Open, Location } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'
import AnimatedStatistic from '@/components/AnimatedStatistic.vue';
// import { DrawerProps } from 'element-plus'
import { ElMessageBox } from 'element-plus'

// Reactive state
const searchText = ref('');
const mapElement = ref(null);
const searchInput = ref(null);
const fromInput = ref(null); // 新增
const toInput = ref(null);   // 新增
let map = null;
let google = null;
let marker = ref(null);
let autocomplete = null;
let fromAutocomplete = null
let toAutocomplete = null
let directionsService = ref(null);
const directionsRenderer = ref(null);
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
const isExpand = ref(false)
const customMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      { "color": "#dedede" }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#8a8a8a" }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      { "color": "#ffffff" }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      { "color": "#c0c0c0" }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry.fill",
    "stylers": [
      { "color": "#e6e6e6" }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      { "color": "#b6e3b6" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      { "color": "#f9f9f9" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#b3b3b3" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text",
    "stylers": [
      { "visibility": "on" }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text",
    "stylers": [
      { "visibility": "on" }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      { "color": "#dcdcdc" }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#666666" }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      { "color": "#c9e3f5" }
    ]
  }
]
const navigationType = ["WALKING", "BICYCLING"]
const centerDialogVisible = ref(false)
const navigationForm = ref({
  from: '',
  to: '',
  type: 'WALKING',
  path: 'Coolest'
})
const from = ref('')
const to = ref('')
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const drinkingFountainList = ref([])
const coolingPlaceList = ref([])
const maxTotalCoolingResources = ref(0)
const maxCoolingPlace = ref(0)
const maxDrinkingFountains = ref(0)
const maxTrees = ref(0)
const routeDuration = ref(0)
const routeDistance = ref(0)
const drawer = ref(false)
const direction = ref('rtl')

// Initialize map on component mount
onMounted(async () => {
  await nextTick();
  // initAutocomplete();
  await getCoolingPlace();
  await getDrinkingFoundtains();
  await initMap();
});

const initMap = async () => {
  const loader = new Loader({
    apiKey: GOOGLE_API_KEY,
    version: 'quarterly',
    libraries: ['places', 'geometry'],
  });

  try {
    google = await loader.load();
    const MelbourneCenter = { lat: -37.8136, lng: 144.9631 };
    const styledMapType = new google.maps.StyledMapType(customMapStyle);

    map = new google.maps.Map(mapElement.value, {
      center: MelbourneCenter,
      zoom: 17,
      styles: customMapStyle,
      streetViewControl: false,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "poi.park",
          elementType: "labels",
          stylers: [{ visibility: "on" }]
        }
      ],
      mapTypeControlOptions: {
        mapTypeIds: ["roadmap", "satellite", "route_map"],
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      },
    });


    map.mapTypes.set("route_map", styledMapType);
    map.mapTypes.get("route_map").name = "Route Map"; // 添加显示名称
    map.setMapTypeId("route_map");
    // map.data.loadGeoJson('/trees.geojson');

    map.data.loadGeoJson('/trees-with-species-and-dimensions-urban-forest.geojson');
    map.data.setStyle({
      visible: false  // 完全隐藏所有图层（图标、线、面）
    });
    // updateTreeIconStyle(map.getZoom());
    // map.addListener('zoom_changed', () => {
    //   const newZoom = map.getZoom();
    //   updateTreeIconStyle(newZoom);
    // });

    infoWindow = new google.maps.InfoWindow();
    melbourneBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-37.906, 144.862), // 西南角
      new google.maps.LatLng(-37.754, 145.056)  // 东北角
    );

    fetchWeatherData(MelbourneCenter.lat, MelbourneCenter.lng);

    autocomplete = new google.maps.places.Autocomplete(searchInput.value.input, {
      bounds: melbourneBounds,
      strictBounds: true,
      componentRestrictions: { country: 'au' },
      types: ['geocode', 'establishment']
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        searchText.value = place.name

      } else {
        console.log('No details available for input: ' + place.name);
      }
    });

    fromAutocomplete = new google.maps.places.Autocomplete(fromInput.value, {
      // bounds: melbourneBounds,
      strictBounds: true,
      componentRestrictions: { country: 'au' },
      types: ['geocode', 'establishment']
    });
    console.log(fromInput.value)
    fromAutocomplete.addListener('place_changed', () => {
      const place = fromAutocomplete.getPlace();
      if (place.geometry) {
        navigationForm.value.from = place.name;

      }
    });
    toAutocomplete = new google.maps.places.Autocomplete(toInput.value, {
      // bounds: melbourneBounds,
      strictBounds: true,
      componentRestrictions: { country: 'au' },
      types: ['geocode', 'establishment']
    });
    console.log(toInput.value)
    toAutocomplete.addListener('place_changed', () => {
      const place = toAutocomplete.getPlace();
      if (place.geometry) {
        navigationForm.value.to = place.name;
        updateMap(place);
      }
    });
    directionsService.value = new google.maps.DirectionsService();
    directionsRenderer.value = new google.maps.DirectionsRenderer();
    directionsRenderer.value.setMap(map);
    map.addListener("click", (event) => handleMapClick(event));
  } catch (error) {
    console.error('Failed to load Google Maps API:', error);
  }
};
const updateTreeIconStyle = (zoomLevel) => {
  const size = Math.max(zoomLevel * 0.5, 0.5); // 保底大小防止太小
  map.data.setStyle(function (feature) {
    return {
      icon: {
        url: '/tree.png',
        scaledSize: new google.maps.Size(size, size)
      }
    };
  });
};

// function initAutocomplete() {
//   // if (!google || !fromInput.value?.input || !toInput.value?.input) {
//   //   console.error('Autocomplete initialization failed: DOM not ready');
//   //   return;
//   // }

//   fromAutocomplete = new google.maps.places.Autocomplete(fromInput.value.input);
//   toAutocomplete = new google.maps.places.Autocomplete(toInput.value.input);
// }


const expandInputArea = () => {
  isExpand.value = true;
};

// Methods
const fetchWeatherData = async (lat, lng) => {
  weather.loading = true;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${WEATHER_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Weather data request failed');
    }

    const data = await response.json();

    weather.temp = Math.round(data.main.temp);
    // weather.temp = 40;
    if (weather.temp >= 30) {
      centerDialogVisible.value = true;
    }
    weather.humidity = data.main.humidity;
    weather.description = data.weather[0].description;
    weather.icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weather.loading = false;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weather.loading = false;
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

const getDrinkingFoundtains = async () => {
  const response = await axios.get(
    'https://fuvetj5be6.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_drinking_foundtains'
  );
  const data = JSON.parse(response.data.body).data;
  if (!data || data.length === 0) {
    console.error('No drinking fountain data found');
    return;
  }
  let decrypt_data = decryptData(data);
  // console.log(decrypt_data)
  drinkingFountainList.value = decrypt_data;
  // console.log(drinkingFountainList.value);
}

const loadDrinkingFountains = (latitude, longitude) => {
  try {
    let decrypt_data = drinkingFountainList.value;
    // console.log(decrypt_data);
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
            description: fountain.description
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

const getCoolingPlace = async () => {
  const response = await fetch('https://fuvetj5be6.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_cooling_place', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await response.json();
  // console.log(data);
  // console.log(JSON.parse(data.body).data)
  let decrypt_data = decryptData(JSON.parse(data.body).data);

  coolingPlaceList.value = decrypt_data;
  // console.log(coolingPlaceList.value);
}

const loadCoolingPlaces = async (latitude, longitude) => {
  try {
    const places = coolingPlaceList.value;
    if (!places || !Array.isArray(places)) {
      console.error('Parsed data is not an array:', places);
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
            new google.maps.LatLng(place.lat, place.lon)
          );
          if (distance > 300) {
            continue;
          }
          const position = {
            lat: Number(place.lat),
            lng: Number(place.lon),
            building_name: place["building_name"],
            street_address: place["street_address"]
          };

          const markerInstance = new google.maps.Marker({
            position,
            map: map,
            title: 'Cooling Place',
            icon: markerIcon
          });

          markerInstance.addListener('click', () => {
            infoWindow.setContent(`<p><strong>Cooling Place:<br/>${position.building_name}<br/>${position.street_address}</strong></p>`);
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
  const input = searchText.value;
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
      location: new google.maps.LatLng(-37.8136, 144.9631),
      radius: 10000,
      region: 'au'
    },
    (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
        updateMap(results[0]); // 不再过滤，直接使用第一个结果
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

  if (directionsRenderer.value.length > 0) {
    clearPreviousRoutes();
  }
};


const calculateRoute = () => {
  if (!navigationForm.value.from ||
    !navigationForm.value.to ||
    !navigationForm.value.type ||
    !navigationForm.value.path) {
    ElMessage.warning('Please enter the starting point, end point, route type, and travel mode.')
    return
  }
  if (navigationForm.value.type == 'WALKING') {
    navigationForm.value.type = google.maps.TravelMode.WALKING;
  } else {
    navigationForm.value.type = google.maps.TravelMode.BICYCLING;
  }
  const request = {
    origin: navigationForm.value.from,
    destination: navigationForm.value.to,
    travelMode: navigationForm.value.type,
    provideRouteAlternatives: true,
  };

  directionsService.value.route(request, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      const routes = result.routes;
      let path;
      if (navigationForm.value.path == 'Shortest') {
        path = findShortestPath(routes);
      } else {
        path = findCoolestPath(routes);
      }
      maxTotalCoolingResources.value = path.maxTotal;
      maxCoolingPlace.value = path.maxCoolingPlaces;
      maxDrinkingFountains.value = path.maxDrinkingFountains;
      maxTrees.value = path.maxTrees;
      routeDuration.value = path.targetRoute.legs[0].duration.value / 60;
      routeDistance.value = path.targetRoute.legs[0].distance.value;
      directionsRenderer.value.setDirections({
        ...result,
        routes: [path.targetRoute]
      });
      const bounds = path.targetRoute.bounds;
      if (bounds && map) {
        map.fitBounds(bounds);
      }
    } else {
      console.error('Walking directions failed:', status);
    }
  });
};

const findShadedArea = () => {
  console.log("Finding shaded areas nearby");
  // Implementation would go here
};

const findShortestPath = (routes) => {
  let targetRoute = routes[0];
  let minDistance = routes[0].legs[0].distance.value;
  for (let i = 1; i < routes.length; i++) {
    const dist = routes[i].legs[0].distance.value; // 单位是米
    if (dist < minDistance) {
      minDistance = dist;
      targetRoute = routes[i];
    }
  }
  let pathPoints = countPathPoints(targetRoute);
  let maxTrees = countTreesOnRoute(pathPoints);
  let maxDrinkingFountains = countDrinkingFountainsOnRoute(pathPoints);
  let maxCoolingPlaces = countCoolingPalcesOnRoute(pathPoints);
  let maxTotal = maxTrees + maxDrinkingFountains + maxCoolingPlaces;
  return { targetRoute, maxTrees, maxDrinkingFountains, maxCoolingPlaces, maxTotal };
}

const findCoolestPath = (routes) => {
  let targetRoute = routes[0];
  let pathPoints = countPathPoints(targetRoute);
  let maxCoolingPlaces = countCoolingPalcesOnRoute(pathPoints);
  let maxTrees = countTreesOnRoute(pathPoints);
  let maxDrinkingFountains = countDrinkingFountainsOnRoute(pathPoints);
  let maxTotal = maxCoolingPlaces + maxTrees + maxDrinkingFountains;
  for (let i = 1; i < routes.length; i++) {
    pathPoints = countPathPoints(routes[i]);
    let coolingPlaces = countCoolingPalcesOnRoute(pathPoints);
    let trees = countTreesOnRoute(pathPoints);
    let drinkingFountains = countDrinkingFountainsOnRoute(pathPoints);
    let total = coolingPlaces + trees + drinkingFountains;
    if (total > maxTotal) {
      maxCoolingPlaces = coolingPlaces;
      maxTrees = trees;
      maxDrinkingFountains = drinkingFountains;
      maxTotal = total;
      targetRoute = routes[i];
    }
  }
  console.log('maxTotal' + maxTotal);
  return { targetRoute, maxTotal, maxCoolingPlaces, maxDrinkingFountains, maxTrees };
}

const countPathPoints = (route) => {
  const pathPoints = []; // 存储路径上所有点

  // 收集所有路径点
  route.legs.forEach((leg) => {
    leg.steps.forEach((step) => {
      pathPoints.push(...step.path); // 每一步的详细 path
    });
  });
  return pathPoints;
}

const countTreesOnRoute = (pathPoints) => {
  let treeCount = 0;

  map.data.forEach((feature) => {
    const treePosition = feature.getGeometry().get();
    // 判断该树是否靠近路径上的任意点
    const isNearPath = pathPoints.some((point) => {
      const distance = google.maps.geometry.spherical.computeDistanceBetween(point, treePosition);
      return distance < 20; // 你可以调整这个半径，比如 20 米
    });

    if (isNearPath) {
      treeCount++;
    }
  });
  console.log(`路径上经过了 ${treeCount} 棵树 🌳`);
  return treeCount;
};

const countDrinkingFountainsOnRoute = (pathPoints) => {
  let count = 0;

  drinkingFountainList.value.forEach(drinkingFountain => {
    const position = { lat: parseFloat(drinkingFountain.lat), lng: parseFloat(drinkingFountain.lon) };
    const isNearby = pathPoints.some(routePoint => {
      const distance = google.maps.geometry.spherical.computeDistanceBetween(routePoint, position);
      return distance < 100;
    });

    if (isNearby) {
      count++;
    }
  })
  console.log('DrinkingFountains' + count)
  return count;
}

const countCoolingPalcesOnRoute = (pathPoints) => {
  let count = 0;

  coolingPlaceList.value.forEach(coolingPlace => {
    const position = { lat: parseFloat(coolingPlace.lat), lng: parseFloat(coolingPlace.lon) };
    const isNearby = pathPoints.some(routePoint => {
      const distance = google.maps.geometry.spherical.computeDistanceBetween(routePoint, position);
      return distance < 300;
    });

    if (isNearby) {
      count++;
    }
  })
  console.log('CoolingPalces: ' + count)
  return count;
}

const handleClose = () => {
  ElMessageBox.confirm('Are you sure you want to close this?')
    .then(() => {
      drawer.value = false
    })
    .catch(() => {
      // catch error
    })
}
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

.searchArea {
  background-color: white;
  border-radius: 20px;
  padding: 20px;
}

.searchInputArea {
  width: 100%;
  /* max-width: 600px; */
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
.newInputCSS {
    flex: 1;
    border-radius: 5px;
    margin-left: 8px;
    margin-bottom: 10px;
    z-index: 15;
    padding: 10px 15px;
    font-size: 14px;
    border: 1px solid #dcdfe6;
    background-color: #fff;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
}
.newInputCSS:hover {
  border-color: #409EFF; /* Element Plus primary color */
  box-shadow: 0 0 2px rgba(64, 158, 255, 0.5);
}
.temp {
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin: 5px 0;
}

.rounded-input .el-input__inner {
  border-radius: 50px;
}

:deep(.el-button) {
  border-radius: 50px;
}

:deep(.custom-radio .el-radio__inner) {
  display: none;
}

/* Remove default padding/margin and ensure the icon is the primary element */
:deep(.custom-radio .el-radio__label) {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Style the radio container */
:deep(.custom-radio) {
  position: relative;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.3s;
}

/* Highlight the selected radio */
:deep(.custom-radio.is-checked) {
  background: #1e90ff;
  /* Blue background for selected */
}

/* Change icon color when selected */
:deep(.custom-radio.is-checked .radio-icon) {
  color: white;
}

/* Style the icon */
.radio-icon {
  font-size: 28px;
  /* Larger icon size */
  color: #555;
  /* Default icon color */
  cursor: pointer;
  /* Hand cursor on hover */
}

/* Hover effect only on the icon */
.radio-icon:hover {
  transform: scale(1.1);
  /* Optional: Slight zoom on hover */
  transition: transform 0.2s;
}

/* Ensure the entire radio area is clickable, but without cursor override */
:deep(.custom-radio .el-radio__input) {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: default;
  /* Prevent hand cursor on the input */
}

.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition: all 0.3s ease;
}

.fade-zoom-enter-from,
.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.fade-zoom-enter-to,
.fade-zoom-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>