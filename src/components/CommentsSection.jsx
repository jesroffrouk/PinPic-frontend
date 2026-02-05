import { useEffect, useState } from 'react';
import { useGetCommentsQuery, useSetCommentsMutation } from '../lib/features/apiSlice';

export default function CommentsSection({comments_count, imgid }) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {data:comments} = useGetCommentsQuery(imgid);
    //  make a call for adding comments and showing comment too with rtk query offcourse
  const [triggerSetComments] = useSetCommentsMutation();
  const handleSubmit = async() => {
    if (!newComment.trim()) return;
    let body = JSON.stringify({
          comment: newComment,
          postid: imgid,
        }
      )
    setIsSubmitting(true);
    await triggerSetComments(body)
    setIsSubmitting(false)
    setNewComment('')
  };


  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Comments Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Comments
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {comments_count} comments
        </p>
      </div>

      {/* Add Comment Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              YO
            </div>
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows="3"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
            <div className="mt-3 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={!newComment.trim() || isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 disabled:transform-none"
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments && comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all hover:shadow-xl"
          >
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  {comment.avatar}
                </div>
              </div>

              {/* Comment Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {comment.author_name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {comment.date}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  {comment.comment}
                </p>

                {/* Comment Actions */}
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span className="text-sm font-medium">{comment.likes}</span>
                  </button>
                  <button className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Comments Button */}
      <div className="mt-8 text-center">
        <button className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold px-8 py-3 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 transition-all duration-300 transform hover:scale-105">
          View All {comments_count} Comments
        </button>
      </div>
    </div>
  );
}