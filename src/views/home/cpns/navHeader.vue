<template>
  <div class="navHeader">
    <el-card class="navHeaderCard">
      <el-row class="navRow">
        <!-- 一级菜单 -->
        <el-row justify="space-around" style="width: 100%">
          <!-- 头部logo -->
          <el-col :span="3" :offset="1" class="navHeaderImg">
            <el-image :src="require('@/assets/img/logo.png')"></el-image>
          </el-col>
          <!-- 头部导航 -->
          <el-col :span="9" class="navHeaderTitle">
            <template v-for="(item, i) in navHeadertitles" :key="i">
              <router-link 
                class="navHeaderTitleSize"
                :to="'/home/'+item.path"
                @click="titlesClick(item)"
              >
                {{item.meta.title}}
              </router-link>
            </template>
          </el-col>
          <!-- 头部搜索栏 -->
          <el-col :span="4" class="navHeaderSeach">
            <el-input placeholder="搜索音乐、MV、歌单" />
          </el-col>
          <!-- 右侧按钮 -->
          <el-col :span="6" class="navHeaderLogin">
            <!-- 登录 -->
            <el-button  v-if="!$store.state.loginModule.userInfo" type="text" @click="navDialogVisible = true">登录</el-button>
            <template v-else>
              <img class="ganbeiimg" :src="userInfo.avatarUrl" style="width:40px;height:40px;border-radius:50px;">
              <el-dropdown>
                <span class="ganbei">{{userInfo.nickname}}
                  <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>      
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item> 
                    <el-dropdown-item @click="navHeaderLoginOut" divided>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
              <!-- <span class="ganbei">{{userInfo.nickname}}</span> -->
            <!-- 开通vip下拉菜单 -->
            <el-dropdown>
                <el-button type="primary">
                  开通vip
                  <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="openMoney">开通绿钻豪华包</el-dropdown-item> 
                    <el-dropdown-item @click="openMoney" divided>开通会员包</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
            </el-dropdown>
            <!-- 充值下拉菜单 -->
            <el-dropdown>
                <el-button>
                  充值
                  <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="openMoney">购买乐币</el-dropdown-item> 
                    <el-dropdown-item @click="openMoney" divided>充值饭票</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
            </el-dropdown>
          </el-col>
        </el-row>
        <el-divider v-if="navHeaderDicider"></el-divider>
        <!-- 二级菜单 -->
        <el-row  justify="center" style="width: 100%">
          <el-col  class="navHeaderTwoTitle" :span="14">
            <template v-for="item in navHeaderTwoTitles" :key="item">
              <router-link class="navHeaderTwoSize" :to="'/home/pavilion/'+item.path">{{item.meta.title}}</router-link>
            </template>
          </el-col>
        </el-row>
        <!-- 登录 -->
        <el-dialog v-model="navDialogVisible" width="30%" center>
          <span>
            <el-tabs stretch>
              <el-tab-pane label="手机登录">
                <login-phone ref="phoneRef"></login-phone>
              </el-tab-pane>
              <el-tab-pane label="邮箱登录">邮箱登录</el-tab-pane>
              <el-tab-pane label="二维码登录">二维码登录</el-tab-pane>
            </el-tabs>
          </span>
          <template #footer>
            <span class="nav-dialog-footer">
              <el-button @click="navDialogVisible = false">退出</el-button>
              <el-button type="primary" @click="handleLoginClick">登录</el-button>
            </span>
          </template> 
        </el-dialog>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { ArrowDown } from '@element-plus/icons'
// 手机登录
import loginPhone from './loginPhone.vue'
// 二级导航
let navHeaderTwoTitles = ref()

const route = useRoute();
const router = useRouter()
const store = useStore()
// 头部文字
const navHeadertitles = route.matched[0].children
// 头部分割线
const navHeaderDicider = ref(false)
// 登录框
const navDialogVisible = ref(false)
// 手机登录的ref
const phoneRef = ref<InstanceType<typeof loginPhone>>()

// 二级菜单
const titlesClick = (item: any) => {
  if(item.children) {
    navHeaderTwoTitles.value = item.children   
  }else {
    navHeaderTwoTitles.value = ''  
  }
  if(item.name == 'Pavilion') {
    router.push('/home/pavilion/pavilionhome')
    navHeaderDicider.value = true
  }else {
    navHeaderDicider.value = false
  }
}  

// 判断当前路由
const navHeaderURL = () => {
  const URL = route.path
  const splieURL = URL.slice(0, 14)
  if(splieURL == '/home/pavilion') {
    titlesClick(navHeadertitles[0])
  }
}
navHeaderURL()

// 登录
const handleLoginClick = () => {
  phoneRef.value?.phoneLoginAction()
  navDialogVisible.value = false  
}

// 用户信息
const userInfo = computed(() => {
  return JSON.parse( store.state.loginModule.userInfo.bindings[1].tokenJsonStr)
})

// 退出
const navHeaderLoginOut = () => {
  store.dispatch('loginModule/phoneLoginOut')
  router.push('/home/pavilion/pavilionhome')
}
// 花钱的地方
const openMoney = () => {
  ElMessage({
    message: '宝，咱不花钱好嘛~',
    type: 'warning',
    center: true,
  })
}

</script>

<style scoped lang="less">
.navHeader {
  .navHeaderCard {
    line-height: 40px;
    .navRow {
      .navHeaderTitle {
        height: 100%;
        a {
          text-decoration: none;
          color: black;
        }
        .router-link-active {
          text-decoration: none;
          color: green;
        }
        .navHeaderTitleSize {
          margin: 0 25px 0 0;
          font-size: 22px;
          &:hover {
            color: #31c27c;
          }
        }
      }
      .navHeaderLogin {
        /deep/.el-button__text--expand {
          font-size: 18px;
        }
        .el-button {
          margin-right: 5px;
        }
      }
    }
    .navHeaderTwoTitle {
      a {
        text-decoration: none;
        color: black;
      }
      .router-link-active {
        text-decoration: none;
        color: green;
      }
      .navHeaderTwoSize {
        margin: 0 47px 0 0;
        font-size: 15px;
        &:hover {
          color: #31c27c;
        }
      }
    }
    
  }
}
.ganbei {
  padding: 10px;
  margin-left: 35px;
  cursor: pointer;
  position: relative;
  &:hover {
    color: #0084FD;
  }
}
.ganbeiimg {
  position: absolute;
}
</style>