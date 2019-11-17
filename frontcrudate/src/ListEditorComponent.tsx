import React, {ChangeEvent, Component, FormEvent} from "react";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {ComponentConfig, ListItem} from "./model/ComponentConfig";
import NavbarComponent from "./NavbarComponent";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {FormField, FormSelectableField, SelectableOption} from "./model/FormField";
import AsyncSelect from "react-select/async";
import {ActionMeta} from "react-select";

interface EditorProps extends Readonly<EditorProps> {
    id: string,
}

interface EditorState {
    item?: any,
    config: ComponentConfig,
}

class ListEditorComponent extends Component<EditorProps & RouteComponentProps, EditorState> {
    state: EditorState;
    private readonly apiEndpoint: string;

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            item: {},
            config: props.configuration,
        };
        this.apiEndpoint = `/API${props.configuration.componentEndpoint}`;
        this.onChange = this.onChange.bind(this);
        this.onOptionChange = this.onOptionChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount(): Promise<void> {
        const params = this.props.match.params as any;
        const item: ListItem = params.id === "new" ?
            {} : await fetch(`${this.apiEndpoint}/${params.id}`).then(result => result.json());
        this.setState({item: item, config: this.state.config});
    }

    private onChange(changeEvent: ChangeEvent<any>): void {
        const changedItem = Object.assign(this.state.item, {[changeEvent.target.name]: changeEvent.target.value});
        this.setState({item: changedItem, config: this.state.config});
    }

    private onOptionChange(option: SelectableOption, fieldName: string) {
        const updatedItem = Object.assign(this.state.item, {[fieldName]: option.value});
        this.setState({item: updatedItem, config: this.state.config})
    }

    private async onSubmit(submitEvent: FormEvent<any>): Promise<void> {
        submitEvent.preventDefault();
        const {item, config} = this.state;

        await fetch(this.apiEndpoint, {
            method: (item && item.id) ? "PUT" : "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });

        this.props.history.push(config.componentEndpoint);
    }

    render() {
        const {item, config} = this.state;
        const header = `${config.componentTitle} ${item && item.id ? "editor" : "creator"}`;

        return <div>
            <NavbarComponent/>
            <Container>
                <h2>{header}</h2>
                <Form onSubmit={this.onSubmit}>
                    {this.state.config.selectableFields.map((field: FormSelectableField) =>
                        <FormGroup key={field.fieldName}>
                            <Label for={field.fieldName}>{field.fieldLabel}</Label>
                            <AsyncSelect cacheOptions
                                         defaultOptions
                                         value={item[field.fieldName] ? {value: item[field.fieldName], label: item[field.fieldName]} : undefined}
                                         loadOptions={field.fetchAvailableOptions}
                                         onChange={(optionValue, _meta: ActionMeta) => this.onOptionChange(optionValue as SelectableOption, field.fieldName)}/>
                        </FormGroup>
                    )}

                    {this.state.config.fields.map((field: FormField) =>
                        <FormGroup key={field.fieldName}>
                            <Label for={field.fieldName}>{field.fieldLabel}</Label>
                            <Input type="text"
                                   name={field.fieldName}
                                   id={field.fieldName}
                                   value={item[field.fieldName] || ""}
                                   onChange={this.onChange}
                                   autoComplete="address-level1"/>
                        </FormGroup>
                    )}

                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to={config.componentEndpoint}>Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>;
    }
}

export default withRouter(ListEditorComponent);