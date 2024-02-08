
export interface MetadataFilterInterface {
    metadataId?: number;
    metadataName?: string
    operator?: string
    valueToCompare?: string
    propertyValue: string
}
export interface GroupByFilterInterface {
    metadataName?: string,
    metadataId?: number,
    propertyValue?: string
}
export interface VariantFilterInterface {
    variantName?: string
}
export interface FilterInterface {
    variantFilters: Array<VariantFilterInterface>;
    groupBy: Array<GroupByFilterInterface>;
    metadataFilter: Array<MetadataFilterInterface>;
}