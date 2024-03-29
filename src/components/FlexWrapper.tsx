import styled from "styled-components";

type FlexWrapper = {
  direction?: "column" | "row";
  justify?: "space-between" | "space-around" | "end" | "center";
  align?: "center" | "start" | "end";
  wrap?: "wrap" | "nowrap";
  gap?: string;
  height?: string;
  margin?: string;
  position?: "relative" | "absolute";
  inset?: string;
  transform?: string;
  z?: number;
};

export const FlexWrapper = styled.div.withConfig({
  shouldForwardProp: (props) =>
    ![
      "direction",
      "justify",
      "align",
      "wrap",
      "gap",
      "height",
      "margin",
      "position",
      "inset",
      "transform",
      "z",
    ].includes(props),
})<FlexWrapper>`
  display: flex;
  margin: ${(props) => props.margin || ""};
  min-height: ${(props) => props.height || "100%"};
  gap: ${(props) => props.gap || ""};
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.align || "stretch"};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  position: ${(props) => props.position};
  inset: ${(props) => props.inset || ""};
  transform: ${(props) => props.transform};
  z-index: ${(props) => props.z?.toString()};
`;

export default FlexWrapper;
