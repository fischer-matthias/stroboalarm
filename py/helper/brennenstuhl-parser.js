module.exports = () => {
    const bParser = {};

    bParser.parse = (systemCode, unitCode, state) => {
        return toDecimal(('' + systemCode) + ('' + unitCode) + ('' + state) + inverse(('' + state)));
    };

    toDecimal = (binary) => {
        return parseInt(binary, 2);
    }

    inverse = (binary) => {
        
        let inv = '';
        for (const letter of binary) {
            inv += (letter === '0' ? '1' : '0');
        }

        return inv;
    }

    return bParser;
}