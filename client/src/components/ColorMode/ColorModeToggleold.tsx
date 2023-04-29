import React from 'react';
import IconButton from '@mui/material/IconButton';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface ColorModeContextType {
    toggleColorMode: () => void;
}

export const ColorModeContext = React.createContext<ColorModeContextType>({
    toggleColorMode: () => { },
});

export function ColorModeToggle() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    return (
        <IconButton
            onClick={colorMode.toggleColorMode}
            color="inherit"
        >
            {theme.palette.mode === 'dark' ? (
                <Brightness7Icon />
            ) : (
                <Brightness4Icon />
            )}
        </IconButton>
    );
}

export function ColorModeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: mode,
                    background: {
                        default: mode === 'light' ? '#ffffff' : '#121212',
                    },
                },
            }),
        [mode],
    );

    React.useEffect(() => {
        const body = document.querySelector('body');
        if (body) {
            body.style.backgroundColor = theme.palette.background.default;
        }
    }, [theme]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
}
