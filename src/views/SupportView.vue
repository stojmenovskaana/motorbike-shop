<template>
  <div>
    <Navbar />

    <main class="support-page">
      <section id="contact" class="support-section">
        <h1>Contact Us</h1>

        <p>
          Need help with an order or have a question about our products?
          Get in touch with the MotorBike team.
        </p>

        <div class="contact-box">
          <p><strong>Email:</strong> info@motoshop.mk</p>
          <p><strong>Phone:</strong> +389 70 123 456</p>
          <p><strong>Working Hours:</strong> Monday - Friday, 09:00 - 17:00</p>
        </div>
      </section>

      <section id="shipping" class="support-section">
        <h2>Shipping Info</h2>

        <p>
          Orders are processed within 1-2 business days.
          Delivery time depends on the destination and product availability.
        </p>

        <p>
          Shipping costs are calculated according to the delivery location
          and order size.
        </p>
      </section>

      <section id="returns" class="support-section">
        <h2>Returns</h2>

        <p>
          Products can be returned within 14 days of delivery if they are
          unused, undamaged and in their original packaging.
        </p>

        <p>
          Contact us before returning a product so we can provide return
          instructions.
        </p>
      </section>

      <section id="faq" class="support-section">
        <h2>FAQ</h2>

        <div class="faq-item">
          <h3>How can I place an order?</h3>
          <p>
            Add products to your cart and continue to checkout.
          </p>
        </div>

        <div class="faq-item">
          <h3>Can I return a product?</h3>
          <p>
            Yes. Products can be returned within 14 days if they meet our
            return conditions.
          </p>
        </div>

        <div class="faq-item">
          <h3>How can I contact MotorBike Shop?</h3>
          <p>
            You can contact us by email or phone using the details above.
          </p>
        </div>
      </section>
    </main>

    <FooterSection />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import FooterSection from '../components/FooterSection.vue'
</script>

<style scoped>
.support-page {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 70px 40px 90px;
}

.support-section {
  padding: 45px 0;
  border-bottom: 1px solid #e5e5e5;
  scroll-margin-top: 30px;
}

.support-section:first-child {
  padding-top: 0;
}

.support-section:last-child {
  border-bottom: none;
}

.support-section h1,
.support-section h2 {
  margin: 0 0 25px;
  color: #30333b;
  font-size: 32px;
  font-weight: 500;
}

.support-section p {
  max-width: 800px;
  margin: 0 0 16px;
  color: #666;
  font-size: 16px;
  line-height: 1.7;
}

.contact-box {
  margin-top: 30px;
  padding: 25px;
  background: #f5f5f5;
  border-radius: 6px;
}

.contact-box p {
  margin: 0 0 10px;
}

.contact-box p:last-child {
  margin-bottom: 0;
}

.faq-item {
  margin-bottom: 30px;
}

.faq-item h3 {
  margin: 0 0 10px;
  color: #333;
  font-size: 18px;
  font-weight: 600;
}

@media (max-width: 600px) {
  .support-page {
    padding: 45px 20px 60px;
  }

  .support-section {
    padding: 35px 0;
  }

  .support-section h1,
  .support-section h2 {
    font-size: 26px;
  }

  .support-section p {
    font-size: 15px;
  }
}
</style>