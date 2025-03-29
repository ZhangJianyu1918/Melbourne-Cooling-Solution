<template>
  <div class="container">
    <h2>This is local heat level page</h2>
    <p>Explore real-time heat in City of Melbourne local areas and 
      find the nearest shaded, cooling spaces and public centres. 
      Type your area name into the search bar and click on the 
      icon on the map for more information.
    </p>
    <div>
    <!-- 搜索框 -->
    <div style="margin-bottom: 10px; text-align: center;">
      <input
        ref="searchInput"
        type="text"
        placeholder="输入地点搜索"
        style="width: 300px; padding: 8px; font-size: 16px;"
      />
      <button @click="searchPlace" style="padding: 8px 16px; margin-left: 10px;">
        搜索
      </button>
    </div>
    <!-- 地图容器 -->
    <div class="google-map" ref="map" ></div>
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
      marker: null, // 用于跟踪当前标记
    };
  },
  async mounted() {
    await this.initMap();
  },
  methods: {
    async initMap() {
      const loader = new Loader({
        apiKey: 'AIzaSyC8ZRwMu4odONGFCfbUCIQblmDS0itPV_Y', // 替换为你的 Google API Key
        version: 'weekly',
        libraries: ['places'], // 加载 Places API
      });

      try {
        this.google = await loader.load();
        this.map = new this.google.maps.Map(this.$refs.map, {
          center: { lat: -37.8136, lng: 144.9631 },
          zoom: 13,
        });


        const autocomplete = this.$refs.searchInput;
        autocomplete.addEventListener('gmp-place-changed', () => {
          const place = autocomplete.place;
          if (place && place.geometry) {
            this.updateMap(place);
          } else {
            console.log('没有找到详细位置信息');
          }
        });
      } catch (error) {
        console.error('加载 Google Maps API 失败:', error);
      }
    },
    searchPlace() {
      const input = this.$refs.searchInput.value;
      if (!input) {
        alert('请输入搜索内容');
        return;
      }

      const service = new this.google.maps.places.PlacesService(this.map);
      service.textSearch(
        {
          query: input,
          bounds: this.map.getBounds(), // 在当前地图范围内搜索
        },
        (results, status) => {
          if (status === this.google.maps.places.PlacesServiceStatus.OK && results[0]) {
            this.updateMap(results[0]);
          } else {
            alert('未找到相关地点');
          }
        }
      );
    },
    updateMap(place) {
      const location = place.geometry.location;
      this.map.setCenter(location);
      this.map.setZoom(15); // 放大到更详细的级别

      // 如果已有标记，先移除
      if (this.marker) {
        this.marker.setMap(null);
      }

      // 添加新标记
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
    color: #19619E;
    font-size: 3rem;
    font-weight: bold;
    font-family: 'Abril Fatface';
}
.google-map {
  justify-content: center;
  height: 500px;
  border-radius: 35px; /* 圆角 */
  overflow: hidden; /* 确保圆角生效 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 可选：添加阴影 */
}
</style>