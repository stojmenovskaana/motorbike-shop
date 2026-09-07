<template>
  <div>
    <Navbar />

    <main class="product-page">
      <div class="top-row">
        <p>All Products</p>

        <div class="controls">
          <input
            v-model="searchQuery"
            class="search-input"
            type="text"
            placeholder="Search products..."
          />

          <select v-model="sortOption" class="sort-select">
            <option value="">Sort By</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      <div
        v-if="paginatedProducts.length"
        class="products-grid"
      >
        <article
          v-for="product in paginatedProducts"
          :key="product.id"
          class="product-card"
          @click="goToProduct(product.id)"
        >
          <img
            :src="product.image"
            :alt="product.name"
            class="product-image"
          />

          <div class="product-actions">
            <button
              class="favorite"
              :class="{ active: isFavorite(product) }"
              @click.stop="toggleFavorite(product)"
            >
              <img
                :src="
                  isFavorite(product)
                    ? '/src/assets/images/Favorite_filled.png'
                    : '/src/assets/images/Favorite_light.png'
                "
                alt="favorite"
              />
            </button>
          </div>

          <p
            v-if="product.brand"
            class="product-brand"
          >
            {{ product.brand }}
          </p>

          <p class="product-name">
            {{ product.name }}
          </p>

          <p class="product-price">
            {{ Number(product.price).toLocaleString() }} MKD
          </p>
        </article>
      </div>

      <p
        v-else
        class="no-results"
      >
        No products found.
      </p>

      <div
        v-if="totalPages > 1"
        class="pagination"
      >
        <button
          class="pagination-arrow"
          :disabled="currentPage === 1"
          @click="previousPage"
        >
          ‹
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          class="pagination-button"
          :class="{ active: currentPage === page }"
          @click="currentPage = page"
        >
          {{ page }}
        </button>

        <button
          class="pagination-arrow"
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          ›
        </button>
      </div>
    </main>

    <FooterSection />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

import Navbar from '../components/Navbar.vue'
import FooterSection from '../components/FooterSection.vue'

import { helmets } from '../data/helmets'
import { motorcycles } from '../data/motorcycles'
import { apparel } from '../data/apparel'
import { gadgets } from '../data/gadgets'

const router = useRouter()

const goToProduct = (id) => {
  router.push({
    name: 'ProductDetails',
    params: {
      id: id,
    },
  })
}

const searchQuery = ref('')
const sortOption = ref('')
const currentPage = ref(1)

const productsPerPage = 12

const allProducts = [
  ...helmets,
  ...motorcycles,
  ...apparel,
  ...gadgets,
]

const filteredProducts = computed(() => {
  const query = searchQuery.value
    .toLowerCase()
    .trim()

  if (!query) {
    return allProducts
  }

  return allProducts.filter((product) => {
    const name =
      product.name?.toLowerCase() || ''

    const brand =
      product.brand?.toLowerCase() || ''

    const category =
      product.category?.toLowerCase() || ''

    return (
      name.includes(query) ||
      brand.includes(query) ||
      category.includes(query)
    )
  })
})

const sortedProducts = computed(() => {
  const sorted = [...filteredProducts.value]

  if (sortOption.value === 'low-high') {
    return sorted.sort(
      (a, b) =>
        Number(a.price) -
        Number(b.price)
    )
  }

  if (sortOption.value === 'high-low') {
    return sorted.sort(
      (a, b) =>
        Number(b.price) -
        Number(a.price)
    )
  }

  if (sortOption.value === 'name') {
    return sorted.sort(
      (a, b) =>
        a.name.localeCompare(b.name)
    )
  }

  return sorted
})

const totalPages = computed(() => {
  return Math.ceil(
    sortedProducts.value.length /
    productsPerPage
  )
})

const paginatedProducts = computed(() => {
  const start =
    (currentPage.value - 1) *
    productsPerPage

  const end =
    start + productsPerPage

  return sortedProducts.value.slice(
    start,
    end
  )
})

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (
    currentPage.value <
    totalPages.value
  ) {
    currentPage.value++
  }
}

watch(
  [searchQuery, sortOption],
  () => {
    currentPage.value = 1
  }
)

const favoriteIds = ref(
  JSON.parse(
    localStorage.getItem('favorites')
  )?.map((item) => item.id) || []
)

const isFavorite = (product) => {
  return favoriteIds.value.includes(
    product.id
  )
}

const toggleFavorite = (product) => {
  const favorites =
    JSON.parse(
      localStorage.getItem('favorites')
    ) || []

  if (isFavorite(product)) {
    const updated =
      favorites.filter(
        (item) =>
          item.id !== product.id
      )

    localStorage.setItem(
      'favorites',
      JSON.stringify(updated)
    )

    favoriteIds.value =
      favoriteIds.value.filter(
        (id) => id !== product.id
      )
  } else {
    favorites.push(product)

    localStorage.setItem(
      'favorites',
      JSON.stringify(favorites)
    )

    favoriteIds.value.push(
      product.id
    )
  }
}
</script>

<style scoped>
.product-page {
  min-height: 65vh;
  padding: 42px 60px 100px;
  background: #ffffff;
  font-family: Arial, Helvetica, sans-serif;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #777;
  font-size: 14px;
  margin-bottom: 60px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 28px;
}

.search-input {
  width: 240px;
  height: 34px;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  padding: 0 12px;
  outline: none;
}

.search-input:focus {
  border-color: #999;
}

.sort-select {
  border: none;
  background: transparent;
  color: #777;
  cursor: pointer;
  outline: none;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 55px;
  row-gap: 80px;
}

.product-card {
  width: 100%;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-image {
  width: 100%;
  height: 240px;
  object-fit: contain;
}

.product-actions {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}

.favorite {
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
}

.favorite img {
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease;
}

.favorite:hover img {
  transform: scale(1.15);
}

.product-brand {
  margin: 8px 0 4px;
  color: #999;
  font-size: 12px;
  text-transform: uppercase;
}

.product-name {
  margin: 0 0 8px;
  color: #777;
  font-size: 15px;
}

.product-price {
  margin: 0;
  color: #111;
  font-weight: 700;
}

.no-results {
  color: #777;
}

.pagination {
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination-button,
.pagination-arrow {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dddddd;
  background: white;
  color: #555;
  border-radius: 6px;
  cursor: pointer;
}

.pagination-button:hover,
.pagination-arrow:hover:not(:disabled) {
  background: #f2f2f2;
}

.pagination-button.active {
  background: #2f3139;
  color: white;
  border-color: #2f3139;
}

.pagination-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

@media (max-width: 1000px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .product-page {
    padding: 30px 20px 70px;
  }

  .top-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 25px;
  }

  .controls {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  .search-input {
    width: auto;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>