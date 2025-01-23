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
            <div className='relative'>
                <label className='cursor-pointer text-primary text-base flex items-center font-semibold gap-1 mb-1' htmlFor={id}>{label} {required&& <p className='text-red-500'>*</p>}</label>
                <input
                className={`${fluid ? 'w-full': ''} placeholder:text-sm h-[42px] py-2 pl-3 pr-12 text-sm  border rounded-xl ${error ? 'border-red-500 text-red-500': ' border-dark-stroke'}`}
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
                {maxLength && <p className='text-[10px] text-gray-400 absolute top-11 right-3'>{value.length}/{maxLength}</p>}
            </div>
            {renderHelperText()}
        </div>
    );
};

const Component = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => Input({ ...props, ref }));

export { Component as Input };
