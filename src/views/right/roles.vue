<template>
  <div class="roles">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色按钮 -->
    <el-button type="success" plain @click="aaddialogFormVisible=true">添加角色</el-button>

    <!-- 表格 -->
    <el-table :data="roleData" border style="width: 100%">
      <!-- 增加展开行 -->
      <!-- 通过设置 type="expand" 和 Scoped slot 可以开启展开行功能，
      el-table-column 的模板会被渲染成为展开行的内容，
      展开行可访问的属性与使用自定义列模板时的 Scoped slot 相同。-->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 因为一个一级层级就是一行，一行里面有这个一级对应的二级层级数据，
            一个二级层级就是一行，一行里面有这个二级对应的三级层级数据
          利用栅格布局实现-->
          <el-row v-for="frist in scope.row.children" :key="frist.id">
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-tag
                  type="success"
                  closable
                  @close="delRightById(scope.row,frist.id)"
                >{{frist.authName}}</el-tag>
              </div>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in frist.children" :key="second.id">
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    <el-tag
                      type="warning"
                      closable
                      style="margin-right:5px"
                      @close="delRightById(scope.row,second.id)"
                    >{{second.authName}}</el-tag>
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="grid-content bg-purple-light">
                    <!-- 因为第三组数据是没有children，没有一一对应的数据所以直接循环标签就可以 -->
                    <el-tag
                      style="margin:0 5px 5px 5px"
                      type
                      closable
                      @close="delRightById(scope.row,third.id)"
                      v-for="third in second.children"
                      :key="third.id"
                    >{{third.authName}}</el-tag>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <!-- 用v-show可以当条件满足的时候显示出来 -->
            <el-col :span="24" v-show="scope.row.children.length===0">没有设置权限，请配置</el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 增加了索引值 -->
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="bottom" effect="light">
            <el-button size="mini" plain type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            title="删除"
            style="margin-left:10px"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="warning"
            icon="el-icon-check"
            title="授权角色"
            @click="showRight(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 授权角色的弹窗 -->
    <el-dialog title="授权角色" :visible.sync="givedialogFormVisible">
      <!-- 分别通过default-expanded-keys和default-checked-keys设置默认展开和默认选中的节点
      default-expand-all是否展开所有的节点，因为事变所有需要绑定-->
      <!-- :default-checked-keys默认被选住数据的id,需要用循环才能得到 -->
      <!-- 。需要注意的是，此时必须设置node-key，其值为节点数据中的一个字段名，该字段在整棵树中是唯一的
      node-key="id"是唯一值，不需要变成变量。-->
      <!-- 给树结构添加ref属性是为了方便后给树添加方法 -->
      <el-tree
        ref="mytree"
        :data="giveform"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="checkedArr"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="givedialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 增加角色的弹窗 -->
    <el-dialog title="收货地址" :visible.sync="aaddialogFormVisible">
      <el-form :model="addRole">
        <el-form-item label="角色名称">
          <el-input v-model="addRole.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRole.roleDesc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="aaddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllRoleList, addRole } from '@/api/role_index.js'
import { delRight, getAllRight, grantRightById } from '@/api/right_index.js'
export default {
  data () {
    return {
      // 增加角色的数据
      addRole: {
        roleName: '',
        roleDesc: ''
      },
      aaddialogFormVisible: false,
      // 角色授权的数据
      roleId: '',
      // 展示角色默认权限的数据
      checkedArr: [],
      // label是展示出来的数据
      giveform: [],
      givedialogFormVisible: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      roleData: []
    }
  },
  methods: {
    // 发送axios请求增加角色
    async addSubmit () {
      let res = await addRole(this.addRole)

      if (res.data.meta.status === 201) {
        this.$message({
          message: res.data.meta.msg,
          type: 'success'
        })
        this.aaddialogFormVisible = false
        this.role_init()
      }
    },

    // 角色授权的方法
    async grantSubmit () {
      // 若节点可被选择,返回的是一个数组
      var arr = this.$refs.mytree.getCheckedNodes()
      // console.log(arr)
      var temp = []
      arr.forEach(item => {
        // 得到的是一个数组
        temp.push(item.id + ',' + item.pid)
      })
      var str = temp.join(',')
      // 得到的是一个数组
      var temSt = str.split(',')
      // 用展开字符然后进行去重
      var finalarr = [...new Set(temSt)]
      // 得到的是一个数组，需要把数组变成字符串
      let res = await grantRightById(this.roleId, finalarr.join(','))
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          message: res.data.meta.msg,
          type: 'success'
        })
        this.givedialogFormVisible = false
        this.role_init()
      }
    },
    // 展示授权角色的默认数据
    async showRight (row) {
      this.givedialogFormVisible = true
      let res = await getAllRight('tree')
      this.roleId = row.id
      if (res.data.meta.status === 200) {
        this.giveform = res.data.data
        // 把数组清空
        this.checkedArr.length = 0
        // 因为树形图有个特点，就是选中了最后子级就会选中它的父级，所有需要获取third.id,就需要进行循环
        // 因为this的指向需要和外部一样，所有需要用箭头函数
        if (row.children && row.children.length > 0) {
          row.children.forEach(frist => {
            if (frist.children && frist.children.length > 0) {
              frist.children.forEach(second => {
                if (second.children && second.children.length > 0) {
                  second.children.forEach(third => {
                    this.checkedArr.push(third.id)
                  })
                }
              })
            }
          })
        }
      }
    },
    //   删除权限
    async delRightById (row, rightId) {
      let res = await delRight(row.id, rightId)
      this.id = rightId
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          message: res.data.meta.msg,
          type: 'success'
        })
        // 因为取消成功了会返回一个data数据，里面是一个数组
        row.children = res.data.data
      }
    },
    //   获取角色初始化
    async role_init () {
      let res = await getAllRoleList()
      console.log(res)
      if (res.data.meta.status === 200) {
        this.roleData = res.data.data
      }
    }
  },
  mounted () {
    this.role_init()
  }
}
</script>
<style lang="less" scoped>
</style>
