export default {
  '**/*.{ts,tsx,js,jsx,vue}': ['eslint --fix', 'prettier --write'],
  '**/*.{md,json}': ['prettier --write'],
}
