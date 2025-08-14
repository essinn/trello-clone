"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { useCardModal } from "@/hooks/use-card-modal";
import { copyCard } from "@/lib/actions/copy-card";
import { deleteCard } from "@/lib/actions/delete-card";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface ActionsProps {
  data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: data => {
        toast.success("Card copied successfully");
        cardModal.onClose();
      },
      onError: error => {
        toast.error(error);
      },
    }
  );
  const { execute: exectuteDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: data => {
        toast.success("Card deleted successfully");
        cardModal.onClose();
      },
      onError: error => {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopyCard({
      id: data.id,
      boardId,
    });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    exectuteDeleteCard({
      id: data.id,
      boardId,
    });
  };
  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        variant="gray"
        size="inline"
        onClick={onCopy}
        disabled={isLoadingCopy}
        className="w-full justify-start"
      >
        <Copy className="w-5 h-5" />
        Copy
      </Button>
      <Button
        variant="destructive"
        size="inline"
        onClick={onDelete}
        disabled={isLoadingDelete}
        className="w-full justify-start"
      >
        <Trash className="w-5 h-5" />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-20 h-8 bg-neutral-200" />
    </div>
  );
};
