import React from "react";

export const defaultMergeProps = (a, b) => Object.assign({}, a, b);

export const asHoc = ComponentWithRenderProps => (
  hocProps = {},
  mergeProps = defaultMergeProps
) => ComponentToWrap => props => (
  <ComponentWithRenderProps {...hocProps}>
    {renderProps => {
      const { children, ...rest } = props;
      const mergedProps = mergeProps(rest, renderProps);

      return <ComponentToWrap {...mergedProps}>{children}</ComponentToWrap>;
    }}
  </ComponentWithRenderProps>
);

export default asHoc;
