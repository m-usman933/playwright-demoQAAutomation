import {test as base , expect} from "@playwright/test";
import { createUserData, UserData } from "../factories/userFactory";
import { UserApi } from "../APIs/userAPI";

export type MyFixtures ={
    testUser : UserData
}
export const test = base.extend<MyFixtures>({
    
    testUser: async ({ request }, use) => 
    {
        const userApi = new UserApi(request);
        let userId : number;
        const userData = createUserData();

        const createUserResponse = await userApi.createUser(userData);
        const registerResponseBody = await createUserResponse.json();
        userId = registerResponseBody.userID;
        
        expect(createUserResponse.status()).toBe(201);
        expect(registerResponseBody.username === userData.userName).toBeTruthy();

        const GenerateTokenResponse = await userApi.generateToken(userData);
        const tokenResponseBody = await GenerateTokenResponse.json();

        const token = tokenResponseBody.token;

        expect(GenerateTokenResponse.status()).toBe(200);
        expect(tokenResponseBody.status).toBe("Success");
        expect(tokenResponseBody.token).toBeTruthy();

        await use(userData);
        if(userId)
        {
            const deleteResponse = await userApi.deleteUser(userId,token);
            expect(deleteResponse.status()).toBe(204);
           
        }
    }
});