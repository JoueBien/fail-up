import { Failure, Result } from "./index";

type DataSet = { data: string };

describe("Failure", () => {
  it("A failure is returned when there is one failure", () => {
    function doThing(): Result<string, "testError"> {
      return new Failure({
        message: "this is bad",
        type: "testError",
      });
    }

    const res = doThing();

    if (res instanceof Failure) {
      expect(res.type).toBe("testError");
      return undefined;
    }

    const data: string = res;

    expect(data).toBe(true);
  });

  it("A failure is returned when there are two failures", () => {
    function doThing(): Result<string, "testError" | "testError2"> {
      return new Failure({
        message: "this is bad",
        type: "testError",
      });
    }

    const res = doThing();
    if (res instanceof Failure && res.type === "testError2") {
      expect(res.type).toBe("testError");
      return undefined;
    }

    if (res instanceof Failure && res.type === "testError") {
      expect(res.type).toBe("testError");
      return undefined;
    }

    const data: string = res;

    expect(data).toBe(true);
  });

  it("A sucess is returned when string", () => {
    function doThing(): Result<string, "testError" | "testError2"> {
      return "this is a string";
    }

    const res = doThing();
    if (res instanceof Failure && res.type === "testError2") {
      expect(res.type).toBeFalsy();
      return undefined;
    }

    if (res instanceof Failure && res.type === "testError") {
      expect(res.type).toBeFalsy();
      return undefined;
    }

    const data: string = res;

    expect(data).toBe("this is a string");
  });

  it("A sucess is returned when object", () => {
    function doThing(): Result<DataSet, "testError" | "testError2"> {
      return { data: "this is a string" };
    }

    const res = doThing();
    if (res instanceof Failure && res.type === "testError2") {
      expect(res.type).toBeFalsy();
      return undefined;
    }

    if (res instanceof Failure && res.type === "testError") {
      expect(res.type).toBeFalsy();
      return undefined;
    }

    const data: string = res.data;

    expect(data).toBe("this is a string");
  });

  it("using from converts an Error to a failure", () => {
    const error = new Error("The error message");
    const failure = Failure.from({ error, type: "custom-type" });

    expect(failure instanceof Failure).toBeTruthy();
    expect(failure.type).toBe("custom-type");
    expect(failure.message).toBe("The error message");
    expect(failure.stack).toEqual(failure.stack);
    expect(failure.name).toEqual(failure.name);
  });
});
