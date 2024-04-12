// vite.config.js
import { defineConfig } from 'vite';
import sass from 'vite-plugin-sass-dts';
import  { terser } from 'rollup-plugin-terser';


export default defineConfig({

  plugins: [
    sass(),


  ],
  build: {
    minify: 'terser',
    rollupOptions: {
      input: {
        main: 'main.js',
        scss: 'scss/base.scss',
      },
      output: {
        // Define o nome do arquivo de saída
        entryFileNames: '[name].min.js',
        assetFileNames: 'style.min.css'
      },
      plugins: [
        terser(), 
      ],
    },
    terserOptions: {
      parse: {
        ecma: 8,
      },
    }
  },

});
