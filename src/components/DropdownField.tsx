"use client"

import { FieldError, useForm } from "react-hook-form";
import { useEffect, useState } from "react";


type SelectData = {
  [key: string]: any;
}

type DropdownFieldProps = {
  label: string;
  register: any;
  name: string;
  table: string;
  displayField: string;
  defaultValue?: string;
  gradeValue?: string;
  displayValue: string;
  error?: FieldError;
  selectProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
}

const DropdownField = ({
  label,
  register,
  name,
  table,
  defaultValue,
  displayField,
  gradeValue,
  displayValue,
  error,
  selectProps,
}: DropdownFieldProps) => {
  const [selecteddata, setSelectData] = useState<SelectData[]>([]);

  useEffect(() => {
    const fetchSelectData = async () => {
      const res = await fetch(`/api/${table}`);
      const data = await res.json();
      setSelectData(data);
    };
    fetchSelectData();
  }, []);

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* {selecteddata.map((item) => (
        <label>{item[displayField]}</label>
      ))} */}
      <label className="text-sm text-gray-500">{label}</label>
      <select
        id={name}
        {...register(name)}
        defaultValue={defaultValue}
        className="border p-2 rounded-md w-full"
        {...selectProps}
      >
        <option value="">Select {label}</option>
        {selecteddata.map((item, index) => (
          <option 
            key={index} 
            value={item[displayValue]}
            selected={item[displayValue] === defaultValue}
          >
            {gradeValue ? item[displayField] + ", " + item[gradeValue] : item[displayField]}
          </option>
        ))}
      </select>
      {error?.message && (
        <p className="text-xs text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default DropdownField;