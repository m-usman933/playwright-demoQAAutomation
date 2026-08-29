import {test} from "@playwright/test";
import {LoginPage} from "../pages/loginPage";

test("Create authentication state", async ({ browser }) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.login(
    process.env.ADMIN_USERNAME!,
    process.env.ADMIN_PASSWORD!
);
    await context.storageState({path: 'playwright/.auth/demoQAadmin.json'});
});