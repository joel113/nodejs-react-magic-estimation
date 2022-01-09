# Magic Estimation

## Getting Started

`npm install`

## Preact

The project uses [PreactJs](https://preactjs.com/) which is an altnerative to React with the same API: https://github.com/preactjs/preact.

Pract allows to be used with [JSX](https://facebook.github.io/jsx/) or [HTM](https://github.com/developit/htm).

## React

https://reactjs.org/docs/components-and-props.html

## Typescript

The project uses [Typescript](https://www.typescriptlang.org/) which is a strongly typed programming language that builds on Java Script: https://github.com/microsoft/TypeScript.

## React, Preact and Typescript Essential Elements 

### Functional Components

https://reactjs.org/docs/components-and-props.html

https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components

https://preactjs.com/guide/v10/components

### Conditional Rendering

https://reactjs.org/docs/conditional-rendering.html

### State Hooks

https://reactjs.org/docs/hooks-state.html

### Type Aliases

https://stackoverflow.com/questions/31364693/what-is-the-type-reserved-word-in-typescript

https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases

### Arrays

https://stackoverflow.com/questions/25469244/how-can-i-define-an-interface-for-an-array-of-objects

### Context

For passing the login information into the tree, the project uses [context](https://preactjs.com/guide/v10/context).

## IDE

https://code.visualstudio.com/docs/nodejs/nodejs-tutorial

### Visual Studio Code Chrome Debugging

https://code.visualstudio.com/docs/editor/debugging

https://github.com/microsoft/vscode-chrome-debug

Visual Studio Debugging Launch Configuration

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch Chrome",
            "request": "launch",
            "type": "pwa-chrome",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceFolder}/frontend",
            "sourceMapPathOverrides": {
                "webpack:///frontend/*": "${webRoot}/*",
                "webpack://./frontend/*": "${webRoot}/*",
              }
        },
        {
            "name": "Launch via NPM",
            "request": "launch",
            "runtimeArgs": [
                "start"
            ],
            "runtimeExecutable": "npm",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "type": "pwa-node"
        },

    ]
}
```

## Inspired by

https://github.com/TNG/next-generation-scrum-poker

## Icons

https://www.flaticon.com/de/uicons

## License

Licensed under Apache License Version 2.0