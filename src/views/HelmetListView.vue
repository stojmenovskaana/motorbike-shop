<template>
  <div>
    <Navbar />

    <main class="product-page">
      <div class="top-row">
        <p>All Products / Helmets</p>

        <div class="controls">
          <input
            v-model="searchQuery"
            class="search-input"
            type="text"
            placeholder="Search helmets..."
          />

          <select v-model="sortOption" class="sort-select">
            <option value="">Sort By</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      <div class="content">
        <aside class="filters">
          <h3>CATEGORIES</h3>

          <p
            v-for="category in categories"
            :key="category"
          >
            {{ category }}
          </p>

          <h3 class="filter-title">PRICE</h3>

          <div class="price-line"></div>

          <div class="price-row">
            <strong>0 ден</strong>
            <strong>80000 ден</strong>
          </div>

          <h3 class="filter-title">GENDER</h3>

          <label>
            <input type="checkbox" />
            Man
          </label>

          <label>
            <input type="checkbox" />
            Women
          </label>

          <label>
            <input type="checkbox" />
            Unisex
          </label>
        </aside>

        <section>
          <div
            v-if="paginatedProducts.length"
            class="products-grid"
          >
            <article
              v-for="helmet in paginatedProducts"
              :key="helmet.id"
              class="product-card"
              @click="goToProduct(helmet.id)"
            >
              <img
                :src="helmet.image"
                :alt="helmet.name"
                class="helmet-image"
              />

              <div class="product-actions">
                <button
                  class="favorite"
                  :class="{ active: isFavorite(helmet) }"
                  @click.stop="toggleFavorite(helmet)"
                >
                  <img
                    :src="
                      isFavorite(helmet)
                        ? '/src/assets/images/Favorite_filled.png'
                        : '/src/assets/images/Favorite_light.png'
                    "
                    alt="favorite"
                  />
                </button>
              </div>

              <p class="product-name">
                {{ helmet.name }}
              </p>

              <p class="product-price">
                {{ helmet.price.toLocaleString() }} MKD
              </p>
            </article>
          </div>

          <p
            v-else
            class="no-results"
          >
            No helmets found.
          </p>
        </section>
      </div>

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

const router = useRouter()



const goToProduct = (id) => {
  router.push({
    name: 'ProductDetails',
    params: {
      id: id,
    },
  })
}



const sortOption = ref('')
const searchQuery = ref('')

const filteredProducts = computed(() => {
  const query = searchQuery.value
    .toLowerCase()
    .trim()

  if (!query) {
    return helmets
  }

  return helmets.filter((helmet) =>
    helmet.name
      .toLowerCase()
      .includes(query)
  )
})

