<template>
  <v-dialog
      v-model="show"
      max-width="600"
      persistent
      transition="dialog-bottom-transition"
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>Add New Hospital</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    v-model="form.name"
                    label="Hospital Name*"
                    required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="form.address"
                    label="Address*"
                    required
                    type="text"
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                    v-model="form.telp"
                    label="Phone*"
                    required
                    type="text"
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                    v-model="form.email"
                    label="Email*"
                    required
                    type="text"
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                    v-model="form.region"
                    label="Region*"
                    required
                    type="text"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="form.domain"
                    label="Domain*"
                    required
                    type="text"
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