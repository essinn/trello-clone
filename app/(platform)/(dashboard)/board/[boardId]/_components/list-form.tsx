"use client";
import React, { useState, useRef, ElementRef } from "react";
import { ListWrapper } from "./list-wrapper";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useParams, useRouter } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/lib/actions/create-list";
import { toast } from "sonner";

export const ListForm = () => {
  const params = useParams();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const router = useRouter();

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: data => {
      toast.success(`List "${data.title}" created successfully!`);
      disableEditing();
      router.refresh();
    },
    onError: error => {
      toast.error(error);
    },
  });

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef as React.RefObject<HTMLElement>, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    execute({
      title,
      boardId,
    });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            id="title"
            errors={fieldErrors}
            placeholder="Enter list title..."
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transistion"
          />
          <input
            hidden
            value={params.boardId}
            onChange={enableEditing}
            name="boardId"
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add list</FormSubmit>
            <Button onClick={disableEditing} size="icon" variant="ghost">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <Button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add a list
      </Button>
    </ListWrapper>
  );
};
