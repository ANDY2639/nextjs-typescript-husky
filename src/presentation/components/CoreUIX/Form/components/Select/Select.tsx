import { Select, SelectItem, SelectProps } from '@heroui/react'
import React from 'react'

type SelectItemProps = {
    key: string
    label: string
}

export interface BaseSelectProps extends SelectProps {
    options: SelectItemProps[]
} 

type BaseSelectPropsWithoutProps = Omit<BaseSelectProps, 'children'>;

const BaseSelect: React.FC<BaseSelectPropsWithoutProps> = ({ options }) => {
    return (
        <Select >
            {options.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
            ))}
        </Select>
    )
}

export default BaseSelect