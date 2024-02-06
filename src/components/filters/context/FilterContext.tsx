import React, { createContext, useContext, useState } from 'react';
import { isEqual } from 'lodash';
import { getGroupByGraph, getMetadataFilterGraph, groupByInternal, metadataFilterInternal } from './utils';
import { getEventByFilter,EventCount } from '@/lib/gqls';
import { getApolloClient } from '@/lib/apolloClient';

const FilterContext = createContext(undefined);

export const useFilters = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState<
    { 
      variantFilters: [], 
      metadataFilter: metadataFilterInternal[], 
      groupBy: groupByInternal[]
    }
  >({
    variantFilters: [],
    metadataFilter: [],
    groupBy: []
  });
  const [dataToRender, setDataToRender] = useState<EventCount[]>([]);

  const addVariantFilter = async (newFilter, eventSchemaId) => {
    // Here you would include logic to update the state with the new filter
    // This is a simplified example
    const filterExists = filters.variantFilters.some((filter) => { 
       return isEqual(filter,newFilter)
    })
    
    if(filterExists){ 
        return false;
    }

    setFilters((currentFilters) => ({
      ...currentFilters,
      variantFilters: [...currentFilters.variantFilters, newFilter]
    }));

    const metadataFilterToGraph = filters.metadataFilter.map(filter => getMetadataFilterGraph(filter) ); 
    const groupByFilterToGraph =  filters.groupBy.map(filter => getGroupByGraph(filter));
    const variantFilter = [...filters.variantFilters, newFilter].map(filter => filter.variantId)
    
    const client = getApolloClient();
    const val = await getEventByFilter({ 
      client: client, 
      eventSchemaId: eventSchemaId, 
      metadataFilter: metadataFilterToGraph,
      groupByFilter: groupByFilterToGraph,
      variantFilter: variantFilter, 
      timezoneOffset: "0"
    });

    setDataToRender(val.getEventDataByFilter)

    return true;
  };

  const addGroupByFilter = async(newFilter: groupByInternal, eventSchemaId: number) => {
    // Here you would include logic to update the state with the new filter
    // This is a simplified example
    const filterExists = filters.groupBy.some((filter) => { 
       return isEqual(filter,newFilter)
    })
    
    if(filterExists){ 
        return false;
    }
    setFilters((currentFilters) => ({
      ...currentFilters,
      groupBy: [...currentFilters.groupBy, newFilter]
    }));

    const metadataFilterToGraph = filters.metadataFilter.map(filter => getMetadataFilterGraph(filter) ); 
    const groupByFilterToGraph =  [...filters.groupBy,newFilter].map(filter => getGroupByGraph(filter));
    const variantFilter = filters.variantFilters.map(filter => filter.variantId);

    const client = getApolloClient();
    const val = await getEventByFilter({ 
      client: client, 
      eventSchemaId: eventSchemaId, 
      metadataFilter: metadataFilterToGraph,
      groupByFilter: groupByFilterToGraph,
      variantFilter: variantFilter, 
      timezoneOffset: "0"
    });

    setDataToRender(val.getEventDataByFilter)

    return true;
  };


  // Function to add a new filter
  const addMetadataFilter = async(newFilter: metadataFilterInternal, eventSchemaId: number) => {
    // Here you would include logic to update the state with the new filter
    // This is a simplified example
    const filterExists = filters.metadataFilter.some((filter) => { 
       return isEqual(filter,newFilter)
    })
    if(filterExists){ 
        return false;
    }
    setFilters((currentFilters) => ({
      ...currentFilters,
      metadataFilter: [...currentFilters.metadataFilter, newFilter]
    }));

    const metadataFilterToGraph = [...filters.metadataFilter, newFilter].map(filter => getMetadataFilterGraph(filter) ); 
    const groupByFilterToGraph =  filters.groupBy.map(filter => getGroupByGraph(filter));
    const variantFilter = filters.variantFilters.map(filter => filter.variantId);

    const client = getApolloClient();
    const val = await getEventByFilter({ 
      client: client, 
      eventSchemaId: eventSchemaId, 
      metadataFilter: metadataFilterToGraph,
      groupByFilter: groupByFilterToGraph,
      variantFilter: variantFilter, 
      timezoneOffset: "0"
    });
    setDataToRender(val.getEventDataByFilter)
    return true;
  };

  // Function to remove a filter by index
  const removeFilter = async( filterType,index, eventSchemaId) => {
    let filterToSet = filters;
    if(filterType === "metadataFilter"){ 
        filterToSet = {
            ...filters,
            metadataFilter: filters.metadataFilter.filter((_, i) => i !== index)
        };
    } else if(filterType === "groupBy"){ 
      filterToSet = {
          ...filters,
          groupBy: filters.groupBy.filter((_, i) => i !== index)
      };
    } else if(filterType === "variantFilters"){ 
        filterToSet = {
          ...filters,
          variantFilters: filters.variantFilters.filter((_, i) => i !== index)
        };
    }
    setFilters(filterToSet);
    const metadataFilterToGraph = filterToSet.metadataFilter.map(filter => getMetadataFilterGraph(filter) ); 
    const groupByFilterToGraph =  filterToSet.groupBy.map(filter => getGroupByGraph(filter));
    const variantFilter = filterToSet.variantFilters.map(filter => filter.variantId);

    const client = getApolloClient();
    const val = await getEventByFilter({ 
      client: client, 
      eventSchemaId: eventSchemaId, 
      metadataFilter: metadataFilterToGraph,
      groupByFilter: groupByFilterToGraph,
      variantFilter: variantFilter, 
      timezoneOffset: "0"
    });
    
    setDataToRender(val.getEventDataByFilter)
    return true;
  };

  return (
    <FilterContext.Provider value={{ filters, addMetadataFilter, removeFilter, addGroupByFilter, addVariantFilter, dataToRender }}>
      {children}
    </FilterContext.Provider>
  );
};