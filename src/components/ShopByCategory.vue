<template>
  <section class="shop-category">
    <h2>SHOP BY CATEGORY</h2>

    <div class="category-grid">
      <router-link to="/motorcycles" class="category-card">
        <img src="../assets/images/Motorcycles.png" alt="Motorcycles" />

        <div class="category-text">
          <h3>MOTORCYCLES ›</h3>
          <p>Performance Meets Passion</p>
        </div>
      </router-link>

      <router-link to="/apparel" class="category-card">
        <img src="../assets/images/Apparel.png" alt="Apparel" />

        <div class="category-text">
          <h3>APPAREL ›</h3>
          <p>Style with Protection</p>
        </div>
      </router-link>

      <router-link to="/helmets" class="category-card">
        <img src="../assets/images/Helmets.png" alt="Helmets" />

        <div class="category-text">
          <h3>HELMETS ›</h3>
          <p>Safety Meets Design</p>
        </div>
      </router-link>

      <router-link to="/gadgets" class="category-card">
        <img src="../assets/images/Gadges.png" alt="Gadgets" />

        <div class="category-text">
          <h3>GADGETS ›</h3>
          <p>Connected on Every Mile</p>
        </div>
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.shop-category {
  width: 100%;
  background: white;
  padding: 55px 35px 70px;
}

.shop-category h2 {
  margin: 0 0 30px;
  font-size: 32px;
  font-weight: 300;
  letter-spacing: 1px;
  color: #333;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 35px;
}

.category-card {
  position: relative;
  height: 390px;
  overflow: hidden;
  cursor: pointer;
  display: block;
  text-decoration: none;
  color: white;
}

.category-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.category-card:hover img {
  transform: scale(1.05);
}

.category-text {
  position: absolute;
  left: 18px;
  bottom: 18px;
  color: white;
  z-index: 2;
}

.category-text h3 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
}

.category-text p {
  margin: 3px 0 0;
  font-size: 15px;
}

@media (max-width: 1000px) {
  .shop-category {
    padding: 50px 25px 60px;
  }

  .category-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 25px;
  }

  .category-card {
    height: 350px;
  }
}

@media (max-width: 600px) {
  .shop-category {
    padding: 40px 20px 50px;
  }

  .shop-category h2 {
    margin-bottom: 25px;
    font-size: 26px;
  }

  .category-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .category-card {
    height: 300px;
  }

  .category-text {
    left: 16px;
    bottom: 16px;
  }

  .category-text h3 {
    font-size: 20px;
  }

  .category-text p {
    font-size: 14px;
  }
}

@media (max-width: 400px) {
  .shop-category {
    padding: 35px 16px 45px;
  }

  .shop-category h2 {
    font-size: 23px;
  }

  .category-card {
    height: 280px;
  }
}
</style>