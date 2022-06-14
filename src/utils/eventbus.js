/*
 * @Description: eventBus
 * @Version: 0.1
 * @Autor: Chenyt
 */
import Vue from 'vue'

const vm = new Vue()

const eventBus = {
  $emit: ($event, ...args) => {
    vm.$emit($event, ...args)
  },
  $on: ($event, callback) => {
    vm.$on($event, callback)
  }
}

export default eventBus
