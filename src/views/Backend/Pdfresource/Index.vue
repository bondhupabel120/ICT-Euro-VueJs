<template>
  <v-container fluid>
    <div class="tables-basic">
      <v-card class="mb-1 mt-3">
        <v-data-table :headers="headers" :items="pdfresources" sort-by="calories" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Pdf Resources</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer>
                <v-col md="6" class="mx-auto" v-if="message == 'Deleted successfully'">
                  <v-alert type="success">{{message}}</v-alert>
                </v-col>
              </v-spacer>
              <v-btn color="primary" dark class="mb-2 btn-sm" to="/dashboard/add_pdfresource">New Pdf Resource</v-btn>
            </v-toolbar>
          </template>
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.title }}</td>
                <td>
                  <a :href="`${baseEnvLocal}${item.file}`" target="_blank">
                    <img height="40" :src="require('@/assets/img/pdf_icon.png')" />
                  </a>
                </td>
                <td>{{ $moment(item.created_at).format('Do MMMM YYYY, h:mm A') }}</td>
                <td>
                  <v-btn color="error" small class="mr-2" @click="removeResource(item.id)">
                    <v-icon small>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>

          <template v-slot:no-data>
            <v-btn color="primary" @click="Data">Reset</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Tables",
  data() {
    return {
      message: {},
      baseEnvLocal: baseEnv,
      headers: [
        { text: "Title", align: "start", sortable: false, value: "title"},
        { text: "FDF File", value: "file" },
        { text: "Created Date", value: "created_at" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapState("resource", ["pdfresources"]),
  },

  created() {
    this.GetPDFResources();
  },

  methods: {
    ...mapActions("resource", ["GetPDFResources"]),

    removeResource(id) {
      if (confirm("Are you sure?")) {
        this.$store
          .dispatch("resource/DeletePDFResource", id)
          .then((res) => {
            window.location.href = "/dashboard/pdfresources";
            this.message = res.data.message;
            this.GetPDFResources();
          })
          .catch(() => {});
      }
    },
  },
};
</script>

