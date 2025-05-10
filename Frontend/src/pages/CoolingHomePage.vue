<template>
    <div class="container">
        <h1>Game: Cooling My Home</h1>
        <p>Discover practical ways to keep your home cool during heatwaves. This game gives you inspiring ideas of
            cooling strategies, decoration, and smart energy-saving tips. </p>
        <div>
            <GridLayout :layout="layout" :col-num="12" :row-height="30" :is-draggable="true" :is-resizable="true"
                :vertical-compact="true" :margin="[10, 10]" :use-css-transforms="true" style="background: #f0f0f0">
                <GridItem v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h"
                    :i="item.i" :static="item.static">
                    <img :src="getImageSrc(item.i)" alt="Image"
                        style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" />
                </GridItem>
            </GridLayout>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { GridLayout, GridItem } from 'vue3-grid-layout'

const layout = ref([
    { x: 0, y: 0, w: 3, h: 3, i: '0', static: false },
    { x: 3, y: 0, w: 3, h: 3, i: '1', static: false },
    { x: 6, y: 0, w: 3, h: 3, i: '2', static: false },
    { x: 9, y: 0, w: 3, h: 3, i: '3', static: false }
])

// 你可以改成实际图片地址
const getImageSrc = (i) => {
    const images = {
        '0': 'https://placekitten.com/300/300',
        '1': 'https://placebear.com/300/300',
        '2': 'https://picsum.photos/id/1025/300/300',
        '3': 'https://picsum.photos/id/237/300/300'
    }
    return images[i] || 'https://via.placeholder.com/300'
}
</script>

<style scoped>
.vue-grid-layout {
    background: #eee;
}

.vue-grid-item:not(.vue-grid-placeholder) {
    background: #ccc;
    border: 1px solid black;
}

.vue-grid-item .resizing {
    opacity: 0.9;
}

.vue-grid-item .static {
    background: #cce;
}

.vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
}

.vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
}

.vue-grid-item .minMax {
    font-size: 12px;
}

.vue-grid-item .add {
    cursor: pointer;
}

.vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}
</style>
