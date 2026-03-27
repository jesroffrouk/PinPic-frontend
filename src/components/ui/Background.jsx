export default function Background({children}) {
  return (
    <div className="h-dvh bg-slate-950 flex justify-center">
    <div
      className="relative w-full h-full  flex flex-col overflow-hidden font-sans text-slate-200 "
      style={{
        backgroundColor: "#050d1f",
        backgroundImage: `
          radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,0.45), transparent),
          radial-gradient(ellipse 60% 50% at 10% 90%, rgba(15,40,100,0.6), transparent),
          radial-gradient(ellipse 60% 50% at 90% 90%, rgba(10,30,80,0.5), transparent)
        `,
      }}
    >
        {children}
    </div>
</div>
  );
}