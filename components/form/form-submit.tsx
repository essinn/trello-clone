"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface FormButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "primary"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "secondary";
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant,
}: FormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      className={className}
      size="sm"
    >
      {children}
    </Button>
  );
};
