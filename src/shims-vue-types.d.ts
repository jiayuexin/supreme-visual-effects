// Vue 3 Composition API and additional types
declare module 'vue' {
  import { App, Component, ComponentPublicInstance, VNode } from '@vue/runtime-dom'

  // Composition API
  export function ref<T>(value: T): { value: T }
  export function reactive<T extends object>(target: T): T
  export function computed<T>(getter: () => T): { readonly value: T }
  export function watch<T>(source: T, callback: Function, options?: any): () => void
  export function onMounted(hook: () => any): void
  export function onUnmounted(hook: () => any): void
  export function onUpdated(hook: () => any): void
  export function onBeforeMount(hook: () => any): void
  export function onBeforeUpdate(hook: () => any): void
  export function onBeforeUnmount(hook: () => any): void
  export function nextTick(callback?: () => void): Promise<void>

  // Component API
  export function defineProps<T>(): T
  export function defineEmits<T>(): T
  export function defineExpose<T>(exposed?: T): void
  export function withDefaults<T>(props: T, defaults: any): T

  // App API
  export function createApp(rootComponent: Component, rootProps?: any): App

  // Additional types
  export interface Directive {
    created?: Function
    beforeMount?: Function
    mounted?: Function
    beforeUpdate?: Function
    updated?: Function
    beforeUnmount?: Function
    unmounted?: Function
  }

  export interface Plugin {
    install: (app: App, ...options: any[]) => any
  }

  // Types
  export type {
    App,
    Component,
    ComponentPublicInstance,
    VNode,
    Ref,
    ComputedRef,
    WritableComputedRef,
  } from '@vue/runtime-dom'
}

// Make sure we can import .vue files
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
