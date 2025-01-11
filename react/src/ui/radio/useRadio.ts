import React from "react";
import { RadioProps } from "./Radio.types";
import { FormFieldInputProps } from "../form";

function useIsInViewport(ref?: React.RefObject<HTMLElement | null>) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    let observer: IntersectionObserver;
    if (typeof window !== "undefined" && ref?.current) {
      observer = new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting),
      );
      observer.observe(ref.current);
    }

    return () => {
      observer?.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}

const useRadio = (props: Partial<FormFieldInputProps<RadioProps>>) => {

  const isInViewport = useIsInViewport(props?.parentRef);

  React.useEffect(() => {
    if (props.checked) {
      if (!isInViewport) {
        props?.parentRef?.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [props.checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.disabled) {
      event.preventDefault();
    } else {
      props.onChange?.(event);
    }
  };

  const id =
    props.id ||
    [
      props.formIdentifier,
      "radio",
      props.name?.replace(/ /g, ""),
      props.value?.toString().replace(/ /g, ""),
    ]
      .filter((v) => v)
      .join("-");

  const inputProps: React.InputHTMLAttributes<HTMLInputElement> & {
    "data-cerberus"?: string;
  } = {
    ...props,
    "aria-invalid": !!props.error,
    autoComplete: "off",
    checked: props.checked || false,
    disabled: props.disabled,
    name: props.name,
    id: id,
    onBlur: (e) => props.onBlur?.(e),
    onChange: handleChange,
    onFocus: (e) => props.onFocus?.(e),
    type: "radio",
    value: props.value,
    required: props.required,
  };

  const controlProps = {
    "aria-hidden": true,
  };

  return { inputProps, controlProps };
};

export { useRadio };
