<template>
  <div class="playground">
    <VParticleField />
    <main>
      <h1>Supreme Visual Effects - Complete Playground</h1>
      
      <!-- Background Effects -->
      <section>
        <h2>Background Effects</h2>
        <div class="demo-container">
          <h3>VGradientBackground</h3>
          <VGradientBackground 
            :layers="gradientLayers"
            :animation="true"
            class="gradient-demo"
          >
            <div class="gradient-content">
              <h4>Gradient Background</h4>
              <p>Animated gradient layers</p>
            </div>
          </VGradientBackground>
        </div>

        <div class="demo-container">
          <h3>VStarfield</h3>
          <VStarfield 
            :star-count="150"
            :speed="0.3"
            :mouse-interaction="true"
            class="starfield-demo"
          >
            <div class="starfield-content">
              <h4>3D Starfield</h4>
              <p>Interactive starfield background</p>
            </div>
          </VStarfield>
        </div>
      </section>

      <!-- Scroll Effects -->
      <section>
        <h2>Scroll Effects</h2>
        <div class="demo-container">
          <h3>VParallax</h3>
          <VParallax 
            :layers="parallaxLayers"
            :enabled="true"
            class="parallax-demo"
          >
            <template #layer-0>
              <div class="parallax-bg">Background Layer</div>
            </template>
            <template #layer-1>
              <div class="parallax-mid">Middle Layer</div>
            </template>
            <template #layer-2>
              <div class="parallax-fg">Foreground Layer</div>
            </template>
          </VParallax>
        </div>

        <div class="demo-container">
          <h3>VScrollSnap</h3>
          <VScrollSnap 
            :sections="scrollSnapSections"
            :show-indicators="true"
            :show-arrows="true"
            class="scrollsnap-demo"
          />
        </div>
      </section>

      <!-- Text Effects -->
      <section>
        <h2>Text Effects</h2>
        <div class="demo-container">
          <h3>VTypingText</h3>
          <VTypingText 
            :text="typingTexts"
            :speed="100"
            :loop="true"
            :cursor="true"
            class="typing-demo"
          />
        </div>

        <div class="demo-container">
          <h3>VNeonText</h3>
          <VNeonText 
            text="NEON TEXT"
            :animation="true"
            animation-type="flicker"
            color="#00ffff"
            glow-color="#00ffff"
            :glow-intensity="30"
            class="neon-demo"
          />
        </div>
      </section>

      <!-- Interaction Effects -->
      <section>
        <h2>Interaction Effects</h2>
        <div class="demo-container">
          <h3>VHover3D</h3>
          <VHover3D 
            :intensity="20"
            :scale="1.1"
            class="hover3d-demo"
          >
            <div class="hover3d-content">
              <h4>3D Hover Effect</h4>
              <p>Move your mouse over this element</p>
            </div>
          </VHover3D>
        </div>

        <div class="demo-container">
          <h3>VMagneticButton</h3>
          <VMagneticButton 
            :magnetic-strength="0.4"
            :magnetic-range="120"
            :ripple="true"
            class="magnetic-demo"
            @click="handleMagneticClick"
          >
            Magnetic Button
          </VMagneticButton>
        </div>

        <div class="demo-container">
          <h3>VGlitch</h3>
          <VGlitch 
            :enabled="true"
            :auto-trigger="true"
            :trigger-interval="3000"
            :intensity="0.8"
            class="glitch-demo"
          >
            <div class="glitch-content">
              <h4>GLITCH EFFECT</h4>
              <p>Hover or wait for auto-trigger</p>
            </div>
          </VGlitch>
        </div>
      </section>

      <!-- Media Components -->
      <section>
        <h2>Media Components</h2>
        <div class="demo-container">
          <h3>VCarousel3D</h3>
          <VCarousel3D 
            :items="carouselItems"
            :auto-play="true"
            :show-arrows="true"
            :show-indicators="true"
            class="carousel-demo"
          />
        </div>

        <div class="demo-container">
          <h3>VImageComparison</h3>
          <VImageComparison 
            before-image="https://picsum.photos/400/300?random=1"
            after-image="https://picsum.photos/400/300?random=2"
            before-label="Before"
            after-label="After"
            class="comparison-demo"
          />
        </div>
      </section>

      <!-- Decoration Components -->
      <section>
        <h2>Decoration Components</h2>
        <div class="demo-container">
          <h3>VDivider</h3>
          <VDivider 
            type="wave"
            :animation="true"
            color="#667eea"
            class="divider-demo"
          />
          <VDivider 
            type="dots"
            :animation="true"
            color="#764ba2"
            :dot-count="7"
            class="divider-demo"
          />
          <VDivider 
            type="gradient"
            :gradient-colors="['#667eea', '#764ba2']"
            class="divider-demo"
          />
        </div>

        <div class="demo-container">
          <h3>VScrollProgress</h3>
          <VScrollProgress 
            position="top"
            color="#667eea"
            :show-percentage="true"
            :glow="true"
            class="progress-demo"
          />
        </div>

        <div class="demo-container">
          <h3>VConfetti</h3>
          <VConfetti 
            ref="confettiRef"
            :enabled="true"
            :particle-count="50"
            class="confetti-demo"
          />
          <button @click="triggerConfetti" class="confetti-trigger">
            🎉 Trigger Confetti
          </button>
        </div>
      </section>

      <!-- Original Components -->
      <section>
        <h2>Original Components</h2>
        <div class="demo-container">
          <h3>v-ripple Directive</h3>
          <button v-ripple class="ripple-btn">Click Me</button>
          <button v-ripple="{ color: 'rgba(255, 0, 0, 0.5)' }" class="ripple-btn">
            Red Ripple
          </button>
        </div>

        <div class="demo-container">
          <h3>VScrollReveal Component</h3>
          <p>Scroll down to see the effect.</p>
        </div>

        <VScrollReveal v-for="n in 5" :key="n" class="box-container">
          <div class="box">
            <p>Item {{ n }}</p>
          </div>
        </VScrollReveal>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import VScrollReveal from './components/VScrollReveal.vue';
