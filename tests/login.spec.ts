import {expect , Browser} from "@playwright/test";
import { test } from "../fixtures/loginPageFixture";
import {LoginPage} from  "../pages/loginPage";

test("Valid login to demoQA", async({loginPage, page})=>
{
    await page.goto('/profile');
    await expect(page).toHaveURL('https://demoqa.com/profile');
    await page.getByText('Elements').click();
    await page.locator('[href="/checkbox"]').click();

    await page.getByRole('checkbox',{name :'Select Home'}).check();
    //await page.waitForTimeout(5000);
})
