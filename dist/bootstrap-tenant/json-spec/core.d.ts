import { SelectionOption } from '../../types';
import { SubscriptionPeriodUnit, SubscriptionPlanPeriod, TierType } from '../../generated/graphql';
export declare type JSONStringTranslated = Record<string, string> | string;
export declare type JSONTranslation = JSONStringTranslated;
export interface JSONPriceVariant {
    identifier: string;
    name: string;
    currency: string;
}
export interface JSONStockLocation {
    identifier: string;
    name: string;
    minimum?: number;
}
export interface JSONSubscriptionPlan {
    identifier: string;
    name: string;
    meteredVariables: {
        id?: string;
        identifier: string;
        name: string;
        unit: SubscriptionPeriodUnit;
    }[];
    periods: SubscriptionPlanPeriod[];
}
export interface JSONLanguage {
    code: string;
    name: string;
    isDefault?: boolean;
}
export interface JSONVatType {
    id?: string;
    name: string;
    percent: number;
}
export interface JSONTopic {
    id?: string;
    name: JSONStringTranslated;
    children?: JSONTopic[];
    parentId?: string;
    path?: JSONStringTranslated;
    pathIdentifier?: JSONStringTranslated;
    hierarchyPath?: string;
    parentHierarchyPath?: string;
}
export interface RichTextNode {
    kind?: 'inline' | 'block';
    type?: 'abbrevition' | 'address' | 'article' | 'aside' | 'code' | 'container' | 'deleted' | 'details' | 'emphasized' | 'figcaption' | 'figure' | 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'heading5' | 'heading6' | 'highlight' | 'horizontal-line' | 'image' | 'line-break' | 'link' | 'unordered-list' | 'ordered-list' | 'list-item' | 'paragraph' | 'picture' | 'preformatted' | 'quote' | 'section' | 'strong' | 'subscripted' | 'superscripted' | 'time' | 'title-of-a-work' | 'underlined';
    children?: RichTextNode[];
    textContent?: string;
    metadata?: Record<string, unknown>;
}
export interface JSONRichTextStructured {
    plainText?: string;
    html?: string;
    json?: RichTextNode | RichTextNode[];
}
export declare type JSONRichText = JSONRichTextStructured | null;
export declare type JSONRichTextTranslated = JSONRichText | Record<string, JSONRichText>;
export interface JSONMedia {
    src: string;
    key?: string;
}
export interface JSONImage extends JSONMedia {
    mimeType?: string;
    altText?: JSONStringTranslated;
    caption?: JSONRichTextTranslated;
}
export interface JSONVideo extends JSONMedia {
    title?: JSONStringTranslated;
    thumbnails?: JSONImage[];
}
export interface JSONFile extends JSONMedia {
    title?: JSONStringTranslated;
}
export declare type JSONSingleLine = string;
export declare type JSONSingleLineTranslated = JSONStringTranslated;
export interface JSONParagraphCollection {
    title?: JSONStringTranslated;
    body: JSONRichTextTranslated;
    images?: JSONImages;
    videos?: JSONVideos;
}
export declare type JSONImages = JSONImage[];
export declare type JSONVideos = JSONVideo[];
export declare type JSONFiles = JSONFile[];
export declare type JSONBoolean = boolean;
export declare type JSONDateTime = string;
export interface JSONLocation {
    lat: number;
    long: number;
}
export interface JSONNumeric {
    number: number;
    unit?: string;
}
export interface JSONPropertiesTableSection {
    title: string;
    properties?: Record<string, any>;
}
export declare type JSONPropertiesTable = JSONPropertiesTableSection[];
export interface JSONItemReference {
    cataloguePath?: string;
    externalReference?: string;
}
export interface JSONGridReference {
    name?: string;
}
export declare type JSONItemRelation = JSONItemReference;
export declare type JSONItemRelations = JSONItemRelation[];
export declare type JSONGridRelation = JSONGridReference;
export declare type JSONGridRelations = JSONGridReference[];
export declare type JSONSelection = string[] | string;
export declare type ComponentId = string;
export declare type JSONComponentContent = JSONSingleLineTranslated | JSONRichTextTranslated | JSONParagraphCollection[] | JSONImages | JSONVideos | JSONFiles | JSONBoolean | JSONDateTime | JSONLocation | JSONPropertiesTable | JSONItemRelations | JSONGridRelations | JSONSelection | JSONContentChunk | JSONNumeric | null;
export declare type JSONComponents = Record<ComponentId, JSONComponentContent>;
export declare type JSONContentChunk = JSONComponents[];
export declare type JSONComponentChoice = Record<string, JSONComponentContent>;
export declare type JSONItem = JSONProduct | JSONDocument | JSONFolder;
export declare type JSONStructuredTopic = {
    hierarchy?: string;
    path?: string;
};
export declare type JSONItemTopic = JSONStructuredTopic | string;
export interface JSONItemBase {
    cataloguePath?: string;
    externalReference?: string;
    id?: string;
    name: JSONStringTranslated;
    shape: string;
    components?: Record<string, JSONComponentContent | JSONComponentChoice> | null;
    topics?: JSONItemTopic[];
    parentExternalReference?: string;
    parentCataloguePath?: string;
    _parentId?: string;
    _options?: {
        publish?: boolean;
        moveToRoot?: boolean;
    };
    _componentsData?: Record<string, any>;
    _topicsData?: Record<string, string[]>;
    _exists?: boolean;
}
export interface JSONFolder extends JSONItemBase {
    children?: JSONItem[];
}
export interface JSONDocument extends JSONItemBase {
}
export declare type JSONProductVariantPriceVariants = Record<string, number>;
export declare type JSONProductVariantStockLocations = Record<string, number>;
export interface JSONProductVariantSubscriptionPlanMeteredVariableTier {
    threshold: number;
    price: JSONProductVariantPriceVariants;
}
export interface JSONProductVariantSubscriptionPlanMeteredVariable {
    id?: string;
    identifier: string;
    name: string;
    tierType: TierType;
    tiers: JSONProductVariantSubscriptionPlanMeteredVariableTier[];
}
export interface JSONProductSubscriptionPlanPricing {
    period: string;
    unit: SubscriptionPeriodUnit;
    price: JSONProductVariantPriceVariants;
    meteredVariables: JSONProductVariantSubscriptionPlanMeteredVariable[];
}
export interface JSONProductSubscriptionPlanPeriod {
    id?: string;
    name: string;
    initial?: JSONProductSubscriptionPlanPricing;
    recurring: JSONProductSubscriptionPlanPricing;
}
export interface JSONProductSubscriptionPlan {
    identifier: string;
    name: string;
    periods: JSONProductSubscriptionPlanPeriod[];
}
export interface JSONProductVariant {
    isDefault?: boolean;
    name: JSONStringTranslated;
    sku: string;
    price?: JSONProductVariantPriceVariants | number;
    images?: JSONImage[];
    stock?: JSONProductVariantStockLocations | number;
    attributes?: Record<string, string>;
    externalReference?: string;
    subscriptionPlans?: JSONProductSubscriptionPlan[];
}
export interface JSONProduct extends JSONItemBase {
    variants: JSONProductVariant[];
    vatType: string;
}
export interface JSONGridColumn {
    item?: JSONItemReference;
    itemId?: string;
    layout: {
        rowspan: number;
        colspan: number;
    };
}
export interface JSONGridRow {
    columns: JSONGridColumn[];
}
export interface JSONGrid {
    id?: string;
    name: JSONStringTranslated;
    rows: JSONGridRow[];
}
export interface JSONShape {
    identifier: string;
    name: string;
    type: 'document' | 'folder' | 'product';
    components?: JSONShapeComponent[];
}
export interface JSONShapeComponent {
    id: string;
    name: string;
    type: 'boolean' | 'componentChoice' | 'contentChunk' | 'datetime' | 'gridRelations' | 'images' | 'itemRelations' | 'location' | 'numeric' | 'paragraphCollection' | 'propertiesTable' | 'richText' | 'selection' | 'singleLine' | 'videos' | 'files';
    description?: string;
    config?: JSONShapeComponentConfig;
}
export declare type JSONShapeComponentConfig = JSONShapeComponentSelectionConfig | JSONShapeComponentComponentChoiceConfig | JSONShapeComponentContentChunkConfig | JSONShapeComponentItemRelationsConfig | JSONShapeComponentNumericConfig | JSONShapeComponentPropertiesTableConfig | JSONShapeComponentFilesConfig;
interface JSONShapeComponentConfigMinMax {
    min?: number | null;
    max?: number | null;
}
export interface JSONShapeComponentSelectionConfig extends JSONShapeComponentConfigMinMax {
    options?: SelectionOption[];
}
export interface JSONShapeComponentComponentChoiceConfig {
    choices: JSONShapeComponent[];
}
export interface JSONShapeComponentContentChunkConfig {
    repeatable?: boolean;
    components: JSONShapeComponent[];
}
export interface JSONShapeComponentItemRelationsConfig extends JSONShapeComponentConfigMinMax {
    acceptedShapeIdentifiers?: string[];
}
export interface JSONShapeComponentNumericConfig {
    decimalPlaces?: number;
    units?: string[];
}
export interface JSONShapeComponentPropertiesTableConfig {
    sections: {
        title?: string;
        keys: string[];
    }[];
}
export interface JSONShapeComponentFilesConfig extends JSONShapeComponentConfigMinMax {
    acceptedContentTypes?: {
        contentType: string;
        extensionLabel?: string;
    }[];
    maxFileSize: {
        size: number;
        unit: 'Bytes' | 'GiB' | 'KiB' | 'MiB';
    };
}
export interface JSONAddress {
    type: 'delivery' | 'billing' | 'other';
    street?: string;
    street2?: string;
    streetNumber?: string;
    postalCode?: string;
    city?: string;
    state?: string;
    country?: string;
}
export interface JSONCustomer {
    identifier?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    birthDate?: string;
    addresses?: JSONAddress[];
    companyName?: string;
    taxNumber?: string;
    email?: string;
    phone?: string;
}
export {};
