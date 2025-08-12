"use client";

import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { createCard } from "@/lib/actions/create-card";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, {
  forwardRef,
  useRef,
  ElementRef,
  KeyboardEventHandler,
} from "react";
import { toast } from "sonner";
import { useOnClickOutside, useEventListener } from "usehooks-ts";

interface CardFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const params = useParams();

    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: data => {
        toast.success(`Card "${data.title}" created successfully!`);
        formRef.current?.reset();
      },
      onError: error => {
        toast.error(error);
      },
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        disableEditing();
        formRef.current?.requestSubmit();
      }
    };

    useOnClickOutside(formRef as React.RefObject<HTMLElement>, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareaKeyDown: KeyboardEventHandler<
      HTMLTextAreaElement
    > = event => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = formData.get("boardId") as string;

      execute({
        title,
        boardId,
        listId,
      });
    };

    if (isEditing) {
      return (
        <form
          action={onSubmit}
          ref={formRef}
          className="m-1 py-0.5 px-1 space-y-4"
        >
          <FormTextarea
            id="title"
            onKeyDown={onTextareaKeyDown}
            errors={fieldErrors}
            ref={ref}
            placeholder="Enter a title for this card..."
          />
          <input
            hidden
            id="listId"
            name="listId"
            value={listId}
            onChange={enableEditing}
          />
          <input
            hidden
            id="boardId"
            name="boardId"
            value={params.boardId}
            onChange={enableEditing}
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add card</FormSubmit>
            <Button onClick={disableEditing} size="icon" variant="ghost">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </form>
      );
    }
    return (
      <div className="pt-2 px-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
        >
          <Plus className="w-4 h-4" />
          Add a card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
