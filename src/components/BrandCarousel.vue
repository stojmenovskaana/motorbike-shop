<template>
  <section class="brand-carousel">
    <button
      class="arrow"
      @click="prevBrand"
      aria-label="Previous brands"
    >
      ‹
    </button>

    <div
      class="brands"
      :class="`brands-${visibleCount}`"
      @mouseenter="stopAutoSlide"
      @mouseleave="startAutoSlide"
    >
      <router-link
        v-for="brand in visibleBrands"
        :key="brand.slug"
        :to="{
          name: 'BrandProducts',
          params: {
            brand: brand.slug
          }
        }"
        class="brand-link"
      >
        <img
          :src="brand.image"
          :alt="brand.name"
        />
      </router-link>
    </div>

    <button
      class="arrow"
      @click="nextBrand"
      aria-label="Next brands"
    >
      ›
    </button>
  </section>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted
} from 'vue'

import { brands } from '../data/brands'

const currentIndex = ref(0)
const visibleCount = ref(6)

let intervalId = null

const updateVisibleCount = () => {
  if (window.innerWidth <= 600) {
    visibleCount.value = 2
  } else if (window.innerWidth <= 1000) {
    visibleCount.value = 4
  } else {
    visibleCount.value = 6
  }
}

const visibleBrands = computed(() => {
  const result = []

  const numberOfBrands = Math.min(
    visibleCount.value,
    brands.length
  )

  for (let i = 0; i < numberOfBrands; i++) {
    const index =
      (currentIndex.value + i) %
      brands.length

    result.push(brands[index])
  }

  return result
})

const nextBrand = () => {
  currentIndex.value =
    (currentIndex.value + 1) %
    brands.length
}

const prevBrand = () => {
  currentIndex.value =
    currentIndex.value === 0
      ? brands.length - 1
      : currentIndex.value - 1
}

const stopAutoSlide = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

const startAutoSlide = () => {
  stopAutoSlide()

  intervalId = setInterval(() => {
    nextBrand()
  }, 3000)
}

onMounted(() => {
  updateVisibleCount()
  startAutoSlide()

  window.addEventListener(
    'resize',
    updateVisibleCount
  )
})

onUnmounted(() => {
  stopAutoSlide()

  window.removeEventListener(
    'resize',
    updateVisibleCount
  )
})
</script>

<style scoped>
.brand-carousel {
  width: 100%;
  background: #f5f5f5;
  padding: 36px 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  overflow: hidden;
}

.brands {
  flex: 1;
  display: grid;
  align-items: center;
  gap: 35px;
  min-width: 0;
}

.brands-6 {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}

.brands-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.brands-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.brand-link {
  width: 100%;
  height: 70px;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
}

.brand-link img {
  width: 100%;
  max-width: 145px;
  max-height: 65px;
  object-fit: contain;
  opacity: 0.75;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.brand-link:hover img {
  opacity: 1;
  transform: scale(1.08);
}

.arrow {
  flex-shrink: 0;
  width: 30px;
  border: none;
  background: transparent;
  font-size: 42px;
  line-height: 1;
  color: #555;
  cursor: pointer;
  transition: 0.2s ease;
}

.arrow:hover {
  color: #111;
  transform: scale(1.1);
}

@media (max-width: 1000px) {
  .brand-carousel {
    padding: 30px 20px;
    gap: 20px;
  }

  .brands {
    gap: 25px;
  }

  .brand-link img {
    max-width: 125px;
    max-height: 58px;
  }
}

@media (max-width: 600px) {
  .brand-carousel {
    padding: 26px 12px;
    gap: 10px;
  }

  .brands {
    gap: 18px;
  }

  .brand-link {
    height: 60px;
  }

  .brand-link img {
    max-width: 110px;
    max-height: 50px;
  }

  .arrow {
    width: 24px;
    font-size: 34px;
  }
}
</style>