const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const { User } = require("../models/user.models");

const registerUser = asyncHandler(async (req, res) => {
  /**
   * Get Data From Frontend
   * Validation
   * Cheack if User Alredy Exists:{username,Email}
   * Check Avaar && Check Cover Image
   * Upload on Clodinary ,check Avatar from Cloudiinary
   * Create And Store Data
   * remove Pass & refresh Toke
   * return Responce
   *  */
  const { username, email, fullname, password } = req.body;
  // validation
  if (
    [fullname, email, username, password].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "All Fields Are Required");
  }

  // find user Exist
  const ExistedUser = await User.findOne({ $or: [{ username }, { email }] });

  if (ExistedUser) {
    throw new ApiError(409, "User With Email OR Username is Alredy Exist ");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const CoverImageLocalPath = req.files?.coverImage[0]?.path;

  let CoverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    CoverImageLocalPath = req.files?.coverImage[0]?.path;
  }
  // Image Validation
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar File is Require ");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(CoverImageLocalPath);
  console.log("avatar", avatar);

  if (!avatar) {
    throw new ApiError(400, "Avatar File is Require ");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const crateduser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!crateduser) {
    throw new ApiError(500, "Some Thing Went Wrong While Registering User");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, crateduser, "User Register Successfully .!"));
});
module.exports = { registerUser };
