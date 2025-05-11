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
        <div style="border-radius: 20px;">
            <el-container style="height: 80vh; margin: 0; padding: 0; overflow: hidden;">
                <el-main style="padding: 0;">
                    <div v-if="game">
                        <div
                            style="background: #f0f0f0; width: 100%; height: 500px; overflow: hidden; border-radius: 20px; justify-items: center; align-content: center;">
                            <p>1111</p>
                            <input v-model="coins">
                            <el-button type="" @click="game = !game;">
                                Start Game
                            </el-button>
                        </div>
                    </div>
                    <div v-else @dragover.prevent @drop="onDrop($event)">
                        <GridLayout ref="gridRef" :layout="layout" :col-num="12" :row-height="30" :is-draggable="true"
                            :is-resizable="true" :vertical-compact="false" :margin="[10, 10]" :use-css-transforms="true"
                            style="background-image: url('../assets/l');; width: 100%; height: 500px; overflow: hidden; border-radius: 20px;"
                            :prevent-collision="true">
                            <GridItem v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w"
                                :h="item.h" :i="item.i" :static="item.static">
                                <img :src="getImageSrc(item.type)" alt="Image"
                                    style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px; min-width: 50px; min-height: 50px;" />
                            </GridItem>
                        </GridLayout>
                    </div>
                </el-main>
                <aside class="aside">
                    <h2 v-show="!game">Budget {{ coins }} AUD</h2>
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
                    <el-button v-show="!game" @click="game = !game; centerDialogVisible = true; coins = null">Finish Game</el-button>
                    <el-button v-show="!game" @click="game = !game; coins = null">Exit Game</el-button>
                </aside>
            </el-container>
        </div>
        <el-dialog v-model="centerDialogVisible" title="Game Result" width="500" align-center>
            <span>{{ gameResult }}</span>
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
import { ref, computed } from 'vue'
import { GridLayout, GridItem } from 'vue3-grid-layout'

const coins = ref()
const game = ref(true)
const centerDialogVisible = ref(false)
const storeItems = ref({
    plant1: { name: 'Plant1', price: 20, cooling: 3, img: new URL('../assets/plant1.png', import.meta.url).href },
    plant2: { name: 'Plant2', price: 20, cooling: 3, img: new URL('../assets/plant2.png', import.meta.url).href },
    plant3: { name: 'Plant3', price: 20, cooling: 3, img: new URL('../assets/plant3.png', import.meta.url).href },
    windowCovering1: { name: 'WindowCovering1', price: 20, cooling: 3, img: new URL('../assets/window-covering1.png', import.meta.url).href },
    windowCovering2: { name: 'WindowCovering2', price: 20, cooling: 3, img: new URL('../assets/window-covering2.png', import.meta.url).href },
    windowCovering3: { name: 'WindowCovering3', price: 20, cooling: 3, img: new URL('../assets/window-covering3.png', import.meta.url).href },
})
const imageMap = {
    plant1: new URL('../assets/plant1.png', import.meta.url).href,
    plant2: new URL('../assets/plant2.png', import.meta.url).href,
    plant3: new URL('../assets/plant3.png', import.meta.url).href,
    windowCovering1: new URL('../assets/window-covering1.png', import.meta.url).href,
    windowCovering2: new URL('../assets/window-covering2.png', import.meta.url).href,
    windowCovering3: new URL('../assets/window-covering3.png', import.meta.url).href,
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
const gameResult = ref('123123')

// 拖拽结束时添加新的布局元素
function onDrop(e) {
    if (!gridRef.value || !e.clientX || !e.clientY) return;
    const containerRect = gridRef.value.$el.getBoundingClientRect();
    const type = e.dataTransfer.getData('type')
    const item = storeItems.value[type];
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
    coins.value -= item.price
}

// 拖拽开始时保存被拖的内容标识
function onDragStart(event, type) {
    event.dataTransfer.setData('type', type)
    draggedItem.value = type
}

const onDragStop = (layout, oldItem, newItem) => {
    const maxY = Math.floor(500 / 30); // 因为 height 是 500px，rowHeight 是 30 -> 最多 ~16 行
    if (newItem.y + newItem.h > maxY) {
        newItem.y = maxY - newItem.h;
    }
}

// 图片映射函数
const getImageSrc = (type) => {
    return imageMap[type] || 'https://via.placeholder.com/300'
}

</script>

<style scoped>
.aside {
    background-color: white;
    overflow: auto;
    max-height: 500px;
}
</style>
