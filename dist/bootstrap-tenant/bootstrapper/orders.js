"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOrders = void 0;
const build_create_order_mutation_1 = require("../../graphql/build-create-order-mutation");
const createOrder = async (context, { customer, cart, total }) => {
    var _a;
    return context.callOrders((0, build_create_order_mutation_1.buildCreateOrderMutation)({
        customer: {
            identifier: customer.identifier,
            firstName: customer.firstName,
            lastName: customer.lastName,
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
        },
        cart: cart.map(({ name, price, productId, productVariantId, sku, quantity }) => ({
            name,
            productId,
            productVariantId,
            sku,
            quantity,
            price: price && {
                currency: price.currency,
                gross: price.gross,
                net: price.net,
                // tax: { }
            },
        })),
        total,
    }));
};
const setOrders = async ({ spec, onUpdate, context, }) => {
    if (!(spec === null || spec === void 0 ? void 0 : spec.orders)) {
        onUpdate({
            progress: 1,
        });
        return;
    }
    let finished = 0;
    const orders = spec.orders;
    await Promise.all(spec.orders.map(async (order) => {
        var _a, _b, _c;
        const res = await createOrder(context, order);
        // Store the created id
        order.id = (_c = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.orders) === null || _b === void 0 ? void 0 : _b.create) === null || _c === void 0 ? void 0 : _c.id;
        onUpdate({
            progress: finished / orders.length,
            message: `order: ${(res === null || res === void 0 ? void 0 : res.errors) ? 'error' : 'added'}`,
        });
    }));
};
exports.setOrders = setOrders;
