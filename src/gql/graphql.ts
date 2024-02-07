/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ConverstionFunnelFilter = {
  eventRequestFilter?: InputMaybe<EventRequestFilter>;
  metadataConversionFilter: Array<SequenceMetadataFilter>;
  timestamp?: InputMaybe<TimestampFilter>;
  variantFilter?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Event = {
  __typename?: 'Event';
  eventId: Scalars['Int']['output'];
  eventMetadata: Array<Metadata>;
  eventRequestData: EventRequest;
  eventSchema: EventSchema;
  timestamp: Scalars['Int']['output'];
  variant: Variant;
};

export type EventAnalyticsCountryCity = {
  __typename?: 'EventAnalyticsCountryCity';
  city?: Maybe<Scalars['String']['output']>;
  count: Scalars['Int']['output'];
  country: Scalars['String']['output'];
};

export type EventAnalyticsData = {
  __typename?: 'EventAnalyticsData';
  data: Array<VariantEventData>;
  date: Scalars['String']['output'];
  index: Scalars['Int']['output'];
};

export type EventDataFilter = {
  eventRequestFilter?: InputMaybe<EventRequestFilter>;
  eventSchemaId?: InputMaybe<Scalars['Int']['input']>;
  groupByMetadataSchemaIds?: InputMaybe<Array<MetadataSchemaGroupBy>>;
  metadataFilter: Array<MetadataFilter>;
  timestamp?: InputMaybe<TimestampFilter>;
  variantFilter?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type EventRequest = {
  __typename?: 'EventRequest';
  browserFamily?: Maybe<Scalars['String']['output']>;
  browserVersion?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  deviceBrand?: Maybe<Scalars['String']['output']>;
  deviceFamily?: Maybe<Scalars['String']['output']>;
  deviceModel?: Maybe<Scalars['String']['output']>;
  eventDataId: Scalars['Int']['output'];
  ip?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['String']['output']>;
  osFamily?: Maybe<Scalars['String']['output']>;
  osVersion?: Maybe<Scalars['String']['output']>;
};

export type EventSchema = {
  __typename?: 'EventSchema';
  eventMetadata: Array<MetadataSchema>;
  eventName: Scalars['String']['output'];
  eventSchemaId: Scalars['Int']['output'];
  experiment: Experiment;
};

export type Experiment = {
  __typename?: 'Experiment';
  createdAt: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  eventSchemas: Array<EventSchema>;
  experimentId: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  variants: Array<Variant>;
};

export enum GroupByProperties {
  Length = 'LENGTH',
  Value = 'VALUE'
}

export type Metadata = {
  __typename?: 'Metadata';
  metadataId: Scalars['Int']['output'];
  metadataSchema: MetadataSchema;
  value: Scalars['String']['output'];
};

export type MetadataEventGrouping = {
  __typename?: 'MetadataEventGrouping';
  metadataSchemaId: Scalars['Int']['output'];
  value: Scalars['String']['output'];
};

export type MetadataInput = {
  metadataSchemaId: Scalars['Int']['input'];
  value: Scalars['String']['input'];
};

export enum MetadataPropertyOperations {
  EndsWith = 'ENDS_WITH',
  Length = 'LENGTH',
  StartsWith = 'STARTS_WITH',
  Value = 'VALUE'
}

export type MetadataSchema = {
  __typename?: 'MetadataSchema';
  metadataId: Scalars['Int']['output'];
  metadataName: Scalars['String']['output'];
  metadataType: MetadataType;
};

export type MetadataSchemaGroupBy = {
  metadataSchemaId: Scalars['Int']['input'];
  property?: InputMaybe<GroupByProperties>;
};

export type MetadataSchemaInput = {
  metadataName: Scalars['String']['input'];
  metadataType: MetadataType;
};

export enum MetadataType {
  Boolean = 'BOOLEAN',
  Color = 'COLOR',
  Number = 'NUMBER',
  String = 'STRING'
}

export type Mutation = {
  __typename?: 'Mutation';
  createEvent: Scalars['Boolean']['output'];
  createEventSchema: Scalars['Boolean']['output'];
  createExperiment: Scalars['Boolean']['output'];
  createVariant: Scalars['Boolean']['output'];
  pingHeartbeat: Scalars['Boolean']['output'];
  saveEmailAddress: Scalars['Boolean']['output'];
};


export type MutationCreateEventArgs = {
  eventSchemaId: Scalars['Int']['input'];
  metadata: Array<InputMaybe<MetadataInput>>;
  sessionId: Scalars['String']['input'];
  variantId: Scalars['Int']['input'];
};


export type MutationCreateEventSchemaArgs = {
  experimentId: Scalars['Int']['input'];
  metadata: Array<InputMaybe<MetadataSchemaInput>>;
  name: Scalars['String']['input'];
};


export type MutationCreateExperimentArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationCreateVariantArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  experimentId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationPingHeartbeatArgs = {
  sessionId: Scalars['String']['input'];
  variantId: Scalars['Int']['input'];
};


export type MutationSaveEmailAddressArgs = {
  email: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAverageSessionTime: Scalars['Int']['output'];
  getConversionFunnel: Array<Scalars['Int']['output']>;
  getEventByCountryCity: Array<EventAnalyticsCountryCity>;
  getEventCount: Array<EventAnalyticsData>;
  getEventData: Array<Event>;
  getEventDataByFilter: Array<EventAnalyticsData>;
  getEventSchema?: Maybe<EventSchema>;
  getEventSchemas: Array<EventSchema>;
  getExperiment: Experiment;
  getUniqueVisitorCount: Scalars['Int']['output'];
  getUniqueVisitorsInterval: Array<UniqueVisitorDate>;
  getVariants: Array<Variant>;
};


export type QueryGetConversionFunnelArgs = {
  conversionSequence: Array<Scalars['Int']['input']>;
  filter: ConverstionFunnelFilter;
};


export type QueryGetEventCountArgs = {
  eventSchemaId: Scalars['Int']['input'];
};


export type QueryGetEventDataByFilterArgs = {
  filter: EventDataFilter;
};


export type QueryGetEventSchemaArgs = {
  eventSchemaId: Scalars['Int']['input'];
};


export type QueryGetExperimentArgs = {
  experimentId: Scalars['Int']['input'];
};


export type QueryGetUniqueVisitorCountArgs = {
  date: Scalars['String']['input'];
};


export type QueryGetUniqueVisitorsIntervalArgs = {
  endingDate: Scalars['String']['input'];
  startingDate: Scalars['String']['input'];
};


export type QueryGetVariantsArgs = {
  experimentId: Scalars['Int']['input'];
};

export type UniqueVisitorDate = {
  __typename?: 'UniqueVisitorDate';
  count: Scalars['Int']['output'];
  date: Scalars['String']['output'];
  index: Scalars['Int']['output'];
};

export type Variant = {
  __typename?: 'Variant';
  createdAt: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  eventDatas: Array<Event>;
  experiment: Experiment;
  name: Scalars['String']['output'];
  variantId: Scalars['Int']['output'];
};

export type VariantEventData = {
  __typename?: 'VariantEventData';
  countValue: Scalars['Int']['output'];
  eventMetadatas?: Maybe<Array<MetadataEventGrouping>>;
  variantId: Scalars['Int']['output'];
};

export type EventRequestFilter = {
  operator?: InputMaybe<Operator>;
  type?: InputMaybe<EventRequestFilterFields>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export enum EventRequestFilterFields {
  Country = 'COUNTRY',
  Device = 'DEVICE'
}

export type MetadataFilter = {
  metadataOperator: MetadataOperator;
  operator?: InputMaybe<Operator>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type MetadataOperator = {
  metadataSchemaId: Scalars['Int']['input'];
  operation?: InputMaybe<MetadataPropertyOperations>;
};

export enum Operator {
  Equals = 'EQUALS',
  GreaterThan = 'GREATER_THAN',
  GreaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
  LessThan = 'LESS_THAN',
  LessThanOrEqual = 'LESS_THAN_OR_EQUAL'
}

export type SequenceMetadataFilter = {
  metadataFilter: Array<MetadataFilter>;
  sequenceIndex: Scalars['Int']['input'];
};

export type TimestampFilter = {
  from: Scalars['Int']['input'];
  to: Scalars['Int']['input'];
};

export type GetEventByCountryCityQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventByCountryCityQuery = { __typename?: 'Query', getEventByCountryCity: Array<{ __typename?: 'EventAnalyticsCountryCity', country: string, city?: string | null, count: number }> };

export type GetEventSchemaCountByIdQueryVariables = Exact<{
  eventSchemaId: Scalars['Int']['input'];
}>;


export type GetEventSchemaCountByIdQuery = { __typename?: 'Query', getEventCount: Array<{ __typename?: 'EventAnalyticsData', date: string, data: Array<{ __typename?: 'VariantEventData', countValue: number, variantId: number }> }> };

export type GetEventSchemasQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventSchemasQuery = { __typename?: 'Query', getEventSchemas: Array<{ __typename?: 'EventSchema', eventSchemaId: number, eventName: string }> };

export type GetAverageSessionTimeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAverageSessionTimeQuery = { __typename?: 'Query', getAverageSessionTime: number };

export type GetUniqueVisitorCountQueryVariables = Exact<{
  date: Scalars['String']['input'];
}>;


export type GetUniqueVisitorCountQuery = { __typename?: 'Query', getUniqueVisitorCount: number };

export type GetUniqueVisitorsIntervalQueryVariables = Exact<{
  startingDate: Scalars['String']['input'];
  endingDate: Scalars['String']['input'];
}>;


export type GetUniqueVisitorsIntervalQuery = { __typename?: 'Query', getUniqueVisitorsInterval: Array<{ __typename?: 'UniqueVisitorDate', date: string, count: number }> };

export type GetEventCountQueryVariables = Exact<{
  eventSchemaId: Scalars['Int']['input'];
}>;


export type GetEventCountQuery = { __typename?: 'Query', getEventCount: Array<{ __typename?: 'EventAnalyticsData', date: string, data: Array<{ __typename?: 'VariantEventData', countValue: number, variantId: number }> }> };

export type GetEventQueryVariables = Exact<{
  eventSchemaId?: InputMaybe<Scalars['Int']['input']>;
  metadataFilter: Array<MetadataFilter> | MetadataFilter;
  groupByMetadataSchemaIds?: InputMaybe<Array<MetadataSchemaGroupBy> | MetadataSchemaGroupBy>;
  variantFilter?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type GetEventQuery = { __typename?: 'Query', getEventDataByFilter: Array<{ __typename?: 'EventAnalyticsData', date: string, index: number, data: Array<{ __typename?: 'VariantEventData', variantId: number, countValue: number, eventMetadatas?: Array<{ __typename?: 'MetadataEventGrouping', metadataSchemaId: number, value: string }> | null }> }> };

export type GetEventSchemaQueryVariables = Exact<{
  eventSchemaId: Scalars['Int']['input'];
}>;


export type GetEventSchemaQuery = { __typename?: 'Query', getEventSchema?: { __typename?: 'EventSchema', eventName: string, eventSchemaId: number, eventMetadata: Array<{ __typename?: 'MetadataSchema', metadataId: number, metadataName: string, metadataType: MetadataType }> } | null };

export type GetVariantsQueryVariables = Exact<{
  experimentId: Scalars['Int']['input'];
}>;


export type GetVariantsQuery = { __typename?: 'Query', getVariants: Array<{ __typename?: 'Variant', name: string, variantId: number }> };


export const GetEventByCountryCityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventByCountryCity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEventByCountryCity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<GetEventByCountryCityQuery, GetEventByCountryCityQueryVariables>;
export const GetEventSchemaCountByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventSchemaCountById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventSchemaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEventCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventSchemaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventSchemaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countValue"}},{"kind":"Field","name":{"kind":"Name","value":"variantId"}}]}}]}}]}}]} as unknown as DocumentNode<GetEventSchemaCountByIdQuery, GetEventSchemaCountByIdQueryVariables>;
export const GetEventSchemasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventSchemas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEventSchemas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventSchemaId"}},{"kind":"Field","name":{"kind":"Name","value":"eventName"}}]}}]}}]} as unknown as DocumentNode<GetEventSchemasQuery, GetEventSchemasQueryVariables>;
export const GetAverageSessionTimeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAverageSessionTime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAverageSessionTime"}}]}}]} as unknown as DocumentNode<GetAverageSessionTimeQuery, GetAverageSessionTimeQueryVariables>;
export const GetUniqueVisitorCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUniqueVisitorCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUniqueVisitorCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}]}]}}]} as unknown as DocumentNode<GetUniqueVisitorCountQuery, GetUniqueVisitorCountQueryVariables>;
export const GetUniqueVisitorsIntervalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUniqueVisitorsInterval"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startingDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endingDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUniqueVisitorsInterval"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"startingDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startingDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endingDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endingDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<GetUniqueVisitorsIntervalQuery, GetUniqueVisitorsIntervalQueryVariables>;
export const GetEventCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEventCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventSchemaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEventCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventSchemaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventSchemaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countValue"}},{"kind":"Field","name":{"kind":"Name","value":"variantId"}}]}}]}}]}}]} as unknown as DocumentNode<GetEventCountQuery, GetEventCountQueryVariables>;
export const GetEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventSchemaId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"metadataFilter"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"metadataFilter"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupByMetadataSchemaIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MetadataSchemaGroupBy"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"variantFilter"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEventDataByFilter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eventSchemaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventSchemaId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"metadataFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"metadataFilter"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"groupByMetadataSchemaIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupByMetadataSchemaIds"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"variantFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"variantFilter"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"variantId"}},{"kind":"Field","name":{"kind":"Name","value":"countValue"}},{"kind":"Field","name":{"kind":"Name","value":"eventMetadatas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metadataSchemaId"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetEventQuery, GetEventQueryVariables>;
export const GetEventSchemaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEventSchema"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventSchemaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEventSchema"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventSchemaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventSchemaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventName"}},{"kind":"Field","name":{"kind":"Name","value":"eventSchemaId"}},{"kind":"Field","name":{"kind":"Name","value":"eventMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metadataId"}},{"kind":"Field","name":{"kind":"Name","value":"metadataName"}},{"kind":"Field","name":{"kind":"Name","value":"metadataType"}}]}}]}}]}}]} as unknown as DocumentNode<GetEventSchemaQuery, GetEventSchemaQueryVariables>;
export const GetVariantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getVariants"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"experimentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVariants"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"experimentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"experimentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"variantId"}}]}}]}}]} as unknown as DocumentNode<GetVariantsQuery, GetVariantsQueryVariables>;