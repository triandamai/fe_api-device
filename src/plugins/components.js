/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
import Vue from "vue";

Vue.component("Header", () => import("@/components/header"))
Vue.component("Sidebar", () => import("@/components/sidebar"))
Vue.component("Footer", () => import("@/components/footer"))
Vue.component("Customizer", () => import("@/components/customizer"))
Vue.component("data-table", () => import("@/components/datatable.vue"));
Vue.component("form-import-siswa", () => import("@/components/form_upload_siswa_xlsx.vue"))
Vue.component("form-user", () => import("@/components/form_user.vue"));
Vue.component("Breadcrumbs", () => import("@/components/bread_crumbs.vue"));
Vue.component("apexchart", () => import("vue-apexcharts"));
Vue.component("PxCard", () => import("@/components/Pxcard.vue"));


export default {};
