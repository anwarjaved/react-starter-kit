import { EntityId, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Notification = {
	id: EntityId;
	name: string;
	description: string;
	avatar: string;
	icon: string;
	time: string;
	createdAt: number;
	type: "info" | "danger" | "primary" | "success" | "secondary" | string;
}

export const NotificationsAdapter = createEntityAdapter<Notification>({
	// Keep the "all IDs" array sorted based on book titles
	sortComparer: (a, b) => a.createdAt - b.createdAt,
});

const NotificationSlice = createSlice({
	name: "notifications",
	initialState: NotificationsAdapter.getInitialState(),
	reducers: {
	  // Can pass adapter functions directly as case reducers.  Because we're passing this
	  // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
	  addNotification: NotificationsAdapter.addOne,
	  booksReceived(state, action) {
		// Or, call them as "mutating" helpers in a case reducer
			NotificationsAdapter.setAll(state, action.payload.books);
	  },
	},
});

export const { addNotification } = NotificationSlice.actions;
export default NotificationSlice;


export const NotificationSelector = (state: RootState) => state.entities.notifications;