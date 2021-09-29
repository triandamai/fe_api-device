<template>
  <v-card flat :dark="theme">
    <v-card-title>
      <v-btn
        data-testid="button"
        v-show="!hideadd"
        @click="$emit('add', true)"
        outlined
        small
        >{{ $t("Add") }}</v-btn
      >
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        :label="$t('Search')"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
        :loading="loadingtable"
        :loading-text="$t('Wait Loading')"
        flat :headers="headers" :items="items" :search="search">
      <template v-slot:item.hospital_id="{item}">
        <router-link :to="'api/'+item.hospital_id">{{item.hospital_id}}</router-link>
      </template>
      <template v-slot:item.hospital="{item}">
       {{item.hospital.name}}
      </template>
      <template v-slot:item.level="{ item }">
        <v-chip
            :color="getColor(item.level)"
            dark
        >
          {{ item.level }}
        </v-chip>
      </template>
      <template v-slot:item.device="{ item }">
        <v-chip
            :color="'green'"
            dark
        >
          {{ item.device.deviceMac }}
        </v-chip>
      </template>
      <template v-slot:item.updated_at="{ item }">
        {{convertReadableDate(item.updated_at)}}
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="$emit('edit', item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            small
            @click="$emit('delete', item)"
        >
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn
            color="primary"
        >
          Reset
        </v-btn>
      </template>

    </v-data-table>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
import componentMixin from "@/mixin/component.mixin"
export default {
  mixins:[componentMixin],
  props: ["items", "headers", "hideadd", "hidedelete", "hideupdate"],
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapState({
      theme: (state) => state.layout.isDark,
      loadingtable:(state)=>  state.loadingtable
    }),
  },
  methods:{
    getColor (level) {
      if (level === 'DEV') return 'cyan'
      if (level === 'ADMIN') return 'blue'
      if (level === 'USER') return 'green'
      return 'orange'

    },
    getTipeProduk(tipe){
      if(tipe === 1) return "Simpanan"
      if (tipe === 2) return "Pembiayaan"
      if(tipe === 3) return "Deposito"

      return "Tidak diketahui"
    },
    getRouteMutasi(mutasi){
      if(mutasi.tipe_angsuran){

        const data ={
         path: `/main/mutasi/pembiayaan`,
          query:{
            r:this.encryptPlain(mutasi.no_rekening),
            q:Date.now(),
            s:'f6ce8d9efde6'
          }
        }
        return data
      }
      const data ={
        path: `/main/mutasi/simpanan`,
        query:{
          r:this.encryptPlain(mutasi.no_rekening),
          q:Date.now(),
          s:'f6ce8d9efde6'
        }
      }
      return data
    }
  }
};
</script>