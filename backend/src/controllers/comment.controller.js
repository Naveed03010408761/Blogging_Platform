import Comment from "../models/comment.models.js";
import apiError from "../ultils/apiError.js";
import apiResponse from "../ultils/apiResponse.js";
import asyncHandler from "../ultils/asyncHandler.js";

const makeComment = asyncHandler(async (req, res) => {
  const { content, postId } = req.body;

  if (!content) {
    throw new apiError(400, "Content is required.");
  }
  if (!postId) {
    throw new apiError(400, "Post ID is required.");
  }

  const comment = await Comment.create({
    user: req.user._id,
    post: postId,
    content,
  });

  res
    .status(201)
    .json(new apiResponse(201, "Comment created successfully", comment));
});

const updateComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { commentId } = req.params; 

  if (!content) {
    throw new apiError(400, "Content is required.");
  }

  const comment = await Comment.findByIdAndUpdate(
    commentId,
    { content },
    { new: true } // return updated doc
  );

  if (!comment) {
    throw new apiError(404, "Comment not found.");
  }

  return res
    .status(200)
    .json(new apiResponse(200, "Comment updated successfully.", comment));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findByIdAndDelete(id);

  if (!comment) {
    throw new apiError(404, "Comment not found.");
  }

  return res
    .status(200)
    .json(new apiResponse(200, "Comment deleted successfully.", comment));
});

const getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find(); 

  if (!comments || comments.length === 0) {
    throw new apiError(404, "No comments found.");
  }

  return res
    .status(200)
    .json(new apiResponse(200, "Comments fetched successfully.", comments));
});

const getCommentByPostId = asyncHandler(async(req,res)=>{
  const {postId} = req.params;
  const comments = await Comment.find({post: postId});

   if (!comments || comments.length === 0) {
    throw new apiError(404, "No comments found for this post.");
  }

  return res
  .status(200)
  .json( new apiResponse(200, "comments fetched successfully",comments));
})




export {makeComment, updateComment, deleteComment, getAllComments, getCommentByPostId};


