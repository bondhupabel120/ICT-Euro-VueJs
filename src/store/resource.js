// import { axios } from "vue/types/umd";

export default {
  namespaced: true,

  state: () => ({
    resources: [],
    resource: {},

    pdfresources: [],
    pdfresource: {},

    snippetresources: [],
    snippetresource: {},

    linkresources: [],
    linkresource: {},
  }),

  getters: {
    resources(state) {
      return state.resources;
    },
    pdfresources(state) {
      return state.pdfresources;
    },
    snippetresources(state) {
      return state.snippetresources;
    },
    linkresources(state) {
      return state.linkresources;
    },
  },

  mutations: {
    Resource_Data(state, resources) {
      state.resources = resources;
    },
    PDFResource_Data(state, pdfresources) {
      state.pdfresources = pdfresources;
    },
    SnippetResource_Data(state, snippetresources) {
      state.snippetresources = snippetresources;
    },
    LinkResource_Data(state, linkresources) {
      state.linkresources = linkresources;
    },
    LinkResourceShow(state, linkresource) {
      state.linkresource = linkresource;
    },

    CREATED(state) { },
    UPDATED(state) { },

  },

  actions: {
    AddPDFResource({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/create/pdf/resource", data)
          .then((result) => {
            resolve(result);
            commit("CREATED");
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GetPDFResources({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("/api/view/pdf/resource")
          .then((result) => {
            resolve(result);
            commit("PDFResource_Data", result.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    DeletePDFResource({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete("/api/delete/pdf/resource/" + id)
          .then((result) => {
            resolve(result);
            commit("PDFResource_Data", result.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    AddSnippetResource({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/create/snippet/resource", data)
          .then((result) => {
            resolve(result);
            commit("CREATED");
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GetSnippetResources({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("/api/view/snippet/resource")
          .then((result) => {
            resolve(result);
            commit("SnippetResource_Data", result.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    DeleteSnippetResource({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete("/api/delete/snippet/resource/" + id)
          .then((result) => {
            resolve(result);
            commit("SnippetResource_Data", result.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    AddLinkResource({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/create/link/resource", data)
          .then((result) => {
            resolve(result);
            commit("CREATED");
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GetLinkResources({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("/api/view/link/resource")
          .then((result) => {
            resolve(result);
            commit("LinkResource_Data", result.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    DeleteLinkResource({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete("/api/delete/link/resource/" + id)
          .then((result) => {
            resolve(result);
            commit("LinkResource_Data", result.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  }
}
