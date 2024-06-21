// components/DeleteConfirmation.tsx
import { FC } from "react";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmation: FC<DeleteConfirmationProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full h-full max-w-md px-4 md:h-auto">
        <div className="relative bg-gray rounded-lg shadow dark:bg-graydark">
          <div className="flex justify-end p-2">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div className="p-6 pt-0 text-center">
            <svg
              className="w-16 h-16 mx-auto text-red"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="mt-5 mb-6 text-lg dark:text-gray-3">
              Are you sure you want to delete?
            </h3>
            <button
              onClick={onDelete}
              className="text-gray bg-red hover:bg-rose-700 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
            >
              Yes, I&apos;m sure
            </button>
            <button
              onClick={onClose}
              className="text-white bg-slate-500 dark:bg-gray-3 dark:text-black font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
