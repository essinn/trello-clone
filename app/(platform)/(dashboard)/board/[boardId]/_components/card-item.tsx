"use client";

import React from "react";
import { Card } from "@/lib/generated/prisma";
import { Draggable } from "@hello-pangea/dnd";

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="truncate border-2 border-transparent hover:border-black bg-white rounded-md shadow-sm py-2 px-3 text-sm"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
