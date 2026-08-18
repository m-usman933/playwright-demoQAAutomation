import { expect } from "@playwright/test";
import { test } from "../fixtures/newUser";


test("verify USER and API fixture", async ({ userAPI, testUser }) => {
    expect(testUser.userData).toBeTruthy();
    console.log(testUser.userData);

    expect(testUser.userData.password).toBeTruthy();

    const APIResponseJson = await testUser.authenticatedRequest.post(
        'https://demoqa.com/BookStore/v1/Books',
        {
            data :
            {
                userId : testUser.userId,
                collectionOfIsbns: [
                    { isbn: "9781449325862" }
            ]
            } 
        }
    );

    const responseBody = APIResponseJson.json();

    const getBooksInUserAccount = await testUser.authenticatedRequest.get(
        'https://demoqa.com/BookStore/v1/Books',
    )

    const getResponseBody = await getBooksInUserAccount.json();
    console.log("Printing Book Details");
    console.log(getResponseBody);
});