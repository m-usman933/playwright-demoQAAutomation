import {test as base , expect} from "@playwright/test";
import { createUserData, UserData } from "../factories/userFactory";

export type MyFixtures ={
    testUser : UserData
}

export const test = base.extend<MyFixtures>({
    
    testUser: async ({ request }, use) => 
    {
        let userId : number;
        const userData = createUserData();

        const response = await request.post(
            'https://demoqa.com/Account/v1/User',
            {
                data : userData
            }
        )
        const responseBody = await response.json();
        userId = responseBody.userID;
        
        expect(response.status()).toBe(201);
        expect(responseBody.username === userData.userName).toBeTruthy();

        const GenerateTokenResponse = await request.post(
        "https://demoqa.com/Account/v1/GenerateToken",
        {
            data: {
            userName: userData.userName,
            password: userData.password,
        }
        }
    );

        const body = await GenerateTokenResponse.json();
        const token = body.token;

        expect(GenerateTokenResponse.status()).toBe(200);
        expect(body.status).toBe("Success");
        expect(body.token).toBeTruthy();

        await use(userData);

        if(userId)
        {

            const deleteResponse = await request.delete(
                `https://demoqa.com/Account/v1/User/${userId}`,
                {
                    headers:{
                    Authorization : `Bearer ${token}`,
                }
                }
                
            )
            expect(deleteResponse.status()).toBe(200);
           
        }
    }
});