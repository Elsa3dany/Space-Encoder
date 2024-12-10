export default function Meteors() {
  return (
    <div className="fixed inset-0 -z-10">
      {[...Array(20)].map((_, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
          style={{
            top: '0px',
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 1 + 's',
            animationDuration: Math.random() * 2 + 3 + 's',
          }}
        >
          <span className="absolute left-1/2 top-1/2 h-[1px] w-[50px] -translate-x-[70%] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      ))}
    </div>
  );
}