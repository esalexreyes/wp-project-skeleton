/**
 * Stylelint config file
 * as configured in package.json under stylelint.extends
 *
 * @docs Stylelint https://stylelint.io/user-guide/
 * @docs StylelintWebpackPlugin: https://webpack.js.org/plugins/stylelint-webpack-plugin/
 * @docs stylelint-scss : https://github.com/kristerkari/stylelint-scss
 * @since 1.0.0
 */

module.exports = {
  // ignoreFiles: [
  //   // "**/*.css",
  //   // "./wp-content/themes/**/**/**/*.css",
  //   // "./wp-content/plugins/**/**/**/*.css",
  //   // "./vendor/**/**/*.css",
  //   // "./node_modules/**/**/*.css",
  //   // "./tests/**/**/*.css"
  // ],
  extends: "stylelint-config-standard-scss",
  plugins: [
    "stylelint-scss",
    "stylelint-order"
  ],
  overrides: [
    {
      files: ["**/*.scss"],
    }
  ],
  rules: {
    "at-rule-no-unknown": null,
    "indentation": 2,
    "max-line-length": 180,
    "no-empty-source": null,
    "scss/at-rule-no-unknown": true,
    "declaration-colon-newline-after": "always-multi-line",
    "selector-max-type": 4,
    "selector-no-qualifying-type": null,
    "time-min-milliseconds": 50,
    "selector-max-id": 1,
    "declaration-no-important": null,
    "function-parentheses-newline-inside": "always-multi-line",
    "no-descending-specificity": null,
    "function-url-quotes": "always",
    "order/order": [
      [
        "custom-properties",
        "declarations"
      ],
    ],
    "order/properties-alphabetical-order": true,
  },
}
