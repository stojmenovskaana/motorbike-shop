<template>
  <div>
    <Navbar />

    <main class="product-page">
      <div class="top-row">
        <p>All Products / Apparel</p>

        <div class="controls">
          <input
            v-model="searchQuery"
            class="search-input"
            type="text"
            placeholder="Search apparel..."
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

          <button
            v-for="category in categories"
            :key="category"
            class="filter-button"
            :class="{ active: selectedCategory === category }"
            @click="selectedCategory = category"
          >
            {{ category }}
          </button>

          <h3 class="filter-title">GENDER</h3>

          <button
            v-for="gender in genders"
            :key="gender"
            class="filter-button"
            :class="{ active: selectedGender === gender }"
            @click="selectedGender = gender"
          >
            {{ gender }}
          </button>

          <h3 class="filter-title">BRANDS</h3>

          <button
            v-for="brand in brands"
            :key="brand"
            class="filter-button"
            :class="{ active: selectedBrand === brand }"
            @click="selectedBrand = brand"
          >
            {{ brand }}
          </button>

          <h3 class="filter-title">PRICE</h3>

          <div class="price-line"></div>

          <div class="price-row">
            <strong>0 ден</strong>
            <strong>40000 ден</strong>
          </div>
        </aside>

        <section>
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

              <p class="product-name">
                {{ product.name }}
              </p>

              <p class="product-price">
                {{ product.price.toLocaleString() }} MKD
              </p>
            </article>
          </div>

          <p
            v-else
            class="no-results"
          >
            No apparel found.
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

import { apparel } from '../data/apparel'

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

const selectedCategory = ref('All')
const selectedGender = ref('All')
const selectedBrand = ref('All')

const categories = [
  'All',
  'Jackets',
  'Gloves',
  'Baselayers',
  'Jeans',
  'Boots',
]

const genders = [
  'All',
  'Men',
  'Women',
  'Unisex',
]

const brands = [
  'All',
  'Spidi',
  'Zerofit',
  'PMJ',
]

const filteredProducts = computed(() => {
  const query = searchQuery.value
    .toLowerCase()
    .trim()

  return apparel.filter((product) => {
    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(query)

    const matchesCategory =
      selectedCategory.value === 'All' ||
      product.category === selectedCategory.value

    const matchesGender =
      selectedGender.value === 'All' ||
      product.gender === selectedGender.value

    const matchesBrand =
      selectedBrand.value === 'All' ||
      product.brand === selectedBrand.value

    return (
      matchesSearch &&
      matchesCategory &&
      matchesGender &&
      matchesBrand
    )
  })
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

const productsPerPage = 6

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
  [
    searchQuery,
    sortOption,
    selectedCategory,
    selectedGender,
    selectedBrand,
  ],
  () => {
    currentPage.value = 1
  }
)

const favoriteIds = ref(
  JSON.parse(
    localStorage.getItem('favorites')
  )?.map(item => item.id) || []
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
        item => item.id !== product.id
      )

    localStorage.setItem(
      'favorites',
      JSON.stringify(updated)
    )

    favoriteIds.value =
      favoriteIds.value.filter(
        id => id !== product.id
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
  grid-template-columns: 230px 1fr;
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

.filter-button {
  display: block;
  border: none;
  background: transparent;
  padding: 0;
  margin: 9px 0;
  color: #666;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
}

.filter-button:hover {
  color: #000;
}

.filter-button.active {
  color: #000;
  font-weight: 700;
}

.filter-title {
  margin-top: 35px !important;
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
  grid-template-columns: repeat(3, 1fr);
  column-gap: 85px;
  row-gap: 90px;
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
</style>