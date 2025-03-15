<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "@/axios"; // Import axios instance
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const error = ref(null);
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post("accounts/login/", {
      username: username.value,
      password: password.value,
    });

    // Assuming the backend returns the token in the response
    localStorage.setItem("token", response.data.access); // Store the JWT token
    router.push("/dashboard");  // Redirect to dashboard
  } catch (err) {
    error.value = err.response?.data?.detail || "Login failed. Please check your credentials.";
  }
};
</script>
