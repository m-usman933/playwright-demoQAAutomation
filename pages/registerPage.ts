import {Page, Locator} from "@playwright/test";

export class RegisterPage
{
    private readonly firstname : Locator;
    private readonly lastname : Locator;
    private readonly username : Locator;
    private readonly password : Locator;
    private readonly registerButton : Locator;

    constructor(private page : Page)
    {
        this.firstname = page.locator('#firstname');
        this.lastname = page.locator('#lastname');
        this.username = page.locator('#userName');
        this.password = page.locator('#password');
        this.registerButton = page.locator('#register');
    }

    async navigateToRegisterPage()
    {
        await this.page.goto("https://demoqa.com/register");
    }
    async setFirstName(name : string)
    {
        await this.firstname.fill(name);
    }
    async setLastName(LastName: string)
    {
        await this.lastname.fill(LastName);
    }
    async setUserName(UserName : string)
    {
        await this.username.fill(UserName);
    }
    async setPassword(Password : string)
    {
        await this.password.fill(Password);
    }
    async clickRegisterButton()
    {
        await this.registerButton.click();
    }

    async registerUser(firstname : string , lastname : string , username : string, password: string)
    {
        await this.setFirstName(firstname);
        await this.setLastName(lastname);
        await this.setUserName(username);
        await this.setPassword(password);
        await this.clickRegisterButton();
    }

}