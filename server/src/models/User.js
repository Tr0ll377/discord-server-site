import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    discordId: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true
    },
    avatar: String,
    email: String,
    role: {
      type: String,
      default: 'member'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', userSchema);
