import React from 'react';
import { Box, VStack, Input, SimpleGrid, Select, Collapse } from '@chakra-ui/react';

const FilterPanel = ({
  showSettings,
  searchQuery,
  setSearchQuery,
  priorityFilter,
  setPriorityFilter,
  categoryFilter,
  setCategoryFilter,
  sortBy,
  setSortBy,
  uniqueCategories,
  bgControl,
  borderCardColor,
}) => {
  return (
    <Collapse in={showSettings} animateOpacity>
      <Box
        p={4}
        bg={bgControl}
        borderRadius="2xl"
        borderWidth="1px"
        borderColor={borderCardColor}
        boxShadow="sm"
      >
        <VStack spacing={3} align="stretch">
          <Input
            placeholder="Search by keywords..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            borderRadius="xl"
            size="md"
          />
          <SimpleGrid columns={[1, 3]} spacing={3}>
            <Select
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
              borderRadius="xl"
              size="sm"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </Select>
            <Select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              borderRadius="xl"
              size="sm"
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
            <Select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              borderRadius="xl"
              size="sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority (High-Low)</option>
            </Select>
          </SimpleGrid>
        </VStack>
      </Box>
    </Collapse>
  );
};

export default FilterPanel;
