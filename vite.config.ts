import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';
import handlebars from 'vite-plugin-handlebars';
import autoprefixer from 'autoprefixer';
import {resolve} from 'path';
import path from 'path';

const rootDir = resolve(__dirname);
const SOLID_BUILT_PATH = 'src/vendor/solid';
const SOLID_PATH = SOLID_BUILT_PATH;

const ADDITIONAL_ALIASES = {
  'solid-transition-group': resolve(rootDir, 'src/vendor/solid-transition-group'),
  '@components': resolve(rootDir, 'src/components'),
  '@helpers': resolve(rootDir, 'src/helpers'),
  '@hooks': resolve(rootDir, 'src/hooks'),
  '@stores': resolve(rootDir, 'src/stores'),
  '@lib': resolve(rootDir, 'src/lib'),
  '@appManagers': resolve(rootDir, 'src/lib/appManagers'),
  '@richTextProcessor': resolve(rootDir, 'src/lib/richTextProcessor'),
  '@environment': resolve(rootDir, 'src/environment'),
  '@customEmoji': resolve(rootDir, 'src/lib/customEmoji'),
  '@rlottie': resolve(rootDir, 'src/lib/rlottie'),
  '@config': resolve(rootDir, 'src/config'),
  '@vendor': resolve(rootDir, 'src/vendor'),
  '@layer': resolve(rootDir, 'src/layer'),
  '@types': resolve(rootDir, 'src/types'),
  '@': resolve(rootDir, 'src')
};

export default defineConfig({
  define: {
    'import.meta.env.VITE_API_ID': JSON.stringify('36330354'),
    'import.meta.env.VITE_API_HASH': JSON.stringify('ac28853ff521b55afe03a1c6c86fc414'),
    'process.env': {}
  },
  plugins: [
    solidPlugin(),
    handlebars({
      context: {
        title: 'Messenger',
        description: 'Personal web client',
      }
    })
  ],
  base: '/tweb/',
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      output: {
        format: 'es'
      }
    }
  },
  worker: {
    format: 'es'
  },
  resolve: {
    alias: {
      'rxcore': resolve(rootDir, SOLID_PATH, 'web/core'),
      'solid-js/jsx-runtime': resolve(rootDir, SOLID_PATH, 'jsx'),
      'solid-js/web': resolve(rootDir, SOLID_PATH, 'web'),
      'solid-js/store': resolve(rootDir, SOLID_PATH, 'store'),
      'solid-js': resolve(rootDir, SOLID_PATH),
      ...ADDITIONAL_ALIASES
    }
  },
  css: {
    postcss: {
      plugins: [autoprefixer()]
    }
  }
});
