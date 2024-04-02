export interface User {
    //registerUser(value: Partial<{ name: string | null; email: string | null; password: string | null; password_confirmation: string | null; }>): unknown;
    id: number,
    name: string,
    email: string,
    created_at: string
}
