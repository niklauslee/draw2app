export type ShapeColor =
  | "foreground"
  | "red"
  | "green"
  | "blue"
  | "gray"
  | "yellow"
  | "purple"
  | "cyan";

export type ShapeSize = "S" | "M" | "L" | "XL";

export type ShapeStyle = {
  color?: ShapeColor;
  size?: ShapeSize;
  fill?: "none" | "solid" | "hachure" | "cross-hatch";
};
