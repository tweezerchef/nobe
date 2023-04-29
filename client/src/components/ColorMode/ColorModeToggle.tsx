import react, { useEffect, useLayoutEffect } from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Button from '@mui/joy/Button';


const useEnhancedEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function ColorModeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }
    return (
        <Button
            variant="outlined"
            color="neutral"
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
        >
            {mode === 'dark' ? 'Turn light' : 'Turn dark'}
        </Button>
    );
}

