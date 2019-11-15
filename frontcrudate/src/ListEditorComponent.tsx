import React, {ChangeEvent, Component, FormEvent} from "react";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {ComponentConfig, ListItem} from "./model/ComponentConfig";
import NavbarComponent from "./NavbarComponent";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {FieldConfig} from "./model/FieldConfig";

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
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount(): Promise<void> {
        const params = this.props.match.params as any; // todo: refactor from any
        if (params.id !== "new") {
            const fetchedItemToEdit: ListItem =
                await fetch(`${this.apiEndpoint}/${params.id}`).then(result => result.json());
            this.setState({item: fetchedItemToEdit});
        }
    }

    onChange(changeEvent: ChangeEvent<any>): void {
        const changedItem = Object.assign(this.state.item, {[changeEvent.target.name]: changeEvent.target.value})
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
                    {this.configuration.fieldConfigs.map((fieldConfig: FieldConfig) =>
                        <FormGroup key={fieldConfig.fieldName}>
                            <Label for={fieldConfig.fieldName}>{fieldConfig.fieldLabel}</Label>
                            <Input type="text"
                                   name={fieldConfig.fieldName}
                                   id={fieldConfig.fieldName}
                                   value={item[fieldConfig.fieldName] || ""}
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