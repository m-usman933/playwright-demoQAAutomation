import { test as base, expect, request as playwrightRequest , APIRequestContext} from "@playwright/test";
import { createUserData, UserData } from "../factories/userFactory";
import { test as apiTest } from "./createAPIRequest";
import { UserApi } from "../APIs/userAPI";

export type MyFixtures = {
    testUser:{
        userData: UserData;
        authenticatedRequest: APIRequestContext;
    }
    
};

export const test = apiTest.extend<MyFixtures>({
    testUser: async ({ userAPI , request }, use) => {
        let userId: string;
        const userData = createUserData();

        const createUserResponse = await userAPI.createUser(userData);
        const registerResponseBody = await createUserResponse.json();
        userId = registerResponseBody.userID;

        expect(createUserResponse.status()).toBe(201);

        const GenerateTokenResponse = await userAPI.generateToken(userData);
        const tokenResponseBody = await GenerateTokenResponse.json();
        const token = tokenResponseBody.token;


        expect(tokenResponseBody.token).toBeTruthy();

        const authenticatedRequest = await playwrightRequest.newContext({
        extraHTTPHeaders: {
            Authorization: `Bearer ${token}`
        }
});
        const newAuthUser = {
            userData,
            authenticatedRequest,
        }

        await use(newAuthUser);

        if (userId) {
            const deleteResponse = await userAPI.deleteUser(userId, token);
            expect(deleteResponse.status()).toBe(204);
        }
    }
});