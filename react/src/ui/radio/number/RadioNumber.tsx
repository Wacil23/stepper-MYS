import React, { useState } from "react";
import { RadioNumberProps } from ".";
import { useRadio } from "..";
import { IoChevronBack } from "react-icons/io5";
import { calculWheelchairPrice } from "../../../utils/calculWheelchair";
import { useFormContext } from "../../../contexts/FormProvider";
import { useTranslation } from "react-i18next";

type RadioNumberType = RadioNumberProps & {
  onNumberChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  min?: number;
  isCustom?: boolean;
  suffix?: string;
  productPrice?: string;
  promo?: string;
  reduction?: string;
  numberValues: number;
  numberSelection?: number;
  index?: string;
};

const RadioNumber: React.FC<RadioNumberType> = (props) => {
  const {
    isCustom,
    min = 4,
    onNumberChange,
    onChange,
    numberValues,
    productPrice,
    promo,
    reduction,
    checked,
    ...radioProps
  } = props;
  const { t } = useTranslation();
  const { inputProps } = useRadio(radioProps);
  const { currentProduct, formik } = useFormContext();
  const productType = formik.values.productType;
  const { className, onChange: nativeOnChange, ...input } = inputProps;
  const [value, setValue] = useState(min);
  const { priceWithoutDiscount, totalPrice } = calculWheelchairPrice(
    productType,
    Number(productPrice),
    Number(value),
    Number(reduction),
    Number(promo),
  );
  let totalFinalPrice = totalPrice;
  const totalWithoutDecimal = totalPrice.toFixed(2).split(".");

  if (totalWithoutDecimal[1] === "00") {
    totalFinalPrice = Number(totalPrice.toFixed(0));
  } else {
    totalFinalPrice = Number(totalPrice.toFixed(2));
  }

  const totalPriceCustomWheelchair =
    totalFinalPrice.toFixed(2) + " " + currentProduct.currentSymbol;
  let otherSuffix = null;
  if (promo) {
    otherSuffix =
      priceWithoutDiscount.toFixed(0) + " " + currentProduct.currentSymbol;
  }

  const handleMinusClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setValue((prev) => {
      const newValue = Math.max(prev - 1, min);
      onNumberChange({
        target: {
          name: inputProps.name,
          value: String(newValue),
        },
      } as React.ChangeEvent<HTMLInputElement>);
      notifyParentOnChange(newValue);
      return newValue;
    });
  };

  const handlePlusClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setValue((prev) => {
      const newValue = prev + 1;
      onNumberChange({
        target: {
          name: inputProps.name,
          value: String(newValue),
        },
      } as React.ChangeEvent<HTMLInputElement>);
      notifyParentOnChange(newValue);
      return newValue;
    });
  };

  const notifyParentOnChange = (newValue: number) => {
    const customEvent = {
      target: {
        name: inputProps.name,
        value: String(newValue),
      },
    } as React.ChangeEvent<HTMLInputElement>;

    if (onChange) {
      onChange(customEvent);
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(value);
    onNumberChange({
      target: {
        name: e.target.name,
        value: String(value),
      },
    } as React.ChangeEvent<HTMLInputElement>);

    notifyParentOnChange(value);

    if (typeof nativeOnChange === "function") {
      nativeOnChange(e);
    }
  };

  const returnPromo = () => {
    if (promo === "27") {
      return "25";
    }
    return promo;
    // For 4 Don't forget its on RadioNumber
  };

  const description = t("quantity.wheelchair.description_custom", {
    number: value,
  });

  const imageForNumberPorduct =
    productType === "wheelchair"
      ? "https://cdn.shopify.com/s/files/1/0793/7412/3350/files/wheel4.png?v=1737255675"
      : productType === "quran"
        ? "https://cdn.shopify.com/s/files/1/0793/7412/3350/files/Flyer_fauteuil_roulant_1.png?v=1738288861"
        : "https://cdn.shopify.com/s/files/1/0793/7412/3350/files/omraplus.png?v=1738366909";

  return (
    <label
      className={`items-center gap-3 inline-flex justify-center select-none cursor-pointer align-top bg-transparent transition-colors duration-200 rounded-lg px-2 py-3 hover:bg-[#1b1b1b] ${className}`}
      htmlFor={inputProps.id}
    >
      <span className="flex">
        <input
          className="hide-visually"
          onChange={handleRadioChange}
          {...input}
        />
        <img
          src={imageForNumberPorduct}
          className={`w-12 ${checked ? "opacity-100" : "opacity-40"}`}
        />
      </span>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2 w-2/3">
          <div className="flex items-center gap-2">
            <span
              className="text-[16px] font-bold"
              aria-label={props["aria-label"]}
            >
              {props.label}
            </span>
            {promo && (
              <p className="rounded-full px-3 py-1 bg-[#b9875e1a] font-bold text-[#b9875e] text-xs">
                -{returnPromo()}%
              </p>
            )}
          </div>
          {description && <p className="text-xs font-medium">{description}</p>}
          {isCustom && (
            <div className="flex border py-1 rounded-full justify-between items-stretch">
              <button onClick={handleMinusClick} className=" px-3">
                <IoChevronBack />
              </button>
              <input
                onChange={props.onNumberChange}
                type="number"
                value={checked ? numberValues : value}
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
        <div className="flex flex-col">
          <p className="text-[16px] text-secondary  font-semibold">
            {totalPriceCustomWheelchair}
          </p>
          {otherSuffix && (
            <p className="text-xs font-medium text-right text-gray-400 line-through">
              {otherSuffix}
            </p>
          )}
        </div>
      </div>
    </label>
  );
};

export { RadioNumber };
