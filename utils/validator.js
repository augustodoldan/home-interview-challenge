
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
    //@TODO ESTE MÉTODO HAY QUE REVERLO.
    for (const object of data_structure) {
        const propiedad = object[propertyToSearch];
        if (propiedad?.includes(valueToSearch)) {
            return false;
        }
    }

    return true;

}

const same = (valueToSearch, valueToCompare) => {

    if (valueToSearch === valueToCompare) {
        return true;
    }
    return false;
};




module.exports = {
    validator: {
        includes,
        notIncludes,
        same
    }
}