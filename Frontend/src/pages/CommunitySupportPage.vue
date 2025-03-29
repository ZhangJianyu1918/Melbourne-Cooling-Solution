<template>
  <div class="container">
    <div style="height: 50px;"></div>
    <h2>Community Support</h2>
    <div style="height: 20px;"></div>
    <p style="font-size: 22px;">
      Learn how to help yourself and others to deal with UHI
      by accessing quick-response guides and local support service.
      Click on each card to read more about our support.
    </p>
    <div style="height: 20px;"></div>
    <el-row :gutter="24" justify="space-evenly">
      <el-col v-for="(community, index) in communities" :key="index" :span="6" :xs="24" :sm="12" :md="8">
        <Card :title="community.title" 
              :image="community.image" 
              :description="community.description"
              :to="community.to" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import Card from '@/components/Card.vue';

const communities = [
  {
    image: "emergency-contacts.png",
    title: "🚑 Emergency Contacts",
    description: "This is the body text for this section description, " +
      "which stands here as a placeholder for later real ideas and contents",
    to: "/community-support/emergency-contacts"
  },
  {
    image: "uhi-first-aid.png",
    title: "⛑️ UHI First Aid",
    description: "This is the body text for this section description, " +
      "which stands here as a placeholder for later real ideas and contents",
    to: "/community-support/uhi-first-aid"
  },
  {
    image: "recovery-and-aftercare.png",
    title: "🤕 Recovery and Aftercare",
    description: "This is the body text for this section description, " +
      "which stands here as a placeholder for later real ideas and contents",
    to: "/community-support/recovery-and-aftercare"
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
</style>