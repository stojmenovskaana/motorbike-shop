<template>
  <div>
    <Navbar />

    <main class="details-page">
      <section v-if="product" class="product-section">
        <div class="product-image-wrapper">
          <img
            :src="product.image"
            :alt="product.name"
            class="product-image"
          />
        </div>

        <div class="product-info">
          <p class="product-brand">
            {{ product.brand }}
          </p>

          <h1>{{ product.name }}</h1>

          <p class="product-price">
            {{ formatPrice(product.price) }} MKD
          </p>

          <div class="divider"></div>

          <div class="product-meta">
            <p v-if="product.category">
              <span>Category</span>
              {{ product.category }}
            </p>

            <p v-if="product.gender">
              <span>Gender</span>
              {{ product.gender }}
            </p>

            <p v-if="product.type">
              <span>Type</span>
              {{ product.type }}
            </p>
          </div>

          <div
            v-if="
              product.productGroup !== 'helmet' &&
              product.colors &&
              product.colors.length
            "
            class="option-section"
          >
            <div class="option-title">
              <span>Color</span>

              <strong v-if="selectedColor">
                {{ selectedColor }}
              </strong>
            </div>

            <div class="colors">
              <button
                v-for="color in product.colors"
                :key="color"
                class="color-button"
                :class="{ selected: selectedColor === color }"
                :style="{ backgroundColor: color }"
                @click="selectedColor = color"
              ></button>
            </div>
          </div>

          <div
            v-if="availableSizes.length"
            class="option-section"
          >
            <div class="option-title">
              <span>Select size</span>

              <strong v-if="selectedSize">
                {{ selectedSize }}
              </strong>
            </div>

            <div class="sizes">
              <button
                v-for="size in availableSizes"
                :key="size"
                :class="{ active: selectedSize === size }"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>

            <p
              v-if="sizeError"
              class="error-message"
            >
              Please select a size.
            </p>
          </div>

          <div class="quantity-section">
            <span>Quantity</span>

            <div class="quantity-control">
              <button
                @click="decreaseQuantity"
                :disabled="quantity === 1"
              >
                −
              </button>

              <span>{{ quantity }}</span>

              <button @click="increaseQuantity">
                +
              </button>
            </div>
          </div>

          <div class="actions">
            <button
              class="cart-btn"
              @click="addToCart"
            >
              ADD TO CART
            </button>

            <button
              class="favorite-btn"
              :class="{ favoriteActive: isFavorite }"
              @click="toggleFavorite"
            >
              {{ isFavorite ? '♥ FAVORITE' : '♡ FAVORITE' }}
            </button>
          </div>

          <p
            v-if="addedMessage"
            class="success-message"
          >
            Product added to cart.
          </p>

          <div class="description">
            <h3>PRODUCT DETAILS</h3>

            <p>
              {{ productDescription }}
            </p>
          </div>
        </div>
      </section>

      <section v-else class="not-found">
        <h1>Product not found</h1>

        <p>
          The product you are looking for does not exist.
        </p>

        <RouterLink
          to="/products"
          class="back-button"
        >
          BACK TO PRODUCTS
        </RouterLink>
      </section>
    </main>

    <FooterSection />
  </div>
</template>

<script setup>
import {
  computed,
  ref,
  watch,
} from 'vue'

import { useRoute } from 'vue-router'

import Navbar from '../components/Navbar.vue'
import FooterSection from '../components/FooterSection.vue'

import { allProducts } from '../data/products'

const route = useRoute()

const product = computed(() => {
  return allProducts.find(
    (item) => item.id === Number(route.params.id)
  )
})

const selectedSize = ref('')
const selectedColor = ref('')
const quantity = ref(1)

const sizeError = ref(false)
const addedMessage = ref(false)

const availableSizes = computed(() => {
  if (!product.value) {
    return []
  }

  if (product.value.productGroup === 'helmet') {
    return [
      'XS',
      'S',
      'M',
      'L',
      'XL',
      'XXL',
    ]
  }

  if (product.value.productGroup === 'apparel') {
    const category = product.value.category

    if (category === 'Jeans') {
      return [
        '30',
        '32',
        '34',
        '36',
        '38',
        '40',
      ]
    }

    if (category === 'Boots') {
      return [
        '40',
        '41',
        '42',
        '43',
        '44',
        '45',
      ]
    }

    if (category === 'Gloves') {
      return [
        'S',
        'M',
        'L',
        'XL',
        'XXL',
      ]
    }

    return [
      'S',
      'M',
      'L',
      'XL',
      'XXL',
      '3XL',
    ]
  }

  return []
})