const sortedProducts = computed(() => {
  const sorted = [...filteredProducts.value]

  if (sortOption.value === 'low-high') {
    return sorted.sort(
      (a, b) => a.price - b.price
    )
  }

  if (sortOption.value === 'high-low') {
    return sorted.sort(
      (a, b) => b.price - a.price
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


const currentPage = ref(1)

const helmetsPerPage = 6

const totalPages = computed(() => {
  return Math.ceil(
    sortedProducts.value.length /
    helmetsPerPage
  )
})

const paginatedProducts = computed(() => {
  const start =
    (currentPage.value - 1) *
    helmetsPerPage

  const end =
    start + helmetsPerPage

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

const isFavorite = (helmet) => {
  return favoriteIds.value.includes(
    helmet.id
  )
}

const toggleFavorite = (helmet) => {
  const favorites =
    JSON.parse(
      localStorage.getItem('favorites')
    ) || []

  if (isFavorite(helmet)) {
    const updated =
      favorites.filter(
        (item) => item.id !== helmet.id
      )

    localStorage.setItem(
      'favorites',
      JSON.stringify(updated)
    )

    favoriteIds.value =
      favoriteIds.value.filter(
        (id) => id !== helmet.id
      )
  } else {
    favorites.push(helmet)

    localStorage.setItem(
      'favorites',
      JSON.stringify(favorites)
    )

    favoriteIds.value.push(
      helmet.id
    )
  }
}



const categories = [
  'Motorcycles',
  'Apparel',
  'Jackets',
  'Gloves',
  'Shoes',
  'Trousers',
  'Shirts',
  'Backpack',
  'Helmet',
  'Full Face',
  'Modular',
  'Gadgets',
]
</script>

<style scoped>
.product-page {
  padding: 42px 60px 90px;
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



.content {
  display: grid;

  grid-template-columns:
    230px 1fr;

  gap: 60px;
}



.filters {
  color: #666;
}

.filters h3 {
  color: #333;
  font-size: 15px;

  margin-top: 0;
  margin-bottom: 18px;
}

.filters p {
  margin: 9px 0;

  cursor: pointer;

  font-size: 14px;
}

.filters p:hover {
  color: #000;
}

.filter-title {
  margin-top: 35px !important;
}

.filters label {
  display: block;

  margin-bottom: 10px;

  font-size: 14px;
}

.price-line {
  width: 100%;
  height: 2px;

  background: #ddd;

  margin-bottom: 10px;
}

.price-row {
  display: flex;
  justify-content: space-between;

  font-size: 12px;

  margin-bottom: 35px;
}



.products-grid {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  column-gap: 85px;
  row-gap: 90px;
}

.product-card {
  width: 100%;

  cursor: pointer;

  transition:
    transform 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
}

.helmet-image {
  width: 100%;
  height: 260px;

  object-fit: contain;
}



.product-actions {
  margin-top: 15px;

  display: flex;

  justify-content: flex-end;
  align-items: center;
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

  transition: transform 0.2s;
}

.favorite:hover img {
  transform: scale(1.2);
}

.favorite.active img {
  transform: scale(1.2);
}



.product-name {
  margin: 8px 0;

  color: #777;

  font-size: 15px;
}

.product-price {
  margin: 0;

  font-weight: 700;

  color: #111;
}

.no-results {
  color: #777;

  font-size: 16px;
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

  background: #ffffff;

  color: #555;

  border-radius: 6px;

  font-size: 15px;

  cursor: pointer;

  transition:
    background 0.2s,
    color 0.2s,
    border-color 0.2s,
    transform 0.2s;
}

.pagination-button:hover,
.pagination-arrow:hover:not(:disabled) {
  background: #f2f2f2;

  border-color: #999;

  transform: translateY(-1px);
}

.pagination-button.active {
  background: #2f3139;

  color: #ffffff;

  border-color: #2f3139;
}

.pagination-arrow {
  font-size: 22px;
}

.pagination-arrow:disabled {
  opacity: 0.3;

  cursor: not-allowed;

  transform: none;
}



@media (max-width: 1000px) {
  .product-page {
    padding:
      35px
      30px
      70px;
  }

  .content {
    grid-template-columns:
      180px 1fr;

    gap: 35px;
  }

  .products-grid {
    grid-template-columns:
      repeat(2, 1fr);

    column-gap: 45px;
  }
}


@media (max-width: 768px) {
  .product-page {
    padding:
      30px
      20px
      60px;
  }

  .top-row {
    flex-direction: column;
    align-items: flex-start;

    gap: 20px;

    margin-bottom: 35px;
  }

  .controls {
    width: 100%;

    flex-direction: column;
    align-items: stretch;

    gap: 12px;
  }

  .search-input {
    width: 100%;
  }

  .content {
    grid-template-columns: 1fr;
  }

  .filters {
    display: none;
  }

  .products-grid {
    grid-template-columns:
      repeat(2, 1fr);

    column-gap: 20px;
    row-gap: 50px;
  }

  .helmet-image {
    height: 200px;
  }
}



@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .helmet-image {
    height: 260px;
  }
}
</style>