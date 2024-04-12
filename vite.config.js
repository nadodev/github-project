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
      plugins: [
        terser(), 
      ],
    },
    terserOptions: {
      compress: {
        drop_console: true,
      },
      parse: {
        ecma: 8,
        html5_comments: false,
      },
    }
  },

});
