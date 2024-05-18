import { createSlice, PayloadAction, UnknownAction } from '@reduxjs/toolkit';


export enum STATUS {
  MAX_LESS_0 = "Max value can't be less than 0",
  DEF_LESS_0 = "Default value can't be less than 0",
  ALARM_LESS_0 = "Alarm value can't be less than 0",
  EQUAL = "Values can't be equal",
  MAX_LESS_DEF = "Max value can't be less then default value",
  PENDING = "Set values",
  EMPTY = "none",
}

const initialState = {
  maxValue: 10,
  defaultValue: 0,
  alarmValue: 5,
  statusMessage: STATUS.PENDING,
  count: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      if (state.count === state.maxValue) return;
      state.count += 1;
    },
    reset: (state) => {
      state.count = state.defaultValue;
    },
    setCount: (state) => {
      state.count = state.defaultValue;
      state.statusMessage = STATUS.EMPTY;
    },
    setConditions: (state, action: PayloadAction<{ value: number; tagName: string }>) => {
      const { tagName, value } = action.payload;
      if (tagName === "maxValue") {
        state.maxValue = value;
      } else if (tagName === "defaultValue") {
        state.defaultValue = value;
      } else if (tagName === "alarmValue") {
        state.alarmValue = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher<PayloadAction<{ value: number; tagName: string }>>(
      (action: UnknownAction) => {
        return action.type.startsWith("counter/setConditions");
      },
      (state, action) => {
        const { tagName, value } = action.payload;
        let status = STATUS.PENDING;

        if (tagName === "maxValue") {
          if (value < state.defaultValue) status = STATUS.MAX_LESS_DEF;
          if (value === state.defaultValue) status = STATUS.EQUAL;
          if (state.defaultValue < 0) status = STATUS.DEF_LESS_0;
          if (state.alarmValue < 0) status = STATUS.ALARM_LESS_0;
          if (value < 0) status = STATUS.MAX_LESS_0;
        }
        if (tagName === "defaultValue") {
          if (value > state.maxValue) status = STATUS.MAX_LESS_DEF;
          if (value === state.maxValue) status = STATUS.EQUAL;
          if (state.maxValue < 0) status = STATUS.MAX_LESS_0;
          if (state.alarmValue < 0) status = STATUS.ALARM_LESS_0;
          if (value < 0) status = STATUS.DEF_LESS_0;
        }
        if (tagName === "alarmValue") {
          if (state.defaultValue > state.maxValue) status = STATUS.MAX_LESS_DEF;
          if (state.defaultValue === state.maxValue) status = STATUS.EQUAL;
          if (state.defaultValue < 0) status = STATUS.DEF_LESS_0;
          if (state.maxValue < 0) status = STATUS.MAX_LESS_0;
          if (value < 0) status = STATUS.ALARM_LESS_0;
        }

        state.statusMessage = status;
      }
    );
  },
});

export const action = counterSlice.actions;
