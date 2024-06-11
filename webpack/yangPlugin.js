const fs = require('fs');

class MyPlugin {
  // Webpack  MyPlugin  apply  compiler 
  apply(compiler) {
    // 
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      // compilation: 
      // console.log('yang-', compilation);
    })
  }
  // do something...
}

module.exports = MyPlugin