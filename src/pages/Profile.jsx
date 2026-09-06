// Logout button in settings
import GoBack from "../components/ui/icons/GoBack";
import { useNavigate } from "react-router";
import { useGetUserProfileQuery } from "../lib/features/apiSlice";
import ErrorInline from "../components/error/ErrorInline";
import { useInfiniteCollectionFeed } from "../hooks/useInfiniteFeed";
import { CollectionCardSkeleton } from "../components/loader/CollectionCardSkeleton";
import Settings from "../components/ui/profile/Settings";
import { useState } from "react";
import ImageForm from "../components/ui/profile/ImageForm";

// const AVATAR = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80";

const NavBar = () => {
  const Navigate = useNavigate()
  return (
    <>
        <nav
          className="flex items-center justify-between px-5 pt-12 pb-4 relative z-20"
          style={{ borderBottom: "1px solid rgba(37,99,235,0.12)" }}
        >
          <GoBack handleClick={()=> Navigate('/')}/>

          <span
            style={{
              fontSize: 13,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#4a7fba",
            }}
          >
            Profile
          </span>
        <Settings />
        </nav>
    </>
)
}

const ProfilePhoto = ({userProfile}) =>  {
  const [isOpen,setIsOpen] = useState(false);
  const openModal = () => {
      // setError("");
      setIsOpen(true);
    };

  
  const closeModal = () => {
    setIsOpen(false);
    // setIsDragging(false);
    // setPreview(null);
    // setFileName("");
    // setError("");
  };

  return (
    <>
      {/* open form */}
      {isOpen && <ImageForm closeModal={closeModal} />}
      {/* profileInfo  */}
        <div className="flex flex-col items-center pt-7 pb-2 relative z-10 px-6">
          <div className="relative">
            <div
              style={{
                position: "absolute",
                inset: -3,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #0ea5e9 100%)",
              }}
            >
              <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#030d1e" }} />
            </div>
            <img
              src={userProfile.profile_url}
              alt="Profile"
              style={{
                width: 88,
                height: 88,
                borderRadius: "50%",
                objectFit: "cover",
                position: "relative",
                zIndex: 1,
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 3,
                right: 3,
                width: 13,
                height: 13,
                borderRadius: "50%",
                background: "#22c55e",
                border: "2px solid #030d1e",
                zIndex: 2,
              }}
            />
          </div>

          <button
            className="mt-3 px-4 py-1 rounded-full border border-primary-border/40"
            style={{
              background: "rgba(37,99,235,0.15)",
              // border: "1px solid rgba(59,130,246,0.35)",
              color: "#60a5fa",
              fontSize: 11,
              letterSpacing: "0.06em",
              fontFamily: "inherit",
              cursor: "pointer",
            }}
            onClick={openModal}
          >
            Change Photo
          </button>

          <h1
            className="mt-3 text-white font-semibold"
            style={{ fontSize: 20, letterSpacing: "0.02em", fontFamily: "'Georgia', serif" }}
          >
           {userProfile.username} 
          </h1>
          <p style={{ fontSize: 13, color: "#4a7fba", letterSpacing: "0.06em", marginTop: 2 }}>
            @{userProfile.username}
          </p>

          {/* ── BIO ── */}
          <p
            className="text-center mt-3"
            style={{ fontSize: 13, color: "#7baed0", maxWidth: 270, lineHeight: 1.7, fontStyle: "italic" }}
          >
           {userProfile.bio} 
          </p>

          {/* <div className="flex items-center gap-1 mt-2" style={{ color: "#4a7fba", fontSize: 12 }}>
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#4a7fba" strokeWidth="2" fill="rgba(37,99,235,0.2)"/>
              <circle cx="12" cy="9" r="2.5" stroke="#4a7fba" strokeWidth="1.5"/>
            </svg>
            <span style={{ letterSpacing: "0.04em" }}>Reykjavik, Iceland</span>
          </div> */}
        </div>
    </>
)
}

const ProfileStat = () => (
    <>
        <div
          className="mx-5 mt-5 rounded-xl flex relative z-10 border border-primary-border/30"
          style={{
            background: "rgba(13,38,82,0.45)",
            // border: "1px solid rgba(37,99,235,0.15)",
          }}
        >
          {[
            { value: "248", label: "Saved" },
            { value: "64", label: "Visited" },
            { value: "132", label: "Uploads" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center py-3"
              style={{ borderRight: i < 2 ? "1px solid rgba(37,99,235,0.14)" : "none" }}
            >
              <span
                className="text-white font-semibold"
                style={{ fontSize: 15, fontFamily: "'Georgia', serif" }}
              >
                {stat.value}
              </span>
              <span style={{ fontSize: 10, color: "#4a7fba", letterSpacing: "0.07em", textTransform: "uppercase", marginTop: 1 }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

    </>
)

const CollectionSection = ({posts,hasMore,sentinelRef,isLoading}) => (
    <>
        <div className="mt-6 pb-10 relative z-10">
          <div className="flex items-center justify-between px-5 mb-4">
            <span
              style={{
                fontSize: 13,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#60a5fa",
              }}
            >
              Collection
            </span>
            <span style={{ fontSize: 12, color: "#2d5a8a" }}>6 places</span>
          </div>

          <div className="grid grid-cols-2 gap-3 px-5">
            {posts.map((post) => (
              <div
                key={post.id}
                className="relative rounded-2xl overflow-hidden"
                style={{
                  aspectRatio: "3/4",
                  background: "#0a1e3a",
                  border: "1px solid rgba(37,99,235,0.14)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                }}
              >
                <img
                  src={post.imgurl}
                  alt={post.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(2,11,24,0.85) 0%, transparent 55%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    right: 10,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: 11, color: "#c8dff5", fontStyle: "italic", fontFamily: "'Georgia', serif" }}>
                    {post.title}
                  </span>
                </div>
              </div>
            ))}
            {hasMore && <div ref={sentinelRef} className="h-4" />}
            {isLoading && <CollectionCardSkeleton />}
          </div>
        </div>
    </>
)

export default function ProfilePage() {
  const {data: userProfile,error: getUserProfileError} = useGetUserProfileQuery()
  const {posts,isFetching,isLoading,hasMore,sentinelRef} = useInfiniteCollectionFeed()
  console.log(posts)

  return (
    <>
    {/* <div
      className="min-h-screen flex justify-center items-start"
      style={{
        background: "linear-gradient(135deg, #020b18 0%, #041224 40%, #061a35 100%)",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    > */}
      <div
        className="relative w-full overflow-auto"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #030d1e 0%, #061528 60%, #081c38 100%)",
          boxShadow: "0 0 80px rgba(0,80,200,0.15)",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: -60,
            left: "50%",
            transform: "translateX(-50%)",
            width: 320,
            height: 200,
            background: "radial-gradient(ellipse at center, rgba(37,99,235,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── NAV BAR ── */}
        <NavBar />

        {getUserProfileError && <ErrorInline error={'Failed to retrieve details'} />}

        {/* ── PROFILE PHOTO ── */}
        { userProfile && <ProfilePhoto userProfile={userProfile} /> }
       


        {/* ── STATS ── */}
        <ProfileStat />


        {/* ── COLLECTION ── */}
        <CollectionSection 
          posts={posts} 
          hasMore={hasMore} 
          sentinelRef={sentinelRef}
          isLoading={isLoading}
           />


      </div>
    {/* </div> */}
  </>
  );
}
