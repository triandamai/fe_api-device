/***
 * Author PT Cexup Telemedicine
 * Made by Trian Damai
 * 30 Sep 2021 - 10:14
 *
 */
import Vue from "vue";

Vue.component("Header", () => import("@/components/header"))
Vue.component("Sidebar", () => import("@/components/sidebar"))
Vue.component("Footer", () => import("@/components/footer"))
Vue.component("Customizer", () => import("@/components/customizer"))
Vue.component("Breadcrumbs", () => import("@/components/bread_crumbs.vue"));
Vue.component("apexchart", () => import("vue-apexcharts"));
Vue.component("PxCard", () => import("@/components/Pxcard.vue"));

Vue.component("data-table", () => import("@/components/datatable.vue"));
Vue.component("form-import-device", () => import("@/components/form_upload_device_xlsx.vue"))
Vue.component("form-user", () => import("@/components/form_user.vue"));
Vue.component("form-device", () => import("@/components/form_device"));
Vue.component("form-hospital", () => import("@/components/form_hospital"));

export default {};
