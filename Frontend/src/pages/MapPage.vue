<template>
    <div>
      <div id="cesiumContainer" ref="cesiumContainer" class="fullSize"></div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import * as Cesium from 'cesium';
  
  // 定义 Cesium 容器引用
  const cesiumContainer = ref(null);
  
  // 在组件挂载时初始化 Cesium
  onMounted(() => {
    // 设置 Cesium Ion 访问令牌（可选）
    // Cesium.Ion.defaultAccessToken = 'your_access_token_here';
  
    // // 初始化 Cesium Viewer
    // const viewer = new Cesium.Viewer(cesiumContainer.value, {
    //   terrainProvider: new Cesium.CesiumTerrainProvider({
    //     url: Cesium.IonResource.fromAssetId(1), // Cesium Ion 全球地形
    //   }),
    //   imageryProvider: new Cesium.IonImageryProvider({ assetId: 2 }), // Cesium Ion 全球影像
    //   geocoder: false,
    //   homeButton: false,
    //   sceneModePicker: false,
    //   baseLayerPicker: false,
    //   navigationHelpButton: false,
    //   animation: false,
    //   timeline: false,
    //   fullscreenButton: false,
    // });
    const viewer = new Cesium.Viewer(cesiumContainer.value);
    // 设置初始视角（示例：墨尔本）
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(144.9631, -37.8136, 5000.0), // 墨尔本坐标
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-15.0),
      },
    });
  
    // 添加示例实体（红色点）
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(144.9631, -37.8136),
      point: {
        pixelSize: 10,
        color: Cesium.Color.RED,
      },
    });
  
    // 处理用户点击事件
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((movement) => {
      const cartesian = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
      if (cartesian) {
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        const longitude = Cesium.Math.toDegrees(cartographic.longitude);
        const latitude = Cesium.Math.toDegrees(cartographic.latitude);
        console.log(`点击位置 - 经度: ${longitude}, 纬度: ${latitude}`);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  });
  </script>
  
  <style scoped>
  .fullSize {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  </style>