<template>
  <section class='todoapp'>
    <header class='header'>
      <h1>{{ undone }} Todos</h1>
      <input type="text" class="new-todo" placeholder="ajouter une tache" v-model="newTodo" @keyup.enter="addTodo">
    </header>
    <div class="main">
      <input type="checkbox" class="toggle-all" v-model="allDone">
      <ul class="todo-list">
        <li class="todo" v-for="(todo, idx) in filtered.slice().reverse()" :key="idx" v-bind:class="{completed: todo.done, editing:todo === editing}">
          <div class="view">
            <input type="checkbox" v-model=todo.done class="toggle">
            <label @dblclick="editTodo(todo)">{{ todo.name }}</label>
            <button class="destroy" @click.prevent="deleteTodo(todo)"></button>
          </div>
          <input type="text" class="edit" v-model="todo.name" @keyup.enter="stopEditing" @blur="stopEditing" @keyup.esc="cancelEditing" v-focus="todo === editing">
        </li>
      </ul>
    </div>
    <footer class="footer" v-show="todos.length > 0">
      <span style="font-size: 0.7rem" class="todo-count">
        tâches faites {{ done }}
      </span>
      <ul class="filters">
        <li><a href="#" v-bind:class="{selected: filter === 'all'}" @click.prevent="filter = 'all'">Toutes</a></li>
        <li><a href="#" v-bind:class="{selected: filter === 'undone'}" @click.prevent="filter = 'undone'">À faire</a></li>
        <li><a href="#" v-bind:class="{selected: filter === 'done'}" @click.prevent="filter = 'done'">Faites</a></li>
      </ul>
      <button style="font-size: 0.7rem" class="clear-completed" v-show="done > 0" @click.prevent="deleteCompleted">Supprimer les tâches faites</button>
    </footer>
  </section>
</template>

<script>
import Vue from 'vue'
import store from './TodoStore'

export default {
  store: store,
  data () {
    return {
      todos: [{
        name: 'tache de testing',
        done: false
      }],
      newTodo: '',
      filter: 'all',
      editing: null,
      oldTodoName: null
    }
  },
  methods: {
    addTodo () {
      this.todos.push({
        done: false,
        name: this.newTodo
      })
      this.newTodo = ''
    },
    deleteTodo (todo) {
      this.todos = this.todos.filter(t => t !== todo)
    },
    deleteCompleted () {
      this.todos = this.todos.filter(todo => !todo.done)
    },
    editTodo (todo) {
      this.editing = todo
      this.oldTodoName = todo.name
    },
    stopEditing (todo) {
      this.editing = null
    },
    cancelEditing (todo) {
      this.editing.name = this.oldTodoName
      this.editing = null
    }
  },
  computed: {
    undone () {
      return this.todos.filter((t) => !t.done).length
    },
    done () {
      return this.todos.filter((t) => t.done).length
    },
    filtered () {
      if (this.filter === 'done') {
        return this.todos.filter(todo => todo.done)
      } else if (this.filter === 'undone') {
        return this.todos.filter(todo => !todo.done)
      } else {
        return this.todos
      }
    },
    allDone: {
      get () {
        return this.undone === 0
      },
      set (value) {
        for (const todo of this.todos) {
          todo.done = value
        }
      }
    }
  },
  directives: {
    focus (el, value) {
      if (value) {
        Vue.nextTick(() => {
          el.focus()
        })
      }
    }
  }
}
</script>

<style src="./todos.css"></style>
