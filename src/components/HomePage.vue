<template>
  <div class="container">
    <div class="mt-md-4 mt-sm-0 row">
      <div class="col-md-12 mt-4">

        <div class="card p-3">
          <div class="text-center mb-2">
            <h3 class="title-color">PDF Resources</h3>
          </div>
          <div v-if="pdfresources.length > 0">
            <v-data-table :headers="pdfheaders" :items="pdfresources" sort-by="calories" class="elevation-1">
              <template v-slot:body="{ items }">
                <tbody>
                  <tr v-for="item in items" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td><a :href="`${baseEnvLocal}${item.file}`" target="_blank">
                      <img height="40" :src="require('@/assets/img/pdf_icon.png')" /></a>
                    </td>
                    <td>
                      <a href="#" :download="`${item.file}`">
                        <v-btn color="primary" title="Download PDF" small class="mr-2">
                          <v-icon small>mdi-download</v-icon>
                        </v-btn>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </div>
          <div v-else>
            <h5 class="text-danger">There have no data</h5>
          </div>
        </div>

        <div class="card p-3 mt-2">
          <div class="text-center mb-2">
            <h3 class="title-color">HTML Snippet Resources</h3>
          </div>
          <div v-if="snippetresources.length > 0">
            <v-data-table :headers="snippetheaders" :items="snippetresources" sort-by="calories" class="elevation-1">
              <template v-slot:body="{ items }">
                <tbody>
                  <tr v-for="item in items" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td>{{ item.description }}</td>
                    <td>
                      <v-btn color="primary" title="HTML Snippet" v-if="item.snippet == 1" small class="mr-2" type="button" @click="copyDescription(item.description)">
                        <v-icon small>mdi-content-copy</v-icon>
                      </v-btn>
                      <v-btn color="primary" title="HTML Snippet is not available for this text" v-else small class="mr-2" type="button" @click="copyDescription(item.description)">
                        <v-icon small>mdi-content-copy</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </div>
          <div v-else>
            <h5 class="text-danger">There have no data</h5>
          </div>
        </div>

        <div class="card p-3 mt-2">
          <div class="text-center mb-2">
            <h3 class="title-color">Link Resources</h3>
          </div>
          <div v-if="linkresources.length > 0">
            <v-data-table :headers="linkheaders" :items="linkresources" sort-by="calories" class="elevation-1">
              <template v-slot:body="{ items }">
                <tbody>
                  <tr v-for="item in items" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td>{{ item.link }}</td>
                    <td>
                      <a :href="`${item.link}`" v-if="item.new_tab == 1" target="_blank">
                        <v-btn  color="primary" title="Open in a new tab" small class="mr-2">
                          <v-icon small>mdi-open-in-new</v-icon>
                        </v-btn>
                      </a>
                      <a :href="`${item.link}`" v-else>
                        <v-btn color="primary" title="Open in this tab" small class="mr-2">
                          <v-icon small>mdi-open-in-new</v-icon>
                        </v-btn>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </div>
          <div v-else>
            <h5 class="text-danger">There have no data</h5>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex"

export default {
  data: () => ({
    pdfheaders: [
        { text: "Title", align: "start", sortable: false, value: "title"},
        { text: "FDF File", value: "file" },
        { text: "PDF Download", value: "actions", sortable: false },
      ],
    snippetheaders: [
        { text: "Title", align: "start", sortable: false, value: "title"},
        { text: "Description", align: "start", value: "description"},
        { text: "HTML Snippet", value: "actions", sortable: false },
      ],
    linkheaders: [
        { text: "Title", align: "start", sortable: false, value: "title"},
        { text: "Link", align: "start", value: "link"},
        { text: "Open Link", value: "actions", sortable: false },
      ],
    baseEnvLocal: baseEnv,
  }),

  async created(){
    this.GetPDFResources();
    this.GetSnippetResources();
    this.GetLinkResources();
  },

  computed: {
      ...mapState("resource", ["pdfresources"]),
      ...mapState("resource", ["snippetresources"]),
      ...mapState("resource", ["linkresources"]),
  },

  methods: {
    ...mapActions("resource",["GetPDFResources"]),
    ...mapActions("resource",["GetSnippetResources"]),
    ...mapActions("resource",["GetLinkResources"]),

    copyDescription(value) {
        const el = document.createElement('textarea');
        el.setAttribute('readonly', '');
        el.value = value;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert('Copied!');
    },
  }
};
</script>

<style>
  .title-color{
    color: brown;
  }
</style>
