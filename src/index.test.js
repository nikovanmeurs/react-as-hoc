import React from "react";
import renderer from "react-test-renderer";

import { asHoc, defaultMergeProps } from "./index";

const GreetingProvider = ({ children, name }) => {
  const greeting = name ? `Hello ${name}!` : "Hello!";
  return children({ greeting });
};

const GreetingPresenter = ({ greeting }) => greeting;

describe("defaultMergeProps", () => {
  it("should merge the passed objects", () => {
    const left = { foo: "bar" };
    const right = { bar: "baz" };

    const result = defaultMergeProps(left, right);

    expect(result).toMatchObject({
      foo: "bar",
      bar: "baz",
    });
  });

  it("should assign the right value in case of a key name collision", () => {
    const left = { foo: "bar" };
    const right = { foo: "baz" };

    const result = defaultMergeProps(left, right);

    expect(result).toMatchObject({
      foo: "baz",
    });
  });
});

describe("asHoc", () => {
  test("should wrap a Component with render props and return a function", () => {
    const hoc = asHoc(GreetingProvider);
    expect(typeof hoc).toBe("function");
  });

  describe("the resulting HOC", () => {
    describe("when executed without additional props", () => {
      it("should merge the props provided by the provider component with the props passed to the wrapped component", () => {
        const hoc = asHoc(GreetingProvider);
        const Component = jest.fn(() => null);

        const WrappedComponent = hoc()(Component);
        renderer.create(<WrappedComponent name="World" />);

        expect(Component).toHaveBeenCalledWith(
          {
            greeting: "Hello!",
            name: "World",
          },
          {}
        );
      });

      it("props provided by the provider component should override props passed to the wrapped component in case of a naming collision", () => {
        const hoc = asHoc(GreetingProvider);
        const Component = jest.fn(() => null);

        const WrappedComponent = hoc()(Component);

        renderer.create(<WrappedComponent greeting="Hi!" />);

        expect(Component).toHaveBeenCalledWith(
          {
            greeting: "Hello!",
          },
          {}
        );
      });
    });

    describe("when passed additional props", () => {
      it("should pass the props on to the wrapped provider component", () => {
        const Provider = jest.fn(() => null);
        const hoc = asHoc(Provider);

        const Component = jest.fn(() => null);
        const WrappedComponent = hoc({ name: "World" })(Component);

        const tree = renderer.create(<WrappedComponent />).toTree();
        expect(tree.rendered.props.name).toBe("World");
      });
    });

    describe("when defaultMapProps is overriden", () => {
      it("should merge props according to the passed strategy", () => {
        const dropProvidedProps = (a, b) => a;
        const hoc = asHoc(GreetingProvider);

        const Component = jest.fn(() => null);
        const WrappedComponent = hoc(undefined, dropProvidedProps)(Component);

        renderer.create(<WrappedComponent foo="Bar" />);

        expect(Component).toHaveBeenCalledWith(
          {
            foo: "Bar",
          },
          {}
        );
      });
    });
  });
});
