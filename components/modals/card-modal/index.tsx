"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { Header } from "./header";

export const CardModal = () => {
  const id = useCardModal(state => state.id);
  const isOpen = useCardModal(state => state.isOpen);
  const onClose = useCardModal(state => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogHeader>
        <DialogTitle></DialogTitle>
      </DialogHeader>
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
      </DialogContent>
    </Dialog>
  );
};
