import { model, Schema } from "mongoose";

const giftSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    condition: {
      type: String,
      required: true,
      trim: true,
    },
    posted_by: {
      type: String, // nếu sau này liên kết với user thì đổi sang mongoose.ObjectId
      required: true,
    },
    zipcode: {
      type: String,
    },
    date_added: {
      type: Number, // UNIX timestamp
      required: true,
    },
    age_days: {
      type: Number,
    },
    age_years: {
      type: Number,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Gift = model("Gift", giftSchema);
export default Gift;
