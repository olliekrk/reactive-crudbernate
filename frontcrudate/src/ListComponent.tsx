import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import NavbarComponent from "./NavbarComponent";
import {ComponentConfig, ListItem} from "./model/ComponentConfig";

interface ListState {
    items: ListItem[],
    isFetching: boolean,
}

class ListComponent extends Component {
    state: ListState;
    private readonly configuration: ComponentConfig;
    private readonly apiEndpoint: string;

    constructor(props: Readonly<any>) {
        super(props);
        this.configuration = props.configuration;
        this.apiEndpoint = `/API${this.configuration.componentEndpoint}`;
        this.state = {
            items: [],
            isFetching: true,
        }
    }

    componentDidMount(): void {
        this.setState(Object.assign(this.state, {isFetching: true}));
        this.fetchItems();
    }

    fetchItems(): void {
        fetch(`${this.apiEndpoint}/all`)
            .then(response => response.json())
            .then(body => this.setState({items: body, isFetching: false}))
    }

    async deleteItem(id: number): Promise<void> {
        await fetch(`${this.apiEndpoint}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(() => this.fetchItems())
    }

    renderHeader() {
        return <tr>{this.configuration.headerValues.map(value => <th key={value}>{value}</th>)}</tr>
    }

    renderItems() {
        return this.state.items.map(item =>
            <tr key={item.id}>
                {this.configuration.itemToValues(item).map((value, i) => <td key={i}>{value}</td>)}
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link}
                                to={`${this.configuration.componentEndpoint}/${item.id.toString()}`}>Edit</Button>
                        <Button size="sm" color="danger"
                                onClick={async () => await this.deleteItem(item.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        );
    }

    render() {
        if (this.state.isFetching) {
            return <p>Loading data...</p>;
        }

        return (
            <div>
                <NavbarComponent/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success"
                                tag={Link} to={this.configuration.componentEndpoint + "/new"}>Add new</Button>
                    </div>
                    <h3>{this.configuration.componentTitle}</h3>
                    <Table className="mt-4">
                        <thead>{this.renderHeader()}</thead>
                        <tbody>{this.renderItems()}</tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default ListComponent;