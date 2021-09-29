/**
 * Author Trian Damai
 * PT Cexup Telemedicine
 */
import Vue from "vue";
import Router from "vue-router";
import ApiService from "@/services/api.service";
import {getUser} from "@/services/jwt.service";

Vue.use(Router);

/**
 * routes definition
 * there only 1 nested routes
 * @see Router
 * ex:
 *  route1
 *    subroute1
 *    subroute2
 *  route2
 */
const routes = [
    /**
     * base route in this route will redirect to main
     */
    {path: "", redirect: {name: "dashboard"}},
    /**
     * in this route all children requiresAuth for access
     */
    {
        path: "/main",
        component: () => import("@/components/body"),
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "",
                redirect: "dashboard",
            },
            {
                path: "dashboard",
                name: "dashboard",
                component: () => import("@/pages/dashboard/dashboard.vue"),
                meta: {
                    title: "Dashboard | Bank Falah Syariah",
                    requiresAuth: true,
                    roles: ["public"]
                },
            },
            {
                path: "user",
                name: "user",
                component: () => import("@/pages/users/user.vue"),
                meta: {
                    title: "Api-Device | Management",
                    requiresAuth: true,
                    roles: ["admin", "bp_root"]
                },
            },
            {
                path: "api",
                name: "api",
                component: () => import("@/pages/api-keys/api-keys.vue"),
                meta: {
                    title: "Api-Device | Management",
                    requiresAuth: true,
                    roles: ["admin", "bp_root"]
                },
            },
            {
                path: "device",
                name: "device",
                component: () => import("@/pages/devices/devices.vue"),
                meta: {
                    title: "Api-Device | Management",
                    requiresAuth: true,
                    roles: ["admin", "bp_root"]
                },
            },
            {
                path: "measurement",
                name: "device",
                component: () => import("@/pages/measurements/measurements.vue"),
                meta: {
                    title: "Api-Device | Management",
                    requiresAuth: true,
                    roles: ["admin", "bp_root"]
                },
            },
            {
                path: "hospital",
                name: "hospital",
                component: () => import("@/pages/hospitals/hospitals"),
                meta: {
                    title: "Api-Device | Management",
                    requiresAuth: true,
                    roles: ["admin", "bp_root"]
                },
            },
            {
                path: "not-authorized",
                name: "not-authorized",
                component: () => import("@/pages/error/not-authorized.vue"),
                meta: {
                    title: "Unlock | Bank Falah Syariah",
                    requiresAuth: false,
                    roles: ["public"]
                },
            }

        ],
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/pages/auth/login.vue"),
        meta: {
            title: "Login | Bank Falah Syariah",
            requiresAuth: false,
            roles: ["admin", "bp_root", "siswa", "public"]
        },
    },
    {
        path: '/unlock',
        name: 'unlock',
        component: () => import("@/pages/auth/unlock_user"),
        meta: {
            title: "Unlock | Bank Falah Syariah",
            requiresAuth: true,
            roles: ["admin", "bp_root", "siswa", "public"]
        },
    },

];

/**
 * instance router
 * mode use instead useing history must use hash for desktop
 */
const router = new Router({
    routes,
    base: process.env.BASE_URL || "/",
    mode: process.env.IS_ELECTRON ? "hash" : "history",
    linkActiveClass: "active",
    scrollBehavior() {
        return {x: 0, y: 0};
    },
});

/**
 * check session of user
 * if the user not  logged in route with meta requiresAuth the route will denied and redirect to login
 */
router.beforeEach((to, from, next) => {
    ApiService.setHeader();
    const user = getUser();
    if (to.meta.title) document.title = to.meta.title;
    if (to.meta.requiresAuth) {
        if (user) {
            next()
        } else {
            next({path: "/login"});
        }
    } else {
        next();
    }

});


export default router;
