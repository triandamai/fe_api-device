/***
 * Author PT Cexup Telemedicine
 *
 * Made by Trian Damai
 *
 * 26 Sep 2021 - 19:11
 *
 */
import {mapState} from "vuex";
import {formatCurrency} from "@/utils/utils";
import {decrypt, encrypt} from "@/services/jwt.service"

export default {
    props: ["show", "body", "edit"],
    /**
     * this section in future will make confuse to other contributor
     * */
    data: () => {
        return {
            loading: false,
            dialog: false,
            files: null,
            options: {
                locale: "id-ID",
                prefix: "Rp",
                suffix: "",
                length: 11,
                precision: 1
            },
            userLevel: [
                {value: "ADMIN", name: "Admin"},
                {value: "DEV", name: "Developer"},
                {value: "USER", name: "User"},
            ],
        }
    },
    watch: {
        body: function (newVal) {
            this.form = newVal;
            if (newVal.rasio_nasabah || newVal.rasio_bank) {
                this.rasio_bank = newVal.rasio_bank
                this.rasio_nasabah = newVal.rasio_nasabah
            }

        }
    },
    created() {
        window.addEventListener("keydown", (e) => {
            //if Enter go to next
            if (e.key === "Enter") {

                if (this.show) {
                    this.onSubmit()
                }
            }
        });
    },
    computed: {
        ...mapState({

            menuItems: (state) => state.menu.menu,
            layout: (state) => state.layout.layout,
            togglesidebar: (state) => state.menu.togglesidebar,
        }),
    },
    methods: {
        encryptPlain: (plain) => encrypt(plain),
        decryptPlain: (plain) => decrypt(plain),
        formatCurrency: (total) => formatCurrency(total),
        getMonthString() {
            const date = new Date();
            return date.toLocaleString('id-ID', {month: 'long'});
        },
        convertReadableDate(param) {
            const date = new Date(param);
            return `${date.toLocaleString("id-ID")}`
        },
        close(val = true) {
            this.$emit('close', val)
        },
        submit() {
            this.$emit("submit", this.form);
        },
        unAuthorize() {

        },
        ExcelDateToJSDate(serial, todate) {
            var utc_days = Math.floor(serial - 25569);
            var utc_value = utc_days * 86400;
            var date_info = new Date(utc_value * 1000);

            var fractional_day = serial - Math.floor(serial) + 0.0000001;

            var total_seconds = Math.floor(86400 * fractional_day);

            var seconds = total_seconds % 60;

            total_seconds -= seconds;

            var hours = Math.floor(total_seconds / (60 * 60));
            var minutes = Math.floor(total_seconds / 60) % 60;
            if (todate)
                return new Date(
                    date_info.getFullYear(),
                    date_info.getMonth(),
                    date_info.getDate(),
                    hours,
                    minutes,
                    seconds
                );
            return `${date_info.getUTCFullYear()}-${date_info.getMonth()}-${date_info.getDate()}`;
        },

    }
}