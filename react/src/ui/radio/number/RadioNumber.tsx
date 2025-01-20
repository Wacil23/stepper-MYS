import React, { useState } from "react";
import { RadioNumberProps } from ".";
import { useRadio } from "..";
import { IoChevronBack } from "react-icons/io5";

type RadioNumberType = RadioNumberProps & {
  onNumberChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  min?: number;
  isCustom?: boolean;
  suffix?: string;
  otherSuffix?: string;
  productPrice?: string;
};

const RadioNumber: React.FC<RadioNumberType> = (props) => {
  const {
    isCustom,
    min = 4,
    onNumberChange,
    suffix,
    otherSuffix,
    productPrice,
    ...radioProps
  } = props;
  const { inputProps } = useRadio(radioProps);
  const { className, ...input } = inputProps;
  const [numberValue, setNumberValue] = useState(4);

  const priceInEuros = Number(productPrice ?? "16900") / 100;
  const totalBeforeDiscount = (priceInEuros * numberValue).toFixed(2) + " €";

  const handleMinusClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setNumberValue((prev) => {
      const fakeEvent = {
        target: {
          name: radioProps.name,
          value: String(Math.max(prev - 1, min)),
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onNumberChange?.(fakeEvent);

      return Math.max(prev - 1, min);
    });
  };

  const handlePlusClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setNumberValue((prev) => {
      const fakeEvent = {
        target: { name: radioProps.name, value: String(prev + 1) },
      } as React.ChangeEvent<HTMLInputElement>;

      onNumberChange?.(fakeEvent);
      return prev + 1;
    });
  };



  return (
    <label
      className={`items-center gap-3 inline-flex justify-center select-none cursor-pointer align-top bg-transparent transition-colors duration-200 rounded-lg px-2 py-3 hover:bg-[#1b1b1b] ${className}`}
      htmlFor={inputProps.id}
    >
      <span className="flex">
        <input className="hide-visually" {...input} />
        <img
          src="https://cdn.shopify.com/s/files/1/0793/7412/3350/files/wheel4.png?v=1737255675"
          className={`w-12 ${radioProps.checked ? "opacity-100" : "opacity-40"}`}
        />
      </span>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <span
            className="text-[16px] font-bold"
            aria-label={props["aria-label"]}
          >
            {props.label}
          </span>
          {isCustom && (
            <div className="flex border py-1 rounded-full justify-between items-stretch">
              <button onClick={handleMinusClick} className=" px-3">
                <IoChevronBack />
              </button>
              <input
                onChange={props.onNumberChange}
                type="number"
                value={numberValue}
                min={min}
                readOnly
                className="w-14 h-7 text-center focus-visible:outline-none"
              />
              <button onClick={handlePlusClick} className="px-3">
                <IoChevronBack className="rotate-180" />
              </button>
            </div>
          )}
        </div>
        <p className="text-[16px] text-secondary  font-semibold">{totalBeforeDiscount}</p>
      </div>
    </label>
  );
};

export { RadioNumber };
