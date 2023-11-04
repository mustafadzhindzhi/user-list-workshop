// да имаме отделни функционалности, които да правят заявки до сървъра.
const baseUrl = 'http://localhost:3030/jsonstore/users';

export const getAll = async () => { // функция, която ще взима всичките юзери от нашия сървър. Използваме named export защото очакваме да имаме повече от една функции в него и ще искаме да експортнем всички 
    try {
        const response = await fetch(baseUrl);
        const result = await response.json();

        const data = Object.values(result);
        return data;
    } catch (error) {
        console.log(error);
    }
}