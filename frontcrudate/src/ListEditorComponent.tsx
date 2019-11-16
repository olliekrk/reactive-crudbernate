import React, {ChangeEvent, Component, FormEvent} from "react";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {ComponentConfig, ListItem} from "./model/ComponentConfig";
import NavbarComponent from "./NavbarComponent";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {FormField, FormSelectableField, SelectableOption} from "./model/FormField";

interface EditorProps extends Readonly<EditorProps> {
    id: string,
}

interface EditorState {
    item?: any, // todo: refactor from any
}

class ListEditorComponent extends Component<EditorProps & RouteComponentProps, EditorState> {
    state: EditorState;
    private configuration: ComponentConfig;
    private readonly apiEndpoint: string;

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            item: {},
        };
        this.configuration = props.configuration;
        this.apiEndpoint = `/API${this.configuration.componentEndpoint}`;
        this.onChange = this.onChange.bind(this);
        this.onOptionChange = this.onOptionChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount(): Promise<void> {
        this.configuration
            .selectableFields
            .map(async (f: FormSelectableField) => f.availableOptions = await f.fetchAvailableOptions());

        const params = this.props.match.params as any; // todo: refactor from any
        const item: ListItem = params.id === "new" ?
            {} : await fetch(`${this.apiEndpoint}/${params.id}`).then(result => result.json());

        this.setState({item: item});
    }

    onOptionChange(changeEvent: ChangeEvent<any>): void {
        const updatedItem = Object.assign(this.state.item, {[changeEvent.target.name]: changeEvent.target.value});
        this.setState({item: updatedItem});
    }

    onChange(changeEvent: ChangeEvent<any>): void {
        const changedItem = Object.assign(this.state.item, {[changeEvent.target.name]: changeEvent.target.value});
        this.setState({item: changedItem});
    }

    async onSubmit(submitEvent: FormEvent<any>): Promise<void> {
        submitEvent.preventDefault();
        const {item} = this.state;

        await fetch(this.apiEndpoint, {
            method: (item && item.id) ? "PUT" : "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });

        this.props.history.push(this.configuration.componentEndpoint);
    }

    render() {
        const {item} = this.state;
        const header = `${this.configuration.componentTitle} ${item && item.id ? "editor" : "creator"}`;

        return <div>
            <NavbarComponent/>
            <Container>
                <h2>{header}</h2>
                <Form onSubmit={this.onSubmit}>
                    {this.configuration.selectableFields.map((field: FormSelectableField) =>
                        <FormGroup key={field.fieldName}>
                            <Label for={field.fieldName}>{field.fieldLabel}</Label>
                            <Input type="select"
                                   name={field.fieldName}
                                   id={field.fieldName}
                                   value={item[field.fieldName] || ""}
                                   onChange={this.onOptionChange}
                                   placeholder={`${field.fieldLabel} not selected`}>
                                {(field.availableOptions || []).map((opt: SelectableOption) =>
                                    <option key={opt.optionLabel} value={opt.optionValue}>{opt.optionLabel}</option>)}
                            </Input>
                        </FormGroup>
                    )}

                    {this.configuration.fields.map((field: FormField) =>
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
                        <Button color="secondary" tag={Link} to={this.configuration.componentEndpoint}>Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>;
    }
}

export default withRouter(ListEditorComponent);