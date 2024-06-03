import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface StartProgramDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function StartProgramDialog({
  open,
  onClose,
  onConfirm,
}: StartProgramDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>プログラム開始</DialogTitle>
          <DialogDescription>今日の記録ページに移動する</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            variant="secondary"
            onClick={onClose}
            className="px-3 py-1 text-sm"
          >
            キャンセル
          </Button>
          <Button
            variant="default"
            onClick={onConfirm}
            className="px-3 py-1 text-sm"
          >
            確認
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
