import { expect } from "@playwright/test";
import { test } from "../fixtures/newUser";


test("verify USER and API fixture", async ({ userAPI, testUser }) => {
    const booksToAdd = [
    { isbn: "9781449325862" },
    { isbn: "9781449331818" },
    { isbn: "9781593275846" }
];
    console.log(typeof(booksToAdd));

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
    const responseBody = await APIResponseJson.json();
    console.log("Following Books added successfully");
    console.log(responseBody);

    const getBooksInUserAccount = await testUser.authenticatedRequest.get(
        'https://demoqa.com/BookStore/v1/Books',
    )

    const getResponseBody = await getBooksInUserAccount.json();

    const isBookAdded = booksToAdd.every(
        (book)=>
        getResponseBody.books.find(
                (returnedBook: any) => returnedBook.isbn === book.isbn
        ) !== undefined
        
    );

    console.log("Prinitng comparison output :" + isBookAdded);
    expect(isBookAdded).toBeTruthy();
    
    console.log("Printing Book Details");
    console.log(getResponseBody);
});