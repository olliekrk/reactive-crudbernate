export interface FormField {
    fieldName: string,
    fieldLabel: string,
}

export interface FormSelectableField extends FormField {
    fetchAvailableOptions: () => Promise<SelectableOption[]>,
}

export interface SelectableOption {
    value: string,
    label: string,
}