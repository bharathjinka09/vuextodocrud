import axios from 'axios';

const state = {
  todos: []
};

const getters = {
  allTodos: (state) => {
    return state.todos
  }
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

    commit('setTodos', response.data);
  },

  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    commit('removeTodo', id);
  },

  async updateTodo({ commit }, updatedTodo) {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo);

    commit('updateTodo', response.data);
  },

  async addTodo({commit},title){
      const response = await axios.post(`https://jsonplaceholder.typicode.com/todos`,
      {title:title,completed:false})

      commit('addTodo',response.data)
  },

  async filterTodos({ commit }, event) {
    // Get the limit
    const limit = parseInt(event.target.options[event.target.options.selectedIndex].innerText);
    
    // Request
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);

    commit('setTodos', response.data);
  }
}

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    removeTodo:(state,id) => state.todos = state.todos.filter((todo) => todo.id !== id),
    updateTodo: (state, updatedTodo) => {
        // Find index
        const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
    
        if (index !== -1) {
          state.todos.splice(index, 1, updatedTodo);
        }
    },
    addTodo:(state,newTodo) => state.todos.unshift(newTodo)
};


export default {
    state,
    getters,
    actions,
    mutations
};