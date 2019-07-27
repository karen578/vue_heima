<template>
  <div class="users">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-input
      placeholder="请输入搜索内容"
      v-model="userObj.query"
      class="input-with-select"
      style="width:300px"
      @keyup.native.enter="init"
    >
      <!-- 搜索框的实现 因为传递的参数有关键字，所以直接获取所有参数的方法能实现搜索，因为任何字符串都包含空字符串 -->
      <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
    </el-input>
    <!-- 添加用户 -->
    <el-button
      type="success"
      plain
      style="margin-left:10px"
      @click="addDialogFormVisible = true"
    >添加用户</el-button>
    <!-- 添加用户弹窗 -->
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
      <el-form :model="addform" :rules="rules" ref="addform">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addform.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addform.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addform.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addform.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addsubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <el-table :data="userList" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态" width="100">
        <template slot-scope="scope">
          <!-- 改变状态要用change事件 scope里面存有自定义row里每一项的值，其中有状态my_state -->
          <el-switch
            v-model="scope.row.mg_state"
            active-color
            inactive-color="#ccc"
            @change="updateStatus(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="bottom" effect="light">
            <el-button
              size="mini"
              plain
              type="primary"
              icon="el-icon-edit"
              @click="showEditUser(scope.row)"
            ></el-button>
          </el-tooltip>
          <!-- 编辑用户弹窗 -->
          <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
            <el-form :model="editform" :rules="rules" ref="editform">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="editform.username" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="editform.email" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="mobile">
                <el-input v-model="editform.mobile" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editDialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="editsubmit">确 定</el-button>
            </div>
          </el-dialog>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            title="删除"
            style="margin-left:10px"
            @click="delUserById(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="warning"
            icon="el-icon-check"
            title="角色分配"
            @click="showRole(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userObj.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="userObj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 角色分配弹窗 -->
    <el-dialog title="分配角色" :visible.sync="grantdialogFormVisible">
      <el-form :model="grantform" :label-width="'100px'">
        <el-form-item label="当前的用户:">
          <span>{{grantform.username}}</span>
        </el-form-item>
        <el-form-item label="请选择角色：">
          <el-select v-model="grantform.rid" clearable placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="roleById">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAllUserList,
  addUser,
  editUser,
  delUser,
  UpdateUserState,
  updateRole
} from '@/api/user_index.js'
import { getAllRoleList } from '@/api/role_index.js'
export default {
  data () {
    return {
      // 角色分配数据
      roleList: [],
      grantform: {
        id: '',
        rid: '',
        username: ''
      },
      grantdialogFormVisible: false,
      editDialogFormVisible: false,
      // 编辑用户的数据
      editform: {
        username: '',
        id: '',
        email: '',
        mobile: ''
      },
      addDialogFormVisible: false,
      addform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      total: 0,
      userObj: {
        // 搜索关键字
        query: '',
        pagenum: 1,
        pagesize: 4
      },
      // 表格数据源，他是一个数组，里面每个元素都是对象
      userList: [],
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /\w+[@]\w+[.]\w+/,
            message: '请输入合法邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            pattern: /^1[3,5,7,8]\d{9}$/,
            message: '请输入合法手机号码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 修改分配角色
    async  roleById () {
      let res = await updateRole(this.grantform)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '修改角色成功',
          type: 'success'
        })
        this.grantdialogFormVisible = false
        this.init()
      }else {
        this.$message({
          message: '修改角色失败',
          type: 'error'
        })
      }
    },
    //  展示角色分配的数据
    showRole (row) {
      console.log(row)
      this.grantdialogFormVisible = true
      // 用户的名字是默认的不需要进行修改
      this.grantform.username = row.username
      this.grantform.id = row.id
      this.grantform.rid = row.rid
    },

    // 更改用户状态
    async updateStatus (row) {
      let res = await UpdateUserState(row.id, row.my_status)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '设置状态成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '设置状态失败',
          type: 'error'
        })
      }
    },
    // 删除用户
    delUserById (row) {
      this.$confirm(`将要删除id为${row.id}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delUser(row.id)
            .then(res2 => {
              if (res2.data.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                if (
                  Math.ceil((this.total - 1) / this.userObj.pagesize) <
                  this.userObj.pagenum
                ) {
                  this.userObj.pagenum--
                } else if (
                  Math.ceil((this.total - 1) / this.userObj.pagesize) === 0
                ) {
                  this.userObj.pagenum = 1
                }
                this.init()
              }
            })
            .catch(err2 => {
              this.$message({
                type: 'erroe',
                message: '删除失败!'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑用户
    async editsubmit () {
      let res = await editUser(this.editform)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '编辑数据成功',
          type: 'success'
        })
        this.editDialogFormVisible = false
        this.init()
      } else {
        this.$message({
          message: '编辑数据失败',
          type: 'error'
        })
      }
    },
    // 展示编辑数据
    showEditUser (row) {
      this.editDialogFormVisible = true
      this.editform.id = row.id
      this.editform.username = row.username
      this.editform.email = row.email
      this.editform.mobile = row.mobile
    },
    // 增加用户
    addsubmit () {
      // 对增加列表的数据进行验证
      this.$refs.addform.validate(vali => {
        if (vali) {
          addUser(this.addform)
            .then(res => {
              if (res.data.meta.status === 201) {
                this.addDialogFormVisible = false
                // 对添加列表进行重置
                this.$refs.addform.resetFields()
                this.init()
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message({
            message: '添加用户失败',
            type: 'error'
          })
        }
      })
    },
    handleSizeChange (val) {
      // 修改全局的页面显示条数
      this.userObj.pagesize = val
      // 需要重新渲染页面
      this.init()

      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      this.userObj.pagenum = val
      // 需要重新渲染页面
      this.init()
    },
    init () {
      //   发送axios请求
      getAllUserList(this.userObj)
        .then(res => {
          console.log(res)
          // 状态要写正确
          if (res.data.meta.status === 200) {
            // 获取到总页数
            this.total = res.data.data.total
            // console.log(this.total);
            // 把获取到的数据渲染到页面上
            this.userList = res.data.data.users
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.init()
    // 角色分配列表获取
    getAllRoleList()
      .then(res => {
        console.log(res)
        this.roleList = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="less" scoped>
.users {
  height: 100%;
  background-color: #e9eef3;
  .el-table {
    margin-top: 10px;
  }
}
</style>
