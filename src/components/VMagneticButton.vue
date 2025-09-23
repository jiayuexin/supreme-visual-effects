<template>
  <div 
    ref="container"
    class="magnetic-button-container"
    :style="containerStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousemove="handleMouseMove"
  >
    <button 
      ref="button"
      class="magnetic-button"
      :class="buttonClasses"
      :style="buttonStyle"
      @click="handleClick"
      :disabled="disabled"
    >
      <span class="button-content">
        <slot></slot>
      </span>
      
      <div 
        v-if="showRipple" 
        class="ripple-effect"
        :style="rippleStyle"
      ></div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  magneticStrength: {
    type: Number,
    default: 0.3
  },
  magneticRange: {
    type: Number,
    default: 100
  },
  animationDuration: {
    type: Number,
    default: 300
  },
  disabled: {
    type: Boolean,
    default: false
  },
  ripple: {
    type: Boolean,
    default: true
  },
  rippleColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0.3)'
  },
  scale: {
    type: Number,
    default: 1.1
  },
  backgroundColor: {
    type: String,
    default: '#4f46e5'
  },
  textColor: {
    type: String,
    default: '#ffffff'
  },
  borderRadius: {
    type: String,
    default: '8px'
  },
  padding: {
    type: String,
    default: '12px 24px'
  },
  fontSize: {
    type: String,
    default: '16px'
  },
  fontWeight: {
    type: String,
    default: '500'
  }
});

const emit = defineEmits<{
  'click': [event: MouseEvent];
  'mouse-enter': [];
  'mouse-leave': [];
  'mouse-move': [event: MouseEvent];
}>();

const container = ref<HTMLElement | null>(null);
const button = ref<HTMLButtonElement | null>(null);
const isHovered = ref(false);
const mouseX = ref(0);
const mouseY = ref(0);
const centerX = ref(0);
const centerY = ref(0);
const translateX = ref(0);
const translateY = ref(0);
const scale = ref(1);
const showRipple = ref(false);
const rippleX = ref(0);
const rippleY = ref(0);

const buttonClasses = computed(() => ({
  'magnetic-active': isHovered.value,
  'magnetic-disabled': props.disabled
}));

const containerStyle = computed(() => ({
  display: 'inline-block',
  position: 'relative'
}));

const buttonStyle = computed(() => ({
  transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`,
  transition: `transform ${props.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  backgroundColor: props.backgroundColor,
  color: props.textColor,
  border: 'none',
  borderRadius: props.borderRadius,
  padding: props.padding,
  fontSize: props.fontSize,
  fontWeight: props.fontWeight,
  cursor: props.disabled ? 'not-allowed' : 'pointer',
  opacity: props.disabled ? 0.6 : 1,
  position: 'relative',
  overflow: 'hidden',
  outline: 'none',
  boxShadow: isHovered.value 
    ? `0 8px 25px ${props.backgroundColor}40` 
    : `0 4px 15px ${props.backgroundColor}20`
}));

const rippleStyle = computed(() => ({
  position: 'absolute',
  left: `${rippleX.value}px`,
  top: `${rippleY.value}px`,
  width: '0',
  height: '0',
  borderRadius: '50%',
  backgroundColor: props.rippleColor,
  transform: 'translate(-50%, -50%)',
  animation: 'ripple 0.6s ease-out',
  pointerEvents: 'none'
}));

const calculateMagneticForce = () => {
  if (!isHovered.value || props.disabled) return;
  
  const deltaX = mouseX.value - centerX.value;
  const deltaY = mouseY.value - centerY.value;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
  if (distance < props.magneticRange) {
    const force = (props.magneticRange - distance) / props.magneticRange;
    const strength = force * props.magneticStrength;
    
    translateX.value = deltaX * strength;
    translateY.value = deltaY * strength;
    scale.value = 1 + (force * (props.scale - 1));
  } else {
    translateX.value = 0;
    translateY.value = 0;
    scale.value = 1;
  }
};

const updateCenter = () => {
  if (!container.value) return;
  
  const rect = container.value.getBoundingClientRect();
  centerX.value = rect.width / 2;
  centerY.value = rect.height / 2;
};

const handleMouseEnter = () => {
  isHovered.value = true;
  emit('mouse-enter');
};

const handleMouseLeave = () => {
  isHovered.value = false;
  translateX.value = 0;
  translateY.value = 0;
  scale.value = 1;
  emit('mouse-leave');
};

const handleMouseMove = (event: MouseEvent) => {
  if (!container.value || props.disabled) return;
  
  const rect = container.value.getBoundingClientRect();
  mouseX.value = event.clientX - rect.left;
  mouseY.value = event.clientY - rect.top;
  
  calculateMagneticForce();
  emit('mouse-move', event);
};

const handleClick = (event: MouseEvent) => {
  if (props.disabled) return;
  
  // 创建涟漪效果
  if (props.ripple && container.value) {
    const rect = container.value.getBoundingClientRect();
    rippleX.value = event.clientX - rect.left;
    rippleY.value = event.clientY - rect.top;
    showRipple.value = true;
    
    setTimeout(() => {
      showRipple.value = false;
    }, 600);
  }
  
  emit('click', event);
};

onMounted(() => {
  updateCenter();
  window.addEventListener('resize', updateCenter);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateCenter);
});
</script>

<style scoped>
.magnetic-button-container {
  display: inline-block;
  position: relative;
}

.magnetic-button {
  display: inline-block;
  position: relative;
  overflow: hidden;
  user-select: none;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.magnetic-button:hover:not(.magnetic-disabled) {
  transform: translateY(-2px);
}

.magnetic-button:active:not(.magnetic-disabled) {
  transform: translateY(0) scale(0.98);
}

.magnetic-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.button-content {
  position: relative;
  z-index: 1;
  display: inline-block;
}

.ripple-effect {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 0;
}

@keyframes ripple {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    width: 200px;
    height: 200px;
    opacity: 0;
  }
}
</style>
