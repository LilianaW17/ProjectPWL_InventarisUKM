<script setup>
import { RouterView, useRoute } from "vue-router";
import { useAuthStore } from './stores/authStore';

const route = useRoute();
const authStore = useAuthStore();
</script>

<template>
  <!-- Navbar hanya muncul jika bukan di halaman login -->
  <nav v-if="route.name !== 'login'" class="navbar navbar-expand-lg navbar-dark bg-primary px-4 shadow-sm mb-4">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="#">🏹 Inventaris UKM</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link" active-class="active">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/items" class="nav-link" active-class="active">Data Barang</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/categories" class="nav-link" active-class="active">Kategori</router-link>
          </li>
        </ul>
        <div class="d-flex">
           <span class="navbar-text text-white me-3" v-if="authStore.user">
             Halo, {{ authStore.user.full_name }}
           </span>
           <button @click="authStore.logout" class="btn btn-danger btn-sm">Logout</button>
        </div>
      </div>
    </div>
  </nav>

  <RouterView />
</template>

<style>
.nav-link.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
