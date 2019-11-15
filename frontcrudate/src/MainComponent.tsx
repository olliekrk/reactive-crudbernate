import React, {Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import {Button, Container} from 'reactstrap';
import NavbarComponent from "./NavbarComponent";
import {ComponentConfig} from "./model/ComponentConfig";
import {appRoutesConfigs} from "./model/Routes";

class MainComponent extends Component {
    renderRouteButton(route: ComponentConfig) {
        return (
            <Button key={route.componentTitle} color="link">
                <Link to={route.componentEndpoint}>{route.componentTitle}</Link>
            </Button>
        );
    }

    render() {
        return <div>
            <NavbarComponent/>
            <Container fluid>
                {appRoutesConfigs.map((route: ComponentConfig) => this.renderRouteButton(route))}
            </Container>
        </div>;
    }
}

export default MainComponent;