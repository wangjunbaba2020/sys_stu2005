import Home from "../pages/Home"

const dynamicRoutes = [{
        path: "/",
        // name: "home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.

        // component: () =>
        //     import ( /* webpackChunkName: "about" */ "../pages/Home")

        component: Home,
        // children: allRoutes刚测试用的
        children: []
            //  [{
            //     path: "student",
            //     component: () =>
            //         import ( /* webpackChunkName: "about" */ "../pages/Home/student")
            // }]
    },
    {
        path: "*",
        component: () =>
            import ( /* webpackChunkName: "about" */ "../pages/Page404")
    }
]

export default dynamicRoutes