import type React from 'react';
import { BaseComponentModel } from '../../../types/base/BaseComponentType';

export type FormGroupProps = React.PropsWithChildren<
    BaseComponentModel & {
        hint?: string | React.ReactNode;
        error?: string;
        id: string;
        label: string;
        isLabelVisible?: boolean;
    }
>;
