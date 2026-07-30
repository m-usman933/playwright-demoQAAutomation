import {test, expect} from "@playwright/test";
import {LoginPage} from  "../pages/loginPage";

test("login to demoQA", async({page})=>
{
    const loginpage = new LoginPage(page);
    await loginpage.navigateToLoginPage();
    await loginpage.login('usman_sar87', 'Usman@1234');
    
    await expect(page).toHaveURL('https://demoqa.com/profile');
    await page.getByText('Elements').click();
    await page.locator('[href="/checkbox"]').click();

    await page.getByRole('checkbox',{name :'Select Home'}).check();
    await page.waitForTimeout(5000);
})
