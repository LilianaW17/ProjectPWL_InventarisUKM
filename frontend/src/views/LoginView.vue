<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const username = ref("");
const password = ref("");
const errorMessage = ref("");

const handleLogin = async () => {
  errorMessage.value = "";

  try {
    await authStore.login(username.value, password.value);
    router.push("/dashboard");
  } catch (error) {
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = "Gagal terhubung ke server.";
    }
  }
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card shadow-lg p-4 border-0 rounded-3" style="width: 400px">
      <div class="card-body">
        <h3 class="text-center mb-4 fw-bold text-primary">Login UKM Panahan</h3>

        <div
          v-if="errorMessage"
          class="alert alert-danger p-2 text-center"
          role="alert"
        >
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label fw-semibold">Username</label>
            <input
              v-model="username"
              type="text"
              class="form-control"
              placeholder="Masukan username"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Masukan password"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary w-100 py-2 fw-bold">
            MASUK
          </button>
          <div class="text-center mt-3">
            <span class="text-muted">Belum punya akun? </span>
            <router-link to="/register" class="text-decoration-none fw-bold"
              >Daftar Anggota</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
