<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
        <div>
        <label for="password_confirm">Confirm Password:</label>
        <input type="password" v-model="passwordConfirm" id="password_confirm" required />
      </div>
      <div>
        <label for="bio">Bio:</label>
        <textarea v-model="bio" id="bio" rows="3"></textarea>
      </div>

      <div>
        <label for="avatar">Avatar:</label>
        <input type="file" @change="handleFileChange" id="avatar" />
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "@/axios"; // Import the axios instance
import { useRouter } from "vue-router";

const username = ref("");
const email = ref("");
const password = ref("");
const error = ref(null);
const router = useRouter();

const register = async () => {
  try {
    const response = await axios.post("/accounts/register/", {
      username: username.value,
      email: email.value,
      password: password.value,
    });
    router.push("/login");  // Redirect to login after successful registration
  } catch (err) {
    error.value = err.response?.data?.detail || "Registration failed. Please try again.";
  }
};
</script>
