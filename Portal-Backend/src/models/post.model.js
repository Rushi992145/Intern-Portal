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
        requiredSkills: [{
            skill: String,
        }],
        applicationLink : {
            type:String,
            required: true
        }
    }
)

postSchema.plugin(mongooseAggregatePaginate)

export const Post = mongoose.model("Post",postSchema);