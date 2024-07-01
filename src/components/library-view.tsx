/*
 * Copyright (c) 2022 MKLabs. All rights reserved.
 *
 * NOTICE:  All information contained herein is, and remains the
 * property of MKLabs. The intellectual and technical concepts
 * contained herein are proprietary to MKLabs and may be covered
 * by Republic of Korea and Foreign Patents, patents in process,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from MKLabs (niklaus.lee@gmail.com).
 */

import { Shape, Doc } from "@dgmjs/core";
import { DGMShapeView } from "@dgmjs/react";
import { cn } from "@/lib/utils";

export type ShapeClickEvent = (shape: Shape) => void;

export type ShapeEnterEvent = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  shape: Shape
) => void;

export type ShapeLeaveEvent = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  shape: Shape
) => void;

export type ShapeDragDropEvent = (
  event: React.DragEvent<HTMLDivElement>,
  shape: Shape
) => void;

interface PrototypeShapeProps extends React.HTMLAttributes<HTMLDivElement> {
  darkMode: boolean;
  draggable?: boolean;
  shape: Shape;
  width?: number;
  height?: number;
  onShapeClick?: ShapeClickEvent;
  onShapeEnter?: ShapeEnterEvent;
  onShapeLeave?: ShapeLeaveEvent;
  onShapeDragStart?: ShapeDragDropEvent;
  onShapeDragEnd?: ShapeDragDropEvent;
}

function PrototypeShape({
  darkMode = false,
  draggable = false,
  shape,
  width = 32,
  height = 32,
  onShapeClick,
  onShapeEnter,
  onShapeLeave,
  onShapeDragStart,
  onShapeDragEnd,
  ...others
}: PrototypeShapeProps) {
  const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (onShapeEnter) onShapeEnter(e, shape);
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (onShapeLeave) onShapeLeave(e, shape);
  };

  const handleDragStart: React.DragEventHandler<HTMLDivElement> = (e) => {
    if (onShapeDragStart) onShapeDragStart(e, shape);
  };

  const handleDragEnd: React.DragEventHandler<HTMLDivElement> = (e) => {
    if (onShapeDragEnd) onShapeDragEnd(e, shape);
  };

  return (
    <div
      className="bg-background p-1 text-center hover:bg-muted rounded-sm"
      onClick={() => {
        if (onShapeClick) onShapeClick(shape);
      }}
      {...others}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: width,
          height: height,
        }}
        title={shape.name}
      >
        {shape && (
          <DGMShapeView
            className="w-full"
            shapes={[shape]}
            scaleAdjust={0.925}
            darkMode={darkMode}
            update={true}
          />
        )}
      </div>
    </div>
  );
}

interface LibraryViewProps extends React.HTMLAttributes<HTMLDivElement> {
  doc: Doc;
  draggable?: boolean;
  shapeWidth?: number;
  shapeHeight?: number;
  shapeMargin?: number;
  onShapeClick?: (shape: Shape) => void;
  onShapeEnter?: ShapeEnterEvent;
  onShapeLeave?: ShapeLeaveEvent;
  onShapeDragStart?: ShapeDragDropEvent;
  onShapeDragEnd?: ShapeDragDropEvent;
}

export function LibraryView({
  doc,
  draggable = false,
  shapeWidth = 38,
  shapeHeight = 38,
  onShapeClick,
  onShapeEnter,
  onShapeLeave,
  onShapeDragStart,
  onShapeDragEnd,
  className,
  ...others
}: LibraryViewProps) {
  const page = doc.children[0];

  return (
    <div className={cn("flex flex-wrap", className)} {...others}>
      {page.children.map(
        (shape) =>
          (shape as Shape).proto && (
            <PrototypeShape
              key={shape.id}
              darkMode={false}
              shape={shape as Shape}
              width={shapeWidth}
              height={shapeHeight}
              onShapeClick={onShapeClick}
              onShapeEnter={onShapeEnter}
              onShapeLeave={onShapeLeave}
              onShapeDragStart={onShapeDragStart}
              onShapeDragEnd={onShapeDragEnd}
            />
          )
      )}
    </div>
  );
}
