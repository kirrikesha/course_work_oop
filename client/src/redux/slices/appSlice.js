import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllCategories = createAsyncThunk(
  'app/categories',
  async (userId, thunkAPI) => {
    const colors = await fetch('http://localhost:8080/api/category').then(response => {
      if (response.ok) {
        return response.json()
      }

      return response.json().then(error => {
        const e = new Error('Smth gone wrong')
        e.data = error
        throw e
      })
    });

    return colors
  }
);

export const getAllColors = createAsyncThunk(
  'app/colors',
  async (userId, thunkAPI) => {
    const colors = await fetch('http://localhost:8080/api/color').then(response => {
      if (response.ok) {
        return response.json()
      }

      return response.json().then(error => {
        const e = new Error('Smth gone wrong')
        e.data = error
        throw e
      })
    });

    return colors
  }
);

export const getFavoriten = createAsyncThunk(
  'app/favoriten',
  async (userId, thunkAPI) => {
    const favorites = await fetch(`http://localhost:8080/api/product/fav/${userId}`).then(response => {
      if (response.ok) {
        return response.json()
      }

      return response.json().then(error => {
        const e = new Error('Smth gone wrong')
        e.data = error
        throw e
      })
    });

    return favorites
  }
);

const appSlice = createSlice({
  name: 'app',
  initialState: {
    token: null,
    userId: null,
    isAdmin: false,
    email: '',
    favorite: [],
    loading: false,
    allColors: [],
    allCategories: []
  },
  reducers: {
    changeUserRole(state, { payload }) {
      state.isAdmin = payload;
    },
    changeUserEmail(state, { payload }) {
      state.email = payload;
    },
    logout(state) {
      state.favorite = [];
      state.userId = null;
      state.token = null;
      state.email = '';
      state.isAdmin = false
    },
    changeLoading(state, { payload }) {
      state.loading = payload;
    },
    changeUserId(state, { payload }) {
      state.userId = payload;
    },
    changeToken(state, { payload }) {
      state.token = payload;
    },
    
  },
  extraReducers: builder => {
    builder.addCase(getFavoriten.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getAllColors.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getAllCategories.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getFavoriten.fulfilled, (state, {payload: data}) => {
      state.favorite = data;
      state.loading = false;
    })
    builder.addCase(getAllColors.fulfilled, (state, { payload: data }) => {
      state.allColors = data;
      state.loading = false;
    })
    builder.addCase(getAllCategories.fulfilled, (state, { payload: data }) => {
      state.allCategories = data;
      state.loading = false;
    })
  }
})

export default appSlice.reducer

export const { changeUserRole, changeUserEmail, logout, changeLoading, changeUserId, changeToken } = appSlice.actions