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
  <div>
    <h1>Stories</h1>
    <ul v-if="apiData.length">
      <li v-for="story in apiData" :key="story.id">
        <h2>{{ story.title }}</h2>
        <p>{{ story.content }}</p>
      </li>
    </ul>
    <p v-else>No stories available.</p>
  </div>
</template>

<style>
h1 {
  color: #42b983;
  text-align: center;
  font-family: Arial, sans-serif;
}
h2 {
  color: #2c3e50;
}
p {
  color: #34495e;
}
</style>
