export interface UserInterface {
    gender: string,
    name: {
        title: string,
        first: string,
        last: string
    },
    location: {
        state: string
    },
    email: string,
    dob: Array<any>,
    registered: {
        age: number
    },
    phone: string,
    picture: Array<string>
}
