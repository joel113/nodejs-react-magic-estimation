# Magic Estimation

## Getting Started

`npm install`

`npm run build:frontend`

## Getting Started Backend

`npm start serve`

### Docker

`limactl start default`

`nerdctl compose up -d`

### Websocket

`wscat -c localhost:8080`

### Node

`node`

```JSON
{ "type": "addElement", "payload": { "element": "bla" } }
```

### Postgre

```
nodectl exec -it postgres bash

psql -U postgre

\dt
```

## Preact

The project uses [PreactJs](https://preactjs.com/) which is an altnerative to React with the same API: https://github.com/preactjs/preact.

Pract allows to be used with [JSX](https://facebook.github.io/jsx/) or [HTM](https://github.com/developit/htm).

## React

https://reactjs.org/docs/components-and-props.html

## Typescript

The project uses [Typescript](https://www.typescriptlang.org/) which is a strongly typed programming language that builds on Java Script: https://github.com/microsoft/TypeScript.

## React Native

https://reactnative.dev/

## React, Preact with Typescript

https://reactjs.de/artikel/react-typescript/

## React, Preact and Typescript Essential Elements 

### Functional Components

https://reactjs.org/docs/components-and-props.html

https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components

https://preactjs.com/guide/v10/components

### Classes

https://www.typescriptlang.org/docs/handbook/2/classes.html

### Conditional Rendering

https://reactjs.org/docs/conditional-rendering.html

### State Hooks

https://reactjs.org/docs/hooks-state.html

### Effect Hooks

https://reactjs.org/docs/hooks-effect.html

### Type Aliases

https://stackoverflow.com/questions/31364693/what-is-the-type-reserved-word-in-typescript

https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases

### Arrays

https://stackoverflow.com/questions/25469244/how-can-i-define-an-interface-for-an-array-of-objects

### Context

For passing the login information into the tree, the project uses [context](https://preactjs.com/guide/v10/context).

### Controlled and Uncontrolled Components

https://reactjs.org/docs/forms.html#controlled-components

https://reactjs.org/docs/uncontrolled-components.html

### Exception Type Checking

https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/try...catch

https://stackoverflow.com/questions/64452484/how-can-i-safely-access-caught-error-properties-in-typescript

### Web Socket

https://websockets.spec.whatwg.org/

https://stackoverflow.com/questions/8393092/javascript-websockets-control-initial-connection-when-does-onopen-get-bound

https://stackoverflow.com/questions/58432076/websockets-with-functional-components

https://stackoverflow.com/questions/18803971/websocket-onerror-how-to-read-error-description

https://stackoverflow.com/questions/43564517/websocket-connection-keeps-prematurely-closing-the-connection

https://github.com/netzwerg/typescript-websocket-example/blob/master/typescript-websocket-client/src/App.tsx

### Node Postgres

https://github.com/brianc/node-postgres

https://node-postgres.com/api/result

## Node.JS

https://nodejs.org/en/

### Node.JS Web Sockets

https://github.com/websockets/ws

## Cascading Stylesheets

### CSS display to vertically center some text

The css display table element turns a rendering box into an element which behaves like a `<table>` html element.

The css display table-cell element turns a rendering box into an element which behaves like a `<td>` html element.

https://developer.mozilla.org/de/docs/Web/CSS/display

### CSS flexbox to vertically center some text

https://stackoverflow.com/questions/2939914/how-do-i-vertically-align-text-in-a-div/13515693#13515693

### CSS floating

https://stackoverflow.com/questions/5803023/how-to-place-two-divs-next-to-each-other#:~:text=Use%20float%3Aleft%20on%20both,height%20instead%20of%20expanding%20it.

## AWS Lambda

https://docs.aws.amazon.com/de_de/lambda/latest/dg/welcome.html

https://docs.aws.amazon.com/de_de/lambda/latest/dg/nodejs-handler.html

https://aws.amazon.com/de/blogs/compute/announcing-websocket-apis-in-amazon-api-gateway/

### Typescript

https://levelup.gitconnected.com/how-to-use-typescript-for-aws-lambda-in-3-steps-1996243547eb

## Localstack

https://hub.docker.com/r/localstack/localstack

https://docs.localstack.cloud/get-started/#docker

https://github.com/localstack/localstack

```
nerdctl run --rm -it -p 4566:4566 -p 4571:4571 localstack/localstack
```

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

### Visual Studio Code Typescript Debugging

https://code.visualstudio.com/docs/nodejs/nodejs-debugging

https://code.visualstudio.com/docs/typescript/typescript-tutorial

https://code.visualstudio.com/docs/languages/typescript

https://code.visualstudio.com/docs/getstarted/settings

## Postgres Container

https://stackoverflow.com/questions/59715622/docker-compose-and-create-db-in-postgres-on-init

## Inspired by

https://github.com/TNG/next-generation-scrum-poker

## Icons

https://www.flaticon.com/de/uicons

## License

Licensed under Apache License Version 2.0