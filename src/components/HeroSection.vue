<template>
  <section class="hero">
    <img
      src="../assets/images/MainImage.png"
      alt="Moto Culture"
    />
  </section>
</template>

<style scoped>
.hero {
  width: 100%;
  overflow: hidden;
}

.hero img {
  width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 600px) {
  .hero {
    width: 100%;
  }

  .hero img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}
</style>