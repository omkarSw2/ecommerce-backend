const mongoose = require("mongoose");

const mongooseAggregatePaginate = require("mongoose-paginate-v2");
const VideoSchema = mongoose.Schema(
  {
    vidioFile: {
      type: String, //cloudinary url
      required: true,
    },
    thubnail: {
      type: String, //cloudinary url
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      required: true,
    },
    isPublished: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

VideoSchema.plugin(mongooseAggregatePaginate);

const Video = mongoose.model("Video", VideoSchema);

module.exports = { Video };
