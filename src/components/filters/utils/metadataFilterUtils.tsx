

export function computeMetadataLogic(metadatasAvailable, metadataValue, propertyValue, initialOperatorOptions, initialPropertyOptions) {
    const selectedMetadata = metadatasAvailable.find(metadata => metadata.metadataName === metadataValue);
    if (selectedMetadata) {
      // Determine property options based on the metadata type
      const propertyOptions = selectedMetadata.metadataType === 'STRING' ? initialPropertyOptions : ['Value of'];
      const hideProperty = propertyOptions.length < 2;


      return { propertyOptions, operatorOptions, hideProperty };
    } else {
      // Default values if no metadata is selected
      return {
        propertyOptions: ['Value of', 'Length of'],
        operatorOptions: initialOperatorOptions,
        hideProperty: true,
      };
    }
  }
}

