import { Outlet, Link } from "react-router-dom";
import React from "react";

const Layout = () => {
    return (
        <>
            <header>
                <h1>MemeMUC - React</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/history">Meme History</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </>
    )
};

export default Layout;