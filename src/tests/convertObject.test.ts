// this function standardizes all values sent to the API into strings to prevent type errors
export function convertObjectValuesToString(inputObj: any): any {
    const keys = Object.keys(inputObj);
    const output: any = {};
    for (let x of keys) {
        if (Array.isArray(inputObj[x])) {
            const array: any[] = [];

            for (let y in inputObj[x]) {
                array.push(convertObjectValuesToString(inputObj[x][y]));
            }

            output[x] = array;
        }
        else if (typeof inputObj[x] === 'object') {
            output[x] = convertObjectValuesToString(inputObj[x]);
        } else if (typeof inputObj[x] === 'number' || typeof inputObj[x] === 'bigint') {
            output[x] = String(inputObj[x]);
        } else {
            output[x] = inputObj[x];
        }
    }

    return output;
}

describe('convertObjectValuesToString', () => {
    it('handles Permit2', () => {
        const badRequest = `{
                "chainId": "0x1",
                "domain": {
                    "chainId": "1",
                    "name": "Permit2",
                    "verifyingContract": "0xasdf"
                },
                "id": "",
                "message": {
                    "details": [
                        {
                            "amount": "1461501637330902918203684832716283019655932542975",
                            "expiration": 1684323541,
                            "nonce": 0,
                            "token": "0xdac17f958d2ee523a2206206994597c13d831ec7"
                        }
                    ],
                    "sigDeadline": "1684323541",
                    "spender": "0x98765"
                },
                "method": "eth_signTypedData_v4",
                "origin": "",
                "primaryType": "PermitBatch",
                "signer": "0x12345"
            }`;

        const expected = `{
                "chainId": "0x1",
                "domain": {
                    "chainId": "1",
                    "name": "Permit2",
                    "verifyingContract": "0xasdf"
                },
                "id": "",
                "message": {
                    "details": [
                        {
                            "amount": "1461501637330902918203684832716283019655932542975",
                            "expiration": "1684323541",
                            "nonce": "0",
                            "token": "0xdac17f958d2ee523a2206206994597c13d831ec7"
                        }
                    ],
                    "sigDeadline": "1684323541",
                    "spender": "0x98765"
                },
                "method": "eth_signTypedData_v4",
                "origin": "",
                "primaryType": "PermitBatch",
                "signer": "0x12345"
            }`


        const testObj = JSON.parse(badRequest);
        const output = convertObjectValuesToString(testObj);
        const expectedObj = JSON.parse(expected);

        expect(expectedObj).toEqual(output);
    });
});