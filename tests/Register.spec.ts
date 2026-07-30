import{test, expect, Browser, Page} from "@playwright/test"
import { webkit, chromium,firefox } from "@playwright/test"
import {RegisterPage} from "../pages/registerPage"


function generatePassword(length: number): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";

    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
}
 test('Register New User', async({page})=>
{
    const password : string = generatePassword(8);
    await page.goto("https://demoqa.com/");
    await page.getByText('Book Store Application').scrollIntoViewIfNeeded();
    await page.getByText('Book Store Application').click();
    await expect(page).toHaveURL('https://demoqa.com/books');
    await page.locator('#login').click();

    await expect(page).toHaveURL('https://demoqa.com/login');
    await page.locator('#newUser').click();
    
    //here I am on the Register page

    const registerPage = new RegisterPage(page);
    await registerPage.registerUser('Muhammad','Usman','usman_sar231', password);
    await page.waitForTimeout(5000);
 });