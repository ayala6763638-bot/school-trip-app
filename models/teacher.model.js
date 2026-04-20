import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
   id: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{9}$/, 'please enter 9-digites for the ID']
   },
   className: { type: String, required: true },
});
export default mongoose.model("teacher", teacherSchema);
