import { LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  content: string;
}

export const Label = (props: LabelProps) => {
  return (
    <label {...props} className="text-md font-semibold text-gray-100">
      {props.content} <span className="text-red-500">*</span>
    </label>
  );
};
