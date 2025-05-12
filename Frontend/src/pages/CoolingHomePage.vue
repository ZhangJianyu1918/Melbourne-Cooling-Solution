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
            <div style="height: 80vh; margin: 0; padding: 0;">
                <div style="padding: 0; overflow: hidden;">
                    <div v-if="game">
                        <div
                            style="background: #f0f0f0; width: 100%; height: 500px; overflow: hidden; border-radius: 20px; justify-items: center; align-content: center;">
                            <p></p>
                            <el-input v-model="coins" placeholder="Please Input Your Budget." width="200px"
                                type="number"></el-input>
                            <el-button type="" @click="game = !game;" style="">
                                Start Game
                            </el-button>
                        </div>
                    </div>
                    <div v-else @dragover.prevent @drop="onDrop($event)" style="width: 100vw;">
                        <div v-if="aside" class="aside">
                            <div>
                                <el-button @click="aside = !aside">
                                    <el-icon>
                                        <ArrowLeftBold />
                                    </el-icon>
                                </el-button>
                                <h5>🏠 Mode: Owner</h5>
                                <h5>💰 Budget {{ coins }} AUD</h5>
                                <h5>Buy Item</h5>
                                <el-collapse v-model="activeNames" @change="handleChange">
                                    <el-collapse-item title="How to play" name="1">
                                        <ul>
                                            <li>Access to Shop and your Bag from the right tabs.</li>
                                            <li>Click on each item to see
                                                its details and buy.</li>
                                            <li>Drag and drop items from
                                                your Bag into your desired
                                                spot in the living room.</li>
                                            <li>Watch your room
                                                temperature drop!</li>
                                            <li>Finished decorating? Hit
                                                “Finish My Setup” on the
                                                bottom right corner to get
                                                your final score and
                                                feedback on your strategy.</li>
                                        </ul>
                                        <h6>Notes:</h6>
                                        <ul>
                                            <li>Renter can't install Ceiling Fan and Air Conditioner.</li>
                                            <li>Sunny places are good for plants.</li>
                                            <li>Stay within your budget!</li>
                                        </ul>
                                    </el-collapse-item>
                                    <el-collapse-item title="Description" name="2">
                                        <p>
                                            It’s a scorching 35°C day, and
                                            your living room is baking.
                                            You’re renting, so forget
                                            drilling holes, installing fans,
                                            or asking your landlord for
                                            help. You’ve got to work with
                                            what’s portable, affordable,
                                            and approval-free.
                                            You’ve got a limited budget
                                            and a mission: cool this space
                                            down using smart, renter-
                                            friendly solutions.
                                            Aim to bring the room
                                            temperature down by at least
                                            5°C to survive the heat.
                                            Think strategically. Spend
                                            wisely. And whatever you do…
                                            don’t melt. 🫠
                                        </p>
                                    </el-collapse-item>
                                </el-collapse>

                                <el-button v-show="!game"
                                    @click="game = !game; centerDialogVisible = true; coins = null">Setting</el-button>
                                <el-button v-show="!game" @click="game = !game; coins = null">Exit Game</el-button>
                            </div>
                        </div>
                        <el-button class="aside-button" v-else @click="aside = !aside" style="height: fit-content;">
                            <div>
                                <h5>🏠 Mode: Owner</h5>
                                <h5>💰 Budget {{ coins }} AUD</h5>
                            </div>
                        </el-button>
                        <GridLayout ref="gridRef" :layout="layout" :col-num="12" :row-height="30" :is-draggable="true"
                            :is-resizable="true" :vertical-compact="false" :margin="[10, 10]" :use-css-transforms="true"
                            :style="{
                                backgroundImage: `url(${livingRoomBg})`,
                                width: '70%',
                                backgroundSize: 'cover',
                                backgroundSize: '100% 100%',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                height: '600px',
                                overflow: 'hidden',
                                borderRadius: '20px',
                            }" :prevent-collision="true">


                            <GridItem v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w"
                                :h="item.h" :i="item.i" :static="item.static">
                                <img :src="getImageSrc(item.type)" alt="Image"
                                    style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px; min-width: 50px; min-height: 50px;" />
                            </GridItem>
                        </GridLayout>
                        <div v-if="shopAisde" class="shop">
                            <el-button @click="shopAisde = !shopAisde">
                                <el-icon>
                                    <ArrowLeftBold /> Shop
                                </el-icon>
                            </el-button>
                        </div>
                        <div v-else class="shop">
                            <el-button @click="shopAisde = !shopAisde">
                                <el-icon>
                                    <ArrowRightBold />
                                </el-icon>
                            </el-button>
                            <div v-for="(item, key) in storeItems" :key="key" style="overflow: auto;">
                                <div class="cursor-move p-2 border rounded bg-white shadow" @click="showDetail(key)" draggable="false">
                                    <img :src="item.img" style="width: 100px;" />
                                    <div class="flex flex-col">
                                        <span class="font-medium">{{ item.name }}</span>
                                        <span class="text-sm text-gray-500">${{ item.price }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="bagAisde" class="bag">
                            <el-button @click="bagAisde = !bagAisde">My Bag List</el-button>
                            <div v-for="(item, key) in bag" :key="key" style="overflow: hidden;">
                                <div class="cursor-move p-2 border rounded bg-white shadow" draggable="true"
                                    @dragstart="onDragStart($event, key)">
                                    <img :src="item.img" style="width: 100px;" />
                                    <div class="flex flex-col">
                                        <span class="font-medium">{{ item.name }}</span>
                                        <span class="text-sm text-gray-500">${{ item.price }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <el-button class="bag" v-else @click="bagAisde = !bagAisde">My Bag</el-button>
                    </div>
                </div>

            </div>
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

        <el-dialog v-model="dialogVisible" :modal="false">
            <span>It's a modal Dialog</span>
            <p>{{ storeItems[currentKey] }}</p>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-input-number v-model="itemNumber" :min="1" :max="10"></el-input-number>
                    <el-button type="primary" @click="buyItem()">
                        Buy
                    </el-button>
                </div>
            </template>
        </el-dialog>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { GridLayout, GridItem } from 'vue3-grid-layout'
import livingRoomBg from '../assets/living-room.png';

const coins = ref()
const game = ref(true)
const aside = ref(true)
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
const shopAisde = ref(true)
const bagAisde = ref(true)
const bag = ref([])
const dialogVisible = ref(false)
const currentKey = ref(null)
const itemNumber = ref(1)

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
    return imageMap[type]
}

const showDetail = (key) => {
    dialogVisible.value = true
    currentKey.value = key
}

const buyItem = () => {
    coins.value -= storeItems.value[currentKey.value].price * itemNumber.value;
    for (let i = 0; i < itemNumber.value; i++) {
        bag.value.push(storeItems.value[currentKey.value])
    }
    dialogVisible.value = false;
}

</script>

<style scoped>
.aside {
    position: fixed;
    top: 100px;
    z-index: 10;
    width: 200px;
    background-color: white;
    /* overflow: auto; */
    max-height: 600px;
}


.aside-button {
    position: fixed;
    top: 100px;
    z-index: 10;
}

.shop {
    position: fixed;
    top: 100px;
    right: 0;
    z-index: 10;
}

.bag {
    position: fixed;
    top: 200px;
    right: 0;
    z-index: 10;
}
</style>
