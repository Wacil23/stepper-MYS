import * as React from 'react';
import { type InputProps } from './Input.types';
import { type HelperTextProps } from '../helper-text/HelperText.types';
import { HelperText } from '../helper-text';

const Input: React.FC<InputProps> = (props) => {
    const inputRef = React.createRef<HTMLInputElement>();
    const {
        ref,
        disabled,
        name,
        label,
        error,
        hint,
        maxLength,
        minLength,
        required,
        inputMode,
        pattern,
        type = 'text',
        value,
        readOnly,
        autoComplete,
        hideErrorMessage = false,
        onChange,
        onFocus,
        onBlur,
        formIdentifier,
        fluid,
        onInput,
        onKeyDown,
        placeholder
    } = props;
    const [_, setFocused] = React.useState(false);

    const usedRef = (ref as React.MutableRefObject<HTMLInputElement>) ?? inputRef;

    // const displayClearButton = clearable && value

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        onBlur?.(event);
    };

    // const handleClear = () => {
    //     onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>); // Clear the field value
    //     if (usedRef.current) {
    //         usedRef.current?.focus();
    //     }
    // };

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        onInput?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        onKeyDown?.(event);
    };


    const id = formIdentifier ? `${formIdentifier}-${name}` : name;
    const errorId = `error-${id}`;
    const hintId = `hint-${id}`;

    const renderHelperText = () => {
        const showError = error && !hideErrorMessage;
        let helperTextProps: HelperTextProps = {};
        if (showError) {
            helperTextProps = {
                id: errorId,
                text: typeof error === 'object' ? (error as any).label : error,
                variant: 'error',
                hideIcon: true
            };
        } else if (hint) {
            helperTextProps = {
                id: hintId,
                text: hint,
                variant: 'default',

            };
        }
        return <HelperText key={`helper-text-${id}`} {...helperTextProps} />;
    };

    return (
        <div className='relative flex flex-col gap-[2px]'>
            <p className='relative'>
                <label className='cursor-pointer text-primary text-base font-medium inline-block mb-1' htmlFor={id}>{label}</label>
                <input
                className={`${fluid ? 'w-full': ''} placeholder:text-sm h-9 py-2 px-3 text-sm border-2 border-dark-light rounded-md ${error ? 'border-red-500 text-red-500': ''}`}
                    type={type}
                    id={id}
                    name={name}
                    ref={usedRef}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : hint ? hintId : undefined}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={value || ''}
                    disabled={disabled}
                    readOnly={readOnly}
                    required={required}
                    minLength={minLength}
                    maxLength={maxLength}
                    autoComplete={autoComplete}
                    inputMode={inputMode}
                    pattern={pattern}
                    placeholder={placeholder}
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                />
            </p>
            {renderHelperText()}
        </div>
    );
};

const Component = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => Input({ ...props, ref }));

export { Component as Input };
