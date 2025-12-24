<template>
    <div class="container text-center mt-5">
        <div class="p-5 bg-light rounded-3 shadow-sm">
            <h1 class="display-4 fw-bold text-primary">Dashboard Inventaris UKM</h1>
            <p class="lead">Selamat datang! Silahkan pilih menu di atas untuk mengelola data.</p>
            <hr class="my-4">
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <router-link to="/items" class="btn btn-primary btn-lg px-4 gap-3">Kelola Barang</router-link>
                <router-link to="/categories" class="btn btn-outline-secondary btn-lg px-4">Kelola Kategori</router-link>
            </div>
        </div>
        
        <div class="row mt-5">
            <div class="col-md-6">
                 <div class="card text-white bg-success mb-3">
                    <div class="card-header">Status System</div>
                    <div class="card-body">
                        <h5 class="card-title">Backend Connected</h5>
                        <p class="card-text">API berjalan dengan normal.</p>
                    </div>
                </div>
            </div>
             <div class="col-md-6">
                 <div class="card text-white bg-info mb-3">
                    <div class="card-header">User Info</div>
                    <div class="card-body">
                        <h5 class="card-title">Admin Logged In</h5>
                        <p class="card-text">Akses penuh ke semua fitur.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>