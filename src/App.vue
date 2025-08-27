<template>
  <VParticleField />
  <main>
    <h1>Supreme Visual Effects - Playground</h1>

    <section>
      <h2>v-ripple Directive</h2>
      <button v-ripple class="ripple-btn">Click Me</button>
      <button v-ripple="{ color: 'rgba(255, 0, 0, 0.5)' }" class="ripple-btn">
        Red Ripple
      </button>
    </section>

    <section class="scroll-section">
      <h2>VScrollReveal Component</h2>
      <p>Scroll down to see the effect.</p>
    </section>

    <VScrollReveal v-for="n in 5" :key="n" class="box-container">
      <div class="box">
        <p>Item {{ n }}</p>
      </div>
    </VScrollReveal>
  </main>
</template>

<script setup lang="ts">
import VScrollReveal from './components/VScrollReveal.vue';
import VParticleField from './components/VParticleField.vue';
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #1a1a1a; /* Dark background for particles */
  color: #e2e8f0;
  line-height: 1.6;
}

main {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: rgba(26, 26, 26, 0.8); /* Semi-transparent dark */
  backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

h1,
h2 {
  border-bottom: 1px solid #4a5568;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 1.75rem;
}

section {
  margin-bottom: 3rem;
}

.ripple-btn {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #4f46e5;
  color: white;
  margin-right: 1rem;
  position: relative;
  overflow: hidden;
}

.scroll-section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.box-container {
  margin-bottom: 2rem;
}

.box {
  background-color: #2d3748;
  border: 1px solid #4a5568;
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #a0aec0;
}
</style>
