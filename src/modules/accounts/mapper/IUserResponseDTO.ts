interface IUserResponseDTO {
    id: string;
    name: string;
    userName: string;
    avatar: string;
    isProfessor: Boolean;
    isAdmin: Boolean;
    class_id: string;
}

export { IUserResponseDTO }