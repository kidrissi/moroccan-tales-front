<script setup>
import { ref, onMounted } from "vue";

const apiData = ref([]);

onMounted(async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/stories/list/");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    apiData.value = await response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
});
</script>

<template>
  <div class="app-container">
    <h1 class="text-center text-primary mb-4">Stories</h1>

    <div v-if="apiData.length" class="row">
      <div v-for="story in apiData" :key="story.id" class="col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ story.title }}</h5>
            <p class="card-text">{{ story.content }}</p>
            <footer class="blockquote-footer text-muted">Author: {{ story.author }}</footer>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="text-center text-danger">No stories available.</p>
  </div>
  <div>
    <router-view></router-view> <!-- This is where the routed components will be rendered -->
  </div>
</template>
<style scoped>
h1 {
  color: #42b983;
}

.card-title {
  color: #2c3e50;
}

.card-text {
  color: #34495e;
}
</style>
