export default function BoeingPlaneOverlay() {
  return (
    <>
      {/* Fixed Boeing Plane Overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="animate-plane-scroll">
          <img
            src="https://raw.createusercontent.com/fb11897a-6660-4405-ae08-21e246fa50fe/"
            alt="Boeing Aircraft"
            className="w-96 h-auto md:w-[500px] lg:w-[600px] opacity-50 object-contain"
          />
        </div>
      </div>

      {/* CSS Animation Styles */}
      <style jsx global>{`
        @keyframes plane-scroll {
          0% {
            transform: translateX(calc(100vw + 600px)) translateY(10vh);
          }
          100% {
            transform: translateX(-600px) translateY(15vh);
          }
        }
        
        .animate-plane-scroll {
          position: absolute;
          top: 0;
          left: 0;
          animation: plane-scroll 45s linear infinite;
          animation-delay: 1s;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          @keyframes plane-scroll {
            0% {
              transform: translateX(calc(100vw + 400px)) translateY(8vh);
            }
            100% {
              transform: translateX(-400px) translateY(12vh);
            }
          }
          
          .animate-plane-scroll {
            animation: plane-scroll 35s linear infinite;
          }
        }

        @media (max-width: 480px) {
          @keyframes plane-scroll {
            0% {
              transform: translateX(calc(100vw + 300px)) translateY(6vh);
            }
            100% {
              transform: translateX(-300px) translateY(10vh);
            }
          }
          
          .animate-plane-scroll {
            animation: plane-scroll 30s linear infinite;
          }
        }
      `}</style>
    </>
  );
}