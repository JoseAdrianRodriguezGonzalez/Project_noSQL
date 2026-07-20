import { Student } from "./model/student.js";
import { redisB } from "./config/redis.js";
export const create=async(student)=>{ //Create
    return await Student.create(student);
}

//Read
export const get=async({skip=0, limit=0}={})=>{
    if(limit>0){
        return await Student.find().skip(skip).limit(limit);
    }
    return await Student.find();
}
//Update
export const update=async(filter,student)=>{
    return await Student.updateOne(filter,student);
}
//Delete
export const deletes=async(student)=>{
    return await Student.deleteOne(student)
}
export const getTotalCount = async () => {
    return await Student.countDocuments();
};
