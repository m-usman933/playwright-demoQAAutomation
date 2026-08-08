import { test as base, expect } from "@playwright/test";
import { createUserData, UserData } from "../factories/userFactory";
import { test as apiTest } from "./userFixture";
import { UserApi } from "../APIs/userAPI";

export type MyFixtures = {
    testUser: UserData;
};

export const test = apiTest.extend<MyFixtures>({
    testUser: async ({ userAPI }, use) => {
        let userId: string;
        const userData = createUserData();

        const createUserResponse = await userAPI.createUser(userData);
        const registerResponseBody = await createUserResponse.json();
        userId = registerResponseBody.userID;

        expect(createUserResponse.status()).toBe(201);
        expect(registerResponseBody.username === userData.userName).toBeTruthy();

        const GenerateTokenResponse = await userAPI.generateToken(userData);
        const tokenResponseBody = await GenerateTokenResponse.json();

        const token = tokenResponseBody.token;

        expect(GenerateTokenResponse.status()).toBe(200);
        expect(tokenResponseBody.status).toBe("Success");
        expect(tokenResponseBody.token).toBeTruthy();

        await use(userData);

        if (userId) {
            const deleteResponse = await userAPI.deleteUser(userId, token);
            expect(deleteResponse.status()).toBe(204);
        }
    }
});