import { model, Schema } from 'mongoose';

export interface ICard {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId;
  createdAt: Date;
}

// const likeSchema = new Schema({
//   card: {
//     type: Schema.Types.ObjectId,
//     ref: 'card',
//     required: true
//   },
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'user',
//     required: true
//   }
// });

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// const Like = model('like', likeSchema);

// cardSchema.virtual('likes', {
//   ref: 'like',
//   localField: '_id',
//   foreignField: 'card'
// });

export default model<ICard>('card', cardSchema);
