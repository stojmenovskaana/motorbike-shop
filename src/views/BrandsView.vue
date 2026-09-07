<template>
  <div>
    <Navbar />

    <main class="brands-page">
      <section class="brands-hero">
        <p class="breadcrumb">
          Home / Brands
        </p>

        <div class="hero-content">
          <div>
            <p class="small-title">
              MOTO KULTURA
            </p>

            <h1>
              OUR<br />
              BRANDS
            </h1>
          </div>

          <div class="hero-text">
            <p>
              Discover the brands behind the ride.
              From premium helmets and apparel to
              motorcycles and riding accessories.
            </p>

            <span>
              Choose a brand to explore its products.
            </span>
          </div>
        </div>
      </section>

      <section class="brands-section">
        <div class="section-heading">
          <h2>SHOP BY BRAND</h2>

          <p>
            {{ brands.length }} brands
          </p>
        </div>

        <div class="brands-grid">
          <router-link
            v-for="brand in brands"
            :key="brand.slug"
            :to="{
              name: 'BrandProducts',
              params: {
                brand: brand.slug
              }
            }"
            class="brand-card"
          >
            <div class="brand-logo">
              <img
                :src="brand.image"
                :alt="brand.name"
              />
            </div>

            <div class="brand-bottom">
              <h3>
                {{ brand.name }}
              </h3>

              <span class="arrow">
                →
              </span>
            </div>
          </router-link>
        </div>
      </section>
    </main>

    <FooterSection />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import FooterSection from '../components/FooterSection.vue'
import { brands } from '../data/brands'
</script>

<style scoped>
.brands-page {
  background: #ffffff;
  font-family: Arial, Helvetica, sans-serif;
}

.brands-hero {
  padding: 42px 60px 70px;
  border-bottom: 1px solid #e8e8e8;
}

.breadcrumb {
  margin: 0 0 55px;
  color: #777;
  font-size: 14px;
}

.hero-content {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  align-items: end;
  gap: 80px;
}

.small-title {
  margin: 0 0 12px;
  color: #999;
  font-size: 13px;
  letter-spacing: 3px;
}

.hero-content h1 {
  margin: 0;
  color: #222;
  font-size: 82px;
  line-height: 0.88;
  font-weight: 700;
  letter-spacing: -4px;
}

.hero-text {
  max-width: 440px;
  padding-bottom: 5px;
}

.hero-text p {
  margin: 0 0 18px;
  color: #555;
  font-size: 18px;
  line-height: 1.7;
}

.hero-text span {
  color: #999;
  font-size: 14px;
}

.brands-section {
  padding: 65px 60px 100px;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
}

.section-heading h2 {
  margin: 0;
  color: #222;
  font-size: 18px;
  letter-spacing: 1px;
}

.section-heading p {
  margin: 0;
  color: #999;
  font-size: 14px;
}

.brands-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.brand-card {
  min-width: 0;
  height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  background: #f5f5f3;
  border: 1px solid transparent;
  color: #222;
  text-decoration: none;
  overflow: hidden;
  transition:
    transform 0.25s ease,
    background 0.25s ease,
    border-color 0.25s ease;
}

.brand-card:hover {
  background: #ffffff;
  border-color: #d8d8d8;
  transform: translateY(-4px);
}

.brand-logo {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 0;
}

.brand-logo img {
  width: 70%;
  max-width: 180px;
  max-height: 100px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.brand-card:hover .brand-logo img {
  transform: scale(1.06);
}

.brand-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.brand-bottom h3 {
  margin: 0;
  color: #444;
  font-size: 15px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.arrow {
  font-size: 24px;
  color: #777;
  transition: transform 0.2s ease;
}

.brand-card:hover .arrow {
  transform: translateX(5px);
}

@media (max-width: 1000px) {
  .hero-content h1 {
    font-size: 64px;
  }

  .brands-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .brands-hero {
    padding: 30px 20px 50px;
  }

  .breadcrumb {
    margin-bottom: 35px;
  }

  .hero-content {
    grid-template-columns: 1fr;
    gap: 35px;
  }

  .hero-content h1 {
    font-size: 52px;
    letter-spacing: -2px;
  }

  .hero-text {
    max-width: none;
  }

  .hero-text p {
    font-size: 16px;
  }

  .brands-section {
    padding: 45px 20px 70px;
  }

  .brands-grid {
    grid-template-columns: 1fr;
  }

  .brand-card {
    height: 220px;
  }
}
</style>