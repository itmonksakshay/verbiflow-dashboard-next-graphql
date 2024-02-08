import React, { SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import { getGroupByGraph, getMetadataFilterGraph, groupByInternal, metadataFilterInternal, variantFilterInternal,timestampFilterInternal } from './utils';
import { getEventByFilter,EventCount } from '@/lib/gqls';
import { getApolloClient } from '@/lib/apolloClient';

interface FiltersState {
  variantFilters: variantFilterInternal[];
  metadataFilter: metadataFilterInternal[];
  groupBy: groupByInternal[];
  timestampFilter: timestampFilterInternal;
}

// Define a type for the context value including the setters
interface FilterContextType {
  filters: FiltersState;
  addMetadataFilter: (filter: metadataFilterInternal, eventSchemaId: number ) => Promise<boolean>; // Example function type
  removeFilter: (filterType: "variantFilters" | "metadataFilter" | "groupBy" , index: number, eventSchemaId: number) =>  Promise<boolean>; // Example function type
  addGroupByFilter: (filter: groupByInternal, eventSchemaId: number) =>  Promise<boolean>; // Example function type
  addVariantFilter: (filter: variantFilterInternal,eventSchemaId: number) =>  Promise<boolean>; // Example function type
  addTimestampFilter: (filter: timestampFilterInternal) => Promise<boolean>
  dataToRender: EventCount[]; // Specify a more accurate type if possible
}


const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilters = (): FilterContextType  => { 
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}




export const FilterProvider: React.FC<{ children: React.ReactNode; eventSchemaId:number; startDate: Date; endDate: Date }> = ({ children,eventSchemaId,startDate, endDate }) => {
  const [filters, setFilters] = useState<FiltersState>({
    variantFilters: [],
    metadataFilter: [],
    groupBy: [],
    timestampFilter: { 
      startDate: Math.floor(startDate.getTime()/1000),
      endDate: Math.floor(endDate.getTime()/1000)
    }
  });

  const [dataToRender, setDataToRender] = useState<EventCount[]>([]);

  
  useEffect(()=>{
    const getInitialValues = async()=>{
      const client = getApolloClient();
      const val = await getEventByFilter({ 
        client: client, 
        eventSchemaId: eventSchemaId, 
        metadataFilter: [],
        groupByFilter: [],
        variantFilter: [], 
        timezoneOffset: "0", 
        timestampFilter: { 
          from:  Math.floor(startDate.getTime()/1000),
          to: Math.floor(endDate.getTime()/1000)
        }
      });
      setDataToRender(val.getEventDataByFilter)
    }
    getInitialValues();
  },[eventSchemaId, startDate,endDate])

  const addVariantFilter = async (newFilter: variantFilterInternal , eventSchemaId: number) => {
    // Here you would include logic to update the state with the new filter
    // This is a simplified example
    const filterExists = filters.variantFilters.some((filter) => {
      return isEqual(filter, newFilter);
    });

    if (filterExists) {
      return false;
    }

    setFilters((currentFilters) => ({
      ...currentFilters,
      variantFilters: [...currentFilters.variantFilters, newFilter],
    }));

    const metadataFilterToGraph = filters.metadataFilter.map(filter => getMetadataFilterGraph(filter) ); 
    const groupByFilterToGraph =  filters.groupBy.map(filter => getGroupByGraph(filter));
    const variantFilter = [...filters.variantFilters, newFilter].map(filter => filter.variantId)
    
    const client = getApolloClient();
    console.log("runnign hjerer for variant filter");
    const val = await getEventByFilter({ 
      client: client, 
      eventSchemaId: eventSchemaId, 
      metadataFilter: metadataFilterToGraph,
      groupByFilter: groupByFilterToGraph,
      variantFilter: variantFilter, 
      timezoneOffset: "0", 
      timestampFilter: { 
        from: filters.timestampFilter.startDate,
        to: filters.timestampFilter.endDate
      }
    });

    setDataToRender(val.getEventDataByFilter)

    return true;
  };

  const addGroupByFilter = async(newFilter: groupByInternal, eventSchemaId: number) => {
    // Here you would include logic to update the state with the new filter
    // This is a simplified example
    const filterExists = filters.groupBy.some((filter) => {
      return isEqual(filter, newFilter);
    });

    if (filterExists) {
      return false;
    }
    setFilters((currentFilters) => ({
      ...currentFilters,
      groupBy: [...currentFilters.groupBy, newFilter],
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
      timezoneOffset: "0", 
      timestampFilter: { 
        from: filters.timestampFilter.startDate,
        to: filters.timestampFilter.endDate
      }
    });

    setDataToRender(val.getEventDataByFilter)

    return true;
  };

  // Function to add a new filter
  const addMetadataFilter = async(newFilter: metadataFilterInternal, eventSchemaId: number) => {
    // Here you would include logic to update the state with the new filter
    // This is a simplified example
    const filterExists = filters.metadataFilter.some((filter) => {
      return isEqual(filter, newFilter);
    });
    if (filterExists) {
      return false;
    }
    setFilters((currentFilters) => ({
      ...currentFilters,
      metadataFilter: [...currentFilters.metadataFilter, newFilter],
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
      timezoneOffset: "0",
      timestampFilter: { 
        from: filters.timestampFilter.startDate,
        to: filters.timestampFilter.endDate
      }
    });
    setDataToRender(val.getEventDataByFilter)
    return true;
  };

  const addTimestampFilter = async(newFilter: timestampFilterInternal ) => { 
    setFilters((currentFilters) => ({
      ...currentFilters,
      timestampFilter: newFilter,
    }));

    const metadataFilterToGraph = filters.metadataFilter.map(filter => getMetadataFilterGraph(filter) ); 
    const groupByFilterToGraph =  filters.groupBy.map(filter => getGroupByGraph(filter));
    const variantFilter = filters.variantFilters.map(filter => filter.variantId);
    const timestampFilter = { 
      from: newFilter.startDate, 
      to: newFilter.endDate
    }; 

    const client = getApolloClient();
    const val = await getEventByFilter({ 
      client: client, 
      eventSchemaId: eventSchemaId, 
      metadataFilter: metadataFilterToGraph,
      groupByFilter: groupByFilterToGraph,
      variantFilter: variantFilter, 
      timezoneOffset: "0",
      timestampFilter: timestampFilter
    });
    setDataToRender(val.getEventDataByFilter)
    return true;
  }

  // Function to remove a filter by index
  const removeFilter = async( filterType: "variantFilters" | "metadataFilter" | "groupBy" ,index: number , eventSchemaId: number): Promise<boolean> => {
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
    console.log("removing filters");
    const client = getApolloClient();
    const val = await getEventByFilter({ 
      client: client, 
      eventSchemaId: eventSchemaId, 
      metadataFilter: metadataFilterToGraph,
      groupByFilter: groupByFilterToGraph,
      variantFilter: variantFilter, 
      timezoneOffset: "0", 
      timestampFilter: { 
        from: filters.timestampFilter.startDate,
        to: filters.timestampFilter.endDate
      }
    });
    
    setDataToRender(val.getEventDataByFilter)
    return true;
  };

  return (
    <FilterContext.Provider value={{ filters, addMetadataFilter, removeFilter, addGroupByFilter, addVariantFilter,addTimestampFilter, dataToRender }}>
      {children}
    </FilterContext.Provider>
  );
};
