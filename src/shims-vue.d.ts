declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue' {
  import type { DefineComponent } from 'vue'
  const createApp: any
  const defineProps: any
  const defineEmits: any
  const defineExpose: any
  const withDefaults: any
  const ref: any
  const onMounted: any
  const onUnmounted: any
  const watch: any
  const computed: any
  const reactive: any
  const nextTick: any
  const useTemplateRef: any
  export {
    createApp,
    defineProps,
    defineEmits,
    defineExpose,
    withDefaults,
    ref,
    onMounted,
    onUnmounted,
    watch,
    computed,
    reactive,
    nextTick,
    useTemplateRef,
    DefineComponent,
  }
}
