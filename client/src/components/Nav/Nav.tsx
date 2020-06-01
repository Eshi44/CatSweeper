import React, { Component } from 'react';
import CatSweeperText from "../../images/Cat-Sweeper-Text.png";

class Nav extends Component {
    render() {
        const minesweeper = {
            height: "50px",
            marginBottom: "10px"
        }
        return (
            <div>
                <nav className="navbar navbar-default">
                <img src={CatSweeperText} alt="cat sweeper text header" style={minesweeper}/>
                </nav>
            </div>
        );
    }
}

export default Nav;