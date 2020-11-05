module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
        [
            '@babel/plugin-transform-modules-commonjs',
            {
                allowTopLevelThis: true,
            },
        ],
      [
          "component",
          {
              "libraryName": "element-ui",
              "styleLibraryName": "theme-chalk"
          }
      ]
    ],
}