const productDescription = computed(() => {
  if (!product.value) {
    return ''
  }

  if (product.value.productGroup === 'motorcycle') {
    return `${product.value.name} by ${product.value.brand}. A motorcycle built for style, comfort and everyday riding.`
  }

  if (product.value.productGroup === 'helmet') {
    return `${product.value.name} by ${product.value.brand}. Designed to provide protection, comfort and a premium riding experience.`
  }

  if (product.value.productGroup === 'apparel') {
    return `${product.value.name} by ${product.value.brand}. Motorcycle apparel designed for comfort, protection and everyday riding.`
  }

  if (product.value.productGroup === 'gadget') {
    return `${product.value.name} by ${product.value.brand}. A practical motorcycle accessory designed to make your ride more convenient.`
  }

  return `${product.value.name} by ${product.value.brand}.`
})

const formatPrice = (price) => {
  return Number(price).toLocaleString('en-US')
}

const increaseQuantity = () => {
  quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (!product.value) {
    return
  }

  if (
    availableSizes.value.length &&
    !selectedSize.value
  ) {
    sizeError.value = true
    return
  }

  sizeError.value = false

  const cart = JSON.parse(
    localStorage.getItem('cart') || '[]'
  )

  const cartProduct = {
    id: product.value.id,
    name: product.value.name,
    price: Number(product.value.price),
    image: product.value.image,
    brand: product.value.brand,
    size: selectedSize.value || 'N/A',
    color: selectedColor.value || 'Default',
    quantity: quantity.value,
  }

  const existingProduct = cart.find(
    (item) =>
      item.id === cartProduct.id &&
      item.size === cartProduct.size &&
      item.color === cartProduct.color
  )

  if (existingProduct) {
    existingProduct.quantity +=
      cartProduct.quantity
  } else {
    cart.push(cartProduct)
  }

  localStorage.setItem(
    'cart',
    JSON.stringify(cart)
  )

  addedMessage.value = true

  setTimeout(() => {
    addedMessage.value = false
  }, 2500)
}

const favorites = ref([])

const loadFavorites = () => {
  favorites.value = JSON.parse(
    localStorage.getItem('favorites') || '[]'
  )
}

loadFavorites()

const isFavorite = computed(() => {
  if (!product.value) {
    return false
  }

  return favorites.value.some(
    (item) => item.id === product.value.id
  )
})

const toggleFavorite = () => {
  if (!product.value) {
    return
  }

  const index = favorites.value.findIndex(
    (item) => item.id === product.value.id
  )

  if (index !== -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(product.value)
  }

  localStorage.setItem(
    'favorites',
    JSON.stringify(favorites.value)
  )
}

watch(
  product,
  (newProduct) => {
    selectedSize.value = ''
    quantity.value = 1
    sizeError.value = false
    addedMessage.value = false

    if (
      newProduct?.productGroup !== 'helmet' &&
      newProduct?.colors &&
      newProduct.colors.length
    ) {
      selectedColor.value =
        newProduct.colors[0]
    } else {
      selectedColor.value = ''
    }
  },
  {
    immediate: true,
  }
)
</script>

<style scoped>
.details-page {
  width: 100%;
  min-height: 80vh;
  padding: 70px 70px 110px;
  font-family: Arial, Helvetica, sans-serif;
  background: #fff;
}

.product-section {
  max-width: 1350px;
  margin: 0 auto;

  display: grid;
  grid-template-columns:
    minmax(420px, 620px)
    minmax(350px, 1fr);

  gap: 90px;
  align-items: start;
}

.product-image-wrapper {
  width: 100%;
  min-height: 600px;

  background: #f6f6f6;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 600px;

  object-fit: contain;

  transition: transform 0.35s ease;
}

.product-image-wrapper:hover .product-image {
  transform: scale(1.025);
}

.product-info {
  padding-top: 15px;
}

.product-brand {
  margin: 0 0 12px;

  color: #999;

  font-size: 12px;
  font-weight: 600;

  letter-spacing: 2px;

  text-transform: uppercase;
}

.product-info h1 {
  margin: 0;

  color: #222;

  font-size: 36px;
  line-height: 1.2;

  font-weight: 500;
}

.product-price {
  margin: 18px 0 0;

  color: #222;

  font-size: 23px;
  font-weight: 600;
}

.divider {
  height: 1px;

  background: #e5e5e5;

  margin: 35px 0;
}

.product-meta {
  margin-bottom: 35px;
}

.product-meta p {
  margin: 0 0 11px;

  color: #666;

  font-size: 14px;
}

.product-meta p span {
  display: inline-block;

  width: 90px;

  color: #222;

  font-weight: 600;
}

