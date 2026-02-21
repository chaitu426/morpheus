const LIGHT_BLOBS = [
  { w:"58vw", h:"58vw", top:"-18vw",   right:"-12vw", bg:"radial-gradient(circle,#fde68a 0%,#fef3c7 40%,transparent 70%)", anim:"blob1 20s ease-in-out infinite", blur:48, op:0.70 },
  { w:"48vw", h:"48vw", bottom:"-14vw",left:"-10vw",  bg:"radial-gradient(circle,#fcd34d 0%,#fde68a 35%,transparent 70%)", anim:"blob2 25s ease-in-out infinite", blur:55, op:0.52 },
  { w:"32vw", h:"32vw", top:"28%",     left:"32%",    bg:"radial-gradient(circle,#fef9c3 0%,#fef3c7 50%,transparent 70%)", anim:"blob3 32s ease-in-out infinite", blur:40, op:0.45 },
  { w:"22vw", h:"22vw", top:"8%",      left:"4%",     bg:"radial-gradient(circle,#fbbf24 0%,transparent 70%)",             anim:"blob4 16s ease-in-out infinite", blur:32, op:0.28 },
  { w:"40vw", h:"40vw", bottom:"4%",   right:"6%",    bg:"radial-gradient(circle,#fffbeb 0%,#fef3c7 40%,transparent 70%)", anim:"blob5 38s ease-in-out infinite", blur:50, op:0.38 },
];

const DARK_BLOBS = [
  { w:"58vw", h:"58vw", top:"-18vw",   right:"-12vw", bg:"radial-gradient(circle,#78350f 0%,#1c1917 40%,transparent 70%)", anim:"blob1 20s ease-in-out infinite", blur:48, op:0.55 },
  { w:"48vw", h:"48vw", bottom:"-14vw",left:"-10vw",  bg:"radial-gradient(circle,#92400e 0%,#78350f 35%,transparent 70%)", anim:"blob2 25s ease-in-out infinite", blur:55, op:0.40 },
  { w:"32vw", h:"32vw", top:"28%",     left:"32%",    bg:"radial-gradient(circle,#1c1917 0%,#292524 50%,transparent 70%)", anim:"blob3 32s ease-in-out infinite", blur:40, op:0.60 },
  { w:"22vw", h:"22vw", top:"8%",      left:"4%",     bg:"radial-gradient(circle,#b45309 0%,transparent 70%)",             anim:"blob4 16s ease-in-out infinite", blur:32, op:0.22 },
  { w:"40vw", h:"40vw", bottom:"4%",   right:"6%",    bg:"radial-gradient(circle,#0c0a09 0%,#1c1917 40%,transparent 70%)", anim:"blob5 38s ease-in-out infinite", blur:50, op:0.50 },
];

export default function AnimatedBackground({ isDark = false }: { isDark?: boolean }) {
  const BLOBS = isDark ? DARK_BLOBS : LIGHT_BLOBS;

  return (
    <>
      <style>{`
        @keyframes blob1     { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-40px,50px) scale(1.07)} 66%{transform:translate(25px,-25px) scale(0.96)} }
        @keyframes blob2     { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(50px,-35px) scale(1.09)} 70%{transform:translate(-20px,30px) scale(0.94)} }
        @keyframes blob3     { 0%,100%{transform:translate(0,0) scale(1)} 30%{transform:translate(-30px,-40px) scale(1.05)} 65%{transform:translate(35px,25px) scale(0.97)} }
        @keyframes blob4     { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(25px,35px) scale(1.1)} }
        @keyframes blob5     { 0%,100%{transform:translate(0,0) scale(1)} 35%{transform:translate(-25px,-30px) scale(1.04)} 70%{transform:translate(18px,18px) scale(0.96)} }
        @keyframes msgIn     { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        {BLOBS.map((b, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              width:b.w, height:b.h, top:b.top, right:b.right, bottom:b.bottom, left:b.left,
              background:b.bg, animation:b.anim, filter:`blur(${b.blur}px)`, opacity:b.op,
              transition:"background 0.8s ease, opacity 0.8s ease",
            }}
          />
        ))}
      </div>
    </>
  );
}