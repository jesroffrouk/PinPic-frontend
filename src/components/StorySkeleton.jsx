import React from 'react';

export default function StorySkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <article className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Image Skeleton */}
        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl mb-8 bg-gray-300 dark:bg-gray-700 animate-pulse">
          {/* Title Overlay Skeleton at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            {/* Title Skeleton */}
            <div className="space-y-3 mb-4">
              <div className="h-10 bg-gray-400 dark:bg-gray-600 rounded w-3/4"></div>
              <div className="h-10 bg-gray-400 dark:bg-gray-600 rounded w-1/2"></div>
            </div>
            
            {/* Author Info Skeleton */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600"></div>
              <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-32"></div>
              <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-24"></div>
              <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-20"></div>
            </div>
          </div>
        </div>

        {/* Story Content Skeleton */}
        <div className="mt-12 space-y-6">
          {/* Paragraph 1 */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
          </div>

          {/* Paragraph 2 */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5 animate-pulse"></div>
          </div>

          {/* Paragraph 3 */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
          </div>

          {/* Paragraph 4 */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
          </div>

          {/* Paragraph 5 */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 flex items-center justify-center">
          <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
        </div>

        {/* CTA Section Skeleton */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
          <div className="flex flex-col items-center">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-64 mb-3 animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-96 mb-6 animate-pulse"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded-lg w-40 animate-pulse"></div>
          </div>
        </div>
      </article>

      {/* Comments Section Skeleton */}
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Comments Header Skeleton */}
        <div className="mb-8">
          <div className="h-9 bg-gray-300 dark:bg-gray-700 rounded w-40 mb-2 animate-pulse"></div>
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
        </div>

        {/* Add Comment Section Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            <div className="flex-1 space-y-3">
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              <div className="flex justify-end">
                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg w-32 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments List Skeleton */}
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex gap-4">
                {/* Avatar Skeleton */}
                <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>

                {/* Comment Content Skeleton */}
                <div className="flex-1 space-y-3">
                  {/* Author and Date */}
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                  </div>

                  {/* Comment Text */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-1">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Comments Button Skeleton */}
        <div className="mt-8 text-center">
          <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-64 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}