<template>
  <div class="container">
    <div style="height: 30px;"></div>
    <div style="margin-left: 70px;">
      <h1 style="font-family: Abril Fatface; font-weight: 1000; color: #19619E; ">Personal Guide</h1>
      <div style="height: 10px;"></div>
      <p>Get tailored advices based on your personal needs to beat the heat, elevate your health and make your living
        space cooler.</p>
    </div>

    <div style="height: 30px;"></div>
    <div>
      <el-row :gutter="50" class="row-bg" justify="space-evenly">
        <el-col v-for="(service, index) in services" :key="index" :span="8" :xs="24" :sm="10" :md="10" >
          <Card :title="service.title" :image="service.image" :description="service.description" :to="service.to"
            :variant="service.variant" style="width: 500px;" class="card-col"/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import Card from '@/components/Card.vue';

const services = [
  {
    image: "my-heat-health-guide.png",
    title: "💪 My Heat Health Guide",
    description: "Stay ahead of the heat with personalised health tips. This tool helps you track hydration, spot early signs of heat stress, and get advice to stay safe during hot weather.",
    to: "/personal-cooling-guide/heat-health-guide",
    variant: 'home'
  },
  {
    image: "cooling-my-home.png",
    title: "🏠 Game: Cooling My Home",
    description: "Discover practical ways to keep your home cool during heatwaves. This game gives you inspiring ideas of cooling strategies, decoration, and smart energy-saving tips. ",
    to: "/personal-cooling-guide/cooling-home",
    variant: 'home'
  },
]
</script>

<style scoped>
.card-col {
  display: flex;
  justify-content: center;
}
</style>