import React from 'react';
import { Box, HStack, VStack, Text, Collapse } from '@chakra-ui/react';

const ProgressCard = ({
  showProgress,
  totalTasks,
  completedCount,
  completionPercent,
  slogan,
}) => {
  return (
    <Collapse in={showProgress} animateOpacity>
      <Box
        w="100%"
        p={5}
        borderRadius="2xl"
        bgGradient="linear(to-r, brand.500, purple.500)"
        color="white"
        boxShadow="md"
      >
        <HStack justify="space-between" align="center" mb={3}>
          <VStack align="start" spacing={0}>
            <Text fontSize="md" fontWeight="bold">Your Productivity</Text>
            <Text fontSize="xs" opacity={0.9}>
              {totalTasks === 0 ? "No tasks yet" : `${completedCount} of ${totalTasks} tasks completed`}
            </Text>
          </VStack>
          <Text fontSize="3xl" fontWeight="900">{completionPercent}%</Text>
        </HStack>
        {/* Custom progress bar */}
        <Box w="100%" h="2.5" bg="whiteAlpha.300" borderRadius="full" overflow="hidden" mb={2}>
          <Box
            w={`${completionPercent}%`}
            h="100%"
            bg="white"
            borderRadius="full"
            transition="width 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          />
        </Box>
        <Text fontSize="xs" fontWeight="500" fontStyle="italic" opacity={0.95}>
          {slogan}
        </Text>
      </Box>
    </Collapse>
  );
};

export default ProgressCard;
