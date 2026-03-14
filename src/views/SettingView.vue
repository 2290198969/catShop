<template>
  <div class="setting-page">
    <h1 class="page-title">设置</h1>

    <!-- 账户设置 -->
    <div class="setting-section">
      <h2 class="section-title">账户设置</h2>
      <div class="setting-item">
        <label for="change-password">修改密码</label>
        <button @click="showChangePasswordModal = true">修改</button>
      </div>
      <div class="setting-item">
        <label for="bind-phone">绑定手机号</label>
        <button @click="showBindPhoneModal = true">绑定</button>
      </div>
    </div>

    <!-- 通知设置 -->
    <div class="setting-section">
      <h2 class="section-title">通知设置</h2>
      <div class="setting-item">
        <label for="new-order-notice">新订单通知</label>
        <input type="checkbox" v-model="newOrderNotice" />
      </div>
      <div class="setting-item">
        <label for="coupon-expiry-notice">优惠券到期通知</label>
        <input type="checkbox" v-model="couponExpiryNotice" />
      </div>
    </div>

    <!-- 隐私设置 -->
    <div class="setting-section">
      <h2 class="section-title">隐私设置</h2>
      <div class="setting-item">
        <label for="share-info">是否允许分享个人信息</label>
        <input type="checkbox" v-model="allowShareInfo" />
      </div>
    </div>

    <!-- 修改密码模态框 -->
    <div v-if="showChangePasswordModal" class="modal">
      <div class="modal-content">
        <h3 class="modal-title">修改密码</h3>
        <form @submit.prevent="changePassword">
          <label for="old-password">旧密码</label>
          <input type="password" v-model="oldPassword" id="old-password" />
          <label for="new-password">新密码</label>
          <input type="password" v-model="newPassword" id="new-password" />
          <label for="confirm-password">确认新密码</label>
          <input type="password" v-model="confirmPassword" id="confirm-password" />
          <button type="submit">确认修改</button>
          <button @click="showChangePasswordModal = false">取消</button>
        </form>
      </div>
    </div>

    <!-- 绑定手机号模态框 -->
    <div v-if="showBindPhoneModal" class="modal">
      <div class="modal-content">
        <h3 class="modal-title">绑定手机号</h3>
        <form @submit.prevent="bindPhone">
          <label for="phone-number">手机号</label>
          <input type="number" v-model="phoneNumber" id="phone-number" />
          <label for="verification-code">验证码</label>
          <input type="number" v-model="verificationCode" id="verification-code" />
          <button type="submit">确认绑定</button>
          <button @click="showBindPhoneModal = false">取消</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 账户设置相关
const showChangePasswordModal = ref(false);
const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const showBindPhoneModal = ref(false);
const phoneNumber = ref('');
const verificationCode = ref('');

// 通知设置相关
const newOrderNotice = ref(true);
const couponExpiryNotice = ref(true);

// 隐私设置相关
const allowShareInfo = ref(false);

// 修改密码方法（此处仅为模拟，实际需与后端交互）
const changePassword = () => {
  if (newPassword.value === confirmPassword.value) {
    console.log('密码修改成功');
    showChangePasswordModal.value = false;
  } else {
    console.log('新密码和确认密码不一致');
  }
};

// 绑定手机号方法（此处仅为模拟，实际需与后端交互）
const bindPhone = () => {
  console.log('手机号绑定成功');
  showBindPhoneModal.value = false;
};
</script>

<style scoped>
.setting-page {
  background-color: #f8f8f8;
  min-height: 100vh;
  padding: 20px;
}

.page-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.setting-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.setting-item {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.modal-title {
  margin-bottom: 15px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

form input {
  margin-bottom: 15px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form button {
  margin-right: 10px;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>