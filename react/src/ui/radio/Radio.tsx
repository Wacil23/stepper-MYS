import { RadioProps } from "./Radio.types";
import { useRadio } from "./useRadio";

const Radio: React.FC<
  RadioProps & {
    isCustom?: boolean;
    suffix?: string;
    otherSuffix?: string;
    description?: string;
  }
> = (props) => {
  const { isCustom, suffix, otherSuffix, description, ...radioProps } = props;
  const { inputProps } = useRadio(radioProps);
  const { className, ...input } = inputProps;

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

  return (
    <label
      className={`items-center gap-3 inline-flex justify-center select-none cursor-pointer align-top bg-transparent transition-colors duration-200 rounded-lg px-2 py-3 hover:bg-[#1b1b1b] ${className}`}
      htmlFor={inputProps.id}
    >
      <span className="flex">
        <input className="hide-visually" {...input} />
        {imageForWheel.map((img) => (
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
            <p
              className=" text-[16px] font-bold"
              aria-label={props["aria-label"]}
            >
              {props.label}
            </p>
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
              <span className="text-xs font-medium text-gray-400 line-through">
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
