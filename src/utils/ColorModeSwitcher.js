import React from 'react';
import { useColorMode, useColorModeValue, IconButton, Tooltip } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Tooltip label={`Switch to ${text} mode`} hasArrow>
      <IconButton
        size="md"
        aria-label={`Switch to ${text} mode`}
        variant="ghost"
        color="current"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
        borderRadius="xl"
        {...props}
      />
    </Tooltip>
  );
};
