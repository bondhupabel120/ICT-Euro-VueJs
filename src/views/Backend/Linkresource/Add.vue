<template>
  <v-form ref="form" @submit.prevent="save" v-model="valid" lazy-validation enctype="multipart/form-data" class="mt-2">
    <v-card class="pa-5">
      <div class="card-body">
    <fieldset class="form-group border py-1 px-3">
      <legend class="w-auto px-2" style="float:none; font-size:21px;">Add New Link Resource:</legend>
    <v-row>
      <v-col md="6" cols="12">
          <v-text-field
            v-model="resource.title"
            :error-messages="errors.title"
            label="Title"
            required
          ></v-text-field>
      </v-col>
      <v-col md="6" cols="12">
          <v-text-field
            v-model="resource.link"
            :error-messages="errors.link"
            label="Link"
            required
          ></v-text-field>
      </v-col>
      <v-col md="6" cols="12">
          <div class="form-check">
          <input class="form-check-input" v-model="resource.new_tab" type="checkbox" value="1" id="new_tab">
          <label class="form-check-label" for="new_tab">
            Open in a new tab
          </label>
        </div>
      </v-col>
    </v-row>


    <v-btn
      style="max-height:37px"
      type="submit"
      color="primary"
      class="mr-4 mt-4"
      :loading="loading"
      :disabled="loading"
    >Submit</v-btn>

    </fieldset>
    </div>
    </v-card>
  </v-form>


  <!-- </v-card> -->
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    errors: [],
    valid: true,
    loader: null,
    loading: false,
    menu1: false,
    resource: {
      title: "",
      description: "",
    },
    files: [],
    url:null,
  }),
  created() {
  },
  computed: {
  },
  methods: {
    save() {
      let isValidate = true;
      this.$refs.form.validate();
      this.$refs.form.inputs.forEach((input) => {
        if (input.hasError) {
          isValidate = false;
        }
      });
      if (!isValidate) {
        return;
      }
      this.loading = true;
      let formData = new FormData();
    formData.append('file',this.files);
    for (let field in this.resource) {
        formData.append(field, this.resource[field]);
      }
      this.$store
        .dispatch("resource/AddLinkResource", formData)
        .then(() => {
          this.loading = false;

          this.$router.push("/dashboard/linkresources");
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
          this.loading = false;
        });
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
