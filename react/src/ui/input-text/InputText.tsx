import React from 'react';
import { Input, type InputProps } from '../input';

export type InputTextProps = InputProps;

const InputText: React.FC<InputTextProps> = (props) => {
    const inputOptions: InputProps = { type: 'text', fluid: true, ...props };
    return <Input {...inputOptions} />;
};
const Component = React.forwardRef<HTMLInputElement, InputTextProps>((props, ref) => InputText({ ...props, ref }));

export { Component as InputText };
