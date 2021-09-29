<template>
  <v-dialog
      v-model="show"
      max-width="600"
      persistent
      transition="dialog-bottom-transition"
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>Form User</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    v-model="form.username"
                    label="Username*"
                    required
                />
              </v-col>
              <v-col v-show="!edit" cols="12">
                <v-text-field
                    v-model="form.password"
                    label="Password*"
                    required
                    type="password"
                />
              </v-col>

              <v-col cols="12">
                <v-autocomplete
                    v-model="form.level"
                    :items="userLevel"
                    item-text="name"
                    item-value="id"
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