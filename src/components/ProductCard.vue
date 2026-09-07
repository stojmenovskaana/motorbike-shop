<template>
  <div
    class="product-card"
    @click="goToProduct"
  >
    <img
      :src="image"
      :alt="name"
      class="product-image"
    />

    <div
      v-if="colors.length"
      class="colors"
    >
      <span
        v-for="color in colors"
        :key="color"
        :style="{ backgroundColor: color }"
      ></span>
    </div>

    <p class="name">
      {{ name }}
    </p>

    <p class="price">
      {{ Number(price).toLocaleString() }} MKD
    </p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  colors: {
    type: Array,
    default: () => [],
  },
})

const router = useRouter()

const goToProduct = () => {
  router.push({
    name: 'ProductDetails',
    params: {
      id: props.id,
    },
  })
}
</script>

<style scoped>
.product-card {
  width: 100%;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 210px;
  object-fit: contain;
}

.colors {
  display: flex;
  gap: 7px;
  margin-top: 14px;
}

.colors span {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #ddd;
}

.name {
  margin: 10px 0 6px;
  color: #777;
  font-size: 13px;
}

.price {
  margin: 0;
  color: #111;
  font-size: 13px;
  font-weight: bold;
}
</style>