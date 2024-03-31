"use client";

import {
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  Dialog,
} from "@/components/ui/dialog";
import { useSettings } from "@/hooks/use-settings";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";

export const SettingsModal = () => {
  const settings = useSettings();
  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent className="dark:bg-neutral-950 bg-white  text-zinc-900 dark:text-gray-200 w-[90%] rounded-md dark:border-white">
        <DialogHeader className="border-b dark:border-b-white pb-3 ">
          <h2 className="text-lg font-medium ">My Settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between ">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Motion looks on your device
            </span>
          </div>
          <ModeToggle className="dark:bg-zinc-900 dark:border-gray-200"></ModeToggle>
        </div>
      </DialogContent>
    </Dialog>
  );
};
