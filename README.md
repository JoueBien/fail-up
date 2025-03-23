A Go like error system for TypeScript.

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

// Handel error
if (res instanceof Failure) {
  return;
}

// Handel happy path.
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
  // Handel first error type
  return;
}

if (res instanceof Failure && res.type === "testError") {
  // Handel second error type
  return undefined;
}

// Handel happy path.
const data: string = res;
```
