import React from 'react';
import { StyledNavbar, NavItemLink } from './style';

export interface NavProps extends React.ChildrenProps {
    fill?: boolean;
    // Add any other props specific to the Button component here
}

function Navbar({ children }: NavProps) {
    return (
        <StyledNavbar>
            <NavItemLink to='/login'>Login</NavItemLink>
            <NavItemLink to='/signup'>Sign Up</NavItemLink>
        </StyledNavbar>
    );
}

export default Navbar;