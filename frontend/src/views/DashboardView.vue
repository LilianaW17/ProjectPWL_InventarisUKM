<template>
  <div>
    <div class="hero-section text-white text-center py-5 mb-5">
      <div class="container py-4">
        <h1 class="display-4 fw-bold text-shadow">Sistem Inventarisasi</h1>
        <p class="lead text-shadow-sm mb-4">
          Unit Kegiatan Mahasiswa Panahan Universitas Mataram
        </p>
        <div
          class="d-inline-block bg-white text-dark px-4 py-2 rounded-pill shadow fw-bold"
        >
          📅
          {{
            new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </div>
      </div>
    </div>

    <div class="container mt-n5 position-relative">
      <div class="row justify-content-center mb-5">
        <div class="col-md-5 mb-4">
          <router-link to="/items" class="text-decoration-none">
            <div class="card h-100 shadow-sm hover-card border-0">
              <div class="card-body text-center p-5">
                <div class="icon-circle bg-primary-subtle text-primary mb-3">
                  🎯
                </div>
                <h3 class="card-title fw-bold text-dark">Kelola Barang</h3>
                <p class="card-text text-muted">
                  Input, Edit, dan Monitor stok busur, anak panah, dan bantalan.
                </p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-md-5 mb-4">
          <router-link to="/categories" class="text-decoration-none">
            <div class="card h-100 shadow-sm hover-card border-0">
              <div class="card-body text-center p-5">
                <div
                  class="icon-circle bg-warning-subtle text-warning-emphasis mb-3"
                >
                  📂
                </div>
                <h3 class="card-title fw-bold text-dark">Kategori Alat</h3>
                <p class="card-text text-muted">
                  Atur pengelompokan jenis peralatan inventaris.
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #0d253f 0%, #1e4b7a 100%);
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  padding-bottom: 80px !important;
}

.mt-n5 {
  margin-top: -60px;
}

/* Card Hover Effect */
.hover-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

/* Lingkaran Icon Emoji */
.icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto;
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.text-shadow-sm {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
</style>