import VParticleField from './components/VParticleField.vue';
import VGradientBackground from './components/VGradientBackground.vue';
import VStarfield from './components/VStarfield.vue';
import VParallax from './components/VParallax.vue';
import VScrollSnap from './components/VScrollSnap.vue';
import VTypingText from './components/VTypingText.vue';
import VNeonText from './components/VNeonText.vue';
import VHover3D from './components/VHover3D.vue';
import VMagneticButton from './components/VMagneticButton.vue';
import VGlitch from './components/VGlitch.vue';
import VCarousel3D from './components/VCarousel3D.vue';
import VImageComparison from './components/VImageComparison.vue';
import VDivider from './components/VDivider.vue';
import VScrollProgress from './components/VScrollProgress.vue';
import VConfetti from './components/VConfetti.vue';
import {ref} from 'vue';
// Demo data
const gradientLayers = [
  {
    type: 'linear',
    direction: '45deg',
    stops: [
      { color: '#667eea', position: 0 },
      { color: '#764ba2', position: 100 }
    ],
    animation: {
      type: 'flow',
      duration: 8,
      intensity: 0.3
    }
  }
];

const parallaxLayers = [
  { speed: 0.5, content: 'Background Layer' },
  { speed: 0.8, content: 'Middle Layer' },
  { speed: 1, content: 'Foreground Layer' }
];

const scrollSnapSections = [
  { content: 'First section', backgroundColor: '#667eea' },
  { content: 'Second section', backgroundColor: '#764ba2' },
  { content: 'Third section', backgroundColor: '#f093fb' }
];

const typingTexts = [
  'Hello World!',
  'This is a typing effect',
  'Made with Vue 3',
  'Supreme Visual Effects'
];

const carouselItems = [
  { title: 'Item 1', image: 'https://picsum.photos/300/200?random=1' },
  { title: 'Item 2', image: 'https://picsum.photos/300/200?random=2' },
  { title: 'Item 3', image: 'https://picsum.photos/300/200?random=3' },
  { title: 'Item 4', image: 'https://picsum.photos/300/200?random=4' }
];

const confettiRef = ref();

const handleMagneticClick = () => {
  console.log('Magnetic button clicked!');
};

const triggerConfetti = () => {
  if (confettiRef.value) {
    confettiRef.value.burst();
  }
};
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #1a1a1a;
  color: #e2e8f0;
  line-height: 1.6;
  margin: 0;
  padding: 0;
}

.playground {
  min-height: 100vh;
  position: relative;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

h1, h2 {
  border-bottom: 1px solid #4a5568;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2.5rem;
  text-align: center;
}

h2 {
  font-size: 1.75rem;
}

section {
  margin-bottom: 4rem;
}

/* Demo container styles */
.demo-container {
  margin-bottom: 3rem;
  padding: 2rem;
  background-color: rgba(45, 55, 72, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(74, 85, 104, 0.3);
}

.demo-container h3 {
  margin-bottom: 1rem;
  color: #e2e8f0;
  font-size: 1.25rem;
}

/* Gradient demo */
.gradient-demo {
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.gradient-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
}

.gradient-content h4 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

/* Starfield demo */
.starfield-demo {
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.starfield-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
}

.starfield-content h4 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

/* Parallax demo */
.parallax-demo {
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.parallax-bg, .parallax-mid, .parallax-fg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
}

.parallax-bg {
  background: linear-gradient(45deg, #667eea, #764ba2);
}

.parallax-mid {
  background: linear-gradient(45deg, #f093fb, #f5576c);
}

.parallax-fg {
  background: linear-gradient(45deg, #4facfe, #00f2fe);
}

/* ScrollSnap demo */
.scrollsnap-demo {
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
}

/* Typing demo */
.typing-demo {
  font-size: 1.5rem;
  color: #e2e8f0;
  min-height: 2rem;
  display: flex;
  align-items: center;
}

/* Neon demo */
.neon-demo {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  padding: 1rem;
}

/* Hover3D demo */
.hover3d-demo {
  width: 300px;
  height: 200px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.hover3d-content h4 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

/* Magnetic demo */
.magnetic-demo {
  font-size: 1.2rem;
  padding: 1rem 2rem;
}

/* Glitch demo */
.glitch-demo {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  color: white;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.glitch-content h4 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.glitch-content p {
  font-size: 1rem;
  opacity: 0.9;
}

/* Carousel demo */
.carousel-demo {
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
}

/* Comparison demo */
.comparison-demo {
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
}

/* Divider demo */
.divider-demo {
  margin: 2rem 0;
}

/* Progress demo */
.progress-demo {
  height: 4px;
  margin: 2rem 0;
}

/* Confetti demo */
.confetti-demo {
  height: 200px;
  border-radius: 8px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
}

.confetti-trigger {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.confetti-trigger:hover {
  background: #4338ca;
}

/* Original components */
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
