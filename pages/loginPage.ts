import {Page, Locator,expect} from "@playwright/test";

export class LoginPage
{
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly loginbutton : Locator;

    constructor(private page : Page)
    {
        this.username = page.locator('#userName');
        this.password = page.locator('#password');
        this.loginbutton=page.locator('#login');
    }

    async navigateToLoginPage()
    {
        await this.page.goto('https://demoqa.com/login');
    }

    async enterUsername(username: string) 
    {
        await this.username.fill(username);
    }

    async enterPassword(password: string)
    {
        await this.password.fill(password);
    }

    async clickLogin()
    {
        await this.loginbutton.click();
    }

    async login(username: string, password: string)
    {
        await this.navigateToLoginPage();
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();

        await expect(this.page.getByRole("button", { name: "Logout" })).toBeVisible();
    }
}