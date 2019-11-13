import React, {Component} from 'react';
import './App.css';
import NavbarComponent from './NavbarComponent';
import {Link} from 'react-router-dom';
import {Button, Container} from 'reactstrap';
import {appRoutes} from "./App";
import {ListConfiguration} from "./ListComponent";

class MainComponent extends Component {
    renderRouteButton(route: ListConfiguration) {
        return (
            <Button key={route.componentTitle} color="link">
                <Link to={route.componentEndpoint}>{route.componentTitle}</Link>
            </Button>
        );
    }

    render() {
        return (
            <div>
                <NavbarComponent/>
                <Container fluid>
                    {appRoutes.map((route: ListConfiguration) => this.renderRouteButton(route))}
                </Container>
            </div>
        );
    }
}

export default MainComponent;