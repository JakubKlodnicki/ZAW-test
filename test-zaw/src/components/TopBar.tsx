import React from "react";
import { Link } from "react-router-dom";


const TopBar: React.FC = () => {
    return (
        <div>
            <nav>
                <ul>
                        <li>
                            <Link to="/">Main Page</Link>
                        </li>
                        <li>
                            <Link to="/Shop">Shop</Link>
                        </li>
                </ul>
            </nav>
        </div>
    );
};

export default TopBar;