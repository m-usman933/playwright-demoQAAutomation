import { expect  } from "@playwright/test";
import { test } from "../fixtures/newUser";
import { validateResponse } from "../Helpers/responseHelper";


test("verify USER and API fixture", async ({ request, testUser }) => {
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

    const isResourceCreated = validateResponse(APIResponseJson, 201);

    const responseBody = await APIResponseJson.json();
    console.log("Following Books added successfully");

    const getBooksInUserAccount = await testUser.authenticatedRequest.get(
        'https://demoqa.com/BookStore/v1/Books',
    )

    const getResponseBody = await getBooksInUserAccount.json();

    console.log("Printing Books Now : ");
    console.log(getResponseBody);

    const isBookAdded = booksToAdd.every(
        (book)=>
        getResponseBody.books.some(
                (returnedBook: any) => returnedBook.isbn === book.isbn
        )
        
    );

    
    console.log("Printing Book Details");
   // console.log(getResponseBody.books);
    expect(getResponseBody.books).toBeDefined();
    expect(Array.isArray(getResponseBody.books)).toBe(true);

    const bookHasIsbn = getResponseBody.books.every(
        (book : any) =>
            book.isbn !== undefined
    )

    expect(bookHasIsbn).toBeTruthy();

    const everyBookHasStringIsbn = getResponseBody.books.every(
    (book: any) =>
         typeof book.isbn === "string"
    );

    
});