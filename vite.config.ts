import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
server: {
  port: 3000
},
  plugins: [
    Vue(),
    Components({
      dts: 'src/components.d.ts',
      deep: true,
      extensions: ["vue"],
      dirs: [
        "src/components",
        "src/modules/*/components",
      ],
      directoryAsNamespace: true,
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
