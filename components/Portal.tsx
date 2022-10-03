import { useEffect, useRef, memo, FunctionComponent } from "react";

interface Props {
  children: ReactElement;
  open: boolean;
  setOpen: SetState<boolean>;
  portalData: { x: number; y: number; content: string };
}

const Portal: FunctionComponent<Props> = ({
  children,
  open,
  setOpen,
  portalData,
}) => {
  const portalref = useRef(null);

  useEffect(() => {
    // close popup on document click
    const closePortal = (e: any) => {
      if (portalref.current && !portalref.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mouseup", closePortal);
    return () => {
      document.removeEventListener("mouseup", closePortal);
    };
  }, [setOpen]);

  useEffect(() => {
    if (!open || !portalref.current) return;
    setTimeout(() => fitPortalOnScreen(portalref.current, portalData), 10);

    // this isn't pretty, but we can't know when the portal reaches its full size.
    // Supposedly this should also be possible with the resizeObserver API, but not
    // sure that's sufficiently supported yet (especially considering RStudio)
    let portalWidth = portalref.current.clientWidth;
    const interval = setInterval(() => {
      if (portalref.current.clientWidth === portalWidth) return;
      fitPortalOnScreen(portalref.current, portalData);
      portalWidth = portalref.current.clientWidth;
    }, 100);
    return () => clearInterval(interval);
  }, [open, portalData]);

  if (!open) return null;
  return (
    <div
      ref={portalref}
      style={{
        left: 0,
        top: 0,
        position: "fixed",
        minWidth: "300px",
        maxWidth: "min(100%, 600px)",
        zIndex: 1000,
        background: "#dfeffb",
        padding: "10px",
        marginTop: "14px",
        borderRadius: "5px",
        border: "1px solid #136bae",
        opacity: "0",
        transition: "opacity 250ms, width 250ms, padding 100ms, left 50ms",
      }}
    >
      {children}
    </div>
  );
};

const fitPortalOnScreen = (portalEl: HTMLElement, portalData) => {
  // move portal up if it doesn't fit on screen
  if (!portalEl || !portalData) return;
  const portal = portalEl.getBoundingClientRect();
  const windowHeight = document.documentElement.clientHeight;
  const windowWidth = document.documentElement.clientWidth;

  let up = portalData.y + 10;
  if (up < 0) {
    up = 0;
  } else {
    const bottom = up + 30 + portal.height;
    const offscreen = bottom - windowHeight;
    if (offscreen > 0) up -= offscreen;
  }

  let left = portalData.x - portal.width / 2;
  if (left < 0) {
    left = 0;
  } else {
    const right = left + portal.width;
    const offscreen = right - windowWidth;
    if (offscreen > 0) left -= offscreen;
  }

  portalEl.style.opacity = "1";
  portalEl.style.left = `${left}px`;
  portalEl.style.top = `${up}px`;
};

export default memo(Portal);
