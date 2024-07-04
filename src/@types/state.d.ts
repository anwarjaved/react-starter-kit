interface UserState
 {	
	userInfo?: UserDto | null, 
	errors?: IdentityError[] | null,
	loading: "idle" | "pending" | "succeeded" | "failed"
}