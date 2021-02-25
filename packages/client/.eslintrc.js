module.exports = {
  extends: '../../.eslintrc.js',
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  rules: {
    'react/prop-types': 'off',
    "@typescript-eslint/ban-ts-comment": "off"
  },
};
