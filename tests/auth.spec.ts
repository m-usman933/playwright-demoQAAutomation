import {test} from "@playwright/test";
import {LoginPage} from "../pages/loginPage";

test("Create authentication state", async ({ browser }) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.login("usman_sar87","Usman@1234");
    await context.storageState({path: 'playwright/.auth/demoQAadmin.json'});
});