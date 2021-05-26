<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <div>
        <md-icon @click.native="showDialog = false" style="color: red"
          >close</md-icon
        >
      </div>
      <component :id="activeRowId" :is="dialogComponent" />
      <md-dialog-actions>
        <md-button class="close-button" @click="showDialog = false"
          >Close</md-button
        >
      </md-dialog-actions>
    </md-dialog>
    <div style="padding: 10px; text-align: center" v-if="rowsState">
      <vue-good-table
        :columns="columns"
        :rows="rowsState"
        :line-numbers="true"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 10,
          position: 'top',
          perPageDropdown: [3, 7, 15],
          dropdownAllowAll: false,
          setCurrentPage: 1,
          nextLabel: 'next',
          prevLabel: 'prev',
          rowsPerPageLabel: 'Rows per page',
          ofLabel: 'of',
          pageLabel: 'page', // for 'pages' mode
          allLabel: 'All',
        }"
        styleClass="vgt-table striped condensed bordered"
      >
        <div slot="table-actions">
          <md-button
            class="md-raised add-product"
            @click="showAddProductDialog"
          >
            + Add product</md-button
          >
        </div>
        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field == 'image'">
            <span style="vertical-align: -10px">
              <img :src="props.row.image" style="max-height: 40px" />
            </span>
          </div>
          <div v-else-if="props.column.field == 'actions'">
            <span style="vertical-align: -10px">
              <md-avatar
                class="md-avatar-icon md-small delete-icon"
                @click.native="deleteProd(props.row)"
                id="delete"
              >
                <md-icon>delete</md-icon>
              </md-avatar>
              <md-avatar
                class="md-avatar-icon md-small edit-icon"
                @click.native="editProd(props.row)"
              >
                <md-icon>edit</md-icon>
              </md-avatar>
            </span>
          </div>
          <span v-else>
            <span style="vertical-align: -10px">
              {{ props.formattedRow[props.column.field] }}
            </span>
          </span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm.vue";

export default {
  components: { AddProductForm, EditProductForm },
  name: "admin-table",
  computed: {
    ...mapState("product", {
      rowsState: (state) => state.rows,
    }),
  },
  data() {
    return {
      showDialog: false,
      dialogComponent: null,
      activeRowId: null,
      columns: [
        {
          label: "Title",
          field: "title",
          thClass: "text-center",
          tdClass: "text-center",
          width: "150px",
        },
        {
          label: "Price",
          field: "price",
          thClass: "text-center",
          tdClass: "text-center",
          width: "150px",
        },

        {
          label: "Description",
          field: "description",
          thClass: "text-center",
          tdClass: "text-center",
          width: "250px",
        },

        {
          label: "Image",
          field: "image",
          width: "100px",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Actions",
          field: "actions",
          width: "100px",
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
    };
  },
  methods: {
    onRowClick(params) {
      console.log(params.event.target.id);
    },
    async deleteProd(params) {
      let res = await this.$store.dispatch("product/deleteProduct", {
        id: params._id,
      });
    },
    editProd(params) {
      this.activeRowId = params._id;
      this.dialogComponent = "edit-product-form";
      this.showDialog = true;
    },
    showAddProductDialog() {
      this.dialogComponent = "add-product-form";
      this.showDialog = true;
    },
    ...mapActions("product", ["getAllProducts"]),
  },
  mounted() {
    this.$root.$on("closeDialog", () => {
      this.showDialog = false;
    });
  },
  created() {
    this.getAllProducts();
  },
};
</script>
<style lang="scss" scoped>
.md-dialog /deep/.md-dialog-container {
  width: -webkit-fill-available;
  background-color: white;
  padding: 15px;
  overflow: auto;
}
.edit-icon {
  background-color: #4caf50;
}
.delete-icon {
  background-color: #ff5252;
}
.delete-icon,
.edit-icon {
  color: white;
  margin: 5px;
}
.add-product {
  background: linear-gradient(-90deg, #6a79cf, #1627c0);
  color: white;
  width: 152px;
}
.close-button {
  background-color: #ff5252;
  color: white;
}
</style>