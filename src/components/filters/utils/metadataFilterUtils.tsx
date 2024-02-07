import { Metadata, MetadataType } from "@/lib/gqls";
import { PropertyValue, operatorInternal } from "../context/utils";


export function computeMetadataLogic(metadatasAvailable: Metadata[], metadataValue: string, propertyValue: PropertyValue , initialOperatorOptions: operatorInternal[], initialPropertyOptions: PropertyValue[]) {
    const selectedMetadata = metadatasAvailable.find(metadata => metadata.metadataName === metadataValue);
    if (selectedMetadata) {
      // Determine property options based on the metadata type
      const propertyOptions = selectedMetadata.metadataType === MetadataType.STRING ? initialPropertyOptions : [PropertyValue.VALUE_OF];
      const hideProperty = propertyOptions.length < 2;

      // Adjust operator options based on the metadata type and property value
      const operatorOptions: operatorInternal[] = propertyValue === PropertyValue.LENGTH || selectedMetadata.metadataType === MetadataType.NUMBER ? initialOperatorOptions : ['='];
      
      return { propertyOptions, operatorOptions, hideProperty };
    } else {
      // Default values if no metadata is selected
      return {
        propertyOptions: [PropertyValue.VALUE_OF, PropertyValue.LENGTH],
        operatorOptions: initialOperatorOptions,
        hideProperty: true,
      };
    }
}

