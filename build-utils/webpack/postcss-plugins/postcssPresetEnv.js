// https://www.npmjs.com/package/postcss-preset-env
const postcssPresetEnv = [
  'postcss-preset-env',
  {
    /* use stage 3 features + css nesting rules */
    stage: 3,
    features: {
      'nesting-rules': true
    },
    autoprefixer: { grid: true }
  }
];

export default postcssPresetEnv;
