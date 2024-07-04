import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import UISlice from "@slices/UISlice";
import NotificationSlice, { NotificationsAdapter } from "@slices/NotificationSlice";
import AuthSlice from "./slices/AuthSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import api from "./apiSlices/api";


const entities = combineReducers({
	notifications: NotificationSlice.reducer
}
);

export const store = configureStore({
	reducer: {
		[UISlice.name]: UISlice.reducer,
		[AuthSlice.name]: AuthSlice.reducer,
		[api.reducerPath]: api.reducer,
		entities: entities
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware).concat(logger),
	devTools: process.env.NODE_ENV !== "production"
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

