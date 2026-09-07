<template>
  <div class="login-page">
    <div class="left-side">
      <img
        src="/src/assets/images/motorbike 2.png"
        alt="Motorbike rider"
      />

      <div class="left-text">
        <h1>JOIN US</h1>
        <p>Ride with style.</p>
      </div>
    </div>

    <div class="right-side">
      <form class="form-box" @submit.prevent="loginUser">
        

        <h2>SIGN IN</h2>

        <p class="subtitle">
          Welcome back! Please sign in to your account.
        </p>

        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          autocomplete="email"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Enter your password"
          autocomplete="current-password"
        />

        <p v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </p>

        <p v-if="successMessage" class="success-message">
          {{ successMessage }}
        </p>

        <button
          class="login-btn"
          type="submit"
          :disabled="loading"
        >
          {{ loading ? 'SIGNING IN...' : 'SIGN IN' }}
        </button>

        <p class="register">
          Don’t have an account?
          <router-link to="/register">
            Create Account
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const loading = ref(false)

const loginUser = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!email.value.trim() || !password.value) {
    errorMessage.value = 'Please enter email and password.'
    return
  }

  loading.value = true

  try {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: email.value.trim(),
        password: password.value,
      })

    if (error) {
      console.error('Login error:', error)
      errorMessage.value = 'Invalid email or password.'
      return
    }

    console.log('Logged in user:', data.user)

    successMessage.value = 'Login successful!'

    setTimeout(() => {
      router.push('/')
    }, 500)
  } catch (error) {
    console.error(error)

    errorMessage.value =
      'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
}

.left-side {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.left-side > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.left-text {
  position: absolute;
  left: 55px;
  bottom: 120px;
  color: white;
}

.left-text h1 {
  font-size: 36px;
  letter-spacing: 3px;
  margin: 0 0 20px;
}

.left-text p {
  font-size: 20px;
  margin: 0;
}

.right-side {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}

.form-box {
  width: 390px;
}

.logo-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin: 0 auto 55px;
  text-decoration: none;
  color: #222;
  line-height: 1;
  transition: opacity 0.2s ease;
}

.logo-box:hover {
  opacity: 0.7;
}

.logo-main {
  font-size: 24px;
  font-weight: 900;
  letter-spacing: 3px;
  white-space: nowrap;
}

.logo-bottom {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin-top: 8px;
}

.logo-sub {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 5px;
  color: #a58b46;
  margin-left: 5px;
}

.logo-line {
  width: 38px;
  height: 1px;
  background: #a58b46;
}

.form-box h2 {
  font-size: 34px;
  text-align: center;
  margin: 0 0 18px;
  color: #111;
}

.subtitle {
  text-align: center;
  color: #777;
  font-size: 16px;
  margin-bottom: 38px;
}

.form-box input {
  width: 100%;
  height: 48px;
  border: 1px solid #d8d8d8;
  padding: 0 15px;
  margin-bottom: 18px;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
}

.form-box input:focus {
  border-color: #c8c18d;
}

.error-message {
  color: #b00020;
  font-size: 14px;
  margin: 0 0 12px;
}

.success-message {
  color: #2e7d32;
  font-size: 14px;
  margin: 0 0 12px;
}

.login-btn {
  width: 100%;
  height: 52px;
  margin-top: 12px;
  border: none;
  background: #c8c18d;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.login-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.register {
  margin-top: 28px;
  text-align: center;
  color: #777;
  font-size: 15px;
}

.register a {
  color: #b9ae6d;
  text-decoration: none;
  cursor: pointer;
}
</style>