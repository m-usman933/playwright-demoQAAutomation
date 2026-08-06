import {test as base , expect} from "@playwright/test";
import { createUserData, UserData } from "../factories/userFactory";
import { UserApi } from "../APIs/userAPI";

export type MyFixtures ={
    testUser : UserData;
    userAPI : UserApi;
}

export const test = base.extend<MyFixtures>({
    userAPI : async ({ request } , use) =>
    {
        const userapi = new UserApi(request);

        await use(userapi);
    }
})