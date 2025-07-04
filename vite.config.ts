import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': resolve(__dirname, './src/app'),
      '@pages': resolve(__dirname, './src/pages'),
      '@widgets': resolve(__dirname, './src/widgets'),
      '@features': resolve(__dirname, './src/features'),
      '@entities': resolve(__dirname, './src/entities'),
      '@shared': resolve(__dirname, './src/shared'),
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.tsx'),
      name: 'EmailBuilder',
      formats: ['umd'],
      fileName: (format) => `email-builder.${format}.js`,
    },
    minify: 'terser',
    cssCodeSplit: true,
    cssMinify: true,

    // Option to externalize deps.
    // rollupOptions: {
    //   external: ['react', 'react-dom'],
    //   output: {
    //     globals: {
    //       react: 'React',
    //       'react-dom': 'ReactDOM',
    //     },
    //   },
    // }
  },
});
