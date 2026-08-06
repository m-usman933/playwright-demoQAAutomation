function randomString(length : number)
{
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let userName = "";

    for (let i = 0; i < length; i++) {
        userName += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return userName;
}

/*function generatePassword(length : number)
{
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";

    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
}*/

export type UserData = {
    userName: string;
    password: string;
};

export function createUserData(): UserData {
    const userName = `usman_${randomString(5)}`;
    //const password = generatePassword(9);

    return{
        userName,
        password : 'Usman@1234',
    };
}