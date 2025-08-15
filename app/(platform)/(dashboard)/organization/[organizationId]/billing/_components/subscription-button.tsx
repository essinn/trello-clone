"use client";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useProModal } from "@/hooks/use-pro-modal";
import { stripeRedirect } from "@/lib/actions/stripe-redirect";
import React from "react";
import { toast } from "sonner";

interface SubscriptionButtonProps {
  isPro?: boolean;
}

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const proModal = useProModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: data => {
      window.location.href = data;
    },
    onError: error => {
      toast.error(error);
    },
  });

  const onClick = () => {
    if (isPro) {
      execute({});
    } else {
      proModal.onOpen("defaultId");
    }
  };

  return (
    <Button onClick={onClick} disabled={isLoading} variant="primary">
      {isPro ? "Manage Subscription" : "Upgrade to Pro"}
    </Button>
  );
};
