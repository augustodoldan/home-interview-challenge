
const includes = (data_structure, propertyToSearch, valueToSearch) => {

    for (const object of data_structure) {
        const propiedad = object[propertyToSearch];

        if (propiedad?.includes(valueToSearch)) {
            return true;
        }
    }

    return false
}

const notIncludes = (data_structure, propertyToSearch, valueToSearch) => {

    for (const object of data_structure) {
        const propiedad = object[propertyToSearch];

        if (propiedad?.includes(valueToSearch)) {
            return true;
        }
    }

    return false
}




module.exports = {
    validator: {
        includes,
    }
}