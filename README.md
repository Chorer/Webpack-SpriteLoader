# webpack-sprite-loader

> A webpack sprite loader that generates spritesheets based on your stylesheets.

## Usage

install the loader:

```bash
npm i webpack-sprite-loader -D
```

configure the webpack:
```js
const webpack-sprite-loader = require('webpack-sprite-loader')
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'webpack-sprite-loader'
        ]
      }
    ]
  }
}
```

write css like this:
```css
div.bgc1 {
  /* add '?__sprite' flag after each image url */
  background: url('./src/test1.png?__sprite')
}
div.bgc2 {
  background: url('./src/test2.png?__sprite')
}
```

What you get finally is:
```css
div.bgc1 {
  background: url('./sprite.png');
  background-position: 0 -895px;
}
div.bgc2 {
  background: url('./sprite.png');
  background-position: 0 0;
}
```