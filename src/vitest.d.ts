// Vitest type declarations
/// <reference types="vitest/globals" />

declare module 'vitest' {
  export const vi: (typeof import('vitest'))['vi']
  export const describe: (typeof import('vitest'))['describe']
  export const it: (typeof import('vitest'))['it']
  export const test: (typeof import('vitest'))['test']
  export const expect: (typeof import('vitest'))['expect']
  export const beforeEach: (typeof import('vitest'))['beforeEach']
  export const afterEach: (typeof import('vitest'))['afterEach']
  export const beforeAll: (typeof import('vitest'))['beforeAll']
  export const afterAll: (typeof import('vitest'))['afterAll']
  export const suite: (typeof import('vitest'))['suite']
  export const skip: (typeof import('vitest'))['skip']
  export const todo: (typeof import('vitest'))['todo']
  export const only: (typeof import('vitest'))['only']
  export const concurrent: (typeof import('vitest'))['concurrent']
  export const sequential: (typeof import('vitest'))['sequential']
}
