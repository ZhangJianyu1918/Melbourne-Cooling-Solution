<!-- src/components/WeatherCard.vue -->
<template>
    <div class="weather-card">
        <transition name="fade-slide" mode="out-in">
            <div class="weather-content" :key="temp">
                <h3 class="place-name">{{ placeName }}</h3>
                <p class="date">{{ currentDate }}</p>
                <div class="temp">
                    <img :src="icon" alt="Weather icon" style="width: 50px;" />
                    {{ temp }}°C
                </div>
                <button :class="buttonClass" @click="$emit('find-shade')">
                    {{ buttonText }}
                </button>
            </div>
        </transition>
    </div>
</template>


<script setup>
import { computed } from 'vue';

const props = defineProps({
    temp: Number,
    placeName: {
        type: String,
        default: 'Melbourne'
    },
    icon: null
});

const emit = defineEmits(['find-shade']);

const currentDate = computed(() =>
    new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
);

const buttonClass = computed(() => {
    if (props.temp >= 30) return 'shade-button-hot';
    if (props.temp <= 10) return 'shade-button-cold';
    return 'shade-button-mild';
});

const buttonText = computed(() => {
    if (props.temp >= 30) return 'Too hot? Find shade!';
    if (props.temp <= 10) return 'Too cold? Find shelter!';
    return 'Enjoy the weather or find shade!';
});

const weatherIcon = computed(() => {
    if (props.temp >= 30) return '☀️';
    if (props.temp <= 10) return '❄️';
    return '⛅';
});
</script>

<style scoped>
.weather-card {
    position: absolute;

    font-family: Arial, sans-serif;
}

.weather-content {
    position: absolute;

    background-color: #fff;
    border-radius: 15px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 220px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    bottom: 30px;
    left: 20px;
}

.place-name {
    font-size: 18px;
    font-weight: bold;
    color: #19619e;
    margin: 0;
}

.date {
    font-size: 14px;
    color: #333;
    margin: 0;
}

.temp {
    font-size: 24px;
    font-weight: bold;
    color: #222;
}

.shade-button-hot {
    background-color: #ff4d4d;
    color: white;
}

.shade-button-cold {
    background-color: #4d79ff;
    color: white;
}

.shade-button-mild {
    background-color: #4caf50;
    color: white;
}

.shade-button-hot,
.shade-button-cold,
.shade-button-mild {
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.2s ease;
}

.shade-button-hot:hover {
    background-color: #e04343;
}

.shade-button-cold:hover {
    background-color: #3a66e0;
}

.shade-button-mild:hover {
    background-color: #3f9142;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

</style>