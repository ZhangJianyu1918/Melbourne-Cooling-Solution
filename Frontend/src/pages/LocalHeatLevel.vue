<template>
  <div class="container">
    <div style="height: 50px;"></div>
    <h2>This is local heat level page</h2>
    <div style="height: 20px;"></div>
    <p style="font-size: 22px;">
      Explore real-time heat in City of Melbourne local areas and find the nearest shaded, cooling spaces and public centres.
      Type your area name into the search bar and click on the icon on the map for more information.
    </p>
    <div>
      <!-- 搜索框 -->
      <div style="margin-bottom: 10px; text-align: center;">
        <input
          ref="searchInput"
          placeholder="Please Input"
          style="width: 600px; padding: 8px; font-size: 16px; height: 60px; border-radius: 20px; border: 1px solid #dcdfe6;"
        />
        <el-button @click="searchPlace" type="primary" plain style="padding: 8px 16px; margin-left: 10px; height: 45px;">
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

export default {
  name: 'GoogleMap',
  data() {
    return {
      map: null,
      google: null,
      marker: null,
      autocomplete: null,
    };
  },
  async mounted() {
    await this.initMap();
  },
  methods: {
    async initMap() {
      const loader = new Loader({
        apiKey: 'AIzaSyC8ZRwMu4odONGFCfbUCIQblmDS0itPV_Y',
        version: 'weekly',
        libraries: ['places'],
      });

      try {
        this.google = await loader.load();
        this.map = new this.google.maps.Map(this.$refs.map, {
          center: { lat: -37.8136, lng: 144.9631 },
          zoom: 13,
        });

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
      } catch (error) {
        console.error('Failed to load Google Maps API:', error);
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
    },
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
</style>
