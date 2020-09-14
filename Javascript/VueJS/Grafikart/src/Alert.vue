<template>
    <div>
      <transition name="fade" appear>
        <div class="alert alert-success" role="alert" v-if="visible">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita odit ea impedit sed tempora magni iure, officia aspernatur doloribus nesciunt veritatis. Perferendis distinctio at quo ducimus. Pariatur autem velit voluptate.
        </div>
      </transition>
      <button @click="toggle">Toggle</button>
    </div>
</template>

<script>
export default {
  data () {
    return {
      visible: true
    }
  },
  methods: {
    toggle () {
      this.visible = !this.visible
    }
  }
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s, transform 0.5s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: translateX(20px);
  }

</style>
