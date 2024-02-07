"use client";
import React, {useState} from 'react';
import dynamic from 'next/dynamic';
import {  Grid, Box, Stack, Collapse, useDisclosure } from '@chakra-ui/react';
import GroupByDropdown from './filters/GroupByDropdown';
import MetadataFilterDropdown from './filters/MetadataFilterDropdown';
import { FilterProvider } from './filters/context/FilterContext';
import CollapseButton from './tags/CollapseButton';
import AppStackedBarChart from './charts/AppStackedBarChart';


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

const FilterTagComponent: React.FC<{eventSchemaId: number}> = ({eventSchemaId}) => {
  const [isTagsVisible, setIsTagsVisible] = useState(true);
  const { isOpen, onToggle } = useDisclosure();

  return (
    <FilterProvider>
      <Stack spacing={4} width={"100%"}> {/* This Stack will organize children into two rows */}
        <CollapseButton isTagsVisible={isTagsVisible} setIsTagsVisible={setIsTagsVisible}/>
        <Collapse in={isTagsVisible} animateOpacity style={{ width: '100%' }}>
            <TagsDisplay  eventSchemaId={eventSchemaId}/>
        </Collapse>
        <Grid templateColumns="repeat(2, 1fr)" width="full" gap={6}>
          <Box width="40%">
            <DateRange />
          </Box>
          <Box display="flex" justifyContent="flex-end" >
            <Box mr={2}> 
              <GroupByDropdown menuText="Group By"  eventSchemaId={eventSchemaId}/>
            </Box>
            <Box mr={2}> 
              <VariantFilter menuText="Variants"  eventSchemaId={eventSchemaId} />
            </Box>
            <Box mr={2}> 
              <MetadataFilterDropdown menuText="Metadata" eventSchemaId={eventSchemaId}  />
            </Box>
          </Box>
        </Grid>
        <AppStackedBarChart />
      </Stack>
    </FilterProvider>
  );
};
export default FilterTagComponent;
