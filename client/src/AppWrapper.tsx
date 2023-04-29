// AppWrapper.tsx
export { }
import React from 'react';
import App from './App';
import {
    useColorScheme as useMaterialColorScheme,
} from '@mui/material/styles';
import { useColorScheme as useJoyColorScheme } from '@mui/joy/styles';

function AppWrapper() {
    const { mode, setMode } = useMaterialColorScheme();
    const { setMode: setJoyMode } = useJoyColorScheme();

    const handleSetMaterialMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };

    const handleSetJoyMode = () => {
        setJoyMode(mode === 'light' ? 'dark' : 'light');
    };

    return (
        <App
            setMaterialMode={handleSetMaterialMode}
            setJoyMode={handleSetJoyMode}
        />
    );
}

export default AppWrapper;
