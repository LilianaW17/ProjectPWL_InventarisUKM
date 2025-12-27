<script setup>
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
    authStore.logout();
};
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        
        <div class="card shadow border-0 rounded-4">
            <div class="card-header bg-primary text-white text-center py-4 rounded-top-4">
                <div class="avatar-circle bg-white text-primary mb-2 mx-auto fw-bold fs-2 shadow-sm">
                    {{ authStore.user?.username.charAt(0).toUpperCase() }}
                </div>
                <h4 class="mb-0">{{ authStore.user?.full_name }}</h4>
                <span class="badge bg-warning text-dark mt-2">{{ authStore.user?.role }}</span>
            </div>

            <div class="card-body p-4">
                <h5 class="card-title text-muted mb-4">Detail Akun</h5>
                
                <div class="mb-3">
                    <label class="small text-muted fw-bold">USERNAME</label>
                    <div class="fs-5 border-bottom pb-2">{{ authStore.user?.username }}</div>
                </div>

                <div class="mb-3">
                    <label class="small text-muted fw-bold">USER ID</label>
                    <div class="fs-5 border-bottom pb-2">#{{ authStore.user?.id }}</div>
                </div>

                <div class="mb-4">
                    <label class="small text-muted fw-bold">STATUS HAK AKSES</label>
                    <div class="d-flex align-items-center gap-2 mt-1">
                        <span v-if="authStore.user?.role === 'pengurus'" class="text-success fw-bold">
                            ✅ Full Access (CRUD)
                        </span>
                        <span v-else class="text-primary fw-bold">
                            👁️ Read Only (Lihat Data Saja)
                        </span>
                    </div>
                </div>

                <div class="d-grid gap-2">
                    <router-link to="/dashboard" class="btn btn-outline-secondary">
                        &laquo; Kembali ke Dashboard
                    </router-link>
                    <button @click="handleLogout" class="btn btn-danger">
                        Logout
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.rounded-top-4 {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
}
.rounded-4 {
    border-radius: 1rem;
}
</style>