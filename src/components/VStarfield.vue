<template>
  <canvas ref="canvas" class="starfield"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

interface Star {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  brightness: number;
  twinkle: number;
}

const props = defineProps({
  starCount: {
    type: Number,
    default: 200
  },
  speed: {
    type: Number,
    default: 0.5
  },
  starColor: {
    type: String,
    default: '#ffffff'
  },
  backgroundColor: {
    type: String,
    default: 'transparent'
  },
  mouseInteraction: {
    type: Boolean,
    default: true
  },
  twinkleSpeed: {
    type: Number,
    default: 2
  },
  depth: {
    type: Number,
    default: 1000
  }
});

const canvas = ref<HTMLCanvasElement | null>(null);
let animationId: number | null = null;
let stars: Star[] = [];
let mouseX = 0;
let mouseY = 0;
let centerX = 0;
let centerY = 0;

const initStars = () => {
  stars = [];
  for (let i = 0; i < props.starCount; i++) {
    stars.push({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * props.depth,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      vz: -Math.random() * props.speed,
      size: Math.random() * 2 + 0.5,
      brightness: Math.random(),
      twinkle: Math.random() * Math.PI * 2
    });
  }
};

const updateStars = () => {
  stars.forEach(star => {
    star.x += star.vx;
    star.y += star.vy;
    star.z += star.vz;
    
    // Mouse interaction
    if (props.mouseInteraction) {
      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - distance / 200);
      
      star.vx += dx * influence * 0.0001;
      star.vy += dy * influence * 0.0001;
    }
    
    // Reset star if it goes too far
    if (star.z <= 0) {
      star.x = (Math.random() - 0.5) * 2000;
      star.y = (Math.random() - 0.5) * 2000;
      star.z = props.depth;
    }
    
    // Twinkle effect
    star.twinkle += props.twinkleSpeed * 0.01;
    star.brightness = 0.5 + 0.5 * Math.sin(star.twinkle);
  });
};

const drawStars = () => {
  if (!canvas.value) return;
  
  const ctx = canvas.value.getContext('2d');
  if (!ctx) return;
  
  // Clear canvas
  ctx.fillStyle = props.backgroundColor;
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);
  
  // Sort stars by z for proper depth rendering
  const sortedStars = [...stars].sort((a, b) => b.z - a.z);
  
  sortedStars.forEach(star => {
    const x = (star.x / star.z) * 1000 + centerX;
    const y = (star.y / star.z) * 1000 + centerY;
    const size = (star.size / star.z) * 100;
    
    if (x >= 0 && x <= canvas.value!.width && y >= 0 && y <= canvas.value!.height) {
      const alpha = (1 - star.z / props.depth) * star.brightness;
      const color = props.starColor;
      
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add glow effect for larger stars
      if (size > 1) {
        ctx.shadowColor = color;
        ctx.shadowBlur = size * 2;
        ctx.beginPath();
        ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  });
  
  ctx.globalAlpha = 1;
};

const animate = () => {
  updateStars();
  drawStars();
  animationId = requestAnimationFrame(animate);
};

const resize = () => {
  if (!canvas.value) return;
  
  const parent = canvas.value.parentElement;
  if (!parent) return;
  
  canvas.value.width = parent.clientWidth;
  canvas.value.height = parent.clientHeight;
  centerX = canvas.value.width / 2;
  centerY = canvas.value.height / 2;
};

const handleMouseMove = (e: MouseEvent) => {
  if (!canvas.value) return;
  
  const rect = canvas.value.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
};

onMounted(() => {
  if (!canvas.value) return;
  
  initStars();
  resize();
  animate();
  
  window.addEventListener('resize', resize);
  
  if (props.mouseInteraction) {
    canvas.value.addEventListener('mousemove', handleMouseMove);
  }
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  
  window.removeEventListener('resize', resize);
  
  if (canvas.value && props.mouseInteraction) {
    canvas.value.removeEventListener('mousemove', handleMouseMove);
  }
});

watch(() => [props.starCount, props.speed, props.twinkleSpeed], () => {
  initStars();
});
</script>

<style scoped>
.starfield {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
</style>
