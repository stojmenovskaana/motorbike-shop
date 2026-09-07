<template>
  <section class="best-sellers">
    <div class="best-sellers-header">
      <h2>BEST SELLERS</h2>

      <router-link
        to="/products"
        class="view-all"
      >
        VIEW ALL PRODUCTS
      </router-link>
    </div>

    <div class="products">
      <ProductCard
        v-for="product in bestSellers"
        :key="product.id"
        :id="product.id"
        :image="product.image"
        :name="product.name"
        :price="product.price"
        :colors="product.colors || []"
      />
    </div>
  </section>
</template>

<script setup>
import ProductCard from './ProductCard.vue'

import { motorcycles } from '../data/motorcycles'
import { helmets } from '../data/helmets'
import { apparel } from '../data/apparel'
import { gadgets } from '../data/gadgets'

const bestSellers = [
  motorcycles[3],
  helmets[0],
  apparel[5],
  gadgets[1],
]
</script>

<style scoped>
.best-sellers {
  width: 100%;
  padding: 45px 35px 35px;
  background: white;
}

.best-sellers-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  margin-bottom: 45px;
}

.best-sellers-header h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 400;
  letter-spacing: 1px;
  color: #222;
}

.view-all {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  height: 46px;
  padding: 0 22px;
  border: 1px solid #b9ae6d;
  border-radius: 5px;
  background: #ffffff;
  color: #9d9254;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  transition: 0.2s ease;
}

.view-all:hover {
  background: #b9ae6d;
  color: #ffffff;
}

.products {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 55px;
}

@media (max-width: 1000px) {
  .products {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 45px 30px;
  }
}

@media (max-width: 600px) {
  .best-sellers {
    padding: 35px 20px;
  }

  .best-sellers-header {
    margin-bottom: 35px;
  }

  .best-sellers-header h2 {
    font-size: 22px;
  }

  .view-all {
    min-width: auto;
    height: 40px;
    padding: 0 14px;
    font-size: 10px;
  }

  .products {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 35px 18px;
  }
}

@media (max-width: 400px) {
  .best-sellers {
    padding: 30px 16px;
  }

  .best-sellers-header {
    align-items: center;
    gap: 12px;
  }

  .best-sellers-header h2 {
    font-size: 19px;
  }

  .view-all {
    height: 36px;
    padding: 0 10px;
    font-size: 9px;
  }
}
</style>