<template>
  <div class="homeFooterMixins">
    <el-row class="footerRow" style="width:100%">
      <el-row class="oneRow" justify="center" style="width:100%">
        <el-col :span="11">
          <span class="oneTitle" @click="openFooter">关于腾讯</span>
          <span class="oneMargin">|</span>
          <span class="oneTitle" @click="openFooter">About Tencent</span>
          <span class="oneMargin">|</span>
          <span class="oneTitle" @click="openFooter">服务条款</span>
          <span class="oneMargin">|</span>
          <span class="oneTitle" @click="openFooter">用户服务协议</span>
          <span class="oneMargin">|</span>
          <span class="oneTitle" @click="openFooter">隐私政策</span>
          <span class="oneMargin">|</span>
          <span class="oneTitle" @click="openFooter">权利声明</span>
          <span class="oneMargin">|</span>
          <span class="oneTitle" @click="openFooter">广告服务</span>
          <span class="oneMargin">|</span>
          <span class="oneTitle" @click="openFooter">腾讯招聘</span>
          <span class="oneMargin">|</span>
          <span class="oneTitle" @click="openFooter">客服中心</span>
          <span class="oneMargin">|</span>
          <span class="oneTitle" @click="openFooter">网站导航</span>
        </el-col>
      </el-row>
      <el-row class="twoRow" justify="center" style="width:100%">
        <el-col :span="6">
          <span class="twoMargin">
            Copyright © 1998 - 2021 Tencent. 
          </span>
          <span class="twoTitle" @click="openFooter">
            All Rights Reserved.
          </span>
        </el-col>
      </el-row>
      <el-row class="threeRow" justify="center" style="width:100%">
        <el-col :span="8">
          <span class="threeMargin">腾讯公司</span>
          <span class="threeTitle" @click="openFooter">版权所有</span>
          <span class="threeMargin">｜</span>
          <span class="threeTitle" @click="openFooter">营业执照</span>
          <span class="threeMargin">｜网络文化经营许可证：</span>
          <span class="threeTitle" @click="openFooter">粤网文[2020]3396-195号</span>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
const openFooter = () => {
  ElMessage({
    message: '正在研发中~',
    type: 'warning',
    center: true,
  })
}
</script>

<style lang="less" scoped>
.homeFooterMixins{
  background-color: #333333;
  height: 130px;
  .footerRow {
    .oneRow {
      margin-top: 30px;
      .oneTitle {
        font-size: 5px;
        color: #7f7f7f;
        cursor: pointer;
        &:hover {
          color: #31c37c;
        }
      }
      .oneMargin {
        margin-left: 5px;
        color: #7f7f7f; 
      }
    }
    .twoRow {
      margin-top: 10px;
      .twoMargin {
        font-size: 5px;
        color: #7f7f7f; 
      }
      .twoTitle {
        font-size: 5px;
        color: #7f7f7f; 
        cursor: pointer;
        &:hover {
          color: #31c37c;
        }
      }
    }
    .threeRow {
      margin-top: 10px;
      .threeMargin {
        font-size: 5px;
        color: #7f7f7f;
        margin-right: 5px;
      }
      .threeTitle {
        font-size: 5px;
        color: #7f7f7f; 
        cursor: pointer;
        &:hover {
          color: #31c37c;
        }
      }
    }
  }
}
</style>