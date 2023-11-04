// да имаме отделни функционалности, които да правят заявки до сървъра.
const baseUrl = 'http://localhost:3030/jsonstore/users';

export const getAll = async () => { // функция, която ще взима всичките юзери от нашия сървър. Използваме named export защото очакваме да имаме повече от една функции в него и ще искаме да експортнем всички 
    const response = await fetch(baseUrl);
    const result = await response.json();

    const data = Object.values(result);
    return data;
}

export const getOne = async (userId) => {
    const response = await fetch(`${baseUrl}/${userId}`);
    const result = await response.json();

    return result;
}

//create
export const create = async (data) => {
    const body = { // това е цялото боди, което на нас ни трябва да изпратим на съвръра, което боди просто му казва стрингифи
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        imageUrl: data.imageUrl,
        phoneNumber: data.phoneNumber,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        address: {
            country: data.country,
            city: data.city,
            street: data.street,
            streetNumber: data.streetNumber
        }
    }

    const response = await fetch(baseUrl, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    const result = await response.json();
    console.log(result);

    return result;
}

//Delete
export const remove = async (userId) => {
    const response = await fetch(`${baseUrl}/${userId}`, {
        method:'DELETE'
    });

    const result = await response.json();

    return result;
}