<template>
  <div>
    <Navbar />

    <main class="cart-page">
      <section class="cart-left">
        <h1>CART</h1>

        <p v-if="cartItems.length === 0" class="empty-cart">
          Your cart is empty.
        </p>

        <div
          class="cart-item"
          v-for="item in cartItems"
          :key="`${item.id}-${item.size}-${item.color}`"
        >
          <img :src="item.image" :alt="item.name" />

          <div class="item-info">
            <p>{{ item.name }}</p>
            <p>{{ item.size }}</p>
            <p>Color: {{ item.color }}</p>
          </div>

          <div class="quantity">
            <button @click="decreaseQuantity(item)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)">+</button>
          </div>

          <strong>{{ item.price * item.quantity }} MKD</strong>

          <button
            class="remove-item"
            @click="removeItem(item)"
            :aria-label="`Remove ${item.name} from cart`"
            title="Remove item"
          >
            ×
          </button>
        </div>
      </section>

      <aside class="summary">
        <h2>SUMMARY</h2>

        <div class="summary-row">
          <span>Subtotal</span>
          <span>{{ subtotal }} MKD</span>
        </div>

        <div class="summary-row">
          <span>Shipment</span>
          <span>{{ cartItems.length ? '130 MKD' : '0 MKD' }}</span>
        </div>

        <div class="summary-row">
          <span>Tax</span>
          <span>-</span>
        </div>

        <hr />

        <div class="summary-row total">
          <span>Total</span>
          <strong>{{ total }} MKD</strong>
        </div>

        <button class="checkout">GO TO CHECKOUT</button>
      </aside>

      <section class="recommendations">
        <h2>YOU MIGHT ALSO LIKE</h2>

        <div class="recommendation-grid">
          <div
            class="recommendation-card"
            v-for="product in recommendedProducts"
            :key="product.id"
          >
            <img :src="product.image" :alt="product.name" />

            <div class="colors">
              <span
                v-for="color in product.colors"
                :key="color"
                :style="{ backgroundColor: color }"
              ></span>
            </div>

            <p>{{ product.name }}</p>
            <strong>{{ product.price }}</strong>
          </div>
        </div>
      </section>
    </main>

    <FooterSection />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import FooterSection from '../components/FooterSection.vue'

const cartItems = ref([])

const loadCartItems = () => {
  cartItems.value = JSON.parse(localStorage.getItem('cart')) || []
}

const saveCartItems = () => {
  localStorage.setItem('cart', JSON.stringify(cartItems.value))
}

const increaseQuantity = (item) => {
  item.quantity++
  saveCartItems()
}

const removeItem = (item) => {
  cartItems.value = cartItems.value.filter(
    (cartItem) =>
      !(
        cartItem.id === item.id &&
        cartItem.size === item.size &&
        cartItem.color === item.color
      )
  )

  saveCartItems()
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--
    saveCartItems()
    return
  }

  removeItem(item)
}

onMounted(() => {
  loadCartItems()
})

const recommendedProducts = [
  {
    id: 1,
    name: 'Hard Track 3 H2Out Pants',
    price: '32000',
    image: '/src/assets/images/Pants.png',
    colors: ['#d8d8d8', '#5f6970'],
  },
  {
    id: 2,
    name: 'VERTIGO AIR MUD',
    price: '18000 MKD',
    image: '/src/assets/images/shoes.png',
    colors: ['#6f713d', '#1f2937', '#eeeeee'],
  },
  {
    id: 3,
    name: 'Shoei® X-SPR Pro',
    price: '36000 MKD',
    image: '/src/assets/images/helmet.png',
    colors: ['#000000', '#1f2937', '#eeeeee'],
  },
  {
    id: 4,
    name: 'X-GT Gloves',
    price: '7000 MKD',
    image: '/src/assets/images/gloves.png',
    colors: ['#000000', '#44513f', '#b7aa92'],
  },
]

const subtotal = computed(() =>
  cartItems.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
)

const total = computed(() => {
  if (cartItems.value.length === 0) {
    return 0
  }

  return subtotal.value + 130
})
</script>

<style scoped>
.cart-page {
  padding: 85px 75px 100px;
  font-family: Arial, Helvetica, sans-serif;
}

.cart-left {
  width: 62%;
}

.cart-left h1,
.recommendations h2,
.summary h2 {
  font-weight: 300;
  color: #333;
}

.cart-left h1 {
  font-size: 26px;
  margin-bottom: 35px;
}

.empty-cart {
  color: #777;
  font-size: 16px;
}

.cart-item {
  display: grid;
  grid-template-columns: 140px 1fr 130px 120px 36px;
  align-items: center;
  gap: 35px;
  border-bottom: 1px solid #e2e2e2;
  padding: 18px 0;
}

.cart-item img {
  width: 120px;
  height: 140px;
  object-fit: contain;
}

.item-info {
  color: #777;
  font-size: 14px;
  line-height: 1.8;
}

.item-info p {
  margin: 0;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 22px;
}

.quantity button {
  border: none;
  background: #f3f3f3;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.remove-item {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #777;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;
}

.remove-item:hover {
  color: #111;
  transform: scale(1.08);
}

.summary {
  position: absolute;
  top: 190px;
  right: 75px;
  width: 390px;
  padding: 28px;
  border: 1px solid #cfcfcf;
  border-radius: 5px;
  box-shadow: 0 4px 8px #00000025;
}

.summary h2 {
  margin: 0 0 30px;
  font-size: 24px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  color: #777;
  margin-bottom: 24px;
  font-size: 15px;
}

.summary hr {
  border: none;
  border-top: 1px solid #dddddd;
  margin: 25px 0;
}

.total {
  color: #333;
  font-size: 18px;
}

.checkout {
  width: 100%;
  height: 42px;
  border: none;
  background: #c8c18d;
  color: white;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
}

.recommendations {
  margin-top: 110px;
}

.recommendations h2 {
  font-size: 28px;
  margin-bottom: 55px;
}

.recommendation-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 75px;
}

.recommendation-card img {
  width: 100%;
  height: 260px;
  object-fit: contain;
}

.colors {
  display: flex;
  gap: 7px;
  margin-top: 18px;
}

.colors span {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.recommendation-card p {
  color: #777;
  font-size: 14px;
  margin: 12px 0;
}

.recommendation-card strong {
  font-size: 14px;
}
</style>