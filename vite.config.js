// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import fs from 'fs'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from "vite-plugin-html";
import postcssRename from "postcss-rename";
import tailwindcss from "tailwindcss";
// export default async ({mode}) => {

export default defineConfig({

  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
    }),
  ],

  css: {
    postcss: {
      plugins: [
        tailwindcss((import('tailwindcss').Config)),
        postcssRename(
          {
            strategy: () => {
              return random(6);
            },
            outputMapCallback: async function (map) {
              fs.writeFile("./classesMap.json", JSON.stringify(map), function (err) {
                if (err) {
                  return console.log(err);
                }
                console.log("The file was saved!");
              });
              console.log(JSON.stringify(map), "hello world");
            }
          }
        )
      ]
    },
    loaderOptions: {
      css: {
        modules: true, // Enable CSS Modules
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 9000
  }
});
// };

function random(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}





