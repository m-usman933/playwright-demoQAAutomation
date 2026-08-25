import {
    test as base,
    expect,
    request as playwrightRequest,
    APIRequestContext
} from "@playwright/test";

import { createUserData, UserData } from "../factories/userFactory";
import { test as apiTest } from "./createAPIRequest";

export type MyFixtures = {
    testUser: {
        userId: string;
        userData: UserData;
        authenticatedRequest: APIRequestContext;
        token: string;
    };
};

export const test = apiTest.extend<MyFixtures>({
    testUser: async ({ userAPI }, use) => {
        let userId: string;
        const userData = createUserData();

        const createUserResponse = await userAPI.createUser(userData);
        const registerResponseBody = await createUserResponse.json();

        userId = registerResponseBody.userID;

        expect(createUserResponse.status()).toBe(201);

        const generateTokenResponse = await userAPI.generateToken(userData);
        const tokenResponseBody = await generateTokenResponse.json();
        const token = tokenResponseBody.token;

        expect(token).toBeTruthy();

        const authenticatedRequest = await playwrightRequest.newContext({
            extraHTTPHeaders: {
                Authorization: `Bearer ${token}`
            }
        });

        const newAuthUser = {
            userId,
            userData,
            authenticatedRequest,
            token
        };

        await use(newAuthUser);

        if (userId) {
            const deleteResponse = await userAPI.deleteUser(
                userId,
                newAuthUser.token
            );

            console.log("Delete status:", deleteResponse.status());
            console.log("Delete body:", await deleteResponse.text());
        }
    }
});