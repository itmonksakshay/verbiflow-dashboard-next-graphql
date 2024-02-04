"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import {  Grid, Box, Stack } from '@chakra-ui/react';
import GroupByDropdown from './filters/GroupByDropdown';
import MetadataFilterDropdown from './filters/MetadataFilterDropdown';
import { FilterProvider } from './filters/context/FilterContext';

// Dynamic imports for client-side components
const DateRange = dynamic(() => import('./filters/DateRange'), {
  ssr: false,
});

const TagsDisplay = dynamic(() => import('./tags/Tag'), {
  ssr: false,
});

const VariantFilter = dynamic(() => import( './filters/VariantFilter'), {
  ssr: false,
});

const FilterTagComponent: React.FC = () => {

  return (
    <FilterProvider>
      <Stack spacing={4} width={"100%"}> {/* This Stack will organize children into two rows */}
        <Box>
          <TagsDisplay />
        </Box>
        <Grid templateColumns="repeat(2, 1fr)" width="full" gap={6}>
          <Box width="40%">
            <DateRange />
          </Box>
          <Box display="flex" justifyContent="flex-end" >
            <Box mr={2}> 
              <GroupByDropdown menuText="Group By"  />
            </Box>
            <Box mr={2}> 
              <VariantFilter menuText="Variants"  />
            </Box>
            <Box mr={2}> 
              <MetadataFilterDropdown menuText="Metadata"  />
            </Box>
          </Box>
        </Grid>
      </Stack>
    </FilterProvider>
  );
};
export default FilterTagComponent;
