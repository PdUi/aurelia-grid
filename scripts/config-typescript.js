System.config({
  transpiler: 'typescript',
  typescriptOptions: {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  },
  map: {
    typescript: 'node_modules/typescript/lib/typescript.js'
  },
  packages: {
    "src": {
      defaultJSExtensions: true,
      defaultExtension: "ts"
    }
  }
});