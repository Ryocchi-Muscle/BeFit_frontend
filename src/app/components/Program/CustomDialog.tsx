// CustomDialog.tsx
import React from 'react';

interface CustomDialogProps {
  message: string;
  onClose: () => void;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative z-60 bg-white p-8 rounded-lg shadow-lg w-64">
        <p className="text-lg font-semibold text-gray-800">
          {message.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomDialog;
