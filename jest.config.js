export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.spec.ts"],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
};
