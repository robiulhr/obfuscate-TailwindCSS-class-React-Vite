// vite.config.js
import { defineConfig } from "file:///D:/project/obfuscate-TailwindCSS-class-React-Vite/node_modules/vite/dist/node/index.js";
import react from "file:///D:/project/obfuscate-TailwindCSS-class-React-Vite/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { createHtmlPlugin } from "file:///D:/project/obfuscate-TailwindCSS-class-React-Vite/node_modules/vite-plugin-html/dist/index.mjs";
import postcssRename from "file:///D:/project/obfuscate-TailwindCSS-class-React-Vite/node_modules/postcss-rename/build/index.js";
import tailwindcss from "file:///D:/project/obfuscate-TailwindCSS-class-React-Vite/node_modules/tailwindcss/lib/index.js";
import fs from "fs";
var classMap = {};
var randomClass = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join("");
};
var renameClass = (originalClass) => {
  if (!classMap[originalClass]) {
    classMap[originalClass] = randomClass(6);
  }
  return classMap[originalClass];
};
var vite_config_default = defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true
    }),
    {
      name: "rename-classes",
      enforce: "post",
      transform(code, id) {
        if (id.startsWith("index") && id.endsWith(".js")) {
          return code.replace(/className(.{1,4}\w+(\s|-)\w+)+"/g, (matchedClasses, p1) => {
            const renamedClasses = p1.split(" ").map(renameClass).join(" ");
            return `className:"${renamedClasses}"`;
          });
        }
      },
      writeBundle() {
        fs.writeFileSync("class-map.json", JSON.stringify(classMap, null, 2));
      }
    }
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(import("file:///D:/project/obfuscate-TailwindCSS-class-React-Vite/node_modules/tailwindcss/lib/index.js").Config),
        postcssRename({
          strategy: (input) => renameClass(input),
          outputMapCallback: function(map) {
            console.log(JSON.stringify(map));
          }
        })
      ]
    }
  },
  server: {
    host: "0.0.0.0",
    port: 9e3
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXG9iZnVzY2F0ZS1UYWlsd2luZENTUy1jbGFzcy1SZWFjdC1WaXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXG9iZnVzY2F0ZS1UYWlsd2luZENTUy1jbGFzcy1SZWFjdC1WaXRlXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9qZWN0L29iZnVzY2F0ZS1UYWlsd2luZENTUy1jbGFzcy1SZWFjdC1WaXRlL3ZpdGUuY29uZmlnLmpzXCI7Ly8gaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbi8vIGltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcblxuLy8gLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbi8vIGV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4vLyAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcbi8vIH0pXG5cbi8vIGltcG9ydCBmcyBmcm9tICdmcydcblxuLy8gaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbi8vIGltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbi8vIGltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tIFwidml0ZS1wbHVnaW4taHRtbFwiO1xuLy8gaW1wb3J0IHBvc3Rjc3NSZW5hbWUgZnJvbSBcInBvc3Rjc3MtcmVuYW1lXCI7XG4vLyBpbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSBcInRhaWx3aW5kY3NzXCI7XG4vLyAvLyBleHBvcnQgZGVmYXVsdCBhc3luYyAoe21vZGV9KSA9PiB7XG5cbi8vIGV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cbi8vICAgcGx1Z2luczogW1xuLy8gICAgIHJlYWN0KCksXG4vLyAgICAgY3JlYXRlSHRtbFBsdWdpbih7XG4vLyAgICAgICBtaW5pZnk6IHRydWUsXG4vLyAgICAgfSksXG4vLyAgIF0sXG5cbi8vICAgY3NzOiB7XG4vLyAgICAgcG9zdGNzczoge1xuLy8gICAgICAgcGx1Z2luczogW1xuLy8gICAgICAgICB0YWlsd2luZGNzcygoaW1wb3J0KCd0YWlsd2luZGNzcycpLkNvbmZpZykpLFxuLy8gICAgICAgICBwb3N0Y3NzUmVuYW1lKFxuLy8gICAgICAgICAgIHtcbi8vICAgICAgICAgICAgIHN0cmF0ZWd5OiAoKSA9PiB7XG4vLyAgICAgICAgICAgICAgIHJldHVybiByYW5kb20oNik7XG4vLyAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgb3V0cHV0TWFwQ2FsbGJhY2s6IGFzeW5jIGZ1bmN0aW9uIChtYXApIHtcbi8vICAgICAgICAgICAgICAgZnMud3JpdGVGaWxlKFwiLi9jbGFzc2VzTWFwLmpzb25cIiwgSlNPTi5zdHJpbmdpZnkobWFwKSwgZnVuY3Rpb24gKGVycikge1xuLy8gICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbi8vICAgICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhlcnIpO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBmaWxlIHdhcyBzYXZlZCFcIik7XG4vLyAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShtYXApLCBcImhlbGxvIHdvcmxkXCIpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgKVxuLy8gICAgICAgXVxuLy8gICAgIH0sXG4vLyAgICAgbG9hZGVyT3B0aW9uczoge1xuLy8gICAgICAgY3NzOiB7XG4vLyAgICAgICAgIG1vZHVsZXM6IHRydWUsIC8vIEVuYWJsZSBDU1MgTW9kdWxlc1xuLy8gICAgICAgfVxuLy8gICAgIH1cbi8vICAgfSxcbi8vICAgc2VydmVyOiB7XG4vLyAgICAgaG9zdDogJzAuMC4wLjAnLFxuLy8gICAgIHBvcnQ6IDkwMDBcbi8vICAgfVxuLy8gfSk7XG4vLyAvLyB9O1xuXG4vLyBmdW5jdGlvbiByYW5kb20obGVuZ3RoKSB7XG4vLyAgIHZhciByZXN1bHQgPSAnJztcbi8vICAgdmFyIGNoYXJhY3RlcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xuLy8gICB2YXIgY2hhcmFjdGVyc0xlbmd0aCA9IGNoYXJhY3RlcnMubGVuZ3RoO1xuLy8gICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4vLyAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpKTtcbi8vICAgfVxuLy8gICByZXR1cm4gcmVzdWx0O1xuLy8gfVxuXG5cblxuXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4taHRtbCdcbmltcG9ydCBwb3N0Y3NzUmVuYW1lIGZyb20gJ3Bvc3Rjc3MtcmVuYW1lJ1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ3RhaWx3aW5kY3NzJ1xuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuXG5jb25zdCBjbGFzc01hcCA9IHt9XG5jb25zdCByYW5kb21DbGFzcyA9IChsZW5ndGgpID0+IHtcbiAgY29uc3QgY2hhcmFjdGVycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSdcbiAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGggfSwgKCkgPT4gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVycy5sZW5ndGgpKSkuam9pbignJylcbn1cblxuY29uc3QgcmVuYW1lQ2xhc3MgPSAob3JpZ2luYWxDbGFzcykgPT4ge1xuICBpZiAoIWNsYXNzTWFwW29yaWdpbmFsQ2xhc3NdKSB7XG4gICAgY2xhc3NNYXBbb3JpZ2luYWxDbGFzc10gPSByYW5kb21DbGFzcyg2KVxuICB9XG4gIHJldHVybiBjbGFzc01hcFtvcmlnaW5hbENsYXNzXVxufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBjcmVhdGVIdG1sUGx1Z2luKHtcbiAgICAgIG1pbmlmeTogdHJ1ZSxcbiAgICB9KSxcbiAgICB7XG4gICAgICBuYW1lOiAncmVuYW1lLWNsYXNzZXMnLFxuICAgICAgZW5mb3JjZTogJ3Bvc3QnLFxuICAgICAgdHJhbnNmb3JtKGNvZGUsIGlkKSB7XG4gICAgICAgIGlmIChpZC5zdGFydHNXaXRoKCdpbmRleCcpICYmIGlkLmVuZHNXaXRoKFwiLmpzXCIpKSB7XG4gICAgICAgICAgcmV0dXJuIGNvZGUucmVwbGFjZSgvY2xhc3NOYW1lKC57MSw0fVxcdysoXFxzfC0pXFx3KykrXCIvZywgKG1hdGNoZWRDbGFzc2VzLCBwMSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVuYW1lZENsYXNzZXMgPSBwMS5zcGxpdCgnICcpLm1hcChyZW5hbWVDbGFzcykuam9pbignICcpXG4gICAgICAgICAgICByZXR1cm4gYGNsYXNzTmFtZTpcIiR7cmVuYW1lZENsYXNzZXN9XCJgXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHdyaXRlQnVuZGxlKCkge1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKCdjbGFzcy1tYXAuanNvbicsIEpTT04uc3RyaW5naWZ5KGNsYXNzTWFwLCBudWxsLCAyKSlcbiAgICAgIH1cbiAgICB9XG4gIF0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3M6IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgdGFpbHdpbmRjc3MoaW1wb3J0KCd0YWlsd2luZGNzcycpLkNvbmZpZyksXG4gICAgICAgIHBvc3Rjc3NSZW5hbWUoe1xuICAgICAgICAgIHN0cmF0ZWd5OiAoaW5wdXQpID0+IHJlbmFtZUNsYXNzKGlucHV0KSxcbiAgICAgICAgICBvdXRwdXRNYXBDYWxsYmFjazogZnVuY3Rpb24gKG1hcCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobWFwKSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICBdXG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgcG9ydDogOTAwMFxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQTJFQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsU0FBUyx3QkFBd0I7QUFDakMsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxRQUFRO0FBRWYsSUFBTSxXQUFXLENBQUM7QUFDbEIsSUFBTSxjQUFjLENBQUMsV0FBVztBQUM5QixRQUFNLGFBQWE7QUFDbkIsU0FBTyxNQUFNLEtBQUssRUFBRSxPQUFPLEdBQUcsTUFBTSxXQUFXLE9BQU8sS0FBSyxNQUFNLEtBQUssT0FBTyxJQUFJLFdBQVcsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUU7QUFDL0c7QUFFQSxJQUFNLGNBQWMsQ0FBQyxrQkFBa0I7QUFDckMsTUFBSSxDQUFDLFNBQVMsYUFBYSxHQUFHO0FBQzVCLGFBQVMsYUFBYSxJQUFJLFlBQVksQ0FBQztBQUFBLEVBQ3pDO0FBQ0EsU0FBTyxTQUFTLGFBQWE7QUFDL0I7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixpQkFBaUI7QUFBQSxNQUNmLFFBQVE7QUFBQSxJQUNWLENBQUM7QUFBQSxJQUNEO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxVQUFVLE1BQU0sSUFBSTtBQUNsQixZQUFJLEdBQUcsV0FBVyxPQUFPLEtBQUssR0FBRyxTQUFTLEtBQUssR0FBRztBQUNoRCxpQkFBTyxLQUFLLFFBQVEsb0NBQW9DLENBQUMsZ0JBQWdCLE9BQU87QUFDOUUsa0JBQU0saUJBQWlCLEdBQUcsTUFBTSxHQUFHLEVBQUUsSUFBSSxXQUFXLEVBQUUsS0FBSyxHQUFHO0FBQzlELG1CQUFPLGNBQWMsY0FBYztBQUFBLFVBQ3JDLENBQUM7QUFBQSxRQUNIO0FBQUEsTUFDRjtBQUFBLE1BQ0EsY0FBYztBQUNaLFdBQUcsY0FBYyxrQkFBa0IsS0FBSyxVQUFVLFVBQVUsTUFBTSxDQUFDLENBQUM7QUFBQSxNQUN0RTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUEsUUFDUCxZQUFZLE9BQU8saUdBQWEsRUFBRSxNQUFNO0FBQUEsUUFDeEMsY0FBYztBQUFBLFVBQ1osVUFBVSxDQUFDLFVBQVUsWUFBWSxLQUFLO0FBQUEsVUFDdEMsbUJBQW1CLFNBQVUsS0FBSztBQUNoQyxvQkFBUSxJQUFJLEtBQUssVUFBVSxHQUFHLENBQUM7QUFBQSxVQUNqQztBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=