<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// Variabel Input
const username = ref('');
const password = ref('');

// Variabel untuk pesan Error
// Kalau kosong = tidak error. Kalau ada isinya = muncul kotak merah.
const errorMessage = ref(''); 

const handleLogin = async () => {
  // Reset pesan error setiap kali tombol ditekan
  errorMessage.value = '';

  try {
    const response = await axios.post('http://localhost:5005/auth/login', {
      username: username.value,
      password: password.value
    });

    // Simpan data
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    // LANGSUNG PINDAH (Tanpa Alert "Berhasil")
    router.push('/dashboard');

  } catch (error) {
    // Tangkap pesan error dari Backend (misal: "Password salah!" atau "Username tidak ditemukan!")
    if (error.response && error.response.data) {
        errorMessage.value = error.response.data.message;
    } else {
        errorMessage.value = 'Gagal terhubung ke server.';
    }
  }
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    
    <div class="card shadow-lg p-4 border-0 rounded-3" style="width: 400px;">
      <div class="card-body">
        <h3 class="text-center mb-4 fw-bold text-primary">Login UKM Panahan</h3>
        
        <div v-if="errorMessage" class="alert alert-danger p-2 text-center" role="alert">
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
            >
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Password</label>
            <input 
              v-model="password" 
              type="password" 
              class="form-control" 
              placeholder="Masukan password" 
              required
            >
          </div>

          <button type="submit" class="btn btn-primary w-100 py-2 fw-bold">
            MASUK
          </button>
        </form>

      </div>
    </div>

  </div>
</template>