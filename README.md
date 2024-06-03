# Usage
1. To develop your own user script with Solidjs, you first need to clone the project.
```
gh repo clone Ferhatduran55/solidjs-userscript
```
2. Then download the requirements:
using `bun`
```
bun install
```
3. After the download is completed, you can adjust the userscript object in `package.json` as you wish by using the [setup guide](https://github.com/va4ok/userscript-builder?tab=readme-ov-file#setup). You can adjust the user script's metadata using the child meta object, where some adjustments come by default and you don't need to type them.
```json package.json
{
  "userscript": {
    "entry": "./dist/index.js",
    "dev": "./dist",
    "release": "./release",
    "fileName": "index",
    "meta": {
      "name": "new userscript",
      "namespace": "http://tampermonkey.net/",
      "version": "0.0.0",
      "description": "new userscript",
      "author": "You",
      "match": [
        "*://*.*"
      ],
      "grant": "GM_addStyle"
    }
  }
}
```

Note: `userscript.meta.grant = "GM_addStyle"` or `[... ,"GM_addStyle"]` Depending on the `grant` value in the `package.json`, `tailwindcss` styles are injected into the page using the [greasemonkey API](https://www.tampermonkey.net/documentation.php#api:GM_addStyle), so do not remove this part. If you are going to remove it, update the `injectCode` section in the `vite.config.js` file according to your own code.
Style injection code:
```javascript
export default defineConfig({
  ...
  plugins: [
    ...
    cssInjectedByJsPlugin({
      injectCode: (cssCode, options) => {
        return `try{if(typeof document != 'undefined'){GM.addStyle(${cssCode});}}catch(e){console.error('vite-plugin-css-injected-by-js', e);}`;
      },
    }),
    ...
  ],
  ...
});
```
4. After setting, we build the user script using the commands defined in `package.json` can use [command guide](https://github.com/va4ok/userscript-builder?tab=readme-ov-file#setup)
```json
{
  ...
  "scripts": {
    "build": "vite build && userscript-builder --mode dev",
    "release:bugfix": "vite build && userscript-builder --mode bugfix",
    "release:minor": "vite build && userscript-builder --mode minor",
    "release:major": "vite build && userscript-builder --mode major"
  },
  ...
}
```

5.After it is build, user script will be created in the `dist` folder by default.
```
bun run build
```
![image](https://github.com/Ferhatduran55/solidjs-userscript/assets/42141771/42c2c871-a7ce-471e-b86f-055d5cfe16ac)

If it is release, user script will be created in the `release` folder by default.
```
bun run release:bugfix
```
![image](https://github.com/Ferhatduran55/solidjs-userscript/assets/42141771/ad20fb5e-1bc1-4246-985b-f215e4ab34f5)

These names are userscript.entry, userscript.dev, userscript.release and userscript.fileName values comes from in `package.json`.

`userscript.entry`: First of all, the Solidjs project is built with vite and this file is saved in the dist folder, this value is the name of the saved file and the user script is created using this file.

`userscript.dev`: The location where the user script will be saved when it is built.

`userscript.release`: The location where the user script will be saved when release.

`userscript.fileName`: The new filename that the user script will receive when it is saved to its defined location, for example `[name].user.js`.

There is a Countdown timer in the repository, you can use it to test.
You can find the files by following the “index.jsx” code under src.
you are free
