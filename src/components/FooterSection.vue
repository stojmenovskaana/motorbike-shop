<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="subscribe-section">
        <h2>Join Us</h2>

        <p>
          Subscribe to get special offers, exclusive news and insider tips.
        </p>

        <form class="subscribe-form" @submit.prevent="subscribe">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
          />

          <button type="submit">
            SUBSCRIBE
          </button>
        </form>

        <p
          v-if="message"
          class="subscribe-message"
        >
          {{ message }}
        </p>
      </div>

      <div class="footer-links">
        <div class="footer-column">
          <h3>Shop</h3>

          <router-link to="/motorcycles">
            Motorcycles
          </router-link>

          <router-link to="/apparel">
            Apparel
          </router-link>

          <router-link to="/helmets">
            Helmets
          </router-link>

          <router-link to="/gadgets">
            Gadgets
          </router-link>
        </div>

        <div class="footer-column">
  <h3>Support</h3>

  <router-link
    :to="{ path: '/support', hash: '#contact' }"
  >
    Contact Us
  </router-link>

  <router-link
    :to="{ path: '/support', hash: '#shipping' }"
  >
    Shipping Info
  </router-link>

  <router-link
    :to="{ path: '/support', hash: '#returns' }"
  >
    Returns
  </router-link>

  <router-link
    :to="{ path: '/support', hash: '#faq' }"
  >
    FAQ
  </router-link>
</div>
      </div>
    </div>

    <div class="bottom-line">
      <p>
        All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const message = ref('')

const subscribe = () => {
  const subscribers =
    JSON.parse(localStorage.getItem('subscribers')) || []

  if (!subscribers.includes(email.value)) {
    subscribers.push(email.value)

    localStorage.setItem(
      'subscribers',
      JSON.stringify(subscribers)
    )

    message.value = 'Thank you for subscribing!'
  } else {
    message.value = 'You are already subscribed.'
  }

  email.value = ''
}
</script>

<style scoped>
.footer {
  width: 100%;
  background: #30333b;
  color: white;
  padding: 85px 75px 35px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 90px;
  align-items: start;
}

.subscribe-section {
  min-width: 0;
}

.subscribe-section h2 {
  margin: 0 0 25px;
  font-size: 32px;
  font-weight: 700;
}

.subscribe-section p {
  margin: 0;
  color: #d6d6d6;
  font-size: 18px;
}

.subscribe-form {
  display: flex;
  gap: 12px;
  margin-top: 45px;
  max-width: 600px;
}

.subscribe-form input {
  flex: 1;
  min-width: 0;
  height: 48px;
  padding: 0 15px;
  border: none;
  border-radius: 4px;
  font-size: 17px;
  outline: none;
}

.subscribe-form button {
  width: 155px;
  height: 48px;
  flex-shrink: 0;
  border: none;
  border-radius: 5px;
  background: #c8c18d;
  color: white;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s ease;
}

.subscribe-form button:hover {
  background: #b6ae74;
}

.subscribe-message {
  margin-top: 18px !important;
  font-size: 15px !important;
  color: #c8c18d !important;
}

.footer-links {
  display: flex;
  justify-content: space-between;
  gap: 70px;
}

.footer-column {
  min-width: 120px;
}

.footer-links h3 {
  margin: 0 0 24px;
  font-size: 21px;
  font-weight: 600;
}

.footer-links a {
  display: block;
  margin: 0 0 20px;
  color: #d6d6d6;
  font-size: 18px;
  text-decoration: none;
  transition: 0.2s ease;
}

.footer-links a:hover {
  color: #c8c18d;
  transform: translateX(4px);
}

.footer-links p {
  margin: 0 0 20px;
  color: #d6d6d6;
  font-size: 18px;
}

.bottom-line {
  border-top: 1px solid #5b5e66;
  margin-top: 70px;
  padding-top: 25px;
}

.bottom-line p {
  margin: 0;
  color: #cfcfcf;
  font-size: 16px;
}

@media (max-width: 1000px) {
  .footer {
    padding: 65px 40px 30px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 55px;
  }

  .footer-links {
    justify-content: flex-start;
    gap: 100px;
  }
}

@media (max-width: 600px) {
  .footer {
    padding: 45px 20px 25px;
  }

  .subscribe-section h2 {
    margin-bottom: 18px;
    font-size: 26px;
  }

  .subscribe-section p {
    font-size: 15px;
    line-height: 1.6;
  }

  .subscribe-form {
    flex-direction: column;
    gap: 10px;
    margin-top: 30px;
  }

  .subscribe-form input,
  .subscribe-form button {
    width: 100%;
  }

  .footer-links {
    gap: 60px;
  }

  .footer-links h3 {
    font-size: 18px;
  }

  .footer-links a,
  .footer-links p {
    margin-bottom: 15px;
    font-size: 15px;
  }

  .bottom-line {
    margin-top: 45px;
    padding-top: 20px;
  }

  .bottom-line p {
    font-size: 13px;
  }
}

@media (max-width: 400px) {
  .footer {
    padding: 40px 16px 22px;
  }

  .footer-links {
    gap: 40px;
  }

  .footer-column {
    min-width: 0;
    flex: 1;
  }

  .subscribe-section h2 {
    font-size: 24px;
  }
}
</style>