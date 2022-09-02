import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type RequireFields<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
    Date: any;
    /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
    DateTime: any;
    EmailAddress: any;
    /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    JSON: any;
    NonNegativeFloat: any;
    /** Integers that will have a value of 0 or more. */
    NonNegativeInt: any;
    PhoneNumber: any;
    /** Integers that will have a value greater than 0. */
    PositiveInt: any;
};
export declare type AcceptedContentType = {
    __typename?: 'AcceptedContentType';
    contentType: Scalars['String'];
    extensionLabel?: Maybe<Scalars['String']>;
};
export declare type AcceptedContentTypeInput = {
    contentType: Scalars['String'];
    extensionLabel?: Maybe<Scalars['String']>;
};
export declare type AccessToken = {
    __typename?: 'AccessToken';
    createdAt: Scalars['DateTime'];
    id: Scalars['String'];
    lastUsed?: Maybe<Scalars['DateTime']>;
    name?: Maybe<Scalars['String']>;
    secret?: Maybe<Scalars['String']>;
    userId: Scalars['ID'];
};
export declare type AccessTokenMutations = {
    __typename?: 'AccessTokenMutations';
    create: AccessToken;
    delete: Scalars['Int'];
};
export declare type AccessTokenMutationsCreateArgs = {
    input: CreateAccessTokenInput;
    userId: Scalars['ID'];
};
export declare type AccessTokenMutationsDeleteArgs = {
    id: Scalars['String'];
};
export declare type AddLanguageInput = {
    code: Scalars['String'];
    name: Scalars['String'];
};
export declare type Address = {
    __typename?: 'Address';
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['EmailAddress']>;
    firstName?: Maybe<Scalars['String']>;
    id?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    middleName?: Maybe<Scalars['String']>;
    phone?: Maybe<Scalars['String']>;
    postalCode?: Maybe<Scalars['String']>;
    state?: Maybe<Scalars['String']>;
    street?: Maybe<Scalars['String']>;
    street2?: Maybe<Scalars['String']>;
    streetNumber?: Maybe<Scalars['String']>;
    type: AddressType;
};
export declare type AddressInput = {
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['EmailAddress']>;
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    middleName?: Maybe<Scalars['String']>;
    phone?: Maybe<Scalars['String']>;
    postalCode?: Maybe<Scalars['String']>;
    state?: Maybe<Scalars['String']>;
    street?: Maybe<Scalars['String']>;
    street2?: Maybe<Scalars['String']>;
    streetNumber?: Maybe<Scalars['String']>;
    type: AddressType;
};
export declare enum AddressType {
    Billing = "billing",
    Delivery = "delivery",
    Other = "other"
}
export declare type ApiCallMetrics = IObjectMetrics & {
    __typename?: 'ApiCallMetrics';
    count: Scalars['Int'];
};
export declare type ApiCallMetricsCountArgs = {
    end?: Maybe<Scalars['DateTime']>;
    start?: Maybe<Scalars['DateTime']>;
};
export declare enum AuthenticationMethod {
    AccessTokenPair = "accessTokenPair",
    None = "none",
    StaticToken = "staticToken"
}
export declare enum BandwidthUnit {
    Bytes = "Bytes",
    GiB = "GiB",
    KiB = "KiB",
    MiB = "MiB"
}
export declare type BandwidthUsageMetrics = {
    __typename?: 'BandwidthUsageMetrics';
    total: Scalars['Float'];
};
export declare type BandwidthUsageMetricsTotalArgs = {
    end?: Maybe<Scalars['DateTime']>;
    start?: Maybe<Scalars['DateTime']>;
    type?: Maybe<BandwidthUsageType>;
    unit?: BandwidthUnit;
};
export declare enum BandwidthUsageType {
    ApiCall = "ApiCall",
    Media = "Media"
}
export declare type BooleanContent = {
    __typename?: 'BooleanContent';
    value?: Maybe<Scalars['Boolean']>;
};
export declare type BooleanContentInput = {
    value: Scalars['Boolean'];
};
export declare type BulkCreateDocumentInput = {
    components?: Maybe<Array<ComponentInput>>;
    createdAt?: Maybe<Scalars['DateTime']>;
    externalReference?: Maybe<Scalars['String']>;
    name: Scalars['String'];
    topicIds?: Maybe<Array<Scalars['ID']>>;
    tree?: Maybe<TreeNodeInput>;
};
export declare type BulkCreateFolderInput = {
    components?: Maybe<Array<ComponentInput>>;
    createdAt?: Maybe<Scalars['DateTime']>;
    externalReference?: Maybe<Scalars['String']>;
    name: Scalars['String'];
    topicIds?: Maybe<Array<Scalars['ID']>>;
    tree?: Maybe<TreeNodeInput>;
};
export declare type BulkCreateProductInput = {
    components?: Maybe<Array<ComponentInput>>;
    createdAt?: Maybe<Scalars['DateTime']>;
    externalReference?: Maybe<Scalars['String']>;
    isSubscriptionOnly?: Maybe<Scalars['Boolean']>;
    isVirtual?: Maybe<Scalars['Boolean']>;
    name: Scalars['String'];
    topicIds?: Maybe<Array<Scalars['ID']>>;
    tree?: Maybe<TreeNodeInput>;
    variants: Array<CreateProductVariantInput>;
    vatTypeId: Scalars['ID'];
};
export declare type BulkCreateShapeInput = {
    components?: Maybe<Array<ShapeComponentInput>>;
    identifier?: Maybe<Scalars['String']>;
    meta?: Maybe<Array<KeyValuePairInput>>;
    name: Scalars['String'];
    type: ShapeType;
};
export declare type BulkCreateTenantInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    defaults?: Maybe<TenantDefaultsInput>;
    identifier: Scalars['String'];
    isActive?: Maybe<Scalars['Boolean']>;
    isTrial?: Maybe<Scalars['Boolean']>;
    logo?: Maybe<ImageInput>;
    name: Scalars['String'];
    shapes?: Maybe<Array<BulkCreateShapeInput>>;
    vatTypes?: Maybe<Array<BulkCreateVatTypeInput>>;
};
export declare type BulkCreateTopicInput = {
    children?: Maybe<Array<CreateChildTopicInput>>;
    name: Scalars['String'];
    parentId?: Maybe<Scalars['ID']>;
    pathIdentifier?: Maybe<Scalars['String']>;
};
export declare type BulkCreateUserInput = {
    companyName?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    firstName?: Maybe<Scalars['String']>;
    isAdmin?: Maybe<Scalars['Boolean']>;
    lastName?: Maybe<Scalars['String']>;
    marketingEmailConsentedAt?: Maybe<Scalars['DateTime']>;
    sub?: Maybe<Scalars['String']>;
    tocReadAt?: Maybe<Scalars['DateTime']>;
};
export declare type BulkCreateVatTypeInput = {
    name: Scalars['String'];
    percent: Scalars['Float'];
    tenantId: Scalars['ID'];
};
export declare type CashPayment = PaymentType & {
    __typename?: 'CashPayment';
    cash?: Maybe<Scalars['String']>;
    provider: PaymentProvider;
};
export declare type CashPaymentInput = {
    cash?: Maybe<Scalars['String']>;
};
export declare type Component = {
    __typename?: 'Component';
    componentId: Scalars['String'];
    content?: Maybe<ComponentContent>;
    name: Scalars['String'];
    type: ComponentType;
};
export declare type ComponentChoiceComponentConfig = {
    __typename?: 'ComponentChoiceComponentConfig';
    choices: Array<ShapeComponent>;
};
export declare type ComponentChoiceComponentConfigInput = {
    choices: Array<ShapeComponentInput>;
};
export declare type ComponentChoiceContent = {
    __typename?: 'ComponentChoiceContent';
    selectedComponent: Component;
};
export declare type ComponentConfig = ComponentChoiceComponentConfig | ContentChunkComponentConfig | FilesComponentConfig | ItemRelationsComponentConfig | NumericComponentConfig | PropertiesTableComponentConfig | SelectionComponentConfig;
export declare type ComponentConfigInput = {
    componentChoice?: Maybe<ComponentChoiceComponentConfigInput>;
    contentChunk?: Maybe<ContentChunkComponentConfigInput>;
    files?: Maybe<FilesComponentConfigInput>;
    itemRelations?: Maybe<ItemRelationsComponentConfigInput>;
    numeric?: Maybe<NumericComponentConfigInput>;
    propertiesTable?: Maybe<PropertiesTableComponentConfigInput>;
    selection?: Maybe<SelectionComponentConfigInput>;
};
export declare type ComponentContent = BooleanContent | ComponentChoiceContent | ContentChunkContent | DatetimeContent | FileContent | GridRelationsContent | ImageContent | ItemRelationsContent | LocationContent | NumericContent | ParagraphCollectionContent | PropertiesTableContent | RichTextContent | SelectionContent | SingleLineContent | VideoContent;
export declare type ComponentInput = {
    boolean?: Maybe<BooleanContentInput>;
    componentChoice?: Maybe<ComponentInput>;
    componentId: Scalars['String'];
    contentChunk?: Maybe<ContentChunkContentInput>;
    datetime?: Maybe<DatetimeContentInput>;
    files?: Maybe<Array<FileInput>>;
    gridRelations?: Maybe<GridRelationsContentInput>;
    images?: Maybe<Array<ImageInput>>;
    itemRelations?: Maybe<ItemRelationsContentInput>;
    location?: Maybe<LocationContentInput>;
    numeric?: Maybe<NumericComponentContentInput>;
    paragraphCollection?: Maybe<ParagraphCollectionContentInput>;
    propertiesTable?: Maybe<PropertiesTableContentInput>;
    richText?: Maybe<RichTextContentInput>;
    selection?: Maybe<SelectionComponentContentInput>;
    singleLine?: Maybe<SingleLineContentInput>;
    videos?: Maybe<Array<VideoInput>>;
};
export declare enum ComponentType {
    Boolean = "boolean",
    ComponentChoice = "componentChoice",
    ContentChunk = "contentChunk",
    Datetime = "datetime",
    Files = "files",
    GridRelations = "gridRelations",
    Images = "images",
    ItemRelations = "itemRelations",
    Location = "location",
    Numeric = "numeric",
    ParagraphCollection = "paragraphCollection",
    PropertiesTable = "propertiesTable",
    RichText = "richText",
    Selection = "selection",
    SingleLine = "singleLine",
    Videos = "videos"
}
export declare type ContentChunkComponentConfig = {
    __typename?: 'ContentChunkComponentConfig';
    components: Array<ShapeComponent>;
    repeatable: Scalars['Boolean'];
};
export declare type ContentChunkComponentConfigInput = {
    components: Array<ShapeComponentInput>;
    repeatable?: Maybe<Scalars['Boolean']>;
};
export declare type ContentChunkContent = {
    __typename?: 'ContentChunkContent';
    chunks: Array<Array<Component>>;
};
export declare type ContentChunkContentInput = {
    chunks: Array<Array<ComponentInput>>;
};
export declare type ContractSubscriptionPlanReferenceInput = {
    identifier: Scalars['String'];
    periodId: Scalars['ID'];
};
export declare type CreateAccessTokenInput = {
    name?: Maybe<Scalars['String']>;
};
export declare type CreateChildTopicInput = {
    children?: Maybe<Array<CreateChildTopicInput>>;
    name: Scalars['String'];
    pathIdentifier?: Maybe<Scalars['String']>;
};
export declare type CreateCustomerAddressInput = {
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    postalCode?: Maybe<Scalars['String']>;
    state?: Maybe<Scalars['String']>;
    street?: Maybe<Scalars['String']>;
    street2?: Maybe<Scalars['String']>;
    streetNumber?: Maybe<Scalars['String']>;
    type: AddressType;
};
export declare type CreateCustomerInput = {
    addresses?: Maybe<Array<CreateCustomerAddressInput>>;
    companyName?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    externalReferences?: Maybe<Array<KeyValuePairInput>>;
    firstName: Scalars['String'];
    identifier?: Maybe<Scalars['String']>;
    lastName: Scalars['String'];
    meta?: Maybe<Array<KeyValuePairInput>>;
    middleName?: Maybe<Scalars['String']>;
    phone?: Maybe<Scalars['String']>;
    taxNumber?: Maybe<Scalars['String']>;
    tenantId: Scalars['ID'];
};
/** Creates a new document. Note that the shapeId input has been deprecated and will be removed in a future release. */
export declare type CreateDocumentInput = {
    components?: Maybe<Array<ComponentInput>>;
    createdAt?: Maybe<Scalars['DateTime']>;
    externalReference?: Maybe<Scalars['String']>;
    name: Scalars['String'];
    shapeId?: Maybe<Scalars['ID']>;
    shapeIdentifier?: Maybe<Scalars['String']>;
    tenantId: Scalars['ID'];
    topicIds?: Maybe<Array<Scalars['ID']>>;
    tree?: Maybe<TreeNodeInput>;
};
export declare type CreateFolderInput = {
    components?: Maybe<Array<ComponentInput>>;
    createdAt?: Maybe<Scalars['DateTime']>;
    externalReference?: Maybe<Scalars['String']>;
    name: Scalars['String'];
    shapeIdentifier?: Maybe<Scalars['String']>;
    tenantId: Scalars['ID'];
    topicIds?: Maybe<Array<Scalars['ID']>>;
    tree?: Maybe<TreeNodeInput>;
};
export declare type CreateGridInput = {
    meta?: Maybe<Array<KeyValuePairInput>>;
    name: Scalars['String'];
    rows?: Maybe<Array<GridRowInput>>;
    tenantId: Scalars['ID'];
};
export declare type CreatePipelineInput = {
    name: Scalars['String'];
    stages?: Maybe<Array<CreatePipelineStageInput>>;
    tenantId: Scalars['ID'];
};
export declare type CreatePipelineStageInput = {
    name: Scalars['String'];
    placeNewOrders?: Maybe<Scalars['Boolean']>;
};
export declare type CreatePriceVariantInput = {
    currency?: Maybe<Scalars['String']>;
    identifier: Scalars['String'];
    name?: Maybe<Scalars['String']>;
    tenantId: Scalars['ID'];
};
export declare type CreateProductInput = {
    components?: Maybe<Array<ComponentInput>>;
    createdAt?: Maybe<Scalars['DateTime']>;
    externalReference?: Maybe<Scalars['String']>;
    isSubscriptionOnly?: Maybe<Scalars['Boolean']>;
    isVirtual?: Maybe<Scalars['Boolean']>;
    name: Scalars['String'];
    shapeIdentifier?: Maybe<Scalars['String']>;
    tenantId: Scalars['ID'];
    topicIds?: Maybe<Array<Scalars['ID']>>;
    tree?: Maybe<TreeNodeInput>;
    variants: Array<CreateProductVariantInput>;
    vatTypeId: Scalars['ID'];
};
export declare type CreateProductSubscriptionAddressInput = {
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['EmailAddress']>;
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    middleName?: Maybe<Scalars['String']>;
    phone?: Maybe<Scalars['String']>;
    postalCode?: Maybe<Scalars['String']>;
    state?: Maybe<Scalars['String']>;
    street?: Maybe<Scalars['String']>;
    street2?: Maybe<Scalars['String']>;
    streetNumber?: Maybe<Scalars['String']>;
    type: AddressType;
};
export declare type CreateProductSubscriptionInput = {
    addresses?: Maybe<Array<CreateProductSubscriptionAddressInput>>;
    customerIdentifier: Scalars['String'];
    initial?: Maybe<CreateProductSubscriptionPhaseInput>;
    item: CreateProductSubscriptionItemInput;
    meteredVariables?: Maybe<Array<CreateProductSubscriptionMeteredVariableInput>>;
    payment?: Maybe<PaymentInput>;
    recurring: CreateProductSubscriptionPhaseInput;
    status: CreateProductSubscriptionStatusInput;
    subscriptionPlan: ProductSubscriptionPlanReferenceInput;
    tenantId: Scalars['ID'];
};
export declare type CreateProductSubscriptionItemInput = {
    imageUrl?: Maybe<Scalars['String']>;
    meta?: Maybe<Array<KeyValuePairInput>>;
    name: Scalars['String'];
    sku: Scalars['String'];
};
export declare type CreateProductSubscriptionMeteredVariableInput = {
    id: Scalars['ID'];
    tierType: TierType;
    tiers: Array<CreateProductSubscriptionMeteredVariableTierInput>;
};
export declare type CreateProductSubscriptionMeteredVariableTierInput = {
    currency: Scalars['String'];
    price: Scalars['Float'];
    threshold: Scalars['Int'];
};
export declare type CreateProductSubscriptionPhaseInput = {
    currency: Scalars['String'];
    price: Scalars['Float'];
};
export declare type CreateProductSubscriptionStatusInput = {
    activeUntil?: Maybe<Scalars['DateTime']>;
    currency: Scalars['String'];
    price: Scalars['Float'];
    renewAt?: Maybe<Scalars['DateTime']>;
};
export declare type CreateProductVariantInput = {
    attributes?: Maybe<Array<ProductVariantAttributeInput>>;
    externalReference?: Maybe<Scalars['String']>;
    images?: Maybe<Array<ImageInput>>;
    isDefault: Scalars['Boolean'];
    name?: Maybe<Scalars['String']>;
    price?: Maybe<Scalars['Float']>;
    priceVariants?: Maybe<Array<PriceVariantReferenceInput>>;
    sku: Scalars['String'];
    stock?: Maybe<Scalars['Int']>;
    stockLocations?: Maybe<Array<StockLocationReferenceInput>>;
    subscriptionPlans?: Maybe<Array<SubscriptionPlanReferenceInput>>;
};
export declare type CreateShapeInput = {
    components?: Maybe<Array<ShapeComponentInput>>;
    identifier?: Maybe<Scalars['String']>;
    meta?: Maybe<Array<KeyValuePairInput>>;
    name: Scalars['String'];
    tenantId: Scalars['ID'];
    type: ShapeType;
};
export declare type CreateStockLocationInput = {
    identifier: Scalars['String'];
    name: Scalars['String'];
    settings?: Maybe<StockLocationSettingsInput>;
    tenantId: Scalars['ID'];
};
export declare type CreateSubscriptionContractAddressInput = {
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['EmailAddress']>;
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    middleName?: Maybe<Scalars['String']>;
    phone?: Maybe<Scalars['String']>;
    postalCode?: Maybe<Scalars['String']>;
    state?: Maybe<Scalars['String']>;
    street?: Maybe<Scalars['String']>;
    street2?: Maybe<Scalars['String']>;
    streetNumber?: Maybe<Scalars['String']>;
    type: AddressType;
};
export declare type CreateSubscriptionContractInput = {
    addresses?: Maybe<Array<CreateSubscriptionContractAddressInput>>;
    customerIdentifier: Scalars['String'];
    initial?: Maybe<CreateSubscriptionContractPhaseInput>;
    item: CreateSubscriptionContractItemInput;
    payment?: Maybe<PaymentInput>;
    recurring: CreateSubscriptionContractPhaseInput;
    status: CreateSubscriptionContractStatusInput;
    subscriptionPlan: ContractSubscriptionPlanReferenceInput;
    tenantId: Scalars['ID'];
};
export declare type CreateSubscriptionContractItemInput = {
    imageUrl?: Maybe<Scalars['String']>;
    meta?: Maybe<Array<KeyValuePairInput>>;
    name: Scalars['String'];
    sku: Scalars['String'];
};
export declare type CreateSubscriptionContractMeteredVariableReferenceInput = {
    id: Scalars['ID'];
    tierType: TierType;
    tiers: Array<CreateSubscriptionContractMeteredVariableTierInput>;
};
export declare type CreateSubscriptionContractMeteredVariableTierInput = {
    currency: Scalars['String'];
    price: Scalars['Float'];
    threshold: Scalars['Int'];
};
export declare type CreateSubscriptionContractPhaseInput = {
    currency: Scalars['String'];
    meteredVariables?: Maybe<Array<CreateSubscriptionContractMeteredVariableReferenceInput>>;
    price: Scalars['Float'];
};
export declare type CreateSubscriptionContractStatusInput = {
    activeUntil?: Maybe<Scalars['DateTime']>;
    currency: Scalars['String'];
    price: Scalars['Float'];
    renewAt?: Maybe<Scalars['DateTime']>;
};
export declare type CreateSubscriptionPlanInput = {
    identifier: Scalars['String'];
    meteredVariables?: Maybe<Array<SubscriptionPlanMeteredVariableInput>>;
    name?: Maybe<Scalars['String']>;
    periods: Array<SubscriptionPlanPeriodInput>;
    tenantId: Scalars['ID'];
};
export declare type CreateTenantInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    defaults?: Maybe<TenantDefaultsInput>;
    identifier: Scalars['String'];
    isActive?: Maybe<Scalars['Boolean']>;
    isTrial?: Maybe<Scalars['Boolean']>;
    logo?: Maybe<ImageInput>;
    meta?: Maybe<Array<KeyValuePairInput>>;
    name: Scalars['String'];
    shapes?: Maybe<Array<BulkCreateShapeInput>>;
    vatTypes?: Maybe<Array<BulkCreateVatTypeInput>>;
};
export declare type CreateTopicInput = {
    children?: Maybe<Array<CreateChildTopicInput>>;
    name: Scalars['String'];
    parentId?: Maybe<Scalars['ID']>;
    pathIdentifier?: Maybe<Scalars['String']>;
    tenantId: Scalars['ID'];
};
export declare type CreateUserInput = {
    companyName?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    firstName?: Maybe<Scalars['String']>;
    isAdmin?: Maybe<Scalars['Boolean']>;
    lastName?: Maybe<Scalars['String']>;
    marketingEmailConsentedAt?: Maybe<Scalars['DateTime']>;
    sub: Array<Scalars['String']>;
    tocReadAt?: Maybe<Scalars['DateTime']>;
};
export declare type CreateVatTypeInput = {
    name: Scalars['String'];
    percent: Scalars['Float'];
    tenantId: Scalars['ID'];
};
export declare type CreateWebhookInput = {
    concern: Scalars['String'];
    event: Scalars['String'];
    graphqlQuery?: Maybe<Scalars['String']>;
    headers?: Maybe<Array<WebhookHeaderInput>>;
    method: HttpMethod;
    name: Scalars['String'];
    tenantId: Scalars['ID'];
    url: Scalars['String'];
};
export declare type CreateWebhookInvocationInput = {
    end?: Maybe<Scalars['DateTime']>;
    payload?: Maybe<Scalars['JSON']>;
    responseBody?: Maybe<Scalars['JSON']>;
    responseStatus?: Maybe<Scalars['Int']>;
    start?: Maybe<Scalars['DateTime']>;
};
export declare type CurrencySummary = {
    __typename?: 'CurrencySummary';
    currency?: Maybe<Scalars['String']>;
    value?: Maybe<Scalars['Float']>;
};
export declare type CurrencySummaryReport = {
    __typename?: 'CurrencySummaryReport';
    orders: Array<Maybe<CurrencySummary>>;
    sales: Array<Maybe<CurrencySummary>>;
};
export declare type CurrencySummaryReportOrdersArgs = {
    direction?: Maybe<SortDirection>;
    end?: Maybe<Scalars['DateTime']>;
    orderBy?: Maybe<Parameter>;
    start?: Maybe<Scalars['DateTime']>;
    tenantId: Scalars['ID'];
};
export declare type CurrencySummaryReportSalesArgs = {
    direction?: Maybe<SortDirection>;
    end?: Maybe<Scalars['DateTime']>;
    orderBy?: Maybe<Parameter>;
    start?: Maybe<Scalars['DateTime']>;
    tenantId: Scalars['ID'];
};
export declare type CustomPayment = PaymentType & {
    __typename?: 'CustomPayment';
    properties?: Maybe<Array<CustomProperties>>;
    provider: PaymentProvider;
};
export declare type CustomPaymentInput = {
    properties?: Maybe<Array<CustomPropertiesInput>>;
};
export declare type CustomProperties = {
    __typename?: 'CustomProperties';
    property: Scalars['String'];
    value?: Maybe<Scalars['String']>;
};
export declare type CustomPropertiesInput = {
    property: Scalars['String'];
    value?: Maybe<Scalars['String']>;
};
export declare type Customer = {
    __typename?: 'Customer';
    addresses?: Maybe<Array<Address>>;
    birthDate?: Maybe<Scalars['Date']>;
    companyName?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    externalReference?: Maybe<Scalars['String']>;
    externalReferences?: Maybe<Array<KeyValuePair>>;
    firstName?: Maybe<Scalars['String']>;
    identifier?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    meta?: Maybe<Array<KeyValuePair>>;
    metaProperty?: Maybe<Scalars['String']>;
    middleName?: Maybe<Scalars['String']>;
    phone?: Maybe<Scalars['String']>;
    taxNumber?: Maybe<Scalars['String']>;
    tenantId?: Maybe<Scalars['ID']>;
};
export declare type CustomerExternalReferenceArgs = {
    key: Scalars['String'];
};
export declare type CustomerMetaPropertyArgs = {
    key: Scalars['String'];
};
export declare type CustomerConnection = {
    __typename?: 'CustomerConnection';
    edges?: Maybe<Array<CustomerConnectionEdge>>;
    pageInfo: PageInfo;
};
export declare type CustomerConnectionEdge = {
    __typename?: 'CustomerConnectionEdge';
    cursor: Scalars['String'];
    node: Customer;
};
export declare type CustomerExternalReferenceInput = {
    key: Scalars['String'];
    value: Scalars['String'];
};
export declare type CustomerInput = {
    addresses?: Maybe<Array<AddressInput>>;
    birthDate?: Maybe<Scalars['DateTime']>;
    companyName?: Maybe<Scalars['String']>;
    firstName?: Maybe<Scalars['String']>;
    identifier?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    middleName?: Maybe<Scalars['String']>;
    taxNumber?: Maybe<Scalars['String']>;
};
export declare type CustomerMutations = {
    __typename?: 'CustomerMutations';
    create: Customer;
    createAddress: Customer;
    delete: Scalars['Int'];
    deleteAddress: Scalars['Int'];
    update: Customer;
    updateAddress: Customer;
};
export declare type CustomerMutationsCreateArgs = {
    input: CreateCustomerInput;
};
export declare type CustomerMutationsCreateAddressArgs = {
    identifier: Scalars['String'];
    input: CreateCustomerAddressInput;
    tenantId: Scalars['ID'];
};
export declare type CustomerMutationsDeleteArgs = {
    deleteSubscriptionContracts?: Maybe<Scalars['Boolean']>;
    identifier: Scalars['String'];
    tenantId: Scalars['ID'];
};
export declare type CustomerMutationsDeleteAddressArgs = {
    addressId: Scalars['String'];
    identifier: Scalars['String'];
    tenantId: Scalars['ID'];
};
export declare type CustomerMutationsUpdateArgs = {
    identifier: Scalars['String'];
    input: UpdateCustomerInput;
    tenantId: Scalars['ID'];
};
export declare type CustomerMutationsUpdateAddressArgs = {
    addressId: Scalars['String'];
    identifier: Scalars['String'];
    input: UpdateCustomerAddressInput;
    tenantId: Scalars['ID'];
};
export declare type CustomerQueries = {
    __typename?: 'CustomerQueries';
    get?: Maybe<Customer>;
    getMany?: Maybe<CustomerConnection>;
};
export declare type CustomerQueriesGetArgs = {
    externalReference?: Maybe<CustomerExternalReferenceInput>;
    identifier?: Maybe<Scalars['String']>;
    tenantId: Scalars['ID'];
};
export declare type CustomerQueriesGetManyArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    identifier?: Maybe<Scalars['ID']>;
    last?: Maybe<Scalars['Int']>;
    tenantId: Scalars['ID'];
};
export declare type DatetimeContent = {
    __typename?: 'DatetimeContent';
    datetime?: Maybe<Scalars['DateTime']>;
};
export declare type DatetimeContentInput = {
    datetime?: Maybe<Scalars['DateTime']>;
};
export declare type Discount = {
    __typename?: 'Discount';
    percent?: Maybe<Scalars['Float']>;
};
export declare type DiscountInput = {
    percent?: Maybe<Scalars['Float']>;
};
export declare type Document = Item & {
    __typename?: 'Document';
    components?: Maybe<Array<Component>>;
    createdAt?: Maybe<Scalars['DateTime']>;
    externalReference?: Maybe<Scalars['String']>;
    hasVersion?: Maybe<Scalars['Boolean']>;
    id: Scalars['ID'];
    language?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    relatingItems?: Maybe<Array<Item>>;
    shape?: Maybe<Shape>;
    tenantId: Scalars['ID'];
    topics?: Maybe<Array<Topic>>;
    tree?: Maybe<TreeNode>;
    type: ItemType;
    updatedAt?: Maybe<Scalars['DateTime']>;
    version?: Maybe<VersionedRecordInfo>;
};
export declare type DocumentHasVersionArgs = {
    versionLabel?: Maybe<VersionLabel>;
};
export declare type DocumentMutations = {
    __typename?: 'DocumentMutations';
    create: Document;
    delete: Scalars['Int'];
    publish: PublishInfo;
    unpublish?: Maybe<PublishInfo>;
    update: Document;
};
export declare type DocumentMutationsCreateArgs = {
    input: CreateDocumentInput;
    language: Scalars['String'];
};
export declare type DocumentMutationsDeleteArgs = {
    id: Scalars['ID'];
};
export declare type DocumentMutationsPublishArgs = {
    id: Scalars['ID'];
    includeDescendants?: Maybe<Scalars['Boolean']>;
    language: Scalars['String'];
};
export declare type DocumentMutationsUnpublishArgs = {
    id: Scalars['ID'];
    includeDescendants?: Maybe<Scalars['Boolean']>;
    language: Scalars['String'];
};
export declare type DocumentMutationsUpdateArgs = {
    id: Scalars['ID'];
    input: UpdateDocumentInput;
    language: Scalars['String'];
};
export declare type DocumentQueries = {
    __typename?: 'DocumentQueries';
    get?: Maybe<Document>;
};
export declare type DocumentQueriesGetArgs = {
    id: Scalars['ID'];
    language: Scalars['String'];
    versionLabel?: VersionLabel;
};
export declare type File = {
    __typename?: 'File';
    contentType?: Maybe<Scalars['String']>;
    key: Scalars['String'];
    meta?: Maybe<Array<KeyValuePair>>;
    metaProperty?: Maybe<Scalars['String']>;
    size?: Maybe<Scalars['Float']>;
    title?: Maybe<Scalars['String']>;
    url: Scalars['String'];
};
export declare type FileMetaPropertyArgs = {
    key: Scalars['String'];
};
export declare type FileContent = {
    __typename?: 'FileContent';
    files?: Maybe<Array<File>>;
};
export declare type FileContentInput = {
    files?: Maybe<Array<FileInput>>;
};
export declare type FileInput = {
    key: Scalars['String'];
    meta?: Maybe<Array<KeyValuePairInput>>;
    title?: Maybe<Scalars['String']>;
};
export declare type FileQueries = {
    __typename?: 'FileQueries';
    get?: Maybe<File>;
};
export declare type FileQueriesGetArgs = {
    key: Scalars['String'];
};
export declare type FileSize = {
    __typename?: 'FileSize';
    size: Scalars['Float'];
    unit: FileSizeUnit;
};
export declare enum FileSizeUnit {
    Bytes = "Bytes",
    GiB = "GiB",
    KiB = "KiB",
    MiB = "MiB"
}
export declare type FileUploadMutations = {
    __typename?: 'FileUploadMutations';
    generatePresignedRequest: PresignedUploadRequest;
};
export declare type FileUploadMutationsGeneratePresignedRequestArgs = {
    contentType: Scalars['String'];
    filename: Scalars['String'];
    tenantId: Scalars['ID'];
    type?: FileUploadType;
};
export declare enum FileUploadType {
    Media = "MEDIA",
    Static = "STATIC"
}
export declare type FilesComponentConfig = {
    __typename?: 'FilesComponentConfig';
    acceptedContentTypes?: Maybe<Array<AcceptedContentType>>;
    max?: Maybe<Scalars['Int']>;
    maxFileSize?: Maybe<FileSize>;
    min?: Maybe<Scalars['Int']>;
};
export declare type FilesComponentConfigInput = {
    acceptedContentTypes?: Maybe<Array<AcceptedContentTypeInput>>;
    max?: Maybe<Scalars['Int']>;
    maxFileSize?: Maybe<MaxFileSizeInput>;
    min?: Maybe<Scalars['Int']>;
};
export declare type Folder = Item & {
    __typename?: 'Folder';
    components?: Maybe<Array<Component>>;
    createdAt?: Maybe<Scalars['DateTime']>;
    externalReference?: Maybe<Scalars['String']>;
    hasVersion?: Maybe<Scalars['Boolean']>;
    id: Scalars['ID'];
    language?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    relatingItems?: Maybe<Array<Item>>;
    shape?: Maybe<Shape>;
    tenantId: Scalars['ID'];
    topics?: Maybe<Array<Topic>>;
    tree?: Maybe<TreeNode>;
    type: ItemType;
    updatedAt?: Maybe<Scalars['DateTime']>;
    version?: Maybe<VersionedRecordInfo>;
};
export declare type FolderHasVersionArgs = {
    versionLabel?: Maybe<VersionLabel>;
};
export declare type FolderMutations = {
    __typename?: 'FolderMutations';
    create: Folder;
    delete: Scalars['Int'];
    publish: PublishInfo;
    unpublish?: Maybe<PublishInfo>;
    update: Folder;
};
export declare type FolderMutationsCreateArgs = {
    input: CreateFolderInput;
    language: Scalars['String'];
};
export declare type FolderMutationsDeleteArgs = {
    id: Scalars['ID'];
};
export declare type FolderMutationsPublishArgs = {
    id: Scalars['ID'];
    includeDescendants?: Maybe<Scalars['Boolean']>;
    language: Scalars['String'];
};
export declare type FolderMutationsUnpublishArgs = {
    id: Scalars['ID'];
    includeDescendants?: Maybe<Scalars['Boolean']>;
    language: Scalars['String'];
};
export declare type FolderMutationsUpdateArgs = {
    id: Scalars['ID'];
    input: UpdateFolderInput;
    language: Scalars['String'];
};
export declare type FolderQueries = {
    __typename?: 'FolderQueries';
    get?: Maybe<Folder>;
};
export declare type FolderQueriesGetArgs = {
    id: Scalars['ID'];
    language: Scalars['String'];
    versionLabel?: VersionLabel;
};
export declare type FullTreeNodeInput = {
    itemId: Scalars['ID'];
    parentId: Scalars['ID'];
    position?: Maybe<Scalars['PositiveInt']>;
};
export declare type GenericPublishInput = {
    id: Scalars['ID'];
    type: ShapeType;
};
export declare type GetTopicByPathArguments = {
    path: Scalars['String'];
    tenantId: Scalars['ID'];
};
export declare type Grid = {
    __typename?: 'Grid';
    createdAt: Scalars['DateTime'];
    hasVersion: Scalars['Boolean'];
    id: Scalars['ID'];
    language: Scalars['String'];
    meta?: Maybe<Array<KeyValuePair>>;
    metaProperty?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    rows: Array<GridRow>;
    tenantId: Scalars['ID'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    version?: Maybe<VersionedRecordInfo>;
};
export declare type GridHasVersionArgs = {
    versionLabel?: Maybe<VersionLabel>;
};
export declare type GridMetaPropertyArgs = {
    key: Scalars['String'];
};
export declare type GridColumn = {
    __typename?: 'GridColumn';
    item?: Maybe<Item>;
    itemId?: Maybe<Scalars['ID']>;
    itemType?: Maybe<Scalars['String']>;
    layout?: Maybe<GridColumnLayout>;
    meta?: Maybe<Array<KeyValuePair>>;
    metaProperty?: Maybe<Scalars['String']>;
};
export declare type GridColumnMetaPropertyArgs = {
    key: Scalars['String'];
};
export declare type GridColumnInput = {
    itemId?: Maybe<Scalars['ID']>;
    layout?: Maybe<GridLayoutInput>;
    meta?: Maybe<Array<KeyValuePairInput>>;
};
export declare type GridColumnLayout = {
    __typename?: 'GridColumnLayout';
    colspan?: Maybe<Scalars['Int']>;
    rowspan?: Maybe<Scalars['Int']>;
};
export declare type GridLayoutInput = {
    colspan?: Maybe<Scalars['Int']>;
    rowspan?: Maybe<Scalars['Int']>;
};
export declare type GridMutations = {
    __typename?: 'GridMutations';
    create: Grid;
    delete: Scalars['Int'];
    publish: GridPublishInfo;
    unpublish?: Maybe<GridPublishInfo>;
    update: Grid;
};
export declare type GridMutationsCreateArgs = {
    input: CreateGridInput;
    language: Scalars['String'];
};
export declare type GridMutationsDeleteArgs = {
    id: Scalars['ID'];
};
export declare type GridMutationsPublishArgs = {
    id: Scalars['ID'];
    language: Scalars['String'];
};
export declare type GridMutationsUnpublishArgs = {
    id: Scalars['ID'];
    language: Scalars['String'];
};
export declare type GridMutationsUpdateArgs = {
    id: Scalars['ID'];
    input: UpdateGridInput;
    language: Scalars['String'];
};
export declare type GridPublishInfo = {
    __typename?: 'GridPublishInfo';
    id: Scalars['ID'];
    versionId: Scalars['ID'];
};
export declare type GridQueries = {
    __typename?: 'GridQueries';
    get?: Maybe<Grid>;
    getMany?: Maybe<Array<Grid>>;
};
export declare type GridQueriesGetArgs = {
    id: Scalars['ID'];
    language: Scalars['String'];
    versionLabel?: VersionLabel;
};
export declare type GridQueriesGetManyArgs = {
    language: Scalars['String'];
    tenantId?: Maybe<Scalars['ID']>;
    versionLabel?: VersionLabel;
};
export declare type GridRelationsContent = {
    __typename?: 'GridRelationsContent';
    grids?: Maybe<Array<Grid>>;
};
export declare type GridRelationsContentInput = {
    gridIds?: Maybe<Array<Scalars['ID']>>;
};
export declare type GridRow = {
    __typename?: 'GridRow';
    columns: Array<GridColumn>;
    meta?: Maybe<Array<KeyValuePair>>;
    metaProperty?: Maybe<Scalars['String']>;
};
export declare type GridRowMetaPropertyArgs = {
    key: Scalars['String'];
};
export declare type GridRowInput = {
    columns?: Maybe<Array<GridColumnInput>>;
    meta?: Maybe<Array<KeyValuePairInput>>;
};
export declare enum HttpMethod {
    Delete = "DELETE",
    Get = "GET",
    Patch = "PATCH",
    Post = "POST",
    Put = "PUT"
}
export declare type IObjectMetrics = {
    count: Scalars['Int'];
};
export declare type IObjectMetricsCountArgs = {
    end?: Maybe<Scalars['DateTime']>;
    start?: Maybe<Scalars['DateTime']>;
};
export declare type IObjectReports = {
    avg: Array<Maybe<ReportMetric>>;
    sum: Array<Maybe<ReportMetric>>;
    total: Scalars['Float'];
};
export declare type IObjectReportsAvgArgs = {
    direction?: Maybe<SortDirection>;
    end?: Maybe<Scalars['DateTime']>;
    limit?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Parameter>;
    resolution?: Maybe<Interval>;
    start?: Maybe<Scalars['DateTime']>;
};
export declare type IObjectReportsSumArgs = {
    direction?: Maybe<SortDirection>;
    end?: Maybe<Scalars['DateTime']>;
    limit?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Parameter>;
    resolution?: Maybe<Interval>;
    start?: Maybe<Scalars['DateTime']>;
};
export declare type IObjectReportsTotalArgs = {
    end?: Maybe<Scalars['DateTime']>;
    start?: Maybe<Scalars['DateTime']>;
};
export declare type IdentifierSuggestion = {
    __typename?: 'IdentifierSuggestion';
    isAvailable: Scalars['Boolean'];
    suggestion: Scalars['String'];
};
export declare type Image = {
    __typename?: 'Image';
    altText?: Maybe<Scalars['String']>;
    caption?: Maybe<RichTextContent>;
    key: Scalars['String'];
    meta?: Maybe<Array<KeyValuePair>>;
    metaProperty?: Maybe<Scalars['String']>;
    mimeType?: Maybe<Scalars['String']>;
    url?: Maybe<Scalars['String']>;
    variants?: Maybe<Array<ImageVariant>>;
};
export declare type ImageMetaPropertyArgs = {
    key: Scalars['String'];
};
export declare type ImageContent = {
    __typename?: 'ImageContent';
    images?: Maybe<Array<Image>>;
};
export declare type ImageInput = {
    altText?: Maybe<Scalars['String']>;
    caption?: Maybe<RichTextContentInput>;
    key: Scalars['String'];
    meta?: Maybe<Array<KeyValuePairInput>>;
    mimeType?: Maybe<Scalars['String']>;
};
export declare type ImageMutations = {
    __typename?: 'ImageMutations';
    registerVariants?: Maybe<Image>;
};
export declare type ImageMutationsRegisterVariantsArgs = {
    key: Scalars['String'];
    upsert?: Maybe<Scalars['Boolean']>;
    variants: Array<ImageVariantInput>;
};
export declare type ImageQueries = {
    __typename?: 'ImageQueries';
    get?: Maybe<Image>;
};
export declare type ImageQueriesGetArgs = {
    key: Scalars['String'];
};
export declare type ImageVariant = {
    __typename?: 'ImageVariant';
    height: Scalars['Int'];
    key: Scalars['String'];
    size?: Maybe<Scalars['Int']>;
    url: Scalars['String'];
    width: Scalars['Int'];
};
export declare type ImageVariantInput = {
    height?: Maybe<Scalars['Int']>;
    key: Scalars['String'];
    size?: Maybe<Scalars['Int']>;
    width?: Maybe<Scalars['Int']>;
};
export declare enum Interval {
    Annually = "ANNUALLY",
    Daily = "DAILY",
    Hourly = "HOURLY",
    Monthly = "MONTHLY"
}
export declare type InviteToken = {
    __typename?: 'InviteToken';
    createdAt: Scalars['DateTime'];
    createdBy?: Maybe<Scalars['ID']>;
    createdByUser?: Maybe<User>;
    expiresAt?: Maybe<Scalars['DateTime']>;
    id: Scalars['ID'];
    redeemedAt?: Maybe<Scalars['DateTime']>;
    redeemedBy: Scalars['ID'];
    redeemedByUser?: Maybe<User>;
    tenant: Tenant;
    tenantId: Scalars['ID'];
    token: Scalars['ID'];
};
export declare type InviteTokenMutations = {
    __typename?: 'InviteTokenMutations';
    create: InviteToken;
    redeem: InviteToken;
};
export declare type InviteTokenMutationsCreateArgs = {
    expiresAt?: Maybe<Scalars['DateTime']>;
    tenantId: Scalars['ID'];
};
export declare type InviteTokenMutationsRedeemArgs = {
    token: Scalars['ID'];
};
export declare type Item = {
    components?: Maybe<Array<Component>>;
    createdAt?: Maybe<Scalars['DateTime']>;
    externalReference?: Maybe<Scalars['String']>;
    hasVersion?: Maybe<Scalars['Boolean']>;
    id: Scalars['ID'];
    language?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    relatingItems?: Maybe<Array<Item>>;
    shape?: Maybe<Shape>;
    tenantId: Scalars['ID'];
    topics?: Maybe<Array<Topic>>;
    tree?: Maybe<TreeNode>;
    type: ItemType;
    updatedAt?: Maybe<Scalars['DateTime']>;
    version?: Maybe<VersionedRecordInfo>;
};
export declare type ItemHasVersionArgs = {
    versionLabel?: Maybe<VersionLabel>;
};
export declare type ItemMetrics = IObjectMetrics & {
    __typename?: 'ItemMetrics';
    count: Scalars['Int'];
};
export declare type ItemMetricsCountArgs = {
    end?: Maybe<Scalars['DateTime']>;
    start?: Maybe<Scalars['DateTime']>;
    type?: Maybe<ItemType>;
};
export declare type ItemMutations = {
    __typename?: 'ItemMutations';
    bulkPublish?: Maybe<Array<PublishInfo>>;
    bulkUnpublish?: Maybe<Array<PublishInfo>>;
    delete: Scalars['Int'];
    publish: PublishInfo;
    unpublish?: Maybe<PublishInfo>;
    updateComponent: Item;
};
export declare type ItemMutationsBulkPublishArgs = {
    ids?: Maybe<Array<Scalars['ID']>>;
    language: Scalars['String'];
};
export declare type ItemMutationsBulkUnpublishArgs = {
    ids?: Maybe<Array<Scalars['ID']>>;
    language: Scalars['String'];
};
export declare type ItemMutationsDeleteArgs = {
    id: Scalars['ID'];
};
export declare type ItemMutationsPublishArgs = {
    id: Scalars['ID'];
    includeDescendants?: Maybe<Scalars['Boolean']>;
    language: Scalars['String'];
};
export declare type ItemMutationsUnpublishArgs = {
    id: Scalars['ID'];
    includeDescendants?: Maybe<Scalars['Boolean']>;
    language: Scalars['String'];
};
export declare type ItemMutationsUpdateComponentArgs = {
    input: ComponentInput;
    itemId: Scalars['ID'];
    language: Scalars['String'];
};
export declare type ItemQueries = {
    __typename?: 'ItemQueries';
    get?: Maybe<Item>;
    getMany?: Maybe<Array<Item>>;
};
export declare type ItemQueriesGetArgs = {
    id: Scalars['ID'];
    language: Scalars['String'];
    versionLabel?: VersionLabel;
};
export declare type ItemQueriesGetManyArgs = {
    externalReferences?: Maybe<Array<Scalars['String']>>;
    language: Scalars['String'];
    tenantId?: Maybe<Scalars['ID']>;
    versionLabel?: VersionLabel;
};
export declare type ItemRelationsComponentConfig = {
    __typename?: 'ItemRelationsComponentConfig';
    acceptedShapeIdentifiers?: Maybe<Array<Scalars['String']>>;
    max?: Maybe<Scalars['Int']>;
    min?: Maybe<Scalars['Int']>;
};
export declare type ItemRelationsComponentConfigInput = {
    acceptedShapeIdentifiers?: Maybe<Array<Scalars['String']>>;
    max?: Maybe<Scalars['Int']>;
    min?: Maybe<Scalars['Int']>;
};
export declare type ItemRelationsContent = {
    __typename?: 'ItemRelationsContent';
    items?: Maybe<Array<Item>>;
};
export declare type ItemRelationsContentInput = {
    itemIds?: Maybe<Array<Scalars['ID']>>;
};
export declare enum ItemType {
    Document = "document",
    Folder = "folder",
    Product = "product"
}
export declare type KeyValuePair = {
    __typename?: 'KeyValuePair';
    key: Scalars['String'];
    value?: Maybe<Scalars['String']>;
};
export declare type KeyValuePairInput = {
    key: Scalars['String'];
    value?: Maybe<Scalars['String']>;
};
export declare type KlarnaPayment = PaymentType & {
    __typename?: 'KlarnaPayment';
    id?: Maybe<Scalars['String']>;
    metadata?: Maybe<Scalars['String']>;
    orderId?: Maybe<Scalars['String']>;
    provider: PaymentProvider;
    recurringToken?: Maybe<Scalars['String']>;
};
export declare type KlarnaPaymentInput = {
    klarna?: Maybe<Scalars['String']>;
    metadata?: Maybe<Scalars['String']>;
    orderId?: Maybe<Scalars['String']>;
    recurringToken?: Maybe<Scalars['String']>;
};
export declare type Language = {
    __typename?: 'Language';
    code: Scalars['String'];
    name: Scalars['String'];
    system: Scalars['Boolean'];
};
export declare type LanguageMutations = {
    __typename?: 'LanguageMutations';
    add?: Maybe<Array<Language>>;
    remove?: Maybe<Array<Language>>;
    update?: Maybe<Array<Language>>;
};
export declare type LanguageMutationsAddArgs = {
    input: AddLanguageInput;
    tenantId: Scalars['ID'];
};
export declare type LanguageMutationsRemoveArgs = {
    code: Scalars['String'];
    tenantId: Scalars['ID'];
};
export declare type LanguageMutationsUpdateArgs = {
    code: Scalars['String'];
    input: UpdateLanguageInput;
    tenantId: Scalars['ID'];
};
export declare type LocationContent = {
    __typename?: 'LocationContent';
    lat?: Maybe<Scalars['Float']>;
    long?: Maybe<Scalars['Float']>;
};
export declare type LocationContentInput = {
    lat?: Maybe<Scalars['Float']>;
    long?: Maybe<Scalars['Float']>;
};
export declare type MaxFileSizeInput = {
    size: Scalars['Float'];
    unit: FileSizeUnit;
};
export declare type MeMutations = {
    __typename?: 'MeMutations';
    generateAccessToken?: Maybe<AccessToken>;
    update?: Maybe<User>;
};
export declare type MeMutationsGenerateAccessTokenArgs = {
    input: CreateAccessTokenInput;
};
export declare type MeMutationsUpdateArgs = {
    input?: Maybe<UpdateUserInput>;
};
export declare type Mutation = {
    __typename?: 'Mutation';
    accessToken?: Maybe<AccessTokenMutations>;
    customer?: Maybe<CustomerMutations>;
    document?: Maybe<DocumentMutations>;
    fileUpload?: Maybe<FileUploadMutations>;
    folder?: Maybe<FolderMutations>;
    grid?: Maybe<GridMutations>;
    image?: Maybe<ImageMutations>;
    inviteToken?: Maybe<InviteTokenMutations>;
    item?: Maybe<ItemMutations>;
    language?: Maybe<LanguageMutations>;
    me?: Maybe<MeMutations>;
    order?: Maybe<OrderMutations>;
    pipeline?: Maybe<PipelineMutations>;
    priceVariant: PriceVariantMutations;
    product?: Maybe<ProductMutations>;
    /** @deprecated productSubscription has been deprecated in favor of subscriptionContract */
    productSubscription: ProductSubscriptionMutations;
    shape?: Maybe<ShapeMutations>;
    stockLocation: StockLocationMutations;
    subscriptionContract: SubscriptionContractMutations;
    subscriptionPlan: SubscriptionPlanMutations;
    tenant?: Maybe<TenantMutations>;
    topic?: Maybe<TopicMutations>;
    tree?: Maybe<TreeMutations>;
    user?: Maybe<UserMutations>;
    vatType?: Maybe<VatTypeMutations>;
    video?: Maybe<VideoMutations>;
    webhook?: Maybe<WebhookMutations>;
};
export declare type NumericComponentConfig = {
    __typename?: 'NumericComponentConfig';
    decimalPlaces?: Maybe<Scalars['Int']>;
    units?: Maybe<Array<Scalars['String']>>;
};
export declare type NumericComponentConfigInput = {
    decimalPlaces?: Maybe<Scalars['Int']>;
    units?: Maybe<Array<Scalars['String']>>;
};
export declare type NumericComponentContentInput = {
    number: Scalars['Float'];
    unit?: Maybe<Scalars['String']>;
};
export declare type NumericContent = {
    __typename?: 'NumericContent';
    number: Scalars['Float'];
    unit?: Maybe<Scalars['String']>;
};
export declare enum Operation {
    Avg = "AVG",
    Sum = "SUM"
}
export declare type Order = {
    __typename?: 'Order';
    additionalInformation?: Maybe<Scalars['String']>;
    cart: Array<OrderItem>;
    createdAt: Scalars['DateTime'];
    customer?: Maybe<Customer>;
    id: Scalars['ID'];
    meta?: Maybe<Array<KeyValuePair>>;
    payment?: Maybe<Array<Payment>>;
    pipelines?: Maybe<Array<OrderPipeline>>;
    tenant: Tenant;
    tenantId: Scalars['ID'];
    total?: Maybe<Price>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type OrderConnection = {
    __typename?: 'OrderConnection';
    edges?: Maybe<Array<OrderConnectionEdge>>;
    pageInfo: PageInfo;
};
export declare type OrderConnectionEdge = {
    __typename?: 'OrderConnectionEdge';
    cursor: Scalars['String'];
    node: Order;
};
export declare type OrderItem = {
    __typename?: 'OrderItem';
    imageUrl?: Maybe<Scalars['String']>;
    meta?: Maybe<Array<KeyValuePair>>;
    name: Scalars['String'];
    orderId: Scalars['ID'];
    price?: Maybe<Price>;
    productId?: Maybe<Scalars['ID']>;
    /** @deprecated Product Subscription IDs have been deprecated in favor of Subscription Contract IDs. Querying for them will be removed in a future release. */
    productSubscriptionId?: Maybe<Scalars['ID']>;
    productVariantId?: Maybe<Scalars['ID']>;
    quantity: Scalars['NonNegativeInt'];
    sku?: Maybe<Scalars['String']>;
    subTotal?: Maybe<Price>;
    subscription?: Maybe<OrderItemSubscription>;
    subscriptionContractId?: Maybe<Scalars['ID']>;
};
export declare type OrderItemInput = {
    imageUrl?: Maybe<Scalars['String']>;
    meta?: Maybe<Array<KeyValuePairInput>>;
    name: Scalars['String'];
    price?: Maybe<PriceInput>;
    productId?: Maybe<Scalars['ID']>;
    productSubscriptionId?: Maybe<Scalars['ID']>;
    productVariantId?: Maybe<Scalars['ID']>;
    quantity: Scalars['NonNegativeInt'];
    sku?: Maybe<Scalars['String']>;
    subTotal?: Maybe<PriceInput>;
    subscriptionContractId?: Maybe<Scalars['ID']>;
};
export declare type OrderItemMeteredVariable = {
    __typename?: 'OrderItemMeteredVariable';
    id: Scalars['ID'];
    price: Scalars['Float'];
    usage: Scalars['Float'];
};
export declare type OrderItemSubscription = {
    __typename?: 'OrderItemSubscription';
    end?: Maybe<Scalars['DateTime']>;
    meteredVariables?: Maybe<Array<OrderItemMeteredVariable>>;
    name?: Maybe<Scalars['String']>;
    period: Scalars['PositiveInt'];
    start?: Maybe<Scalars['DateTime']>;
    unit: OrderItemSubscriptionPeriodUnit;
};
export declare enum OrderItemSubscriptionPeriodUnit {
    Day = "day",
    Hour = "hour",
    Minute = "minute",
    Month = "month",
    Week = "week",
    Year = "year"
}
export declare type OrderMetrics = IObjectMetrics & {
    __typename?: 'OrderMetrics';
    count: Scalars['Int'];
};
export declare type OrderMetricsCountArgs = {
    end?: Maybe<Scalars['DateTime']>;
    start?: Maybe<Scalars['DateTime']>;
};
export declare type OrderMutations = {
    __typename?: 'OrderMutations';
    delete: Scalars['Int'];
    removePipeline: Order;
    setPipelineStage: Order;
    update: Order;
};
export declare type OrderMutationsDeleteArgs = {
    id: Scalars['ID'];
};
export declare type OrderMutationsRemovePipelineArgs = {
    orderId: Scalars['ID'];
    pipelineId: Scalars['ID'];
};
export declare type OrderMutationsSetPipelineStageArgs = {
    orderId: Scalars['ID'];
    pipelineId: Scalars['ID'];
    stageId: Scalars['ID'];
};
export declare type OrderMutationsUpdateArgs = {
    id: Scalars['ID'];
    input: UpdateOrderInput;
};
export declare type OrderPipeline = {
    __typename?: 'OrderPipeline';
    pipeline: Pipeline;
    pipelineId: Scalars['ID'];
    stageId: Scalars['ID'];
};
export declare type OrderQueries = {
    __typename?: 'OrderQueries';
    get?: Maybe<Order>;
    getMany?: Maybe<OrderConnection>;
};
export declare type OrderQueriesGetArgs = {
    id: Scalars['ID'];
};
export declare type OrderQueriesGetManyArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    customerIdentifier?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    pipelineId?: Maybe<Scalars['ID']>;
    pipelineStageId?: Maybe<Scalars['ID']>;
    sort?: Maybe<SortDirection>;
    sortField?: Maybe<OrderSortField>;
    tenantId?: Maybe<Scalars['ID']>;
};
export declare enum OrderSortField {
    CreatedAt = "createdAt",
    UpdatedAt = "updatedAt"
}
export declare type OrdersReport = {
    __typename?: 'OrdersReport';
    avg: Array<Maybe<ReportMetric>>;
    sum: Array<Maybe<ReportMetric>>;
    total: Scalars['Int'];
};
export declare type OrdersReportAvgArgs = {
    direction?: Maybe<SortDirection>;
    end?: Maybe<Scalars['DateTime']>;
    filterBySKUs?: Maybe<Array<Maybe<Scalars['String']>>>;
    groupBy?: Maybe<Parameter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Parameter>;
    resolution?: Maybe<Interval>;
    start?: Maybe<Scalars['DateTime']>;
};
export declare type OrdersReportSumArgs = {
    direction?: Maybe<SortDirection>;
    end?: Maybe<Scalars['DateTime']>;
    filterBySKUs?: Maybe<Array<Maybe<Scalars['String']>>>;
    groupBy?: Maybe<Parameter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Parameter>;
    resolution?: Maybe<Interval>;
    start?: Maybe<Scalars['DateTime']>;
};
export declare type OrdersReportTotalArgs = {
    end?: Maybe<Scalars['DateTime']>;
    start?: Maybe<Scalars['DateTime']>;
};
export declare type PageInfo = {
    __typename?: 'PageInfo';
    endCursor: Scalars['String'];
    hasNextPage: Scalars['Boolean'];
    hasPreviousPage: Scalars['Boolean'];
    startCursor: Scalars['String'];
    totalNodes: Scalars['Int'];
};
export declare type ParagraphCollectionContent = {
    __typename?: 'ParagraphCollectionContent';
    paragraphs?: Maybe<Array<ParagraphContent>>;
};
export declare type ParagraphCollectionContentInput = {
    paragraphs: Array<ParagraphContentInput>;
};
export declare type ParagraphContent = {
    __typename?: 'ParagraphContent';
    body?: Maybe<RichTextContent>;
    images?: Maybe<Array<Image>>;
    title?: Maybe<SingleLineContent>;
    videos?: Maybe<Array<Video>>;
};
export declare type ParagraphContentInput = {
    body?: Maybe<RichTextContentInput>;
    images?: Maybe<Array<ImageInput>>;
    title?: Maybe<SingleLineContentInput>;
    videos?: Maybe<Array<VideoInput>>;
};
export declare enum Parameter {
    Currency = "CURRENCY",
    Date = "DATE",
    Product = "PRODUCT",
    Value = "VALUE"
}
export declare type Payment = CashPayment | CustomPayment | KlarnaPayment | PaypalPayment | StripePayment;
export declare type PaymentInput = {
    cash?: Maybe<CashPaymentInput>;
    custom?: Maybe<CustomPaymentInput>;
    klarna?: Maybe<KlarnaPaymentInput>;
    paypal?: Maybe<PaypalPaymentInput>;
    provider: PaymentProvider;
    stripe?: Maybe<StripePaymentInput>;
};
export declare enum PaymentProvider {
    Cash = "cash",
    Custom = "custom",
    Klarna = "klarna",
    Paypal = "paypal",
    Stripe = "stripe"
}
export declare type PaymentType = {
    provider: PaymentProvider;
};
export declare type PaypalPayment = PaymentType & {
    __typename?: 'PaypalPayment';
    id?: Maybe<Scalars['String']>;
    invoiceId?: Maybe<Scalars['String']>;
    metadata?: Maybe<Scalars['String']>;
    orderId?: Maybe<Scalars['String']>;
    provider: PaymentProvider;
    subscriptionId?: Maybe<Scalars['String']>;
};
export declare type PaypalPaymentInput = {
    invoiceId?: Maybe<Scalars['String']>;
    metadata?: Maybe<Scalars['String']>;
    orderId?: Maybe<Scalars['String']>;
    paypal?: Maybe<Scalars['String']>;
    subscriptionId?: Maybe<Scalars['String']>;
};
export declare type Pipeline = {
    __typename?: 'Pipeline';
    createdAt: Scalars['DateTime'];
    id: Scalars['ID'];
    name: Scalars['String'];
    orders: OrderConnection;
    stages?: Maybe<Array<PipelineStage>>;
    tenantId: Scalars['ID'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type PipelineOrdersArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    sort?: Maybe<SortDirection>;
    sortField?: Maybe<OrderSortField>;
};
export declare type PipelineConnection = {
    __typename?: 'PipelineConnection';
    edges?: Maybe<Array<PipelineConnectionEdge>>;
    pageInfo: PageInfo;
};
export declare type PipelineConnectionEdge = {
    __typename?: 'PipelineConnectionEdge';
    cursor: Scalars['String'];
    node: Pipeline;
};
export declare type PipelineMutations = {
    __typename?: 'PipelineMutations';
    addStage: Pipeline;
    create: Pipeline;
    delete?: Maybe<Scalars['Int']>;
    moveStage: Pipeline;
    removeStage: Pipeline;
    update: Pipeline;
    updateStage: Pipeline;
};
export declare type PipelineMutationsAddStageArgs = {
    input: CreatePipelineStageInput;
    pipelineId: Scalars['ID'];
    position?: Maybe<Scalars['Int']>;
};
export declare type PipelineMutationsCreateArgs = {
    input: CreatePipelineInput;
};
export declare type PipelineMutationsDeleteArgs = {
    force?: Maybe<Scalars['Boolean']>;
    id: Scalars['ID'];
};
export declare type PipelineMutationsMoveStageArgs = {
    newPosition: Scalars['Int'];
    pipelineId: Scalars['ID'];
    stageId: Scalars['ID'];
};
export declare type PipelineMutationsRemoveStageArgs = {
    force?: Maybe<Scalars['Boolean']>;
    pipelineId: Scalars['ID'];
    stageId: Scalars['ID'];
};
export declare type PipelineMutationsUpdateArgs = {
    id: Scalars['ID'];
    input?: Maybe<UpdatePipelineInput>;
};
export declare type PipelineMutationsUpdateStageArgs = {
    input: UpdatePipelineStageInput;
    pipelineId: Scalars['ID'];
    stageId: Scalars['ID'];
};
export declare type PipelineQueries = {
    __typename?: 'PipelineQueries';
    get?: Maybe<Pipeline>;
    getMany: PipelineConnection;
};
export declare type PipelineQueriesGetArgs = {
    id: Scalars['ID'];
};
export declare type PipelineQueriesGetManyArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    sort?: Maybe<SortDirection>;
    sortField?: Maybe<PipelineSortField>;
    tenantId: Scalars['ID'];
};
export declare enum PipelineSortField {
    CreatedAt = "createdAt"
}
export declare type PipelineStage = {
    __typename?: 'PipelineStage';
    createdAt: Scalars['DateTime'];
    id: Scalars['ID'];
    name: Scalars['String'];
    orders: OrderConnection;
    placeNewOrders: Scalars['Boolean'];
};
export declare type PipelineStageOrdersArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    sort?: Maybe<SortDirection>;
    sortField?: Maybe<OrderSortField>;
};
export declare type PresignedUploadRequest = {
    __typename?: 'PresignedUploadRequest';
    fields: Array<UploadField>;
    lifetime: Scalars['Int'];
    maxSize: Scalars['Int'];
    url?: Maybe<Scalars['String']>;
};
export declare type Price = {
    __typename?: 'Price';
    currency: Scalars['String'];
    discounts?: Maybe<Array<Discount>>;
    gross?: Maybe<Scalars['Float']>;
    net?: Maybe<Scalars['Float']>;
    tax?: Maybe<Tax>;
};
export declare type PriceInput = {
    currency: Scalars['String'];
    discounts?: Maybe<Array<DiscountInput>>;
    gross?: Maybe<Scalars['Float']>;
    net?: Maybe<Scalars['Float']>;
    tax?: Maybe<TaxInput>;
};
export declare type PriceVariant = {
    __typename?: 'PriceVariant';
    createdAt: Scalars['DateTime'];
    currency: Scalars['String'];
    identifier: Scalars['String'];
    name?: Maybe<Scalars['String']>;
    tenant: Tenant;
    tenantId: Scalars['ID'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type PriceVariantMutations = {
    __typename?: 'PriceVariantMutations';
    create: PriceVariant;
    delete: Scalars['Int'];
    update: PriceVariant;
};
export declare type PriceVariantMutationsCreateArgs = {
    input: CreatePriceVariantInput;
};
export declare type PriceVariantMutationsDeleteArgs = {
    identifier: Scalars['String'];
    tenantId: Scalars['ID'];
};
export declare type PriceVariantMutationsUpdateArgs = {
    identifier: Scalars['String'];
    input: UpdatePriceVariantInput;
    tenantId: Scalars['ID'];
};
export declare type PriceVariantQueries = {
    __typename?: 'PriceVariantQueries';
    get?: Maybe<PriceVariant>;
    getMany?: Maybe<Array<PriceVariant>>;
};
export declare type PriceVariantQueriesGetArgs = {
    identifier: Scalars['String'];
    tenantId: Scalars['ID'];
};
export declare type PriceVariantQueriesGetManyArgs = {
    tenantId: Scalars['ID'];
};
export declare type PriceVariantReferenceInput = {
    identifier: Scalars['String'];
    price?: Maybe<Scalars['Float']>;
};
export declare type Product = Item & {
    __typename?: 'Product';
    components?: Maybe<Array<Component>>;
    createdAt?: Maybe<Scalars['DateTime']>;
    defaultVariant: ProductVariant;
    externalReference?: Maybe<Scalars['String']>;
    hasVersion?: Maybe<Scalars['Boolean']>;
    id: Scalars['ID'];
    isSubscriptionOnly: Scalars['Boolean'];
    isVirtual: Scalars['Boolean'];
    language?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    relatingItems?: Maybe<Array<Item>>;
    shape?: Maybe<Shape>;
    tenantId: Scalars['ID'];
    topics?: Maybe<Array<Topic>>;
    tree?: Maybe<TreeNode>;
    type: ItemType;
    updatedAt?: Maybe<Scalars['DateTime']>;
    variants: Array<ProductVariant>;
    vatType?: Maybe<VatType>;
    vatTypeId?: Maybe<Scalars['ID']>;
    version?: Maybe<VersionedRecordInfo>;
};
export declare type ProductHasVersionArgs = {
    versionLabel?: Maybe<VersionLabel>;
};
export declare type ProductMutations = {
    __typename?: 'ProductMutations';
    create: Product;
    delete: Scalars['Int'];
    publish: PublishInfo;
    setDefaultVariant: Product;
    unpublish?: Maybe<PublishInfo>;
    update: Product;
    updateStock: ProductStockLocation;
    updateVariant: Product;
};
export declare type ProductMutationsCreateArgs = {
    input: CreateProductInput;
    language: Scalars['String'];
};
export declare type ProductMutationsDeleteArgs = {
    id: Scalars['ID'];
};
export declare type ProductMutationsPublishArgs = {
    id: Scalars['ID'];
    includeDescendants?: Maybe<Scalars['Boolean']>;
    language: Scalars['String'];
};
export declare type ProductMutationsSetDefaultVariantArgs = {
    language: Scalars['String'];
    productId: Scalars['ID'];
    variantId: Scalars['ID'];
};
export declare type ProductMutationsUnpublishArgs = {
    id: Scalars['ID'];
    includeDescendants?: Maybe<Scalars['Boolean']>;
    language: Scalars['String'];
};
export declare type ProductMutationsUpdateArgs = {
    id: Scalars['ID'];
    input: UpdateProductInput;
    language: Scalars['String'];
};
export declare type ProductMutationsUpdateStockArgs = {
    productId: Scalars['ID'];
    sku: Scalars['String'];
    stock: Scalars['Int'];
    stockLocationIdentifier?: Scalars['String'];
};
export declare type ProductMutationsUpdateVariantArgs = {
    input: UpdateSingleProductVariantInput;
    language: Scalars['String'];
    productId: Scalars['ID'];
    variantId: Scalars['ID'];
};
export declare type ProductPriceVariant = {
    __typename?: 'ProductPriceVariant';
    currency?: Maybe<Scalars['String']>;
    identifier: Scalars['String'];
    name?: Maybe<Scalars['String']>;
    price?: Maybe<Scalars['Float']>;
};
export declare type ProductQueries = {
    __typename?: 'ProductQueries';
    get?: Maybe<Product>;
    getVariants?: Maybe<Array<ProductVariant>>;
};
export declare type ProductQueriesGetArgs = {
    id: Scalars['ID'];
    language: Scalars['String'];
    versionLabel?: VersionLabel;
};
export declare type ProductQueriesGetVariantsArgs = {
    externalReferences?: Maybe<Array<Scalars['String']>>;
    language: Scalars['String'];
    tenantId?: Maybe<Scalars['ID']>;
    versionLabel?: VersionLabel;
};
export declare type ProductStockLocation = {
    __typename?: 'ProductStockLocation';
    identifier: Scalars['String'];
    meta?: Maybe<Array<KeyValuePair>>;
    name: Scalars['String'];
    settings?: Maybe<StockLocationSettings>;
    stock?: Maybe<Scalars['Int']>;
};
export declare type ProductSubscription = {
    __typename?: 'ProductSubscription';
    customer?: Maybe<Customer>;
    customerIdentifier: Scalars['String'];
    id: Scalars['ID'];
    initial?: Maybe<ProductSubscriptionPhase>;
    item: ProductSubscriptionItem;
    payment?: Maybe<Payment>;
    recurring?: Maybe<ProductSubscriptionPhase>;
    status: ProductSubscriptionStatus;
    subscriptionPlan?: Maybe<SubscriptionPlan>;
    tenant: Tenant;
    tenantId: Scalars['ID'];
    usage?: Maybe<Array<ProductSubscriptionUsage>>;
};
export declare type ProductSubscriptionUsageArgs = {
    end: Scalars['DateTime'];
    start: Scalars['DateTime'];
};
export declare type ProductSubscriptionConnection = {
    __typename?: 'ProductSubscriptionConnection';
    edges?: Maybe<Array<ProductSubscriptionConnectionEdge>>;
    pageInfo: PageInfo;
};
export declare type ProductSubscriptionConnectionEdge = {
    __typename?: 'ProductSubscriptionConnectionEdge';
    cursor: Scalars['String'];
    node: ProductSubscription;
};
export declare type ProductSubscriptionHistoryEvent = {
    type: ProductSubscriptionHistoryEventType;
};
export declare type ProductSubscriptionHistoryEventCancellation = ProductSubscriptionHistoryEvent & {
    __typename?: 'ProductSubscriptionHistoryEventCancellation';
    activeUntil?: Maybe<Scalars['DateTime']>;
    cancelledAt: Scalars['DateTime'];
    deactivated: Scalars['Boolean'];
    type: ProductSubscriptionHistoryEventType;
};
export declare type ProductSubscriptionHistoryEventRenewal = ProductSubscriptionHistoryEvent & {
    __typename?: 'ProductSubscriptionHistoryEventRenewal';
    activeUntil?: Maybe<Scalars['DateTime']>;
    currency: Scalars['String'];
    price: Scalars['Float'];
    renewedAt: Scalars['DateTime'];
    type: ProductSubscriptionHistoryEventType;
};
export declare type ProductSubscriptionHistoryEventRenewalDueBroadcast = ProductSubscriptionHistoryEvent & {
    __typename?: 'ProductSubscriptionHistoryEventRenewalDueBroadcast';
    broadcastAt: Scalars['DateTime'];
    renewAt: Scalars['DateTime'];
    type: ProductSubscriptionHistoryEventType;
};
export declare enum ProductSubscriptionHistoryEventType {
    Cancellation = "CANCELLATION",
    Renewal = "RENEWAL",
    RenewalDueBroadcast = "RENEWAL_DUE_BROADCAST"
}
export declare type ProductSubscriptionItem = {
    __typename?: 'ProductSubscriptionItem';
    imageUrl?: Maybe<Scalars['String']>;
    meta?: Maybe<Array<KeyValuePair>>;
    name: Scalars['String'];
    quantity: Scalars['NonNegativeInt'];
    sku: Scalars['String'];
};
export declare type ProductSubscriptionMutations = {
    __typename?: 'ProductSubscriptionMutations';
    cancel: ProductSubscription;
    create: ProductSubscription;
    delete?: Maybe<Scalars['Int']>;
    renew: ProductSubscription;
    update: ProductSubscription;
};
export declare type ProductSubscriptionMutationsCancelArgs = {
    deactivate?: Maybe<Scalars['Boolean']>;
    id: Scalars['ID'];
};
export declare type ProductSubscriptionMutationsCreateArgs = {
    input: CreateProductSubscriptionInput;
};
export declare type ProductSubscriptionMutationsDeleteArgs = {
    id: Scalars['ID'];
};
export declare type ProductSubscriptionMutationsRenewArgs = {
    id: Scalars['ID'];
};
export declare type ProductSubscriptionMutationsUpdateArgs = {
    id: Scalars['ID'];
    input: UpdateProductSubscriptionInput;
};
export declare type ProductSubscriptionPhase = {
    __typename?: 'ProductSubscriptionPhase';
    currency: Scalars['String'];
    period: Scalars['Int'];
    price: Scalars['Float'];
    unit: SubscriptionPeriodUnit;
};
export declare type ProductSubscriptionPlanReferenceInput = {
    identifier: Scalars['String'];
    periodId: Scalars['ID'];
};
export declare type ProductSubscriptionQueries = {
    __typename?: 'ProductSubscriptionQueries';
    get?: Maybe<ProductSubscription>;
    getMany?: Maybe<ProductSubscriptionConnection>;
};
export declare type ProductSubscriptionQueriesGetArgs = {
    id: Scalars['ID'];
};
export declare type ProductSubscriptionQueriesGetManyArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    customerIdentifier?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    sort?: Maybe<SortDirection>;
    sortField?: Maybe<ProductSubscriptionSortField>;
    tenantId: Scalars['ID'];
};
export declare enum ProductSubscriptionSortField {
    UpdatedAt = "updatedAt"
}
export declare type ProductSubscriptionStatus = {
    __typename?: 'ProductSubscriptionStatus';
    activeUntil?: Maybe<Scalars['DateTime']>;
    currency: Scalars['String'];
    price: Scalars['Float'];
    renewAt?: Maybe<Scalars['DateTime']>;
};
export declare type ProductSubscriptionUsage = {
    __typename?: 'ProductSubscriptionUsage';
    meteredVariableId: Scalars['ID'];
    quantity?: Maybe<Scalars['Float']>;
};
export declare type ProductVariant = {
    __typename?: 'ProductVariant';
    attributes?: Maybe<Array<ProductVariantAttribute>>;
    externalReference?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    images?: Maybe<Array<Image>>;
    isDefault: Scalars['Boolean'];
    name?: Maybe<Scalars['String']>;
    price?: Maybe<Scalars['Float']>;
    priceVariants?: Maybe<Array<ProductPriceVariant>>;
    product: Product;
    productId: Scalars['ID'];
    sku: Scalars['String'];
    stock?: Maybe<Scalars['Int']>;
    stockLocations?: Maybe<Array<ProductStockLocation>>;
    subscriptionPlans?: Maybe<Array<ProductVariantSubscriptionPlan>>;
};
export declare type ProductVariantPriceArgs = {
    identifier?: Scalars['String'];
};
export declare type ProductVariantStockArgs = {
    identifier?: Scalars['String'];
};
export declare type ProductVariantAttribute = {
    __typename?: 'ProductVariantAttribute';
    attribute: Scalars['String'];
    value: Scalars['String'];
};
export declare type ProductVariantAttributeInput = {
    attribute: Scalars['String'];
    value: Scalars['String'];
};
export declare type ProductVariantSubscriptionMeteredVariable = {
    __typename?: 'ProductVariantSubscriptionMeteredVariable';
    id: Scalars['ID'];
    identifier: Scalars['String'];
    name: Scalars['String'];
    tierType: TierType;
    tiers: Array<ProductVariantSubscriptionPlanTier>;
};
export declare type ProductVariantSubscriptionPlan = {
    __typename?: 'ProductVariantSubscriptionPlan';
    identifier: Scalars['String'];
    name?: Maybe<Scalars['String']>;
    periods: Array<ProductVariantSubscriptionPlanPeriod>;
    tenantId: Scalars['ID'];
};
export declare type ProductVariantSubscriptionPlanPeriod = {
    __typename?: 'ProductVariantSubscriptionPlanPeriod';
    id: Scalars['ID'];
    initial?: Maybe<ProductVariantSubscriptionPlanPricing>;
    name: Scalars['String'];
    recurring?: Maybe<ProductVariantSubscriptionPlanPricing>;
};
export declare type ProductVariantSubscriptionPlanPricing = {
    __typename?: 'ProductVariantSubscriptionPlanPricing';
    meteredVariables?: Maybe<Array<ProductVariantSubscriptionMeteredVariable>>;
    period: Scalars['Int'];
    price?: Maybe<Scalars['Float']>;
    priceVariants?: Maybe<Array<ProductPriceVariant>>;
    unit: SubscriptionPeriodUnit;
};
export declare type ProductVariantSubscriptionPlanPricingPriceArgs = {
    identifier?: Maybe<Scalars['String']>;
};
export declare type ProductVariantSubscriptionPlanTier = {
    __typename?: 'ProductVariantSubscriptionPlanTier';
    price?: Maybe<Scalars['Float']>;
    priceVariants?: Maybe<Array<ProductPriceVariant>>;
    threshold: Scalars['Int'];
};
export declare type ProductVariantSubscriptionPlanTierPriceArgs = {
    identifier?: Maybe<Scalars['String']>;
};
export declare type PropertiesTableComponentConfig = {
    __typename?: 'PropertiesTableComponentConfig';
    sections: Array<PropertiesTableComponentConfigSection>;
};
export declare type PropertiesTableComponentConfigInput = {
    sections: Array<PropertiesTableComponentConfigSectionInput>;
};
export declare type PropertiesTableComponentConfigSection = {
    __typename?: 'PropertiesTableComponentConfigSection';
    keys: Array<Scalars['String']>;
    title?: Maybe<Scalars['String']>;
};
export declare type PropertiesTableComponentConfigSectionInput = {
    keys: Array<Scalars['String']>;
    title?: Maybe<Scalars['String']>;
};
export declare type PropertiesTableComponentSection = {
    __typename?: 'PropertiesTableComponentSection';
    properties?: Maybe<Array<KeyValuePair>>;
    title?: Maybe<Scalars['String']>;
};
export declare type PropertiesTableComponentSectionInput = {
    properties?: Maybe<Array<KeyValuePairInput>>;
    title?: Maybe<Scalars['String']>;
};
export declare type PropertiesTableContent = {
    __typename?: 'PropertiesTableContent';
    sections?: Maybe<Array<PropertiesTableComponentSection>>;
};
export declare type PropertiesTableContentInput = {
    sections?: Maybe<Array<PropertiesTableComponentSectionInput>>;
};
export declare type PublishInfo = {
    __typename?: 'PublishInfo';
    id: Scalars['ID'];
    language?: Maybe<Scalars['String']>;
    versionId?: Maybe<Scalars['ID']>;
};
export declare type Query = {
    __typename?: 'Query';
    currencySummary?: Maybe<CurrencySummaryReport>;
    customer: CustomerQueries;
    document: DocumentQueries;
    file: FileQueries;
    folder: FolderQueries;
    grid: GridQueries;
    image: ImageQueries;
    item: ItemQueries;
    me?: Maybe<User>;
    order: OrderQueries;
    pipeline: PipelineQueries;
    priceVariant: PriceVariantQueries;
    product: ProductQueries;
    /** @deprecated productSubscription has been deprecated in favor of subscriptionContract */
    productSubscription: ProductSubscriptionQueries;
    report?: Maybe<TenantReports>;
    search?: Maybe<SearchQueries>;
    shape: ShapeQueries;
    stockLocation: StockLocationQueries;
    subscriptionContract: SubscriptionContractQueries;
    subscriptionContractEvent?: Maybe<SubscriptionContractEventQueries>;
    subscriptionPlan: SubscriptionPlanQueries;
    tenant: TenantQueries;
    topic: TopicQueries;
    tree: TreeQueries;
    user: UserQueries;
    version?: Maybe<VersionedServices>;
    webhook: WebhookQueries;
};
export declare type ReportMetric = {
    __typename?: 'ReportMetric';
    currency?: Maybe<Scalars['String']>;
    date?: Maybe<Scalars['DateTime']>;
    name?: Maybe<Scalars['String']>;
    product?: Maybe<Product>;
    sku?: Maybe<Scalars['String']>;
    value: Scalars['Float'];
};
export declare type ReportMetricProductArgs = {
    language: Scalars['String'];
};
export declare type RichTextContent = {
    __typename?: 'RichTextContent';
    html?: Maybe<Array<Scalars['String']>>;
    json?: Maybe<Array<Maybe<Scalars['JSON']>>>;
    plainText?: Maybe<Array<Scalars['String']>>;
};
export declare type RichTextContentInput = {
    html?: Maybe<Array<Scalars['String']>>;
    json?: Maybe<Array<Scalars['JSON']>>;
};
export declare type SalesReport = IObjectReports & {
    __typename?: 'SalesReport';
    avg: Array<Maybe<ReportMetric>>;
    sum: Array<Maybe<ReportMetric>>;
    total: Scalars['Float'];
};
export declare type SalesReportAvgArgs = {
    direction?: Maybe<SortDirection>;
    end?: Maybe<Scalars['DateTime']>;
    filterBySKUs?: Maybe<Array<Maybe<Scalars['String']>>>;
    groupBy?: Maybe<Parameter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Parameter>;
    resolution?: Maybe<Interval>;
    start?: Maybe<Scalars['DateTime']>;
};
export declare type SalesReportSumArgs = {
    direction?: Maybe<SortDirection>;
    end?: Maybe<Scalars['DateTime']>;
    filterBySKUs?: Maybe<Array<Maybe<Scalars['String']>>>;
    groupBy?: Maybe<Parameter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Parameter>;
    resolution?: Maybe<Interval>;
    start?: Maybe<Scalars['DateTime']>;
};
export declare type SalesReportTotalArgs = {
    end?: Maybe<Scalars['DateTime']>;
    start?: Maybe<Scalars['DateTime']>;
};
export declare type SearchQueries = {
    __typename?: 'SearchQueries';
    suggest?: Maybe<SuggestSearchConnection>;
    topics?: Maybe<TopicSearchConnection>;
};
export declare type SearchQueriesSuggestArgs = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    language: Scalars['String'];
    searchTerm?: Maybe<Scalars['String']>;
    tenantId: Scalars['ID'];
    types?: Maybe<Array<SuggestSearchItemType>>;
};
export declare type SearchQueriesTopicsArgs = {
    language: Scalars['String'];
    searchTerm?: Maybe<Scalars['String']>;
    tenantId: Scalars['ID'];
};
export declare type SelectionComponentConfig = {
    __typename?: 'SelectionComponentConfig';
    max?: Maybe<Scalars['Int']>;
    min?: Maybe<Scalars['Int']>;
    options: Array<SelectionComponentOptionConfig>;
};
export declare type SelectionComponentConfigInput = {
    max?: Maybe<Scalars['Int']>;
    min?: Maybe<Scalars['Int']>;
    options: Array<SelectionComponentOptionConfigInput>;
};
export declare type SelectionComponentContentInput = {
    keys: Array<Scalars['String']>;
};
export declare type SelectionComponentOptionConfig = {
    __typename?: 'SelectionComponentOptionConfig';
    isPreselected?: Maybe<Scalars['Boolean']>;
    key: Scalars['String'];
    value: Scalars['String'];
};
export declare type SelectionComponentOptionConfigInput = {
    isPreselected?: Maybe<Scalars['Boolean']>;
    key: Scalars['String'];
    value: Scalars['String'];
};
export declare type SelectionContent = {
    __typename?: 'SelectionContent';
    options: Array<KeyValuePair>;
};
export declare type Shape = {
    __typename?: 'Shape';
    components?: Maybe<Array<ShapeComponent>>;
    createdAt: Scalars['DateTime'];
    /** @deprecated Shape IDs have been deprecated in favor of human readable identifiers. Querying for them will be removed in a future release. */
    id?: Maybe<Scalars['ID']>;
    identifier: Scalars['String'];
    itemCount: Scalars['Int'];
    items?: Maybe<Array<Item>>;
    meta?: Maybe<Array<KeyValuePair>>;
    metaProperty?: Maybe<Scalars['String']>;
    name: Scalars['String'];
    tenantId: Scalars['ID'];
    type: ShapeType;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type ShapeItemsArgs = {
    language: Scalars['String'];
};
export declare type ShapeMetaPropertyArgs = {
    key: Scalars['String'];
};
export declare type ShapeComponent = {
    __typename?: 'ShapeComponent';
    config?: Maybe<ComponentConfig>;
    description?: Maybe<Scalars['String']>;
    id: Scalars['String'];
    name: Scalars['String'];
    type: ComponentType;
};
export declare type ShapeComponentInput = {
    config?: Maybe<ComponentConfigInput>;
    description?: Maybe<Scalars['String']>;
    id?: Maybe<Scalars['String']>;
    name: Scalars['String'];
    type: ComponentType;
};
export declare type ShapeMetrics = IObjectMetrics & {
    __typename?: 'ShapeMetrics';
    count: Scalars['Int'];
};
export declare type ShapeMetricsCountArgs = {
    end?: Maybe<Scalars['DateTime']>;
    start?: Maybe<Scalars['DateTime']>;
};
export declare type ShapeMutations = {
    __typename?: 'ShapeMutations';
    create: Shape;
    delete: Scalars['Int'];
    /** @deprecated Migrating legacy shape ids will be removed in a future release. */
    migrateLegacyId: Shape;
    update: Shape;
};
export declare type ShapeMutationsCreateArgs = {
    input: CreateShapeInput;
};
export declare type ShapeMutationsDeleteArgs = {
    identifier?: Maybe<Scalars['String']>;
    tenantId?: Maybe<Scalars['ID']>;
};
export declare type ShapeMutationsMigrateLegacyIdArgs = {
    id: Scalars['String'];
    identifier: Scalars['String'];
    tenantId: Scalars['ID'];
};
export declare type ShapeMutationsUpdateArgs = {
    identifier?: Maybe<Scalars['String']>;
    input: UpdateShapeInput;
    tenantId?: Maybe<Scalars['ID']>;
};
export declare type ShapeQueries = {
    __typename?: 'ShapeQueries';
    get?: Maybe<Shape>;
    getMany?: Maybe<Array<Shape>>;
};
export declare type ShapeQueriesGetArgs = {
    identifier?: Maybe<Scalars['String']>;
    tenantId?: Maybe<Scalars['ID']>;
};
export declare type ShapeQueriesGetManyArgs = {
    tenantId: Scalars['ID'];
};
export declare enum ShapeType {
    Document = "document",
    Folder = "folder",
    Product = "product"
}
export declare type SingleLineContent = {
    __typename?: 'SingleLineContent';
    text?: Maybe<Scalars['String']>;
};
export declare type SingleLineContentInput = {
    text?: Maybe<Scalars['String']>;
};
export declare enum SortDirection {
    Asc = "asc",
    Desc = "desc"
}
export declare type StockLocation = {
    __typename?: 'StockLocation';
    identifier: Scalars['String'];
    name: Scalars['String'];
    settings?: Maybe<StockLocationSettings>;
    tenant: Tenant;
    tenantId: Scalars['ID'];
};
export declare type StockLocationMutations = {
    __typename?: 'StockLocationMutations';
    create: StockLocation;
    delete: Scalars['Int'];
    update: StockLocation;
};
export declare type StockLocationMutationsCreateArgs = {
    input: CreateStockLocationInput;
};
export declare type StockLocationMutationsDeleteArgs = {
    identifier: Scalars['String'];
    tenantId: Scalars['ID'];
};
export declare type StockLocationMutationsUpdateArgs = {
    identifier: Scalars['String'];
    input: UpdateStockLocationInput;
    tenantId: Scalars['ID'];
};
export declare type StockLocationQueries = {
    __typename?: 'StockLocationQueries';
    get?: Maybe<StockLocation>;
    getMany?: Maybe<Array<StockLocation>>;
};
export declare type StockLocationQueriesGetArgs = {
    identifier: Scalars['String'];
    tenantId: Scalars['ID'];
};
export declare type StockLocationQueriesGetManyArgs = {
    tenantId: Scalars['ID'];
};
export declare type StockLocationReferenceInput = {
    identifier: Scalars['String'];
    meta?: Maybe<Array<KeyValuePairInput>>;
    stock?: Maybe<Scalars['Int']>;
};
export declare type StockLocationSettings = {
    __typename?: 'StockLocationSettings';
    minimum?: Maybe<Scalars['Int']>;
    unlimited?: Maybe<Scalars['Boolean']>;
};
export declare type StockLocationSettingsInput = {
    minimum?: Maybe<Scalars['Int']>;
};
export declare type StripePayment = PaymentType & {
    __typename?: 'StripePayment';
    customerId?: Maybe<Scalars['String']>;
    id?: Maybe<Scalars['String']>;
    metadata?: Maybe<Scalars['String']>;
    orderId?: Maybe<Scalars['String']>;
    paymentIntentId?: Maybe<Scalars['String']>;
    paymentMethod?: Maybe<Scalars['String']>;
    paymentMethodId?: Maybe<Scalars['String']>;
    provider: PaymentProvider;
    subscriptionId?: Maybe<Scalars['String']>;
};
export declare type StripePaymentInput = {
    customerId?: Maybe<Scalars['String']>;
    metadata?: Maybe<Scalars['String']>;
    orderId?: Maybe<Scalars['String']>;
    paymentIntentId?: Maybe<Scalars['String']>;
    paymentMethod?: Maybe<Scalars['String']>;
    paymentMethodId?: Maybe<Scalars['String']>;
    stripe?: Maybe<Scalars['String']>;
    subscriptionId?: Maybe<Scalars['String']>;
};
export declare type SubscriptionContract = {
    __typename?: 'SubscriptionContract';
    addresses?: Maybe<Array<SubscriptionContractAddress>>;
    customer?: Maybe<Customer>;
    customerIdentifier: Scalars['String'];
    id: Scalars['ID'];
    initial?: Maybe<SubscriptionContractPhase>;
    item: SubscriptionContractItem;
    payment?: Maybe<Payment>;
    recurring?: Maybe<SubscriptionContractPhase>;
    status: SubscriptionContractStatus;
    subscriptionPlan?: Maybe<SubscriptionPlan>;
    tenant: Tenant;
    tenantId: Scalars['ID'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    usage?: Maybe<Array<SubscriptionContractUsage>>;
};
export declare type SubscriptionContractUsageArgs = {
    end: Scalars['DateTime'];
    start: Scalars['DateTime'];
};
export declare type SubscriptionContractAddress = {
    __typename?: 'SubscriptionContractAddress';
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['EmailAddress']>;
    firstName?: Maybe<Scalars['String']>;
    id?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    middleName?: Maybe<Scalars['String']>;
    phone?: Maybe<Scalars['String']>;
    postalCode?: Maybe<Scalars['String']>;
    state?: Maybe<Scalars['String']>;
    street?: Maybe<Scalars['String']>;
    street2?: Maybe<Scalars['String']>;
    streetNumber?: Maybe<Scalars['String']>;
    type: AddressType;
};
export declare type SubscriptionContractCancelledEvent = SubscriptionContractEvent & {
    __typename?: 'SubscriptionContractCancelledEvent';
    createdAt: Scalars['DateTime'];
    id: Scalars['ID'];
    type: SubscriptionContractEventType;
};
export declare type SubscriptionContractConnection = {
    __typename?: 'SubscriptionContractConnection';
    edges?: Maybe<Array<SubscriptionContractConnectionEdge>>;
    pageInfo: PageInfo;
};
export declare type SubscriptionContractConnectionEdge = {
    __typename?: 'SubscriptionContractConnectionEdge';
    cursor: Scalars['String'];
    node: SubscriptionContract;
};
export declare type SubscriptionContractEvent = {
    createdAt: Scalars['DateTime'];
    id: Scalars['ID'];
    type: SubscriptionContractEventType;
};
export declare type SubscriptionContractEventConnection = {
    __typename?: 'SubscriptionContractEventConnection';
    edges?: Maybe<Array<SubscriptionContractEventConnectionEdge>>;
    pageInfo: PageInfo;
};
export declare type SubscriptionContractEventConnectionEdge = {
    __typename?: 'SubscriptionContractEventConnectionEdge';
    cursor: Scalars['String'];
    node: SubscriptionContractEvent;
};
export declare type SubscriptionContractEventQueries = {
    __typename?: 'SubscriptionContractEventQueries';
    getMany?: Maybe<SubscriptionContractEventConnection>;
};
export declare type SubscriptionContractEventQueriesGetManyArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    eventTypes?: Maybe<Array<SubscriptionContractEventType>>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    sort?: Maybe<SortDirection>;
    subscriptionContractId: Scalars['ID'];
    tenantId: Scalars['ID'];
};
export declare enum SubscriptionContractEventSortField {
    Id = "_id"
}
export declare enum SubscriptionContractEventType {
    Cancelled = "cancelled",
    RenewalDueBroadcast = "renewalDueBroadcast",
    Renewed = "renewed",
    UsageTracked = "usageTracked"
}
export declare type SubscriptionContractItem = {
    __typename?: 'SubscriptionContractItem';
    imageUrl?: Maybe<Scalars['String']>;
    meta?: Maybe<Array<KeyValuePair>>;
    name: Scalars['String'];
    sku: Scalars['String'];
};
export declare type SubscriptionContractMeteredVariableReference = {
    __typename?: 'SubscriptionContractMeteredVariableReference';
    id: Scalars['ID'];
    tierType?: Maybe<TierType>;
    tiers: Array<SubscriptionContractMeteredVariableTierReference>;
};
export declare type SubscriptionContractMeteredVariableTierReference = {
    __typename?: 'SubscriptionContractMeteredVariableTierReference';
    currency: Scalars['String'];
    price?: Maybe<Scalars['Float']>;
    threshold: Scalars['Int'];
};
export declare type SubscriptionContractMutations = {
    __typename?: 'SubscriptionContractMutations';
    cancel: SubscriptionContract;
    create: SubscriptionContract;
    delete?: Maybe<Scalars['Int']>;
    renew: SubscriptionContract;
    trackUsage: SubscriptionContractUsageTrackedEvent;
    update: SubscriptionContract;
};
export declare type SubscriptionContractMutationsCancelArgs = {
    deactivate?: Maybe<Scalars['Boolean']>;
    id: Scalars['ID'];
};
export declare type SubscriptionContractMutationsCreateArgs = {
    input: CreateSubscriptionContractInput;
};
export declare type SubscriptionContractMutationsDeleteArgs = {
    id: Scalars['ID'];
};
export declare type SubscriptionContractMutationsRenewArgs = {
    id: Scalars['ID'];
};
export declare type SubscriptionContractMutationsTrackUsageArgs = {
    id: Scalars['ID'];
    input: TrackUsageInput;
};
export declare type SubscriptionContractMutationsUpdateArgs = {
    id: Scalars['ID'];
    input: UpdateSubscriptionContractInput;
};
export declare type SubscriptionContractPhase = {
    __typename?: 'SubscriptionContractPhase';
    currency: Scalars['String'];
    meteredVariables?: Maybe<Array<SubscriptionContractMeteredVariableReference>>;
    period: Scalars['Int'];
    price: Scalars['Float'];
    unit: SubscriptionPeriodUnit;
};
export declare type SubscriptionContractQueries = {
    __typename?: 'SubscriptionContractQueries';
    get?: Maybe<SubscriptionContract>;
    getMany?: Maybe<SubscriptionContractConnection>;
};
export declare type SubscriptionContractQueriesGetArgs = {
    id: Scalars['ID'];
};
export declare type SubscriptionContractQueriesGetManyArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    customerIdentifier?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    sort?: Maybe<SortDirection>;
    sortField?: Maybe<SubscriptionContractSortField>;
    tenantId: Scalars['ID'];
};
export declare type SubscriptionContractRenewalDueBroadcastEvent = SubscriptionContractEvent & {
    __typename?: 'SubscriptionContractRenewalDueBroadcastEvent';
    createdAt: Scalars['DateTime'];
    data: SubscriptionContractRenewalDueBroadcastEventData;
    id: Scalars['ID'];
    type: SubscriptionContractEventType;
};
export declare type SubscriptionContractRenewalDueBroadcastEventData = {
    __typename?: 'SubscriptionContractRenewalDueBroadcastEventData';
    broadcastAt: Scalars['DateTime'];
    renewAt: Scalars['DateTime'];
};
export declare type SubscriptionContractRenewedEvent = SubscriptionContractEvent & {
    __typename?: 'SubscriptionContractRenewedEvent';
    createdAt: Scalars['DateTime'];
    id: Scalars['ID'];
    type: SubscriptionContractEventType;
};
export declare enum SubscriptionContractSortField {
    UpdatedAt = "updatedAt"
}
export declare type SubscriptionContractStatus = {
    __typename?: 'SubscriptionContractStatus';
    activeUntil?: Maybe<Scalars['DateTime']>;
    currency: Scalars['String'];
    price: Scalars['Float'];
    renewAt?: Maybe<Scalars['DateTime']>;
};
export declare type SubscriptionContractUsage = {
    __typename?: 'SubscriptionContractUsage';
    meteredVariableId: Scalars['ID'];
    quantity?: Maybe<Scalars['Float']>;
};
export declare type SubscriptionContractUsageTrackedEvent = SubscriptionContractEvent & {
    __typename?: 'SubscriptionContractUsageTrackedEvent';
    createdAt: Scalars['DateTime'];
    id: Scalars['ID'];
    type: SubscriptionContractEventType;
};
export declare enum SubscriptionPeriodUnit {
    Day = "day",
    Month = "month",
    Week = "week",
    Year = "year"
}
export declare type SubscriptionPlan = {
    __typename?: 'SubscriptionPlan';
    createdAt: Scalars['DateTime'];
    identifier: Scalars['String'];
    meteredVariables?: Maybe<Array<SubscriptionPlanMeteredVariable>>;
    name?: Maybe<Scalars['String']>;
    periods?: Maybe<Array<SubscriptionPlanPeriod>>;
    tenant: Tenant;
    tenantId: Scalars['ID'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type SubscriptionPlanMeteredVariable = {
    __typename?: 'SubscriptionPlanMeteredVariable';
    id: Scalars['ID'];
    identifier: Scalars['String'];
    name?: Maybe<Scalars['String']>;
    unit: Scalars['String'];
};
export declare type SubscriptionPlanMeteredVariableInput = {
    id?: Maybe<Scalars['ID']>;
    identifier: Scalars['String'];
    name?: Maybe<Scalars['String']>;
    unit: Scalars['String'];
};
export declare type SubscriptionPlanMeteredVariableReferenceInput = {
    id: Scalars['ID'];
    tierType?: Maybe<TierType>;
    tiers?: Maybe<Array<SubscriptionPlanMeteredVariableTierReferenceInput>>;
};
export declare type SubscriptionPlanMeteredVariableTierReferenceInput = {
    price?: Maybe<Scalars['Float']>;
    priceVariants?: Maybe<Array<PriceVariantReferenceInput>>;
    threshold: Scalars['Int'];
};
export declare type SubscriptionPlanMutations = {
    __typename?: 'SubscriptionPlanMutations';
    create: SubscriptionPlan;
    delete: Scalars['Int'];
    update: SubscriptionPlan;
};
export declare type SubscriptionPlanMutationsCreateArgs = {
    input: CreateSubscriptionPlanInput;
};
export declare type SubscriptionPlanMutationsDeleteArgs = {
    identifier: Scalars['String'];
    tenantId: Scalars['ID'];
};
export declare type SubscriptionPlanMutationsUpdateArgs = {
    identifier: Scalars['String'];
    input: UpdateSubscriptionPlanInput;
    tenantId: Scalars['ID'];
};
export declare type SubscriptionPlanPeriod = {
    __typename?: 'SubscriptionPlanPeriod';
    id: Scalars['ID'];
    initial?: Maybe<SubscriptionPlanPhase>;
    name: Scalars['String'];
    recurring: SubscriptionPlanPhase;
};
export declare type SubscriptionPlanPeriodInput = {
    id?: Maybe<Scalars['ID']>;
    initial?: Maybe<SubscriptionPlanPhaseInput>;
    name: Scalars['String'];
    recurring: SubscriptionPlanPhaseInput;
};
export declare type SubscriptionPlanPeriodReferenceInput = {
    id: Scalars['ID'];
    initial?: Maybe<SubscriptionPlanPriceInput>;
    recurring: SubscriptionPlanPriceInput;
};
export declare type SubscriptionPlanPhase = {
    __typename?: 'SubscriptionPlanPhase';
    period: Scalars['Int'];
    unit: SubscriptionPeriodUnit;
};
export declare type SubscriptionPlanPhaseInput = {
    period: Scalars['Int'];
    unit: SubscriptionPeriodUnit;
};
export declare type SubscriptionPlanPriceInput = {
    meteredVariables?: Maybe<Array<SubscriptionPlanMeteredVariableReferenceInput>>;
    price?: Maybe<Scalars['Float']>;
    priceVariants?: Maybe<Array<PriceVariantReferenceInput>>;
};
export declare type SubscriptionPlanQueries = {
    __typename?: 'SubscriptionPlanQueries';
    get?: Maybe<SubscriptionPlan>;
    getMany?: Maybe<Array<SubscriptionPlan>>;
};
export declare type SubscriptionPlanQueriesGetArgs = {
    identifier: Scalars['String'];
    tenantId: Scalars['ID'];
};
export declare type SubscriptionPlanQueriesGetManyArgs = {
    tenantId: Scalars['ID'];
};
export declare type SubscriptionPlanReferenceInput = {
    identifier: Scalars['String'];
    meteredVariables?: Maybe<Array<SubscriptionPlanMeteredVariableReferenceInput>>;
    periods: Array<SubscriptionPlanPeriodReferenceInput>;
};
export declare type SuggestSearchAggregations = {
    __typename?: 'SuggestSearchAggregations';
    totalResults: Scalars['Int'];
    typesAggregation: Array<SuggestSearchTypesAggregation>;
};
export declare type SuggestSearchConnection = {
    __typename?: 'SuggestSearchConnection';
    aggregations: SuggestSearchAggregations;
    edges?: Maybe<Array<SuggestSearchConnectionEdge>>;
    pageInfo: PageInfo;
};
export declare type SuggestSearchConnectionEdge = {
    __typename?: 'SuggestSearchConnectionEdge';
    cursor: Scalars['String'];
    node: SuggestSearchResult;
};
export declare enum SuggestSearchItemType {
    Document = "DOCUMENT",
    Folder = "FOLDER",
    Grid = "GRID",
    Pipeline = "PIPELINE",
    Product = "PRODUCT",
    Shape = "SHAPE",
    Topic = "TOPIC",
    Webhook = "WEBHOOK"
}
export declare type SuggestSearchResult = {
    __typename?: 'SuggestSearchResult';
    id: Scalars['ID'];
    name: Scalars['String'];
    path: Scalars['String'];
    tenantId: Scalars['ID'];
    type: Scalars['String'];
};
export declare type SuggestSearchTypesAggregation = {
    __typename?: 'SuggestSearchTypesAggregation';
    count: Scalars['Int'];
    type: Scalars['String'];
};
export declare type Tax = {
    __typename?: 'Tax';
    name?: Maybe<Scalars['String']>;
    percent?: Maybe<Scalars['Float']>;
};
export declare type TaxInput = {
    name?: Maybe<Scalars['String']>;
    percent?: Maybe<Scalars['Float']>;
};
export declare type Tenant = {
    __typename?: 'Tenant';
    authenticationMethod?: Maybe<TenantAuthenticationMethod>;
    availableLanguages?: Maybe<Array<Language>>;
    createdAt: Scalars['DateTime'];
    defaults: TenantDefaults;
    grids?: Maybe<Array<Grid>>;
    id: Scalars['ID'];
    identifier: Scalars['String'];
    isActive: Scalars['Boolean'];
    isTrial: Scalars['Boolean'];
    logo?: Maybe<Image>;
    meta?: Maybe<Array<KeyValuePair>>;
    metaProperty?: Maybe<Scalars['String']>;
    metrics?: Maybe<TenantMetrics>;
    name: Scalars['String'];
    rootItemId: Scalars['ID'];
    shapes?: Maybe<Array<Shape>>;
    staticAuthToken?: Maybe<Scalars['String']>;
    topics?: Maybe<Array<Topic>>;
    tree?: Maybe<Array<TreeNode>>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    users?: Maybe<Array<UserTenantRole>>;
    vatTypes?: Maybe<Array<VatType>>;
    webhooks?: Maybe<Array<Webhook>>;
};
export declare type TenantGridsArgs = {
    language: Scalars['String'];
    versionLabel?: VersionLabel;
};
export declare type TenantMetaPropertyArgs = {
    key: Scalars['String'];
};
export declare type TenantTopicsArgs = {
    language: Scalars['String'];
};
export declare type TenantTreeArgs = {
    versionLabel?: Maybe<VersionLabel>;
};
export declare type TenantWebhooksArgs = {
    concern?: Maybe<Scalars['String']>;
    event?: Maybe<Scalars['String']>;
};
export declare type TenantAuthenticationMethod = {
    __typename?: 'TenantAuthenticationMethod';
    catalogue?: Maybe<AuthenticationMethod>;
    search?: Maybe<AuthenticationMethod>;
};
export declare type TenantAuthenticationMethodInput = {
    catalogue?: Maybe<AuthenticationMethod>;
    search?: Maybe<AuthenticationMethod>;
};
export declare type TenantDefaults = {
    __typename?: 'TenantDefaults';
    currency: Scalars['String'];
    language: Scalars['String'];
};
export declare type TenantDefaultsInput = {
    currency?: Maybe<Scalars['String']>;
    language?: Maybe<Scalars['String']>;
};
export declare type TenantMetrics = {
    __typename?: 'TenantMetrics';
    apiCalls: ApiCallMetrics;
    bandwidth: BandwidthUsageMetrics;
    items: ItemMetrics;
    orders: OrderMetrics;
    shapes: ShapeMetrics;
    users: UserMetrics;
    webhooks: WebhookMetrics;
};
export declare type TenantMutations = {
    __typename?: 'TenantMutations';
    addUsers: Array<UserTenantRole>;
    create: Tenant;
    delete: Scalars['Int'];
    regenerateStaticAuthToken: Tenant;
    removeUsers?: Maybe<Array<UserTenantRole>>;
    setAuthenticationMethod: Tenant;
    update: Tenant;
};
export declare type TenantMutationsAddUsersArgs = {
    roles: Array<UserRoleInput>;
    tenantId: Scalars['ID'];
};
export declare type TenantMutationsCreateArgs = {
    input: CreateTenantInput;
};
export declare type TenantMutationsDeleteArgs = {
    id: Scalars['ID'];
};
export declare type TenantMutationsRegenerateStaticAuthTokenArgs = {
    tenantId: Scalars['ID'];
};
export declare type TenantMutationsRemoveUsersArgs = {
    tenantId: Scalars['ID'];
    userIds: Array<Scalars['ID']>;
};
export declare type TenantMutationsSetAuthenticationMethodArgs = {
    input?: Maybe<TenantAuthenticationMethodInput>;
    tenantId: Scalars['ID'];
};
export declare type TenantMutationsUpdateArgs = {
    id: Scalars['ID'];
    input: UpdateTenantInput;
};
export declare type TenantQueries = {
    __typename?: 'TenantQueries';
    get?: Maybe<Tenant>;
    getMany?: Maybe<Array<Tenant>>;
    getRootTopics?: Maybe<Array<Maybe<Topic>>>;
    suggestIdentifier: IdentifierSuggestion;
};
export declare type TenantQueriesGetArgs = {
    id?: Maybe<Scalars['ID']>;
    identifier?: Maybe<Scalars['String']>;
};
export declare type TenantQueriesGetManyArgs = {
    identifier?: Maybe<Scalars['String']>;
};
export declare type TenantQueriesGetRootTopicsArgs = {
    language: Scalars['String'];
    tenantId: Scalars['ID'];
};
export declare type TenantQueriesSuggestIdentifierArgs = {
    desired: Scalars['String'];
};
export declare type TenantReports = {
    __typename?: 'TenantReports';
    orders: OrdersReport;
    sales: SalesReport;
};
export declare type TenantReportsOrdersArgs = {
    currency: Scalars['String'];
    end?: Maybe<Scalars['DateTime']>;
    start?: Maybe<Scalars['DateTime']>;
    tenantId: Scalars['ID'];
};
export declare type TenantReportsSalesArgs = {
    currency: Scalars['String'];
    end?: Maybe<Scalars['DateTime']>;
    start?: Maybe<Scalars['DateTime']>;
    tenantId: Scalars['ID'];
};
export declare type TenantRoleInput = {
    role: UserRole;
    tenantId: Scalars['ID'];
};
export declare enum TierType {
    Graduated = "graduated",
    Volume = "volume"
}
export declare type Topic = {
    __typename?: 'Topic';
    ancestors?: Maybe<Array<Topic>>;
    children?: Maybe<Array<Topic>>;
    createdAt: Scalars['DateTime'];
    descendants?: Maybe<Array<Topic>>;
    id: Scalars['ID'];
    items?: Maybe<Array<Item>>;
    language?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    parent?: Maybe<Topic>;
    parentId?: Maybe<Scalars['ID']>;
    path: Scalars['String'];
    tenant: Tenant;
    tenantId: Scalars['ID'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type TopicItemsModified = {
    __typename?: 'TopicItemsModified';
    modified?: Maybe<Scalars['Int']>;
};
export declare type TopicMutations = {
    __typename?: 'TopicMutations';
    addItems: TopicItemsModified;
    bulkCreate: Array<Topic>;
    create: Topic;
    delete: Scalars['Int'];
    removeItems: TopicItemsModified;
    update: Topic;
};
export declare type TopicMutationsAddItemsArgs = {
    itemIds: Array<Scalars['ID']>;
    topicId: Scalars['ID'];
};
export declare type TopicMutationsBulkCreateArgs = {
    input: Array<BulkCreateTopicInput>;
    language: Scalars['String'];
    tenantId: Scalars['ID'];
};
export declare type TopicMutationsCreateArgs = {
    input: CreateTopicInput;
    language: Scalars['String'];
};
export declare type TopicMutationsDeleteArgs = {
    id: Scalars['ID'];
};
export declare type TopicMutationsRemoveItemsArgs = {
    itemIds: Array<Scalars['ID']>;
    topicId: Scalars['ID'];
};
export declare type TopicMutationsUpdateArgs = {
    id: Scalars['ID'];
    input: UpdateTopicInput;
    language: Scalars['String'];
};
export declare type TopicQueries = {
    __typename?: 'TopicQueries';
    /** Returns a specific topic. Topics can be queried either by ID or by path. */
    get?: Maybe<Topic>;
    getRootTopics?: Maybe<Array<Maybe<Topic>>>;
};
export declare type TopicQueriesGetArgs = {
    id?: Maybe<Scalars['ID']>;
    language: Scalars['String'];
    path?: Maybe<GetTopicByPathArguments>;
};
export declare type TopicQueriesGetRootTopicsArgs = {
    language: Scalars['String'];
    tenantId: Scalars['ID'];
};
export declare type TopicSearchAggregations = {
    __typename?: 'TopicSearchAggregations';
    totalResults: Scalars['Int'];
};
export declare type TopicSearchConnection = {
    __typename?: 'TopicSearchConnection';
    aggregations: TopicSearchAggregations;
    edges?: Maybe<Array<TopicSearchConnectionEdge>>;
};
export declare type TopicSearchConnectionEdge = {
    __typename?: 'TopicSearchConnectionEdge';
    node: TopicSearchResult;
};
export declare type TopicSearchResult = {
    __typename?: 'TopicSearchResult';
    display: Scalars['String'];
    id: Scalars['ID'];
    language: Scalars['String'];
    name: Scalars['String'];
    path: Scalars['String'];
    tenantId: Scalars['ID'];
};
export declare type TrackUsageInput = {
    idempotencyKey?: Maybe<Scalars['String']>;
    meteredVariableId: Scalars['ID'];
    quantity: Scalars['Float'];
};
export declare type TreeMutations = {
    __typename?: 'TreeMutations';
    createNode: TreeNode;
    deleteNode: Scalars['Int'];
    moveNode: TreeNode;
};
export declare type TreeMutationsCreateNodeArgs = {
    input: FullTreeNodeInput;
};
export declare type TreeMutationsDeleteNodeArgs = {
    itemId: Scalars['ID'];
};
export declare type TreeMutationsMoveNodeArgs = {
    input: TreeNodeInput;
    itemId: Scalars['ID'];
};
export declare type TreeNode = {
    __typename?: 'TreeNode';
    ancestors?: Maybe<Array<TreeNode>>;
    childCount?: Maybe<Scalars['Int']>;
    children?: Maybe<Array<TreeNode>>;
    identifiers?: Maybe<Array<TreeNodeIdentifier>>;
    item?: Maybe<Item>;
    itemId: Scalars['ID'];
    parent?: Maybe<TreeNode>;
    parentId?: Maybe<Scalars['ID']>;
    path?: Maybe<Scalars['String']>;
    position?: Maybe<Scalars['PositiveInt']>;
    siblings?: Maybe<Array<TreeNode>>;
    versionLabel: VersionLabel;
};
export declare type TreeNodeItemArgs = {
    language: Scalars['String'];
};
export declare type TreeNodePathArgs = {
    language: Scalars['String'];
};
export declare type TreeNodeIdentifier = {
    __typename?: 'TreeNodeIdentifier';
    identifier: Scalars['String'];
    language: Scalars['String'];
};
export declare type TreeNodeIdentifierInput = {
    identifier: Scalars['String'];
    language: Scalars['String'];
};
export declare type TreeNodeInput = {
    parentId: Scalars['ID'];
    position?: Maybe<Scalars['PositiveInt']>;
};
export declare type TreeQueries = {
    __typename?: 'TreeQueries';
    getNode?: Maybe<TreeNode>;
};
export declare type TreeQueriesGetNodeArgs = {
    itemId: Scalars['ID'];
    versionLabel?: VersionLabel;
};
export declare type UpdateCustomerAddressInput = {
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    postalCode?: Maybe<Scalars['String']>;
    state?: Maybe<Scalars['String']>;
    street?: Maybe<Scalars['String']>;
    street2?: Maybe<Scalars['String']>;
    streetNumber?: Maybe<Scalars['String']>;
    type?: Maybe<AddressType>;
};
export declare type UpdateCustomerInput = {
    addresses?: Maybe<Array<CreateCustomerAddressInput>>;
    birthDate?: Maybe<Scalars['Date']>;
    companyName?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    externalReferences?: Maybe<Array<KeyValuePairInput>>;
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    meta?: Maybe<Array<KeyValuePairInput>>;
    middleName?: Maybe<Scalars['String']>;
    phone?: Maybe<Scalars['String']>;
    taxNumber?: Maybe<Scalars['String']>;
};
export declare type UpdateDocumentInput = {
    components?: Maybe<Array<ComponentInput>>;
    createdAt?: Maybe<Scalars['DateTime']>;
    externalReference?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    topicIds?: Maybe<Array<Scalars['ID']>>;
};
export declare type UpdateFolderInput = {
    components?: Maybe<Array<ComponentInput>>;
    createdAt?: Maybe<Scalars['DateTime']>;
    externalReference?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    topicIds?: Maybe<Array<Scalars['ID']>>;
};
export declare type UpdateGridInput = {
    meta?: Maybe<Array<KeyValuePairInput>>;
    name?: Maybe<Scalars['String']>;
    rows?: Maybe<Array<GridRowInput>>;
};
export declare type UpdateLanguageInput = {
    name: Scalars['String'];
};
export declare type UpdateOrderInput = {
    additionalInformation?: Maybe<Scalars['String']>;
    cart?: Maybe<Array<OrderItemInput>>;
    customer?: Maybe<CustomerInput>;
    meta?: Maybe<Array<KeyValuePairInput>>;
    payment?: Maybe<Array<PaymentInput>>;
    total?: Maybe<PriceInput>;
};
export declare type UpdatePipelineInput = {
    name: Scalars['String'];
};
export declare type UpdatePipelineStageInput = {
    name?: Maybe<Scalars['String']>;
    placeNewOrders?: Maybe<Scalars['Boolean']>;
};
export declare type UpdatePriceVariantInput = {
    currency?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
};
export declare type UpdateProductInput = {
    components?: Maybe<Array<ComponentInput>>;
    createdAt?: Maybe<Scalars['DateTime']>;
    externalReference?: Maybe<Scalars['String']>;
    isSubscriptionOnly?: Maybe<Scalars['Boolean']>;
    isVirtual?: Maybe<Scalars['Boolean']>;
    name?: Maybe<Scalars['String']>;
    topicIds?: Maybe<Array<Scalars['ID']>>;
    variants?: Maybe<Array<UpdateProductVariantInput>>;
    vatTypeId?: Maybe<Scalars['ID']>;
};
export declare type UpdateProductSubscriptionInput = {
    addresses?: Maybe<Array<CreateProductSubscriptionAddressInput>>;
    initial?: Maybe<UpdateProductSubscriptionPhaseInput>;
    item?: Maybe<UpdateProductSubscriptionItemInput>;
    payment?: Maybe<PaymentInput>;
    recurring?: Maybe<UpdateProductSubscriptionPhaseInput>;
    status?: Maybe<UpdateProductSubscriptionStatusInput>;
};
export declare type UpdateProductSubscriptionItemInput = {
    imageUrl?: Maybe<Scalars['String']>;
    meta?: Maybe<Array<KeyValuePairInput>>;
    name?: Maybe<Scalars['String']>;
    quantity?: Maybe<Scalars['NonNegativeInt']>;
    sku?: Maybe<Scalars['String']>;
};
export declare type UpdateProductSubscriptionPhaseInput = {
    currency?: Maybe<Scalars['String']>;
    price?: Maybe<Scalars['Float']>;
};
export declare type UpdateProductSubscriptionStatusInput = {
    activeUntil?: Maybe<Scalars['DateTime']>;
    currency?: Maybe<Scalars['String']>;
    price?: Maybe<Scalars['Float']>;
    renewAt?: Maybe<Scalars['DateTime']>;
};
export declare type UpdateProductVariantInput = {
    attributes?: Maybe<Array<ProductVariantAttributeInput>>;
    externalReference?: Maybe<Scalars['String']>;
    id?: Maybe<Scalars['String']>;
    images?: Maybe<Array<ImageInput>>;
    isDefault?: Maybe<Scalars['Boolean']>;
    name?: Maybe<Scalars['String']>;
    price?: Maybe<Scalars['Float']>;
    priceVariants?: Maybe<Array<PriceVariantReferenceInput>>;
    sku?: Maybe<Scalars['String']>;
    stock?: Maybe<Scalars['Int']>;
    stockLocations?: Maybe<Array<StockLocationReferenceInput>>;
    subscriptionPlans?: Maybe<Array<SubscriptionPlanReferenceInput>>;
};
export declare type UpdateShapeInput = {
    components?: Maybe<Array<ShapeComponentInput>>;
    meta?: Maybe<Array<KeyValuePairInput>>;
    name?: Maybe<Scalars['String']>;
};
export declare type UpdateSingleProductVariantInput = {
    attributes?: Maybe<Array<ProductVariantAttributeInput>>;
    externalReference?: Maybe<Scalars['String']>;
    images?: Maybe<Array<ImageInput>>;
    name?: Maybe<Scalars['String']>;
    price?: Maybe<Scalars['Float']>;
    priceVariants?: Maybe<Array<PriceVariantReferenceInput>>;
    sku?: Maybe<Scalars['String']>;
    stock?: Maybe<Scalars['Int']>;
    stockLocations?: Maybe<Array<StockLocationReferenceInput>>;
    subscriptionPlans?: Maybe<Array<SubscriptionPlanReferenceInput>>;
};
export declare type UpdateStockLocationInput = {
    name?: Maybe<Scalars['String']>;
    settings?: Maybe<StockLocationSettingsInput>;
};
export declare type UpdateSubscriptionContractInput = {
    addresses?: Maybe<Array<CreateSubscriptionContractAddressInput>>;
    initial?: Maybe<UpdateSubscriptionContractPhaseInput>;
    item?: Maybe<UpdateSubscriptionContractItemInput>;
    payment?: Maybe<PaymentInput>;
    recurring?: Maybe<UpdateSubscriptionContractPhaseInput>;
    status?: Maybe<UpdateSubscriptionContractStatusInput>;
};
export declare type UpdateSubscriptionContractItemInput = {
    imageUrl?: Maybe<Scalars['String']>;
    meta?: Maybe<Array<KeyValuePairInput>>;
    name?: Maybe<Scalars['String']>;
    quantity?: Maybe<Scalars['NonNegativeInt']>;
    sku?: Maybe<Scalars['String']>;
};
export declare type UpdateSubscriptionContractPhaseInput = {
    currency?: Maybe<Scalars['String']>;
    meteredVariables?: Maybe<Array<CreateSubscriptionContractMeteredVariableReferenceInput>>;
    price?: Maybe<Scalars['Float']>;
};
export declare type UpdateSubscriptionContractStatusInput = {
    activeUntil?: Maybe<Scalars['DateTime']>;
    currency?: Maybe<Scalars['String']>;
    price?: Maybe<Scalars['Float']>;
    renewAt?: Maybe<Scalars['DateTime']>;
};
export declare type UpdateSubscriptionPlanInput = {
    meteredVariables?: Maybe<Array<SubscriptionPlanMeteredVariableInput>>;
    name?: Maybe<Scalars['String']>;
    periods?: Maybe<Array<SubscriptionPlanPeriodInput>>;
};
export declare type UpdateTenantInput = {
    defaults?: Maybe<TenantDefaultsInput>;
    isActive?: Maybe<Scalars['Boolean']>;
    isTrial?: Maybe<Scalars['Boolean']>;
    logo?: Maybe<ImageInput>;
    name?: Maybe<Scalars['String']>;
};
export declare type UpdateTopicInput = {
    name?: Maybe<Scalars['String']>;
    parentId?: Maybe<Scalars['ID']>;
    pathIdentifier?: Maybe<Scalars['String']>;
};
export declare type UpdateUserInput = {
    companyName?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    marketingEmailConsentedAt?: Maybe<Scalars['DateTime']>;
    tocReadAt?: Maybe<Scalars['DateTime']>;
};
export declare type UpdateVatTypeInput = {
    name?: Maybe<Scalars['String']>;
    percent?: Maybe<Scalars['Float']>;
};
export declare type UpdateWebhookInput = {
    concern?: Maybe<Scalars['String']>;
    event?: Maybe<Scalars['String']>;
    graphqlQuery?: Maybe<Scalars['String']>;
    headers?: Maybe<Array<WebhookHeaderInput>>;
    method?: Maybe<HttpMethod>;
    name?: Maybe<Scalars['String']>;
    url?: Maybe<Scalars['String']>;
};
export declare type UploadField = {
    __typename?: 'UploadField';
    name: Scalars['String'];
    value: Scalars['String'];
};
export declare type User = {
    __typename?: 'User';
    accessTokens?: Maybe<Array<AccessToken>>;
    companyName?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    email?: Maybe<Scalars['String']>;
    firstName?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    isAdmin: Scalars['Boolean'];
    lastName?: Maybe<Scalars['String']>;
    lastSeenAt?: Maybe<Scalars['DateTime']>;
    marketingEmailConsentedAt?: Maybe<Scalars['DateTime']>;
    role?: Maybe<UserTenantRole>;
    sub: Array<Scalars['String']>;
    tenants?: Maybe<Array<UserTenantRole>>;
    tocReadAt?: Maybe<Scalars['DateTime']>;
};
export declare type UserRoleArgs = {
    tenantId: Scalars['ID'];
};
export declare type UserMetrics = {
    __typename?: 'UserMetrics';
    count: Scalars['Int'];
};
export declare type UserMetricsCountArgs = {
    role?: Maybe<UserRoles>;
};
export declare type UserMutations = {
    __typename?: 'UserMutations';
    addTenants: Array<UserTenantRole>;
    create: User;
    delete: Scalars['Int'];
    generateAccessToken: AccessToken;
    grantAdminRights: User;
    removeTenants?: Maybe<Array<UserTenantRole>>;
    revokeAdminRights: User;
    update: User;
};
export declare type UserMutationsAddTenantsArgs = {
    roles: Array<TenantRoleInput>;
    userId: Scalars['ID'];
};
export declare type UserMutationsCreateArgs = {
    input: CreateUserInput;
};
export declare type UserMutationsDeleteArgs = {
    id: Scalars['ID'];
};
export declare type UserMutationsGenerateAccessTokenArgs = {
    input: CreateAccessTokenInput;
    userId: Scalars['ID'];
};
export declare type UserMutationsGrantAdminRightsArgs = {
    userId: Scalars['ID'];
};
export declare type UserMutationsRemoveTenantsArgs = {
    tenantIds: Array<Scalars['ID']>;
    userId: Scalars['ID'];
};
export declare type UserMutationsRevokeAdminRightsArgs = {
    userId: Scalars['ID'];
};
export declare type UserMutationsUpdateArgs = {
    id: Scalars['ID'];
    input?: Maybe<UpdateUserInput>;
};
export declare type UserQueries = {
    __typename?: 'UserQueries';
    dev_search?: Maybe<Array<User>>;
    get?: Maybe<User>;
    getMany: Array<User>;
    me?: Maybe<User>;
};
export declare type UserQueriesDev_SearchArgs = {
    email?: Maybe<Scalars['String']>;
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
};
export declare type UserQueriesGetArgs = {
    id: Scalars['ID'];
};
export declare enum UserRole {
    TenantAdmin = "tenantAdmin",
    User = "user"
}
export declare type UserRoleInput = {
    role: UserRole;
    userId: Scalars['ID'];
};
export declare enum UserRoles {
    TenantAdmin = "TenantAdmin",
    User = "User"
}
export declare type UserTenantRole = {
    __typename?: 'UserTenantRole';
    role?: Maybe<UserRole>;
    tenant: Tenant;
    tenantId: Scalars['ID'];
    user: User;
    userId: Scalars['ID'];
};
export declare type VatType = {
    __typename?: 'VatType';
    createdAt: Scalars['DateTime'];
    id: Scalars['ID'];
    name: Scalars['String'];
    percent: Scalars['Float'];
    tenantId: Scalars['ID'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type VatTypeMutations = {
    __typename?: 'VatTypeMutations';
    create: VatType;
    delete: Scalars['Int'];
    update: VatType;
};
export declare type VatTypeMutationsCreateArgs = {
    input: CreateVatTypeInput;
};
export declare type VatTypeMutationsDeleteArgs = {
    id: Scalars['ID'];
};
export declare type VatTypeMutationsUpdateArgs = {
    id: Scalars['ID'];
    input: UpdateVatTypeInput;
};
export declare type VersionInfo = {
    __typename?: 'VersionInfo';
    apiVersion: Scalars['String'];
    commitSha: Scalars['String'];
};
export declare enum VersionLabel {
    Current = "current",
    Draft = "draft",
    Published = "published"
}
export declare type VersionedRecordInfo = {
    __typename?: 'VersionedRecordInfo';
    createdAt: Scalars['DateTime'];
    id?: Maybe<Scalars['ID']>;
    label: VersionLabel;
};
export declare type VersionedServices = {
    __typename?: 'VersionedServices';
    core: VersionInfo;
    federated: Scalars['Boolean'];
    metrics?: Maybe<VersionInfo>;
    reporting?: Maybe<VersionInfo>;
    search?: Maybe<VersionInfo>;
    subscriptions?: Maybe<VersionInfo>;
};
export declare type Video = {
    __typename?: 'Video';
    id: Scalars['String'];
    playlist?: Maybe<Scalars['String']>;
    playlists?: Maybe<Array<Scalars['String']>>;
    thumbnails?: Maybe<Array<Image>>;
    title?: Maybe<Scalars['String']>;
};
export declare type VideoPlaylistArgs = {
    type: Scalars['String'];
};
export declare type VideoContent = {
    __typename?: 'VideoContent';
    videos?: Maybe<Array<Video>>;
};
export declare type VideoInput = {
    key: Scalars['String'];
    thumbnails?: Maybe<Array<ImageInput>>;
    title?: Maybe<Scalars['String']>;
};
export declare type VideoMutations = {
    __typename?: 'VideoMutations';
    addPlaylists: Video;
};
export declare type VideoMutationsAddPlaylistsArgs = {
    keys: Array<Scalars['String']>;
    videoId: Scalars['String'];
};
export declare type Webhook = {
    __typename?: 'Webhook';
    concern: Scalars['String'];
    createdAt?: Maybe<Scalars['DateTime']>;
    event: Scalars['String'];
    graphqlQuery?: Maybe<Scalars['String']>;
    headers?: Maybe<Array<WebhookHeader>>;
    id: Scalars['ID'];
    lastInvocation?: Maybe<WebhookInvocation>;
    method: HttpMethod;
    name: Scalars['String'];
    pastInvocations?: Maybe<Array<WebhookInvocation>>;
    tenant?: Maybe<Tenant>;
    tenantId: Scalars['ID'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    url: Scalars['String'];
};
export declare type WebhookPastInvocationsArgs = {
    limit?: Maybe<Scalars['Int']>;
};
export declare type WebhookHeader = {
    __typename?: 'WebhookHeader';
    name: Scalars['String'];
    value: Scalars['String'];
};
export declare type WebhookHeaderInput = {
    name: Scalars['String'];
    value: Scalars['String'];
};
export declare type WebhookInvocation = {
    __typename?: 'WebhookInvocation';
    end?: Maybe<Scalars['DateTime']>;
    payload?: Maybe<Scalars['JSON']>;
    response?: Maybe<WebhookInvocationResponse>;
    start?: Maybe<Scalars['DateTime']>;
};
export declare type WebhookInvocationResponse = {
    __typename?: 'WebhookInvocationResponse';
    body?: Maybe<Scalars['JSON']>;
    status?: Maybe<Scalars['Int']>;
};
export declare type WebhookMetrics = IObjectMetrics & {
    __typename?: 'WebhookMetrics';
    count: Scalars['Int'];
};
export declare type WebhookMetricsCountArgs = {
    end?: Maybe<Scalars['DateTime']>;
    start?: Maybe<Scalars['DateTime']>;
};
export declare type WebhookMutations = {
    __typename?: 'WebhookMutations';
    create: Webhook;
    delete: Scalars['Int'];
    registerInvocation: WebhookInvocation;
    update: Webhook;
};
export declare type WebhookMutationsCreateArgs = {
    input: CreateWebhookInput;
};
export declare type WebhookMutationsDeleteArgs = {
    id: Scalars['ID'];
};
export declare type WebhookMutationsRegisterInvocationArgs = {
    input?: Maybe<CreateWebhookInvocationInput>;
    webhookId: Scalars['ID'];
};
export declare type WebhookMutationsUpdateArgs = {
    id: Scalars['ID'];
    input: UpdateWebhookInput;
};
export declare type WebhookQueries = {
    __typename?: 'WebhookQueries';
    get?: Maybe<Webhook>;
    getMany?: Maybe<Array<Webhook>>;
};
export declare type WebhookQueriesGetArgs = {
    id: Scalars['ID'];
};
export declare type WebhookQueriesGetManyArgs = {
    concern?: Maybe<Scalars['String']>;
    event?: Maybe<Scalars['String']>;
    tenantId: Scalars['ID'];
};
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export declare type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export declare type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = {
    AcceptedContentType: ResolverTypeWrapper<AcceptedContentType>;
    AcceptedContentTypeInput: AcceptedContentTypeInput;
    AccessToken: ResolverTypeWrapper<AccessToken>;
    AccessTokenMutations: ResolverTypeWrapper<AccessTokenMutations>;
    AddLanguageInput: AddLanguageInput;
    Address: ResolverTypeWrapper<Address>;
    AddressInput: AddressInput;
    AddressType: AddressType;
    ApiCallMetrics: ResolverTypeWrapper<ApiCallMetrics>;
    AuthenticationMethod: AuthenticationMethod;
    BandwidthUnit: BandwidthUnit;
    BandwidthUsageMetrics: ResolverTypeWrapper<BandwidthUsageMetrics>;
    BandwidthUsageType: BandwidthUsageType;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    BooleanContent: ResolverTypeWrapper<BooleanContent>;
    BooleanContentInput: BooleanContentInput;
    BulkCreateDocumentInput: BulkCreateDocumentInput;
    BulkCreateFolderInput: BulkCreateFolderInput;
    BulkCreateProductInput: BulkCreateProductInput;
    BulkCreateShapeInput: BulkCreateShapeInput;
    BulkCreateTenantInput: BulkCreateTenantInput;
    BulkCreateTopicInput: BulkCreateTopicInput;
    BulkCreateUserInput: BulkCreateUserInput;
    BulkCreateVatTypeInput: BulkCreateVatTypeInput;
    CashPayment: ResolverTypeWrapper<CashPayment>;
    CashPaymentInput: CashPaymentInput;
    Component: ResolverTypeWrapper<Omit<Component, 'content'> & {
        content?: Maybe<ResolversTypes['ComponentContent']>;
    }>;
    ComponentChoiceComponentConfig: ResolverTypeWrapper<ComponentChoiceComponentConfig>;
    ComponentChoiceComponentConfigInput: ComponentChoiceComponentConfigInput;
    ComponentChoiceContent: ResolverTypeWrapper<ComponentChoiceContent>;
    ComponentConfig: ResolversTypes['ComponentChoiceComponentConfig'] | ResolversTypes['ContentChunkComponentConfig'] | ResolversTypes['FilesComponentConfig'] | ResolversTypes['ItemRelationsComponentConfig'] | ResolversTypes['NumericComponentConfig'] | ResolversTypes['PropertiesTableComponentConfig'] | ResolversTypes['SelectionComponentConfig'];
    ComponentConfigInput: ComponentConfigInput;
    ComponentContent: ResolversTypes['BooleanContent'] | ResolversTypes['ComponentChoiceContent'] | ResolversTypes['ContentChunkContent'] | ResolversTypes['DatetimeContent'] | ResolversTypes['FileContent'] | ResolversTypes['GridRelationsContent'] | ResolversTypes['ImageContent'] | ResolversTypes['ItemRelationsContent'] | ResolversTypes['LocationContent'] | ResolversTypes['NumericContent'] | ResolversTypes['ParagraphCollectionContent'] | ResolversTypes['PropertiesTableContent'] | ResolversTypes['RichTextContent'] | ResolversTypes['SelectionContent'] | ResolversTypes['SingleLineContent'] | ResolversTypes['VideoContent'];
    ComponentInput: ComponentInput;
    ComponentType: ComponentType;
    ContentChunkComponentConfig: ResolverTypeWrapper<ContentChunkComponentConfig>;
    ContentChunkComponentConfigInput: ContentChunkComponentConfigInput;
    ContentChunkContent: ResolverTypeWrapper<ContentChunkContent>;
    ContentChunkContentInput: ContentChunkContentInput;
    ContractSubscriptionPlanReferenceInput: ContractSubscriptionPlanReferenceInput;
    CreateAccessTokenInput: CreateAccessTokenInput;
    CreateChildTopicInput: CreateChildTopicInput;
    CreateCustomerAddressInput: CreateCustomerAddressInput;
    CreateCustomerInput: CreateCustomerInput;
    CreateDocumentInput: CreateDocumentInput;
    CreateFolderInput: CreateFolderInput;
    CreateGridInput: CreateGridInput;
    CreatePipelineInput: CreatePipelineInput;
    CreatePipelineStageInput: CreatePipelineStageInput;
    CreatePriceVariantInput: CreatePriceVariantInput;
    CreateProductInput: CreateProductInput;
    CreateProductSubscriptionAddressInput: CreateProductSubscriptionAddressInput;
    CreateProductSubscriptionInput: CreateProductSubscriptionInput;
    CreateProductSubscriptionItemInput: CreateProductSubscriptionItemInput;
    CreateProductSubscriptionMeteredVariableInput: CreateProductSubscriptionMeteredVariableInput;
    CreateProductSubscriptionMeteredVariableTierInput: CreateProductSubscriptionMeteredVariableTierInput;
    CreateProductSubscriptionPhaseInput: CreateProductSubscriptionPhaseInput;
    CreateProductSubscriptionStatusInput: CreateProductSubscriptionStatusInput;
    CreateProductVariantInput: CreateProductVariantInput;
    CreateShapeInput: CreateShapeInput;
    CreateStockLocationInput: CreateStockLocationInput;
    CreateSubscriptionContractAddressInput: CreateSubscriptionContractAddressInput;
    CreateSubscriptionContractInput: CreateSubscriptionContractInput;
    CreateSubscriptionContractItemInput: CreateSubscriptionContractItemInput;
    CreateSubscriptionContractMeteredVariableReferenceInput: CreateSubscriptionContractMeteredVariableReferenceInput;
    CreateSubscriptionContractMeteredVariableTierInput: CreateSubscriptionContractMeteredVariableTierInput;
    CreateSubscriptionContractPhaseInput: CreateSubscriptionContractPhaseInput;
    CreateSubscriptionContractStatusInput: CreateSubscriptionContractStatusInput;
    CreateSubscriptionPlanInput: CreateSubscriptionPlanInput;
    CreateTenantInput: CreateTenantInput;
    CreateTopicInput: CreateTopicInput;
    CreateUserInput: CreateUserInput;
    CreateVatTypeInput: CreateVatTypeInput;
    CreateWebhookInput: CreateWebhookInput;
    CreateWebhookInvocationInput: CreateWebhookInvocationInput;
    CurrencySummary: ResolverTypeWrapper<CurrencySummary>;
    CurrencySummaryReport: ResolverTypeWrapper<CurrencySummaryReport>;
    CustomPayment: ResolverTypeWrapper<CustomPayment>;
    CustomPaymentInput: CustomPaymentInput;
    CustomProperties: ResolverTypeWrapper<CustomProperties>;
    CustomPropertiesInput: CustomPropertiesInput;
    Customer: ResolverTypeWrapper<Customer>;
    CustomerConnection: ResolverTypeWrapper<CustomerConnection>;
    CustomerConnectionEdge: ResolverTypeWrapper<CustomerConnectionEdge>;
    CustomerExternalReferenceInput: CustomerExternalReferenceInput;
    CustomerInput: CustomerInput;
    CustomerMutations: ResolverTypeWrapper<CustomerMutations>;
    CustomerQueries: ResolverTypeWrapper<CustomerQueries>;
    Date: ResolverTypeWrapper<Scalars['Date']>;
    DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
    DatetimeContent: ResolverTypeWrapper<DatetimeContent>;
    DatetimeContentInput: DatetimeContentInput;
    Discount: ResolverTypeWrapper<Discount>;
    DiscountInput: DiscountInput;
    Document: ResolverTypeWrapper<Document>;
    DocumentMutations: ResolverTypeWrapper<DocumentMutations>;
    DocumentQueries: ResolverTypeWrapper<DocumentQueries>;
    EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
    File: ResolverTypeWrapper<File>;
    FileContent: ResolverTypeWrapper<FileContent>;
    FileContentInput: FileContentInput;
    FileInput: FileInput;
    FileQueries: ResolverTypeWrapper<FileQueries>;
    FileSize: ResolverTypeWrapper<FileSize>;
    FileSizeUnit: FileSizeUnit;
    FileUploadMutations: ResolverTypeWrapper<FileUploadMutations>;
    FileUploadType: FileUploadType;
    FilesComponentConfig: ResolverTypeWrapper<FilesComponentConfig>;
    FilesComponentConfigInput: FilesComponentConfigInput;
    Float: ResolverTypeWrapper<Scalars['Float']>;
    Folder: ResolverTypeWrapper<Folder>;
    FolderMutations: ResolverTypeWrapper<FolderMutations>;
    FolderQueries: ResolverTypeWrapper<FolderQueries>;
    FullTreeNodeInput: FullTreeNodeInput;
    GenericPublishInput: GenericPublishInput;
    GetTopicByPathArguments: GetTopicByPathArguments;
    Grid: ResolverTypeWrapper<Grid>;
    GridColumn: ResolverTypeWrapper<GridColumn>;
    GridColumnInput: GridColumnInput;
    GridColumnLayout: ResolverTypeWrapper<GridColumnLayout>;
    GridLayoutInput: GridLayoutInput;
    GridMutations: ResolverTypeWrapper<GridMutations>;
    GridPublishInfo: ResolverTypeWrapper<GridPublishInfo>;
    GridQueries: ResolverTypeWrapper<GridQueries>;
    GridRelationsContent: ResolverTypeWrapper<GridRelationsContent>;
    GridRelationsContentInput: GridRelationsContentInput;
    GridRow: ResolverTypeWrapper<GridRow>;
    GridRowInput: GridRowInput;
    HttpMethod: HttpMethod;
    ID: ResolverTypeWrapper<Scalars['ID']>;
    IObjectMetrics: ResolversTypes['ApiCallMetrics'] | ResolversTypes['ItemMetrics'] | ResolversTypes['OrderMetrics'] | ResolversTypes['ShapeMetrics'] | ResolversTypes['WebhookMetrics'];
    IObjectReports: ResolversTypes['SalesReport'];
    IdentifierSuggestion: ResolverTypeWrapper<IdentifierSuggestion>;
    Image: ResolverTypeWrapper<Image>;
    ImageContent: ResolverTypeWrapper<ImageContent>;
    ImageInput: ImageInput;
    ImageMutations: ResolverTypeWrapper<ImageMutations>;
    ImageQueries: ResolverTypeWrapper<ImageQueries>;
    ImageVariant: ResolverTypeWrapper<ImageVariant>;
    ImageVariantInput: ImageVariantInput;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    Interval: Interval;
    InviteToken: ResolverTypeWrapper<InviteToken>;
    InviteTokenMutations: ResolverTypeWrapper<InviteTokenMutations>;
    Item: ResolversTypes['Document'] | ResolversTypes['Folder'] | ResolversTypes['Product'];
    ItemMetrics: ResolverTypeWrapper<ItemMetrics>;
    ItemMutations: ResolverTypeWrapper<ItemMutations>;
    ItemQueries: ResolverTypeWrapper<ItemQueries>;
    ItemRelationsComponentConfig: ResolverTypeWrapper<ItemRelationsComponentConfig>;
    ItemRelationsComponentConfigInput: ItemRelationsComponentConfigInput;
    ItemRelationsContent: ResolverTypeWrapper<ItemRelationsContent>;
    ItemRelationsContentInput: ItemRelationsContentInput;
    ItemType: ItemType;
    JSON: ResolverTypeWrapper<Scalars['JSON']>;
    KeyValuePair: ResolverTypeWrapper<KeyValuePair>;
    KeyValuePairInput: KeyValuePairInput;
    KlarnaPayment: ResolverTypeWrapper<KlarnaPayment>;
    KlarnaPaymentInput: KlarnaPaymentInput;
    Language: ResolverTypeWrapper<Language>;
    LanguageMutations: ResolverTypeWrapper<LanguageMutations>;
    LocationContent: ResolverTypeWrapper<LocationContent>;
    LocationContentInput: LocationContentInput;
    MaxFileSizeInput: MaxFileSizeInput;
    MeMutations: ResolverTypeWrapper<MeMutations>;
    Mutation: ResolverTypeWrapper<{}>;
    NonNegativeFloat: ResolverTypeWrapper<Scalars['NonNegativeFloat']>;
    NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']>;
    NumericComponentConfig: ResolverTypeWrapper<NumericComponentConfig>;
    NumericComponentConfigInput: NumericComponentConfigInput;
    NumericComponentContentInput: NumericComponentContentInput;
    NumericContent: ResolverTypeWrapper<NumericContent>;
    Operation: Operation;
    Order: ResolverTypeWrapper<Omit<Order, 'payment'> & {
        payment?: Maybe<Array<ResolversTypes['Payment']>>;
    }>;
    OrderConnection: ResolverTypeWrapper<OrderConnection>;
    OrderConnectionEdge: ResolverTypeWrapper<OrderConnectionEdge>;
    OrderItem: ResolverTypeWrapper<OrderItem>;
    OrderItemInput: OrderItemInput;
    OrderItemMeteredVariable: ResolverTypeWrapper<OrderItemMeteredVariable>;
    OrderItemSubscription: ResolverTypeWrapper<OrderItemSubscription>;
    OrderItemSubscriptionPeriodUnit: OrderItemSubscriptionPeriodUnit;
    OrderMetrics: ResolverTypeWrapper<OrderMetrics>;
    OrderMutations: ResolverTypeWrapper<OrderMutations>;
    OrderPipeline: ResolverTypeWrapper<OrderPipeline>;
    OrderQueries: ResolverTypeWrapper<OrderQueries>;
    OrderSortField: OrderSortField;
    OrdersReport: ResolverTypeWrapper<OrdersReport>;
    PageInfo: ResolverTypeWrapper<PageInfo>;
    ParagraphCollectionContent: ResolverTypeWrapper<ParagraphCollectionContent>;
    ParagraphCollectionContentInput: ParagraphCollectionContentInput;
    ParagraphContent: ResolverTypeWrapper<ParagraphContent>;
    ParagraphContentInput: ParagraphContentInput;
    Parameter: Parameter;
    Payment: ResolversTypes['CashPayment'] | ResolversTypes['CustomPayment'] | ResolversTypes['KlarnaPayment'] | ResolversTypes['PaypalPayment'] | ResolversTypes['StripePayment'];
    PaymentInput: PaymentInput;
    PaymentProvider: PaymentProvider;
    PaymentType: ResolversTypes['CashPayment'] | ResolversTypes['CustomPayment'] | ResolversTypes['KlarnaPayment'] | ResolversTypes['PaypalPayment'] | ResolversTypes['StripePayment'];
    PaypalPayment: ResolverTypeWrapper<PaypalPayment>;
    PaypalPaymentInput: PaypalPaymentInput;
    PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
    Pipeline: ResolverTypeWrapper<Pipeline>;
    PipelineConnection: ResolverTypeWrapper<PipelineConnection>;
    PipelineConnectionEdge: ResolverTypeWrapper<PipelineConnectionEdge>;
    PipelineMutations: ResolverTypeWrapper<PipelineMutations>;
    PipelineQueries: ResolverTypeWrapper<PipelineQueries>;
    PipelineSortField: PipelineSortField;
    PipelineStage: ResolverTypeWrapper<PipelineStage>;
    PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']>;
    PresignedUploadRequest: ResolverTypeWrapper<PresignedUploadRequest>;
    Price: ResolverTypeWrapper<Price>;
    PriceInput: PriceInput;
    PriceVariant: ResolverTypeWrapper<PriceVariant>;
    PriceVariantMutations: ResolverTypeWrapper<PriceVariantMutations>;
    PriceVariantQueries: ResolverTypeWrapper<PriceVariantQueries>;
    PriceVariantReferenceInput: PriceVariantReferenceInput;
    Product: ResolverTypeWrapper<Product>;
    ProductMutations: ResolverTypeWrapper<ProductMutations>;
    ProductPriceVariant: ResolverTypeWrapper<ProductPriceVariant>;
    ProductQueries: ResolverTypeWrapper<ProductQueries>;
    ProductStockLocation: ResolverTypeWrapper<ProductStockLocation>;
    ProductSubscription: ResolverTypeWrapper<Omit<ProductSubscription, 'payment'> & {
        payment?: Maybe<ResolversTypes['Payment']>;
    }>;
    ProductSubscriptionConnection: ResolverTypeWrapper<ProductSubscriptionConnection>;
    ProductSubscriptionConnectionEdge: ResolverTypeWrapper<ProductSubscriptionConnectionEdge>;
    ProductSubscriptionHistoryEvent: ResolversTypes['ProductSubscriptionHistoryEventCancellation'] | ResolversTypes['ProductSubscriptionHistoryEventRenewal'] | ResolversTypes['ProductSubscriptionHistoryEventRenewalDueBroadcast'];
    ProductSubscriptionHistoryEventCancellation: ResolverTypeWrapper<ProductSubscriptionHistoryEventCancellation>;
    ProductSubscriptionHistoryEventRenewal: ResolverTypeWrapper<ProductSubscriptionHistoryEventRenewal>;
    ProductSubscriptionHistoryEventRenewalDueBroadcast: ResolverTypeWrapper<ProductSubscriptionHistoryEventRenewalDueBroadcast>;
    ProductSubscriptionHistoryEventType: ProductSubscriptionHistoryEventType;
    ProductSubscriptionItem: ResolverTypeWrapper<ProductSubscriptionItem>;
    ProductSubscriptionMutations: ResolverTypeWrapper<ProductSubscriptionMutations>;
    ProductSubscriptionPhase: ResolverTypeWrapper<ProductSubscriptionPhase>;
    ProductSubscriptionPlanReferenceInput: ProductSubscriptionPlanReferenceInput;
    ProductSubscriptionQueries: ResolverTypeWrapper<ProductSubscriptionQueries>;
    ProductSubscriptionSortField: ProductSubscriptionSortField;
    ProductSubscriptionStatus: ResolverTypeWrapper<ProductSubscriptionStatus>;
    ProductSubscriptionUsage: ResolverTypeWrapper<ProductSubscriptionUsage>;
    ProductVariant: ResolverTypeWrapper<ProductVariant>;
    ProductVariantAttribute: ResolverTypeWrapper<ProductVariantAttribute>;
    ProductVariantAttributeInput: ProductVariantAttributeInput;
    ProductVariantSubscriptionMeteredVariable: ResolverTypeWrapper<ProductVariantSubscriptionMeteredVariable>;
    ProductVariantSubscriptionPlan: ResolverTypeWrapper<ProductVariantSubscriptionPlan>;
    ProductVariantSubscriptionPlanPeriod: ResolverTypeWrapper<ProductVariantSubscriptionPlanPeriod>;
    ProductVariantSubscriptionPlanPricing: ResolverTypeWrapper<ProductVariantSubscriptionPlanPricing>;
    ProductVariantSubscriptionPlanTier: ResolverTypeWrapper<ProductVariantSubscriptionPlanTier>;
    PropertiesTableComponentConfig: ResolverTypeWrapper<PropertiesTableComponentConfig>;
    PropertiesTableComponentConfigInput: PropertiesTableComponentConfigInput;
    PropertiesTableComponentConfigSection: ResolverTypeWrapper<PropertiesTableComponentConfigSection>;
    PropertiesTableComponentConfigSectionInput: PropertiesTableComponentConfigSectionInput;
    PropertiesTableComponentSection: ResolverTypeWrapper<PropertiesTableComponentSection>;
    PropertiesTableComponentSectionInput: PropertiesTableComponentSectionInput;
    PropertiesTableContent: ResolverTypeWrapper<PropertiesTableContent>;
    PropertiesTableContentInput: PropertiesTableContentInput;
    PublishInfo: ResolverTypeWrapper<PublishInfo>;
    Query: ResolverTypeWrapper<{}>;
    ReportMetric: ResolverTypeWrapper<ReportMetric>;
    RichTextContent: ResolverTypeWrapper<RichTextContent>;
    RichTextContentInput: RichTextContentInput;
    SalesReport: ResolverTypeWrapper<SalesReport>;
    SearchQueries: ResolverTypeWrapper<SearchQueries>;
    SelectionComponentConfig: ResolverTypeWrapper<SelectionComponentConfig>;
    SelectionComponentConfigInput: SelectionComponentConfigInput;
    SelectionComponentContentInput: SelectionComponentContentInput;
    SelectionComponentOptionConfig: ResolverTypeWrapper<SelectionComponentOptionConfig>;
    SelectionComponentOptionConfigInput: SelectionComponentOptionConfigInput;
    SelectionContent: ResolverTypeWrapper<SelectionContent>;
    Shape: ResolverTypeWrapper<Shape>;
    ShapeComponent: ResolverTypeWrapper<Omit<ShapeComponent, 'config'> & {
        config?: Maybe<ResolversTypes['ComponentConfig']>;
    }>;
    ShapeComponentInput: ShapeComponentInput;
    ShapeMetrics: ResolverTypeWrapper<ShapeMetrics>;
    ShapeMutations: ResolverTypeWrapper<ShapeMutations>;
    ShapeQueries: ResolverTypeWrapper<ShapeQueries>;
    ShapeType: ShapeType;
    SingleLineContent: ResolverTypeWrapper<SingleLineContent>;
    SingleLineContentInput: SingleLineContentInput;
    SortDirection: SortDirection;
    StockLocation: ResolverTypeWrapper<StockLocation>;
    StockLocationMutations: ResolverTypeWrapper<StockLocationMutations>;
    StockLocationQueries: ResolverTypeWrapper<StockLocationQueries>;
    StockLocationReferenceInput: StockLocationReferenceInput;
    StockLocationSettings: ResolverTypeWrapper<StockLocationSettings>;
    StockLocationSettingsInput: StockLocationSettingsInput;
    String: ResolverTypeWrapper<Scalars['String']>;
    StripePayment: ResolverTypeWrapper<StripePayment>;
    StripePaymentInput: StripePaymentInput;
    SubscriptionContract: ResolverTypeWrapper<Omit<SubscriptionContract, 'payment'> & {
        payment?: Maybe<ResolversTypes['Payment']>;
    }>;
    SubscriptionContractAddress: ResolverTypeWrapper<SubscriptionContractAddress>;
    SubscriptionContractCancelledEvent: ResolverTypeWrapper<SubscriptionContractCancelledEvent>;
    SubscriptionContractConnection: ResolverTypeWrapper<SubscriptionContractConnection>;
    SubscriptionContractConnectionEdge: ResolverTypeWrapper<SubscriptionContractConnectionEdge>;
    SubscriptionContractEvent: ResolversTypes['SubscriptionContractCancelledEvent'] | ResolversTypes['SubscriptionContractRenewalDueBroadcastEvent'] | ResolversTypes['SubscriptionContractRenewedEvent'] | ResolversTypes['SubscriptionContractUsageTrackedEvent'];
    SubscriptionContractEventConnection: ResolverTypeWrapper<SubscriptionContractEventConnection>;
    SubscriptionContractEventConnectionEdge: ResolverTypeWrapper<SubscriptionContractEventConnectionEdge>;
    SubscriptionContractEventQueries: ResolverTypeWrapper<SubscriptionContractEventQueries>;
    SubscriptionContractEventSortField: SubscriptionContractEventSortField;
    SubscriptionContractEventType: SubscriptionContractEventType;
    SubscriptionContractItem: ResolverTypeWrapper<SubscriptionContractItem>;
    SubscriptionContractMeteredVariableReference: ResolverTypeWrapper<SubscriptionContractMeteredVariableReference>;
    SubscriptionContractMeteredVariableTierReference: ResolverTypeWrapper<SubscriptionContractMeteredVariableTierReference>;
    SubscriptionContractMutations: ResolverTypeWrapper<SubscriptionContractMutations>;
    SubscriptionContractPhase: ResolverTypeWrapper<SubscriptionContractPhase>;
    SubscriptionContractQueries: ResolverTypeWrapper<SubscriptionContractQueries>;
    SubscriptionContractRenewalDueBroadcastEvent: ResolverTypeWrapper<SubscriptionContractRenewalDueBroadcastEvent>;
    SubscriptionContractRenewalDueBroadcastEventData: ResolverTypeWrapper<SubscriptionContractRenewalDueBroadcastEventData>;
    SubscriptionContractRenewedEvent: ResolverTypeWrapper<SubscriptionContractRenewedEvent>;
    SubscriptionContractSortField: SubscriptionContractSortField;
    SubscriptionContractStatus: ResolverTypeWrapper<SubscriptionContractStatus>;
    SubscriptionContractUsage: ResolverTypeWrapper<SubscriptionContractUsage>;
    SubscriptionContractUsageTrackedEvent: ResolverTypeWrapper<SubscriptionContractUsageTrackedEvent>;
    SubscriptionPeriodUnit: SubscriptionPeriodUnit;
    SubscriptionPlan: ResolverTypeWrapper<SubscriptionPlan>;
    SubscriptionPlanMeteredVariable: ResolverTypeWrapper<SubscriptionPlanMeteredVariable>;
    SubscriptionPlanMeteredVariableInput: SubscriptionPlanMeteredVariableInput;
    SubscriptionPlanMeteredVariableReferenceInput: SubscriptionPlanMeteredVariableReferenceInput;
    SubscriptionPlanMeteredVariableTierReferenceInput: SubscriptionPlanMeteredVariableTierReferenceInput;
    SubscriptionPlanMutations: ResolverTypeWrapper<SubscriptionPlanMutations>;
    SubscriptionPlanPeriod: ResolverTypeWrapper<SubscriptionPlanPeriod>;
    SubscriptionPlanPeriodInput: SubscriptionPlanPeriodInput;
    SubscriptionPlanPeriodReferenceInput: SubscriptionPlanPeriodReferenceInput;
    SubscriptionPlanPhase: ResolverTypeWrapper<SubscriptionPlanPhase>;
    SubscriptionPlanPhaseInput: SubscriptionPlanPhaseInput;
    SubscriptionPlanPriceInput: SubscriptionPlanPriceInput;
    SubscriptionPlanQueries: ResolverTypeWrapper<SubscriptionPlanQueries>;
    SubscriptionPlanReferenceInput: SubscriptionPlanReferenceInput;
    SuggestSearchAggregations: ResolverTypeWrapper<SuggestSearchAggregations>;
    SuggestSearchConnection: ResolverTypeWrapper<SuggestSearchConnection>;
    SuggestSearchConnectionEdge: ResolverTypeWrapper<SuggestSearchConnectionEdge>;
    SuggestSearchItemType: SuggestSearchItemType;
    SuggestSearchResult: ResolverTypeWrapper<SuggestSearchResult>;
    SuggestSearchTypesAggregation: ResolverTypeWrapper<SuggestSearchTypesAggregation>;
    Tax: ResolverTypeWrapper<Tax>;
    TaxInput: TaxInput;
    Tenant: ResolverTypeWrapper<Tenant>;
    TenantAuthenticationMethod: ResolverTypeWrapper<TenantAuthenticationMethod>;
    TenantAuthenticationMethodInput: TenantAuthenticationMethodInput;
    TenantDefaults: ResolverTypeWrapper<TenantDefaults>;
    TenantDefaultsInput: TenantDefaultsInput;
    TenantMetrics: ResolverTypeWrapper<TenantMetrics>;
    TenantMutations: ResolverTypeWrapper<TenantMutations>;
    TenantQueries: ResolverTypeWrapper<TenantQueries>;
    TenantReports: ResolverTypeWrapper<TenantReports>;
    TenantRoleInput: TenantRoleInput;
    TierType: TierType;
    Topic: ResolverTypeWrapper<Topic>;
    TopicItemsModified: ResolverTypeWrapper<TopicItemsModified>;
    TopicMutations: ResolverTypeWrapper<TopicMutations>;
    TopicQueries: ResolverTypeWrapper<TopicQueries>;
    TopicSearchAggregations: ResolverTypeWrapper<TopicSearchAggregations>;
    TopicSearchConnection: ResolverTypeWrapper<TopicSearchConnection>;
    TopicSearchConnectionEdge: ResolverTypeWrapper<TopicSearchConnectionEdge>;
    TopicSearchResult: ResolverTypeWrapper<TopicSearchResult>;
    TrackUsageInput: TrackUsageInput;
    TreeMutations: ResolverTypeWrapper<TreeMutations>;
    TreeNode: ResolverTypeWrapper<TreeNode>;
    TreeNodeIdentifier: ResolverTypeWrapper<TreeNodeIdentifier>;
    TreeNodeIdentifierInput: TreeNodeIdentifierInput;
    TreeNodeInput: TreeNodeInput;
    TreeQueries: ResolverTypeWrapper<TreeQueries>;
    UpdateCustomerAddressInput: UpdateCustomerAddressInput;
    UpdateCustomerInput: UpdateCustomerInput;
    UpdateDocumentInput: UpdateDocumentInput;
    UpdateFolderInput: UpdateFolderInput;
    UpdateGridInput: UpdateGridInput;
    UpdateLanguageInput: UpdateLanguageInput;
    UpdateOrderInput: UpdateOrderInput;
    UpdatePipelineInput: UpdatePipelineInput;
    UpdatePipelineStageInput: UpdatePipelineStageInput;
    UpdatePriceVariantInput: UpdatePriceVariantInput;
    UpdateProductInput: UpdateProductInput;
    UpdateProductSubscriptionInput: UpdateProductSubscriptionInput;
    UpdateProductSubscriptionItemInput: UpdateProductSubscriptionItemInput;
    UpdateProductSubscriptionPhaseInput: UpdateProductSubscriptionPhaseInput;
    UpdateProductSubscriptionStatusInput: UpdateProductSubscriptionStatusInput;
    UpdateProductVariantInput: UpdateProductVariantInput;
    UpdateShapeInput: UpdateShapeInput;
    UpdateSingleProductVariantInput: UpdateSingleProductVariantInput;
    UpdateStockLocationInput: UpdateStockLocationInput;
    UpdateSubscriptionContractInput: UpdateSubscriptionContractInput;
    UpdateSubscriptionContractItemInput: UpdateSubscriptionContractItemInput;
    UpdateSubscriptionContractPhaseInput: UpdateSubscriptionContractPhaseInput;
    UpdateSubscriptionContractStatusInput: UpdateSubscriptionContractStatusInput;
    UpdateSubscriptionPlanInput: UpdateSubscriptionPlanInput;
    UpdateTenantInput: UpdateTenantInput;
    UpdateTopicInput: UpdateTopicInput;
    UpdateUserInput: UpdateUserInput;
    UpdateVatTypeInput: UpdateVatTypeInput;
    UpdateWebhookInput: UpdateWebhookInput;
    UploadField: ResolverTypeWrapper<UploadField>;
    User: ResolverTypeWrapper<User>;
    UserMetrics: ResolverTypeWrapper<UserMetrics>;
    UserMutations: ResolverTypeWrapper<UserMutations>;
    UserQueries: ResolverTypeWrapper<UserQueries>;
    UserRole: UserRole;
    UserRoleInput: UserRoleInput;
    UserRoles: UserRoles;
    UserTenantRole: ResolverTypeWrapper<UserTenantRole>;
    VatType: ResolverTypeWrapper<VatType>;
    VatTypeMutations: ResolverTypeWrapper<VatTypeMutations>;
    VersionInfo: ResolverTypeWrapper<VersionInfo>;
    VersionLabel: VersionLabel;
    VersionedRecordInfo: ResolverTypeWrapper<VersionedRecordInfo>;
    VersionedServices: ResolverTypeWrapper<VersionedServices>;
    Video: ResolverTypeWrapper<Video>;
    VideoContent: ResolverTypeWrapper<VideoContent>;
    VideoInput: VideoInput;
    VideoMutations: ResolverTypeWrapper<VideoMutations>;
    Webhook: ResolverTypeWrapper<Webhook>;
    WebhookHeader: ResolverTypeWrapper<WebhookHeader>;
    WebhookHeaderInput: WebhookHeaderInput;
    WebhookInvocation: ResolverTypeWrapper<WebhookInvocation>;
    WebhookInvocationResponse: ResolverTypeWrapper<WebhookInvocationResponse>;
    WebhookMetrics: ResolverTypeWrapper<WebhookMetrics>;
    WebhookMutations: ResolverTypeWrapper<WebhookMutations>;
    WebhookQueries: ResolverTypeWrapper<WebhookQueries>;
};
/** Mapping between all available schema types and the resolvers parents */
export declare type ResolversParentTypes = {
    AcceptedContentType: AcceptedContentType;
    AcceptedContentTypeInput: AcceptedContentTypeInput;
    AccessToken: AccessToken;
    AccessTokenMutations: AccessTokenMutations;
    AddLanguageInput: AddLanguageInput;
    Address: Address;
    AddressInput: AddressInput;
    ApiCallMetrics: ApiCallMetrics;
    BandwidthUsageMetrics: BandwidthUsageMetrics;
    Boolean: Scalars['Boolean'];
    BooleanContent: BooleanContent;
    BooleanContentInput: BooleanContentInput;
    BulkCreateDocumentInput: BulkCreateDocumentInput;
    BulkCreateFolderInput: BulkCreateFolderInput;
    BulkCreateProductInput: BulkCreateProductInput;
    BulkCreateShapeInput: BulkCreateShapeInput;
    BulkCreateTenantInput: BulkCreateTenantInput;
    BulkCreateTopicInput: BulkCreateTopicInput;
    BulkCreateUserInput: BulkCreateUserInput;
    BulkCreateVatTypeInput: BulkCreateVatTypeInput;
    CashPayment: CashPayment;
    CashPaymentInput: CashPaymentInput;
    Component: Omit<Component, 'content'> & {
        content?: Maybe<ResolversParentTypes['ComponentContent']>;
    };
    ComponentChoiceComponentConfig: ComponentChoiceComponentConfig;
    ComponentChoiceComponentConfigInput: ComponentChoiceComponentConfigInput;
    ComponentChoiceContent: ComponentChoiceContent;
    ComponentConfig: ResolversParentTypes['ComponentChoiceComponentConfig'] | ResolversParentTypes['ContentChunkComponentConfig'] | ResolversParentTypes['FilesComponentConfig'] | ResolversParentTypes['ItemRelationsComponentConfig'] | ResolversParentTypes['NumericComponentConfig'] | ResolversParentTypes['PropertiesTableComponentConfig'] | ResolversParentTypes['SelectionComponentConfig'];
    ComponentConfigInput: ComponentConfigInput;
    ComponentContent: ResolversParentTypes['BooleanContent'] | ResolversParentTypes['ComponentChoiceContent'] | ResolversParentTypes['ContentChunkContent'] | ResolversParentTypes['DatetimeContent'] | ResolversParentTypes['FileContent'] | ResolversParentTypes['GridRelationsContent'] | ResolversParentTypes['ImageContent'] | ResolversParentTypes['ItemRelationsContent'] | ResolversParentTypes['LocationContent'] | ResolversParentTypes['NumericContent'] | ResolversParentTypes['ParagraphCollectionContent'] | ResolversParentTypes['PropertiesTableContent'] | ResolversParentTypes['RichTextContent'] | ResolversParentTypes['SelectionContent'] | ResolversParentTypes['SingleLineContent'] | ResolversParentTypes['VideoContent'];
    ComponentInput: ComponentInput;
    ContentChunkComponentConfig: ContentChunkComponentConfig;
    ContentChunkComponentConfigInput: ContentChunkComponentConfigInput;
    ContentChunkContent: ContentChunkContent;
    ContentChunkContentInput: ContentChunkContentInput;
    ContractSubscriptionPlanReferenceInput: ContractSubscriptionPlanReferenceInput;
    CreateAccessTokenInput: CreateAccessTokenInput;
    CreateChildTopicInput: CreateChildTopicInput;
    CreateCustomerAddressInput: CreateCustomerAddressInput;
    CreateCustomerInput: CreateCustomerInput;
    CreateDocumentInput: CreateDocumentInput;
    CreateFolderInput: CreateFolderInput;
    CreateGridInput: CreateGridInput;
    CreatePipelineInput: CreatePipelineInput;
    CreatePipelineStageInput: CreatePipelineStageInput;
    CreatePriceVariantInput: CreatePriceVariantInput;
    CreateProductInput: CreateProductInput;
    CreateProductSubscriptionAddressInput: CreateProductSubscriptionAddressInput;
    CreateProductSubscriptionInput: CreateProductSubscriptionInput;
    CreateProductSubscriptionItemInput: CreateProductSubscriptionItemInput;
    CreateProductSubscriptionMeteredVariableInput: CreateProductSubscriptionMeteredVariableInput;
    CreateProductSubscriptionMeteredVariableTierInput: CreateProductSubscriptionMeteredVariableTierInput;
    CreateProductSubscriptionPhaseInput: CreateProductSubscriptionPhaseInput;
    CreateProductSubscriptionStatusInput: CreateProductSubscriptionStatusInput;
    CreateProductVariantInput: CreateProductVariantInput;
    CreateShapeInput: CreateShapeInput;
    CreateStockLocationInput: CreateStockLocationInput;
    CreateSubscriptionContractAddressInput: CreateSubscriptionContractAddressInput;
    CreateSubscriptionContractInput: CreateSubscriptionContractInput;
    CreateSubscriptionContractItemInput: CreateSubscriptionContractItemInput;
    CreateSubscriptionContractMeteredVariableReferenceInput: CreateSubscriptionContractMeteredVariableReferenceInput;
    CreateSubscriptionContractMeteredVariableTierInput: CreateSubscriptionContractMeteredVariableTierInput;
    CreateSubscriptionContractPhaseInput: CreateSubscriptionContractPhaseInput;
    CreateSubscriptionContractStatusInput: CreateSubscriptionContractStatusInput;
    CreateSubscriptionPlanInput: CreateSubscriptionPlanInput;
    CreateTenantInput: CreateTenantInput;
    CreateTopicInput: CreateTopicInput;
    CreateUserInput: CreateUserInput;
    CreateVatTypeInput: CreateVatTypeInput;
    CreateWebhookInput: CreateWebhookInput;
    CreateWebhookInvocationInput: CreateWebhookInvocationInput;
    CurrencySummary: CurrencySummary;
    CurrencySummaryReport: CurrencySummaryReport;
    CustomPayment: CustomPayment;
    CustomPaymentInput: CustomPaymentInput;
    CustomProperties: CustomProperties;
    CustomPropertiesInput: CustomPropertiesInput;
    Customer: Customer;
    CustomerConnection: CustomerConnection;
    CustomerConnectionEdge: CustomerConnectionEdge;
    CustomerExternalReferenceInput: CustomerExternalReferenceInput;
    CustomerInput: CustomerInput;
    CustomerMutations: CustomerMutations;
    CustomerQueries: CustomerQueries;
    Date: Scalars['Date'];
    DateTime: Scalars['DateTime'];
    DatetimeContent: DatetimeContent;
    DatetimeContentInput: DatetimeContentInput;
    Discount: Discount;
    DiscountInput: DiscountInput;
    Document: Document;
    DocumentMutations: DocumentMutations;
    DocumentQueries: DocumentQueries;
    EmailAddress: Scalars['EmailAddress'];
    File: File;
    FileContent: FileContent;
    FileContentInput: FileContentInput;
    FileInput: FileInput;
    FileQueries: FileQueries;
    FileSize: FileSize;
    FileUploadMutations: FileUploadMutations;
    FilesComponentConfig: FilesComponentConfig;
    FilesComponentConfigInput: FilesComponentConfigInput;
    Float: Scalars['Float'];
    Folder: Folder;
    FolderMutations: FolderMutations;
    FolderQueries: FolderQueries;
    FullTreeNodeInput: FullTreeNodeInput;
    GenericPublishInput: GenericPublishInput;
    GetTopicByPathArguments: GetTopicByPathArguments;
    Grid: Grid;
    GridColumn: GridColumn;
    GridColumnInput: GridColumnInput;
    GridColumnLayout: GridColumnLayout;
    GridLayoutInput: GridLayoutInput;
    GridMutations: GridMutations;
    GridPublishInfo: GridPublishInfo;
    GridQueries: GridQueries;
    GridRelationsContent: GridRelationsContent;
    GridRelationsContentInput: GridRelationsContentInput;
    GridRow: GridRow;
    GridRowInput: GridRowInput;
    ID: Scalars['ID'];
    IObjectMetrics: ResolversParentTypes['ApiCallMetrics'] | ResolversParentTypes['ItemMetrics'] | ResolversParentTypes['OrderMetrics'] | ResolversParentTypes['ShapeMetrics'] | ResolversParentTypes['WebhookMetrics'];
    IObjectReports: ResolversParentTypes['SalesReport'];
    IdentifierSuggestion: IdentifierSuggestion;
    Image: Image;
    ImageContent: ImageContent;
    ImageInput: ImageInput;
    ImageMutations: ImageMutations;
    ImageQueries: ImageQueries;
    ImageVariant: ImageVariant;
    ImageVariantInput: ImageVariantInput;
    Int: Scalars['Int'];
    InviteToken: InviteToken;
    InviteTokenMutations: InviteTokenMutations;
    Item: ResolversParentTypes['Document'] | ResolversParentTypes['Folder'] | ResolversParentTypes['Product'];
    ItemMetrics: ItemMetrics;
    ItemMutations: ItemMutations;
    ItemQueries: ItemQueries;
    ItemRelationsComponentConfig: ItemRelationsComponentConfig;
    ItemRelationsComponentConfigInput: ItemRelationsComponentConfigInput;
    ItemRelationsContent: ItemRelationsContent;
    ItemRelationsContentInput: ItemRelationsContentInput;
    JSON: Scalars['JSON'];
    KeyValuePair: KeyValuePair;
    KeyValuePairInput: KeyValuePairInput;
    KlarnaPayment: KlarnaPayment;
    KlarnaPaymentInput: KlarnaPaymentInput;
    Language: Language;
    LanguageMutations: LanguageMutations;
    LocationContent: LocationContent;
    LocationContentInput: LocationContentInput;
    MaxFileSizeInput: MaxFileSizeInput;
    MeMutations: MeMutations;
    Mutation: {};
    NonNegativeFloat: Scalars['NonNegativeFloat'];
    NonNegativeInt: Scalars['NonNegativeInt'];
    NumericComponentConfig: NumericComponentConfig;
    NumericComponentConfigInput: NumericComponentConfigInput;
    NumericComponentContentInput: NumericComponentContentInput;
    NumericContent: NumericContent;
    Order: Omit<Order, 'payment'> & {
        payment?: Maybe<Array<ResolversParentTypes['Payment']>>;
    };
    OrderConnection: OrderConnection;
    OrderConnectionEdge: OrderConnectionEdge;
    OrderItem: OrderItem;
    OrderItemInput: OrderItemInput;
    OrderItemMeteredVariable: OrderItemMeteredVariable;
    OrderItemSubscription: OrderItemSubscription;
    OrderMetrics: OrderMetrics;
    OrderMutations: OrderMutations;
    OrderPipeline: OrderPipeline;
    OrderQueries: OrderQueries;
    OrdersReport: OrdersReport;
    PageInfo: PageInfo;
    ParagraphCollectionContent: ParagraphCollectionContent;
    ParagraphCollectionContentInput: ParagraphCollectionContentInput;
    ParagraphContent: ParagraphContent;
    ParagraphContentInput: ParagraphContentInput;
    Payment: ResolversParentTypes['CashPayment'] | ResolversParentTypes['CustomPayment'] | ResolversParentTypes['KlarnaPayment'] | ResolversParentTypes['PaypalPayment'] | ResolversParentTypes['StripePayment'];
    PaymentInput: PaymentInput;
    PaymentType: ResolversParentTypes['CashPayment'] | ResolversParentTypes['CustomPayment'] | ResolversParentTypes['KlarnaPayment'] | ResolversParentTypes['PaypalPayment'] | ResolversParentTypes['StripePayment'];
    PaypalPayment: PaypalPayment;
    PaypalPaymentInput: PaypalPaymentInput;
    PhoneNumber: Scalars['PhoneNumber'];
    Pipeline: Pipeline;
    PipelineConnection: PipelineConnection;
    PipelineConnectionEdge: PipelineConnectionEdge;
    PipelineMutations: PipelineMutations;
    PipelineQueries: PipelineQueries;
    PipelineStage: PipelineStage;
    PositiveInt: Scalars['PositiveInt'];
    PresignedUploadRequest: PresignedUploadRequest;
    Price: Price;
    PriceInput: PriceInput;
    PriceVariant: PriceVariant;
    PriceVariantMutations: PriceVariantMutations;
    PriceVariantQueries: PriceVariantQueries;
    PriceVariantReferenceInput: PriceVariantReferenceInput;
    Product: Product;
    ProductMutations: ProductMutations;
    ProductPriceVariant: ProductPriceVariant;
    ProductQueries: ProductQueries;
    ProductStockLocation: ProductStockLocation;
    ProductSubscription: Omit<ProductSubscription, 'payment'> & {
        payment?: Maybe<ResolversParentTypes['Payment']>;
    };
    ProductSubscriptionConnection: ProductSubscriptionConnection;
    ProductSubscriptionConnectionEdge: ProductSubscriptionConnectionEdge;
    ProductSubscriptionHistoryEvent: ResolversParentTypes['ProductSubscriptionHistoryEventCancellation'] | ResolversParentTypes['ProductSubscriptionHistoryEventRenewal'] | ResolversParentTypes['ProductSubscriptionHistoryEventRenewalDueBroadcast'];
    ProductSubscriptionHistoryEventCancellation: ProductSubscriptionHistoryEventCancellation;
    ProductSubscriptionHistoryEventRenewal: ProductSubscriptionHistoryEventRenewal;
    ProductSubscriptionHistoryEventRenewalDueBroadcast: ProductSubscriptionHistoryEventRenewalDueBroadcast;
    ProductSubscriptionItem: ProductSubscriptionItem;
    ProductSubscriptionMutations: ProductSubscriptionMutations;
    ProductSubscriptionPhase: ProductSubscriptionPhase;
    ProductSubscriptionPlanReferenceInput: ProductSubscriptionPlanReferenceInput;
    ProductSubscriptionQueries: ProductSubscriptionQueries;
    ProductSubscriptionStatus: ProductSubscriptionStatus;
    ProductSubscriptionUsage: ProductSubscriptionUsage;
    ProductVariant: ProductVariant;
    ProductVariantAttribute: ProductVariantAttribute;
    ProductVariantAttributeInput: ProductVariantAttributeInput;
    ProductVariantSubscriptionMeteredVariable: ProductVariantSubscriptionMeteredVariable;
    ProductVariantSubscriptionPlan: ProductVariantSubscriptionPlan;
    ProductVariantSubscriptionPlanPeriod: ProductVariantSubscriptionPlanPeriod;
    ProductVariantSubscriptionPlanPricing: ProductVariantSubscriptionPlanPricing;
    ProductVariantSubscriptionPlanTier: ProductVariantSubscriptionPlanTier;
    PropertiesTableComponentConfig: PropertiesTableComponentConfig;
    PropertiesTableComponentConfigInput: PropertiesTableComponentConfigInput;
    PropertiesTableComponentConfigSection: PropertiesTableComponentConfigSection;
    PropertiesTableComponentConfigSectionInput: PropertiesTableComponentConfigSectionInput;
    PropertiesTableComponentSection: PropertiesTableComponentSection;
    PropertiesTableComponentSectionInput: PropertiesTableComponentSectionInput;
    PropertiesTableContent: PropertiesTableContent;
    PropertiesTableContentInput: PropertiesTableContentInput;
    PublishInfo: PublishInfo;
    Query: {};
    ReportMetric: ReportMetric;
    RichTextContent: RichTextContent;
    RichTextContentInput: RichTextContentInput;
    SalesReport: SalesReport;
    SearchQueries: SearchQueries;
    SelectionComponentConfig: SelectionComponentConfig;
    SelectionComponentConfigInput: SelectionComponentConfigInput;
    SelectionComponentContentInput: SelectionComponentContentInput;
    SelectionComponentOptionConfig: SelectionComponentOptionConfig;
    SelectionComponentOptionConfigInput: SelectionComponentOptionConfigInput;
    SelectionContent: SelectionContent;
    Shape: Shape;
    ShapeComponent: Omit<ShapeComponent, 'config'> & {
        config?: Maybe<ResolversParentTypes['ComponentConfig']>;
    };
    ShapeComponentInput: ShapeComponentInput;
    ShapeMetrics: ShapeMetrics;
    ShapeMutations: ShapeMutations;
    ShapeQueries: ShapeQueries;
    SingleLineContent: SingleLineContent;
    SingleLineContentInput: SingleLineContentInput;
    StockLocation: StockLocation;
    StockLocationMutations: StockLocationMutations;
    StockLocationQueries: StockLocationQueries;
    StockLocationReferenceInput: StockLocationReferenceInput;
    StockLocationSettings: StockLocationSettings;
    StockLocationSettingsInput: StockLocationSettingsInput;
    String: Scalars['String'];
    StripePayment: StripePayment;
    StripePaymentInput: StripePaymentInput;
    SubscriptionContract: Omit<SubscriptionContract, 'payment'> & {
        payment?: Maybe<ResolversParentTypes['Payment']>;
    };
    SubscriptionContractAddress: SubscriptionContractAddress;
    SubscriptionContractCancelledEvent: SubscriptionContractCancelledEvent;
    SubscriptionContractConnection: SubscriptionContractConnection;
    SubscriptionContractConnectionEdge: SubscriptionContractConnectionEdge;
    SubscriptionContractEvent: ResolversParentTypes['SubscriptionContractCancelledEvent'] | ResolversParentTypes['SubscriptionContractRenewalDueBroadcastEvent'] | ResolversParentTypes['SubscriptionContractRenewedEvent'] | ResolversParentTypes['SubscriptionContractUsageTrackedEvent'];
    SubscriptionContractEventConnection: SubscriptionContractEventConnection;
    SubscriptionContractEventConnectionEdge: SubscriptionContractEventConnectionEdge;
    SubscriptionContractEventQueries: SubscriptionContractEventQueries;
    SubscriptionContractItem: SubscriptionContractItem;
    SubscriptionContractMeteredVariableReference: SubscriptionContractMeteredVariableReference;
    SubscriptionContractMeteredVariableTierReference: SubscriptionContractMeteredVariableTierReference;
    SubscriptionContractMutations: SubscriptionContractMutations;
    SubscriptionContractPhase: SubscriptionContractPhase;
    SubscriptionContractQueries: SubscriptionContractQueries;
    SubscriptionContractRenewalDueBroadcastEvent: SubscriptionContractRenewalDueBroadcastEvent;
    SubscriptionContractRenewalDueBroadcastEventData: SubscriptionContractRenewalDueBroadcastEventData;
    SubscriptionContractRenewedEvent: SubscriptionContractRenewedEvent;
    SubscriptionContractStatus: SubscriptionContractStatus;
    SubscriptionContractUsage: SubscriptionContractUsage;
    SubscriptionContractUsageTrackedEvent: SubscriptionContractUsageTrackedEvent;
    SubscriptionPlan: SubscriptionPlan;
    SubscriptionPlanMeteredVariable: SubscriptionPlanMeteredVariable;
    SubscriptionPlanMeteredVariableInput: SubscriptionPlanMeteredVariableInput;
    SubscriptionPlanMeteredVariableReferenceInput: SubscriptionPlanMeteredVariableReferenceInput;
    SubscriptionPlanMeteredVariableTierReferenceInput: SubscriptionPlanMeteredVariableTierReferenceInput;
    SubscriptionPlanMutations: SubscriptionPlanMutations;
    SubscriptionPlanPeriod: SubscriptionPlanPeriod;
    SubscriptionPlanPeriodInput: SubscriptionPlanPeriodInput;
    SubscriptionPlanPeriodReferenceInput: SubscriptionPlanPeriodReferenceInput;
    SubscriptionPlanPhase: SubscriptionPlanPhase;
    SubscriptionPlanPhaseInput: SubscriptionPlanPhaseInput;
    SubscriptionPlanPriceInput: SubscriptionPlanPriceInput;
    SubscriptionPlanQueries: SubscriptionPlanQueries;
    SubscriptionPlanReferenceInput: SubscriptionPlanReferenceInput;
    SuggestSearchAggregations: SuggestSearchAggregations;
    SuggestSearchConnection: SuggestSearchConnection;
    SuggestSearchConnectionEdge: SuggestSearchConnectionEdge;
    SuggestSearchResult: SuggestSearchResult;
    SuggestSearchTypesAggregation: SuggestSearchTypesAggregation;
    Tax: Tax;
    TaxInput: TaxInput;
    Tenant: Tenant;
    TenantAuthenticationMethod: TenantAuthenticationMethod;
    TenantAuthenticationMethodInput: TenantAuthenticationMethodInput;
    TenantDefaults: TenantDefaults;
    TenantDefaultsInput: TenantDefaultsInput;
    TenantMetrics: TenantMetrics;
    TenantMutations: TenantMutations;
    TenantQueries: TenantQueries;
    TenantReports: TenantReports;
    TenantRoleInput: TenantRoleInput;
    Topic: Topic;
    TopicItemsModified: TopicItemsModified;
    TopicMutations: TopicMutations;
    TopicQueries: TopicQueries;
    TopicSearchAggregations: TopicSearchAggregations;
    TopicSearchConnection: TopicSearchConnection;
    TopicSearchConnectionEdge: TopicSearchConnectionEdge;
    TopicSearchResult: TopicSearchResult;
    TrackUsageInput: TrackUsageInput;
    TreeMutations: TreeMutations;
    TreeNode: TreeNode;
    TreeNodeIdentifier: TreeNodeIdentifier;
    TreeNodeIdentifierInput: TreeNodeIdentifierInput;
    TreeNodeInput: TreeNodeInput;
    TreeQueries: TreeQueries;
    UpdateCustomerAddressInput: UpdateCustomerAddressInput;
    UpdateCustomerInput: UpdateCustomerInput;
    UpdateDocumentInput: UpdateDocumentInput;
    UpdateFolderInput: UpdateFolderInput;
    UpdateGridInput: UpdateGridInput;
    UpdateLanguageInput: UpdateLanguageInput;
    UpdateOrderInput: UpdateOrderInput;
    UpdatePipelineInput: UpdatePipelineInput;
    UpdatePipelineStageInput: UpdatePipelineStageInput;
    UpdatePriceVariantInput: UpdatePriceVariantInput;
    UpdateProductInput: UpdateProductInput;
    UpdateProductSubscriptionInput: UpdateProductSubscriptionInput;
    UpdateProductSubscriptionItemInput: UpdateProductSubscriptionItemInput;
    UpdateProductSubscriptionPhaseInput: UpdateProductSubscriptionPhaseInput;
    UpdateProductSubscriptionStatusInput: UpdateProductSubscriptionStatusInput;
    UpdateProductVariantInput: UpdateProductVariantInput;
    UpdateShapeInput: UpdateShapeInput;
    UpdateSingleProductVariantInput: UpdateSingleProductVariantInput;
    UpdateStockLocationInput: UpdateStockLocationInput;
    UpdateSubscriptionContractInput: UpdateSubscriptionContractInput;
    UpdateSubscriptionContractItemInput: UpdateSubscriptionContractItemInput;
    UpdateSubscriptionContractPhaseInput: UpdateSubscriptionContractPhaseInput;
    UpdateSubscriptionContractStatusInput: UpdateSubscriptionContractStatusInput;
    UpdateSubscriptionPlanInput: UpdateSubscriptionPlanInput;
    UpdateTenantInput: UpdateTenantInput;
    UpdateTopicInput: UpdateTopicInput;
    UpdateUserInput: UpdateUserInput;
    UpdateVatTypeInput: UpdateVatTypeInput;
    UpdateWebhookInput: UpdateWebhookInput;
    UploadField: UploadField;
    User: User;
    UserMetrics: UserMetrics;
    UserMutations: UserMutations;
    UserQueries: UserQueries;
    UserRoleInput: UserRoleInput;
    UserTenantRole: UserTenantRole;
    VatType: VatType;
    VatTypeMutations: VatTypeMutations;
    VersionInfo: VersionInfo;
    VersionedRecordInfo: VersionedRecordInfo;
    VersionedServices: VersionedServices;
    Video: Video;
    VideoContent: VideoContent;
    VideoInput: VideoInput;
    VideoMutations: VideoMutations;
    Webhook: Webhook;
    WebhookHeader: WebhookHeader;
    WebhookHeaderInput: WebhookHeaderInput;
    WebhookInvocation: WebhookInvocation;
    WebhookInvocationResponse: WebhookInvocationResponse;
    WebhookMetrics: WebhookMetrics;
    WebhookMutations: WebhookMutations;
    WebhookQueries: WebhookQueries;
};
export declare type AcceptedContentTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AcceptedContentType'] = ResolversParentTypes['AcceptedContentType']> = {
    contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    extensionLabel?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type AccessTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccessToken'] = ResolversParentTypes['AccessToken']> = {
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    lastUsed?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    secret?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type AccessTokenMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccessTokenMutations'] = ResolversParentTypes['AccessTokenMutations']> = {
    create?: Resolver<ResolversTypes['AccessToken'], ParentType, ContextType, RequireFields<AccessTokenMutationsCreateArgs, 'input' | 'userId'>>;
    delete?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<AccessTokenMutationsDeleteArgs, 'id'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
    city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    email?: Resolver<Maybe<ResolversTypes['EmailAddress']>, ParentType, ContextType>;
    firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    middleName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    postalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    street2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    streetNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    type?: Resolver<ResolversTypes['AddressType'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ApiCallMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ApiCallMetrics'] = ResolversParentTypes['ApiCallMetrics']> = {
    count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<ApiCallMetricsCountArgs, never>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type BandwidthUsageMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['BandwidthUsageMetrics'] = ResolversParentTypes['BandwidthUsageMetrics']> = {
    total?: Resolver<ResolversTypes['Float'], ParentType, ContextType, RequireFields<BandwidthUsageMetricsTotalArgs, 'unit'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type BooleanContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['BooleanContent'] = ResolversParentTypes['BooleanContent']> = {
    value?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type CashPaymentResolvers<ContextType = any, ParentType extends ResolversParentTypes['CashPayment'] = ResolversParentTypes['CashPayment']> = {
    cash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    provider?: Resolver<ResolversTypes['PaymentProvider'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ComponentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Component'] = ResolversParentTypes['Component']> = {
    componentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    content?: Resolver<Maybe<ResolversTypes['ComponentContent']>, ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['ComponentType'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ComponentChoiceComponentConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['ComponentChoiceComponentConfig'] = ResolversParentTypes['ComponentChoiceComponentConfig']> = {
    choices?: Resolver<Array<ResolversTypes['ShapeComponent']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ComponentChoiceContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['ComponentChoiceContent'] = ResolversParentTypes['ComponentChoiceContent']> = {
    selectedComponent?: Resolver<ResolversTypes['Component'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ComponentConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['ComponentConfig'] = ResolversParentTypes['ComponentConfig']> = {
    __resolveType: TypeResolveFn<'ComponentChoiceComponentConfig' | 'ContentChunkComponentConfig' | 'FilesComponentConfig' | 'ItemRelationsComponentConfig' | 'NumericComponentConfig' | 'PropertiesTableComponentConfig' | 'SelectionComponentConfig', ParentType, ContextType>;
};
export declare type ComponentContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['ComponentContent'] = ResolversParentTypes['ComponentContent']> = {
    __resolveType: TypeResolveFn<'BooleanContent' | 'ComponentChoiceContent' | 'ContentChunkContent' | 'DatetimeContent' | 'FileContent' | 'GridRelationsContent' | 'ImageContent' | 'ItemRelationsContent' | 'LocationContent' | 'NumericContent' | 'ParagraphCollectionContent' | 'PropertiesTableContent' | 'RichTextContent' | 'SelectionContent' | 'SingleLineContent' | 'VideoContent', ParentType, ContextType>;
};
export declare type ContentChunkComponentConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContentChunkComponentConfig'] = ResolversParentTypes['ContentChunkComponentConfig']> = {
    components?: Resolver<Array<ResolversTypes['ShapeComponent']>, ParentType, ContextType>;
    repeatable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ContentChunkContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContentChunkContent'] = ResolversParentTypes['ContentChunkContent']> = {
    chunks?: Resolver<Array<Array<ResolversTypes['Component']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type CurrencySummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['CurrencySummary'] = ResolversParentTypes['CurrencySummary']> = {
    currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    value?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type CurrencySummaryReportResolvers<ContextType = any, ParentType extends ResolversParentTypes['CurrencySummaryReport'] = ResolversParentTypes['CurrencySummaryReport']> = {
    orders?: Resolver<Array<Maybe<ResolversTypes['CurrencySummary']>>, ParentType, ContextType, RequireFields<CurrencySummaryReportOrdersArgs, 'tenantId'>>;
    sales?: Resolver<Array<Maybe<ResolversTypes['CurrencySummary']>>, ParentType, ContextType, RequireFields<CurrencySummaryReportSalesArgs, 'tenantId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type CustomPaymentResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomPayment'] = ResolversParentTypes['CustomPayment']> = {
    properties?: Resolver<Maybe<Array<ResolversTypes['CustomProperties']>>, ParentType, ContextType>;
    provider?: Resolver<ResolversTypes['PaymentProvider'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type CustomPropertiesResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomProperties'] = ResolversParentTypes['CustomProperties']> = {
    property?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
    addresses?: Resolver<Maybe<Array<ResolversTypes['Address']>>, ParentType, ContextType>;
    birthDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    companyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    externalReference?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<CustomerExternalReferenceArgs, 'key'>>;
    externalReferences?: Resolver<Maybe<Array<ResolversTypes['KeyValuePair']>>, ParentType, ContextType>;
    firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    identifier?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    meta?: Resolver<Maybe<Array<ResolversTypes['KeyValuePair']>>, ParentType, ContextType>;
    metaProperty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<CustomerMetaPropertyArgs, 'key'>>;
    middleName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    taxNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    tenantId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type CustomerConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerConnection'] = ResolversParentTypes['CustomerConnection']> = {
    edges?: Resolver<Maybe<Array<ResolversTypes['CustomerConnectionEdge']>>, ParentType, ContextType>;
    pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type CustomerConnectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerConnectionEdge'] = ResolversParentTypes['CustomerConnectionEdge']> = {
    cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    node?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type CustomerMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerMutations'] = ResolversParentTypes['CustomerMutations']> = {
    create?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<CustomerMutationsCreateArgs, 'input'>>;
    createAddress?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<CustomerMutationsCreateAddressArgs, 'identifier' | 'input' | 'tenantId'>>;
    delete?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<CustomerMutationsDeleteArgs, 'deleteSubscriptionContracts' | 'identifier' | 'tenantId'>>;
    deleteAddress?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<CustomerMutationsDeleteAddressArgs, 'addressId' | 'identifier' | 'tenantId'>>;
    update?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<CustomerMutationsUpdateArgs, 'identifier' | 'input' | 'tenantId'>>;
    updateAddress?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<CustomerMutationsUpdateAddressArgs, 'addressId' | 'identifier' | 'input' | 'tenantId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type CustomerQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerQueries'] = ResolversParentTypes['CustomerQueries']> = {
    get?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<CustomerQueriesGetArgs, 'tenantId'>>;
    getMany?: Resolver<Maybe<ResolversTypes['CustomerConnection']>, ParentType, ContextType, RequireFields<CustomerQueriesGetManyArgs, 'first' | 'tenantId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
    name: 'Date';
}
export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
    name: 'DateTime';
}
export declare type DatetimeContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['DatetimeContent'] = ResolversParentTypes['DatetimeContent']> = {
    datetime?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type DiscountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Discount'] = ResolversParentTypes['Discount']> = {
    percent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type DocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document']> = {
    components?: Resolver<Maybe<Array<ResolversTypes['Component']>>, ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    externalReference?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    hasVersion?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<DocumentHasVersionArgs, never>>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    relatingItems?: Resolver<Maybe<Array<ResolversTypes['Item']>>, ParentType, ContextType>;
    shape?: Resolver<Maybe<ResolversTypes['Shape']>, ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    topics?: Resolver<Maybe<Array<ResolversTypes['Topic']>>, ParentType, ContextType>;
    tree?: Resolver<Maybe<ResolversTypes['TreeNode']>, ParentType, ContextType>;
    type?: Resolver<ResolversTypes['ItemType'], ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    version?: Resolver<Maybe<ResolversTypes['VersionedRecordInfo']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type DocumentMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['DocumentMutations'] = ResolversParentTypes['DocumentMutations']> = {
    create?: Resolver<ResolversTypes['Document'], ParentType, ContextType, RequireFields<DocumentMutationsCreateArgs, 'input' | 'language'>>;
    delete?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<DocumentMutationsDeleteArgs, 'id'>>;
    publish?: Resolver<ResolversTypes['PublishInfo'], ParentType, ContextType, RequireFields<DocumentMutationsPublishArgs, 'id' | 'includeDescendants' | 'language'>>;
    unpublish?: Resolver<Maybe<ResolversTypes['PublishInfo']>, ParentType, ContextType, RequireFields<DocumentMutationsUnpublishArgs, 'id' | 'includeDescendants' | 'language'>>;
    update?: Resolver<ResolversTypes['Document'], ParentType, ContextType, RequireFields<DocumentMutationsUpdateArgs, 'id' | 'input' | 'language'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type DocumentQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['DocumentQueries'] = ResolversParentTypes['DocumentQueries']> = {
    get?: Resolver<Maybe<ResolversTypes['Document']>, ParentType, ContextType, RequireFields<DocumentQueriesGetArgs, 'id' | 'language' | 'versionLabel'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
    name: 'EmailAddress';
}
export declare type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
    contentType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    meta?: Resolver<Maybe<Array<ResolversTypes['KeyValuePair']>>, ParentType, ContextType>;
    metaProperty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<FileMetaPropertyArgs, 'key'>>;
    size?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type FileContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['FileContent'] = ResolversParentTypes['FileContent']> = {
    files?: Resolver<Maybe<Array<ResolversTypes['File']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type FileQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['FileQueries'] = ResolversParentTypes['FileQueries']> = {
    get?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType, RequireFields<FileQueriesGetArgs, 'key'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type FileSizeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FileSize'] = ResolversParentTypes['FileSize']> = {
    size?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    unit?: Resolver<ResolversTypes['FileSizeUnit'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type FileUploadMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['FileUploadMutations'] = ResolversParentTypes['FileUploadMutations']> = {
    generatePresignedRequest?: Resolver<ResolversTypes['PresignedUploadRequest'], ParentType, ContextType, RequireFields<FileUploadMutationsGeneratePresignedRequestArgs, 'contentType' | 'filename' | 'tenantId' | 'type'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type FilesComponentConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['FilesComponentConfig'] = ResolversParentTypes['FilesComponentConfig']> = {
    acceptedContentTypes?: Resolver<Maybe<Array<ResolversTypes['AcceptedContentType']>>, ParentType, ContextType>;
    max?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    maxFileSize?: Resolver<Maybe<ResolversTypes['FileSize']>, ParentType, ContextType>;
    min?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type FolderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Folder'] = ResolversParentTypes['Folder']> = {
    components?: Resolver<Maybe<Array<ResolversTypes['Component']>>, ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    externalReference?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    hasVersion?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<FolderHasVersionArgs, never>>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    relatingItems?: Resolver<Maybe<Array<ResolversTypes['Item']>>, ParentType, ContextType>;
    shape?: Resolver<Maybe<ResolversTypes['Shape']>, ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    topics?: Resolver<Maybe<Array<ResolversTypes['Topic']>>, ParentType, ContextType>;
    tree?: Resolver<Maybe<ResolversTypes['TreeNode']>, ParentType, ContextType>;
    type?: Resolver<ResolversTypes['ItemType'], ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    version?: Resolver<Maybe<ResolversTypes['VersionedRecordInfo']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type FolderMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['FolderMutations'] = ResolversParentTypes['FolderMutations']> = {
    create?: Resolver<ResolversTypes['Folder'], ParentType, ContextType, RequireFields<FolderMutationsCreateArgs, 'input' | 'language'>>;
    delete?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<FolderMutationsDeleteArgs, 'id'>>;
    publish?: Resolver<ResolversTypes['PublishInfo'], ParentType, ContextType, RequireFields<FolderMutationsPublishArgs, 'id' | 'includeDescendants' | 'language'>>;
    unpublish?: Resolver<Maybe<ResolversTypes['PublishInfo']>, ParentType, ContextType, RequireFields<FolderMutationsUnpublishArgs, 'id' | 'includeDescendants' | 'language'>>;
    update?: Resolver<ResolversTypes['Folder'], ParentType, ContextType, RequireFields<FolderMutationsUpdateArgs, 'id' | 'input' | 'language'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type FolderQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['FolderQueries'] = ResolversParentTypes['FolderQueries']> = {
    get?: Resolver<Maybe<ResolversTypes['Folder']>, ParentType, ContextType, RequireFields<FolderQueriesGetArgs, 'id' | 'language' | 'versionLabel'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type GridResolvers<ContextType = any, ParentType extends ResolversParentTypes['Grid'] = ResolversParentTypes['Grid']> = {
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    hasVersion?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GridHasVersionArgs, never>>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    meta?: Resolver<Maybe<Array<ResolversTypes['KeyValuePair']>>, ParentType, ContextType>;
    metaProperty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<GridMetaPropertyArgs, 'key'>>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    rows?: Resolver<Array<ResolversTypes['GridRow']>, ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    version?: Resolver<Maybe<ResolversTypes['VersionedRecordInfo']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type GridColumnResolvers<ContextType = any, ParentType extends ResolversParentTypes['GridColumn'] = ResolversParentTypes['GridColumn']> = {
    item?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType>;
    itemId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    itemType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    layout?: Resolver<Maybe<ResolversTypes['GridColumnLayout']>, ParentType, ContextType>;
    meta?: Resolver<Maybe<Array<ResolversTypes['KeyValuePair']>>, ParentType, ContextType>;
    metaProperty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<GridColumnMetaPropertyArgs, 'key'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type GridColumnLayoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['GridColumnLayout'] = ResolversParentTypes['GridColumnLayout']> = {
    colspan?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    rowspan?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type GridMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GridMutations'] = ResolversParentTypes['GridMutations']> = {
    create?: Resolver<ResolversTypes['Grid'], ParentType, ContextType, RequireFields<GridMutationsCreateArgs, 'input' | 'language'>>;
    delete?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<GridMutationsDeleteArgs, 'id'>>;
    publish?: Resolver<ResolversTypes['GridPublishInfo'], ParentType, ContextType, RequireFields<GridMutationsPublishArgs, 'id' | 'language'>>;
    unpublish?: Resolver<Maybe<ResolversTypes['GridPublishInfo']>, ParentType, ContextType, RequireFields<GridMutationsUnpublishArgs, 'id' | 'language'>>;
    update?: Resolver<ResolversTypes['Grid'], ParentType, ContextType, RequireFields<GridMutationsUpdateArgs, 'id' | 'input' | 'language'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type GridPublishInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['GridPublishInfo'] = ResolversParentTypes['GridPublishInfo']> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    versionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type GridQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['GridQueries'] = ResolversParentTypes['GridQueries']> = {
    get?: Resolver<Maybe<ResolversTypes['Grid']>, ParentType, ContextType, RequireFields<GridQueriesGetArgs, 'id' | 'language' | 'versionLabel'>>;
    getMany?: Resolver<Maybe<Array<ResolversTypes['Grid']>>, ParentType, ContextType, RequireFields<GridQueriesGetManyArgs, 'language' | 'versionLabel'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type GridRelationsContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['GridRelationsContent'] = ResolversParentTypes['GridRelationsContent']> = {
    grids?: Resolver<Maybe<Array<ResolversTypes['Grid']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type GridRowResolvers<ContextType = any, ParentType extends ResolversParentTypes['GridRow'] = ResolversParentTypes['GridRow']> = {
    columns?: Resolver<Array<ResolversTypes['GridColumn']>, ParentType, ContextType>;
    meta?: Resolver<Maybe<Array<ResolversTypes['KeyValuePair']>>, ParentType, ContextType>;
    metaProperty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<GridRowMetaPropertyArgs, 'key'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type IObjectMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['IObjectMetrics'] = ResolversParentTypes['IObjectMetrics']> = {
    __resolveType: TypeResolveFn<'ApiCallMetrics' | 'ItemMetrics' | 'OrderMetrics' | 'ShapeMetrics' | 'WebhookMetrics', ParentType, ContextType>;
    count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<IObjectMetricsCountArgs, never>>;
};
export declare type IObjectReportsResolvers<ContextType = any, ParentType extends ResolversParentTypes['IObjectReports'] = ResolversParentTypes['IObjectReports']> = {
    __resolveType: TypeResolveFn<'SalesReport', ParentType, ContextType>;
    avg?: Resolver<Array<Maybe<ResolversTypes['ReportMetric']>>, ParentType, ContextType, RequireFields<IObjectReportsAvgArgs, 'direction' | 'orderBy' | 'resolution'>>;
    sum?: Resolver<Array<Maybe<ResolversTypes['ReportMetric']>>, ParentType, ContextType, RequireFields<IObjectReportsSumArgs, 'direction' | 'orderBy' | 'resolution'>>;
    total?: Resolver<ResolversTypes['Float'], ParentType, ContextType, RequireFields<IObjectReportsTotalArgs, never>>;
};
export declare type IdentifierSuggestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['IdentifierSuggestion'] = ResolversParentTypes['IdentifierSuggestion']> = {
    isAvailable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    suggestion?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
    altText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    caption?: Resolver<Maybe<ResolversTypes['RichTextContent']>, ParentType, ContextType>;
    key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    meta?: Resolver<Maybe<Array<ResolversTypes['KeyValuePair']>>, ParentType, ContextType>;
    metaProperty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<ImageMetaPropertyArgs, 'key'>>;
    mimeType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    variants?: Resolver<Maybe<Array<ResolversTypes['ImageVariant']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ImageContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImageContent'] = ResolversParentTypes['ImageContent']> = {
    images?: Resolver<Maybe<Array<ResolversTypes['Image']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ImageMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImageMutations'] = ResolversParentTypes['ImageMutations']> = {
    registerVariants?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<ImageMutationsRegisterVariantsArgs, 'key' | 'variants'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ImageQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImageQueries'] = ResolversParentTypes['ImageQueries']> = {
    get?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<ImageQueriesGetArgs, 'key'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ImageVariantResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImageVariant'] = ResolversParentTypes['ImageVariant']> = {
    height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type InviteTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['InviteToken'] = ResolversParentTypes['InviteToken']> = {
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    createdBy?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    createdByUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    expiresAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    redeemedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    redeemedBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    redeemedByUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    tenant?: Resolver<ResolversTypes['Tenant'], ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    token?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type InviteTokenMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['InviteTokenMutations'] = ResolversParentTypes['InviteTokenMutations']> = {
    create?: Resolver<ResolversTypes['InviteToken'], ParentType, ContextType, RequireFields<InviteTokenMutationsCreateArgs, 'tenantId'>>;
    redeem?: Resolver<ResolversTypes['InviteToken'], ParentType, ContextType, RequireFields<InviteTokenMutationsRedeemArgs, 'token'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = {
    __resolveType: TypeResolveFn<'Document' | 'Folder' | 'Product', ParentType, ContextType>;
    components?: Resolver<Maybe<Array<ResolversTypes['Component']>>, ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    externalReference?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    hasVersion?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<ItemHasVersionArgs, never>>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    relatingItems?: Resolver<Maybe<Array<ResolversTypes['Item']>>, ParentType, ContextType>;
    shape?: Resolver<Maybe<ResolversTypes['Shape']>, ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    topics?: Resolver<Maybe<Array<ResolversTypes['Topic']>>, ParentType, ContextType>;
    tree?: Resolver<Maybe<ResolversTypes['TreeNode']>, ParentType, ContextType>;
    type?: Resolver<ResolversTypes['ItemType'], ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    version?: Resolver<Maybe<ResolversTypes['VersionedRecordInfo']>, ParentType, ContextType>;
};
export declare type ItemMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ItemMetrics'] = ResolversParentTypes['ItemMetrics']> = {
    count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<ItemMetricsCountArgs, never>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ItemMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ItemMutations'] = ResolversParentTypes['ItemMutations']> = {
    bulkPublish?: Resolver<Maybe<Array<ResolversTypes['PublishInfo']>>, ParentType, ContextType, RequireFields<ItemMutationsBulkPublishArgs, 'language'>>;
    bulkUnpublish?: Resolver<Maybe<Array<ResolversTypes['PublishInfo']>>, ParentType, ContextType, RequireFields<ItemMutationsBulkUnpublishArgs, 'language'>>;
    delete?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<ItemMutationsDeleteArgs, 'id'>>;
    publish?: Resolver<ResolversTypes['PublishInfo'], ParentType, ContextType, RequireFields<ItemMutationsPublishArgs, 'id' | 'includeDescendants' | 'language'>>;
    unpublish?: Resolver<Maybe<ResolversTypes['PublishInfo']>, ParentType, ContextType, RequireFields<ItemMutationsUnpublishArgs, 'id' | 'includeDescendants' | 'language'>>;
    updateComponent?: Resolver<ResolversTypes['Item'], ParentType, ContextType, RequireFields<ItemMutationsUpdateComponentArgs, 'input' | 'itemId' | 'language'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ItemQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ItemQueries'] = ResolversParentTypes['ItemQueries']> = {
    get?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<ItemQueriesGetArgs, 'id' | 'language' | 'versionLabel'>>;
    getMany?: Resolver<Maybe<Array<ResolversTypes['Item']>>, ParentType, ContextType, RequireFields<ItemQueriesGetManyArgs, 'language' | 'versionLabel'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ItemRelationsComponentConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['ItemRelationsComponentConfig'] = ResolversParentTypes['ItemRelationsComponentConfig']> = {
    acceptedShapeIdentifiers?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
    max?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    min?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ItemRelationsContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['ItemRelationsContent'] = ResolversParentTypes['ItemRelationsContent']> = {
    items?: Resolver<Maybe<Array<ResolversTypes['Item']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
    name: 'JSON';
}
export declare type KeyValuePairResolvers<ContextType = any, ParentType extends ResolversParentTypes['KeyValuePair'] = ResolversParentTypes['KeyValuePair']> = {
    key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type KlarnaPaymentResolvers<ContextType = any, ParentType extends ResolversParentTypes['KlarnaPayment'] = ResolversParentTypes['KlarnaPayment']> = {
    id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    metadata?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    orderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    provider?: Resolver<ResolversTypes['PaymentProvider'], ParentType, ContextType>;
    recurringToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type LanguageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Language'] = ResolversParentTypes['Language']> = {
    code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    system?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type LanguageMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['LanguageMutations'] = ResolversParentTypes['LanguageMutations']> = {
    add?: Resolver<Maybe<Array<ResolversTypes['Language']>>, ParentType, ContextType, RequireFields<LanguageMutationsAddArgs, 'input' | 'tenantId'>>;
    remove?: Resolver<Maybe<Array<ResolversTypes['Language']>>, ParentType, ContextType, RequireFields<LanguageMutationsRemoveArgs, 'code' | 'tenantId'>>;
    update?: Resolver<Maybe<Array<ResolversTypes['Language']>>, ParentType, ContextType, RequireFields<LanguageMutationsUpdateArgs, 'code' | 'input' | 'tenantId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type LocationContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationContent'] = ResolversParentTypes['LocationContent']> = {
    lat?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    long?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type MeMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['MeMutations'] = ResolversParentTypes['MeMutations']> = {
    generateAccessToken?: Resolver<Maybe<ResolversTypes['AccessToken']>, ParentType, ContextType, RequireFields<MeMutationsGenerateAccessTokenArgs, 'input'>>;
    update?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MeMutationsUpdateArgs, never>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
    accessToken?: Resolver<Maybe<ResolversTypes['AccessTokenMutations']>, ParentType, ContextType>;
    customer?: Resolver<Maybe<ResolversTypes['CustomerMutations']>, ParentType, ContextType>;
    document?: Resolver<Maybe<ResolversTypes['DocumentMutations']>, ParentType, ContextType>;
    fileUpload?: Resolver<Maybe<ResolversTypes['FileUploadMutations']>, ParentType, ContextType>;
    folder?: Resolver<Maybe<ResolversTypes['FolderMutations']>, ParentType, ContextType>;
    grid?: Resolver<Maybe<ResolversTypes['GridMutations']>, ParentType, ContextType>;
    image?: Resolver<Maybe<ResolversTypes['ImageMutations']>, ParentType, ContextType>;
    inviteToken?: Resolver<Maybe<ResolversTypes['InviteTokenMutations']>, ParentType, ContextType>;
    item?: Resolver<Maybe<ResolversTypes['ItemMutations']>, ParentType, ContextType>;
    language?: Resolver<Maybe<ResolversTypes['LanguageMutations']>, ParentType, ContextType>;
    me?: Resolver<Maybe<ResolversTypes['MeMutations']>, ParentType, ContextType>;
    order?: Resolver<Maybe<ResolversTypes['OrderMutations']>, ParentType, ContextType>;
    pipeline?: Resolver<Maybe<ResolversTypes['PipelineMutations']>, ParentType, ContextType>;
    priceVariant?: Resolver<ResolversTypes['PriceVariantMutations'], ParentType, ContextType>;
    product?: Resolver<Maybe<ResolversTypes['ProductMutations']>, ParentType, ContextType>;
    productSubscription?: Resolver<ResolversTypes['ProductSubscriptionMutations'], ParentType, ContextType>;
    shape?: Resolver<Maybe<ResolversTypes['ShapeMutations']>, ParentType, ContextType>;
    stockLocation?: Resolver<ResolversTypes['StockLocationMutations'], ParentType, ContextType>;
    subscriptionContract?: Resolver<ResolversTypes['SubscriptionContractMutations'], ParentType, ContextType>;
    subscriptionPlan?: Resolver<ResolversTypes['SubscriptionPlanMutations'], ParentType, ContextType>;
    tenant?: Resolver<Maybe<ResolversTypes['TenantMutations']>, ParentType, ContextType>;
    topic?: Resolver<Maybe<ResolversTypes['TopicMutations']>, ParentType, ContextType>;
    tree?: Resolver<Maybe<ResolversTypes['TreeMutations']>, ParentType, ContextType>;
    user?: Resolver<Maybe<ResolversTypes['UserMutations']>, ParentType, ContextType>;
    vatType?: Resolver<Maybe<ResolversTypes['VatTypeMutations']>, ParentType, ContextType>;
    video?: Resolver<Maybe<ResolversTypes['VideoMutations']>, ParentType, ContextType>;
    webhook?: Resolver<Maybe<ResolversTypes['WebhookMutations']>, ParentType, ContextType>;
};
export interface NonNegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeFloat'], any> {
    name: 'NonNegativeFloat';
}
export interface NonNegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeInt'], any> {
    name: 'NonNegativeInt';
}
export declare type NumericComponentConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['NumericComponentConfig'] = ResolversParentTypes['NumericComponentConfig']> = {
    decimalPlaces?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    units?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type NumericContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['NumericContent'] = ResolversParentTypes['NumericContent']> = {
    number?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    unit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
    additionalInformation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    cart?: Resolver<Array<ResolversTypes['OrderItem']>, ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    meta?: Resolver<Maybe<Array<ResolversTypes['KeyValuePair']>>, ParentType, ContextType>;
    payment?: Resolver<Maybe<Array<ResolversTypes['Payment']>>, ParentType, ContextType>;
    pipelines?: Resolver<Maybe<Array<ResolversTypes['OrderPipeline']>>, ParentType, ContextType>;
    tenant?: Resolver<ResolversTypes['Tenant'], ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    total?: Resolver<Maybe<ResolversTypes['Price']>, ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type OrderConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderConnection'] = ResolversParentTypes['OrderConnection']> = {
    edges?: Resolver<Maybe<Array<ResolversTypes['OrderConnectionEdge']>>, ParentType, ContextType>;
    pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type OrderConnectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderConnectionEdge'] = ResolversParentTypes['OrderConnectionEdge']> = {
    cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    node?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type OrderItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderItem'] = ResolversParentTypes['OrderItem']> = {
    imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    meta?: Resolver<Maybe<Array<ResolversTypes['KeyValuePair']>>, ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    orderId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    price?: Resolver<Maybe<ResolversTypes['Price']>, ParentType, ContextType>;
    productId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    productSubscriptionId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    productVariantId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    quantity?: Resolver<ResolversTypes['NonNegativeInt'], ParentType, ContextType>;
    sku?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    subTotal?: Resolver<Maybe<ResolversTypes['Price']>, ParentType, ContextType>;
    subscription?: Resolver<Maybe<ResolversTypes['OrderItemSubscription']>, ParentType, ContextType>;
    subscriptionContractId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type OrderItemMeteredVariableResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderItemMeteredVariable'] = ResolversParentTypes['OrderItemMeteredVariable']> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    usage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type OrderItemSubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderItemSubscription'] = ResolversParentTypes['OrderItemSubscription']> = {
    end?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    meteredVariables?: Resolver<Maybe<Array<ResolversTypes['OrderItemMeteredVariable']>>, ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    period?: Resolver<ResolversTypes['PositiveInt'], ParentType, ContextType>;
    start?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    unit?: Resolver<ResolversTypes['OrderItemSubscriptionPeriodUnit'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type OrderMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderMetrics'] = ResolversParentTypes['OrderMetrics']> = {
    count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<OrderMetricsCountArgs, never>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type OrderMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderMutations'] = ResolversParentTypes['OrderMutations']> = {
    delete?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<OrderMutationsDeleteArgs, 'id'>>;
    removePipeline?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<OrderMutationsRemovePipelineArgs, 'orderId' | 'pipelineId'>>;
    setPipelineStage?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<OrderMutationsSetPipelineStageArgs, 'orderId' | 'pipelineId' | 'stageId'>>;
    update?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<OrderMutationsUpdateArgs, 'id' | 'input'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type OrderPipelineResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderPipeline'] = ResolversParentTypes['OrderPipeline']> = {
    pipeline?: Resolver<ResolversTypes['Pipeline'], ParentType, ContextType>;
    pipelineId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    stageId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type OrderQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderQueries'] = ResolversParentTypes['OrderQueries']> = {
    get?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<OrderQueriesGetArgs, 'id'>>;
    getMany?: Resolver<Maybe<ResolversTypes['OrderConnection']>, ParentType, ContextType, RequireFields<OrderQueriesGetManyArgs, 'first' | 'sort' | 'sortField'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type OrdersReportResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrdersReport'] = ResolversParentTypes['OrdersReport']> = {
    avg?: Resolver<Array<Maybe<ResolversTypes['ReportMetric']>>, ParentType, ContextType, RequireFields<OrdersReportAvgArgs, 'direction' | 'groupBy' | 'orderBy' | 'resolution'>>;
    sum?: Resolver<Array<Maybe<ResolversTypes['ReportMetric']>>, ParentType, ContextType, RequireFields<OrdersReportSumArgs, 'direction' | 'groupBy' | 'orderBy' | 'resolution'>>;
    total?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<OrdersReportTotalArgs, never>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
    endCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    startCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    totalNodes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ParagraphCollectionContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['ParagraphCollectionContent'] = ResolversParentTypes['ParagraphCollectionContent']> = {
    paragraphs?: Resolver<Maybe<Array<ResolversTypes['ParagraphContent']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ParagraphContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['ParagraphContent'] = ResolversParentTypes['ParagraphContent']> = {
    body?: Resolver<Maybe<ResolversTypes['RichTextContent']>, ParentType, ContextType>;
    images?: Resolver<Maybe<Array<ResolversTypes['Image']>>, ParentType, ContextType>;
    title?: Resolver<Maybe<ResolversTypes['SingleLineContent']>, ParentType, ContextType>;
    videos?: Resolver<Maybe<Array<ResolversTypes['Video']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type PaymentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Payment'] = ResolversParentTypes['Payment']> = {
    __resolveType: TypeResolveFn<'CashPayment' | 'CustomPayment' | 'KlarnaPayment' | 'PaypalPayment' | 'StripePayment', ParentType, ContextType>;
};
export declare type PaymentTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentType'] = ResolversParentTypes['PaymentType']> = {
    __resolveType: TypeResolveFn<'CashPayment' | 'CustomPayment' | 'KlarnaPayment' | 'PaypalPayment' | 'StripePayment', ParentType, ContextType>;
    provider?: Resolver<ResolversTypes['PaymentProvider'], ParentType, ContextType>;
};
export declare type PaypalPaymentResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaypalPayment'] = ResolversParentTypes['PaypalPayment']> = {
    id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    invoiceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    metadata?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    orderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    provider?: Resolver<ResolversTypes['PaymentProvider'], ParentType, ContextType>;
    subscriptionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
    name: 'PhoneNumber';
}
export declare type PipelineResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pipeline'] = ResolversParentTypes['Pipeline']> = {
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    orders?: Resolver<ResolversTypes['OrderConnection'], ParentType, ContextType, RequireFields<PipelineOrdersArgs, 'first' | 'sort' | 'sortField'>>;
    stages?: Resolver<Maybe<Array<ResolversTypes['PipelineStage']>>, ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type PipelineConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PipelineConnection'] = ResolversParentTypes['PipelineConnection']> = {
    edges?: Resolver<Maybe<Array<ResolversTypes['PipelineConnectionEdge']>>, ParentType, ContextType>;
    pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type PipelineConnectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PipelineConnectionEdge'] = ResolversParentTypes['PipelineConnectionEdge']> = {
    cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    node?: Resolver<ResolversTypes['Pipeline'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type PipelineMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PipelineMutations'] = ResolversParentTypes['PipelineMutations']> = {
    addStage?: Resolver<ResolversTypes['Pipeline'], ParentType, ContextType, RequireFields<PipelineMutationsAddStageArgs, 'input' | 'pipelineId'>>;
    create?: Resolver<ResolversTypes['Pipeline'], ParentType, ContextType, RequireFields<PipelineMutationsCreateArgs, 'input'>>;
    delete?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<PipelineMutationsDeleteArgs, 'force' | 'id'>>;
    moveStage?: Resolver<ResolversTypes['Pipeline'], ParentType, ContextType, RequireFields<PipelineMutationsMoveStageArgs, 'newPosition' | 'pipelineId' | 'stageId'>>;
    removeStage?: Resolver<ResolversTypes['Pipeline'], ParentType, ContextType, RequireFields<PipelineMutationsRemoveStageArgs, 'force' | 'pipelineId' | 'stageId'>>;
    update?: Resolver<ResolversTypes['Pipeline'], ParentType, ContextType, RequireFields<PipelineMutationsUpdateArgs, 'id'>>;
    updateStage?: Resolver<ResolversTypes['Pipeline'], ParentType, ContextType, RequireFields<PipelineMutationsUpdateStageArgs, 'input' | 'pipelineId' | 'stageId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type PipelineQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['PipelineQueries'] = ResolversParentTypes['PipelineQueries']> = {
    get?: Resolver<Maybe<ResolversTypes['Pipeline']>, ParentType, ContextType, RequireFields<PipelineQueriesGetArgs, 'id'>>;
    getMany?: Resolver<ResolversTypes['PipelineConnection'], ParentType, ContextType, RequireFields<PipelineQueriesGetManyArgs, 'first' | 'sort' | 'sortField' | 'tenantId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type PipelineStageResolvers<ContextType = any, ParentType extends ResolversParentTypes['PipelineStage'] = ResolversParentTypes['PipelineStage']> = {
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    orders?: Resolver<ResolversTypes['OrderConnection'], ParentType, ContextType, RequireFields<PipelineStageOrdersArgs, 'first' | 'sort' | 'sortField'>>;
    placeNewOrders?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
    name: 'PositiveInt';
}
export declare type PresignedUploadRequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['PresignedUploadRequest'] = ResolversParentTypes['PresignedUploadRequest']> = {
    fields?: Resolver<Array<ResolversTypes['UploadField']>, ParentType, ContextType>;
    lifetime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    maxSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type PriceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Price'] = ResolversParentTypes['Price']> = {
    currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    discounts?: Resolver<Maybe<Array<ResolversTypes['Discount']>>, ParentType, ContextType>;
    gross?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    net?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    tax?: Resolver<Maybe<ResolversTypes['Tax']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type PriceVariantResolvers<ContextType = any, ParentType extends ResolversParentTypes['PriceVariant'] = ResolversParentTypes['PriceVariant']> = {
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    tenant?: Resolver<ResolversTypes['Tenant'], ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type PriceVariantMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PriceVariantMutations'] = ResolversParentTypes['PriceVariantMutations']> = {
    create?: Resolver<ResolversTypes['PriceVariant'], ParentType, ContextType, RequireFields<PriceVariantMutationsCreateArgs, 'input'>>;
    delete?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<PriceVariantMutationsDeleteArgs, 'identifier' | 'tenantId'>>;
    update?: Resolver<ResolversTypes['PriceVariant'], ParentType, ContextType, RequireFields<PriceVariantMutationsUpdateArgs, 'identifier' | 'input' | 'tenantId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type PriceVariantQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['PriceVariantQueries'] = ResolversParentTypes['PriceVariantQueries']> = {
    get?: Resolver<Maybe<ResolversTypes['PriceVariant']>, ParentType, ContextType, RequireFields<PriceVariantQueriesGetArgs, 'identifier' | 'tenantId'>>;
    getMany?: Resolver<Maybe<Array<ResolversTypes['PriceVariant']>>, ParentType, ContextType, RequireFields<PriceVariantQueriesGetManyArgs, 'tenantId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
    components?: Resolver<Maybe<Array<ResolversTypes['Component']>>, ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    defaultVariant?: Resolver<ResolversTypes['ProductVariant'], ParentType, ContextType>;
    externalReference?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    hasVersion?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<ProductHasVersionArgs, never>>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    isSubscriptionOnly?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    isVirtual?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    relatingItems?: Resolver<Maybe<Array<ResolversTypes['Item']>>, ParentType, ContextType>;
    shape?: Resolver<Maybe<ResolversTypes['Shape']>, ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    topics?: Resolver<Maybe<Array<ResolversTypes['Topic']>>, ParentType, ContextType>;
    tree?: Resolver<Maybe<ResolversTypes['TreeNode']>, ParentType, ContextType>;
    type?: Resolver<ResolversTypes['ItemType'], ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    variants?: Resolver<Array<ResolversTypes['ProductVariant']>, ParentType, ContextType>;
    vatType?: Resolver<Maybe<ResolversTypes['VatType']>, ParentType, ContextType>;
    vatTypeId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    version?: Resolver<Maybe<ResolversTypes['VersionedRecordInfo']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductMutations'] = ResolversParentTypes['ProductMutations']> = {
    create?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<ProductMutationsCreateArgs, 'input' | 'language'>>;
    delete?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<ProductMutationsDeleteArgs, 'id'>>;
    publish?: Resolver<ResolversTypes['PublishInfo'], ParentType, ContextType, RequireFields<ProductMutationsPublishArgs, 'id' | 'includeDescendants' | 'language'>>;
    setDefaultVariant?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<ProductMutationsSetDefaultVariantArgs, 'language' | 'productId' | 'variantId'>>;
    unpublish?: Resolver<Maybe<ResolversTypes['PublishInfo']>, ParentType, ContextType, RequireFields<ProductMutationsUnpublishArgs, 'id' | 'includeDescendants' | 'language'>>;
    update?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<ProductMutationsUpdateArgs, 'id' | 'input' | 'language'>>;
    updateStock?: Resolver<ResolversTypes['ProductStockLocation'], ParentType, ContextType, RequireFields<ProductMutationsUpdateStockArgs, 'productId' | 'sku' | 'stock' | 'stockLocationIdentifier'>>;
    updateVariant?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<ProductMutationsUpdateVariantArgs, 'input' | 'language' | 'productId' | 'variantId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductPriceVariantResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductPriceVariant'] = ResolversParentTypes['ProductPriceVariant']> = {
    currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductQueries'] = ResolversParentTypes['ProductQueries']> = {
    get?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<ProductQueriesGetArgs, 'id' | 'language' | 'versionLabel'>>;
    getVariants?: Resolver<Maybe<Array<ResolversTypes['ProductVariant']>>, ParentType, ContextType, RequireFields<ProductQueriesGetVariantsArgs, 'language' | 'versionLabel'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductStockLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductStockLocation'] = ResolversParentTypes['ProductStockLocation']> = {
    identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    meta?: Resolver<Maybe<Array<ResolversTypes['KeyValuePair']>>, ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    settings?: Resolver<Maybe<ResolversTypes['StockLocationSettings']>, ParentType, ContextType>;
    stock?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductSubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSubscription'] = ResolversParentTypes['ProductSubscription']> = {
    customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
    customerIdentifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    initial?: Resolver<Maybe<ResolversTypes['ProductSubscriptionPhase']>, ParentType, ContextType>;
    item?: Resolver<ResolversTypes['ProductSubscriptionItem'], ParentType, ContextType>;
    payment?: Resolver<Maybe<ResolversTypes['Payment']>, ParentType, ContextType>;
    recurring?: Resolver<Maybe<ResolversTypes['ProductSubscriptionPhase']>, ParentType, ContextType>;
    status?: Resolver<ResolversTypes['ProductSubscriptionStatus'], ParentType, ContextType>;
    subscriptionPlan?: Resolver<Maybe<ResolversTypes['SubscriptionPlan']>, ParentType, ContextType>;
    tenant?: Resolver<ResolversTypes['Tenant'], ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    usage?: Resolver<Maybe<Array<ResolversTypes['ProductSubscriptionUsage']>>, ParentType, ContextType, RequireFields<ProductSubscriptionUsageArgs, 'end' | 'start'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductSubscriptionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSubscriptionConnection'] = ResolversParentTypes['ProductSubscriptionConnection']> = {
    edges?: Resolver<Maybe<Array<ResolversTypes['ProductSubscriptionConnectionEdge']>>, ParentType, ContextType>;
    pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductSubscriptionConnectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSubscriptionConnectionEdge'] = ResolversParentTypes['ProductSubscriptionConnectionEdge']> = {
    cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    node?: Resolver<ResolversTypes['ProductSubscription'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductSubscriptionHistoryEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSubscriptionHistoryEvent'] = ResolversParentTypes['ProductSubscriptionHistoryEvent']> = {
    __resolveType: TypeResolveFn<'ProductSubscriptionHistoryEventCancellation' | 'ProductSubscriptionHistoryEventRenewal' | 'ProductSubscriptionHistoryEventRenewalDueBroadcast', ParentType, ContextType>;
    type?: Resolver<ResolversTypes['ProductSubscriptionHistoryEventType'], ParentType, ContextType>;
};
export declare type ProductSubscriptionHistoryEventCancellationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSubscriptionHistoryEventCancellation'] = ResolversParentTypes['ProductSubscriptionHistoryEventCancellation']> = {
    activeUntil?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    cancelledAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    deactivated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['ProductSubscriptionHistoryEventType'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductSubscriptionHistoryEventRenewalResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSubscriptionHistoryEventRenewal'] = ResolversParentTypes['ProductSubscriptionHistoryEventRenewal']> = {
    activeUntil?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    renewedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['ProductSubscriptionHistoryEventType'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductSubscriptionHistoryEventRenewalDueBroadcastResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSubscriptionHistoryEventRenewalDueBroadcast'] = ResolversParentTypes['ProductSubscriptionHistoryEventRenewalDueBroadcast']> = {
    broadcastAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    renewAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['ProductSubscriptionHistoryEventType'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductSubscriptionItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSubscriptionItem'] = ResolversParentTypes['ProductSubscriptionItem']> = {
    imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    meta?: Resolver<Maybe<Array<ResolversTypes['KeyValuePair']>>, ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    quantity?: Resolver<ResolversTypes['NonNegativeInt'], ParentType, ContextType>;
    sku?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductSubscriptionMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSubscriptionMutations'] = ResolversParentTypes['ProductSubscriptionMutations']> = {
    cancel?: Resolver<ResolversTypes['ProductSubscription'], ParentType, ContextType, RequireFields<ProductSubscriptionMutationsCancelArgs, 'deactivate' | 'id'>>;
    create?: Resolver<ResolversTypes['ProductSubscription'], ParentType, ContextType, RequireFields<ProductSubscriptionMutationsCreateArgs, 'input'>>;
    delete?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<ProductSubscriptionMutationsDeleteArgs, 'id'>>;
    renew?: Resolver<ResolversTypes['ProductSubscription'], ParentType, ContextType, RequireFields<ProductSubscriptionMutationsRenewArgs, 'id'>>;
    update?: Resolver<ResolversTypes['ProductSubscription'], ParentType, ContextType, RequireFields<ProductSubscriptionMutationsUpdateArgs, 'id' | 'input'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductSubscriptionPhaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSubscriptionPhase'] = ResolversParentTypes['ProductSubscriptionPhase']> = {
    currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    period?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    unit?: Resolver<ResolversTypes['SubscriptionPeriodUnit'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductSubscriptionQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSubscriptionQueries'] = ResolversParentTypes['ProductSubscriptionQueries']> = {
    get?: Resolver<Maybe<ResolversTypes['ProductSubscription']>, ParentType, ContextType, RequireFields<ProductSubscriptionQueriesGetArgs, 'id'>>;
    getMany?: Resolver<Maybe<ResolversTypes['ProductSubscriptionConnection']>, ParentType, ContextType, RequireFields<ProductSubscriptionQueriesGetManyArgs, 'first' | 'sort' | 'sortField' | 'tenantId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductSubscriptionStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSubscriptionStatus'] = ResolversParentTypes['ProductSubscriptionStatus']> = {
    activeUntil?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    renewAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductSubscriptionUsageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSubscriptionUsage'] = ResolversParentTypes['ProductSubscriptionUsage']> = {
    meteredVariableId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductVariantResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductVariant'] = ResolversParentTypes['ProductVariant']> = {
    attributes?: Resolver<Maybe<Array<ResolversTypes['ProductVariantAttribute']>>, ParentType, ContextType>;
    externalReference?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    images?: Resolver<Maybe<Array<ResolversTypes['Image']>>, ParentType, ContextType>;
    isDefault?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType, RequireFields<ProductVariantPriceArgs, 'identifier'>>;
    priceVariants?: Resolver<Maybe<Array<ResolversTypes['ProductPriceVariant']>>, ParentType, ContextType>;
    product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
    productId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    sku?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    stock?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<ProductVariantStockArgs, 'identifier'>>;
    stockLocations?: Resolver<Maybe<Array<ResolversTypes['ProductStockLocation']>>, ParentType, ContextType>;
    subscriptionPlans?: Resolver<Maybe<Array<ResolversTypes['ProductVariantSubscriptionPlan']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductVariantAttributeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductVariantAttribute'] = ResolversParentTypes['ProductVariantAttribute']> = {
    attribute?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductVariantSubscriptionMeteredVariableResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductVariantSubscriptionMeteredVariable'] = ResolversParentTypes['ProductVariantSubscriptionMeteredVariable']> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    tierType?: Resolver<ResolversTypes['TierType'], ParentType, ContextType>;
    tiers?: Resolver<Array<ResolversTypes['ProductVariantSubscriptionPlanTier']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductVariantSubscriptionPlanResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductVariantSubscriptionPlan'] = ResolversParentTypes['ProductVariantSubscriptionPlan']> = {
    identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    periods?: Resolver<Array<ResolversTypes['ProductVariantSubscriptionPlanPeriod']>, ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductVariantSubscriptionPlanPeriodResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductVariantSubscriptionPlanPeriod'] = ResolversParentTypes['ProductVariantSubscriptionPlanPeriod']> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    initial?: Resolver<Maybe<ResolversTypes['ProductVariantSubscriptionPlanPricing']>, ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    recurring?: Resolver<Maybe<ResolversTypes['ProductVariantSubscriptionPlanPricing']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductVariantSubscriptionPlanPricingResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductVariantSubscriptionPlanPricing'] = ResolversParentTypes['ProductVariantSubscriptionPlanPricing']> = {
    meteredVariables?: Resolver<Maybe<Array<ResolversTypes['ProductVariantSubscriptionMeteredVariable']>>, ParentType, ContextType>;
    period?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType, RequireFields<ProductVariantSubscriptionPlanPricingPriceArgs, 'identifier'>>;
    priceVariants?: Resolver<Maybe<Array<ResolversTypes['ProductPriceVariant']>>, ParentType, ContextType>;
    unit?: Resolver<ResolversTypes['SubscriptionPeriodUnit'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ProductVariantSubscriptionPlanTierResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductVariantSubscriptionPlanTier'] = ResolversParentTypes['ProductVariantSubscriptionPlanTier']> = {
    price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType, RequireFields<ProductVariantSubscriptionPlanTierPriceArgs, 'identifier'>>;
    priceVariants?: Resolver<Maybe<Array<ResolversTypes['ProductPriceVariant']>>, ParentType, ContextType>;
    threshold?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type PropertiesTableComponentConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['PropertiesTableComponentConfig'] = ResolversParentTypes['PropertiesTableComponentConfig']> = {
    sections?: Resolver<Array<ResolversTypes['PropertiesTableComponentConfigSection']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type PropertiesTableComponentConfigSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PropertiesTableComponentConfigSection'] = ResolversParentTypes['PropertiesTableComponentConfigSection']> = {
    keys?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
    title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type PropertiesTableComponentSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PropertiesTableComponentSection'] = ResolversParentTypes['PropertiesTableComponentSection']> = {
    properties?: Resolver<Maybe<Array<ResolversTypes['KeyValuePair']>>, ParentType, ContextType>;
    title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type PropertiesTableContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['PropertiesTableContent'] = ResolversParentTypes['PropertiesTableContent']> = {
    sections?: Resolver<Maybe<Array<ResolversTypes['PropertiesTableComponentSection']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type PublishInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublishInfo'] = ResolversParentTypes['PublishInfo']> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    versionId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
    currencySummary?: Resolver<Maybe<ResolversTypes['CurrencySummaryReport']>, ParentType, ContextType>;
    customer?: Resolver<ResolversTypes['CustomerQueries'], ParentType, ContextType>;
    document?: Resolver<ResolversTypes['DocumentQueries'], ParentType, ContextType>;
    file?: Resolver<ResolversTypes['FileQueries'], ParentType, ContextType>;
    folder?: Resolver<ResolversTypes['FolderQueries'], ParentType, ContextType>;
    grid?: Resolver<ResolversTypes['GridQueries'], ParentType, ContextType>;
    image?: Resolver<ResolversTypes['ImageQueries'], ParentType, ContextType>;
    item?: Resolver<ResolversTypes['ItemQueries'], ParentType, ContextType>;
    me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    order?: Resolver<ResolversTypes['OrderQueries'], ParentType, ContextType>;
    pipeline?: Resolver<ResolversTypes['PipelineQueries'], ParentType, ContextType>;
    priceVariant?: Resolver<ResolversTypes['PriceVariantQueries'], ParentType, ContextType>;
    product?: Resolver<ResolversTypes['ProductQueries'], ParentType, ContextType>;
    productSubscription?: Resolver<ResolversTypes['ProductSubscriptionQueries'], ParentType, ContextType>;
    report?: Resolver<Maybe<ResolversTypes['TenantReports']>, ParentType, ContextType>;
    search?: Resolver<Maybe<ResolversTypes['SearchQueries']>, ParentType, ContextType>;
    shape?: Resolver<ResolversTypes['ShapeQueries'], ParentType, ContextType>;
    stockLocation?: Resolver<ResolversTypes['StockLocationQueries'], ParentType, ContextType>;
    subscriptionContract?: Resolver<ResolversTypes['SubscriptionContractQueries'], ParentType, ContextType>;
    subscriptionContractEvent?: Resolver<Maybe<ResolversTypes['SubscriptionContractEventQueries']>, ParentType, ContextType>;
    subscriptionPlan?: Resolver<ResolversTypes['SubscriptionPlanQueries'], ParentType, ContextType>;
    tenant?: Resolver<ResolversTypes['TenantQueries'], ParentType, ContextType>;
    topic?: Resolver<ResolversTypes['TopicQueries'], ParentType, ContextType>;
    tree?: Resolver<ResolversTypes['TreeQueries'], ParentType, ContextType>;
    user?: Resolver<ResolversTypes['UserQueries'], ParentType, ContextType>;
    version?: Resolver<Maybe<ResolversTypes['VersionedServices']>, ParentType, ContextType>;
    webhook?: Resolver<ResolversTypes['WebhookQueries'], ParentType, ContextType>;
};
export declare type ReportMetricResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReportMetric'] = ResolversParentTypes['ReportMetric']> = {
    currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    date?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<ReportMetricProductArgs, 'language'>>;
    sku?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type RichTextContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['RichTextContent'] = ResolversParentTypes['RichTextContent']> = {
    html?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
    json?: Resolver<Maybe<Array<Maybe<ResolversTypes['JSON']>>>, ParentType, ContextType>;
    plainText?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SalesReportResolvers<ContextType = any, ParentType extends ResolversParentTypes['SalesReport'] = ResolversParentTypes['SalesReport']> = {
    avg?: Resolver<Array<Maybe<ResolversTypes['ReportMetric']>>, ParentType, ContextType, RequireFields<SalesReportAvgArgs, 'direction' | 'groupBy' | 'orderBy' | 'resolution'>>;
    sum?: Resolver<Array<Maybe<ResolversTypes['ReportMetric']>>, ParentType, ContextType, RequireFields<SalesReportSumArgs, 'direction' | 'groupBy' | 'orderBy' | 'resolution'>>;
    total?: Resolver<ResolversTypes['Float'], ParentType, ContextType, RequireFields<SalesReportTotalArgs, never>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SearchQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchQueries'] = ResolversParentTypes['SearchQueries']> = {
    suggest?: Resolver<Maybe<ResolversTypes['SuggestSearchConnection']>, ParentType, ContextType, RequireFields<SearchQueriesSuggestArgs, 'language' | 'tenantId'>>;
    topics?: Resolver<Maybe<ResolversTypes['TopicSearchConnection']>, ParentType, ContextType, RequireFields<SearchQueriesTopicsArgs, 'language' | 'tenantId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SelectionComponentConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['SelectionComponentConfig'] = ResolversParentTypes['SelectionComponentConfig']> = {
    max?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    min?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    options?: Resolver<Array<ResolversTypes['SelectionComponentOptionConfig']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SelectionComponentOptionConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['SelectionComponentOptionConfig'] = ResolversParentTypes['SelectionComponentOptionConfig']> = {
    isPreselected?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SelectionContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['SelectionContent'] = ResolversParentTypes['SelectionContent']> = {
    options?: Resolver<Array<ResolversTypes['KeyValuePair']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ShapeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Shape'] = ResolversParentTypes['Shape']> = {
    components?: Resolver<Maybe<Array<ResolversTypes['ShapeComponent']>>, ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    itemCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    items?: Resolver<Maybe<Array<ResolversTypes['Item']>>, ParentType, ContextType, RequireFields<ShapeItemsArgs, 'language'>>;
    meta?: Resolver<Maybe<Array<ResolversTypes['KeyValuePair']>>, ParentType, ContextType>;
    metaProperty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<ShapeMetaPropertyArgs, 'key'>>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['ShapeType'], ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ShapeComponentResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShapeComponent'] = ResolversParentTypes['ShapeComponent']> = {
    config?: Resolver<Maybe<ResolversTypes['ComponentConfig']>, ParentType, ContextType>;
    description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['ComponentType'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ShapeMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShapeMetrics'] = ResolversParentTypes['ShapeMetrics']> = {
    count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<ShapeMetricsCountArgs, never>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ShapeMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShapeMutations'] = ResolversParentTypes['ShapeMutations']> = {
    create?: Resolver<ResolversTypes['Shape'], ParentType, ContextType, RequireFields<ShapeMutationsCreateArgs, 'input'>>;
    delete?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<ShapeMutationsDeleteArgs, never>>;
    migrateLegacyId?: Resolver<ResolversTypes['Shape'], ParentType, ContextType, RequireFields<ShapeMutationsMigrateLegacyIdArgs, 'id' | 'identifier' | 'tenantId'>>;
    update?: Resolver<ResolversTypes['Shape'], ParentType, ContextType, RequireFields<ShapeMutationsUpdateArgs, 'input'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type ShapeQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShapeQueries'] = ResolversParentTypes['ShapeQueries']> = {
    get?: Resolver<Maybe<ResolversTypes['Shape']>, ParentType, ContextType, RequireFields<ShapeQueriesGetArgs, never>>;
    getMany?: Resolver<Maybe<Array<ResolversTypes['Shape']>>, ParentType, ContextType, RequireFields<ShapeQueriesGetManyArgs, 'tenantId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SingleLineContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['SingleLineContent'] = ResolversParentTypes['SingleLineContent']> = {
    text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type StockLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['StockLocation'] = ResolversParentTypes['StockLocation']> = {
    identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    settings?: Resolver<Maybe<ResolversTypes['StockLocationSettings']>, ParentType, ContextType>;
    tenant?: Resolver<ResolversTypes['Tenant'], ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type StockLocationMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['StockLocationMutations'] = ResolversParentTypes['StockLocationMutations']> = {
    create?: Resolver<ResolversTypes['StockLocation'], ParentType, ContextType, RequireFields<StockLocationMutationsCreateArgs, 'input'>>;
    delete?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<StockLocationMutationsDeleteArgs, 'identifier' | 'tenantId'>>;
    update?: Resolver<ResolversTypes['StockLocation'], ParentType, ContextType, RequireFields<StockLocationMutationsUpdateArgs, 'identifier' | 'input' | 'tenantId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type StockLocationQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['StockLocationQueries'] = ResolversParentTypes['StockLocationQueries']> = {
    get?: Resolver<Maybe<ResolversTypes['StockLocation']>, ParentType, ContextType, RequireFields<StockLocationQueriesGetArgs, 'identifier' | 'tenantId'>>;
    getMany?: Resolver<Maybe<Array<ResolversTypes['StockLocation']>>, ParentType, ContextType, RequireFields<StockLocationQueriesGetManyArgs, 'tenantId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type StockLocationSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['StockLocationSettings'] = ResolversParentTypes['StockLocationSettings']> = {
    minimum?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    unlimited?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type StripePaymentResolvers<ContextType = any, ParentType extends ResolversParentTypes['StripePayment'] = ResolversParentTypes['StripePayment']> = {
    customerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    metadata?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    orderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    paymentIntentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    paymentMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    paymentMethodId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    provider?: Resolver<ResolversTypes['PaymentProvider'], ParentType, ContextType>;
    subscriptionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionContractResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContract'] = ResolversParentTypes['SubscriptionContract']> = {
    addresses?: Resolver<Maybe<Array<ResolversTypes['SubscriptionContractAddress']>>, ParentType, ContextType>;
    customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
    customerIdentifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    initial?: Resolver<Maybe<ResolversTypes['SubscriptionContractPhase']>, ParentType, ContextType>;
    item?: Resolver<ResolversTypes['SubscriptionContractItem'], ParentType, ContextType>;
    payment?: Resolver<Maybe<ResolversTypes['Payment']>, ParentType, ContextType>;
    recurring?: Resolver<Maybe<ResolversTypes['SubscriptionContractPhase']>, ParentType, ContextType>;
    status?: Resolver<ResolversTypes['SubscriptionContractStatus'], ParentType, ContextType>;
    subscriptionPlan?: Resolver<Maybe<ResolversTypes['SubscriptionPlan']>, ParentType, ContextType>;
    tenant?: Resolver<ResolversTypes['Tenant'], ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    usage?: Resolver<Maybe<Array<ResolversTypes['SubscriptionContractUsage']>>, ParentType, ContextType, RequireFields<SubscriptionContractUsageArgs, 'end' | 'start'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionContractAddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContractAddress'] = ResolversParentTypes['SubscriptionContractAddress']> = {
    city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    email?: Resolver<Maybe<ResolversTypes['EmailAddress']>, ParentType, ContextType>;
    firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    middleName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    postalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    street2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    streetNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    type?: Resolver<ResolversTypes['AddressType'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionContractCancelledEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContractCancelledEvent'] = ResolversParentTypes['SubscriptionContractCancelledEvent']> = {
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['SubscriptionContractEventType'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionContractConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContractConnection'] = ResolversParentTypes['SubscriptionContractConnection']> = {
    edges?: Resolver<Maybe<Array<ResolversTypes['SubscriptionContractConnectionEdge']>>, ParentType, ContextType>;
    pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionContractConnectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContractConnectionEdge'] = ResolversParentTypes['SubscriptionContractConnectionEdge']> = {
    cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    node?: Resolver<ResolversTypes['SubscriptionContract'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionContractEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContractEvent'] = ResolversParentTypes['SubscriptionContractEvent']> = {
    __resolveType: TypeResolveFn<'SubscriptionContractCancelledEvent' | 'SubscriptionContractRenewalDueBroadcastEvent' | 'SubscriptionContractRenewedEvent' | 'SubscriptionContractUsageTrackedEvent', ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['SubscriptionContractEventType'], ParentType, ContextType>;
};
export declare type SubscriptionContractEventConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContractEventConnection'] = ResolversParentTypes['SubscriptionContractEventConnection']> = {
    edges?: Resolver<Maybe<Array<ResolversTypes['SubscriptionContractEventConnectionEdge']>>, ParentType, ContextType>;
    pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionContractEventConnectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContractEventConnectionEdge'] = ResolversParentTypes['SubscriptionContractEventConnectionEdge']> = {
    cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    node?: Resolver<ResolversTypes['SubscriptionContractEvent'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionContractEventQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContractEventQueries'] = ResolversParentTypes['SubscriptionContractEventQueries']> = {
    getMany?: Resolver<Maybe<ResolversTypes['SubscriptionContractEventConnection']>, ParentType, ContextType, RequireFields<SubscriptionContractEventQueriesGetManyArgs, 'first' | 'sort' | 'subscriptionContractId' | 'tenantId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionContractItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContractItem'] = ResolversParentTypes['SubscriptionContractItem']> = {
    imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    meta?: Resolver<Maybe<Array<ResolversTypes['KeyValuePair']>>, ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    sku?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionContractMeteredVariableReferenceResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContractMeteredVariableReference'] = ResolversParentTypes['SubscriptionContractMeteredVariableReference']> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    tierType?: Resolver<Maybe<ResolversTypes['TierType']>, ParentType, ContextType>;
    tiers?: Resolver<Array<ResolversTypes['SubscriptionContractMeteredVariableTierReference']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionContractMeteredVariableTierReferenceResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContractMeteredVariableTierReference'] = ResolversParentTypes['SubscriptionContractMeteredVariableTierReference']> = {
    currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    threshold?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionContractMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContractMutations'] = ResolversParentTypes['SubscriptionContractMutations']> = {
    cancel?: Resolver<ResolversTypes['SubscriptionContract'], ParentType, ContextType, RequireFields<SubscriptionContractMutationsCancelArgs, 'deactivate' | 'id'>>;
    create?: Resolver<ResolversTypes['SubscriptionContract'], ParentType, ContextType, RequireFields<SubscriptionContractMutationsCreateArgs, 'input'>>;
    delete?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<SubscriptionContractMutationsDeleteArgs, 'id'>>;
    renew?: Resolver<ResolversTypes['SubscriptionContract'], ParentType, ContextType, RequireFields<SubscriptionContractMutationsRenewArgs, 'id'>>;
    trackUsage?: Resolver<ResolversTypes['SubscriptionContractUsageTrackedEvent'], ParentType, ContextType, RequireFields<SubscriptionContractMutationsTrackUsageArgs, 'id' | 'input'>>;
    update?: Resolver<ResolversTypes['SubscriptionContract'], ParentType, ContextType, RequireFields<SubscriptionContractMutationsUpdateArgs, 'id' | 'input'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionContractPhaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContractPhase'] = ResolversParentTypes['SubscriptionContractPhase']> = {
    currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    meteredVariables?: Resolver<Maybe<Array<ResolversTypes['SubscriptionContractMeteredVariableReference']>>, ParentType, ContextType>;
    period?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    unit?: Resolver<ResolversTypes['SubscriptionPeriodUnit'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionContractQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContractQueries'] = ResolversParentTypes['SubscriptionContractQueries']> = {
    get?: Resolver<Maybe<ResolversTypes['SubscriptionContract']>, ParentType, ContextType, RequireFields<SubscriptionContractQueriesGetArgs, 'id'>>;
    getMany?: Resolver<Maybe<ResolversTypes['SubscriptionContractConnection']>, ParentType, ContextType, RequireFields<SubscriptionContractQueriesGetManyArgs, 'first' | 'sort' | 'sortField' | 'tenantId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionContractRenewalDueBroadcastEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContractRenewalDueBroadcastEvent'] = ResolversParentTypes['SubscriptionContractRenewalDueBroadcastEvent']> = {
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    data?: Resolver<ResolversTypes['SubscriptionContractRenewalDueBroadcastEventData'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['SubscriptionContractEventType'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionContractRenewalDueBroadcastEventDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContractRenewalDueBroadcastEventData'] = ResolversParentTypes['SubscriptionContractRenewalDueBroadcastEventData']> = {
    broadcastAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    renewAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionContractRenewedEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContractRenewedEvent'] = ResolversParentTypes['SubscriptionContractRenewedEvent']> = {
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['SubscriptionContractEventType'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionContractStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContractStatus'] = ResolversParentTypes['SubscriptionContractStatus']> = {
    activeUntil?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    renewAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionContractUsageResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContractUsage'] = ResolversParentTypes['SubscriptionContractUsage']> = {
    meteredVariableId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionContractUsageTrackedEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionContractUsageTrackedEvent'] = ResolversParentTypes['SubscriptionContractUsageTrackedEvent']> = {
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['SubscriptionContractEventType'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionPlanResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionPlan'] = ResolversParentTypes['SubscriptionPlan']> = {
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    meteredVariables?: Resolver<Maybe<Array<ResolversTypes['SubscriptionPlanMeteredVariable']>>, ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    periods?: Resolver<Maybe<Array<ResolversTypes['SubscriptionPlanPeriod']>>, ParentType, ContextType>;
    tenant?: Resolver<ResolversTypes['Tenant'], ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionPlanMeteredVariableResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionPlanMeteredVariable'] = ResolversParentTypes['SubscriptionPlanMeteredVariable']> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    unit?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionPlanMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionPlanMutations'] = ResolversParentTypes['SubscriptionPlanMutations']> = {
    create?: Resolver<ResolversTypes['SubscriptionPlan'], ParentType, ContextType, RequireFields<SubscriptionPlanMutationsCreateArgs, 'input'>>;
    delete?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<SubscriptionPlanMutationsDeleteArgs, 'identifier' | 'tenantId'>>;
    update?: Resolver<ResolversTypes['SubscriptionPlan'], ParentType, ContextType, RequireFields<SubscriptionPlanMutationsUpdateArgs, 'identifier' | 'input' | 'tenantId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionPlanPeriodResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionPlanPeriod'] = ResolversParentTypes['SubscriptionPlanPeriod']> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    initial?: Resolver<Maybe<ResolversTypes['SubscriptionPlanPhase']>, ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    recurring?: Resolver<ResolversTypes['SubscriptionPlanPhase'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionPlanPhaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionPlanPhase'] = ResolversParentTypes['SubscriptionPlanPhase']> = {
    period?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    unit?: Resolver<ResolversTypes['SubscriptionPeriodUnit'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SubscriptionPlanQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionPlanQueries'] = ResolversParentTypes['SubscriptionPlanQueries']> = {
    get?: Resolver<Maybe<ResolversTypes['SubscriptionPlan']>, ParentType, ContextType, RequireFields<SubscriptionPlanQueriesGetArgs, 'identifier' | 'tenantId'>>;
    getMany?: Resolver<Maybe<Array<ResolversTypes['SubscriptionPlan']>>, ParentType, ContextType, RequireFields<SubscriptionPlanQueriesGetManyArgs, 'tenantId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SuggestSearchAggregationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SuggestSearchAggregations'] = ResolversParentTypes['SuggestSearchAggregations']> = {
    totalResults?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    typesAggregation?: Resolver<Array<ResolversTypes['SuggestSearchTypesAggregation']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SuggestSearchConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SuggestSearchConnection'] = ResolversParentTypes['SuggestSearchConnection']> = {
    aggregations?: Resolver<ResolversTypes['SuggestSearchAggregations'], ParentType, ContextType>;
    edges?: Resolver<Maybe<Array<ResolversTypes['SuggestSearchConnectionEdge']>>, ParentType, ContextType>;
    pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SuggestSearchConnectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SuggestSearchConnectionEdge'] = ResolversParentTypes['SuggestSearchConnectionEdge']> = {
    cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    node?: Resolver<ResolversTypes['SuggestSearchResult'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SuggestSearchResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SuggestSearchResult'] = ResolversParentTypes['SuggestSearchResult']> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type SuggestSearchTypesAggregationResolvers<ContextType = any, ParentType extends ResolversParentTypes['SuggestSearchTypesAggregation'] = ResolversParentTypes['SuggestSearchTypesAggregation']> = {
    count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type TaxResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tax'] = ResolversParentTypes['Tax']> = {
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    percent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type TenantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tenant'] = ResolversParentTypes['Tenant']> = {
    authenticationMethod?: Resolver<Maybe<ResolversTypes['TenantAuthenticationMethod']>, ParentType, ContextType>;
    availableLanguages?: Resolver<Maybe<Array<ResolversTypes['Language']>>, ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    defaults?: Resolver<ResolversTypes['TenantDefaults'], ParentType, ContextType>;
    grids?: Resolver<Maybe<Array<ResolversTypes['Grid']>>, ParentType, ContextType, RequireFields<TenantGridsArgs, 'language' | 'versionLabel'>>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    isTrial?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    logo?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
    meta?: Resolver<Maybe<Array<ResolversTypes['KeyValuePair']>>, ParentType, ContextType>;
    metaProperty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<TenantMetaPropertyArgs, 'key'>>;
    metrics?: Resolver<Maybe<ResolversTypes['TenantMetrics']>, ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    rootItemId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    shapes?: Resolver<Maybe<Array<ResolversTypes['Shape']>>, ParentType, ContextType>;
    staticAuthToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    topics?: Resolver<Maybe<Array<ResolversTypes['Topic']>>, ParentType, ContextType, RequireFields<TenantTopicsArgs, 'language'>>;
    tree?: Resolver<Maybe<Array<ResolversTypes['TreeNode']>>, ParentType, ContextType, RequireFields<TenantTreeArgs, never>>;
    updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    users?: Resolver<Maybe<Array<ResolversTypes['UserTenantRole']>>, ParentType, ContextType>;
    vatTypes?: Resolver<Maybe<Array<ResolversTypes['VatType']>>, ParentType, ContextType>;
    webhooks?: Resolver<Maybe<Array<ResolversTypes['Webhook']>>, ParentType, ContextType, RequireFields<TenantWebhooksArgs, never>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type TenantAuthenticationMethodResolvers<ContextType = any, ParentType extends ResolversParentTypes['TenantAuthenticationMethod'] = ResolversParentTypes['TenantAuthenticationMethod']> = {
    catalogue?: Resolver<Maybe<ResolversTypes['AuthenticationMethod']>, ParentType, ContextType>;
    search?: Resolver<Maybe<ResolversTypes['AuthenticationMethod']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type TenantDefaultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TenantDefaults'] = ResolversParentTypes['TenantDefaults']> = {
    currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type TenantMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TenantMetrics'] = ResolversParentTypes['TenantMetrics']> = {
    apiCalls?: Resolver<ResolversTypes['ApiCallMetrics'], ParentType, ContextType>;
    bandwidth?: Resolver<ResolversTypes['BandwidthUsageMetrics'], ParentType, ContextType>;
    items?: Resolver<ResolversTypes['ItemMetrics'], ParentType, ContextType>;
    orders?: Resolver<ResolversTypes['OrderMetrics'], ParentType, ContextType>;
    shapes?: Resolver<ResolversTypes['ShapeMetrics'], ParentType, ContextType>;
    users?: Resolver<ResolversTypes['UserMetrics'], ParentType, ContextType>;
    webhooks?: Resolver<ResolversTypes['WebhookMetrics'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type TenantMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TenantMutations'] = ResolversParentTypes['TenantMutations']> = {
    addUsers?: Resolver<Array<ResolversTypes['UserTenantRole']>, ParentType, ContextType, RequireFields<TenantMutationsAddUsersArgs, 'roles' | 'tenantId'>>;
    create?: Resolver<ResolversTypes['Tenant'], ParentType, ContextType, RequireFields<TenantMutationsCreateArgs, 'input'>>;
    delete?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<TenantMutationsDeleteArgs, 'id'>>;
    regenerateStaticAuthToken?: Resolver<ResolversTypes['Tenant'], ParentType, ContextType, RequireFields<TenantMutationsRegenerateStaticAuthTokenArgs, 'tenantId'>>;
    removeUsers?: Resolver<Maybe<Array<ResolversTypes['UserTenantRole']>>, ParentType, ContextType, RequireFields<TenantMutationsRemoveUsersArgs, 'tenantId' | 'userIds'>>;
    setAuthenticationMethod?: Resolver<ResolversTypes['Tenant'], ParentType, ContextType, RequireFields<TenantMutationsSetAuthenticationMethodArgs, 'tenantId'>>;
    update?: Resolver<ResolversTypes['Tenant'], ParentType, ContextType, RequireFields<TenantMutationsUpdateArgs, 'id' | 'input'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type TenantQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['TenantQueries'] = ResolversParentTypes['TenantQueries']> = {
    get?: Resolver<Maybe<ResolversTypes['Tenant']>, ParentType, ContextType, RequireFields<TenantQueriesGetArgs, never>>;
    getMany?: Resolver<Maybe<Array<ResolversTypes['Tenant']>>, ParentType, ContextType, RequireFields<TenantQueriesGetManyArgs, never>>;
    getRootTopics?: Resolver<Maybe<Array<Maybe<ResolversTypes['Topic']>>>, ParentType, ContextType, RequireFields<TenantQueriesGetRootTopicsArgs, 'language' | 'tenantId'>>;
    suggestIdentifier?: Resolver<ResolversTypes['IdentifierSuggestion'], ParentType, ContextType, RequireFields<TenantQueriesSuggestIdentifierArgs, 'desired'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type TenantReportsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TenantReports'] = ResolversParentTypes['TenantReports']> = {
    orders?: Resolver<ResolversTypes['OrdersReport'], ParentType, ContextType, RequireFields<TenantReportsOrdersArgs, 'currency' | 'tenantId'>>;
    sales?: Resolver<ResolversTypes['SalesReport'], ParentType, ContextType, RequireFields<TenantReportsSalesArgs, 'currency' | 'tenantId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type TopicResolvers<ContextType = any, ParentType extends ResolversParentTypes['Topic'] = ResolversParentTypes['Topic']> = {
    ancestors?: Resolver<Maybe<Array<ResolversTypes['Topic']>>, ParentType, ContextType>;
    children?: Resolver<Maybe<Array<ResolversTypes['Topic']>>, ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    descendants?: Resolver<Maybe<Array<ResolversTypes['Topic']>>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    items?: Resolver<Maybe<Array<ResolversTypes['Item']>>, ParentType, ContextType>;
    language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    parent?: Resolver<Maybe<ResolversTypes['Topic']>, ParentType, ContextType>;
    parentId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    tenant?: Resolver<ResolversTypes['Tenant'], ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type TopicItemsModifiedResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicItemsModified'] = ResolversParentTypes['TopicItemsModified']> = {
    modified?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type TopicMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicMutations'] = ResolversParentTypes['TopicMutations']> = {
    addItems?: Resolver<ResolversTypes['TopicItemsModified'], ParentType, ContextType, RequireFields<TopicMutationsAddItemsArgs, 'itemIds' | 'topicId'>>;
    bulkCreate?: Resolver<Array<ResolversTypes['Topic']>, ParentType, ContextType, RequireFields<TopicMutationsBulkCreateArgs, 'input' | 'language' | 'tenantId'>>;
    create?: Resolver<ResolversTypes['Topic'], ParentType, ContextType, RequireFields<TopicMutationsCreateArgs, 'input' | 'language'>>;
    delete?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<TopicMutationsDeleteArgs, 'id'>>;
    removeItems?: Resolver<ResolversTypes['TopicItemsModified'], ParentType, ContextType, RequireFields<TopicMutationsRemoveItemsArgs, 'itemIds' | 'topicId'>>;
    update?: Resolver<ResolversTypes['Topic'], ParentType, ContextType, RequireFields<TopicMutationsUpdateArgs, 'id' | 'input' | 'language'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type TopicQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicQueries'] = ResolversParentTypes['TopicQueries']> = {
    get?: Resolver<Maybe<ResolversTypes['Topic']>, ParentType, ContextType, RequireFields<TopicQueriesGetArgs, 'language'>>;
    getRootTopics?: Resolver<Maybe<Array<Maybe<ResolversTypes['Topic']>>>, ParentType, ContextType, RequireFields<TopicQueriesGetRootTopicsArgs, 'language' | 'tenantId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type TopicSearchAggregationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicSearchAggregations'] = ResolversParentTypes['TopicSearchAggregations']> = {
    totalResults?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type TopicSearchConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicSearchConnection'] = ResolversParentTypes['TopicSearchConnection']> = {
    aggregations?: Resolver<ResolversTypes['TopicSearchAggregations'], ParentType, ContextType>;
    edges?: Resolver<Maybe<Array<ResolversTypes['TopicSearchConnectionEdge']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type TopicSearchConnectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicSearchConnectionEdge'] = ResolversParentTypes['TopicSearchConnectionEdge']> = {
    node?: Resolver<ResolversTypes['TopicSearchResult'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type TopicSearchResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicSearchResult'] = ResolversParentTypes['TopicSearchResult']> = {
    display?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type TreeMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TreeMutations'] = ResolversParentTypes['TreeMutations']> = {
    createNode?: Resolver<ResolversTypes['TreeNode'], ParentType, ContextType, RequireFields<TreeMutationsCreateNodeArgs, 'input'>>;
    deleteNode?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<TreeMutationsDeleteNodeArgs, 'itemId'>>;
    moveNode?: Resolver<ResolversTypes['TreeNode'], ParentType, ContextType, RequireFields<TreeMutationsMoveNodeArgs, 'input' | 'itemId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type TreeNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TreeNode'] = ResolversParentTypes['TreeNode']> = {
    ancestors?: Resolver<Maybe<Array<ResolversTypes['TreeNode']>>, ParentType, ContextType>;
    childCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    children?: Resolver<Maybe<Array<ResolversTypes['TreeNode']>>, ParentType, ContextType>;
    identifiers?: Resolver<Maybe<Array<ResolversTypes['TreeNodeIdentifier']>>, ParentType, ContextType>;
    item?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<TreeNodeItemArgs, 'language'>>;
    itemId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    parent?: Resolver<Maybe<ResolversTypes['TreeNode']>, ParentType, ContextType>;
    parentId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<TreeNodePathArgs, 'language'>>;
    position?: Resolver<Maybe<ResolversTypes['PositiveInt']>, ParentType, ContextType>;
    siblings?: Resolver<Maybe<Array<ResolversTypes['TreeNode']>>, ParentType, ContextType>;
    versionLabel?: Resolver<ResolversTypes['VersionLabel'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type TreeNodeIdentifierResolvers<ContextType = any, ParentType extends ResolversParentTypes['TreeNodeIdentifier'] = ResolversParentTypes['TreeNodeIdentifier']> = {
    identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type TreeQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['TreeQueries'] = ResolversParentTypes['TreeQueries']> = {
    getNode?: Resolver<Maybe<ResolversTypes['TreeNode']>, ParentType, ContextType, RequireFields<TreeQueriesGetNodeArgs, 'itemId' | 'versionLabel'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type UploadFieldResolvers<ContextType = any, ParentType extends ResolversParentTypes['UploadField'] = ResolversParentTypes['UploadField']> = {
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
    accessTokens?: Resolver<Maybe<Array<ResolversTypes['AccessToken']>>, ParentType, ContextType>;
    companyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    lastSeenAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    marketingEmailConsentedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    role?: Resolver<Maybe<ResolversTypes['UserTenantRole']>, ParentType, ContextType, RequireFields<UserRoleArgs, 'tenantId'>>;
    sub?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
    tenants?: Resolver<Maybe<Array<ResolversTypes['UserTenantRole']>>, ParentType, ContextType>;
    tocReadAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type UserMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserMetrics'] = ResolversParentTypes['UserMetrics']> = {
    count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<UserMetricsCountArgs, never>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type UserMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserMutations'] = ResolversParentTypes['UserMutations']> = {
    addTenants?: Resolver<Array<ResolversTypes['UserTenantRole']>, ParentType, ContextType, RequireFields<UserMutationsAddTenantsArgs, 'roles' | 'userId'>>;
    create?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<UserMutationsCreateArgs, 'input'>>;
    delete?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<UserMutationsDeleteArgs, 'id'>>;
    generateAccessToken?: Resolver<ResolversTypes['AccessToken'], ParentType, ContextType, RequireFields<UserMutationsGenerateAccessTokenArgs, 'input' | 'userId'>>;
    grantAdminRights?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<UserMutationsGrantAdminRightsArgs, 'userId'>>;
    removeTenants?: Resolver<Maybe<Array<ResolversTypes['UserTenantRole']>>, ParentType, ContextType, RequireFields<UserMutationsRemoveTenantsArgs, 'tenantIds' | 'userId'>>;
    revokeAdminRights?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<UserMutationsRevokeAdminRightsArgs, 'userId'>>;
    update?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<UserMutationsUpdateArgs, 'id'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type UserQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserQueries'] = ResolversParentTypes['UserQueries']> = {
    dev_search?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType, RequireFields<UserQueriesDev_SearchArgs, never>>;
    get?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<UserQueriesGetArgs, 'id'>>;
    getMany?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
    me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type UserTenantRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserTenantRole'] = ResolversParentTypes['UserTenantRole']> = {
    role?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>;
    tenant?: Resolver<ResolversTypes['Tenant'], ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type VatTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['VatType'] = ResolversParentTypes['VatType']> = {
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    percent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type VatTypeMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['VatTypeMutations'] = ResolversParentTypes['VatTypeMutations']> = {
    create?: Resolver<ResolversTypes['VatType'], ParentType, ContextType, RequireFields<VatTypeMutationsCreateArgs, 'input'>>;
    delete?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<VatTypeMutationsDeleteArgs, 'id'>>;
    update?: Resolver<ResolversTypes['VatType'], ParentType, ContextType, RequireFields<VatTypeMutationsUpdateArgs, 'id' | 'input'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type VersionInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['VersionInfo'] = ResolversParentTypes['VersionInfo']> = {
    apiVersion?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    commitSha?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type VersionedRecordInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['VersionedRecordInfo'] = ResolversParentTypes['VersionedRecordInfo']> = {
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    label?: Resolver<ResolversTypes['VersionLabel'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type VersionedServicesResolvers<ContextType = any, ParentType extends ResolversParentTypes['VersionedServices'] = ResolversParentTypes['VersionedServices']> = {
    core?: Resolver<ResolversTypes['VersionInfo'], ParentType, ContextType>;
    federated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    metrics?: Resolver<Maybe<ResolversTypes['VersionInfo']>, ParentType, ContextType>;
    reporting?: Resolver<Maybe<ResolversTypes['VersionInfo']>, ParentType, ContextType>;
    search?: Resolver<Maybe<ResolversTypes['VersionInfo']>, ParentType, ContextType>;
    subscriptions?: Resolver<Maybe<ResolversTypes['VersionInfo']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type VideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Video'] = ResolversParentTypes['Video']> = {
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    playlist?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<VideoPlaylistArgs, 'type'>>;
    playlists?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
    thumbnails?: Resolver<Maybe<Array<ResolversTypes['Image']>>, ParentType, ContextType>;
    title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type VideoContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoContent'] = ResolversParentTypes['VideoContent']> = {
    videos?: Resolver<Maybe<Array<ResolversTypes['Video']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type VideoMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoMutations'] = ResolversParentTypes['VideoMutations']> = {
    addPlaylists?: Resolver<ResolversTypes['Video'], ParentType, ContextType, RequireFields<VideoMutationsAddPlaylistsArgs, 'keys' | 'videoId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type WebhookResolvers<ContextType = any, ParentType extends ResolversParentTypes['Webhook'] = ResolversParentTypes['Webhook']> = {
    concern?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    event?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    graphqlQuery?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    headers?: Resolver<Maybe<Array<ResolversTypes['WebhookHeader']>>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    lastInvocation?: Resolver<Maybe<ResolversTypes['WebhookInvocation']>, ParentType, ContextType>;
    method?: Resolver<ResolversTypes['HttpMethod'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    pastInvocations?: Resolver<Maybe<Array<ResolversTypes['WebhookInvocation']>>, ParentType, ContextType, RequireFields<WebhookPastInvocationsArgs, 'limit'>>;
    tenant?: Resolver<Maybe<ResolversTypes['Tenant']>, ParentType, ContextType>;
    tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type WebhookHeaderResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebhookHeader'] = ResolversParentTypes['WebhookHeader']> = {
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type WebhookInvocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebhookInvocation'] = ResolversParentTypes['WebhookInvocation']> = {
    end?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    payload?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
    response?: Resolver<Maybe<ResolversTypes['WebhookInvocationResponse']>, ParentType, ContextType>;
    start?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type WebhookInvocationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebhookInvocationResponse'] = ResolversParentTypes['WebhookInvocationResponse']> = {
    body?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
    status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type WebhookMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebhookMetrics'] = ResolversParentTypes['WebhookMetrics']> = {
    count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<WebhookMetricsCountArgs, never>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type WebhookMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebhookMutations'] = ResolversParentTypes['WebhookMutations']> = {
    create?: Resolver<ResolversTypes['Webhook'], ParentType, ContextType, RequireFields<WebhookMutationsCreateArgs, 'input'>>;
    delete?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<WebhookMutationsDeleteArgs, 'id'>>;
    registerInvocation?: Resolver<ResolversTypes['WebhookInvocation'], ParentType, ContextType, RequireFields<WebhookMutationsRegisterInvocationArgs, 'webhookId'>>;
    update?: Resolver<ResolversTypes['Webhook'], ParentType, ContextType, RequireFields<WebhookMutationsUpdateArgs, 'id' | 'input'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type WebhookQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebhookQueries'] = ResolversParentTypes['WebhookQueries']> = {
    get?: Resolver<Maybe<ResolversTypes['Webhook']>, ParentType, ContextType, RequireFields<WebhookQueriesGetArgs, 'id'>>;
    getMany?: Resolver<Maybe<Array<ResolversTypes['Webhook']>>, ParentType, ContextType, RequireFields<WebhookQueriesGetManyArgs, 'tenantId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type Resolvers<ContextType = any> = {
    AcceptedContentType?: AcceptedContentTypeResolvers<ContextType>;
    AccessToken?: AccessTokenResolvers<ContextType>;
    AccessTokenMutations?: AccessTokenMutationsResolvers<ContextType>;
    Address?: AddressResolvers<ContextType>;
    ApiCallMetrics?: ApiCallMetricsResolvers<ContextType>;
    BandwidthUsageMetrics?: BandwidthUsageMetricsResolvers<ContextType>;
    BooleanContent?: BooleanContentResolvers<ContextType>;
    CashPayment?: CashPaymentResolvers<ContextType>;
    Component?: ComponentResolvers<ContextType>;
    ComponentChoiceComponentConfig?: ComponentChoiceComponentConfigResolvers<ContextType>;
    ComponentChoiceContent?: ComponentChoiceContentResolvers<ContextType>;
    ComponentConfig?: ComponentConfigResolvers<ContextType>;
    ComponentContent?: ComponentContentResolvers<ContextType>;
    ContentChunkComponentConfig?: ContentChunkComponentConfigResolvers<ContextType>;
    ContentChunkContent?: ContentChunkContentResolvers<ContextType>;
    CurrencySummary?: CurrencySummaryResolvers<ContextType>;
    CurrencySummaryReport?: CurrencySummaryReportResolvers<ContextType>;
    CustomPayment?: CustomPaymentResolvers<ContextType>;
    CustomProperties?: CustomPropertiesResolvers<ContextType>;
    Customer?: CustomerResolvers<ContextType>;
    CustomerConnection?: CustomerConnectionResolvers<ContextType>;
    CustomerConnectionEdge?: CustomerConnectionEdgeResolvers<ContextType>;
    CustomerMutations?: CustomerMutationsResolvers<ContextType>;
    CustomerQueries?: CustomerQueriesResolvers<ContextType>;
    Date?: GraphQLScalarType;
    DateTime?: GraphQLScalarType;
    DatetimeContent?: DatetimeContentResolvers<ContextType>;
    Discount?: DiscountResolvers<ContextType>;
    Document?: DocumentResolvers<ContextType>;
    DocumentMutations?: DocumentMutationsResolvers<ContextType>;
    DocumentQueries?: DocumentQueriesResolvers<ContextType>;
    EmailAddress?: GraphQLScalarType;
    File?: FileResolvers<ContextType>;
    FileContent?: FileContentResolvers<ContextType>;
    FileQueries?: FileQueriesResolvers<ContextType>;
    FileSize?: FileSizeResolvers<ContextType>;
    FileUploadMutations?: FileUploadMutationsResolvers<ContextType>;
    FilesComponentConfig?: FilesComponentConfigResolvers<ContextType>;
    Folder?: FolderResolvers<ContextType>;
    FolderMutations?: FolderMutationsResolvers<ContextType>;
    FolderQueries?: FolderQueriesResolvers<ContextType>;
    Grid?: GridResolvers<ContextType>;
    GridColumn?: GridColumnResolvers<ContextType>;
    GridColumnLayout?: GridColumnLayoutResolvers<ContextType>;
    GridMutations?: GridMutationsResolvers<ContextType>;
    GridPublishInfo?: GridPublishInfoResolvers<ContextType>;
    GridQueries?: GridQueriesResolvers<ContextType>;
    GridRelationsContent?: GridRelationsContentResolvers<ContextType>;
    GridRow?: GridRowResolvers<ContextType>;
    IObjectMetrics?: IObjectMetricsResolvers<ContextType>;
    IObjectReports?: IObjectReportsResolvers<ContextType>;
    IdentifierSuggestion?: IdentifierSuggestionResolvers<ContextType>;
    Image?: ImageResolvers<ContextType>;
    ImageContent?: ImageContentResolvers<ContextType>;
    ImageMutations?: ImageMutationsResolvers<ContextType>;
    ImageQueries?: ImageQueriesResolvers<ContextType>;
    ImageVariant?: ImageVariantResolvers<ContextType>;
    InviteToken?: InviteTokenResolvers<ContextType>;
    InviteTokenMutations?: InviteTokenMutationsResolvers<ContextType>;
    Item?: ItemResolvers<ContextType>;
    ItemMetrics?: ItemMetricsResolvers<ContextType>;
    ItemMutations?: ItemMutationsResolvers<ContextType>;
    ItemQueries?: ItemQueriesResolvers<ContextType>;
    ItemRelationsComponentConfig?: ItemRelationsComponentConfigResolvers<ContextType>;
    ItemRelationsContent?: ItemRelationsContentResolvers<ContextType>;
    JSON?: GraphQLScalarType;
    KeyValuePair?: KeyValuePairResolvers<ContextType>;
    KlarnaPayment?: KlarnaPaymentResolvers<ContextType>;
    Language?: LanguageResolvers<ContextType>;
    LanguageMutations?: LanguageMutationsResolvers<ContextType>;
    LocationContent?: LocationContentResolvers<ContextType>;
    MeMutations?: MeMutationsResolvers<ContextType>;
    Mutation?: MutationResolvers<ContextType>;
    NonNegativeFloat?: GraphQLScalarType;
    NonNegativeInt?: GraphQLScalarType;
    NumericComponentConfig?: NumericComponentConfigResolvers<ContextType>;
    NumericContent?: NumericContentResolvers<ContextType>;
    Order?: OrderResolvers<ContextType>;
    OrderConnection?: OrderConnectionResolvers<ContextType>;
    OrderConnectionEdge?: OrderConnectionEdgeResolvers<ContextType>;
    OrderItem?: OrderItemResolvers<ContextType>;
    OrderItemMeteredVariable?: OrderItemMeteredVariableResolvers<ContextType>;
    OrderItemSubscription?: OrderItemSubscriptionResolvers<ContextType>;
    OrderMetrics?: OrderMetricsResolvers<ContextType>;
    OrderMutations?: OrderMutationsResolvers<ContextType>;
    OrderPipeline?: OrderPipelineResolvers<ContextType>;
    OrderQueries?: OrderQueriesResolvers<ContextType>;
    OrdersReport?: OrdersReportResolvers<ContextType>;
    PageInfo?: PageInfoResolvers<ContextType>;
    ParagraphCollectionContent?: ParagraphCollectionContentResolvers<ContextType>;
    ParagraphContent?: ParagraphContentResolvers<ContextType>;
    Payment?: PaymentResolvers<ContextType>;
    PaymentType?: PaymentTypeResolvers<ContextType>;
    PaypalPayment?: PaypalPaymentResolvers<ContextType>;
    PhoneNumber?: GraphQLScalarType;
    Pipeline?: PipelineResolvers<ContextType>;
    PipelineConnection?: PipelineConnectionResolvers<ContextType>;
    PipelineConnectionEdge?: PipelineConnectionEdgeResolvers<ContextType>;
    PipelineMutations?: PipelineMutationsResolvers<ContextType>;
    PipelineQueries?: PipelineQueriesResolvers<ContextType>;
    PipelineStage?: PipelineStageResolvers<ContextType>;
    PositiveInt?: GraphQLScalarType;
    PresignedUploadRequest?: PresignedUploadRequestResolvers<ContextType>;
    Price?: PriceResolvers<ContextType>;
    PriceVariant?: PriceVariantResolvers<ContextType>;
    PriceVariantMutations?: PriceVariantMutationsResolvers<ContextType>;
    PriceVariantQueries?: PriceVariantQueriesResolvers<ContextType>;
    Product?: ProductResolvers<ContextType>;
    ProductMutations?: ProductMutationsResolvers<ContextType>;
    ProductPriceVariant?: ProductPriceVariantResolvers<ContextType>;
    ProductQueries?: ProductQueriesResolvers<ContextType>;
    ProductStockLocation?: ProductStockLocationResolvers<ContextType>;
    ProductSubscription?: ProductSubscriptionResolvers<ContextType>;
    ProductSubscriptionConnection?: ProductSubscriptionConnectionResolvers<ContextType>;
    ProductSubscriptionConnectionEdge?: ProductSubscriptionConnectionEdgeResolvers<ContextType>;
    ProductSubscriptionHistoryEvent?: ProductSubscriptionHistoryEventResolvers<ContextType>;
    ProductSubscriptionHistoryEventCancellation?: ProductSubscriptionHistoryEventCancellationResolvers<ContextType>;
    ProductSubscriptionHistoryEventRenewal?: ProductSubscriptionHistoryEventRenewalResolvers<ContextType>;
    ProductSubscriptionHistoryEventRenewalDueBroadcast?: ProductSubscriptionHistoryEventRenewalDueBroadcastResolvers<ContextType>;
    ProductSubscriptionItem?: ProductSubscriptionItemResolvers<ContextType>;
    ProductSubscriptionMutations?: ProductSubscriptionMutationsResolvers<ContextType>;
    ProductSubscriptionPhase?: ProductSubscriptionPhaseResolvers<ContextType>;
    ProductSubscriptionQueries?: ProductSubscriptionQueriesResolvers<ContextType>;
    ProductSubscriptionStatus?: ProductSubscriptionStatusResolvers<ContextType>;
    ProductSubscriptionUsage?: ProductSubscriptionUsageResolvers<ContextType>;
    ProductVariant?: ProductVariantResolvers<ContextType>;
    ProductVariantAttribute?: ProductVariantAttributeResolvers<ContextType>;
    ProductVariantSubscriptionMeteredVariable?: ProductVariantSubscriptionMeteredVariableResolvers<ContextType>;
    ProductVariantSubscriptionPlan?: ProductVariantSubscriptionPlanResolvers<ContextType>;
    ProductVariantSubscriptionPlanPeriod?: ProductVariantSubscriptionPlanPeriodResolvers<ContextType>;
    ProductVariantSubscriptionPlanPricing?: ProductVariantSubscriptionPlanPricingResolvers<ContextType>;
    ProductVariantSubscriptionPlanTier?: ProductVariantSubscriptionPlanTierResolvers<ContextType>;
    PropertiesTableComponentConfig?: PropertiesTableComponentConfigResolvers<ContextType>;
    PropertiesTableComponentConfigSection?: PropertiesTableComponentConfigSectionResolvers<ContextType>;
    PropertiesTableComponentSection?: PropertiesTableComponentSectionResolvers<ContextType>;
    PropertiesTableContent?: PropertiesTableContentResolvers<ContextType>;
    PublishInfo?: PublishInfoResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    ReportMetric?: ReportMetricResolvers<ContextType>;
    RichTextContent?: RichTextContentResolvers<ContextType>;
    SalesReport?: SalesReportResolvers<ContextType>;
    SearchQueries?: SearchQueriesResolvers<ContextType>;
    SelectionComponentConfig?: SelectionComponentConfigResolvers<ContextType>;
    SelectionComponentOptionConfig?: SelectionComponentOptionConfigResolvers<ContextType>;
    SelectionContent?: SelectionContentResolvers<ContextType>;
    Shape?: ShapeResolvers<ContextType>;
    ShapeComponent?: ShapeComponentResolvers<ContextType>;
    ShapeMetrics?: ShapeMetricsResolvers<ContextType>;
    ShapeMutations?: ShapeMutationsResolvers<ContextType>;
    ShapeQueries?: ShapeQueriesResolvers<ContextType>;
    SingleLineContent?: SingleLineContentResolvers<ContextType>;
    StockLocation?: StockLocationResolvers<ContextType>;
    StockLocationMutations?: StockLocationMutationsResolvers<ContextType>;
    StockLocationQueries?: StockLocationQueriesResolvers<ContextType>;
    StockLocationSettings?: StockLocationSettingsResolvers<ContextType>;
    StripePayment?: StripePaymentResolvers<ContextType>;
    SubscriptionContract?: SubscriptionContractResolvers<ContextType>;
    SubscriptionContractAddress?: SubscriptionContractAddressResolvers<ContextType>;
    SubscriptionContractCancelledEvent?: SubscriptionContractCancelledEventResolvers<ContextType>;
    SubscriptionContractConnection?: SubscriptionContractConnectionResolvers<ContextType>;
    SubscriptionContractConnectionEdge?: SubscriptionContractConnectionEdgeResolvers<ContextType>;
    SubscriptionContractEvent?: SubscriptionContractEventResolvers<ContextType>;
    SubscriptionContractEventConnection?: SubscriptionContractEventConnectionResolvers<ContextType>;
    SubscriptionContractEventConnectionEdge?: SubscriptionContractEventConnectionEdgeResolvers<ContextType>;
    SubscriptionContractEventQueries?: SubscriptionContractEventQueriesResolvers<ContextType>;
    SubscriptionContractItem?: SubscriptionContractItemResolvers<ContextType>;
    SubscriptionContractMeteredVariableReference?: SubscriptionContractMeteredVariableReferenceResolvers<ContextType>;
    SubscriptionContractMeteredVariableTierReference?: SubscriptionContractMeteredVariableTierReferenceResolvers<ContextType>;
    SubscriptionContractMutations?: SubscriptionContractMutationsResolvers<ContextType>;
    SubscriptionContractPhase?: SubscriptionContractPhaseResolvers<ContextType>;
    SubscriptionContractQueries?: SubscriptionContractQueriesResolvers<ContextType>;
    SubscriptionContractRenewalDueBroadcastEvent?: SubscriptionContractRenewalDueBroadcastEventResolvers<ContextType>;
    SubscriptionContractRenewalDueBroadcastEventData?: SubscriptionContractRenewalDueBroadcastEventDataResolvers<ContextType>;
    SubscriptionContractRenewedEvent?: SubscriptionContractRenewedEventResolvers<ContextType>;
    SubscriptionContractStatus?: SubscriptionContractStatusResolvers<ContextType>;
    SubscriptionContractUsage?: SubscriptionContractUsageResolvers<ContextType>;
    SubscriptionContractUsageTrackedEvent?: SubscriptionContractUsageTrackedEventResolvers<ContextType>;
    SubscriptionPlan?: SubscriptionPlanResolvers<ContextType>;
    SubscriptionPlanMeteredVariable?: SubscriptionPlanMeteredVariableResolvers<ContextType>;
    SubscriptionPlanMutations?: SubscriptionPlanMutationsResolvers<ContextType>;
    SubscriptionPlanPeriod?: SubscriptionPlanPeriodResolvers<ContextType>;
    SubscriptionPlanPhase?: SubscriptionPlanPhaseResolvers<ContextType>;
    SubscriptionPlanQueries?: SubscriptionPlanQueriesResolvers<ContextType>;
    SuggestSearchAggregations?: SuggestSearchAggregationsResolvers<ContextType>;
    SuggestSearchConnection?: SuggestSearchConnectionResolvers<ContextType>;
    SuggestSearchConnectionEdge?: SuggestSearchConnectionEdgeResolvers<ContextType>;
    SuggestSearchResult?: SuggestSearchResultResolvers<ContextType>;
    SuggestSearchTypesAggregation?: SuggestSearchTypesAggregationResolvers<ContextType>;
    Tax?: TaxResolvers<ContextType>;
    Tenant?: TenantResolvers<ContextType>;
    TenantAuthenticationMethod?: TenantAuthenticationMethodResolvers<ContextType>;
    TenantDefaults?: TenantDefaultsResolvers<ContextType>;
    TenantMetrics?: TenantMetricsResolvers<ContextType>;
    TenantMutations?: TenantMutationsResolvers<ContextType>;
    TenantQueries?: TenantQueriesResolvers<ContextType>;
    TenantReports?: TenantReportsResolvers<ContextType>;
    Topic?: TopicResolvers<ContextType>;
    TopicItemsModified?: TopicItemsModifiedResolvers<ContextType>;
    TopicMutations?: TopicMutationsResolvers<ContextType>;
    TopicQueries?: TopicQueriesResolvers<ContextType>;
    TopicSearchAggregations?: TopicSearchAggregationsResolvers<ContextType>;
    TopicSearchConnection?: TopicSearchConnectionResolvers<ContextType>;
    TopicSearchConnectionEdge?: TopicSearchConnectionEdgeResolvers<ContextType>;
    TopicSearchResult?: TopicSearchResultResolvers<ContextType>;
    TreeMutations?: TreeMutationsResolvers<ContextType>;
    TreeNode?: TreeNodeResolvers<ContextType>;
    TreeNodeIdentifier?: TreeNodeIdentifierResolvers<ContextType>;
    TreeQueries?: TreeQueriesResolvers<ContextType>;
    UploadField?: UploadFieldResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
    UserMetrics?: UserMetricsResolvers<ContextType>;
    UserMutations?: UserMutationsResolvers<ContextType>;
    UserQueries?: UserQueriesResolvers<ContextType>;
    UserTenantRole?: UserTenantRoleResolvers<ContextType>;
    VatType?: VatTypeResolvers<ContextType>;
    VatTypeMutations?: VatTypeMutationsResolvers<ContextType>;
    VersionInfo?: VersionInfoResolvers<ContextType>;
    VersionedRecordInfo?: VersionedRecordInfoResolvers<ContextType>;
    VersionedServices?: VersionedServicesResolvers<ContextType>;
    Video?: VideoResolvers<ContextType>;
    VideoContent?: VideoContentResolvers<ContextType>;
    VideoMutations?: VideoMutationsResolvers<ContextType>;
    Webhook?: WebhookResolvers<ContextType>;
    WebhookHeader?: WebhookHeaderResolvers<ContextType>;
    WebhookInvocation?: WebhookInvocationResolvers<ContextType>;
    WebhookInvocationResponse?: WebhookInvocationResponseResolvers<ContextType>;
    WebhookMetrics?: WebhookMetricsResolvers<ContextType>;
    WebhookMutations?: WebhookMutationsResolvers<ContextType>;
    WebhookQueries?: WebhookQueriesResolvers<ContextType>;
};
