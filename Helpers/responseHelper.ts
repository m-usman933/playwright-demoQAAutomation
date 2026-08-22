import { APIResponse } from "@playwright/test";

export function validateResponse(response : APIResponse , expectedStatus : number) : boolean
{
    if (response.status() === expectedStatus)
        return true;

    return false;
}