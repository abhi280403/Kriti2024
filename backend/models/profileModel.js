
import mongoose from "mongoose";

const ProfileSchema = mongoose.Schema({
  imagePath : {
    type : String,
  },
  imageName : {
    type: String
  },
  userid: {
    type: String,
    required: true,
    unique: true
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  institute: { type: String, required: true },
  course: { type: String, required: true },
  interest: { type: String, required: true },
  branch: { type: String, required: true },
  skills: [
    {
      skill: { type: String, required: true  },
      level: { type: String, required: true },
      experience: { type: String, required: true },
      tools: { type: String, required: true }
    }
  ]
}, { timestamps: true });

export default mongoose.model('Profile', ProfileSchema);
