<template>
  <header class="navbar">
    <div class="main-nav">
      <router-link
        to="/"
        class="logo-box"
        @click="closeMobileMenu"
      >
        <span class="logo-main">MOTORBIKE</span>

        <span class="logo-bottom">
          <span class="logo-line"></span>
          <span class="logo-sub">SHOP</span>
          <span class="logo-line"></span>
        </span>
      </router-link>

      <nav class="menu" :class="{ open: mobileMenuOpen }">
        <router-link to="/products" @click="closeMobileMenu">
          ALL PRODUCTS
        </router-link>

        <router-link to="/motorcycles" @click="closeMobileMenu">
          MOTORCYCLES
        </router-link>

        <router-link to="/apparel" @click="closeMobileMenu">
          APPAREL
        </router-link>

        <router-link to="/helmets" @click="closeMobileMenu">
          HELMETS
        </router-link>

        <router-link to="/gadgets" @click="closeMobileMenu">
          GADGETS
        </router-link>

        <router-link to="/brands" @click="closeMobileMenu">
          BRANDS
        </router-link>
      </nav>

      <div class="right-side">
        <div class="icons">
          <div
            ref="accountWrap"
            class="account-wrap"
          >
            <router-link
              v-if="!user"
              to="/login"
              class="icon-link"
            >
              <img
                class="nav-icon"
                src="../assets/images/User_light.png"
                alt="Sign in"
              />
            </router-link>

            <button
              v-else
              class="account-button"
              @click.stop="toggleAccountMenu"
            >
              <img
                class="nav-icon"
                src="../assets/images/User_light.png"
                alt="Account"
              />
            </button>

            <div
              v-if="user && showAccountMenu"
              class="account-menu"
            >
              <p
                v-if="user.user_metadata?.full_name"
                class="account-name"
              >
                {{ user.user_metadata.full_name }}
              </p>

              <p class="account-email">
                {{ user.email }}
              </p>

              <button
                class="logout-button"
                @click="logout"
              >
                Logout
              </button>
            </div>
          </div>

          <router-link
            to="/favorites"
            class="icon-link"
          >
            <img
              class="nav-icon"
              src="../assets/images/Favorite_light.png"
              alt="Favorites"
            />
          </router-link>

          <router-link
            to="/cart"
            class="icon-link cart-link"
          >
            <img
              src="../assets/images/Shopping Cart.png"
              alt="Cart"
            />
          </router-link>
        </div>

        <button
          class="menu-toggle"
          @click="toggleMobileMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted
} from 'vue'

import { useRouter } from 'vue-router'
import { supabase } from '../supabase'

const router = useRouter()

const user = ref(null)
const showAccountMenu = ref(false)
const mobileMenuOpen = ref(false)
const accountWrap = ref(null)

let authSubscription = null

const toggleAccountMenu = () => {
  showAccountMenu.value =
    !showAccountMenu.value
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value =
    !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const closeAccountMenu = (event) => {
  if (
    accountWrap.value &&
    !accountWrap.value.contains(event.target)
  ) {
    showAccountMenu.value = false
  }
}

const logout = async () => {
  const { error } =
    await supabase.auth.signOut()

  if (error) {
    console.error('Logout error:', error.message)
    return
  }

  user.value = null
  showAccountMenu.value = false
  mobileMenuOpen.value = false

  router.push('/login')
}

const loadUser = async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  user.value = session?.user ?? null
}

onMounted(async () => {
  await loadUser()

  const { data } =
    supabase.auth.onAuthStateChange(
      (event, session) => {
        user.value = session?.user ?? null

        if (!user.value) {
          showAccountMenu.value = false
        }
      }
    )

  authSubscription = data.subscription

  document.addEventListener(
    'click',
    closeAccountMenu
  )
})

onUnmounted(() => {
  document.removeEventListener(
    'click',
    closeAccountMenu
  )

  if (authSubscription) {
    authSubscription.unsubscribe()
  }
})
</script>

<style scoped>
.navbar {
  width: 100%;
  background: white;
  border-bottom: 1px solid #eeeeee;
  position: relative;
  z-index: 1000;
}

