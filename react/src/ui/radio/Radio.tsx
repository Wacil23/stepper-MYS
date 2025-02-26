import { useFormContext } from "../../contexts/FormProvider";
import { RadioProps } from "./Radio.types";
import { useRadio } from "./useRadio";

const Radio: React.FC<
  RadioProps & {
    isCustom?: boolean;
    suffix?: string;
    otherSuffix?: string;
    description?: string;
    promo?: string;
    reduction?: string;
    beneficiaryIndex?: number;
  }
> = (props) => {
  const {
    isCustom,
    suffix,
    otherSuffix,
    description,
    promo,
    beneficiaryIndex,
    ...radioProps
  } = props;
  const { inputProps } = useRadio(radioProps);
  const { className, ...input } = inputProps;
  const { formik } = useFormContext();
  const isWheelchair = formik.values.productType === "wheelchair";
  const isQuran = formik.values.productType === "quran";

  const imageForWheel = [
    {
      value:
        "https://cdn.shopify.com/s/files/1/0793/7412/3350/files/Koala_Bundles_1_Wheel.png?v=1736639725",
      quantity: 1,
    },
    {
      value:
        "https://cdn.shopify.com/s/files/1/0793/7412/3350/files/koala-bundles-2wheel.png?v=1735007935",
      quantity: 2,
    },
    {
      value:
        "https://cdn.shopify.com/s/files/1/0793/7412/3350/files/koala-bundles-3wheel.png?v=1735007895",
      quantity: 3,
    },
  ];

  const imageForQuran = [
    {
      value:
        "https://cdn.shopify.com/s/files/1/0793/7412/3350/files/quran.png?v=1738289183",
      quantity: 1,
    },
    {
      value:
        "https://cdn.shopify.com/s/files/1/0793/7412/3350/files/quran2.png?v=1738288861",
      quantity: 2,
    },
    {
      value:
        "https://cdn.shopify.com/s/files/1/0793/7412/3350/files/quran3.png?v=1738288861",
      quantity: 3,
    },
  ];

  const imageForOmra = [
    {
      value:
        "https://cdn.shopify.com/s/files/1/0793/7412/3350/files/omra1.png?v=1738366908",
      quantity: 1,
    },
    {
      value:
        "https://cdn.shopify.com/s/files/1/0793/7412/3350/files/omra2.png?v=1738366909",
      quantity: 2,
    },
    {
      value:
        "https://cdn.shopify.com/s/files/1/0793/7412/3350/files/omra3.png?v=1738366908",
      quantity: 3,
    },
  ];

  const imageForFrame = [
    {
      value:
        "https://cdn.shopify.com/s/files/1/0793/7412/3350/files/cadremakkah.png?v=1737259284",
      quantity: "qr",
    },
    {
      value:
        "https://cdn.shopify.com/s/files/1/0793/7412/3350/files/mailmysadaka.png?v=1737259283",
      quantity: "mail",
    },
  ];

  const returnPromo = () => {
    if (promo === "12") {
      return "10";
    } else if (promo === "22") {
      return "20";
    }
    return promo;
    // For 4 Don't forget its on RadioNumber
  };

  return (
    <label
      className={`items-center gap-3 inline-flex justify-center select-none cursor-pointer align-top bg-transparent transition-colors duration-200 rounded-lg px-2 py-3 hover:bg-[#1b1b1b] ${className}`}
      htmlFor={inputProps.id}
    >
      <span className="flex">
        <input className="hide-visually" {...input} />
        {(isWheelchair
          ? imageForWheel
          : isQuran
            ? imageForQuran
            : imageForOmra
        ).map((img) => (
          <>
            {radioProps.value === img.quantity && (
              <img
                className={`w-10 transition-opacity ${img.quantity === 1 && "w-8"}  ${radioProps.checked ? "opacity-100" : "opacity-40"}`}
                src={img?.value}
              />
            )}
          </>
        ))}

        {imageForFrame.map((frame) => (
          <>
            {radioProps.value === frame.quantity && (
              <img
                className={`w-10 transition-opacity ${radioProps.checked ? "opacity-100" : "opacity-40"}`}
                src={frame?.value}
              />
            )}
          </>
        ))}
      </span>
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1 w-[70%]">
            <div className="flex items-center gap-4">
              <p
                className=" text-[16px] font-bold"
                aria-label={props["aria-label"]}
              >
                {props.label}
              </p>
              {promo && (
                <p className="rounded-full px-3 py-1 bg-[#b9875e1a] font-bold text-[#b9875e] text-xs">
                  -{returnPromo()}%
                </p>
              )}
            </div>
            {props.description && (
              <span className="text-xs font-medium">{description}</span>
            )}
          </div>
          <div className="flex flex-col">
            {suffix && (
              <p className="text-[16px] text-secondary font-semibold">
                {suffix}
              </p>
            )}
            {otherSuffix && (
              <span className="text-xs text-right font-medium text-gray-400 line-through">
                {otherSuffix}
              </span>
            )}
          </div>
        </div>
      </div>
    </label>
  );
};

export { Radio };
