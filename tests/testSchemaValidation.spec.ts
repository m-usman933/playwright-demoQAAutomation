import { expect  } from "@playwright/test";
import { test } from "../fixtures/newUser";
import { schemaValidation } from "../Helpers/responseHelper";

test("Scheme validation", async({testUser}) =>
{
    const getBooksInUserAccount = await testUser.authenticatedRequest.get(
        'https://demoqa.com/BookStore/v1/Books',
    )

    const getResponse = await getBooksInUserAccount.json();
    console.log(getResponse);
    if(await schemaValidation(getBooksInUserAccount))
    {
        console.log("Schema Matched")
    }

    return null;
})