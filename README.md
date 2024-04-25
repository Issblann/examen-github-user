# Git hub user
Manejo de los errores. Al ser una API publica tiene respuestas limitadas.
Steps

1. npm init
2. npm run dev

Photos project

![image](https://github.com/Issblann/examen-github-user/assets/109175830/2bcbe896-4f1d-414f-b45d-2cf5e4a4361a)

![image](https://github.com/Issblann/examen-github-user/assets/109175830/723888fd-db93-42b4-905d-78c1fd349596)


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
