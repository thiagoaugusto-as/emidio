export interface ICreateTaskDTO {
    discipline: string;
    description: string;
    title: string;
    pet: "1"|"2"|"3";
    validity: Date;
    class_id: string;
}