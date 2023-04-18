import React from 'react'
import { StyledEntryCard } from './style'

interface EntryProps extends React.ChildrenProps {
    // Add any other props specific to the Button component here
}
function EntryCard({ children }: EntryProps) {
    return (
        <StyledEntryCard> {children}
        </StyledEntryCard>
    );
}
export default EntryCard;
