function createObject(object) {
    const preparedObject = {};

    for (const key in object) {
        preparedObject[key] = {
            'decimal': object[key],
            'binary': object[key].toString(2)
        };
    }

    return preparedObject;
}

function addOffs(object) {
    const objWithOffs = {};
    
    for (const key in object) {
        objWithOffs[key + ':on'] = object[key];
        objWithOffs[key + ':of'] = object[key] + 3;
    }

    return objWithOffs;
}

function formatObject(object, length) {
    for (const key in object) {
        object[key]['binaryFormatted'] = object[key]['binary'].padStart(length, '0');
    }

    return object;
}

function findLength(values) {
    let length = 0;

    for(const key in values) {
        length = (values[key]['binary'].length > length ? values[key]['binary'].length : length);
    }

    return 23;
}

function renderObject(object) {
    for (const key in object) {
        const bin = object[key]['binaryFormatted'];
        console.log(key + ': ' + bin.substring(0, 9) + ' ' + bin.substring(9, 10) + ' ' + bin.substring(10, 18) + ' ' + bin.substring(18));
    }
}

function filterData(obj, str) {
    const filteredOject = {};

    for (const key in obj) {
        if (key.indexOf(str) > -1) {
            filteredOject[key] = obj[key];
        }
    }

    return filteredOject;
}

let values = {
    // 00000
    '00000:a': 1361,
    '00000:b': 4433,
    '00000:c': 5201,
    '00000:d': 5393,

    // 10000
    '10000:a': 4195665,
    '10000:b': 4198737,
    '10000:c': 4199505,
    '10000:d': 4199697,

    // 01000
    '01000:a': 1049937,
    '01000:b': 1053009,
    '01000:c': 1053777,
    '01000:d': 1053969,

    // 00100
    '00100:a': 263505,
    '00100:b': 266577,
    '00100:c': 267345,
    '00100:d': 267537,

    // 00010
    '00010:a': 66897,
    '00010:b': 69969,
    '00010:c': 70737,
    '00010:d': 70929,

    // 00001
    '00001:a': 17745,
    '00001:b': 20817,
    '00001:c': 21585,
    '00001:d': 21777,
};



let allObject = createObject(addOffs(values));
allObject = formatObject(allObject, findLength(allObject));

// console.log('ALL:');
// renderObject(allObject);

console.log('\nA:');
renderObject(filterData(allObject, ':a'));

console.log('\nB:');
renderObject(filterData(allObject, ':b'));

console.log('\nC:');
renderObject(filterData(allObject, ':c'));

console.log('\nD:');
renderObject(filterData(allObject, ':d'));