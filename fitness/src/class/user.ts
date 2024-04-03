class User {
    id: number;
    username: string;
    email: string;

    constructor(id: number, username: string, email: string) {
        this.id = id;
        this.username = username;
        this.email = email;
    }
}

export default User;