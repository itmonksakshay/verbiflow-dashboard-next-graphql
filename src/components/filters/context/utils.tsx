import { MetadataFilter, MetadataPropertyOperations, operator as operatorGraph, MetadataSchemaGroupBy, GroupByProperties} from "@/lib/gqls";

export enum PropertyValue { 
  LENGTH="LENGTH",
  VALUE_OF="VALUE_OF", 
  STARTS_WITH="STARTS_WITH", 
  ENDS_WITH="ENDS_WITH"
}
export enum GroupByPropertiesInternal { 
  LENGTH="Length of", 
  VALUE_OF="Value of"
}

export type metadataFilterInternal = {
  metadataName: string;
  metadataId: number;
  operator: "<" | ">" | "=" | "<=" | ">="
  valueToCompare: string,
  propertyValue: PropertyValue
}

export type groupByInternal = { 
  metadataName: string; 
  metadataId: number;
  propertyValue: GroupByPropertiesInternal;
}

function convertPropertyValueGraphEnum(property: string): MetadataPropertyOperations { 
  console.log("property",property)
  if(property === "Length of"){ 
    return MetadataPropertyOperations.LENGTH
  } else if(property === "Value of"){ 
    return MetadataPropertyOperations.VALUE
  }
  throw new Error("Unknown propery")
}


function convertOperator(operator:  "<" | ">" | "=" | "<=" | ">="): operatorGraph { 
  if(operator === "<"){ 
    return operatorGraph.LESS_THAN; 
  } else if(operator === "<="){ 
    return operatorGraph.LESS_THAN_OR_EQUAL; 
  } else if(operator === "="){ 
    return operatorGraph.EQUALS;
  } else if(operator === ">"){ 
    return operatorGraph.GREATER_THAN; 
  } else if(operator === ">="){ 
    return operatorGraph.GREATER_THAN_OR_EQUAL;
  }
  throw new Error("Unknown property");
}



function convertGroupByProperty(groupbyProperty:GroupByPropertiesInternal  ): GroupByProperties { 
  console.log("group by ", groupbyProperty);
  if(groupbyProperty === GroupByPropertiesInternal.LENGTH){ 
    return GroupByProperties.LENGTH; 
  } else if(groupbyProperty === GroupByPropertiesInternal.VALUE_OF){ 
    return GroupByProperties.VALUE; 
  } 
  throw new Error("Unknown property");
}

export function getMetadataFilterGraph(metadataFilter: metadataFilterInternal ): MetadataFilter { 
  return { 
    metadataOperator: {
      metadataSchemaId: metadataFilter.metadataId, 
      operation:  convertPropertyValueGraphEnum(metadataFilter.propertyValue)
    },
    value: metadataFilter.valueToCompare,
    operator: convertOperator(metadataFilter.operator)
  }
}


export function getGroupByGraph(groupByFilter: groupByInternal ): MetadataSchemaGroupBy { 
  return { 
    metadataSchemaId: groupByFilter.metadataId,
    property: convertGroupByProperty(groupByFilter.propertyValue)
  }
}
