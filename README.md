# Magic Estimation

## Getting Started

`npm install`

## Preact

The project uses [PreactJs](https://preactjs.com/) which is an altnerative to React with the same API: https://github.com/preactjs/preact.

Pract allows to be used with [JSX](https://facebook.github.io/jsx/) or [HTM](https://github.com/developit/htm).

### Context

For passing the login information into the tree, the project uses [context](https://preactjs.com/guide/v10/context).

### React

https://reactjs.org/docs/components-and-props.html

## Typescript

The project uses [Typescript](https://www.typescriptlang.org/) which is a strongly typed programming language that builds on Java Script: https://github.com/microsoft/TypeScript.

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