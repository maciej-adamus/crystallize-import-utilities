"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionLabel = exports.UserRoles = exports.UserRole = exports.TierType = exports.SuggestSearchItemType = exports.SubscriptionPeriodUnit = exports.SubscriptionContractSortField = exports.SubscriptionContractEventType = exports.SubscriptionContractEventSortField = exports.SortDirection = exports.ShapeType = exports.ProductSubscriptionSortField = exports.ProductSubscriptionHistoryEventType = exports.PipelineSortField = exports.PaymentProvider = exports.Parameter = exports.OrderSortField = exports.OrderItemSubscriptionPeriodUnit = exports.Operation = exports.ItemType = exports.Interval = exports.HttpMethod = exports.FileUploadType = exports.FileSizeUnit = exports.ComponentType = exports.BandwidthUsageType = exports.BandwidthUnit = exports.AuthenticationMethod = exports.AddressType = void 0;
var AddressType;
(function (AddressType) {
    AddressType["Billing"] = "billing";
    AddressType["Delivery"] = "delivery";
    AddressType["Other"] = "other";
})(AddressType = exports.AddressType || (exports.AddressType = {}));
var AuthenticationMethod;
(function (AuthenticationMethod) {
    AuthenticationMethod["AccessTokenPair"] = "accessTokenPair";
    AuthenticationMethod["None"] = "none";
    AuthenticationMethod["StaticToken"] = "staticToken";
})(AuthenticationMethod = exports.AuthenticationMethod || (exports.AuthenticationMethod = {}));
var BandwidthUnit;
(function (BandwidthUnit) {
    BandwidthUnit["Bytes"] = "Bytes";
    BandwidthUnit["GiB"] = "GiB";
    BandwidthUnit["KiB"] = "KiB";
    BandwidthUnit["MiB"] = "MiB";
})(BandwidthUnit = exports.BandwidthUnit || (exports.BandwidthUnit = {}));
var BandwidthUsageType;
(function (BandwidthUsageType) {
    BandwidthUsageType["ApiCall"] = "ApiCall";
    BandwidthUsageType["Media"] = "Media";
})(BandwidthUsageType = exports.BandwidthUsageType || (exports.BandwidthUsageType = {}));
var ComponentType;
(function (ComponentType) {
    ComponentType["Boolean"] = "boolean";
    ComponentType["ComponentChoice"] = "componentChoice";
    ComponentType["ContentChunk"] = "contentChunk";
    ComponentType["Datetime"] = "datetime";
    ComponentType["Files"] = "files";
    ComponentType["GridRelations"] = "gridRelations";
    ComponentType["Images"] = "images";
    ComponentType["ItemRelations"] = "itemRelations";
    ComponentType["Location"] = "location";
    ComponentType["Numeric"] = "numeric";
    ComponentType["ParagraphCollection"] = "paragraphCollection";
    ComponentType["PropertiesTable"] = "propertiesTable";
    ComponentType["RichText"] = "richText";
    ComponentType["Selection"] = "selection";
    ComponentType["SingleLine"] = "singleLine";
    ComponentType["Videos"] = "videos";
})(ComponentType = exports.ComponentType || (exports.ComponentType = {}));
var FileSizeUnit;
(function (FileSizeUnit) {
    FileSizeUnit["Bytes"] = "Bytes";
    FileSizeUnit["GiB"] = "GiB";
    FileSizeUnit["KiB"] = "KiB";
    FileSizeUnit["MiB"] = "MiB";
})(FileSizeUnit = exports.FileSizeUnit || (exports.FileSizeUnit = {}));
var FileUploadType;
(function (FileUploadType) {
    FileUploadType["Media"] = "MEDIA";
    FileUploadType["Static"] = "STATIC";
})(FileUploadType = exports.FileUploadType || (exports.FileUploadType = {}));
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["Delete"] = "DELETE";
    HttpMethod["Get"] = "GET";
    HttpMethod["Patch"] = "PATCH";
    HttpMethod["Post"] = "POST";
    HttpMethod["Put"] = "PUT";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
