<template>
  <div id="userhome">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="12">
          <div style="margin-top: 15px;">
            <el-input
              placeholder="请输入内容"
              class="input-with-select"
              v-model="queryInfo.query"
              @keyup.enter.native="getUsersList"
              clearable
              @clear="getUsersList"
            >
              <el-button slot="append" icon="el-icon-search" @click="getUsersList"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="50" label="#" align="center"></el-table-column>
        <el-table-column prop="username" label="姓名" align="center"></el-table-column>
        <el-table-column prop="role_name" label="角色" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
        <el-table-column prop="mg_state" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="swithChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip :enterable="false" content="修改" placement="top">
              <el-button type="primary" icon="el-icon-edit" circle @click="editUser(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip :enterable="false" content="删除" placement="top">
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </el-tooltip>
            <el-tooltip :enterable="false" content="分配权限" placement="top">
              <el-button type="warning" icon="el-icon-setting" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" @close="dialogClose">
      <el-form :model="addfrom" :rules="addfromrules" ref="addForm">
        <el-form-item label="用户名" prop="username" label-width="80px">
          <el-input v-model="addfrom.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="80px">
          <el-input v-model="addfrom.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" label-width="80px">
          <el-input v-model="addfrom.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile" label-width="80px">
          <el-input v-model="addfrom.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改用户" :visible.sync="dialogFormEdit">
      <el-form :model="editfrom" :rules="editfromrules" ref="editForm">
        <el-form-item label="邮箱" prop="email" label-width="80px">
          <el-input v-model="editfrom.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile" label-width="80px">
          <el-input v-model="editfrom.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEdit = false">取 消</el-button>
        <el-button type="primary" @click="editQueryUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 获取用户列表定义参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      tableData: [],
      total: 0,
      dialogFormVisible: false,
      dialogFormEdit: false,
      addfrom: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addfromrules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      },
      editfrom: {
        email: '',
        mobile: '',
        id: ''
      },
      editfromrules: {
        email: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getUsersList()
  },
  methods: {
    async getUsersList () {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      console.log(res)
      if (res.meta.status === 200) {
        this.tableData = res.data.users

        this.total = res.data.total
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.queryInfo.pagesize = val
      this.getUsersList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.queryInfo.pagenum = val
      this.getUsersList()
    },
    async swithChange (userInfo) {
      // switch状态改变,用户状态修改
      const { data: res } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      )
      if (res.meta.status === 200) {
        this.$message.success('用户状态更新成功')
      } else {
        userInfo.mg_state = !userInfo.mg_state
        this.$message.error('用户状态更新失败')
      }
    },
    dialogClose () {
      this.$refs.addForm.resetFields()
    },
    addUser () {
      this.$refs.addForm.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.addfrom)
        console.log(res)
        if (res.meta.status === 201) {
          this.$message.success('添加用户成功')
          this.dialogFormVisible = false
          this.getUsersList()
        } else {
          this.$message.error(res.meta.msg)
        }
      })
    },
    editUser (user) {
      console.log(user)
      this.dialogFormEdit = true
      this.editfrom.email = user.email
      this.editfrom.mobile = user.mobile
      this.editfrom.id = user.id
    },
    editQueryUser () {
      this.$refs.editForm.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put(`users/${this.editfrom.id}`, this.editfrom)
        console.log(res)
        if (res.meta.status === 200) {
          this.$message.success('更新用户成功')
          this.dialogFormEdit = false
          this.getUsersList()
        } else {
          this.$message.error(res.meta.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
}
.el-button {
  margin-top: 15px;
}
.el-table {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 10px;
}
</style>
