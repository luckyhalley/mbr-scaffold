import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from 'components/Header'
import Footer from 'components/Footer'
import HomePage from 'containers/HomePage'
import NotFoundPage from 'containers/NotFoundPage'

const AppWrapper = `div`

export default function App() {
    return (
        <AppWrapper>
            <Header />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route component={NotFoundPage} />
            </Switch>
            <Footer />
        </AppWrapper>
    );
}