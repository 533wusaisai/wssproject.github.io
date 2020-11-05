<template>
  <transition name='fade'>
    <div v-show='visible' :class='position' class='toast'>
      <div class="msg">{{message}}</div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        message : '',
        position : ''
      };
    }
  }
</script>


<style>
  .toast {
    position: fixed;
    left:50%;
    transform:translate(-50%,-50%) scale(1);
    word-wrap:break-word;
    padding:10px;
    text-align: center;
    z-index:9999;
    font-size:.6rem;
    max-width:80%;
    color: #fff;
    border-radius: 5px;
    background: rgba(0,0,0,0.7);
    overflow: hidden;
    display:inline-table;
  }
  .toast .msg{color:#FFFFFF;font-size:0.8rem;}
  .toast.middle{
    top:50%;
  }
  .toast.top{
    top:10%;
  }
  .toast.bottom{
    top:90%;
  }
  .fade-enter-active, .fade-leave-active {
    transition: transform .3s
  }
  .fade-enter, .fade-leave-active {
    transform:translate(-50%,-50%) scale(0);
  }
</style>