var Interval;
(function (Interval) {
    Interval["Annually"] = "ANNUALLY";
    Interval["Daily"] = "DAILY";
    Interval["Hourly"] = "HOURLY";
    Interval["Monthly"] = "MONTHLY";
})(Interval = exports.Interval || (exports.Interval = {}));
var ItemType;
(function (ItemType) {
    ItemType["Document"] = "document";
    ItemType["Folder"] = "folder";
    ItemType["Product"] = "product";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
var Operation;
(function (Operation) {
    Operation["Avg"] = "AVG";
    Operation["Sum"] = "SUM";
})(Operation = exports.Operation || (exports.Operation = {}));
var OrderItemSubscriptionPeriodUnit;
(function (OrderItemSubscriptionPeriodUnit) {
    OrderItemSubscriptionPeriodUnit["Day"] = "day";
    OrderItemSubscriptionPeriodUnit["Hour"] = "hour";
    OrderItemSubscriptionPeriodUnit["Minute"] = "minute";
    OrderItemSubscriptionPeriodUnit["Month"] = "month";
    OrderItemSubscriptionPeriodUnit["Week"] = "week";
    OrderItemSubscriptionPeriodUnit["Year"] = "year";
})(OrderItemSubscriptionPeriodUnit = exports.OrderItemSubscriptionPeriodUnit || (exports.OrderItemSubscriptionPeriodUnit = {}));
var OrderSortField;
(function (OrderSortField) {
    OrderSortField["CreatedAt"] = "createdAt";
    OrderSortField["UpdatedAt"] = "updatedAt";
})(OrderSortField = exports.OrderSortField || (exports.OrderSortField = {}));
var Parameter;
(function (Parameter) {
    Parameter["Currency"] = "CURRENCY";
    Parameter["Date"] = "DATE";
    Parameter["Product"] = "PRODUCT";
    Parameter["Value"] = "VALUE";
})(Parameter = exports.Parameter || (exports.Parameter = {}));
var PaymentProvider;
(function (PaymentProvider) {
    PaymentProvider["Cash"] = "cash";
    PaymentProvider["Custom"] = "custom";
    PaymentProvider["Klarna"] = "klarna";
    PaymentProvider["Paypal"] = "paypal";
    PaymentProvider["Stripe"] = "stripe";
})(PaymentProvider = exports.PaymentProvider || (exports.PaymentProvider = {}));
var PipelineSortField;
(function (PipelineSortField) {
    PipelineSortField["CreatedAt"] = "createdAt";
})(PipelineSortField = exports.PipelineSortField || (exports.PipelineSortField = {}));
var ProductSubscriptionHistoryEventType;
(function (ProductSubscriptionHistoryEventType) {
    ProductSubscriptionHistoryEventType["Cancellation"] = "CANCELLATION";
    ProductSubscriptionHistoryEventType["Renewal"] = "RENEWAL";
    ProductSubscriptionHistoryEventType["RenewalDueBroadcast"] = "RENEWAL_DUE_BROADCAST";
})(ProductSubscriptionHistoryEventType = exports.ProductSubscriptionHistoryEventType || (exports.ProductSubscriptionHistoryEventType = {}));
var ProductSubscriptionSortField;
(function (ProductSubscriptionSortField) {
    ProductSubscriptionSortField["UpdatedAt"] = "updatedAt";
})(ProductSubscriptionSortField = exports.ProductSubscriptionSortField || (exports.ProductSubscriptionSortField = {}));
var ShapeType;
(function (ShapeType) {
    ShapeType["Document"] = "document";
    ShapeType["Folder"] = "folder";
    ShapeType["Product"] = "product";
})(ShapeType = exports.ShapeType || (exports.ShapeType = {}));
var SortDirection;
(function (SortDirection) {
    SortDirection["Asc"] = "asc";
    SortDirection["Desc"] = "desc";
})(SortDirection = exports.SortDirection || (exports.SortDirection = {}));
var SubscriptionContractEventSortField;
(function (SubscriptionContractEventSortField) {
    SubscriptionContractEventSortField["Id"] = "_id";
})(SubscriptionContractEventSortField = exports.SubscriptionContractEventSortField || (exports.SubscriptionContractEventSortField = {}));
var SubscriptionContractEventType;
(function (SubscriptionContractEventType) {
    SubscriptionContractEventType["Cancelled"] = "cancelled";
    SubscriptionContractEventType["RenewalDueBroadcast"] = "renewalDueBroadcast";
    SubscriptionContractEventType["Renewed"] = "renewed";
    SubscriptionContractEventType["UsageTracked"] = "usageTracked";
})(SubscriptionContractEventType = exports.SubscriptionContractEventType || (exports.SubscriptionContractEventType = {}));
var SubscriptionContractSortField;
(function (SubscriptionContractSortField) {
    SubscriptionContractSortField["UpdatedAt"] = "updatedAt";
})(SubscriptionContractSortField = exports.SubscriptionContractSortField || (exports.SubscriptionContractSortField = {}));
var SubscriptionPeriodUnit;
(function (SubscriptionPeriodUnit) {
    SubscriptionPeriodUnit["Day"] = "day";
    SubscriptionPeriodUnit["Month"] = "month";
    SubscriptionPeriodUnit["Week"] = "week";
    SubscriptionPeriodUnit["Year"] = "year";
})(SubscriptionPeriodUnit = exports.SubscriptionPeriodUnit || (exports.SubscriptionPeriodUnit = {}));
var SuggestSearchItemType;
(function (SuggestSearchItemType) {
    SuggestSearchItemType["Document"] = "DOCUMENT";
    SuggestSearchItemType["Folder"] = "FOLDER";
    SuggestSearchItemType["Grid"] = "GRID";
    SuggestSearchItemType["Pipeline"] = "PIPELINE";
    SuggestSearchItemType["Product"] = "PRODUCT";
    SuggestSearchItemType["Shape"] = "SHAPE";
    SuggestSearchItemType["Topic"] = "TOPIC";
    SuggestSearchItemType["Webhook"] = "WEBHOOK";
})(SuggestSearchItemType = exports.SuggestSearchItemType || (exports.SuggestSearchItemType = {}));
var TierType;
(function (TierType) {
    TierType["Graduated"] = "graduated";
    TierType["Volume"] = "volume";
})(TierType = exports.TierType || (exports.TierType = {}));
var UserRole;
(function (UserRole) {
    UserRole["TenantAdmin"] = "tenantAdmin";
    UserRole["User"] = "user";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var UserRoles;
(function (UserRoles) {
    UserRoles["TenantAdmin"] = "TenantAdmin";
    UserRoles["User"] = "User";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
var VersionLabel;
(function (VersionLabel) {
    VersionLabel["Current"] = "current";
    VersionLabel["Draft"] = "draft";
    VersionLabel["Published"] = "published";
})(VersionLabel = exports.VersionLabel || (exports.VersionLabel = {}));
