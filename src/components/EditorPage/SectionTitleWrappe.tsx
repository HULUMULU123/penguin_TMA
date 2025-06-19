import { useRef, useEffect } from "react";

export const SectionTitleWrapper = ({
  children,
  opacity,
}: {
  children: any;
  opacity: number;
}) => {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.opacity = (opacity / 100).toString();
      ref.current.style.marginBottom = `${(opacity / 100) * 21}px`;
    }
  }, [opacity]);

  return (
    <h4
      ref={ref}
      style={{
        color: "#000",
        fontFamily: "Unbounded, sans-serif",
        fontWeight: 500,
        fontSize: "15px",
        marginLeft: "0.5rem",
      }}
    >
      {children}
    </h4>
  );
};
