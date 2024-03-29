import React, {Component} from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';

export interface NavbarState extends Readonly<NavbarState> {
    isOpen: boolean,
}

class NavbarComponent extends Component {
    state: NavbarState;

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !(this.state as NavbarState).isOpen,
        });
    }

    render() {
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Main page</NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="https://github.com/olliekrk">Check my GitHub!</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}

export default NavbarComponent;