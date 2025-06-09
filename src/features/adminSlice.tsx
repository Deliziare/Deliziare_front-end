
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/api/axiosInstance';

export interface deliveryBoy {
  _id: string;
  name: string;
  email: string;
  phone: number;
  role: string;
  isBlock: boolean;
}

export interface popularChef{
  chefId:string;
  name:string;
  email:string;
  profileImage:string;
  acceptedBids:number;
}

interface deliveryBoyState {
  deliveryBoy: deliveryBoy[];
  loading: boolean;
  error: string | null;
  popularChef:popularChef[];
  chefLoading:boolean;
  chefError:string|null;
}

const initialState: deliveryBoyState = {
  deliveryBoy: [],
  loading: false,
  error: null,
  popularChef:[],
  chefLoading:false,
  chefError:null
};


export const fetchDeliveryBoy = createAsyncThunk("deliveryBoy/fetchDeliveryBoy", async () => {
  const response = await axiosInstance.get("/admin/deliveryBoy");
  return response.data;
});

export const toggleBlockStatus = createAsyncThunk(
  "hosts/toggleBlockStatus",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/admin/deliveryBoy/${userId}/block`);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to toggle status");
    }
  }
);


export const getpopularChef=createAsyncThunk(
  "admin/popularchef",
  async ( _,{ rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/popularChef');
      console.log('popular chefs',response.data);
      
      return response.data; 
      
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch popular chefs");
    }
  }
);


const hostSlice = createSlice({
  name: "deliveryBoy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryBoy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveryBoy.fulfilled, (state, action: PayloadAction<deliveryBoy[]>) => {
        state.loading = false;
        state.deliveryBoy = action.payload;
        
        
      })
      .addCase(fetchDeliveryBoy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
     .addCase(toggleBlockStatus.fulfilled, (state, action) => {
        const updatedUser = action.payload.user;
        const index = state.deliveryBoy.findIndex(user => user._id === updatedUser._id);
        if (index !== -1) {
            state.deliveryBoy[index] = updatedUser;
        }
        })
        .addCase(getpopularChef.pending,(state)=>{
          state.chefLoading=true;
          state.chefError=null;
        })
      .addCase(getpopularChef.fulfilled,(state,action:PayloadAction<popularChef[]>)=>{
        state.loading=false;
        state.popularChef=action.payload
      })
      .addCase(getpopularChef.rejected,(state,action)=>{
        state.chefError=action.payload as string;
      })

  }
});

export default hostSlice.reducer;
