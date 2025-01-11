

import { RadioProps } from "./Radio.types";
import { useRadio } from "./useRadio";

const Radio: React.FC<RadioProps> = (props) => {
  const { controlProps, inputProps } = useRadio(props);

  return (
    <label className="items-center inline-flex justify-center select-none cursor-pointer align-top bg-transparent transition-colors duration-200 rounded-lg px-2 py-3 hover:bg-[#1b1b1b]"  htmlFor={inputProps.id}>
      <span className="flex">
        <input className="input-radio" {...inputProps} />
        <span className="control" {...controlProps} />
      </span>
      <span className="label" aria-label={props["aria-label"]}>
        {props.label}
      </span>
    </label>
  );
};

export { Radio };
