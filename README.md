## Fail Up

A Go like error system for TypeScript.

## Install

```
npm i fail-up
```

## Usage

Specify a good return type followed by the error type.

```ts
import { type Result, Failure } from "fail-up";

function doThing(): Result<string, "testError"> {
  return new Failure({
    message: "this is bad",
    type: "testError",
  });
}

const res = doThing();

// Handle error
if (res instanceof Failure) {
  return;
}

// Handle happy path.
const data: string = res;
```

You can specify multiple error types.

```ts
import { type Result, Failure } from "fail-up";

function doThing(): Result<string, "testError" | "testError2"> {
  return new Failure({
    message: "this is bad",
    type: "testError",
  });
}

const res = doThing();
if (res instanceof Failure && res.type === "testError2") {
  // Handle first error type
  return;
}

if (res instanceof Failure && res.type === "testError") {
  // Handle second error type
  return undefined;
}

// Handle happy path.
const data: string = res;
```
