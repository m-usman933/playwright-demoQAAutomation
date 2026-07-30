import{test, expect, Browser, Page} from "@playwright/test"
import { webkit, chromium,firefox } from "@playwright/test"
import {RegisterPage} from "../pages/registerPage"

let registerPage: RegisterPage;
function generatePassword(length: number): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";

    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
}
test.beforeEach(async ({page})=>{
    registerPage = new RegisterPage(page);
    await registerPage.navigateToRegisterPage();
})
 test('Register New User', async({page})=>
{
    const password : string = generatePassword(8);
    //here I am on the Register page
    await registerPage.registerUser('Muhammad','Usman','usman_sar231', password);
 });

 test.afterEach(async ({ page }) => {
    //Playwright does it automatically, adding just for Experiment
    await page.close();
});