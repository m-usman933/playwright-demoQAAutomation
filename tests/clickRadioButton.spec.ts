import {test, Browser, expect} from "@playwright/test"

test("Click Radio button", async({ page })=>
{
    await page.goto("https://demoqa.com/profile");
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();

    await page.getByText('Elements').click();
    await page.locator('[href="/radio-button"]').click();

    await page.locator('#yesRadio').click();
    await page.locator('#impressiveRadio').click();
    //await page.locator('#noRadio').click();
    await page.waitForTimeout(5000);
}) 