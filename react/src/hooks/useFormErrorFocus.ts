/* eslint-disable no-useless-escape */
import React from 'react';
import { type FormikContextType } from 'formik';

const flat = (obj: any, concatenator = '.'): any =>
    Object.keys(obj).reduce<any>((acc, key) => {
        if (typeof obj[key] !== 'object' || obj[key] === null) {
            return {
                ...acc,
                [key]: obj[key]
            };
        }

        const flattenedChild = flat(obj[key], concatenator);

        return {
            ...acc,
            ...Object.keys(flattenedChild).reduce(
                (childAcc, childKey) => ({
                    ...childAcc,
                    [`${key}${concatenator}${childKey}`]: flattenedChild[childKey]
                }),
                {}
            )
        };
    }, {});

function convertKey(key: string[]) {
    // Replace dots (.) between digits with square brackets ([ and ])
    // This handles cases where dot notation represents an array index.
    // For example, "newsletters.0.isSubscribed" becomes "newsletters[0].isSubscribed"
    return key.map((k) => k.replace(/\.(\d+)\./g, '[$1].'));
}

function normalizeFieldName(fieldName: string): string {
    // Delete suffixes and return the base field
    return fieldName.replace(/--\w+$/, '').replace(/\.\w+$/, '');
}

type Options<T> = { context: FormikContextType<T>; enabled: boolean; formElement: HTMLFormElement };

const scrollOptions: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start', inline: 'start' };
/** Hook to focus on first field being on error in one form after form submit */
export const useFormErrorFocus = <T = any>({ context, enabled, formElement }: Options<T>) => {
    const { errors, submitCount, isSubmitting } = context;

    React.useEffect(() => {
        if (enabled && isSubmitting) {
            const errorKeys = Object.keys(flat(errors));
            let timeout: NodeJS.Timeout;
            if (errorKeys.length > 0) {
                const inputs = formElement.querySelectorAll('input');
                for (let i = 0; i < inputs.length; i++) {
                    const errorConverted = convertKey(errorKeys);
                    const normalizedInputName = normalizeFieldName(inputs[i].name);
                    const hasInputInConvertedError = errorConverted.some((errorFieldName) => {
                        return normalizeFieldName(errorFieldName).includes(normalizedInputName);
                    });
                    if (hasInputInConvertedError) {
                        const selector = `[name="${inputs[i].name}"]`;
                        const errorElementField = document.querySelector(selector) as HTMLInputElement;
                        const errorElementLabel = document.querySelector(
                            `label[for="${errorElementField?.id}"]`
                        ) as HTMLLabelElement;
                        if (errorElementField) {
                            if (errorElementLabel && errorElementLabel.nodeName === 'LABEL') {
                                errorElementLabel.scrollIntoView(scrollOptions);
                            } else {
                                errorElementField.scrollIntoView(scrollOptions);
                            }
                            timeout = setTimeout(() => errorElementField.focus(), 200);
                            break;
                        }
                    }
                }
            }
            return () => {
              if (timeout) {
                  clearTimeout(timeout);
              }
          };
        }
    }, [submitCount, errors]);
};
