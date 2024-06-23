import { Button } from "@/components/ui/button";
import {
  Dialog,
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
      <DialogContent className="sm:max-w-md max-w-xs rounded-lg">
        <DialogHeader>
          <DialogTitle>プログラム開始</DialogTitle>
          <DialogDescription>今日の記録ページに移動する</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center">
          <div className="flex justify-center space-x-4">
            <Button
              variant="default"
              onClick={onConfirm}
              className="w-24 px-2 py-1 text-sm"
            >
              確認
            </Button>
            <Button
              variant="secondary"
              onClick={onClose}
              className="w-24 px-2 py-1 text-sm"
            >
              キャンセル
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
