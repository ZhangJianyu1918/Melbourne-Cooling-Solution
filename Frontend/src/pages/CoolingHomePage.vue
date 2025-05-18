<template>
    <div class="container">
        <el-button type="text" @click="$router.push('/personal-cooling-guide')"
            style="font: 1.2em sans-serif; padding-top: 30px;">
            <el-icon class="mr-1"><arrow-left /></el-icon>
            Go back to Personal Guide Page
        </el-button>
        <div style="height: 30px;"></div>
        <h1 style="font-family: Abril Fatface; font-weight: 1000; color: #19619E; ">Game: Cooling My Home</h1>
        <div style="height: 10px;"></div>
        <p>Discover practical ways to keep your home cool during heatwaves. This game gives you inspiring ideas of
            cooling strategies, decoration, and smart energy-saving tips. </p>
        <div style="border-radius: 20px;">
            <div style="height: 80vh; margin: 0; padding: 0;">
                <div style="padding: 0; overflow: hidden;">
                    <div v-if="game">
                        <div style="background-color: white; 
                            width: 100%; height: 500px; overflow: hidden; border-radius: 20px;
                            display: flex; justify-content: center; align-items: center;">
                            <el-form label-position="top">
                                <el-form-item label="Please Input Your Budget:">
                                    <el-input-number v-model="coins" placeholder="Maximum budget is 2000 AUD."
                                        :max="2000" style="width: 300px;">
                                    </el-input-number>
                                </el-form-item>

                                <el-form-item label="Choose Role">
                                    <el-select v-model="mode" placeholder="Please choose your role:"
                                        style="width: 300px;">
                                        <el-option label="Owner" value="Owner"></el-option>
                                        <el-option label="Renter" value="Renter"></el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="primary" @click="startGame" style="width: 300px;">
                                        Start Game
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>

                    <div style="overflow: hidden; position: relative;" v-else>
                        <div class="overview">
                            <sapn>🌡️ Temperature: {{ temperature }}°C</sapn>
                            <br>
                            <sapn>❄️ Dropped: {{ dropped }}°C</sapn>
                        </div>
                        <div v-if="aside" class="aside">
                            <el-button @click="aside = !aside">
                                <el-icon>
                                    <ArrowLeftBold />
                                </el-icon>
                            </el-button>
                            <div style="color: #787fbf; padding: 20px 0;">
                                <h6>🏠 Mode: {{ mode }}</h6>
                                <h6>💰 Budget {{ coins - usedCoin }} AUD</h6>
                            </div>

                            <el-collapse style="border: none">
                                <el-collapse-item title="How to play" name="1" style="border: none">
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
                                <el-collapse-item title="Description" name="2" style="border: none">
                                    <p>
                                        {{ descriptionContent }}
                                    </p>
                                </el-collapse-item>
                            </el-collapse>
                            <div class="exit-button-group">
                                <el-button v-show="!game" @click="exitGame()">Exit Game</el-button>
                            </div>
                        </div>
                        <el-button class="aside-button" v-else @click="aside = !aside" style="height: fit-content;">
                            <div style="color: #787fbf;">
                                <h6>🏠 Mode: {{ mode }}</h6>
                                <h6>💰 Budget {{ coins - usedCoin }} AUD</h6>
                            </div>
                        </el-button>
                        <!-- <GridLayout ref="gridRef" :layout="layout" :col-num="12" :row-height="30" :is-draggable="true"
                            :is-resizable="true" :vertical-compact="false" :margin="[10, 10]" :use-css-transforms="true"
                            class="game-class" :style="{
                                backgroundImage: `url(${livingRoomBg})`,
                                width: '100%',
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
                                <img :src="getImageSrc(item.index)" alt="Image"
                                    style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px; min-width: 50px; min-height: 50px;"
                                    @click="remove(item.i)" />
                            </GridItem>
                        </GridLayout> -->
                        <div class="game-class" :style="{
                            ...switchBackgroundImage,
                            width: '100%',
                            backgroundSize: 'cover',
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            height: '600px',
                            overflow: 'hidden',
                            borderRadius: '20px',
                        }">
                            <div v-for="(item, key) in layout" :key="key">
                                <img :src="getImageSrc(item.item)" alt="Image" style="" :style="{
                                    position: 'absolute',
                                    zIndex: 9,
                                    top: item.top + 'px',
                                    left: item.left + 'px',
                                    width: item.w + 'px',
                                    height: item.h + 'px'
                                }" @click="remove(item)" />
                            </div>
                        </div>
                        <!-- <div v-for="oval in ellipses" :key="oval.id" class="highlight-ellipse" :style="{
                            width: oval.width + 'px',
                            height: oval.height + 'px',
                            top: oval.top + 'px',
                            left: oval.left + 'px',
                        }"></div> -->
                        <!-- <div v-if="shopAisde" class="shop">
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
                            <div v-for="(item, key) in storeItems" :key="key" style="overflow: hidden;">
                                <div class="cursor-move p-2 border rounded bg-white shadow" @click="showDetail(key)"
                                    draggable="false">
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
                            <div v-for="(item, index) in bag" :key="index" style="overflow: hidden;">
                                <div class="cursor-move p-2 border rounded bg-white shadow" draggable="true"
                                    @dragstart="onDragStart($event, index)">
                                    <img :src="item.img" style="width: 100px;" />
                                    <div class="flex flex-col">
                                        <span class="font-medium">{{ item.name }}</span>
                                        <span class="text-sm text-gray-500">${{ item.price }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <el-button class="bag" v-else @click="bagAisde = !bagAisde">My Bag</el-button> -->
                        <div class="right-panel">
                            <!-- shop 面板 -->
                            <div v-if="shopAisde" class="shop-button" @click="shopAisde = !shopAisde">
                                🛒 Shop
                            </div>
                            <div v-else class="shop" @click="shopAisde = !shopAisde">
                                <el-icon style="padding-top: 20px;">
                                    <DArrowRight />
                                </el-icon>
                                <span>🛒 Shop</span>
                                <div v-for="(item, key) in storeItems" :key="key" style="overflow: hidden;">
                                    <div @click="showDetail(key)" draggable="false" style="cursor: pointer;">
                                        <el-row class="list">
                                            <el-col :span="8"><img :src="item.img" style="width: 50px;" /></el-col>
                                            <el-col :span="16">
                                                <div class="flex flex-col">
                                                    <span class="font-medium">{{ item.name }}</span>
                                                    <el-row>
                                                        <el-col :span="12"><span class="text-sm"
                                                                style="color: #ffab50;">${{ item.price
                                                                }}</span></el-col>
                                                        <el-col :span="12"><span class="text-sm"
                                                                style="color: #26afff;">-{{ item.cooling
                                                                }}°C</span></el-col>
                                                    </el-row>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </div>
                            <!-- bag 面板 -->
                            <div v-if="bagAisde" class="bag">
                                <div @click="bagAisde = !bagAisde" style="height: 50px; align-content: center;">
                                    <el-icon>
                                        <DArrowRight />
                                    </el-icon>
                                    👜 My Bag ({{ totalNumber }})
                                </div>
                                <div v-if="totalNumber == 0">
                                    <span style="padding: 10px;">It feels lonely in here:(</span>
                                </div>
                                <div v-else v-for="(item, index) in bag" :key="index">
                                    <div v-if="item.length > 0" class="cursor-move p-2 border rounded bg-white shadow"
                                        draggable="true" @click="useItem(item)" style="cursor: pointer;">
                                        <el-row>
                                            <el-col :span="8"><img :src="item[0].img" style="width: 50px;" /></el-col>
                                            <el-col :span="16">
                                                <div class="flex flex-col">
                                                    <span class="font-medium">{{ item[0].name }} ({{ item.length
                                                    }})</span>
                                                    <el-row>
                                                        <el-col :span="10"><span class="text-sm"
                                                                style="color: #ffab50;">${{ item[0].price
                                                                }}</span></el-col>
                                                        <el-col :span="10"><span class="text-sm"
                                                                style="color: #26afff;">-{{ item[0].cooling
                                                                }}°C</span></el-col>
                                                    </el-row>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </div>
                            <div class="bag-button" v-else @click="bagAisde = !bagAisde">
                                👜 My bag ({{ totalNumber }})
                            </div>
                        </div>
                        <el-button class="endButton" @click="endGame()" round>Finish My Setup</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div style="text-align: end;">
            <el-button type="text" @click="$router.push('/heat-insights')"
                style="font: 1.2em sans-serif; padding-top: 30px;">
                <el-icon class="mr-1"><arrow-right /></el-icon>
                Go to Heat Insights Page
            </el-button>
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

        <el-dialog v-model="dialogVisible" :modal="false" width="300px">
            <div class="plant-card">
                <div class="plant-icon">
                    <img :src="storeItems[currentKey].img" alt="Aloe Vera" />
                </div>
                <div class="plant-details">
                    <h3>{{ storeItems[currentKey].name }}</h3>
                    <p class="price">${{ storeItems[currentKey].price }} <span class="temp">-{{
                        storeItems[currentKey].cooling
                            }}°C</span></p>
                    <p class="description">
                        <!-- {{ storeItems[currentKey].description }} -->
                    </p>
                </div>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-input-number v-model="itemNumber" :min="1" :max="10" size="small"></el-input-number>
                    <el-button type="primary" @click="buyItem()" class="buy-button">Buy</el-button>
                </div>
            </template>
        </el-dialog>

        <el-dialog v-model="endGameDialogVisible" title="Warning" width="500" align-center :modal="false">
            <span>✅ Setup Complete!</span>
            <p>Well done! You’ve finished setting up your living room to beat the heat.</p>
            <p>Here’s your strategy feedback:</p>
            <ul>
                <li>🌡️ Room temperature reduced by: {{ dropped }}°C</li>
                <li>💰 Budget used: {{ usedCoin }} by {{ coins }}</li>
                <li>💪 Efficiency: {{ efficiency }}</li>
            </ul>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="endGameDialogVisible = false; exitGame()" round>Play Again</el-button>
                    <!-- <el-button @click="endGameDialogVisible = false" round>Home</el-button> -->
                </div>
            </template>
        </el-dialog>

        <el-dialog v-model="dialogPlantVisible" title="Choose one area to put item" width="500">
            <el-alert v-if="alertVisible" title="Error Alert"
                description="This area is used. Please chosse another area." style="margin-bottom: 10px;" type="error"
                effect="dark" show-icon />
            <el-select v-model="plantArea" placeholder="Please select a zone">
                <el-option label="Area 4.1" value="4.1" />
                <el-option label="Area 4.2" value="4.2" />
                <el-option label="Area 4.3" value="4.3" />
                <el-option label="Area 5.1" value="5.1" />
                <el-option label="Area 5.2" value="5.2" />
                <el-option label="Area 6.1" value="6.1" />
                <el-option label="Area 6.2" value="6.2" />
                <el-option label="Area 6.3" value="6.3" />
                <el-option label="Area 6.4" value="6.4" />
                <el-option label="Area 6.5" value="6.5" />
                <el-option label="Area 7" value="7" />
            </el-select>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogPlantVisible = false; alertVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="submitPlant()">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogWindowVisible" title="Choose one area to put item" width="500">
            <!-- <el-alert v-if="alertVisible" title="This area is used. Please chosse another area." style="margin: 10px;" type="error" effect="dark" /> -->
            <el-alert v-if="alertVisible" title="Error Alert"
                description="This area is used. Please chosse another area." style="margin-bottom: 10px;" type="error"
                effect="dark" show-icon />
            <el-select v-model="windowArea" placeholder="Please select a zone">
                <el-option label="Area 3.1" value="3.1" />
                <el-option label="Area 3.2" value="3.2" />
            </el-select>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogWindowVisible = false; alertVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="submitWindow()">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogTopVisible" title="Choose one area to put item" width="500">
            <!-- <el-alert v-if="alertVisible" title="This area is used. Please chosse another area." style="margin: 10px;" type="error" effect="dark" /> -->
            <el-alert v-if="alertVisible" title="Error Alert"
                description="This area is used. Please chosse another area." style="margin-bottom: 10px;" type="error"
                effect="dark" show-icon />
            <el-select v-model="topArea" placeholder="Please select a zone">
                <el-option label="Area 1" value="1" />
            </el-select>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogTopVisible = false; alertVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="submitTop()">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogAcVisible" title="Choose one area to put item" width="500">
            <!-- <el-alert v-if="alertVisible" title="This area is used. Please chosse another area." style="margin: 10px;" type="error" effect="dark" /> -->
            <el-alert v-if="alertVisible" title="Error Alert"
                description="This area is used. Please chosse another area." style="margin-bottom: 10px;" type="error"
                effect="dark" show-icon />
            <el-select v-model="acArea" placeholder="Please select a zone">
                <el-option label="Area 2.1" value="2.1" />
                <el-option label="Area 2.2" value="2.2" />
            </el-select>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogAcVisible = false; alertVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="submitAC()">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { GridLayout, GridItem } from 'vue3-grid-layout'
import livingRoomBg from '../assets/evaluation of each position.png';
import { ElMessage, ElMessageBox } from 'element-plus'

const coins = ref()
const usedCoin = ref(0)
const game = ref(true)
const aside = ref(true)
const centerDialogVisible = ref(false)
const storeItems = ref({
    item1: { name: 'Aloe Vera', price: 20, cooling: 0.5, description: 'description1', img: new URL('../assets/aloe_vera.png', import.meta.url).href },
    item2: { name: 'Snake Plant', price: 30, cooling: 0.4, description: 'description2', img: new URL('../assets/snake_plant.png', import.meta.url).href },
    item3: { name: 'Electricity Fan', price: 50, cooling: 2.5, description: 'description3', img: new URL('../assets/electric_fan.png', import.meta.url).href },
    item4: { name: 'Blinds', price: 60, cooling: 1.5, description: 'description4', img: new URL('../assets/blinds.png', import.meta.url).href },
    item5: { name: 'Curtains', price: 100, cooling: 3, description: 'description5', img: new URL('../assets/curtains.png', import.meta.url).href },
    item6: { name: 'Ceiling Fan', price: 170, cooling: 4, description: 'description6', img: new URL('../assets/ceiling_fan.png', import.meta.url).href },
    item7: { name: 'Air Conditioner', price: 1000, cooling: 8, description: 'description7', img: new URL('../assets/ac.png', import.meta.url).href },
})
// const imageMap = {
//     plant1: new URL('../assets/plant1.png', import.meta.url).href,
//     plant2: new URL('../assets/plant2.png', import.meta.url).href,
//     plant3: new URL('../assets/plant3.png', import.meta.url).href,
//     windowCovering1: new URL('../assets/window-covering1.png', import.meta.url).href,
//     windowCovering2: new URL('../assets/window-covering2.png', import.meta.url).href,
//     windowCovering3: new URL('../assets/window-covering3.png', import.meta.url).href,
// }
let imageMap = []
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
// const bag = ref([
//     {'Aloe Vera': []},
//     {'Snake Plant': []},
//     {'Electricity Fan': []},
//     {'Blinds': []},
//     {'Curtains': []},
//     {'Ceiling Fan': []},
//     {'Air Conditioner': []}
// ])
const bag = ref({
    'Aloe Vera': [],
    'Snake Plant': [],
    'Electricity Fan': [],
    'Blinds': [],
    'Curtains': [],
    'Ceiling Fan': [],
    'Air Conditioner': []
})
const dialogVisible = ref(false)
const currentKey = ref(null)
const itemNumber = ref(1)
const temperature = ref(35)
const endGameDialogVisible = ref(false)
const dropped = ref(0)
const budget = ref()
const ellipses = ref([
    { id: 1, width: 160, height: 40, top: 10, left: 500 },
    { id: 2, width: 160, height: 40, top: 160, left: 270 },
    { id: 3, width: 160, height: 40, top: 160, left: 690 },
    { id: 4, width: 160, height: 40, top: 340, left: 280 },
    { id: 5, width: 160, height: 40, top: 340, left: 690 },
    { id: 6, width: 120, height: 40, top: 340, left: 990 },
    { id: 7, width: 160, height: 40, top: 590, left: 550 },
    { id: 8, width: 160, height: 40, top: 1090, left: 810 },
    { id: 9, width: 160, height: 40, top: 1090, left: 1040 },
    { id: 10, width: 160, height: 40, top: 1200, left: 380 },
    { id: 11, width: 160, height: 40, top: 1200, left: 1440 },
    { id: 12, width: 160, height: 40, top: 1250, left: 1640 },
    { id: 13, width: 160, height: 40, top: 1250, left: 220 },
    { id: 7, width: 160, height: 40, top: 1220, left: 30 },
])
const mode = ref()
const dialogPlantVisible = ref(false)
const dialogWindowVisible = ref(false)
const dialogTopVisible = ref(false)
const dialogAcVisible = ref(false)
const plantArea = ref()
const windowArea = ref()
const topArea = ref()
const acArea = ref()
let targetItem
const areaSet = new Set([
    // '1', '2.1', '2.2', '3.1', '3.2',
    // '5.1', '5.2', '6.1', '6.2',
    // '6.3', '6.4', '6.5', 
]);
const alertVisible = ref(false)
const imageAreaMap = new Map()
const totalNumber = ref(0)
const efficiency = ref('')
const description = ref('')
const baImages = [
    new URL('../assets/evaluation of each position.png', import.meta.url).href,
    new URL('../assets/renter-bg.png', import.meta.url).href
]

const switchBackgroundImage = computed(() => ({
    backgroundImage: `url(${mode.value === 'Renter' ? baImages[1] : baImages[0]})`
}))

const descriptionContent = computed(() => {
    if (mode.value === 'Owner') {
        return `It’s a scorching 35°C day, and your living room is baking.
You own this place, and you’ve got options. Curtains, ceiling fans, AC units... you can install what you need to win the heat war.
With a budget and full control of your space, your challenge is to optimise comfort and cool your home smartly.
Aim to bring the room temperature down by at least 3°C to survive the heat.
Think strategically. Spend wisely. And whatever you do… don’t melt. 🫠`
    } else {
        return `It’s a scorching 35°C day, and your living room is baking.
You’re renting, so forget drilling holes, installing fans, or asking your landlord for help.
You’ve got to work with what’s portable, affordable, and approval-free.
You’ve got a limited budget and a mission: cool this space down using smart, renter-friendly solutions.
Aim to bring the room temperature down by at least 3°C to survive the heat.
Think strategically. Spend wisely. And whatever you do… don’t melt. 🫠`
    }
})

const startGame = () => {
    if (coins.value <= 0) {
        alert("You have to input number between 1 and 2000.")
        return;
    }
    if (coins.value == null || mode.value == null) {
        alert("Please input both data here.")
        return
    }
    budget.value = coins.value
    usedCoin.value = 0
    game.value = !game.value
    descriptionContent()
}



const exitGame = () => {
    coins.value = 0
    layout.value = []
    bag.value = {
        'Aloe Vera': [],
        'Snake Plant': [],
        'Electricity Fan': [],
        'Blinds': [],
        'Curtains': [],
        'Ceiling Fan': [],
        'Air Conditioner': []
    }
    game.value = true
    totalNumber.value = 0;
    imageMap = []
    imageAreaMap.clear()
    targetItem = null
    plantArea.value = null
    windowArea.value = null
    topArea.value = null
    budget.value = null
    acArea.value = null
    dropped.value = 0
    temperature.value = 35
    usedCoin.value = null
    mode.value = null
    efficiency.value = ''
}

const endGame = () => {
    if (imageAreaMap.size == 0) {
        efficiency.value = "You didn't put anything."
    }
    else if (imageAreaMap.has('7') && dropped.value < 3) {
        efficiency.value = "The 'item' blocked the door :( temperature can be dropped more";
    }
    else if (imageAreaMap.has('7') && dropped.value >= 3) {
        efficiency.value = "Your home is cooled excellently! Improve the decoration by not letting 'item' blocks the door next time.";
    }
    else if (!imageAreaMap.has('7') && dropped.value < 3) {
        efficiency.value = 'Good decoration! Try to drop more temperature (over 3°C) next time.'
    } else {
        efficiency.value = 'Your home is cooled excellently! Amazing decoration!'
    }
    endGameDialogVisible.value = true
}

// // 拖拽结束时添加新的布局元素
// function onDrop(e) {
//     if (!gridRef.value || !e.clientX || !e.clientY) return;
//     const containerRect = gridRef.value.$el.getBoundingClientRect();
//     const index = e.dataTransfer.getData('index')
//     const item = bag.value[index];
//     // console.log(item)
//     const mouseX = e.clientX - containerRect.left;
//     const mouseY = e.clientY - containerRect.top;
//     const col = Math.floor(mouseX / (colWidth.value + 10)); // 10 是 marginX
//     const row = Math.floor(mouseY / (30 + 10));             // 30 是 rowHeight，10 是 marginY

//     layout.value.push({
//         x: col,
//         y: row,
//         w: 2,
//         h: 4,
//         i: String(Date.now()),
//         index
//     });

//     temperature.value -= item.cooling
//     dropped.value += item.cooling
// }

// // 拖拽开始时保存被拖的内容标识
// function onDragStart(event, index) {
//     event.dataTransfer.setData('index', index)
//     draggedItem.value = index
// }

// const onDragStop = (layout, oldItem, newItem) => {
//     const maxY = Math.floor(500 / 30); // 因为 height 是 500px，rowHeight 是 30 -> 最多 ~16 行
//     if (newItem.y + newItem.h > maxY) {
//         newItem.y = maxY - newItem.h;
//     }
// }

const submitPlant = () => {
    if (mappingArea(plantArea)) {
        const index = bag.value[targetItem.name].findIndex(e => e.i === targetItem.i);
        if (index !== -1) bag.value[targetItem.name].splice(index, 1);
        plantArea.value = null
        dialogPlantVisible.value = false
    }
}

const submitWindow = () => {
    if (mappingArea(windowArea)) {
        const index = bag.value[targetItem.name].findIndex(e => e.i === targetItem.i);
        if (index !== -1) bag.value[targetItem.name].splice(index, 1);
        windowArea.value = null
        dialogWindowVisible.value = false
    }
}

const submitTop = () => {
    if (mappingArea(topArea)) {
        const index = bag.value[targetItem.name].findIndex(e => e.i === targetItem.i);
        if (index !== -1) bag.value[targetItem.name].splice(index, 1);
        topArea.value = null
        dialogTopVisible.value = false
    }
}

const submitAC = () => {
    if (mappingArea(acArea)) {
        const index = bag.value[targetItem.name].findIndex(e => e.i === targetItem.i);
        if (index !== -1) bag.value[targetItem.name].splice(index, 1);
        acArea.value = null
        dialogAcVisible.value = false
    }
}

const useItem = (item) => {
    targetItem = item[0]
    if (targetItem.name == 'Snake Plant' || targetItem.name == 'Aloe Vera' || targetItem.name == 'Electricity Fan') {
        dialogPlantVisible.value = true
    }
    else if (targetItem.name == 'Blinds' || targetItem.name == 'Curtains') {
        dialogWindowVisible.value = true
    }
    else if (targetItem.name == 'Ceiling Fan') {
        dialogTopVisible.value = true
    }
    else if (targetItem.name == 'Air Conditioner') {
        dialogAcVisible.value = true
    }
}

// const mappingArea = (area) => {
//     if (imageAreaMap.has(String(area.value))) {
//         alert("This area is already used. Please choose another area.")
//         return false
//     }
//     imageAreaMap.set(String(area.value), targetItem);
//     totalNumber.value -= 1;
//     let newImageArea = null
//     if (area.value == '1') {
//         newImageArea = {
//             top: 40,
//             left: 415,
//             w: 100,
//             h: 100,
//             i: String(Date.now()),
//             item: targetItem
//         }
//     }
//     else if (area.value == '2.1') {
//         layout.value.push({
//             top: 100,
//             left: 170,
//             w: 80,
//             h: 80,
//             i: String(Date.now()),
//             item: targetItem
//         });
//     }
//     else if (area.value == '2.2') {
//         layout.value.push({
//             top: 100,
//             left: 670,
//             w: 80,
//             h: 80,
//             i: String(Date.now()),
//             item: targetItem
//         });
//     }
//     else if (area.value == '3.1') {
//         layout.value.push({
//             top: 175,
//             left: 210,
//             w: 160,
//             h: 180,
//             i: String(Date.now()),
//             item: targetItem
//         });
//     }
//     else if (area.value == '3.2') {
//         layout.value.push({
//             top: 175,
//             left: 545,
//             w: 160,
//             h: 180,
//             i: String(Date.now()),
//             item: targetItem
//         });
//     }
//     else if (area.value == '4.1') {
//         layout.value.push({
//             top: 275,
//             left: 245,
//             w: 100,
//             h: 100,
//             i: String(Date.now()),
//             item: targetItem
//         });
//     }
//     else if (area.value == '4.2') {
//         layout.value.push({
//             top: 270,
//             left: 580,
//             w: 100,
//             h: 100,
//             i: String(Date.now()),
//             item: targetItem
//         });
//     }
//     else if (area.value == '4.3') {
//         layout.value.push({
//             top: 270,
//             left: 830,
//             w: 100,
//             h: 100,
//             i: String(Date.now()),
//             item: targetItem
//         });
//     }
//     else if (area.value == '5.1') {
//         layout.value.push({
//             top: 380,
//             left: 325,
//             w: 100,
//             h: 100,
//             i: String(Date.now()),
//             item: targetItem
//         });
//     }
//     else if (area.value == '5.2') {
//         layout.value.push({
//             top: 380,
//             left: 420,
//             w: 100,
//             h: 100,
//             i: String(Date.now()),
//             item: targetItem
//         });
//     }
//     else if (area.value == '6.1') {
//         layout.value.push({
//             top: 380,
//             left: 130,
//             w: 100,
//             h: 100,
//             i: String(Date.now()),
//             item: targetItem
//         });
//     }
//     else if (area.value == '6.2') {
//         layout.value.push({
//             top: 450,
//             left: 170,
//             w: 100,
//             h: 100,
//             i: String(Date.now()),
//             item: targetItem
//         });
//     }
//     else if (area.value == '6.3') {
//         layout.value.push({
//             top: 450,
//             left: 575,
//             w: 100,
//             h: 100,
//             i: String(Date.now()),
//             item: targetItem
//         });
//     }
//     else if (area.value == '6.4') {
//         layout.value.push({
//             top: 380,
//             left: 642,
//             w: 100,
//             h: 100,
//             i: String(Date.now()),
//             item: targetItem
//         });
//     }
//     else if (area.value == '6.5') {
//         layout.value.push({
//             top: 420,
//             left: 775,
//             w: 100,
//             h: 100,
//             i: String(Date.now()),
//             item: targetItem
//         });
//     }
//     else if (area.value == '7') {
//         layout.value.push({
//             top: 420,
//             left: 25,
//             w: 100,
//             h: 100,
//             i: String(Date.now()),
//             item: targetItem
//         });
//     }
//     imageAreaMap.set(String(area.value), newImageArea);
//     layout.value.push(newImageArea);
//     temperature.value -= targetItem.cooling
//     dropped.value += targetItem.cooling
//     return true
// }

// 图片映射函数

const mappingArea = (area) => {
    if (imageAreaMap.has(String(area.value))) {
        alert("This area is already used. Please choose another area.")
        return false
    }
    imageAreaMap.set(String(area.value), targetItem);
    totalNumber.value -= 1;
    let newImageArea = null;

    if (area.value == '1') {
        newImageArea = {
            top: 40,
            left: 415,
            w: 100,
            h: 100,
            i: String(Date.now()),
            item: targetItem
        };
    }
    else if (area.value == '2.1') {
        newImageArea = {
            top: 100,
            left: 170,
            w: 80,
            h: 80,
            i: String(Date.now()),
            item: targetItem
        };
    }
    else if (area.value == '2.2') {
        newImageArea = {
            top: 100,
            left: 670,
            w: 80,
            h: 80,
            i: String(Date.now()),
            item: targetItem
        };
    }
    else if (area.value == '3.1') {
        newImageArea = {
            top: 175,
            left: 210,
            w: 160,
            h: 180,
            i: String(Date.now()),
            item: targetItem
        };
    }
    else if (area.value == '3.2') {
        newImageArea = {
            top: 175,
            left: 545,
            w: 160,
            h: 180,
            i: String(Date.now()),
            item: targetItem
        };
    }
    else if (area.value == '4.1') {
        newImageArea = {
            top: 275,
            left: 245,
            w: 100,
            h: 100,
            i: String(Date.now()),
            item: targetItem
        };
    }
    else if (area.value == '4.2') {
        newImageArea = {
            top: 270,
            left: 580,
            w: 100,
            h: 100,
            i: String(Date.now()),
            item: targetItem
        };
    }
    else if (area.value == '4.3') {
        newImageArea = {
            top: 270,
            left: 830,
            w: 100,
            h: 100,
            i: String(Date.now()),
            item: targetItem
        };
    }
    else if (area.value == '5.1') {
        newImageArea = {
            top: 380,
            left: 325,
            w: 100,
            h: 100,
            i: String(Date.now()),
            item: targetItem
        };
    }
    else if (area.value == '5.2') {
        newImageArea = {
            top: 380,
            left: 420,
            w: 100,
            h: 100,
            i: String(Date.now()),
            item: targetItem
        };
    }
    else if (area.value == '6.1') {
        newImageArea = {
            top: 380,
            left: 130,
            w: 100,
            h: 100,
            i: String(Date.now()),
            item: targetItem
        };
    }
    else if (area.value == '6.2') {
        newImageArea = {
            top: 450,
            left: 170,
            w: 100,
            h: 100,
            i: String(Date.now()),
            item: targetItem
        };
    }
    else if (area.value == '6.3') {
        newImageArea = {
            top: 450,
            left: 575,
            w: 100,
            h: 100,
            i: String(Date.now()),
            item: targetItem
        };
    }
    else if (area.value == '6.4') {
        newImageArea = {
            top: 380,
            left: 642,
            w: 100,
            h: 100,
            i: String(Date.now()),
            item: targetItem
        };
    }
    else if (area.value == '6.5') {
        newImageArea = {
            top: 420,
            left: 775,
            w: 100,
            h: 100,
            i: String(Date.now()),
            item: targetItem
        };
    }
    else if (area.value == '7') {
        newImageArea = {
            top: 420,
            left: 25,
            w: 100,
            h: 100,
            i: String(Date.now()),
            item: targetItem
        };
    }

    imageAreaMap.set(String(area.value), newImageArea);
    layout.value.push(newImageArea);
    temperature.value -= targetItem.cooling;
    dropped.value += targetItem.cooling;
    return true;
}


const getImageSrc = (item) => {
    return item.img
}

const showDetail = (key) => {
    dialogVisible.value = true
    currentKey.value = key
}

const buyItem = () => {
    if (budget.value < storeItems.value[currentKey.value].price * itemNumber.value) {
        alert("Your cost will be over budget. Please take care of it.")
        return
    }
    if (mode.value == 'Renter' &&
        (storeItems.value[currentKey.value].name == 'Air Conditioner' ||
            storeItems.value[currentKey.value].name == 'Ceiling Fan')) {
        alert("You are a renter, you can't buy this and use it.")
        return
    }
    usedCoin.value += storeItems.value[currentKey.value].price * itemNumber.value;
    budget.value -= storeItems.value[currentKey.value].price * itemNumber.value;
    totalNumber.value += itemNumber.value
    for (let i = 0; i < itemNumber.value; i++) {
        // bag.value.push(storeItems.value[currentKey.value])
        bag.value[storeItems.value[currentKey.value].name].push(storeItems.value[currentKey.value])
        // imageMap[storeItems.value[currentKey.value].name] = storeItems.value[currentKey.value].img
        imageMap.push(storeItems.value[currentKey.value])
    }
    alert(`✅ You have bought ${storeItems.value[currentKey.value].name} successfully! The number of it is ${itemNumber.value}. Check your bag to see new item. ` )
    itemNumber.value = 1
    dialogVisible.value = false;
}

const remove = (item) => {
    ElMessageBox.confirm(
        'Remove item?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(() => {
            layout.value = layout.value.filter(e => e.i !== item.i)
            bag.value[item.item.name].push(item.item)
            let targetArea
            imageAreaMap.forEach((value, key) => {
                // if (value === item.item) {
                //     console.log(key)
                //     targetArea = String(key);
                // }
                // if (_.isEqual(value, item.item)) {
                //     console.log(key)
                //     targetArea = String(key);
                // }
                if (value.i == item.i) {
                    console.log(key)
                    targetArea = String(key);
                }
            });
            totalNumber.value += 1;
            dropped.value -= item.item.cooling
            temperature.value += item.item.cooling
            console.log("Before delete:", imageAreaMap);
            imageAreaMap.delete(targetArea);
            console.log("After delete:", imageAreaMap);
            ElMessage({
                type: 'success',
                message: 'Delete completed',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })

}
</script>

<style scoped>
.container {
    padding-left: 200px;
    padding-right: 200px;
}

.aside {
    position: absolute;
    flex-direction: column;
    display: flex;
    top: 0;
    /* left: 10px; */
    padding: 0 10px;
    z-index: 10;
    width: 200px;
    background-color: white;
    overflow: auto;
    height: 600px;
    border: 3px solid #787fbf;
}

.highlight-ellipse {
    position: absolute;
    border: 2px dashed black;
    border-radius: 50%;
    pointer-events: none;
    opacity: 0.7;
}

.exit-button-group {
    margin-top: auto;
    align-self: center;
    padding-bottom: 10px;
    justify-content: center;
}

.aside-button {
    width: fit-content;
    position: absolute;
    border-radius: 0 40px 40px 0;
    top: 100px;
    border: 3px solid #787fbf;
    z-index: 10;
}

/* .shop {
    position: absolute;
    top: 100px;
    right: 0;
    z-index: 10;
}

.bag {
    position: absolute;
    top: 200px;
    right: 0;
    z-index: 10;
} */

.right-panel {
    position: absolute;
    top: 100px;
    right: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.shop,
.bag {
    position: relative;
    background-color: white;
    border-radius: 20px 0 0 20px;
    padding-left: 10px;
    border: 3px solid #787fbf;
    cursor: pointer;
    max-height: 350px;
    overflow-y: auto;
    /* border-radius: 10px; */
}

.shop-button,
.bag-button {
    position: relative;
    min-width: 150px;
    height: 50px;
    align-content: center;
    border-radius: 20px 0 0 20px;
    border: 3px solid #787fbf;
    cursor: pointer;
    background-color: white;
}

.overview {
    position: absolute;
    background-color: white;
    top: 0;
    z-index: 10;
    right: 0;
}

.endButton {
    position: absolute;
    background-color: #787fbf;
    border: solid;
    border-color: white;
    color: white;
    bottom: 50px;
    right: 10px;
}

.endButton:hover {
    background-color: #5766ed;
    color: white;
}

.plant-card {
    display: flex;
    align-items: center;
    padding: 10px;
}

.plant-icon img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
}

.plant-details h3 {
    margin: 0;
    font-size: 1.2em;
    color: #333;
}

.price {
    margin: 5px 0;
    font-weight: bold;
    color: #e67e22;
}

.temp {
    color: #3498db;
    margin-left: 10px;
    font-weight: normal;
}

.description {
    font-size: 0.9em;
    color: #666;
    line-height: 1.4;
}

.dialog-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.buy-button {
    background-color: #7b68ee;
    border-color: #7b68ee;
}

.buy-button:hover {
    background-color: #6a5acd;
    border-color: #6a5acd;
}
</style>
