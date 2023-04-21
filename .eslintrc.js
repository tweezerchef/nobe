module.exports = {
  extends: ['airbnb', + 'airbnb-typescript', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
   parserOptions: {
       project: './tsconfig.json'
     }
};
