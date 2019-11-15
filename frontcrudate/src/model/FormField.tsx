export interface FormField {
    fieldName: string,
    fieldLabel: string,
}

export interface FormSelectableField extends FormField {
    fetchAvailableOptions: () => SelectableOption[],
}

export interface SelectableOption {
    optionValue: any,
    optionLabel: string,
}