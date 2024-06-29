import { Freehand, Text, type Shape, type ShapeProps } from "@dgmjs/core";
import type { ShapeStyle } from "./types";

/**
 * Return array which eliminates duplications
 * e.g.) unique([1, 2, 2, 3, 4, 4]) --> [1, 2, 3, 4]
 */
export function unique(A: Array<any>): Array<any> {
  return Array.from(new Set(A).values());
}

/**
 * Return the homogenous value if array items are all same,
 * otherwise return initial.
 */
export function merge<T>(
  values: T[],
  stringifiedCompare: boolean = false,
  initial: T | undefined = undefined
): T | undefined {
  const vs = unique(
    stringifiedCompare ? values.map((v) => JSON.stringify(v)) : values
  );
  return vs.length !== 1
    ? initial
    : stringifiedCompare
    ? JSON.parse(vs[0])
    : vs[0];
}

export function styleToProps(shapes: Shape[], style: ShapeStyle): ShapeProps {
  let props = {};
  const isFreehand = shapes.every((s) => s instanceof Freehand);
  const isText = shapes.every((s) => s instanceof Text);
  switch (style.color) {
    case "foreground":
      props = {
        ...props,
        fontColor: "$foreground",
        strokeColor: "$foreground",
        fillColor: "$background",
      };
      break;
    case "red":
      props = {
        ...props,
        fontColor: "$red9",
        strokeColor: "$red9",
        fillColor: isText ? "$background" : "$red4",
      };
      break;
    case "green":
      props = {
        ...props,
        fontColor: "$green9",
        strokeColor: "$green9",
        fillColor: isText ? "$background" : "$green4",
      };
      break;
    case "blue":
      props = {
        ...props,
        fontColor: "$blue9",
        strokeColor: "$blue9",
        fillColor: isText ? "$background" : "$blue4",
      };
      break;
    case "gray":
      props = {
        ...props,
        fontColor: "$gray9",
        strokeColor: "$gray9",
        fillColor: isText ? "$background" : "$gray4",
      };
      break;
    case "yellow":
      props = {
        ...props,
        fontColor: "$yellow9",
        strokeColor: "$yellow9",
        fillColor: isText ? "$background" : "$yellow4",
      };
      break;
    case "purple":
      props = {
        ...props,
        fontColor: "$purple9",
        strokeColor: "$purple9",
        fillColor: isText ? "$background" : "$purple4",
      };
      break;
    case "cyan":
      props = {
        ...props,
        fontColor: "$cyan9",
        strokeColor: "$cyan9",
        fillColor: isText ? "$background" : "$cyan4",
      };
      break;
  }
  switch (style.size) {
    case "S":
      props = { ...props, fontSize: 14, strokeWidth: isFreehand ? 2 : 1 };
      break;
    case "M":
      props = { ...props, fontSize: 16, strokeWidth: isFreehand ? 4 : 2 };
      break;
    case "L":
      props = { ...props, fontSize: 20, strokeWidth: isFreehand ? 6 : 3 };
      break;
    case "XL":
      props = { ...props, fontSize: 28, strokeWidth: isFreehand ? 8 : 4 };
      break;
  }
  if (style.fill) {
    props = { ...props, fillStyle: style.fill };
  }
  return props;
}

export function propsToStyle(shapes: Shape[]): ShapeStyle {
  let style: ShapeStyle = {};
  const strokeColor = merge(shapes.map((s) => s.strokeColor));
  const fontSize = merge(shapes.map((s) => s.fontSize));
  const fillStyle = merge(shapes.map((s) => s.fillStyle));
  switch (strokeColor) {
    case "$foreground":
      style = { ...style, color: "foreground" };
      break;
    case "$red9":
      style = { ...style, color: "red" };
      break;
    case "$green9":
      style = { ...style, color: "green" };
      break;
    case "$blue9":
      style = { ...style, color: "blue" };
      break;
    case "$gray9":
      style = { ...style, color: "gray" };
      break;
    case "$yellow9":
      style = { ...style, color: "yellow" };
      break;
    case "$purple9":
      style = { ...style, color: "purple" };
      break;
    case "$cyan9":
      style = { ...style, color: "cyan" };
      break;
  }
  switch (fontSize) {
    case 14:
      style = { ...style, size: "S" };
      break;
    case 16:
      style = { ...style, size: "M" };
      break;
    case 20:
      style = { ...style, size: "L" };
      break;
    case 28:
      style = { ...style, size: "XL" };
      break;
  }
  if (fillStyle) {
    style = { ...style, fill: fillStyle as any };
  }
  return style;
}
