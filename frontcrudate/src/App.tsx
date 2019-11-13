import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import {CategoryInfo} from "./model/CategoryInfo";
import MainComponent from "./MainComponent";
import ListComponent, {ListConfiguration} from "./ListComponent";

export const appRoutes: ListConfiguration[] = [
    {
        componentEndpoint: "/categories",
        componentTitle: "Categories",
        headerValues: [
            "Name",
            "Description",
            "Actions",
        ],
        itemToValues: (item) => {
            const category = item as CategoryInfo;
            return [
                category.categoryName,
                category.description || "No description provided",
            ];
        },
    },
];

interface AppState extends Readonly<AppState> {
    isFetching: true,
    loadedCategories: CategoryInfo[],
}

class App extends Component {

    renderRoutes() {
        return (appRoutes.map((route: ListConfiguration) =>
            <Route exact key={route.componentTitle}
                   path={route.componentEndpoint}
                   render={(props: any) => <ListComponent  {...props} configuration={route}/>}
            />
        ));
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={MainComponent}/>
                    {this.renderRoutes()}
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
