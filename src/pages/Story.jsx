// solve some issue with comments and error handling
import { useState } from "react";
import Background from "../components/ui/Background";
import GoBack from "../components/ui/icons/GoBack";
import Menu from "../components/ui/icons/Menu";
import { useNavigate } from "react-router";
import { useLazyGetCommentsQuery, useLazyGetStoryByIdQuery, useSetCollectionMutation, useSetCommentsMutation, useSetUpvotesMutation } from "../lib/features/apiSlice";
import { useParams } from "react-router";
import useLocation from "../lib/hooks/useLocation";
import { useEffect } from "react";
import { timeAgo } from "../helper/TimeFormatter";
import ErrorInline from "../components/error/ErrorInline";

const BASE_URI = import.meta.env.VITE_BACKEND_URL

// sample Story data
// {
//     "id": "b5192417-17c8-407e-903a-bb2e12ebcb77",
//     "title": "new Story",
//     "content": "Testing story writing and other stuff for my new UI.",
//     "imgurl": "https://res.cloudinary.com/depvcf8fx/image/upload/v1774287268/uploads/psgup20po7ndhtmwfige.png",
//     "upvotes_count": 0,
//     "comments_count": 0,
//     "visitors_count": 0,
//     "upload_date": "2026-03-23T17:34:30.142Z",
//     "author_id": "8da295fa-c350-4492-95f2-2a934931a841",
//     "author_name": "let",
//     "upvoted": false
// }

// adding visitor , upvoted and comment section

function formatNumber(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n;
}

