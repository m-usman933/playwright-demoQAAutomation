import { expect } from "@playwright/test";
import { test } from "../fixtures/newUser";


test("verify USER and API fixture", async ({ userAPI, testUser }) => {
    expect(testUser.userName).toBeTruthy();
    expect(testUser.password).toBeTruthy();
});