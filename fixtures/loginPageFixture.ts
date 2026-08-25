import { test as base } from "./newUser";
import {LoginPage} from "../pages/loginPage"

type MyFixtures ={
    loginPage : LoginPage;
}

export const test = base.extend<MyFixtures>({
    
    loginPage: async ({ page }, use) => 
    {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    }
});