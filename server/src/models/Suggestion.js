import mongoose from 'mongoose';

const suggestionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    username: {
      type: String,
      required: true
    },
    avatar: String,
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    votes: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: 'open'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Suggestion', suggestionSchema);
