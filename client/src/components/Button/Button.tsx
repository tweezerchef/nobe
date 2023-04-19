import React from 'react';
import { StyledButton } from './style'

export interface ButtonProps extends React.ChildrenProps {
    full?: boolean;
    fill?: boolean;
    // Add any other props specific to the Button component here
}

function Button({ children, ...props }: ButtonProps) {
    return (
        <StyledButton {...props}>
            {children}
        </StyledButton>
    );
}

export default Button;