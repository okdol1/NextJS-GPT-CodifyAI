import Image from "next/image";
import React, { useState, useRef } from "react";
import LiOfSelect from "./LiOfSelect";

interface P {
  placeholder: string;
  options: string[];
  onChange: (option: string | string[]) => void;
  multiple?: boolean;
  value?: string | string[];
  fullwidth?: boolean;
  width?: string;
}

const getSelectValueText = (value?: string | string[]) => {
  if (Array.isArray(value)) {
    let text = "";
    const length = value.length;
    value.forEach((property, idx) => {
      text += property;
      if (idx !== length - 1) {
        text += ", ";
      }
    });
    return text;
  } else {
    return value;
  }
};

const Select: React.FC<P> = ({
  options,
  onChange,
  value,
  width,
  fullwidth,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleFocusIn = () => {
    setOpen(true);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!selectRef.current?.contains(e.relatedTarget as Node)) {
      setOpen(false);
    }
  };

  const handleSelect = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div
      ref={selectRef}
      onBlur={handleBlur}
      className={`relative ${fullwidth && "w-full"} ${width}`}
      tabIndex={0}
    >
      <div
        className={`py-3 px-5 cursor-pointer rounded-default flex justify-between items-center ${
          value ? "bg-primary" : "bg-grey-100"
        }`}
        onClick={() => setOpen(!open)}
        onFocus={handleFocusIn}
      >
        <div>
          {value ? (
            <span className="text-base text-white">
              {getSelectValueText(value)}
            </span>
          ) : (
            <span className="text-base text-grey-300">{placeholder}</span>
          )}
        </div>
        <Image
          className={open ? "rotate-180" : ""}
          src={`/images/expand_more_${value ? "white" : "grey"}.svg`}
          width={24}
          height={24}
          alt="expand more"
        />
      </div>
      {open && (
        <ul className="absolute w-full bg-white rounded-default border border-primary z-10">
          {options.map((option, index) => (
            <LiOfSelect key={index} onClick={() => handleSelect(option)}>
              {option}
            </LiOfSelect>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
