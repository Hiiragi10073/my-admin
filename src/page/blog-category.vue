<template>
  <div class="Blog-category">
    <hi-breadcrumb></hi-breadcrumb>
    <div class="table">
      <hi-table
        :tableData="tableData"
        :tableHeaders="tableHeaders"
        :handleEdit="handleEdit"
        :handleDelete="handleDelete"
      >
        <el-button
          type="success"
          size="medium"
          @click="handleAdd"
          class="addButton"
          >添加</el-button
        >
      </hi-table>
    </div>
    <!-- 新增或编辑分类模态框 -->
    <el-dialog :title="title" :visible.sync="dialogTableVisible">
      <el-form :model="form">
        <el-form-item label="编号" label-width="100px">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" label-width="100px">
          <el-input v-model="form.category" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" label-width="100px">
          <el-input v-model="form.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <hi-button
          type="primary"
          :data="form"
          :handClick="srueClick"
          size="normal"
          >确 定</hi-button
        >
        <el-button @click="dialogTableVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory
} from 'api/blog'

export default {
  name: 'BlogCategory',
  data() {
    return {
      tableData: [],
      tableHeaders: [
        { prop: 'code', label: '编号' },
        { prop: 'category', label: '名称' },
        { prop: 'desc', label: '简介' }
      ],
      title: '新增分类',
      dialogTableVisible: false,
      form: {
        id: '',
        code: '',
        category: '',
        desc: ''
      },
      action: 'add'
    }
  },
  methods: {
    // 编辑操作
    handleEdit(data) {
      this.action = 'edit'
      this.form = data.row
      this.dialogTableVisible = true
    },
    // 删除操作
    handleDelete(data) {
      this.$alert('确定要删除该分类吗', '提示', {
        confirmButtonText: '确定',
        callback: async (action) => {
          if (action === 'confirm') {
            const { status, message } = await deleteCategory(data.row.id)
            if (status === 200) {
              this.$message.success(message)
              this.getCategory()
            }
          }
        }
      })
    },
    // 增加操作
    handleAdd() {
      this.action = 'add'
      this.form = {
        id: '',
        code: '',
        category: '',
        desc: ''
      }
      this.dialogTableVisible = true
    },
    // 新增/编辑模态框确认
    async srueClick(data) {
      const { status } = await (this.action === 'add'
        ? addCategory(data)
        : updateCategory(data))
      if (status === 200) {
        this.getCategory()
      }
      this.dialogTableVisible = false
    },
    // 获取分类数据
    async getCategory() {
      const res = await getCategory()
      const { status, data } = res
      if (status === 200) {
        this.tableData = data
      }
    }
  },
  created() {
    this.getCategory()
  }
}
</script>

<style lang="scss" scoped>
.Blog-category {
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
