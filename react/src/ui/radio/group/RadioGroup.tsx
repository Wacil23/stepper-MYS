import { HelperTextProps } from "../../helper-text";
import { Radio } from "../Radio";
import { RadioNumber } from "../number";
import { type RadioGroupProps } from "./RadioGroup.types";
import { useRadioGroup } from "./useRadioGroup";

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
    onNumberChange,
    productPrice,
    className,
  } = props;

  const radioGroupProps = useRadioGroup(props);
  const priceInEuros = Number(productPrice ?? "16900") / 100;


  const items = props.options.map((option) => {
    const isCustomSelected = value >= 4
    const isCustom = !!option.isCustom;


    // Calcul de la quantité effective
    const qty = isCustom ? numberValues : Number(option.value);
    const totalBeforeDiscount = priceInEuros * (qty ?? 1);
    const discountPercent = Number(option.promo ?? "0");
    const totalWithDiscount = totalBeforeDiscount * (1 - discountPercent / 100);

    // Détermination des suffixes
    let suffix = totalBeforeDiscount.toFixed(2) + " €";
    let otherSuffix: string | undefined;

    if (discountPercent > 0) {
      suffix = totalWithDiscount.toFixed(2) + " €";
      otherSuffix = totalBeforeDiscount.toFixed(2) + " €";
    }

    if(isCustom && numberValues){
      suffix = (priceInEuros * numberValues).toFixed(2) + " €"
    }

    if (option.suffix) {
      suffix = option.suffix;
    }
    console.log(option.value, value)

    return (
      <div key={option.value} className="bg-white w-full rounded-[18px]">
        {option.isCustom ? (
          <RadioNumber
            className={`w-full !rounded-[18px] !justify-start ${className} ${isCustomSelected ? "border-2 border-primary" : " border-2 border-transparent" }`}
            label={option.label}
            aria-label={option["aria-label"]}
            checked={isCustomSelected}
            value={option.value}
            disabled={disabled}
            name={name}
            onChange={props.onChange}
            required={required}
            error={error}
            formIdentifier={formIdentifier}
            isCustom={option.isCustom}
            onNumberChange={(e) => onNumberChange && onNumberChange(e)}
            otherSuffix={otherSuffix}
            productPrice={productPrice}
          />
        ) : (
          <Radio
            className={`w-full !rounded-[18px] !justify-start ${value?.toString?.() === option.value?.toString?.() ? "border-2 border-primary" : " border-2 border-transparent" } ${className}`}
            key={option.key || option.value}
            label={option.label}
            aria-label={option["aria-label"]}
            value={option.value}
            checked={value?.toString?.() === option.value?.toString?.()}
            disabled={disabled}
            name={name}
            onChange={props.onChange}
            required={required}
            error={error}
            formIdentifier={formIdentifier}
            suffix={suffix}
            otherSuffix={otherSuffix}
            description={option.description}
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
      <div className="flex flex-col items-start rounded-lg gap-4">
        {items}
      </div>
      {renderHelperText()}
    </div>
  );
};

export { RadioGroup };
