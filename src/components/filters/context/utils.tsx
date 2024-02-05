import { MetadataFilter, MetadataPropertyOperations, operator as operatorGraph} from "@/lib/gqls";
export enum PropertyValue { 
  LENGTH,
  VALUE_OF
}

export type metadataFilterInternal = {
  metadataName: string;
  metadataId: number;
  operator: "<" | ">" | "=" | "<=" | ">="
  valueToCompare: string,
  propertyValue: PropertyValue
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