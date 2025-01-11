import React from "react";
import { PillGroupProps } from "./PillGroup.types";
import { useRadioGroup } from "../../radio/group/useRadioGroup";
import Pill from "../Pill";
import { useResizeWindowObserver } from "../../hooks/useResizeWindowObserver";

const PillGroup: React.FC<PillGroupProps> = (props) => {
  const [left, setLeft] = React.useState<string | undefined>(undefined);
  const [width, setWidth] = React.useState<string | undefined>(undefined);
  const groupRef = React.useRef<HTMLDivElement>(null);
  const radioGroupProps = useRadioGroup(props);
  const updateIndicatorPosition = () => {
    const selectedPill = groupRef.current?.querySelector(
      '[data-checked="true"]',
    );
    if (selectedPill) {
      const { offsetLeft, offsetWidth } = selectedPill as HTMLElement;
      setWidth(`${offsetWidth}px`);
      setLeft(`${offsetLeft}px`);
    }
  };

  React.useEffect(() => {
    updateIndicatorPosition();
  }, [updateIndicatorPosition]);



  useResizeWindowObserver(groupRef, updateIndicatorPosition);

  const renderOptions = () =>
    props.options.map((option) => (
      <div
        key={option.key || option.value}
        data-checked={props.value === option.value ? "true" : "false"}
        className="w-24 text-center"
      >
        <Pill
          aria-label={option["aria-label"]}
          required={props.required}
          error={props.error}
          formIdentifier={props.formIdentifier}
          label={option.label}
          key={option.key || option.value}
          name={props.name}
          value={option.value}
          disabled={props.disabled}
          checked={props.value === option.value}
          onChange={props.onChange}
          isGroupActive={!!option}
        />
      </div>
    ));

  return (
    <div className="relative" {...radioGroupProps}>
      <span className="inline-block text-base font-medium cursor-pointer mb-2" id={radioGroupProps["aria-labelledby"]}>
        {props.label}
      </span>
      <div ref={groupRef} className="relative flex w-fit rounded-full bg-white z-[1] ">
        {left && width && <div className="h-full absolute bottom-0 bg-primary z-[-1] rounded-full transition-[left] duration-300"  style={{ left, width }}>&nbsp;</div>}
        {renderOptions()}
      </div>
    </div>
  );
};

export { PillGroup };
