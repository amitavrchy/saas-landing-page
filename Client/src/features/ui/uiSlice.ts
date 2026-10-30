import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  mobileNavOpen: boolean;
  pricingYearly: boolean;
};

const initialState: UiState = {
  mobileNavOpen: false,
  pricingYearly: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobileNavOpen(state, action: PayloadAction<boolean>) {
      state.mobileNavOpen = action.payload;
    },
    toggleMobileNav(state) {
      state.mobileNavOpen = !state.mobileNavOpen;
    },
    setPricingYearly(state, action: PayloadAction<boolean>) {
      state.pricingYearly = action.payload;
    },
    togglePricingYearly(state) {
      state.pricingYearly = !state.pricingYearly;
    },
  },
});

export const {
  setMobileNavOpen,
  toggleMobileNav,
  setPricingYearly,
  togglePricingYearly,
} = uiSlice.actions;

export default uiSlice.reducer;
