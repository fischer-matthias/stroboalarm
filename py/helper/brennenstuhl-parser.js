module.exports = () => {
    const bParser = {};

    const UNIT_CODES = {
        A: '00101010',
        B: '10001010',
        C: '10100010',
        D: '10101000'
    };

    const STATE_CODES = {
        ON: '10001',
        OFF: '10100'
    }

    bParser.parse = (systemCode, unitCode, state) => {
        const bin = ('' + systemCode) + '0' + ('' + UNIT_CODES[unitCode]) + ('' + STATE_CODES[state]);
        console.log('Binary: ' + bin);
        return toDecimal(bin);
    };

    toDecimal = (binary) => {
        return parseInt(binary, 2);
    }

    return bParser;
}