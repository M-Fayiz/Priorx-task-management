const ConstAPI={
    AUTH:{
        REGISTER:'/auth/signup',
        VERIFY_EMAIL:'/auth/verify-email',
        LOGIN:'/auth/login',
        LOGOUT:'/auth/logout',
        AUTH_ME:'/auth/me',
        REFRESH_TOKEN:'/auth/refresh-token'
    },
    TASK:{
        CREATE:'/tasks/create',
        FETCH:(userId:string)=>`/tasks/user/${userId}`,
        DELETE:(taskId:string,userId:string)=>`/tasks/${taskId}/user/${userId}`,
        UPDATE_TASK:(taskId:string)=>`/tasks/${taskId}`,
        DASH_DATA:(userId:string)=>`/tasks/dashboard/${userId}`,
    }
}

export default ConstAPI