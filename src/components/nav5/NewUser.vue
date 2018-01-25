<template>
  <section id="NewUser">
    <el-form ref="UserForm" :model="form"  :rules="rules" label-width="80px" label-position="right" style="width:100%;min-width:600px;">
      <h2>用户信息录入</h2>
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名称"  style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="所属团队" prop="group_id" v-if="group">
        <el-select v-model="form.group_id" placeholder="请选择团队">
          <el-option v-for="item in group"
                     :key="item.id"
                     :label="item.group_name"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码设置" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" type="password" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="角色类别" prop="role_id">
        <el-select v-model="form.role_id" placeholder="请选择角色类别" v-if="roles">
          <el-option v-for="item in roles"
                     :key="item.id"
                     :label="item.role_name"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <h2>用户KPI指标</h2>
      <el-button type="text"  @click.native="newKPI()">新增年度KPI</el-button>
      <!--表格-->
      <el-table
        :data="tableData"
        stripe
        max-height="600"
        style="width: 100%">
        <el-table-column
          prop="year"
          label="年份"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="jan"
          label="一月"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="feb"
          label="二月"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="mar"
          label="三月"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="apr"
          label="四月"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="may"
          label="五月"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="jun"
          label="六月"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="july"
          label="七月"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="aug"
          label="八月"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="sept"
          label="九月"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="oct"
          label="十月"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="nov"
          label="十一月"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="dec"
          label="十二月"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="total"
          label="总目标"
          align="center"
        >
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="handle"-->
          <!--label="操作"-->
          <!--align="center"-->
        <!--&gt;-->
          <!--<template slot-scope="scope">-->
            <!--<el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <div  style="text-align: center;margin-top: 30px;">
        <el-button type="primary" @click="submitForm('UserForm')">提 交</el-button>
        <el-button @click.native="resetForm('UserForm')">重 置</el-button>
      </div>
    </el-form>
    <!--新增KPI-->
    <el-dialog title="KPI设置" :visible.sync="dialogFormVisible">
      <el-form  ref="KPIForm" :model="KPIForm"  :inline="true" :rules="rules" label-width="100px" label-position="right">
        <div>
          <el-form-item label="年份" prop="year">
            <el-input v-model="KPIForm.year" placeholder="请输入年份" style="width:110px;"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="一月" prop="jan">
          <el-input v-model="KPIForm.jan" placeholder="请输入数据" style="width:110px;"></el-input>
        </el-form-item>
        <el-form-item label="二月" prop="feb">
          <el-input v-model="KPIForm.feb" placeholder="请输入数据" style="width:110px;"></el-input>
        </el-form-item>
        <el-form-item label="三月" prop="mar">
          <el-input v-model="KPIForm.mar" placeholder="请输入数据" style="width:110px;"></el-input>
        </el-form-item>
        <el-form-item label="四月" prop="apr">
          <el-input v-model="KPIForm.apr" placeholder="请输入数据" style="width:110px;"></el-input>
        </el-form-item>
        <el-form-item label="五月" prop="may">
          <el-input v-model="KPIForm.may" placeholder="请输入数据" style="width:110px;"></el-input>
        </el-form-item>
        <el-form-item label="六月" prop="jun">
          <el-input v-model="KPIForm.jun" placeholder="请输入数据" style="width:110px;"></el-input>
        </el-form-item>
        <el-form-item label="七月" prop="july">
          <el-input v-model="KPIForm.july" placeholder="请输入数据" style="width:110px;"></el-input>
        </el-form-item>
        <el-form-item label="八月" prop="aug">
          <el-input v-model="KPIForm.aug" placeholder="请输入数据" style="width:110px;"></el-input>
        </el-form-item>
        <el-form-item label="九月" prop="sept">
          <el-input v-model="KPIForm.sept" placeholder="请输入数据" style="width:110px;"></el-input>
        </el-form-item>
        <el-form-item label="十月" prop="oct">
          <el-input v-model="KPIForm.oct" placeholder="请输入数据" style="width:110px;"></el-input>
        </el-form-item>
        <el-form-item label="十一月" prop="nov">
          <el-input v-model="KPIForm.nov" placeholder="请输入数据" style="width:110px;"></el-input>
        </el-form-item>
        <el-form-item label="十二月" prop="dec">
          <el-input v-model="KPIForm.dec" placeholder="请输入数据" style="width:110px;"></el-input>
        </el-form-item>
        <div>
          <el-form-item label="总目标" prop="total">
            <el-input v-model="total" placeholder="请输入总目标" style="width:160px;"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div  style="text-align: center">
        <el-button type="primary" @click="submitKPIForm('KPIForm')">确 定</el-button>
        <el-button @click="resetForm('KPIForm')">重 置</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import qs from "qs"
  export default {
    data() {
      return {
        dialogFormVisible:false,
        group:null,
        roles:null,
        KPIForm:{
          year:null,
          jan:null,
          feb:null,
          mar:null,
          apr:null,
          may:null,
          jun:null,
          july:null,
          aug:null,
          sept:null,
          oct:null,
          nov:null,
          dec:null,
        },
        form: {
          username: '',
          group_id: '',
          password:'',
          role_id:'',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
          ],
          group_id: [
            { required: true, message: '请选择团队', trigger: 'change' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          role_id: [
            { required: true, message: '请选择角色类别', trigger: 'change' }
          ],
          year:[
            { required: true, message: '请输入数据', trigger: 'blur' },
          ],
          jan:[
            { required: true, message: '请输入数据', trigger: 'blur' },
          ],
          feb:[
            { required: true, message: '请输入数据', trigger: 'blur' },
          ],
          mar:[
            { required: true, message: '请输入数据', trigger: 'blur' },
          ],
          apr:[
            { required: true, message: '请输入数据', trigger: 'blur' },
          ],
          may:[
            { required: true, message: '请输入数据', trigger: 'blur' },
          ],
          jun:[
            { required: true, message: '请输入数据', trigger: 'blur' },
          ],
          july:[
            { required: true, message: '请输入数据', trigger: 'blur' },
          ],
          aug:[
            { required: true, message: '请输入数据', trigger: 'blur' },
          ],
          sept:[
            { required: true, message: '请输入数据', trigger: 'blur' },
          ],
          oct:[
            { required: true, message: '请输入数据', trigger: 'blur' },
          ],
          nov:[
            { required: true, message: '请输入数据', trigger: 'blur' },
          ],
          dec:[
            { required: true, message: '请输入数据', trigger: 'blur' },
          ],
//          total:[
//            { required: true, message: '请输入数据', trigger: 'blur' },
//          ],
        },
        tableData: [
//          {
//            year:"2012",
//            jan:'1',
//            feb:'2',
//            mar:'3',
//            apr:'4',
//            may:'5',
//            jun:'6',
//            july:'7',
//            aug:'8',
//            sept:'9',
//            oct:'10',
//            nov:'11',
//            dec:'12',
//            total:'1111'
//          }
        ]
      }
    },
    methods: {
      submitForm(formName) {
        let that=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax.post("https://www.jnife.com/index.php/admin/admin/admin_add",qs.stringify(this.form))
              .then(function (res) {
                if(res.data.code==100000){
                  that.$message.success('恭喜，新用户创建成功');
                  that.tableData=[];
                  that.resetForm("UserForm");
                }
              }).catch(function () {

            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitKPIForm(formName){
        let that=this;
        this.$refs[formName].validate((valid) => {
            if (valid) {
                let {...KPIFormCopy}=this.KPIForm;
              KPIFormCopy.total=this.total;
              this.$ajax.post("https://www.jnife.com/index.php/admin/admin/addKpiForAdmin",qs.stringify(KPIFormCopy))
                .then(function (res) {
                  if(res.data.code==100000){
                    that.$message.success('恭喜，KPI创建成功');
                    let obj={};
                    obj.year=that.KPIForm.year;
                    obj.jan=that.KPIForm.jan;
                    obj.feb=that.KPIForm.feb;
                    obj.mar=that.KPIForm.mar;
                    obj.apr=that.KPIForm.apr;
                    obj.may=that.KPIForm.may;
                    obj.jun=that.KPIForm.jun;
                    obj.july=that.KPIForm.july;
                    obj.aug=that.KPIForm.aug;
                    obj.sept=that.KPIForm.sept;
                    obj.oct=that.KPIForm.oct;
                    obj.nov=that.KPIForm.nov;
                    obj.dec=that.KPIForm.dec;
                    obj.total=that.total;
                    that.tableData.push(obj);
                    that.resetForm("KPIForm");
                    that.dialogFormVisible=false;
                  }
                })
                .catch(function (err) {

                });
            } else {
              console.log('error submit!!');
              return false;
            }
        });
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
      },
      newKPI(){
        this.dialogFormVisible=true;
      },
//      edit(row){
//          console.log(row);
//      }
    },
    computed: {
      total: function () {
        return (this.KPIForm.jan*1 + this.KPIForm.feb*1 + this.KPIForm.mar*1 + this.KPIForm.apr*1 + this.KPIForm.may*1 + this.KPIForm.jun*1 + this.KPIForm.july*1 + this.KPIForm.aug*1 + this.KPIForm.sept*1 + this.KPIForm.oct*1 + this.KPIForm.nov*1 + this.KPIForm.dec*1)==0?null:(this.KPIForm.jan*1 + this.KPIForm.feb*1 + this.KPIForm.mar*1 + this.KPIForm.apr*1 + this.KPIForm.may*1 + this.KPIForm.jun*1 + this.KPIForm.july*1 + this.KPIForm.aug*1 + this.KPIForm.sept*1 + this.KPIForm.oct*1 + this.KPIForm.nov*1 + this.KPIForm.dec*1);
      }
    },
    created:function () {
      let that=this;
      this.$ajax.get("https://www.jnife.com/index.php/admin/admin/admin_add")
        .then(function (res) {
          if(res.data.code==100000){
            that.group=res.data.data.group;
            that.roles=res.data.data.role;
          }
        })
        .catch(function (err) {

        });


    }
  }

</script>

