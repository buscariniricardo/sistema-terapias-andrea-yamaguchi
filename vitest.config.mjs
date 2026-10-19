import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js'],
    coverage: {
      provider: 'v8',
      include: ['js/app.js'],
      exclude: [
        'node_modules/**',
        'tests/**',
        'coverage/**'
      ],
      reporter: ['text', 'html', 'json']
    }
  }
});
