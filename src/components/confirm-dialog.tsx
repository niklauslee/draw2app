import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { buttonVariants } from "./ui/button";

interface ConfirmOptions {
  title: string;
  description: string;
  confirm: string;
  dismiss: string;
}

export interface ConfirmDialogState extends ConfirmOptions {
  open: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
  show: (
    options: ConfirmOptions,
    onConfirm: () => void,
    onDismiss: () => void
  ) => void;
  close: () => void;
}

export const useConfirmDialog = create<ConfirmDialogState>()(
  devtools(
    (set) => ({
      open: false,
      result: false,
      title: "Are you sure?",
      description: "",
      confirm: "Continue",
      dismiss: "Cancel",
      onConfirm: () => {},
      onDismiss: () => {},
      show: (options, onConfirm, onDismiss) =>
        set((state) => ({
          ...state,
          ...options,
          onConfirm,
          onDismiss,
          open: true,
          result: false,
        })),
      close: () => set((state) => ({ ...state, open: false })),
    }),
    { name: "ConfirmDialog" }
  )
);

export function ConfirmDialog({}) {
  const {
    open,
    title,
    description,
    confirm,
    dismiss,
    onConfirm,
    onDismiss,
    close,
  } = useConfirmDialog();

  const handleConfirm = async () => {
    if (onConfirm) await onConfirm();
    close();
  };

  const handleDismiss = async () => {
    if (onDismiss) await onDismiss();
    close();
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          handleDismiss();
        }
      }}
    >
      <AlertDialogContent className="p-3 w-72">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xs font-semibold">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            {dismiss}
          </AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ size: "sm" })}
            onClick={() => {
              handleConfirm();
            }}
          >
            {confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export async function confirm(
  options: Partial<ConfirmOptions>
): Promise<boolean> {
  options = {
    title: "Are you sure?",
    description: "",
    confirm: "Continue",
    dismiss: "Cancel",
    ...options,
  };
  return new Promise((resolve) => {
    useConfirmDialog.getState().show(
      options as ConfirmOptions,
      () => resolve(true),
      () => resolve(false)
    );
  });
}
