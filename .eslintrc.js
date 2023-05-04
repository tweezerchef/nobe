module.exports = {
  extends: ['airbnb', 'airbnb-typescript'],
   parserOptions: {
       project: './tsconfig.json'
     },
     ignorePatterns: ["*.js", "*.jsx"],
     rules: {
      'no-console': ['error', { allow: ['error'] }],
    },
};
