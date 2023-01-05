import React, {
  FunctionComponent,
  Children,
  isValidElement,
  CSSProperties,
} from "react";
import { Gutter } from "../gutter";
import styled from "styled-components";
import { flattenFragment } from "../../utils";

export interface StackProps {
  gutter?: string;
  align?: "left" | "right" | "center";

  className?: string;
  style?: CSSProperties;
}

export const Styles = {
  Container: styled.div<StackProps>`
    display: flex;
    flex-direction: column;
    align-items: ${({ align }) => {
      switch (align) {
        case "left": {
          return "flex-start";
        }
        case "right": {
          return "flex-end";
        }
        case "center": {
          return "center";
        }
        default:
          return undefined;
      }
    }};
  `,
};

export const Stack: FunctionComponent<StackProps> = ({
  children,
  gutter,
  ...otherProps
}) => {
  const array = Children.toArray(flattenFragment(children));

  return (
    <Styles.Container {...otherProps}>
      {array.map((child, i) => {
        if (isValidElement(child) && child.type === Gutter) {
          return child;
        }

        if (!gutter || i === array.length - 1) {
          return child;
        }

        if (i + 1 < array.length) {
          const next = array[i + 1];
          if (isValidElement(next) && next.type === Gutter) {
            return child;
          }
        }

        return (
          <React.Fragment key={i}>
            {child}
            <Gutter size={gutter} direction="vertical" />
          </React.Fragment>
        );
      })}
    </Styles.Container>
  );
};
