import { deleteBoard } from "@/lib/actions/delete-board-actions";
import React from "react";
import { FormDelete } from "./form-delete";

interface BoardProps {
  title: string;
  id: string;
}

export default function Board({ title, id }: BoardProps) {
  const deleteBoardWithId = deleteBoard.bind(null, id);
  return (
    <div>
      <form action={deleteBoardWithId}>
        <p>{title}</p>
        <FormDelete />
      </form>
    </div>
  );
}
