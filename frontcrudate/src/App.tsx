import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import {CategoryInfo} from "./data/CategoryInfo";
import MainComponent from "./MainComponent";
import {ComponentConfig} from "./model/ComponentConfig";
import ListComponent from "./ListComponent";
import ListEditorComponent from "./ListEditorComponent";
import {listConfigs} from "./config/ListConfigs";

interface AppState extends Readonly<AppState> {
    isFetching: true,
    loadedCategories: CategoryInfo[],
}

class App extends Component {

    renderListRoutes() {
        return (listConfigs.map((routeConfig: ComponentConfig) =>
            <Route exact key={routeConfig.componentEndpoint}
                   path={routeConfig.componentEndpoint}
                   render={(props: any) => <ListComponent  {...props} configuration={routeConfig}/>}
            />
        ));
    }

    renderEditorRoutes() {
        return (listConfigs.map((routeConfig: ComponentConfig) =>
            <Route key={routeConfig.componentEndpoint + "_editor"}
                   path={`${routeConfig.componentEndpoint}/:id`}
                   render={(props: any) => <ListEditorComponent {...props} configuration={routeConfig}/>}
            />
        ));
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact key="/" path="/" component={MainComponent}/>
                    {this.renderListRoutes()}
                    {this.renderEditorRoutes()}
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
