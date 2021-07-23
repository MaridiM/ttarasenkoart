export const paths = {
    admin: '/admin',
    gallery: '/gallery',
    picture: (id?: string | number): string => id ? `/picture/${id}` : '/picture/:id',
    add: '/add',
    edit: '/edit',
}