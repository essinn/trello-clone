"use client";

import React, { ElementRef, useRef } from "react";
import { List } from "@/lib/generated/prisma";
import {
  Popover,
  PopoverContent,
  PopoverClose,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { FormSubmit } from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { deleteList } from "@/lib/actions/delete-list";
import { toast } from "sonner";
import { copyList } from "@/lib/actions/copy-list";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: () => {
      toast.success(`List "${data.title}" deleted successfully!`);
      closeRef.current?.click();
    },
    onError: error => {
      toast.error(error);
    },
  });
  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: () => {
      toast.success(`List "${data.title}" copied successfully!`);
      closeRef.current?.click();
    },
    onError: error => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({
      id,
      boardId,
    });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeCopy({
      id,
      boardId,
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        <Button variant="ghost" size="icon" className="h-auto w-auto p-2">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant="ghost"
            size="icon"
            className="p-2 absolute top-2 right-2 text-neutral-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Add card...
        </Button>
        <form action={onCopy}>
          <input
            hidden
            name="id"
            id="id"
            value={data.id}
            onChange={onAddCard}
          />
          <input
            hidden
            name="boardId"
            id="boardId"
            value={data.boardId}
            onChange={onAddCard}
          />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input
            hidden
            name="id"
            id="id"
            value={data.id}
            onChange={onAddCard}
          />
          <input
            hidden
            name="boardId"
            id="boardId"
            value={data.boardId}
            onChange={onAddCard}
          />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
