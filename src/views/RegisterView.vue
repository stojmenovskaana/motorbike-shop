<template>
  <div class="register-page">
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
      <form class="form-box" @submit.prevent="registerUser">
        

        <h2>CREATE ACCOUNT</h2>
        

        <input
          v-model="name"
          type="text"
          placeholder="Full name"
          autocomplete="name"
        />

        <input
          v-model="email"
          type="email"
          placeholder="Email address"
          autocomplete="email"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          autocomplete="new-password"
        />

        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm password"
          autocomplete="new-password"
        />

        <p v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </p>

        <p v-if="successMessage" class="success-message">
          {{ successMessage }}
        </p>

        <button
          class="register-btn"
          type="submit"
          :disabled="loading"
        >
          {{ loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT' }}
        </button>

        <p class="login-link">
          Already have an account?
          <router-link to="/login">
            Sign In
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

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const errorMessage = ref('')
const successMessage = ref('')
const loading = ref(false)

const registerUser = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (
    !name.value.trim() ||
    !email.value.trim() ||
    !password.value ||
    !confirmPassword.value
  ) {
    errorMessage.value = 'Please fill in all fields.'
    return
  }

  // Проверка дали лозинките се исти
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  // Supabase стандардно бара лозинка од најмалку 6 карактери
  if (password.value.length < 6) {
    errorMessage.value =
      'Password must be at least 6 characters long.'
    return
  }

  loading.value = true

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value.trim(),
      password: password.value,

      options: {
        data: {
          full_name: name.value.trim(),
        },
      },
    })

    if (error) {
      console.error('Supabase register error:', error)

      if (
        error.message
          .toLowerCase()
          .includes('already registered')
      ) {
        errorMessage.value =
          'An account with this email already exists.'
      } else {
        errorMessage.value = error.message
      }

      return
    }

    console.log('Registered user:', data.user)

    successMessage.value =
      'Account created successfully!'

    // Мала пауза за да се види success пораката
    setTimeout(() => {
      router.push('/')
    }, 800)
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
.register-page {
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
  bottom: 95px;
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
  width: 430px;
}

.logo {
  width: 150px;
  display: block;
  margin: 0 auto 45px;
}

.form-box h2 {
  font-size: 34px;
  text-align: center;
  margin: 0 0 18px;
  color: #111;
  letter-spacing: 1px;
}

.subtitle {
  text-align: center;
  color: #777;
  font-size: 16px;
  margin-bottom: 35px;
}

.form-box input {
  width: 100%;
  height: 48px;
  border: 1px solid #d8d8d8;
  padding: 0 15px;
  margin-bottom: 16px;
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

.register-btn {
  width: 100%;
  height: 52px;
  margin-top: 12px;
  border: none;
  background: #c8c18d;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.register-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.login-link {
  margin-top: 28px;
  text-align: center;
  color: #777;
  font-size: 15px;
}

.login-link a {
  color: #b9ae6d;
  text-decoration: none;
}
</style>