.option-section {
  margin-bottom: 35px;
}

.option-title {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 15px;

  color: #333;

  font-size: 14px;
}

.option-title strong {
  font-size: 12px;
  font-weight: 500;

  color: #777;
}

.colors {
  display: flex;
  align-items: center;

  gap: 13px;

  flex-wrap: wrap;
}

.color-button {
  width: 38px;
  height: 38px;

  padding: 0;

  border: 2px solid #fff;
  border-radius: 50%;

  cursor: pointer;

  box-shadow: 0 0 0 1px #d3d3d3;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.color-button:hover {
  transform: scale(1.08);
}

.color-button.selected {
  box-shadow:
    0 0 0 2px #222;
}

.sizes {
  display: flex;

  gap: 10px;

  flex-wrap: wrap;
}

.sizes button {
  min-width: 55px;
  height: 42px;

  padding: 0 14px;

  border: 1px solid #ddd;

  background: #fff;

  color: #333;

  cursor: pointer;

  font-size: 13px;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.sizes button:hover {
  border-color: #222;
}

.sizes button.active {
  background: #222;

  color: #fff;

  border-color: #222;
}

.error-message {
  margin: 12px 0 0;

  color: #b53333;

  font-size: 13px;
}

.quantity-section {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 35px 0;
  padding: 20px 0;

  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;

  font-size: 14px;
}

.quantity-control {
  display: flex;
  align-items: center;

  border: 1px solid #ddd;
}

.quantity-control button {
  width: 42px;
  height: 40px;

  border: none;

  background: #fff;

  color: #222;

  cursor: pointer;

  font-size: 18px;
}

.quantity-control button:hover {
  background: #f5f5f5;
}

.quantity-control button:disabled {
  color: #ccc;

  cursor: not-allowed;
}

.quantity-control span {
  width: 45px;

  text-align: center;

  font-size: 14px;
}

.actions {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 14px;
}

.actions button {
  height: 52px;

  cursor: pointer;

  font-size: 13px;
  font-weight: 700;

  letter-spacing: 1px;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.cart-btn {
  border: 1px solid #222;

  background: #222;

  color: #fff;
}

.cart-btn:hover {
  background: #444;

  border-color: #444;
}

.favorite-btn {
  border: 1px solid #ddd;

  background: #fff;

  color: #333;
}

.favorite-btn:hover {
  border-color: #222;
}

.favorite-btn.favoriteActive {
  border-color: #222;

  background: #f6f6f6;

  color: #222;
}

.success-message {
  margin: 17px 0 0;

  padding: 13px 15px;

  background: #f3f5ec;

  color: #687044;

  font-size: 13px;

  border-left: 3px solid #a7a873;
}

.description {
  margin-top: 45px;

  padding-top: 30px;

  border-top: 1px solid #e5e5e5;
}

.description h3 {
  margin: 0 0 15px;

  color: #333;

  font-size: 13px;
  font-weight: 700;

  letter-spacing: 1.5px;
}

.description p {
  max-width: 600px;

  margin: 0;

  color: #777;

  font-size: 14px;

  line-height: 1.8;
}

.not-found {
  min-height: 450px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
}

.not-found h1 {
  margin-bottom: 10px;

  color: #222;

  font-size: 32px;
}

.not-found p {
  margin-bottom: 30px;

  color: #777;
}

.back-button {
  padding: 15px 25px;

  background: #222;

  color: #fff;

  text-decoration: none;

  font-size: 13px;

  letter-spacing: 1px;
}

@media (max-width: 1000px) {
  .details-page {
    padding:
      50px
      35px
      80px;
  }

  .product-section {
    grid-template-columns: 1fr 1fr;

    gap: 45px;
  }

  .product-image-wrapper {
    min-height: 500px;
  }

  .product-image {
    height: 500px;
  }

  .product-info h1 {
    font-size: 30px;
  }

  .actions {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .details-page {
    padding:
      30px
      18px
      70px;
  }

  .product-section {
    grid-template-columns: 1fr;

    gap: 35px;
  }

  .product-image-wrapper {
    min-height: 400px;
  }

  .product-image {
    height: 400px;
  }

  .product-info {
    padding-top: 0;
  }

  .product-info h1 {
    font-size: 27px;
  }

  .product-price {
    font-size: 20px;
  }

  .divider {
    margin: 25px 0;
  }

  .actions {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .product-image-wrapper {
    min-height: 320px;
  }

  .product-image {
    height: 320px;
  }

  .product-info h1 {
    font-size: 24px;
  }

  .sizes button {
    min-width: 48px;
    height: 40px;
  }
}
</style>