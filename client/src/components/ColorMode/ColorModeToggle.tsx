import React from 'react';
import {
  useColorScheme as useMaterialColorScheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as extendMaterialTheme,
  useTheme as useMaterialTheme,
  THEME_ID,
} from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';

// Icons
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';

interface ModeToggleProps {
  setMode: (mode: 'dark' | 'light') => void;
  setJoyMode: (mode: 'dark' | 'light') => void;
}

function ModeToggle({ setMode, setJoyMode }: ModeToggleProps) {
  const { mode } = useMaterialColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleModeChange = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    setJoyMode(newMode);
    localStorage.setItem('mode', newMode);
  };

  if (!mounted) {
    return null;
  }

  return (
    <IconButton onClick={handleModeChange} sx={{ marginLeft: '15px !important' }}>
      {mode === 'dark' ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
}

export default ModeToggle;
