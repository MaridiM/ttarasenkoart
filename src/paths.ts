export const paths = {
    auth: '/admin/auth',
    admin: '/admin',
    gallery: '/admin/gallery',
    add: '/admin/gallery/p/add',
    picture: (id?: string | number): string => id ? `/admin/p/${id}` : '/admin/p/:id',
    edit: (id?: string | number): string => id ? `/admin/gallery/p/${id}` : '/admin/gallery/p/:id',
}