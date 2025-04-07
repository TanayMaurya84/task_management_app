import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  filter: 'all',
  category: 'all',
  search: '',
  sortPriority: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.tasks.push(action.payload);
      },
      prepare: ({ text, category, priority, dueDate }) => ({
        payload: {
          id: nanoid(),
          text,
          category,
          priority,
          dueDate,
          completed: false,
        },
      }),
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    toggleSortPriority: (state) => {
      state.sortPriority = !state.sortPriority;
    },
  },
});

export const {
  addTask,
  removeTask,
  toggleTask,
  setFilter,
  setCategory,
  setSearch,
  toggleSortPriority,
} = tasksSlice.actions;

export default tasksSlice.reducer;





