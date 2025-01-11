import React from 'react';
import { type FormGroupProps } from './FormGroup.types';
import { HelperText, HelperTextProps } from '../../helper-text';

export const FormGroup: React.FC<FormGroupProps> = (props) => {
    const { children, label, isLabelVisible = true, id, hint, error, ...rest } = props;
    const errorId = `error-${id}`;
    const hintId = `hint-${id}`;

    const renderHelperText = () => {
        const showError = !!error;
        let helperTextProps: HelperTextProps = {};
        if (showError) {
            helperTextProps = {
                id: errorId,
                text: typeof error === 'object' ? (error as any).label : error,
                variant: 'error'
            };
        } else if (hint) {
            helperTextProps = {
                id: hintId,
                text: hint,
                variant: 'default'
            };
        }
        return <HelperText key={`helper-text-${id}`} {...helperTextProps} />;
    };

    return (
        <fieldset {...rest}>
            {label && (
                <legend className={`block  mb-2 ${isLabelVisible ? '' : 'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 border-none'} `}>{label}</legend>
            )}
            {children}
            {renderHelperText()}
        </fieldset>
    );
};
