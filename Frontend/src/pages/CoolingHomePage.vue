<template>
    <div class="container">
        <el-button type="text" @click="$router.push('/personal-cooling-guide')"
            style="font: 1.2em sans-serif; padding-top: 30px;">
            <el-icon class="mr-1"><arrow-left /></el-icon>
            Go back to Personal Guide Page
        </el-button>
        <h1>Game: Cooling My Home</h1>
        <p>Discover practical ways to keep your home cool during heatwaves. This game gives you inspiring ideas of
            cooling strategies, decoration, and smart energy-saving tips. </p>
        <div>
            <el-container>
                <el-main>
                    <div @dragover.prevent @drop="onDrop($event)">
                        <GridLayout ref="gridRef" :layout="layout" :col-num="12" :row-height="30" :is-draggable="true"
                            :is-resizable="true" :vertical-compact="false" :margin="[10, 10]" :use-css-transforms="true"
                            style="background: #f0f0f0; width: 100%; height: 500px; overflow: hidden;">
                            <GridItem v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w"
                                :h="item.h" :i="item.i" :static="item.static">
                                <img :src="getImageSrc(item.type)" alt="Image"
                                    style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px; min-width: 50px; min-height: 50px;" />
                            </GridItem>
                        </GridLayout>
                    </div>
                </el-main>
                <aside class="aside">
                    <h2 class="text-xl font-bold mb-4">Buy Item</h2>
                    <div v-for="(item, key) in storeItems" :key="key" class="mb-2">
                        <div class="cursor-move p-2 border rounded bg-white shadow" draggable="true"
                            @dragstart="onDragStart($event, key)">
                            <img :src="item.img" style="width: 100px;" />
                            <div class="flex flex-col">
                                <span class="font-medium">{{ item.name }}</span>
                                <span class="text-sm text-gray-500">${{ item.price }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 text-green-700">金币: {{ coins }}</div>
                    <div class="mt-2 text-blue-700">总降温: {{ totalCooling }}°C</div>
                </aside>

            </el-container>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { GridLayout, GridItem } from 'vue3-grid-layout'


const coins = ref(100)
const storeItems = ref({
    tree: { name: 'Plant', price: 20, cooling: 3, img: new URL('/tree.png', import.meta.url).href },
    curtain: { name: 'Window Covering', price: 50, cooling: 5, img: new URL('../assets/logo.png', import.meta.url).href },
})
const imageMap = {
    tree: new URL('/tree.png', import.meta.url).href,
    curtain: new URL('../assets/logo.png', import.meta.url).href,
}
const layout = ref([])
const draggedItem = ref('')
const gridRef = ref(null);
const colWidth = computed(() => {
    const containerWidth = gridRef.value?.$el?.offsetWidth || 0;
    const cols = 12; // 和 col-num 一致
    const marginX = 10; // 和 :margin 的横向值一致
    return (containerWidth - marginX * (cols + 1)) / cols;
});


// 拖拽结束时添加新的布局元素
function onDrop(e) {
    if (!gridRef.value || !e.clientX || !e.clientY) return;
    const containerRect = gridRef.value.$el.getBoundingClientRect();
    const type = event.dataTransfer.getData('type')
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;
    const col = Math.floor(mouseX / (colWidth.value + 10)); // 10 是 marginX
    const row = Math.floor(mouseY / (30 + 10));             // 30 是 rowHeight，10 是 marginY

    layout.value.push({
        x: col,
        y: row,
        w: 2,
        h: 4,
        i: String(Date.now()),
        type
    });
}

// 拖拽开始时保存被拖的内容标识
function onDragStart(event, type) {
    event.dataTransfer.setData('type', type)
    draggedItem.value = type
}

// 图片映射函数
const getImageSrc = (type) => {
    return imageMap[type] || 'https://via.placeholder.com/300'
}

</script>

<style scoped>
.aside {
    background-color: white;
}
</style>
