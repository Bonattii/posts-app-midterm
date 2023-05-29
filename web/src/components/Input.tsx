import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className="
        rounded-lg bg-gray-700
        px-2 py-2
        text-gray-200 placeholder:text-gray-300
      "
      required
    />
  );
};
