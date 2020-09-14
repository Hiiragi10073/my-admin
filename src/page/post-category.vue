<template>
  <div class="post-category">
    <ad-breadcrumb></ad-breadcrumb>
    <div class="table">
      <hi-table
        :tableData="tableData"
        :tableHeaders="tableHeaders"
        :handleEdit="handleEdit"
        :handleDelete="handleDelete"
      >
        <el-button type="success" size="medium" @click="handleAdd" class="addButton">添加</el-button>
      </hi-table>
    </div>
    <!-- 新增或编辑分类模态框 -->
    <el-dialog :title="title" :visible.sync="dialogTableVisible">
      <el-form :model="form">
        <el-form-item label="名称" label-width="100px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" label-width="100px">
          <el-input v-model="form.abstract" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <hi-button type="primary" :data="form" :handClick="srueClick" size="normal">确 定</hi-button>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCategory, updateCategory, deleteCategory } from "api/api";

export default {
  data() {
    return {
      tableData: [],
      tableHeaders: [
        { prop: "name", label: "名称" },
        { prop: "abstract", label: "简介" },
      ],
      title: "新增分类",
      dialogTableVisible: false,
      form: {
        name: "",
        abstract: "",
      },
    };
  },
  methods: {
    // 编辑操作
    handleEdit(data) {
      this.form = data.row;
      this.dialogTableVisible = true;
    },
    // 删除操作
    handleDelete(data) {
      this.$alert("确定要删除该分类吗", "提示", {
        confirmButtonText: "确定",
        callback: async (action) => {
          const { status, message } = await deleteCategory(data.row.id);
          console.log(status, message);
          if (status === 200) {
            this.$message.success(message);
            this.getCategory();
          }
        },
      });
    },
    // 增加操作
    handleAdd() {
      this.form = {
        id: "",
        name: "",
        abstract: "",
      };
      this.dialogTableVisible = true;
    },
    // 新增/编辑模态框确认
    async srueClick(data) {
      const { status } = await updateCategory(data);
      if (status === 200) {
        this.getCategory();
      }
      this.dialogTableVisible = false;
    },
    // 获取分类数据
    async getCategory() {
      const res = await getCategory();
      const { status, data } = res;
      if (status === 200) {
        this.tableData = data;
      }
    },
  },
  created() {
    this.getCategory();
  },
};
</script>


<style lang="scss" scoped>
.post-category {
  .table {
    margin-top: 50px;
    text-align: center;
    background-color: #fff;

    .addButton {
      margin: 10px;
    }
  }
}
</style>