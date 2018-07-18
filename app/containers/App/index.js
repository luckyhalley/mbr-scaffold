import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from 'components/Header'
import Footer from 'components/Footer'
import HomePage from 'containers/HomePage'
import DetailPage from 'containers/DetailPage'
import NotFoundPage from 'containers/NotFoundPage'

const AppWrapper = `div`

export default function App() {
    return (
        <AppWrapper>
            <Header />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/detail" component={DetailPage} />
                <Route component={NotFoundPage} />
            </Switch>
            <Footer />
        </AppWrapper>
    );
}