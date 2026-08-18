import { expect } from "@playwright/test";
import { test } from "../fixtures/newUser";


test("verify USER and API fixture", async ({ userAPI, testUser }) => {
    const booksToAdd = [
    { isbn: "9781449325862" },
    { isbn: "9781491950357" },
    { isbn: "9781593275846" }
];
    expect(testUser.userData).toBeTruthy();
    console.log(testUser.userData);

    expect(testUser.userData.password).toBeTruthy();

    const APIResponseJson = await testUser.authenticatedRequest.post(
        'https://demoqa.com/BookStore/v1/Books',
        {
            data :
            {
                userId : testUser.userId,
                collectionOfIsbns: booksToAdd,
            } 
        }
    );

    expect(APIResponseJson.status()).toBe(201);
    const responseBody = APIResponseJson.json();

    const getBooksInUserAccount = await testUser.authenticatedRequest.get(
        'https://demoqa.com/BookStore/v1/Books',
    )

    const getResponseBody = await getBooksInUserAccount.json();

    for (const book of booksToAdd) {
    const foundBook = getResponseBody.books.find(
        (returnedBook: any) => returnedBook.isbn === book.isbn
    );

    expect(foundBook).toBeTruthy();
}
    
    console.log("Printing Book Details");
    console.log(getResponseBody);
});