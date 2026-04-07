// CollectionSkeleton.jsx
export function CollectionCardSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 px-5">

      <SkeletonCard delay={0}   opacity={1}    />
      <SkeletonCard delay={150} opacity={1}    />
      <SkeletonCard delay={300} opacity={0.6}  />
      <SkeletonCard delay={450} opacity={0.6}  />
      <SkeletonCard delay={600} opacity={0.25} />

    </div>
  );
}

function SkeletonCard({ delay, opacity}) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        aspectRatio: "3/4",
        background: "#0a1e3a",
        border: "1px solid rgba(37,99,235,0.14)",
        opacity,
      }}
    >
      <div className="skeleton-shimmer absolute inset-0"
        style={{ animationDelay: `${delay}ms` }} />

      <div style={{ position:"absolute", bottom:10, left:10, right:10,
        display:"flex", alignItems:"flex-end", justifyContent:"space-between" }}>
        <div className="skeleton-shimmer"
          style={{ width:"60%", height:10, borderRadius:4,
            animationDelay: `${delay}ms` }} />
        <div style={{ width:16, height:16, borderRadius:"50%",
          background:"#1a3358" }} />
      </div>
    </div>
  );
}