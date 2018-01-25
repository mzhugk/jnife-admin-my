<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="20" class="logo" >
				<!--{{sysName}}-->
        <img src="../assets/logo.png" alt="">
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="head_icon" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<!--<el-dropdown-item>我的消息</el-dropdown-item>-->
						<!--<el-dropdown-item>设置</el-dropdown-item>-->
						<!--<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>-->
						<el-dropdown-item  @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside class="menu-expanded">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo"
					 unique-opened router >
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls" style="font-size: 12px;"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
			</aside>
			<section class="content-container">
				<el-col :span="24" class="breadcrumb-container">
					<el-breadcrumb separator="/" class="breadcrumb-inner">
						<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
							{{ item.name }}
						</el-breadcrumb-item>
					</el-breadcrumb>
				</el-col>
				<el-col :span="24" class="content-wrapper">
					<transition name="fade" mode="out-in">
              <router-view></router-view>
					</transition>
				</el-col>
			</section>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
//				sysName:'尖刀集团',
//				collapsed:false,
//				sysUserName: '',
//				sysUserAvatar: '',
			}
		},
		methods: {
			//退出登录
			logout: function () {
				let that = this;
				this.$confirm('确认退出吗?', '提示', {
//					type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					sessionStorage.removeItem('token_secret');
					that.$router.push('/login');
				}).catch(() => {

				});


			},
		},
    computed:{
      head_icon(){
        return this.$store.state.head_icon;
      },
      sysUserName(){
        return this.$store.state.sysUserName;
      }
    },
		mounted() {

		},
    created:function () {
		    let that=this;
        this.$store.commit('head_icon');//        这里动态获取头像状态和用户名称
        let Lv=sessionStorage.getItem("role_id");
        if(Lv>2){
          that.$router.options.routes[3].children[3].hidden=true;
          that.$router.options.routes[7].children[1].hidden=true;
        }else{
          that.$router.options.routes[3].children[3].hidden=false;
          that.$router.options.routes[7].children[1].hidden=false;
        }
    }
	}

</script>

<style scoped lang="scss">
	@import '../styles/vars.scss';

	.container {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			/*background: $color-primary;*/
      background-color: #fff;
      border-bottom: 1px solid #ddd;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 45px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#4A90E2;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px ;
						float: left;
					}
				}
			}
			.logo {
				width:230px;
				height:60px;
				text-align: center;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 100%;
					float: left;
					margin-top: 6px;
				}
				.txt {
					color:#fff;
				}
			}
		}
		.main {
			display: flex;
			display: -webkit-flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0;
				// bottom: 0;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				background: #F2F4F5;
				flex:1;
				position: relative;
				// right: 0;
				// top: 0;
				// bottom: 0;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					margin-bottom:15px;
					.breadcrumb-inner {
						float: left;
						font-size: 18px;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
          padding: 30px;
				}
			}
		}
	}
</style>
