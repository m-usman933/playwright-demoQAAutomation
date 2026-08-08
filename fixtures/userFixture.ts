import {test as base } from "@playwright/test";
import { UserApi } from "../APIs/userAPI";

export type ApiFixtures = {
    userAPI: UserApi;
};

export const test = base.extend<ApiFixtures>({
    userAPI: async ({ request }, use) => {
        const userapi = new UserApi(request);
        await use(userapi);
    }
});