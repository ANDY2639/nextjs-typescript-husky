/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useMemo} from 'react';
import Col, { ColSizing } from "@/presentation/components/CoreUIX/Layout/Col"
import { Select, SelectProps } from '@/presentation/components/CoreUIX/Form/components/Select';
import FormContext from '@/presentation/components/CoreUIX/Form/context/FormContext';


export type FormSelectProps = {
    colSize?: ColSizing
    disabled?: (values: {[key: string]: string}) => boolean
    clean?: Record<string, string>
    name: string
} & Omit<SelectProps, 'error' | 'disabled' | 'onChange' | 'value'>
const FormSelect: React.FC<FormSelectProps> = ({name, disabled, size, clean, ...rest}) => {
    const { values, errors, isSubmit, onChangeField, apiFieldErrors, setPartialValues, clearError } = useContext(FormContext);
    const value = values[name];
    const error = errors[name];
    const isDisabled = disabled ? disabled(values) : undefined
    const apiError = useMemo(()=> apiFieldErrors.some(fieldError=> fieldError === name),
        [apiFieldErrors]
    )
    const colSize = size ?? {}

    const onChangeSelect = (name: string, value: string) => {
        if(clean) {
            setPartialValues({
                [name]: value,
                ...clean
            })
            const names = [...Object.keys(clean), name];
            clearError(names)
        } else {
            onChangeField(name, value)
        }
    }

    return (
        <Col {...colSize}>
            <Select
                {...rest}
                value={value}
                isInvalid={!!error || apiError}
                onChange={(e) => onChangeSelect(e.target.name, e.target.value)}
                name={name}
                disabled={isDisabled || isSubmit}
                errorMessage={error}
            />
        </Col>
    );
};

export default FormSelect;
