import * as React from 'react'
import {createRootRoute, Outlet} from '@tanstack/react-router'
import {Navbar} from "../components/Navabar.js";

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <React.Fragment>
            <Navbar/>
            <Outlet/>
        </React.Fragment>
    )
}
