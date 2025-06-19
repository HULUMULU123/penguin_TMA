// @ts-nocheck
import React, { useState, useLayoutEffect } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useDragControls,
} from "framer-motion";
import styled from "styled-components";

const SheetWrapper = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  touch-action: none;
  z-index: 1000;
  will-change: transform;
  height: 100%;
`;

const DragHandleArea = styled.div`
  height: 36px;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  cursor: grab;
  user-select: none;
`;

const DragIndicator = styled.div`
  width: 32px;
  height: 3px;
  background-color: rgba(229, 229, 229, 1);
  border-radius: 2.5px;
  margin-top: 6px;
`;

const SheetContent = styled.div`
  width: 95%;
  margin: 0 auto;
  background: white;
  height: 100%;
  overflow: auto;
`;

interface BottomSheetProps {
  children: React.ReactNode;
  peekHeightPercent?: number;
  maxHeightPercent?: number;
  isPersistent?: boolean;
  onPositionChange?: (positionPercent: number) => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  peekHeightPercent = 20,
  maxHeightPercent = 70,
  isPersistent = true,
  onPositionChange,
  setWindowHeightMain,
}) => {
  const controls = useAnimation();
  const [windowHeight, setWindowHeight] = useState(0);

  useLayoutEffect(() => {
    const updateSize = () => {
      setWindowHeight(window.innerHeight);
    };
    updateSize();

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (windowHeight === 0) return null;

  const peekHeightPx = windowHeight * (peekHeightPercent / 100);
  const maxHeightPx = windowHeight * (maxHeightPercent / 100);
  const topY = windowHeight - maxHeightPx;
  const bottomY = windowHeight - peekHeightPx;
  const dragRange = bottomY - topY;

  const getPercentFromY = (y: number) => {
    const clamped = Math.min(Math.max(y, topY), bottomY);
    const progress = 1 - (clamped - topY) / dragRange;
    setWindowHeightMain(Math.round(progress * 100));
    return Math.round(progress * 100);
  };

  const handleDrag = (_: any, info: any) => {
    const currentY = info.point.y;
    const percent = getPercentFromY(currentY);
    onPositionChange?.(percent);
  };

  const handleDragEnd = (_: any, info: any) => {
    const currentY = info.point.y;
    const percent = getPercentFromY(currentY);
    onPositionChange?.(percent);

    const middleY = (topY + bottomY) / 2;
    const snapTo = currentY < middleY ? topY : bottomY;

    controls.start({
      y: snapTo,
      transition: { type: "tween", ease: "easeOut", duration: 0.3 },
    });

    const snappedPercent = getPercentFromY(snapTo);
    onPositionChange?.(snappedPercent);
  };

  return (
    <AnimatePresence>
      {isPersistent && (
        <SheetWrapper
          drag="y"
          dragConstraints={{ top: topY, bottom: bottomY }}
          dragElastic={0.05}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
          initial={{ y: bottomY }}
          dragListener={true}
        >
          {/* Можно оставить индикатор, но drag будет работать по всей области */}
          <DragHandleArea>
            <DragIndicator />
          </DragHandleArea>
          <SheetContent>{children}</SheetContent>
        </SheetWrapper>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;

// const BottomSheet: React.FC<BottomSheetProps> = ({
//   children,
//   peekHeightPercent = 20,
//   maxHeightPercent = 70,
//   isPersistent = true,
//   onPositionChange,
//   setWindowHeightMain,
// }) => {
//   const controls = useAnimation();
//   const dragControls = useDragControls();
//   const [windowHeight, setWindowHeight] = useState(0);

//   useLayoutEffect(() => {
//     const updateSize = () => {
//       setWindowHeight(window.innerHeight);
//     };
//     updateSize();

//     window.addEventListener("resize", updateSize);
//     return () => window.removeEventListener("resize", updateSize);
//   }, []);

//   if (windowHeight === 0) return null;

//   const peekHeightPx = windowHeight * (peekHeightPercent / 100);
//   const maxHeightPx = windowHeight * (maxHeightPercent / 100);
//   const topY = windowHeight - maxHeightPx;
//   const bottomY = windowHeight - peekHeightPx;
//   const dragRange = bottomY - topY;

//   const getPercentFromY = (y: number) => {
//     const clamped = Math.min(Math.max(y, topY), bottomY);
//     const progress = 1 - (clamped - topY) / dragRange;
//     setWindowHeightMain(Math.round(progress * 100));
//     return Math.round(progress * 100);
//   };

//   const handleDrag = (_: any, info: any) => {
//     const currentY = info.point.y;
//     const percent = getPercentFromY(currentY);
//     onPositionChange?.(percent);
//   };

//   const handleDragEnd = (_: any, info: any) => {
//     const currentY = info.point.y;
//     const percent = getPercentFromY(currentY);
//     onPositionChange?.(percent);

//     const middleY = (topY + bottomY) / 2;
//     const snapTo = currentY < middleY ? topY : bottomY;

//     controls.start({
//       y: snapTo,
//       transition: { type: "tween", ease: "easeOut", duration: 0.3 },
//     });

//     const snappedPercent = getPercentFromY(snapTo);
//     onPositionChange?.(snappedPercent);
//   };

//   return (
//     <AnimatePresence>
//       {isPersistent && (
//         <SheetWrapper
//           drag="y"
//           dragListener={false}
//           dragControls={dragControls}
//           dragConstraints={{ top: topY, bottom: bottomY }}
//           dragElastic={0.05}
//           onDrag={handleDrag}
//           onDragEnd={handleDragEnd}
//           animate={controls}
//           initial={{ y: bottomY }}
//         >
//           <DragHandleArea onPointerDown={(e) => dragControls.start(e)}>
//             <DragIndicator />
//           </DragHandleArea>
//           <SheetContent>{children}</SheetContent>
//         </SheetWrapper>
//       )}
//     </AnimatePresence>
//   );
// };

// export default BottomSheet;
