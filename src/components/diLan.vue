<template>
  <div class="nav-bar-container">
    <div class="nav-bar">
      <div class="nav-list">
        <router-link class="nav-list-item active" to="home">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house"
              viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207l-5-5-5 5V13.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7.207Z" />
            </svg></span>
        </router-link>
        <router-link class="nav-list-item" to="category">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags"
              viewBox="0 0 16 16">
              <path
                d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z" />
              <path
                d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z" />
            </svg></span>
        </router-link>
        <router-link class="nav-list-item" to="cart">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart"
              viewBox="0 0 16 16">
              <path
                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg></span>
        </router-link>
        <router-link class="nav-list-item" to="user">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-person-gear" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
              <path
                d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
              <path fill-rule="evenodd"
                d="M11.886 9.46c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg></span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.nav-bar-container {
  @apply fixed w-dvw flex flex-row justify-center;
  left: 0;
  bottom: 0;
}

.nav-bar {
  width: 100dvw;
  padding: 0.5rem 0;
  background: #fff;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s all;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
  min-height: 60px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-list {
    width: 100%;
    max-width: screen-width;
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    padding: 0 1rem;

    .nav-list-item {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      transition: all 0.2s ease;
      text-align: center;
      color: #9a9a9a;
      min-width: 80px;
      padding: 0.8rem 0.5rem;
      text-decoration: none;

      &:hover {
        background-color: rgb(162, 115, 255);
        color: white;
        border-radius: 4px;
      }

      &.router-link-active {
        color: rgb(162, 115, 255);
        font-weight: bold;

        &:hover {
          color: white;
        }
      }

      span {
        font-size: 14px;
        display: flex;
        /* 添加这行*/
        justify-content: center;
        /* 添加这行，水平居中 */
        align-items: center;
        /* 添加这行，垂直居中 */
        height: 100%;
        /* 添加这行，确保图标撑满容器高度 */
      }
    }
  }
}

@media screen and (min-width: 540px) {
  .nav-bar {
    width: 384px;
    margin-bottom: 16px;
    border-radius: 8px;
  }
}
</style>