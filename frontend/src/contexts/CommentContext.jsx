import { createContext, useContext, useState, useCallback } from 'react';

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [editingComment, setEditingComment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const startEditing = useCallback((comment) => {
    setEditingComment(comment);
    setIsEditing(true);
  }, []);

  const stopEditing = useCallback(() => {
    setIsEditing(false);
    setEditingComment(null);
  }, []);

  const value = {
    editingComment,
    isEditing,

    startEditing,
    stopEditing,

    isEditingComment: (commentId) =>
      isEditing && editingComment?._id === commentId,
  };

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
};

export const useComment = () => {
  const context = useContext(CommentContext);

  if (!context) {
    throw new Error('useComment must be used within a CommentProvider');
  }

  return context;
};
