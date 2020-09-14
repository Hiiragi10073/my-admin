<template>
  <div class="hi-table">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      stripe
      header-row-class-name="hi-table-th"
    >
      <el-table-column
        v-for="item in tableHeaders"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
      ></el-table-column>
      <el-table-column label="操作" width="250px" class-name="editColumn">
        <template slot-scope="scope">
          <hi-button size="mini" type="primary" :data="scope" :handClick="handleEdit">编辑</hi-button>
          <hi-button size="mini" type="info" :data="scope" :handClick="handleDelete">删除</hi-button>
        </template>
      </el-table-column>
    </el-table>
    <slot class="addButton"></slot>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      required: true,
      type: Array,
      default() {
        return [];
      },
    },
    tableHeaders: {
      required: true,
      type: Array,
      default() {
        return [{ prop: "name", label: "名称" }];
      },
    },
    handleEdit: {
      required: true,
      type: Function,
      dafault() {
        return function () {};
      },
    },
    handleDelete: {
      required: true,
      type: Function,
      dafault() {
        return function () {};
      },
    },
  },
};
</script>

<style lang="scss">
.hi-table {
  .el-table {
    margin-top: 50px;
    text-align: center;
  }
  .hi-table-th,
  .hi-table-th th {
    background-color: #f3843d;
    color: #fff;
  }
  .editColumn {
    text-align: center;
  }
}
</style>
