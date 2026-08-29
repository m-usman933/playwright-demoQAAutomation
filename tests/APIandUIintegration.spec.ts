import { expect } from "@playwright/test";
import {test} from "../fixtures/loginPageFixture";
import { LoginPage } from "../pages/loginPage";

test.use({
  storageState: { cookies: [], origins: [] }
});
test ("API and UI Integration" , async({testUser,loginPage,page})=>
{
    await loginPage.login(testUser.userData.userName, testUser.userData.password);
    await expect(page).toHaveURL("https://demoqa.com/profile");

    const cookies = await page.context().cookies(); 

    const uiToken = cookies.find(
    cookie => cookie.name === "token"
    )?.value;

    expect(uiToken).toBeTruthy();
    testUser.token = uiToken!;
})