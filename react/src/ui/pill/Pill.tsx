import { useRadio } from "../radio";
import { SrOnly } from "../sr-only/SrOnly";
import { PillProps } from "./Pill.types";


const Pill: React.FC<PillProps> = (props) => {
  const { disabled, checked, label, isGroupActive, } = props;
  const { inputProps } = useRadio(props);
  const {formIdentifier, ...inputHiddenProps} = inputProps;

  return (
    <label className={`inline-block transition-all duration-300  ${isGroupActive ? 'p-[8px]':'py-3 md:py-1  px-0'} ${checked ? 'text-white' : 'text-current'} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`} htmlFor={inputProps.id}>
      <SrOnly>
        <input type="hidden" tabIndex={0} {...inputHiddenProps} />
      </SrOnly>
      <span className={`py-2 text-sm px-2 rounded-3xl  ${isGroupActive ? 'bg-none' : checked ? 'bg-primary' : 'bg-white'} `} aria-label={props["aria-label"]}>
        {label}
      </span>
    </label>
  );
};

export default Pill;

