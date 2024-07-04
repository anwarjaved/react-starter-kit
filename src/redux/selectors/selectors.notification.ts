import { NotificationsAdapter } from "@slices/NotificationSlice";
import { RootState } from "@redux/store";

export const NotificationSelectors = NotificationsAdapter.getSelectors<RootState>(
	(state) => state.entities.notifications
);