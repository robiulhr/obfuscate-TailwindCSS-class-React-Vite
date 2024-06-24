import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'
import postcssRename from 'postcss-rename'
import tailwindcss from 'tailwindcss'
import fs from 'fs'

const classMap = {}
const randomClass = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('')
}

const renameClass = (originalClass) => {
  if (!classMap[originalClass]) {
    classMap[originalClass] = randomClass(6)
  }
  return classMap[originalClass]
}

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
    }),
    {
      name: 'rename-classes',
      enforce: 'post',
      transform(code, id) {
        if (/\.(js|jsx|ts|tsx|html)$/.test(id) && !(/node_modules/).test(id)) {
          if (code.match(/className.{1,4}"((\w+(\s|-)\w+)+)"/g)?.length > 0) {
            return code.replace(/className.{1,4}"((\w+(\s|-)\w+)+)"/g, (match, p1) => {
              const renamedClasses = p1.split(' ').map(renameClass).join(' ')
              let result = `${match.slice(0, "className".length + 1)}"${renamedClasses}"`
              return result;
            })
          }
        }
      },
      writeBundle() {
        fs.writeFileSync('class-map.json', JSON.stringify(classMap, null, 2))
      }
    }
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(import('tailwindcss').Config),
        postcssRename({
          strategy: (input) => renameClass(input),
          outputMapCallback: function (map) {
            console.log(JSON.stringify(map))
          }
        })
      ]
    }
  }
})
