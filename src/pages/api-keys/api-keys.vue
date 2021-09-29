<template>
  <div>
    <Breadcrumbs :title="$t('User')" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-12 xl-100 dashboard-sec box-col-12">
          <px-card class="earning-card">
            <div class="row">
              <div class="earning-content col-xl-3 col-lg-12 col-md-12">
                  <div class="col-xl-12 left_side_earning">
                    <h5>{{$t('Data User')}}</h5>
                    <p class="font-roboto">{{$t('subtitleuser')}}</p>
                </div>
              </div>

              <div class="chart-right col-xl-9 col-lg-12 col-md-12 pt-5 pb-5">
                <data-table
                    :items="items"
                    :headers="headers"
                    @add="generateApi"
                    @delete="onDelete"
                />
              </div>
            </div>
          </px-card>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import header from "@/data/headerApi.json";
import {
  ACTION_GET_DATA_MASTER,
    ACTION_POST_DATA_MASTER,
    ACTION_PUT_DATA_MASTER,
    ACTION_DELETE_DATA_MASTER,
    TYPE_API
} from "@/store";
import { mapState } from "vuex";
import pageMixin from "@/mixin/page.mixin"
export default {
  mixins:[pageMixin],
  data: () => {
    return {
      headers: header,
      form_import:false
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.master.dataApi
      ,
    }),
  },
  created() {
    this.$store.commit('setLoading',true)
    let id = this.$route.params.id
    if(id){
      this.getData(id);
    }

  },
  methods: {
    getData(id) {
      this.$store
        .dispatch(ACTION_GET_DATA_MASTER, {
          type: TYPE_API,
          slug:`/hospital/${id}`
        })
        .then((isNext) => {
          if (isNext) {
            this.getData();
          }
          this.$store.commit('setLoading',false)
        });
    },
    generateApi() {
      let id = this.$route.params.id
      this.$swal({
        text: this.$t("Generate New Api Key ?"),
        showCancelButton: true,
        confirmButtonText: "Oke",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Batal",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then(({ value }) => {

        if (value) {
      this.$store
        .dispatch(
           ACTION_POST_DATA_MASTER,
          {
            type: TYPE_API,
            body: {
              hospital_id:id
            },
          }
        )
        .then(({ success }) => {

          if (success) {
            this.form = false;
            this.body = {};
          }
        });
        }
      });
    },
    onDelete(data) {
      this.$swal({
        text: this.$t("Delete Message", { who: `${data.username}` }),
        showCancelButton: true,
        confirmButtonText: "Oke",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Batal",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then(({ value }) => {

        if (value) {
          this.$store
            .dispatch(ACTION_DELETE_DATA_MASTER, {
              type: TYPE_API,

              body: data,
            })

        }
      });
    },
  },
};
</script>
