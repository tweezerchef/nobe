import React from 'react';
import { StyledInputGroup } from './style';

interface InputProps extends React.PropsWithChildren {
    // Add any other props specific to the Button component here
}

function InputGroup({ children }: InputProps) {
    return (
        <StyledInputGroup>
            {children}
        </StyledInputGroup>
    );
}

export default InputGroup;