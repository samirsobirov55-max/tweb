import {defineConfig} from 'vitest/config';
import solidPlugin from 'vite-plugin-solid';
import handlebars from 'vite-plugin-handlebars';
import basicSsl from '@vitejs/plugin-basic-ssl';
import {visualizer} from 'rollup-plugin-visualizer';
import checker from 'vite-plugin-checker';
import autoprefixer from 'autoprefixer';
import {resolve} from 'path';
import {existsSync, copyFileSync} from 'fs';
import {ServerOptions} from 'vite';
import {watchLangFile} from './watch-lang.js';
import path from 'path';

const rootDir = resolve(__dirname);
const certsDir = path.join(rootDir, 'certs');
const ENV_LOCAL_FILE_PATH = path.join(rootDir, '.env.local');

const isDEV = process.env.NODE_ENV === 'development';
if(isDEV) {
  if(!existsSync(ENV_LOCAL_FILE_PATH)) {
    copyFileSync(path.join(rootDir, '.env.local.example'), ENV_LOCAL_FILE_PATH);
  }
  watchLangFile();
}

const handlebarsPlugin = handlebars({
  context: {
    title: 'My Private Messenger',
    description: 'Personal web client project',
    url: 'https://samirsobirov55-max.github.io/tweb/',
    origin: 'https://samirsobirov55-max.github.io/'
  }
});

const USE_SSL = false;
const host = USE_SSL ? 'web.telegram.org' : 'localhost';
const serverOptions: ServerOptions = {
  host,
  port: USE_SSL ? 443 : 8080,
  sourcemapIgnoreList(sourcePath) {
    return sourcePath.includes('node_modules') ||
      sourcePath.includes('logger') ||
      sourcePath.includes('eventListenerBase');
  }
};

const SOLID_SRC_PATH = 'src/solid/packages/solid';
const SOLID_BUILT_PATH = 'src/vendor/solid';
const USE_SOLID_SRC = false;
const SOLID_PATH = USE_SOLID_SRC ? SOLID_SRC_PATH : SOLID_BUILT_PATH;

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
    'import.meta.env.VITE_MTPROTO_AUTO': JSON.stringify('1'),
    'import.meta.env.VITE_MTPROTO_HAS_WS': JSON.stringify('1'),
    'import.meta.env.VITE_MTPROTO_HAS_HTTP': JSON.stringify('1')
  },
  plugins: [
    solidPlugin(),
    handlebarsPlugin as any,
    visualizer({
      gzipSize: true,
      template: 'treemap'
    })
  ].filter(Boolean),
  server: serverOptions,
  base: '/tweb/',
  build: {
    target: 'es2020',
    sourcemap: true,
    assetsDir: '',
    copyPublicDir: false,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        sourcemapIgnoreList: serverOptions.sourcemapIgnoreList
      }
    }
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
  }
});
