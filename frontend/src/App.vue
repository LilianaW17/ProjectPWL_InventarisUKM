<script setup>
import { RouterView, useRoute } from "vue-router";
import { useAuthStore } from "./stores/authStore";

const route = useRoute();
const authStore = useAuthStore();
</script>

<template>
  <nav
    v-if="route.name !== 'login'"
    class="navbar navbar-expand-lg navbar-dark bg-dark-blue px-4 shadow-sm sticky-top"
  >
    <div class="container">
      <a class="navbar-brand fw-bold d-flex align-items-center gap-2" href="#">
        <span class="fs-4">🏹</span>
        <div>
          <span class="d-block lh-1">INVENTARIS</span>
          <small class="fs-7 fw-normal text-warning"
            >UKM PANAHAN UNIVERSITAS MATARAM</small
          >
        </div>
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
          <li class="nav-item">
            <router-link
              to="/dashboard"
              class="nav-link"
              active-class="active-link"
              >Dashboard</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/items" class="nav-link" active-class="active-link"
              >Data Barang</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/categories"
              class="nav-link"
              active-class="active-link"
              >Kategori</router-link
            >
          </li>

          <li class="nav-item ms-lg-3 d-flex align-items-center gap-3">
            <div
              class="text-white text-end d-none d-lg-block"
              v-if="authStore.user"
            >
              <div class="fw-bold">{{ authStore.user.full_name }}</div>
              <small class="text-white-50" style="font-size: 0.8rem">{{
                authStore.user.role
              }}</small>
            </div>
            <button
              @click="authStore.logout"
              class="btn btn-outline-danger btn-sm rounded-pill px-3"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <RouterView />
</template>

<style>
.bg-dark-blue {
  background-color: #0d253f;
}

.fs-7 {
  font-size: 0.75rem;
  letter-spacing: 1px;
}

.nav-link {
  color: rgba(255, 255, 255, 0.7) !important;
  transition: all 0.3s;
}

.nav-link:hover {
  color: #fff !important;
}

.active-link {
  color: #ffc107 !important;
  font-weight: bold;
  border-bottom: 2px solid #ffc107;
}
</style>
