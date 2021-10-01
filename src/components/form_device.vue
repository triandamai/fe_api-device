<template>
  <v-dialog
      v-model="show"
      max-width="600"
      persistent
      transition="dialog-bottom-transition"
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>Add New Device</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    v-model="form.device_name"
                    label="Device Name*"
                    required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="form.device_mac"
                    label="Device Mac*"
                    required
                    type="text"
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                    v-model="form.device_holder"
                    label="Device Holder*"
                    required
                    type="text"
                />
              </v-col>

              <v-col cols="12">
                <v-autocomplete
                    v-model="form.device_type"
                    :items="deviceType"
                    item-text="name"
                    item-value="value"
                    label="Role*"
                    required
                />
              </v-col>
            </v-row>
          </v-container>
          <small>{{ $t('indicates required field') }}</small>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="$emit('close', dialog.value)"
          >
            {{ $t('Close') }}
          </v-btn>
          <v-btn color="blue darken-1" text @click="submit"> {{ $t('Save') }}</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>


import componentMixin from "@/mixin/component.mixin"

export default {
  mixins: [componentMixin],
};
</script>