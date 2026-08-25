import { expect } from "@playwright/test";
import {test} from "../fixtures/newUser";
import { LoginPage } from "../pages/loginPage";

test ("API and UI Integration" , async({testUser})=>
{
    console.log(testUser.userData.userName);
})