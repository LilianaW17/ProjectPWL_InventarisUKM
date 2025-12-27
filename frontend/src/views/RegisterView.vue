<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// Form Data
const fullName = ref('');
const username = ref('');
const password = ref('');
const isPengurus = ref(false);
const secretCode = ref('');

const errorMessage = ref('');
const successMessage = ref('');

const handleRegister = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  let role = 'anggota'; // Default
  
  if (isPengurus.value) {
    if (secretCode.value !== 'UKM2025') {
      errorMessage.value = 'Kode Rahasia Pengurus SALAH!';
      return;
    }
    role = 'pengurus';
  }

  try {
    await axios.post('http://localhost:5005/auth/register', {
      full_name: fullName.value,
      username: username.value,
      password: password.value,
      role: role 
    });

    successMessage.value = 'Registrasi Berhasil! Mengalihkan ke login...';
    
    setTimeout(() => {
      router.push('/login');
    }, 2000);

  } catch (error) {
    if (error.response && error.response.data) {
        errorMessage.value = error.response.data.message;
    } else {
        errorMessage.value = 'Gagal mendaftar.';
    }
  }
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    
    <div class="card shadow-lg p-4 border-0 rounded-3" style="width: 450px;">
      <div class="card-body">
        <h3 class="text-center mb-4 fw-bold text-primary">Daftar Akun Baru</h3>
        
        <div v-if="errorMessage" class="alert alert-danger p-2 text-center">{{ errorMessage }}</div>
        <div v-if="successMessage" class="alert alert-success p-2 text-center">{{ successMessage }}</div>

        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <label class="form-label">Nama Lengkap</label>
            <input v-model="fullName" type="text" class="form-control" required placeholder="Contoh: Budi Santoso">
          </div>

          <div class="mb-3">
            <label class="form-label">Username</label>
            <input v-model="username" type="text" class="form-control" required placeholder="Username unik">
          </div>

          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" required placeholder="******">
          </div>

          <hr>

          <div class="form-check mb-3">
            <input v-model="isPengurus" class="form-check-input" type="checkbox" id="checkPengurus">
            <label class="form-check-label" for="checkPengurus">
              Daftar sebagai <b>Pengurus</b>?
            </label>
          </div>

          <div v-if="isPengurus" class="mb-3 bg-warning-subtle p-3 rounded">
            <label class="form-label small fw-bold">Masukkan Kode Rahasia Kepengurusan:</label>
            <input v-model="secretCode" type="text" class="form-control form-control-sm" placeholder="Kode...">
            <small class="text-muted d-block mt-1" style="font-size: 0.75rem;">*Minta kode kepada Ketua UKM</small>
          </div>

          <button type="submit" class="btn btn-success w-100 py-2 fw-bold mb-3">
            DAFTAR SEKARANG
          </button>
        </form>

        <div class="text-center">
            <span class="text-muted">Sudah punya akun? </span>
            <router-link to="/login" class="text-decoration-none fw-bold">Login di sini</router-link>
        </div>

      </div>
    </div>

  </div>
</template>