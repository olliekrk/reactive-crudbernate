import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import NavbarComponent from "./NavbarComponent";

export interface ListItem {
    id: number,
}

export interface ListConfiguration {
    componentEndpoint: string,
    componentTitle: string,
    headerValues: any[],
    itemToValues: (item: ListItem) => any[],
}

export interface ListState {
    items: ListItem[],
    isFetching: boolean,
}

class ListComponent extends Component {
    state: ListState;
    private listConfiguration: ListConfiguration;
    private apiEndpoint: string;

    constructor(properties: Readonly<any>) {
        super(properties);
        this.listConfiguration = properties.configuration;
        this.apiEndpoint = `/API${this.listConfiguration.componentEndpoint}`;
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
        return <tr>{this.listConfiguration.headerValues.map(value => <th>{value}</th>)}</tr>
    }

    renderItems() {
        return this.state.items.map(item =>
            <tr key={item.id}>
                {this.listConfiguration.itemToValues(item).map(value => <td>{value}</td>)}
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link}
                                to={`${this.listConfiguration.componentEndpoint}/${item.id.toString()}`}>Edit</Button>
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
                                tag={Link} to={this.listConfiguration.componentEndpoint + "/new"}>Add new</Button>
                    </div>
                    <h3>{this.listConfiguration.componentTitle}</h3>
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