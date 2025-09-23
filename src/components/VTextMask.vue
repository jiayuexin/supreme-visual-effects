<template>
  <div class="text-mask-container" :style="containerStyle">
    <svg 
      :width="svgWidth" 
      :height="svgHeight" 
      class="text-mask-svg"
      :style="svgStyle"
    >
      <defs>
        <mask :id="maskId">
          <rect width="100%" height="100%" fill="black" />
          <path 
            :d="pathData" 
            :stroke="maskColor"
            :stroke-width="strokeWidth"
            :fill="fillColor"
            :stroke-dasharray="strokeDasharray"
            :stroke-dashoffset="strokeDashoffset"
            :style="pathStyle"
          />
        </mask>
      </defs>
      
      <rect 
        width="100%" 
        height="100%" 
        :fill="backgroundColor"
        :mask="`url(#${maskId})`"
      />
      
      <text 
        :x="textX" 
        :y="textY" 
        :font-size="fontSize"
        :font-family="fontFamily"
        :fill="textColor"
        :mask="`url(#${maskId})`"
        class="masked-text"
        style="dominant-baseline: central"
      >
        {{ text }}
      </text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

interface PathPoint {
  x: number;
  y: number;
}

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  path: {
    type: [String, Array],
    default: () => 'M 0,50 Q 50,0 100,50 T 200,50'
  },
  animation: {
    type: Boolean,
    default: true
  },
  duration: {
    type: Number,
    default: 2000
  },
  delay: {
    type: Number,
    default: 0
  },
  strokeWidth: {
    type: Number,
    default: 4
  },
  strokeColor: {
    type: String,
    default: '#ffffff'
  },
  fillColor: {
    type: String,
    default: 'transparent'
  },
  backgroundColor: {
    type: String,
    default: '#000000'
  },
  textColor: {
    type: String,
    default: '#ffffff'
  },
  fontSize: {
    type: String,
    default: '24px'
  },
  fontFamily: {
    type: String,
    default: 'Arial, sans-serif'
  },
  width: {
    type: Number,
    default: 400
  },
  height: {
    type: Number,
    default: 100
  }
});

const maskId = ref(`text-mask-${Math.random().toString(36).substr(2, 9)}`);
const animationId = ref<number | null>(null);
const progress = ref(0);

const svgWidth = computed(() => props.width);
const svgHeight = computed(() => props.height);

const pathData = computed(() => {
  if (typeof props.path === 'string') {
    return props.path;
  }
  
  // 将点数组转换为路径字符串
  if (Array.isArray(props.path) && props.path.length > 0) {
    let path = `M ${props.path[0].x},${props.path[0].y}`;
    
    for (let i = 1; i < props.path.length; i++) {
      path += ` L ${props.path[i].x},${props.path[i].y}`;
    }
    
    return path;
  }
  
  return 'M 0,50 L 100,50';
});

const strokeDasharray = computed(() => {
  if (!props.animation) return 'none';
  
  // 计算路径总长度（简化计算）
  const pathLength = props.width * 0.8; // 估算路径长度
  return `${pathLength} ${pathLength}`;
});

const strokeDashoffset = computed(() => {
  if (!props.animation) return 0;
  
  const pathLength = props.width * 0.8;
  return pathLength * (1 - progress.value);
});

const maskColor = computed(() => props.strokeColor);

const textX = computed(() => props.width / 2);
const textY = computed(() => props.height / 2 + 8); // 调整垂直居中

const containerStyle = computed(() => ({
  display: 'inline-block',
  width: `${props.width}px`,
  height: `${props.height}px`
}));

const svgStyle = computed(() => ({
  width: '100%',
  height: '100%'
}));

const pathStyle = computed(() => ({
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
}));

const animate = () => {
  if (!props.animation) return;
  
  const startTime = Date.now();
  const duration = props.duration;
  
  const updateProgress = () => {
    const elapsed = Date.now() - startTime;
    const currentProgress = Math.min(elapsed / duration, 1);
    
    // 使用缓动函数
    progress.value = easeInOutCubic(currentProgress);
    
    if (currentProgress < 1) {
      animationId.value = requestAnimationFrame(updateProgress);
    }
  };
  
  if (props.delay > 0) {
    setTimeout(() => {
      updateProgress();
    }, props.delay);
  } else {
    updateProgress();
  }
};

const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const startAnimation = () => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value);
  }
  
  progress.value = 0;
  animate();
};

const stopAnimation = () => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value);
    animationId.value = null;
  }
};

onMounted(() => {
  if (props.animation) {
    startAnimation();
  }
});

onUnmounted(() => {
  stopAnimation();
});

watch(() => [props.animation, props.duration, props.delay], () => {
  if (props.animation) {
    startAnimation();
  } else {
    stopAnimation();
    progress.value = 1;
  }
});

// 暴露方法给父组件
defineExpose({
  start: startAnimation,
  stop: stopAnimation,
  reset: () => {
    progress.value = 0;
    if (props.animation) {
      startAnimation();
    }
  }
});
</script>

<style scoped>
.text-mask-container {
  display: inline-block;
  position: relative;
}

.text-mask-svg {
  display: block;
}

.masked-text {
  text-anchor: middle;
  dominant-baseline: central;
}
</style>
