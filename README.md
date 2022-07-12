# Magic Estimation

## Getting Started

Magic Estimation uses the [NPM package manager](https://www.npmjs.com/) and
provides a [package.json](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)
file which contains npm goals.

You can run following commands to build and run the Magic Estimation
application using the NPM package manager. The follwoing NPM package manager
goals are available.

`npm install` - Installs the dependencies

`npm run start` - Runs the frontend

`npm run serve` - Runs the backend

`npm run build:frontend` - Builds the frontend

`npm run build:frontend:vite` - Prerenders the HTML of the frontned

`npm run build:frontend:typecheck` - Builds the typescript code of the frontend

`npm run build:backend` - Builds the backend

`npm run lint` - Runs eslint

`npm run lin:fix` - Fixes fixable findings of eslint

## Visual Studio Code IDE

The directory `.vscode` contains the file for the 
[Visual Studio Code IDE](https://code.visualstudio.com/) integration of Magic
Estimation.

## Container

I am using containerd with lima on mac os and nerdctl. Hence, in order to start
containers I have to start lima.

`limactl start default`

Furthermore, I have to use nerdctl to run the compose script.

`nerdctl compose up -d`

### Websocket

The frontend uses web sockets to connect to the backend. You can use wscat to
manually connect to the backend.

`wscat -c localhost:8080`

The current version of magic estimation does not apply any kind of authentication
or authorization.

### Node

The backend is served using NodeJs. You can use the `node` command to run the
backend indepentend of the available NPM and Visual Studio Code debugging
goals.

`node`

The frontend to backend communication uses json serialization to encode and
decode messages to sync the state of a session between the backend and the
the frontend. The following snippet shows an example of adding an elment with
the name "bla".

```JSON
{ "type": "addElement", "payload": { "element": "bla" } }
```

### Postgre

Postgre is used to store the state and serve it to the backend which serves the
state to the clients.

In order to login into the docker container which runs Postgre and to debug the
content of the Postgre database, following commands can be used:

```
nodectl exec -it postgres bash

psql -U postgre
```

`\l` - shows the list of the databases

`\c testdb` - connects to the testdb

`\dt` - shows the list of the database tables

## Preact

The project uses [PreactJs](https://preactjs.com/) which is an altnerative to 
React with the same API: https://github.com/preactjs/preact.

Pract allows to be used with [JSX](https://facebook.github.io/jsx/) or 
[HTM](https://github.com/developit/htm).

## React

The projcect does not use [React](https://reactjs.org/) but Preact. As Preact
is build to be compatible with React, React does have a major influence on the
project. Often, I did check React documentation.

https://reactjs.org/docs/components-and-props.html

## React Native

The project does not use [React Native](https://reactnative.dev/).

https://github.com/facebook/react-native

## Typescript

The project uses [Typescript](https://www.typescriptlang.org/) which is a 
strongly typed programming language that builds on Java Script.
 
https://github.com/microsoft/TypeScript.

## Node.JS

The project uses Node.JS at the backend part.

https://nodejs.org/en/

## React, Preact with Typescript

React as well as Preact can be used with Typescript:

https://reactjs.de/artikel/react-typescript/

## React, Preact and Typescript Essential Elements 

The following subsections list some essential elements of react, preact and
typescript I came across when I did work on this project.

### Functional Components

React uses function or class components to split the UI into reusable parts.
The UI is composed of components which are either function or class 
components. The following links give an introduction into functional 
components in React and Preact.

https://reactjs.org/docs/components-and-props.html

https://preactjs.com/guide/v10/components

https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components

### React Conditional Rendering

Conditional rendering in React renders only if precondition are met.

https://reactjs.org/docs/conditional-rendering.html

### React State Hooks

State hooks in React allows to hook into state in order to get and manipulate
the state.

https://reactjs.org/docs/hooks-state.html

### React Effect Hooks

Tells react to do something after rendering has been done. React will apply
the passed function after rendering.

https://reactjs.org/docs/hooks-effect.html

### React Context

For passing the login information into the tree, the project uses [context](https://preactjs.com/guide/v10/context).

### React Controlled and Uncontrolled Components

React differs between uncontrolled and controlled components. Uncontrolled 
components are components where the state is managed by React whereas
controlled components have their own state.

https://reactjs.org/docs/forms.html#controlled-components

https://reactjs.org/docs/uncontrolled-components.html

### Typescript Classes

Typescript uses classes as reusable entity. The following link give an 
introduction into Typescript classes.

https://www.typescriptlang.org/docs/handbook/2/classes.html

### Typescript Type Aliases

Typescript type aliases lets you define types and give the types a name 
especially in the case when the type is a composition or a union of other types.

https://stackoverflow.com/questions/31364693/what-is-the-type-reserved-word-in-typescript

https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases

### Typescript Arrays

Quite new to Typescript, I did wonder how to do arrays during my vantures 
through the world of Typescript.

https://stackoverflow.com/questions/25469244/how-can-i-define-an-interface-for-an-array-of-objects

### Javascript Exception Type Checking

Quite new to Javascript, I did some investigation into error handling and how
to do it right.

https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/try...catch

https://stackoverflow.com/questions/64452484/how-can-i-safely-access-caught-error-properties-in-typescript

### Web Socket

As I did never use Web Sockets before, I did some investigation into web 
sockets and the integration of Web Sockets in to React.

https://websockets.spec.whatwg.org/

https://stackoverflow.com/questions/8393092/javascript-websockets-control-initial-connection-when-does-onopen-get-bound

https://stackoverflow.com/questions/58432076/websockets-with-functional-components

https://stackoverflow.com/questions/18803971/websocket-onerror-how-to-read-error-description

https://stackoverflow.com/questions/43564517/websocket-connection-keeps-prematurely-closing-the-connection

https://github.com/netzwerg/typescript-websocket-example/blob/master/typescript-websocket-client/src/App.tsx

### Node.JS Node Postgres

As the project uses Postgre, node postgre is used to access Postgre from the
backend which uses node.

https://github.com/brianc/node-postgres

https://node-postgres.com/api/result

### Node.JS ECMAScript Modules

As the project uses node, I came across ECMAScript modules.

https://nodejs.org/api/esm.html

### Node.JS Web Sockets

The project uses the following WebSocket node project.

https://github.com/websockets/ws

## ESLint

The project uses ESLint.

https://eslint.org/

https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

https://code.visualstudio.com/docs/languages/typescript

`npx eslint .`

## Prettier ESLint

The Visual Studio Code extension VS Code Prettier ESLint uses eslint to format
Typescript as well as Javascript.

https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint

## Cascading Stylesheets

Cascading Stylesheets are still important after all the years I came across them
and started using them.

### CSS display to vertically center some text

The css display table element turns a rendering box into an element which behaves like a `<table>` html element.

The css display table-cell element turns a rendering box into an element which behaves like a `<td>` html element.

https://developer.mozilla.org/de/docs/Web/CSS/display

### CSS flexbox to vertically center some text

https://stackoverflow.com/questions/2939914/how-do-i-vertically-align-text-in-a-div/13515693#13515693

### CSS floating

https://stackoverflow.com/questions/5803023/how-to-place-two-divs-next-to-each-other#:~:text=Use%20float%3Aleft%20on%20both,height%20instead%20of%20expanding%20it.

## AWS Lambda

The project from which this project is forked did use AWS Lambda as backend.

https://docs.aws.amazon.com/de_de/lambda/latest/dg/welcome.html

https://docs.aws.amazon.com/de_de/lambda/latest/dg/nodejs-handler.html

https://aws.amazon.com/de/blogs/compute/announcing-websocket-apis-in-amazon-api-gateway/

### Typescript

The following guide shows how to use Typescript for AWS Lambda.

https://levelup.gitconnected.com/how-to-use-typescript-for-aws-lambda-in-3-steps-1996243547eb

## Localstack

The project Localstack provides some local environment for AWS services.
Localstack is not used as AWS Lambda is not used in this project.

https://hub.docker.com/r/localstack/localstack

https://docs.localstack.cloud/get-started/#docker

https://github.com/localstack/localstack

```
nerdctl run --rm -it -p 4566:4566 -p 4571:4571 localstack/localstack
```

## IDE

I am using Visual Studio Code to develop this project.

https://code.visualstudio.com/docs/nodejs/nodejs-tutorial

### Visual Studio Code Chrome Debugging

I am using Chrome to run and debug the web application.

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

Visual Studio Code has a well documented Typescript integration.

https://code.visualstudio.com/docs/nodejs/nodejs-debugging

https://code.visualstudio.com/docs/typescript/typescript-tutorial

https://code.visualstudio.com/docs/languages/typescript

https://code.visualstudio.com/docs/getstarted/settings

## Postgres Container

The docker compose script provided with this project uses postgre.

https://stackoverflow.com/questions/59715622/docker-compose-and-create-db-in-postgres-on-init

## Inspired by

This project is inspired and actually forked from the TNG next generation scrum
poker.

https://github.com/TNG/next-generation-scrum-poker

## Icons

The icons are from flaticon.

https://www.flaticon.com/de/uicons

## License

Licensed under Apache License Version 2.0