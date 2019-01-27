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
        const bin = ('' + prepareSystemCode(systemCode)) + ('' + UNIT_CODES[unitCode]) + ('' + STATE_CODES[state]);
        console.log('Binary: ' + bin);
        return toDecimal(bin);
    };

    prepareSystemCode = (systemCode) => {

        let preparedSystemCode = '';
        for (var i = 0; i < systemCode.length; i++) {
            preparedSystemCode +=  inverseChar(systemCode.charAt(i)) + '0';
        }

        return preparedSystemCode;
    }

    inverseChar = (char) => {
        return char === '0' ? '1' : '0';
    }

    toDecimal = (binary) => {
        return parseInt(binary, 2);
    }

    return bParser;
}