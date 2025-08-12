"use client";

import { Card } from "@/lib/generated/prisma";
import React from "react";

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  return (
    <div className="truncate border-2 border-transparent hover:border-black bg-white rounded-md shadow-sm py-2 px-3 text-sm">
      {data.title}
    </div>
  );
};
