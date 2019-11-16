export interface FormField {
    fieldName: string,
    fieldLabel: string,
}

export interface FormSelectableField extends FormField {
    fetchAvailableOptions: () => Promise<SelectableOption[]>,
    availableOptions?: SelectableOption[],
}

export interface SelectableOption {
    optionValue: string,
    optionLabel: string,
}