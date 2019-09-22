module.exports = {
  plugins: [
    require('postcss-preset-env'),
    require('postcss-nested'),
    require('postcss-color-function'),
    require('postcss-custom-media')({
      importFrom: 'css/partials/base.css'
    }),
    require('css-mqpacker')
  ],
  autoprefixer: {
    grid: true
  }
};
