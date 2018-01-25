<template>
  <section id="UserManage">
    <!--新增用户-->
    <el-button type="primary"  @click.native="newProject()">新增用户</el-button>
    <!--表格-->
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      max-height="600"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="用户名"
        align="center"
      >
      </el-table-column>
      </el-table-column>
      <el-table-column
        prop="roles"
        label="角色类别"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="time"
        label="创建时间"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="handle"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button  @click="edit(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
  import qs from "qs"
  export default{
    data(){
      return{
        loading:false,
        tableData: [
//          {
//            name: "1221",
//            roles: '王小虎',
//            time: '王小虎',
//          },
        ]
      }
    },
    methods:{
      newProject(){
        this.$router.push('NewUser')
      },
      edit(row){
          this.$router.push("UserEdit");
          sessionStorage.setItem("user_id",row.id);
      },

    },
    created:function () {
        let that=this;
        that.loading=true;
        this.$ajax.post("https://www.jnife.com/index.php/admin/admin/admin_list")
          .then(function (res) {
            if(res.data.code==100000){
                let data=res.data.user;
                for(let i=0,len=data.length;i<len;i++){
                  let obj={};
                  obj.id=data[i].id;
                  obj.name=data[i].username;
                  obj.roles=data[i].role_name;
                  obj.time=data[i].ctime;
                  that.tableData.push(obj);
                }
                that.loading=false;
              }
          })
          .catch(function (err) {

          });
    }
  }
</script>
