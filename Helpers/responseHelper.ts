import { APIResponse } from "@playwright/test";
import { z } from "zod";

export function validateResponse(response : APIResponse , expectedStatus : number) : boolean
{
    if (response.status() === expectedStatus)
        return true;

    return false;
}

export async function schemaValidation(response : APIResponse)
{
    const responseSchema = z.object({
    books: z.array(
        z.object({
            isbn: z.string(),
            title: z.string(),
            subTitle: z.string(),
            author: z.string(),
            publish_date: z.string(),
            publisher: z.string(),
            pages: z.number(),
            description: z.string(),
            website: z.string(),
        })
    )
});
    
    const parsedResponse = await response.json();

    const result=responseSchema.safeParse(parsedResponse);

    if (result.success)
    {
        console.log("Validating schema");
        return true;
    }
    console.log("Schema mistmatch");
    return false;
}