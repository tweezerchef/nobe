import React from 'react';
import { StyledButton } from './style'

export interface ButtonProps extends React.PropsWithChildren {
    full?: boolean;
    fill?: boolean;
    onClick?: () => void;
    // Add any other props specific to the Button component here
}

function Button({ children, onClick, ...props }: ButtonProps) {
    return (
        <StyledButton onClick={onClick} {...props}>
            {children}
        </StyledButton>
    );
}

export default Button;