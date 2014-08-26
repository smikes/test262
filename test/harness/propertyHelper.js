//-----------------------------------------------------------------------------
//Verify all attributes specified accessor property of given object:
//get, set, enumerable, configurable
//If all attribute values are expected, return true, otherwise, return false

function isConfigurable(obj, name) {
    try {
        delete obj[name];
    } catch (e) {
        if (!e instanceof TypeError) {
            $ERROR("Expected TypeError, got " + e);
        }
    }
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

function isEqualTo(obj, name, expectedValue) {
    var actualValue = obj[name];

    if(actualValue === expectedValue ||
       (typeof actualValue === "number" &&
        typeof expectedValue === "number" &&
        isNaN(actualValue) && isNaN(expectedValue)))
        return true;

    return false;
}

function isWritable(obj, name, verifyProp) {
    var newValue = "unlikelyValue";

    try {
        obj[name] = newValue;
    } catch (e) {
        if (!e instanceof TypeError) {
            $ERROR("Expected TypeError, got " + e);
        }
    }

    if ((verifyProp && isEqualTo(obj, verifyProp, newValue)) ||
        isEqualTo(obj, name, newValue)) {
        return true;
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
    var prop = 'obj["' + name + '"]';

    if (get !== undefined) {
        var value = get();
        if (!isEqualTo(obj, name, value)) {
            $ERROR("Expected " + prop + " to equal " + value +
                   ", actually " + obj[name]);
        }
    }

    if ((typeof set !== "undefined") && setVerifyHelpProp) {
        if (!isWritable(obj, name, setVerifyHelpProp)) {
            $ERROR("Expected writes to " + prop + " to set " + setVerifyHelpProp +
                   ", but did not.");
        }
    }

    if (enumerable !== isEnumerable(obj, name)) {
        $ERROR("Expected " + prop + ".[[Enumerable]] to be " +
               enumerable + ", actually " + !enumerable);
    }

    if (configurable !== isConfigurable(obj, name)) {
        $ERROR("Expected " + prop + ".[[Configurable]] to be " +
               configurable + ", actually " + !configurable);
    }

    return attributesCorrect;
}

//-----------------------------------------------------------------------------
//Verify all attributes specified data property of given object:
//value, writable, enumerable, configurable
//If all attribute values are expected, return true, otherwise, return false
function dataPropertyAttributesAreCorrect(obj,
                                          name,
                                          value,
                                          writable,
                                          enumerable,
                                          configurable) {
    var attributesCorrect = true;
    var prop = 'obj["' + name + '"]';

    if (!isEqualTo(obj, name, value)) {
        $ERROR("Expected " + prop + " to equal " + value +
               ", actually " + obj[name]);
    }

    if (writable != isWritable(obj, name)) {
        $ERROR("Expected " + prop + ".[[Writable]] to be " +
               writable + ", actually " + !writable);
    }

    if(enumerable !== isEnumerable(obj, name)) {
        $ERROR("Expected " + prop + ".[[Enumerable]] to be " +
               enumerable + ", actually " + !enumerable);
    }


    if (configurable !== isConfigurable(obj, name)) {
        $ERROR("Expected " + prop + ".[[Configurable]] to be " +
               configurable + ", actually " + !configurable);
    }

    return attributesCorrect;
}
