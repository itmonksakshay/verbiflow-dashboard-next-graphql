import React, { createContext, useContext, useState } from 'react';
import { isEqual } from 'lodash';
const FilterContext = createContext(undefined);

export const useFilters = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    variantFilters: [],
    metadataFilter: [],
    groupBy: []
  });


  const addVariantFilter = (newFilter) => {
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
    return true;
  };

  const addGroupByFilter = (newFilter) => {
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
    return true;
  };


  // Function to add a new filter
  const addMetadataFilter = (newFilter) => {
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
    return true;
  };

  // Function to remove a filter by index
  const removeFilter = ( filterType,index) => {
    if(filterType === "metadataFilter"){ 
        setFilters((currentFilters) => ({
            ...currentFilters,
            metadataFilter: currentFilters.metadataFilter.filter((_, i) => i !== index)
          }));
    } else if(filterType === "groupBy"){ 
        setFilters((currentFilters) => ({
            ...currentFilters,
            groupBy: currentFilters.groupBy.filter((_, i) => i !== index)
        }));
    } else if(filterType === "variantFilters"){ 
        setFilters((currentFilters) => ({
            ...currentFilters,
            variantFilters: currentFilters.variantFilters.filter((_, i) => i !== index)
        }));
    }
 
  };

  return (
    <FilterContext.Provider value={{ filters, addMetadataFilter, removeFilter, addGroupByFilter, addVariantFilter }}>
      {children}
    </FilterContext.Provider>
  );
};