.main-nav {
  min-height: 105px;
  display: grid;
  grid-template-columns: 170px 1fr 190px;
  align-items: center;
  padding: 0 40px;
}

.logo-box {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #222;
  line-height: 1;
  min-width: 165px;
  transition: opacity 0.2s ease;
}

.logo-box:hover {
  opacity: 0.7;
}

.logo-main {
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 2.8px;
  white-space: nowrap;
}

.logo-bottom {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 7px;
}

.logo-sub {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 5px;
  color: #a58b46;
  margin-left: 5px;
}

.logo-line {
  height: 1px;
  width: 33px;
  background: #a58b46;
}

.logo-box:focus:not(:focus-visible) {
  outline: none;
}

.logo-box:focus-visible {
  outline: 2px solid #a99d59;
  outline-offset: 4px;
}

.menu {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.menu a,
.menu a:visited,
.menu a:hover,
.menu a:active {
  color: #3f3f3f;
  font-size: 15px;
  white-space: nowrap;
  text-decoration: none !important;
  background: transparent !important;
  padding: 0;
  transition: color 0.2s ease;
}

.menu a:hover {
  color: #a99d59;
}

.menu a.router-link-active {
  color: #a99d59;
}

.right-side {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 18px;
}

.icons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
}

.icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none !important;
  background: transparent !important;
  padding: 0;
}

.nav-icon {
  width: 25px;
  height: 25px;
  object-fit: contain;
  cursor: pointer;
  opacity: 0.75;
  transition: 0.2s ease;
}

.nav-icon:hover {
  opacity: 1;
  transform: translateY(-1px);
}

.cart-link img {
  width: 37px;
  height: 37px;
  object-fit: contain;
}

.account-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.account-button {
  border: none;
  padding: 0;
  margin: 0;
  background: transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.account-menu {
  position: absolute;
  top: 42px;
  right: -10px;
  width: 235px;
  padding: 18px;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  z-index: 1200;
}

.account-name {
  margin: 0 0 6px;
  color: #222;
  font-size: 15px;
  font-weight: 600;
}

.account-email {
  margin: 0 0 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid #eeeeee;
  color: #777;
  font-size: 13px;
  overflow-wrap: anywhere;
}

.logout-button {
  width: 100%;
  border: none;
  background: transparent;
  padding: 8px 0;
  text-align: left;
  color: #a99d59;
  font-size: 15px;
  cursor: pointer;
}

.logout-button:hover {
  color: #786e36;
}

.menu-toggle {
  display: none;
  width: 32px;
  height: 30px;
  border: none;
  background: transparent;
  padding: 4px 0;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.menu-toggle span {
  width: 100%;
  height: 2px;
  background: #333;
  display: block;
}

@media (max-width: 1100px) {
  .main-nav {
    grid-template-columns: 135px 1fr 175px;
    padding: 0 25px;
  }

  .menu {
    gap: 18px;
  }

  .menu a {
    font-size: 13px;
  }

  .icons {
    gap: 16px;
  }
}

@media (max-width: 850px) {
  .main-nav {
    min-height: 82px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 15px 20px;
  }

  .menu {
    display: none;
    order: 3;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding: 18px 0 5px;
  }

  .menu.open {
    display: flex;
  }

  .menu a {
    width: 100%;
    padding: 13px 0;
    font-size: 14px;
    border-top: 1px solid #eeeeee;
  }

  .menu-toggle {
    display: flex;
  }

  .right-side {
    gap: 16px;
  }

  .icons {
    gap: 16px;
  }

  .nav-icon {
    width: 23px;
    height: 23px;
  }

  .cart-link img {
    width: 33px;
    height: 33px;
  }
}

@media (max-width: 480px) {
  .main-nav {
    padding: 14px 15px;
  }

  .icons {
    gap: 12px;
  }

  .nav-icon {
    width: 21px;
    height: 21px;
  }

  .cart-link img {
    width: 29px;
    height: 29px;
  }

  .menu-toggle {
    width: 27px;
    height: 26px;
  }

  .account-menu {
    right: -70px;
    width: 210px;
  }
}
</style>