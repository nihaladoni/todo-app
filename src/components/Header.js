import React from 'react';
import { HStack, Heading, IconButton, Tooltip } from '@chakra-ui/react';
import { FaChartLine, FaFilter } from 'react-icons/fa';
import { ColorModeSwitcher } from '../utils/ColorModeSwitcher';

const Header = ({
  showProgress,
  setShowProgress,
  showSettings,
  setShowSettings,
}) => {
  return (
    <HStack justify="space-between" w="100%" pb={2}>
      <Heading size="lg" fontWeight="800" letterSpacing="-1px">
        #todo
      </Heading>
      <HStack spacing={2}>
        <Tooltip label="View productivity stats" hasArrow>
          <IconButton
            icon={<FaChartLine />}
            onClick={() => setShowProgress(!showProgress)}
            variant={showProgress ? 'solid' : 'ghost'}
            colorScheme={showProgress ? 'brand' : 'gray'}
            aria-label="Toggle productivity progress"
            size="md"
            borderRadius="xl"
          />
        </Tooltip>
        <Tooltip label="Search and filter tasks" hasArrow>
          <IconButton
            icon={<FaFilter />}
            onClick={() => setShowSettings(!showSettings)}
            variant={showSettings ? 'solid' : 'ghost'}
            colorScheme={showSettings ? 'brand' : 'gray'}
            aria-label="Toggle settings and filters"
            size="md"
            borderRadius="xl"
          />
        </Tooltip>
        <ColorModeSwitcher />
      </HStack>
    </HStack>
  );
};

export default Header;
