import { defineConfig } from 'vite';

export default defineConfig({
    base: '/My-portfolio/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
    },
});
