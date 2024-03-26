type Props = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal: React.FC<Props> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded">
        <p className="mb-4">本当に退会しますか？</p>
        <button
          onClick={onConfirm}
          className="mr-2 rounded-lg bg-red-500 px-4 py-2 text-white"
        >
          退会する
        </button>
        <button
          onClick={onCancel}
          className="rounded-lg bg-gray-500 px-4 py-2 text-white"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
};
