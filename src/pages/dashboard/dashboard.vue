<template>
  <div>
    <Breadcrumbs :title="$t('Dashboard')" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <!-- BEGIN CHART -->

          <div class="col-xl-12 xl-100 dashboard-sec box-col-12">
          <px-card class="earning-card with-padding">

            <div class="row m-0">
              <div class="col-xl-3 earning-content p-0">
                <div class="row m-0 chart-left">
                  <div class="col-xl-12 p-0 left_side_earning">
                    <h5>{{ $t('Dashboard') }}</h5>
                    <p class="font-roboto">{{$t('overview10day')}}</p>
                  </div>
                  <div class="col-xl-12 p-0 left_side_earning">
                    <h5>10</h5>
                    <p class="font-roboto">{{$t('Customer')}}</p>
                  </div>
                  <div class="col-xl-12 p-0 left_side_earning">
                    <h5>10</h5>
                    <p class="font-roboto">{{$t('Transaction')}}</p>
                  </div>

                  <div class="col-xl-12 p-0 left-btn">
                    <a class="btn btn-gradient">{{$t('Summary')}}</a>
                  </div>
                </div>
              </div>
              <div class="col-xl-9 p-0">
                <div class="chart-right">
                      <div class="card-body">
                        <div class="current-sale-container">
                          <div id="chart-currently">

                          </div>
                        </div>
                      </div>
                </div>
              </div>
            </div>

          </px-card>
        </div>


        <!-- END CHART -->
      </div>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>


export default {
  data: () => {
    return {

    };
  },

};
</script>
