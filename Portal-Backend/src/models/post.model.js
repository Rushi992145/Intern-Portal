import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const postSchema = new Schema(
    {
        owner : {
            type : Schema.Types.ObjectId,
            ref: "User"
        },
        role: {
            type : String,
            required: true
        },
        companyName: {
            type : String,
            required : true
        },
        description: {
            type : String,
            required: true
        },
        impression: {
            type: Number,
        },
        requiredSkills: {
            type: [String],
            required: true
        },
        applicationLink : {
            type:String,
            required: true
        },
        opportunityType :{
            type:String,
            required:true
        },
        salary : {
            type:Number
        }
    },{timestamps:true}
)

postSchema.plugin(mongooseAggregatePaginate)

export const Post = mongoose.model("Post",postSchema);