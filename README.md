# React as HOC

Transform React components accepting a render prop into a higher-order components.

## Installation

```
npm install react-as-hoc
```

## Usage

Take the following pattern in which a computed value is passed from a Provider component to its render prop:

```
const GreetingProvider = ({ children, name }) => {
  const greeting = name ? `Hello ${name}!` : "Hello!";
  return children({ greeting });
};

const GreetingPresenter = ({ greeting }) => <h1>{greeting}</h1>;

const GreetTheWorld = () => (
  <GreetingProvider name="World">{({ greeting }) => (
    <GreetingPresenter greeting={greeting}>
  )}
);
```

Using react-as-hoc, this can alternatively be written as:

```
import asHoc from 'react-as-hoc';

const GreetingProvider = ({ children, name }) => {
  const greeting = name ? `Hello ${name}!` : "Hello!";
  return children({ greeting });
};

const GreetingPresenter = ({ greeting }) => <h1>{greeting}</h1>;

const withGreeting = asHoc(GreetingProvider);
const GreetTheWorld = withGreeting({ name: "World" })(GreetingPresenter);
```
