import { relative } from "path";
import {
  useEffect,
  useRef,
  memo,
  FunctionComponent,
  Dispatch,
  SetStateAction,
  ReactElement,
  RefObject,
} from "react";
import { FaWindowClose } from "react-icons/fa";
import { Position } from "../types";

interface Props {
  children: ReactElement;
  position: Position | undefined;
  setPosition: Dispatch<SetStateAction<Position | undefined>>;
}

const Portal: FunctionComponent<Props> = ({
  children,
  position,
  setPosition,
}) => {
  const portalref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // close popup on document click
    const closePortal = (e: any) => {
      if (portalref.current && !portalref.current.contains(e.target))
        setPosition(undefined);
    };
    document.addEventListener("mouseup", closePortal);
    return () => {
      document.removeEventListener("mouseup", closePortal);
    };
  }, [setPosition]);

  useEffect(() => {
    if (!position || !portalref.current) return;
    setTimeout(
      () => fitOnScreen(portalref.current, position.x, position.y),
      10
    );

    let portalWidth = portalref.current.clientWidth;
    const interval = setInterval(() => {
      if (portalref?.current?.clientWidth === portalWidth) return;
      fitOnScreen(portalref.current, position.x, position.y);
      portalWidth = portalref?.current?.clientWidth || 0;
    }, 100);
    return () => clearInterval(interval);
  }, [position]);

  if (!position) return null;
  return (
    <div
      ref={portalref}
      style={{
        left: 0,
        top: 0,
        position: "fixed",
        minWidth: "100px",
        maxWidth: "min(100%, 600px)",
        zIndex: 1000,
        background: "var(--primary-light)",
        padding: "10px",
        marginTop: "14px",
        borderRadius: "5px",
        border: "1px solid #136bae",
        boxShadow: "0px 0px 10px black",
        opacity: "0",
        transition: "opacity 500ms, width 500ms, padding 100ms, left 200ms",
      }}
    >
      <FaWindowClose
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          padding: "0.3rem",
          cursor: "pointer",
          color: "var(--primary)",
        }}
        onClick={() => setPosition(undefined)}
      />
      {children}
    </div>
  );
};

const fitOnScreen = (portalEl: HTMLElement | null, x: number, y: number) => {
  // move portal up if it doesn't fit on screen
  if (!portalEl || x == null || y == null) return;
  const portal = portalEl.getBoundingClientRect();
  const windowHeight = document.documentElement.clientHeight;
  const windowWidth = document.documentElement.clientWidth;

  let up = y + 10;
  if (up < 0) {
    up = 0;
  } else {
    const bottom = up + 30 + portal.height;
    const offscreen = bottom - windowHeight;
    if (offscreen > 0) up -= offscreen;
  }

  let left = x - portal.width / 2;
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
