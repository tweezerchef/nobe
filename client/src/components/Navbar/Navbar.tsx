import React from 'react';
import { StyledNavbar, NavItemLink } from './style';
import { useNavigate } from 'react-router-dom';
import Recommendations from '../../../../server/routes/recommendations';

export interface NavProps extends React.ChildrenProps {
    fill?: boolean;
    // Add any other props specific to the Button component here
}

function Navbar({ children }: NavProps) {
    const logout = () => {
        localStorage.removeItem("user");
        window.location.href = '/';
    };
    return (
        <StyledNavbar>
            <NavItemLink to='/home'>Home</NavItemLink>
            <NavItemLink to='/login'>Login</NavItemLink>
            <NavItemLink to='/signup'>Sign Up</NavItemLink>
            <NavItemLink to='/clubs'>Clubs</NavItemLink>
            <NavItemLink to='/trending'>Trending</NavItemLink>
            <NavItemLink to='/locations'>Locations</NavItemLink>
            <NavItemLink to='/user-reco-input'>Build Recommendations</NavItemLink>
            <NavItemLink to='/recommended'>Get Recommendations</NavItemLink>
            <NavItemLink to='/profile'>Profile</NavItemLink>
            <button
                onClick={logout}
                style={{
                    color: "red",
                    border: "1px solid gray",
                    backgroundColor: "white",
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                }}
            >
                Logout
            </button>

        </StyledNavbar>
    );
}

export default Navbar;