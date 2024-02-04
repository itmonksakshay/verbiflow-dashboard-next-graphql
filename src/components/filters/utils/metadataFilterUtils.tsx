

export function computeMetadataLogic(metadatasAvailable, metadataValue, propertyValue, initialOperatorOptions, initialPropertyOptions) {
    const selectedMetadata = metadatasAvailable.find(metadata => metadata.name === metadataValue);
    if (selectedMetadata) {
      // Determine property options based on the metadata type
      const propertyOptions = selectedMetadata.type === 'STRING' ? initialPropertyOptions : ['Value of'];
      const hideProperty = propertyOptions.length < 2;

      
      // Adjust operator options based on the metadata type and property value
      const operatorOptions = propertyValue === 'Length of' || selectedMetadata.type === 'NUMBER'
        ? initialOperatorOptions
        : ['='];

      return { propertyOptions, operatorOptions, hideProperty };
    } else {
      // Default values if no metadata is selected
      return {
        propertyOptions: ['Value', 'Length'],
        operatorOptions: initialOperatorOptions,
        hideProperty: true,
      };
    }
  }
  
