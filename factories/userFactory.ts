export function randomString(length : number)
{
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let userName = "";

    for (let i = 0; i < length; i++) {
        userName += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return userName;
}

export function generatePassword(length : number)
{
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";

    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
}

export function createUserData() {
    const username = `usman_${randomString(5)}`;
    const password = generatePassword(9);

    return {
        FirstName: 'Usman',
        LastName: 'Sarfraz',
        username,
        password,
    };
}