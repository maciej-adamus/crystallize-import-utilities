"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCustomers = void 0;
const build_create_customer_mutation_1 = require("../../graphql/build-create-customer-mutation");
const createCustomer = async (context, customer) => {
    var _a;
    return context.callPIM((0, build_create_customer_mutation_1.buildCreateCustomerMutation)({
        tenantId: context.tenantId,
        identifier: customer.identifier,
        firstName: customer.firstName,
        middleName: customer.middleName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        companyName: customer.companyName,
        addresses: (_a = customer.addresses) === null || _a === void 0 ? void 0 : _a.map((address) => ({
            type: address.type,
            street: address.street,
            street2: address.street2,
            streetNumber: address.streetNumber,
            city: address.city,
            country: address.country,
            state: address.state,
            postalCode: address.postalCode,
        })),
    }));
};
const setCustomers = async ({ spec, onUpdate, context, }) => {
    if (!(spec === null || spec === void 0 ? void 0 : spec.customers)) {
        onUpdate({
            progress: 1,
        });
        return;
    }
    let finished = 0;
    const customers = spec.customers;
    await Promise.all(spec.customers.map(async (customer) => {
        const res = await createCustomer(context, customer);
        onUpdate({
            progress: finished / customers.length,
            message: `customer ${customer.identifier}: ${(res === null || res === void 0 ? void 0 : res.errors) ? 'error' : 'added'}`,
        });
    }));
};
exports.setCustomers = setCustomers;