const HeroImage = ({story,upvoted,upvotesCount,handleChangeUpvote,handleCollection,collected}) => (
    <>
      <div className="relative w-full" style={{ height: "72vw", maxHeight: 420, minHeight: 240 }}>
        <img
          src={story.imgurl}
          alt="Story cover"
          className="w-full h-full object-cover"
          style={{ display: "block" }}
        />
        {/* dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(2,12,27,0.18) 0%, rgba(2,12,27,0.55) 55%, rgba(2,12,27,0.97) 100%)",
          }}
        />



        {/* image bottom info bar */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          {/* author row */}
          <div className="flex items-center gap-2 mb-3">
            <img
              src={story.authorAvatar}
              alt={story.author_name}
              className="rounded-full object-cover"
              style={{ width: 30, height: 30, border: "2px solid rgba(100,160,220,0.5)" }}
            />
            <span style={{ fontSize: 13, color: "#9fc8e8", fontFamily: "sans-serif", fontWeight: 500 }}>
              {story.author_name}
            </span>
            <span style={{ fontSize: 12, color: "#4e7ea0", fontFamily: "sans-serif" }}>·</span>
            <span style={{ fontSize: 12, color: "#4e7ea0", fontFamily: "sans-serif" }}>{story.publishedDate}</span>
            <span
              style={{
                marginLeft: "auto",
                fontSize: 11,
                color: "#3a6a8a",
                fontFamily: "sans-serif",
                background: "rgba(10,40,70,0.7)",
                padding: "2px 8px",
                borderRadius: 20,
              }}
            >
              {story.readTime}
            </span>
          </div>

          {/* stats row */}
          <div
            className="flex items-center border border-primary-border gap-1 rounded-xl px-3 py-2"
            style={{
              background: "rgba(4,21,40,0.82)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* upvotes */}
            <button
              onClick={() => handleChangeUpvote(story.id)}
              className="flex items-center gap-1 pr-3"
              style={{ borderRight: "1px solid rgba(60,120,180,0.2)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={upvoted ? "#4a9fd4" : "none"} stroke={upvoted ? "#4a9fd4" : "#4e7ea0"} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
              </svg>
              <span style={{ fontSize: 12, color: upvoted ? "#4a9fd4" : "#5a8aac", fontFamily: "sans-serif" }}>
                {formatNumber(upvotesCount)}
              </span>
            </button>

            {/* views */}
            <div className="flex items-center gap-1 px-3" style={{ borderRight: "1px solid rgba(60,120,180,0.2)" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4e7ea0" strokeWidth={2}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span style={{ fontSize: 12, color: "#5a8aac", fontFamily: "sans-serif" }}>{formatNumber(story.visitors_count)}</span>
            </div>

            {/* comments */}
            <div className="flex items-center gap-1 px-3" style={{ borderRight: "1px solid rgba(60,120,180,0.2)" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4e7ea0" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              <span style={{ fontSize: 12, color: "#5a8aac", fontFamily: "sans-serif" }}>{formatNumber(story.comments_count)}</span>
            </div>

            {/* bookmark */}
            <button
              className="flex items-center justify-center ml-auto pl-2"
              onClick={() => handleCollection(story.id)}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill={collected ? "#4e7ea0" : "none"}
                stroke="#4e7ea0"
                strokeWidth={2}
                className="transition-all duration-200"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
)

const StorySection = ({story,getStoryError}) => (
    <>
     <div className="px-5 pt-7">
        {/* category tag */}
        <div className="mb-3">
          <span
            style={{
              fontSize: 10,
              fontFamily: "sans-serif",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#3a7aa8",
              background: "rgba(30,80,130,0.18)",
              border: "1px solid rgba(60,130,200,0.2)",
              padding: "3px 10px",
              borderRadius: 4,
            }}
          >
            Deep Ocean · Science Fiction
          </span>
        </div>

        {/* title */}
        <h1
          style={{
            fontSize: 28,
            lineHeight: 1.18,
            fontWeight: 700,
            color: "#ddeefa",
            letterSpacing: "-0.02em",
            marginBottom: 20,
          }}
        >
          {story.title}
        </h1>

        {/* thin divider */}
        <div
          style={{
            width: 40,
            height: 2,
            background: "linear-gradient(90deg, #2a6aa0, transparent)",
            marginBottom: 22,
            borderRadius: 2,
          }}
        />

        {/* getStory Error */}
        {getStoryError && <ErrorInline error={'Failed to retrieve Story'}/>}

        {/* story paragraphs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* {story.paragraphs.map((para, i) => (
            <p
              key={i}
              style={{
                // fontSize: 16.5,
                lineHeight: 1.82,
                color: i === 7 ? "#7ec8f4" : "#8dafc8",
                fontStyle: i === 7 ? "italic" : "normal",
                fontWeight: i === 7 ? 600 : 400,
                fontSize: i === 7 ? 20 : 16.5,
                textAlign: "justify",
                letterSpacing: "0.01em",
              }}
            >
              {para}
            </p>
          ))} */}
            <p
              style={{
                // fontSize: 16.5,
                lineHeight: 1.82,
                color: 1 === 7 ? "#7ec8f4" : "#8dafc8",
                fontStyle: 1 === 7 ? "italic" : "normal",
                fontWeight: 1 === 7 ? 600 : 400,
                fontSize: 1 === 7 ? 20 : 16.5,
                textAlign: "justify",
                letterSpacing: "0.01em",
              }}
              className="whitespace-pre-line"
            >
            {story.content}
            </p>
        </div>

        {/* end flourish */}
        <div className="flex items-center justify-center gap-3 py-10">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{
                width: i === 1 ? 6 : 4,
                height: i === 1 ? 6 : 4,
                borderRadius: "50%",
                background: i === 1 ? "#2a6090" : "#1a4060",
              }}
            />
          ))}
        </div>
      </div>
    </>
)

const CommentSection = ({comments,getCommentError}) => (
    <>
   <div
        className="px-5 pt-2 pb-6"
        style={{ borderTop: "1px solid rgba(40,90,140,0.25)" }}
      >
        <h2
          style={{
            fontSize: 15,
            fontFamily: "sans-serif",
            fontWeight: 700,
            color: "#6a9dbd",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 20,
            marginTop: 8,
          }}
        >
          {comments.length} Comments
        </h2>
        {/* GetComment Error */}
        {getCommentError && <ErrorInline error={'Failed to retrieve Comments'} />}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {comments.map(c => (
            <div
              key={c.id}
              className="rounded-xl p-4 border border-primary-border"
              style={{
                background: "rgba(6,25,50,0.6)",
                // border: "1px solid rgba(40,90,140,0.2)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={c.avatar}
                  alt={c.author_name}
                  className="rounded-full object-cover"
                  style={{ width: 28, height: 28 }}
                />
                <span style={{ fontSize: 13, fontFamily: "sans-serif", fontWeight: 600, color: "#7fb3d0" }}>
                  {c.author_name}
                </span>
                <span style={{ marginLeft: "auto", fontSize: 11, color: "#2e5a7a", fontFamily: "sans-serif" }}>
                  {timeAgo(c.date)}
                </span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "#6a94b0", fontFamily: "sans-serif" }}>
                {c.comment}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2e5a7a" strokeWidth={2}>
                  <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
                  <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                </svg>
                <span style={{ fontSize: 11, color: "#2e5a7a", fontFamily: "sans-serif" }}>{c.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
)

const StickyCommentBar = ({commentText,setCommentText,handleSubmitComment}) => (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 px-4 py-3 bg-transparent "
        style={{
          // background: "rgba(3,14,30,0.97)",
          // borderTop: "1px solid rgba(40,100,160,0.3)",
          // backdropFilter: "blur(16px)",
        }}
      >
        <div
          className="flex items-center gap-2 rounded-2xl px-3 py-2 backdrop-blur-lg border border-primary-border/40"
          style={{
            background: "rgba(8,28,55,0.9)",
            // border: "1px solid rgba(50,110,180,0.3)",
          }}
        >
          <img
            src="https://i.pravatar.cc/150?img=68"
            alt="You"
            className="rounded-full object-cover shrink-0"
            style={{ width: 28, height: 28 }}
          />
          <input
            type="text"
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmitComment()}
            placeholder="Share your thoughts…"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 14,
              color: "#8ab8d4",
              fontFamily: "sans-serif",
              caretColor: "#4a9fd4",
            }}
          />
          <button
            onClick={handleSubmitComment}
            disabled={!commentText.trim()}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: commentText.trim()
                ? "linear-gradient(135deg, #1a5a8a, #2a7dbc)"
                : "rgba(20,50,80,0.4)",
              border: "none",
              cursor: commentText.trim() ? "pointer" : "default",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8ccde8" strokeWidth={2.5}>
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </>
)

const TopNavBar = () => {
  const Navigate = useNavigate()
  return (
  <>
        <div className="absolute top-0 left-0 z-20 right-0 flex items-center justify-between px-4 pt-5">
          {/* <button
            className="flex items-center justify-center rounded-full w-9 h-9"
            style={{ background: "rgba(4,21,40,0.7)", border: "1px solid rgba(100,160,220,0.2)" }}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#7fb3d3" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="flex items-center justify-center rounded-full w-9 h-9"
            style={{ background: "rgba(4,21,40,0.7)", border: "1px solid rgba(100,160,220,0.2)" }}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#7fb3d3" strokeWidth={2}>
              <circle cx="12" cy="12" r="1" fill="#7fb3d3" />
              <circle cx="19" cy="12" r="1" fill="#7fb3d3" />
              <circle cx="5" cy="12" r="1" fill="#7fb3d3" />
            </svg>
          </button> */}
          <GoBack handleClick={()=> Navigate('/')} />
          <Menu />
        </div>
  </>
)
}

export default function StoryPage() {
  
  const [triggerGetStory,{data: getStoryResponse,error: getStoryError}] = useLazyGetStoryByIdQuery()
  const story = getStoryResponse?.data?.post
  const [triggerSetUpvotesApi] = useSetUpvotesMutation()
  // setUpvoteError
  const [triggerSetCommentsApi] = useSetCommentsMutation()
  // setCommentsError
  const [triggerGetCommentsApi,{data: getCommentsResponse,error: getCommentError}] = useLazyGetCommentsQuery()
  const comments = getCommentsResponse?.data?.comments

  // collection
  const [triggerSetCollectionApi,{error: setCollectionError}] = useSetCollectionMutation()


  const [commentText, setCommentText] = useState("");
  const [upvoted, setUpvoted] = useState(false);
  const [collected,setCollected] = useState(false)
  const [upvotesCount, setUpvotesCount] = useState(null);
  const {location: userLocation} = useLocation()
  const {id: postId} = useParams()

    useEffect(() => {
        if (userLocation.latitude && userLocation.longitude) {
          // check if postId is not string i mean it should be number
            if (postId) {
              ( async() => await triggerGetStory({location: userLocation,postId}))();
              ( async() => await triggerGetCommentsApi(postId))();
              // get comments api
          }
      }
  },[userLocation,postId,triggerGetStory])

  useEffect(()=>{
    if (story) {
      setUpvoted(story.upvoted)
      setUpvotesCount(story.upvotes_count)
      setCollected(story.collected)
    }
  },[story])

  useEffect(()=>{
    // need to handle error in here.
    // I can handle with redux later on
    try {
      async function handleVisitors (postId){
        const request = await fetch(`${BASE_URI}/img/visitors`,{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({postId})
        })
        const response = await request.json()
        if (response.error){
          throw new Error(response.error)
        }
      }
    const timerId = setTimeout(()=> {
      if(postId){
        handleVisitors(postId) 
      }
    },5000)

    return () => clearTimeout(timerId)

    } catch (error) {
      console.error(error)
    }
  },[postId])

  function handleChangeUpvote(postId) {
      const next = upvoted ? ('none'):('upvoted')
      setUpvoted(prev=>!prev)
      setUpvotesCount(u => next == 'none' ? u - 1 : u + 1)
      triggerSetUpvotesApi({react_type: next,imgid: postId})
  }

  function handleSubmitComment() {
    // not used yet
    const trimmed = commentText.trim();
    if (!trimmed) return;
    triggerSetCommentsApi({comment: commentText,postid: postId})
    setCommentText("");
  }

  async function handleCollection(postId) {
    setCollected(prev=> !prev)
    await triggerSetCollectionApi(postId)
  }



  return (
    <Background>
    {/* <div
      className="min-h-screen pb-24"
      style={{
        background: "linear-gradient(160deg, #020c1b 0%, #041528 60%, #061d36 100%)",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        color: "#c8d8e8",
      }}
    > */}

      <section className="pb-24 overflow-auto">
        <TopNavBar />

        {/* ── HERO IMAGE ── */}


        {/* ── TITLE & STORY ── */}
              {story ? (
                  <>
                  <HeroImage 
                    story={story} 
                    upvoted={upvoted} 
                    upvotesCount={upvotesCount} 
                    handleChangeUpvote={handleChangeUpvote}
                    handleCollection={handleCollection}
                    collected={collected}
                     />
                  <StorySection story={story} getStoryError={getStoryError} />
                  </>
              ) : (
                  <div>
                   Story Not Available Yet 
                  </div>
        )}
  

        {/* ── COMMENTS SECTION ── */}
        {comments && <CommentSection comments={comments} getCommentError={getCommentError} />}

        {/* ── STICKY COMMENT BAR ── */}
        </section>

      <StickyCommentBar commentText={commentText} setCommentText={setCommentText} handleSubmitComment={handleSubmitComment} />

    {/* </div> */}
  </Background>
  );
}