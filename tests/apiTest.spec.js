const { test, expect } = require("playwright/test");
const { Ajv } = require("ajv")


const ajv = new Ajv()


test('GET Request', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2')
    // console.log(await response.json());

    const body = {
        "id": "2",
    }


    expect(response.status()).toEqual(200)
    expect(response.ok()).toBeTruthy()

    const resBody = await response.json()
    expect(body.id).toEqual('2')

    const valid = ajv.validate(require("./json-schema/get-add-object.schema.json"), resBody);

    if (!valid) {
        console.error("AJV Validation Errors:", ajv.errorsText());
    }

    expect(valid).toBe(true);

       

})


test('POST Request', async ({ request }) => {

    const reqHeaders = {
        Accept: 'application/json'
    }


    const body = {
        "email": "eve.holt@reqres.in",
        "password": "pistol",
    }

    const response = await request.get('https://reqres.in/api/register', {
        headers: reqHeaders,
        data: body,
    })

    expect(response.status()).toEqual(200)
    expect(response.ok()).toBeTruthy()

    const resBody = await response.json()
    expect(body.password).toEqual('pistol')



    const valid = ajv.validate(require("./json-schema/post-add-object.schema.json"), resBody);

    if (!valid) {
        console.error("AJV Validation Errors:", ajv.errorsText());
    }

    expect(valid).toBe(false);

        
})



test('PUT request', async ({ request }) => {
    const response = await request.put('https://reqres.in/api/users/2')

    const putBody = {
        
            "name": "morpheus",
            "job": "zion resident",
        
    }
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toEqual(200)
    expect(response.ok()).toBeTruthy()
    expect(putBody.name).toEqual('morpheus')


    const valid = ajv.validate(require("./json-schema/put-add-object.schema.json"), responseBody);

    if (!valid) {
        console.error("AJV Validation Errors:", ajv.errorsText());
    }

    expect(valid).toBe(false);


})

test('DELETE Request', async ({ request }) => {
    const responseDel = await request.delete('https://reqres.in/api/users/2')
    // console.log(await response.json());

   
    expect(responseDel.status()).toBe(204)
   

    const valid = ajv.validate(require("./json-schema/delete-add-object.schema.json"), responseDel);

    if (!valid) {
        console.error("AJV Validation Errors:", ajv.errorsText());
    }

    expect(valid).toBe(false);

       

})