<template>
  <div>
    <Navbar />

    <main class="favorites-page">
      <h1>FAVORITES</h1>

      <p v-if="favorites.length === 0">No favorite products.</p>

      <div class="grid" v-else>
        <div class="card" v-for="product in favorites" :key="product.id">
          <img :src="product.image" />

          <p>{{ product.name }}</p>
          <strong>{{ product.price }} MKD</strong>

          <button @click="removeFavorite(product)">Remove</button>
        </div>
      </div>
    </main>

    <FooterSection />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import FooterSection from '../components/FooterSection.vue'

const favorites = ref([])

const loadFavorites = () => {
  favorites.value = JSON.parse(localStorage.getItem('favorites')) || []
}

const removeFavorite = (product) => {
  favorites.value = favorites.value.filter(p => p.id !== product.id)
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

onMounted(() => {
  loadFavorites()
})
</script>

<style scoped>
.favorites-page {
  padding: 60px;
  font-family: Arial;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.card img {
  width: 100%;
  height: 220px;
  object-fit: contain;
}

.card button {
  margin-top: 10px;
  border: none;
  background: #c8c18d;
  color: white;
  padding: 6px 10px;
  cursor: pointer;
}
</style>