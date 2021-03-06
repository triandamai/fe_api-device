/***
 * Author PT Cexup Telemedicine
 *
 * Made by Trian Damai
 *
 * 26 Sep 2021 - 19:11
 *
 */
import {formatCurrency} from "@/utils/utils"
import {decrypt, encrypt} from "@/services/jwt.service";

export default {
    data: () => {
        return {
            body: {},
            isEdit: false,
            form: false
        }
    },
    methods: {
        encryptPlain: (plain) => encrypt(plain),
        decryptPlain: (plain) => decrypt(plain),
        formatCurrency: (total) => formatCurrency(total),
        getMonthString() {
            const date = new Date();
            return date.toLocaleString('id-ID', {month: 'long'});
        },
        getDateMutasi() {
            const date = new Date()
            return `${date.getDate()}, ${date.getFullYear()}`
        },
        convertReadableDate(param) {
            const date = new Date(param);
            return `${date.toLocaleString("id-ID")}`
        },

    }
}