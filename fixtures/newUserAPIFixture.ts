import {test as base} from "@playwright/test";
import { createUserData } from "../factories/userFactory";

type MyFixtures ={
    testUser : {
    FirstName: string,
    LastName: string,
    username: string,
    password: string
};

}

export const testRegsiterData = base.extend<MyFixtures>({
    
    testUser: async ({ request }, use) => 
    {
        const userData = createUserData();
        await use(userData);
    }
});