<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const categories = ref([]);
const loading = ref(true);
const showModal = ref(false);
const form = ref({
  id: null,
  name: '',
  description: '',
  is_active: 1
});

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:5005/api/categories');
    categories.value = response.data.data;
  } catch (error) {
    console.error('Gagal ambil data', error);
  } finally {
    loading.value = false;
  }
};

const openCreateModal = () => {
  form.value = { id: null, name: '', description: '', is_active: 1 };
  showModal.value = true;
};

const openEditModal = (item) => {
  form.value = { ...item };
  showModal.value = true;
};

const saveCategory = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${authStore.token}` }
    };
    
    if (form.value.id) {
      // Update
      await axios.put(`http://localhost:5005/api/categories/${form.value.id}`, form.value, config);
    } else {
      // Create
      await axios.post('http://localhost:5005/api/categories', form.value, config);
    }
    
    showModal.value = false;
    fetchCategories(); // Refresh data
  } catch (error) {
    alert('Gagal menyimpan data: ' + (error.response?.data?.message || error.message));
  }
};

const deleteCategory = async (id) => {
  if(!confirm('Yakin ingin menghapus?')) return;
  
  try {
     const config = {
      headers: { Authorization: `Bearer ${authStore.token}` }
    };
    await axios.delete(`http://localhost:5005/api/categories/${id}`, config);
    fetchCategories();
  } catch (error) {
    alert('Gagal menghapus');
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Data Kategori</h2>
      <button @click="openCreateModal" class="btn btn-primary">+ Tambah Kategori</button>
    </div>

    <!-- Tabel -->
    <div class="card p-3 shadow-sm">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Kode</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="6" class="text-center">Loading data...</td>
          </tr>
          <tr v-else v-for="(cat, index) in categories" :key="cat.id">
            <td>{{ index + 1 }}</td>
            <td>{{ cat.name }}</td>
            <td>{{ cat.description }}</td>
             <td><span class="badge bg-info text-dark">{{ cat.code }}</span></td>
            <td>
              <span class="badge" :class="cat.is_active ? 'text-bg-success' : 'text-bg-secondary'">
                {{ cat.is_active ? 'Aktif' : 'Non-Aktif' }}
              </span>
            </td>
            <td>
              <button @click="openEditModal(cat)" class="btn btn-sm btn-warning me-2">Edit</button>
              <button @click="deleteCategory(cat.id)" class="btn btn-sm btn-danger">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Simple (Manual CSS overlay) -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-card">
        <h3>{{ form.id ? 'Edit' : 'Tambah' }} Kategori</h3>
        <form @submit.prevent="saveCategory">
          <div class="mb-3">
            <label>Nama Kategori</label>
            <input v-model="form.name" class="form-control" required />
          </div>
          <div class="mb-3">
            <label>Deskripsi</label>
            <textarea v-model="form.description" class="form-control"></textarea>
          </div>
          <div class="mb-3">
            <label>Status</label>
            <select v-model="form.is_active" class="form-select">
              <option :value="1">Aktif</option>
              <option :value="0">Non-Aktif</option>
            </select>
          </div>
          <div class="d-flex justify-content-end gap-2">
            <button type="button" @click="showModal = false" class="btn btn-secondary">Batal</button>
            <button type="submit" class="btn btn-success">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}
</style>
