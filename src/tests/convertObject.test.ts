// TODO: Make sure this matches what is in injectWalletGuard.tsx. For some reason I can't get tests to run when importing from that file
function convertObjectValuesToString(inputObj: any): any {
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
        else if (inputObj[x] === null) {
            output[x] = null;
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
    it('handles normal transaction', () => {
        const request = `
        {
                "chainId": "0x1",
                "id": "123",
                "method": "eth_sendTransaction",
                "origin": "",
                "signer": "0x12345",
                "transaction": {
                    "data": "0xasdf",
                    "from": "0x12345",
                    "gas": "0x91755",
                    "gasPrice": "0x8sa41",
                    "to": "0x56789"
                }
        }`;

        const expected = `
        {
                "chainId": "0x1",
                "id": "123",
                "method": "eth_sendTransaction",
                "origin": "",
                "signer": "0x12345",
                "transaction": {
                    "data": "0xasdf",
                    "from": "0x12345",
                    "gas": "0x91755",
                    "gasPrice": "0x8sa41",
                    "to": "0x56789"
                }
        }`;

        const requestObj = JSON.parse(request);
        const output = convertObjectValuesToString(requestObj);
        const expectedObj = JSON.parse(expected);

        expect(expectedObj).toEqual(output);
    });

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
            }`;


        const testObj = JSON.parse(badRequest);
        const output = convertObjectValuesToString(testObj);
        const expectedObj = JSON.parse(expected);

        expect(expectedObj).toEqual(output);
    });

    it('handles Seaport OpenComponents', () => {
        const badRequest = `{
                "chainId": "0x89",
                "domain": {
                    "chainId": "137",
                    "name": "Seaport",
                    "verifyingContract": "0x00000000000000adc04c56bf30ac9d3c0aaf14dc",
                    "version": "1.5"
                },
                "id": "",
                "message": {
                    "conduitKey": "0x0000001",
                    "consideration": [
                        {
                            "endAmount": "875000000000000000",
                            "identifierOrCriteria": "0",
                            "itemType": 0,
                            "recipient": "0x12345",
                            "startAmount": "875000000000000000",
                            "token": "0x0000000000000000000000000000000000000000"
                        },
                        {
                            "endAmount": "100000000000000000",
                            "identifierOrCriteria": "0",
                            "itemType": 0,
                            "recipient": "0x67890",
                            "startAmount": "100000000000000000",
                            "token": "0x0000000000000000000000000000000000000000"
                        },
                        {
                            "endAmount": "25000000000000000",
                            "identifierOrCriteria": "0",
                            "itemType": 0,
                            "recipient": "0x00001",
                            "startAmount": "25000000000000000",
                            "token": "0x0000000000000000000000000000000000000000"
                        }
                    ],
                    "counter": "0",
                    "endTime": "1686403247",
                    "offer": [
                        {
                            "endAmount": 1,
                            "identifierOrCriteria": "1408",
                            "itemType": 2,
                            "startAmount": 1,
                            "token": "0x980341uf093j410"
                        }
                    ],
                    "offerer": "0x12345",
                    "orderType": "0",
                    "salt": "5158915845115",
                    "startTime": "1685798447",
                    "totalOriginalConsiderationItems": "3",
                    "zone": "0x0000000000000000000000000000000000000000",
                    "zoneHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
                },
                "method": "eth_signTypedData_v4",
                "origin": "",
                "primaryType": "OrderComponents",
                "signer": "0x12345"
            }`;

        const expected = `{
                "chainId": "0x89",
                "domain": {
                    "chainId": "137",
                    "name": "Seaport",
                    "verifyingContract": "0x00000000000000adc04c56bf30ac9d3c0aaf14dc",
                    "version": "1.5"
                },
                "id": "",
                "message": {
                    "conduitKey": "0x0000001",
                    "consideration": [
                        {
                            "endAmount": "875000000000000000",
                            "identifierOrCriteria": "0",
                            "itemType": "0",
                            "recipient": "0x12345",
                            "startAmount": "875000000000000000",
                            "token": "0x0000000000000000000000000000000000000000"
                        },
                        {
                            "endAmount": "100000000000000000",
                            "identifierOrCriteria": "0",
                            "itemType": "0",
                            "recipient": "0x67890",
                            "startAmount": "100000000000000000",
                            "token": "0x0000000000000000000000000000000000000000"
                        },
                        {
                            "endAmount": "25000000000000000",
                            "identifierOrCriteria": "0",
                            "itemType": "0",
                            "recipient": "0x00001",
                            "startAmount": "25000000000000000",
                            "token": "0x0000000000000000000000000000000000000000"
                        }
                    ],
                    "counter": "0",
                    "endTime": "1686403247",
                    "offer": [
                        {
                            "endAmount": "1",
                            "identifierOrCriteria": "1408",
                            "itemType": "2",
                            "startAmount": "1",
                            "token": "0x980341uf093j410"
                        }
                    ],
                    "offerer": "0x12345",
                    "orderType": "0",
                    "salt": "5158915845115",
                    "startTime": "1685798447",
                    "totalOriginalConsiderationItems": "3",
                    "zone": "0x0000000000000000000000000000000000000000",
                    "zoneHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
                },
                "method": "eth_signTypedData_v4",
                "origin": "",
                "primaryType": "OrderComponents",
                "signer": "0x12345"
            }`;


        const testObj = JSON.parse(badRequest);
        const output = convertObjectValuesToString(testObj);
        const expectedObj = JSON.parse(expected);

        expect(expectedObj).toEqual(output);
    });
});