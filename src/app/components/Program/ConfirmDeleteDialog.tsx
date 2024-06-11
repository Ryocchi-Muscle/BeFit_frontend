import React from "react";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          作成した全プログラムを削除しますか？
        </h2>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-black rounded-md mr-2"
          >
            いいえ
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            はい
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteDialog;
