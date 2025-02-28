import { HelperTextProps } from "../../helper-text";
import { Radio } from "../Radio";
import { RadioNumber } from "../number";
import { type RadioGroupProps } from "./RadioGroup.types";
import { useRadioGroup } from "./useRadioGroup";
import { calculWheelchairPrice } from "../../../utils/calculWheelchair";
import { useFormContext } from "../../../contexts/FormProvider";

const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const {
    name,
    value,
    disabled,
    required,
    formIdentifier,
    error,
    hint,
    numberValues,
    numberSelection,
    onNumberChange,
    productPrice,
    className,
  } = props;

  const radioGroupProps = useRadioGroup(props);
  const isCustomSelected = value >= 4;
  const { currentProduct, formik } = useFormContext();
  const productType = formik.values.productType;
  const items = props.options.map((option) => {
    const qty = Number(option.value);
    const { discountPercent, priceWithoutDiscount, totalPrice } =
      calculWheelchairPrice(
        productType,
        Number(productPrice),
        qty,
        Number(option?.reduction),
        Number(option?.promo),
      );

    let totalWithoutDecimal = totalPrice.toFixed(2).split(".");
    let suffix = totalPrice.toFixed(2) + ` ${currentProduct.currentSymbol}`;
    if (totalWithoutDecimal[1] === "00") {
      suffix = totalPrice.toFixed(0) + ` ${currentProduct.currentSymbol}`;
    } else {
      suffix = totalPrice.toFixed(2) + ` ${currentProduct.currentSymbol}`;
    }
    let otherSuffix: string | undefined;

    if (discountPercent > 0) {
      otherSuffix =
        priceWithoutDiscount.toFixed(2) + ` ${currentProduct.currentSymbol}`;
    }

    if (option.suffix) {
      suffix = option.suffix;
    }

    const checked = value?.toString?.() === option.value?.toString?.();
    const index = name.split("[")[1].split("]")[0];

    return (
      <div key={option.value} className="bg-white w-full rounded-[18px]">
        {option.isCustom ? (
          <RadioNumber
            className={`w-full !rounded-[18px] !justify-start ${className} ${isCustomSelected ? "border-2 border-primary" : " border-2 border-transparent"}`}
            label={option.label}
            aria-label={option["aria-label"]}
            checked={isCustomSelected}
            value={option.value}
            disabled={disabled}
            name={name}
            onChange={props.onChange}
            required={required}
            numberValues={numberValues!}
            numberSelection={numberSelection}
            error={error}
            isCustom={option.isCustom}
            onNumberChange={(e) => onNumberChange && onNumberChange(e)}
            productPrice={productPrice}
            promo={option.promo}
            index={index}
            reduction={option.reduction}
          />
        ) : (
          <Radio
            className={`w-full !rounded-[18px] !justify-start ${checked ? "border-2 border-primary" : "border-2 border-transparent"} ${className}`}
            key={option.key || option.value}
            label={option.label}
            aria-label={option["aria-label"]}
            value={option.value}
            checked={checked}
            disabled={disabled}
            name={name}
            onChange={props.onChange}
            required={required}
            error={error}
            suffix={suffix}
            otherSuffix={otherSuffix}
            description={option.description}
            promo={option.promo}
          />
        )}
      </div>
    );
  });

  const id = formIdentifier ? `${formIdentifier}-${name}` : name;
  const errorId = `error-${id}`;
  const hintId = `hint-${id}`;

  const renderHelperText = () => {
    const showError = props.error;
    let helperTextProps: HelperTextProps = {};
    if (showError) {
      helperTextProps = {
        id: errorId,
        text: typeof error === "object" ? (error as any).label : error,
        variant: "error",
      };
    } else if (hint) {
      if (typeof hint === "string") {
        helperTextProps = {
          id: hintId,
          text: hint,
          variant: "default",
        };
      } else {
        helperTextProps = {
          id: hintId,
          ...hint,
        };
      }
    }
    return <span key={`helper-text-${id}`} {...helperTextProps}></span>;
  };

  return (
    <div className="flex flex-col" {...radioGroupProps}>
      {props.label && (
        <span className="label" id={radioGroupProps["aria-labelledby"]}>
          {props.label}
        </span>
      )}
      <div className="flex flex-col items-start rounded-lg gap-4">{items}</div>
      {renderHelperText()}
    </div>
  );
};

export { RadioGroup };
