"use client";
import React, {useState,useEffect} from 'react';
import dynamic from 'next/dynamic';
import {  Grid, Box, Stack, Collapse } from '@chakra-ui/react';
import GroupByDropdown from './filters/GroupByDropdown';
import MetadataFilterDropdown from './filters/MetadataFilterDropdown';
import { FilterProvider } from './filters/context/FilterContext';
import CollapseButton from './tags/CollapseButton';
import { createPortal} from 'react-dom';


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

const AppStackedBarChart = dynamic(() => import( './charts/AppStackedBarChart'), {
  ssr: false,
});
const FilterTagComponent: React.FC<{eventSchemaId: number;timezoneOffset:string}> = ({eventSchemaId,timezoneOffset}) => {
  const [isTagsVisible, setIsTagsVisible] = useState(true);

  const [barChartNode, setBarChartNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Attempt to find the element immediately
    const node = document.getElementById('filterBarChart');
    if (node) {
      setBarChartNode(node);
    } else {
      // Set up a mutation observer or polling here if necessary
    }
  }, []);

  // Only create the portal if barChartNode is not null
  const barChartPortal = barChartNode ? createPortal(
    <AppStackedBarChart />,
    barChartNode
  ) : null;


  const subtractOneMonth = (date: Date) => {
    const newDate = new Date(date.getTime()); // Create a new Date instance to avoid mutating the original date
    newDate.setMonth(date.getMonth() - 1);
    return newDate;
  };

  return (
    <FilterProvider eventSchemaId={eventSchemaId} startDate={subtractOneMonth(new Date())} endDate={new Date()}>
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
          {barChartPortal}
        </Grid>
      </Stack>
    </FilterProvider>
  );
};
export default FilterTagComponent;
