import { useState } from "react";

interface CheckboxOneProps {
  id: string;
  text: string;
  isChecked: boolean;
  onChange: () => void;
}

const CheckboxOne = ({ id, text, isChecked, onChange }: CheckboxOneProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex cursor-pointer select-none items-center dark:bg-transparent dark:text-white"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={id}
            className="sr-only"
            checked={isChecked}
            onChange={onChange}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              isChecked && "border-primary bg-gray dark:bg-transparent"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${isChecked && "bg-primary"}`}
            ></span>
          </div>
        </div>
        {text}
      </label>
    </div>
  );
};

export default CheckboxOne;
