<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const items = ref([]);
const categories = ref([]);
const loading = ref(true);
const showModal = ref(false);
const form = ref({
  id: null,
  category_id: '',
  name: '',
  stock: 0,
  price: 0,
  condition_status: 'Baik',
  purchase_date: new Date().toISOString().split('T')[0], // Default today
  description: ''
});

// Fetch Data Barang
const fetchItems = async () => {
  try {
    const response = await axios.get('http://localhost:5005/api/items');
    items.value = response.data.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

// Fetch Data Categories (Buat Pilihan di Form)
const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:5005/api/categories');
    categories.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const openCreateModal = () => {
  form.value = { 
    id: null, category_id: '', name: '', 
    stock: 0, price: 0, condition_status: 'Baik', 
    purchase_date: new Date().toISOString().split('T')[0],
    description: '' 
  };
  showModal.value = true;
};

const openEditModal = (item) => {
  form.value = { ...item };
  showModal.value = true;
};

const saveItem = async () => {
  try {
     const config = {
      headers: { Authorization: `Bearer ${authStore.token}` }
    };

    if (form.value.id) {
      await axios.put(`http://localhost:5005/api/items/${form.value.id}`, form.value, config);
    } else {
      await axios.post('http://localhost:5005/api/items', form.value, config);
    }
    showModal.value = false;
    fetchItems();
  } catch (error) {
    alert('Gagal simpan: ' + (error.response?.data?.message || error.message));
  }
};

const deleteItem = async (id) => {
  if(!confirm('Hapus barang ini?')) return;
  try {
    const config = {
      headers: { Authorization: `Bearer ${authStore.token}` }
    };
    await axios.delete(`http://localhost:5005/api/items/${id}`, config);
    fetchItems();
  } catch (error) {
    alert('Gagal hapus');
  }
};

onMounted(() => {
  fetchItems();
  fetchCategories();
});
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Daftar Barang Inventaris</h2>
      <button @click="openCreateModal" class="btn btn-primary">+ Tambah Barang</button>
    </div>

    <div class="card p-3 shadow-sm">
      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th>Nama Barang</th>
              <th>Kategori</th>
              <th>Stok</th>
              <th>Kondisi</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="7" class="text-center">Loading...</td>
            </tr>
            <tr v-else v-for="item in items" :key="item.id">
              <td class="fw-bold">
                {{ item.name }} 
                <small class="text-muted d-block" v-if="item.category_code">#{{ item.category_code }}</small>
              </td>
              <td>{{ item.category_name }}</td>
              <td>{{ item.stock }}</td>
              <td>
                <span :class="{
                  'badge text-bg-success': item.condition_status === 'Baik',
                  'badge text-bg-warning': item.condition_status === 'Rusak Ringan',
                  'badge text-bg-danger': item.condition_status === 'Rusak Berat'
                }">
                  {{ item.condition_status }}
                </span>
              </td>
              <td>Rp {{ Number(item.price).toLocaleString('id-ID') }}</td>
              <td>
                <button @click="openEditModal(item)" class="btn btn-sm btn-outline-primary me-2">Edit</button>
                <button @click="deleteItem(item.id)" class="btn btn-sm btn-outline-danger">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Form -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-card scrollable-modal">
        <h3>{{ form.id ? 'Edit' : 'Tambah' }} Barang</h3>
        <form @submit.prevent="saveItem">
          <div class="mb-2">
            <label>Kategori</label>
            <select v-model="form.category_id" class="form-select" required>
              <option disabled value="">Pilih Kategori</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>

          <div class="mb-2">
            <label>Nama Barang</label>
            <input v-model="form.name" class="form-control" required />
          </div>

          <div class="row">
            <div class="col-6 mb-2">
              <label>Stok</label>
              <input v-model="form.stock" type="number" class="form-control" required />
            </div>
             <div class="col-6 mb-2">
              <label>Harga (Rp)</label>
              <input v-model="form.price" type="number" class="form-control" required />
            </div>
            
             <div class="col-12 mb-2">
              <label>Tanggal Beli/Perolehan</label>
              <input v-model="form.purchase_date" type="date" class="form-control" required />
            </div>
          </div>

          <div class="mb-2">
            <label>Kondisi</label>
            <select v-model="form.condition_status" class="form-select">
              <option value="Baik">Baik</option>
              <option value="Rusak Ringan">Rusak Ringan</option>
              <option value="Rusak Berat">Rusak Berat</option>
            </select>
          </div>

          <div class="mb-3">
             <label>Deskripsi/Lokasi</label>
             <textarea v-model="form.description" class="form-control"></textarea>
          </div>

          <div class="d-flex justify-content-end gap-2">
            <button type="button" @click="showModal = false" class="btn btn-secondary">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan Barang</button>
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
  z-index: 1000;
}
.modal-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}
</style>
