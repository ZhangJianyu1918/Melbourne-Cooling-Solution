<template>
  <div class="container">
    <div style="height: 50px;"></div>
    <h2 style="padding: 0 50px;">Community Support</h2>
    <div style="height: 20px;"></div>
    <p style="font-size: 22px; padding: 0 50px;">
      Learn how to help yourself and others to deal with UHI
      by accessing quick-response guides and local support service.
      Click on each card to read more about our support.
    </p>
    <div style="height: 20px;"></div>
    <el-row :gutter="24" justify="space-evenly" class="community-cards">
      <el-col v-for="(community, index) in communities" 
          :key="index" :span="6" :xs="24" :sm="12" :md="8"
          >
        <Card :title="community.title" 
              :image="community.image" 
              :description="community.description"
              :to="community.to" 
              :variant="community.variant"/>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import Card from '@/components/Card.vue';

const communities = [
  {
    image: "precaution.jpg",
    title: "☀️ Precautions",
    description: "Learn about heat risk safety guidelines, prevention tips, " + 
    "and how to protect yourself and others during extreme heat.",
    to: "/community-support/precaution",
    variant: 'community-support'
  },
  {
    image: "uhi-first-aid.png",
    title: "⛑️ UHI First Aid",
    description: "Recognise heat-illness signs, cool someone safely, and find nearby help. Tips and emergency contacts when every minute counts.",
    to: "/community-support/uhi-first-aid",
    variant: 'community-support'
  },
  {
    image: "recovery-and-aftercare.png",
    title: "🤕 Recovery and Aftercare",
    description: "Access information on recovery and aftercare for individuals in Melbourne, including managing long-term effects and support.",
    to: "/community-support/recovery-and-aftercare",
    variant: 'community-support'
  }
];
</script>

<style scoped>
h2 {
  color: #19619e;
  font-size: 3rem;
  font-weight: bold;
  font-family: 'Abril Fatface';
}
.community-cards {
  padding: 0 30px 50px 50px;
}
</style>