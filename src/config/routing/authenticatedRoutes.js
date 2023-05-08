
import Dashboard from "views/admin/dashboard";
import SuperAdmin from "views/superAdmin";
export default [

    {
        element: <Dashboard />,
        path: '/dbd',
        title: 'Dashboard',
        isRoot: true,
        icon: '',
        roles: ['admin'],
        items: []
    },
    {
        element: <SuperAdmin />,
        path: '/sadbd',
        title: 'Super Admin Dashboard',
        isRoot: true,
        icon: '',
        roles: ['super admin'],
        items: []
    },


]