import { APIRequestContext } from "@playwright/test";
import { UserData } from "../factories/userFactory";

export class UserApi
{
    constructor(private request : APIRequestContext){};
    
    async createUser(userInfomation:UserData)
    {
         const response = await this.request.post
        (
            'https://demoqa.com/Account/v1/User',
            {
                data : userInfomation,
            }
        )
        return response;
    }

    async generateToken(userInfomation : UserData)
    {
        const GenerateTokenResponse = await this.request.post(
        "https://demoqa.com/Account/v1/GenerateToken",
        {
            data: userInfomation,
        });
        return GenerateTokenResponse;
    }

    async deleteUser(userId : string , token : any)
    {
        const deletionResponse = await this.request.delete(
            `https://demoqa.com/Account/v1/User/${userId}`,
                {
                    headers:{
                    Authorization : `Bearer ${token}`,
                }
            });
        return deletionResponse;
    }
}
