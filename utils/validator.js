module.exports = {
    validator: {
        includes: (value, input, values) => {
            return values.includes(value);
        },
        notIncludes: (value, input, values) => {
            return !values.includes(value);
        },
    },
};