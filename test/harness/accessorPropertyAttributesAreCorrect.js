//-----------------------------------------------------------------------------
//Verify all attributes specified accessor property of given object:
//get, set, enumerable, configurable
//If all attribute values are expected, return true, otherwise, return false

function isConfigurable(obj, name) {
    try {
        delete obj[name];
    } catch (de) {
        if (!de instanceof TypeError)
            $ERROR("Expected TypeError, got " + de);
    }
    // return: did delete succeed?
    return !obj.hasOwnProperty(name);
}

function isEnumerable(obj, name) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop) && prop === name) {
            return true;
        }
    }

    return false;
}

function accessorPropertyAttributesAreCorrect(obj,
                                              name,
                                              get,
                                              set,
                                              setVerifyHelpProp,
                                              enumerable,
                                              configurable) {
    var attributesCorrect = true;

    if (get !== undefined) {
        if (obj[name] !== get()) {
            if (typeof obj[name] === "number" &&
                isNaN(obj[name]) &&
                typeof get() === "number" &&
                isNaN(get())) {
                // keep empty
            } else {
                attributesCorrect = false;
            }
        }
    } else {
        if (obj[name] !== undefined) {
            attributesCorrect = false;
        }
    }

    try {
        var desc = Object.getOwnPropertyDescriptor(obj, name);
        if (typeof desc.set === "undefined") {
            if (typeof set !== "undefined") {
                attributesCorrect = false;
            }
        } else {
            obj[name] = "toBeSetValue";
            if (obj[setVerifyHelpProp] !== "toBeSetValue") {
                attributesCorrect = false;
            }
        }
    } catch (se) {
        if (!se instanceof TypeError)
            throw se;
    }


    if (enumerable !== isEnumerable(obj, name)) {
        attributesCorrect = false;
    }

    if (configurable !== isConfigurable(obj, name)) {
        attributesCorrect = false;
    }

    return attributesCorrect;
}
