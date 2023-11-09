import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, {
    ElementRef,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { useMediaQuery } from "usehooks-ts";
import { UserItem } from "./user-item";

export const Navigation = () => {
    const pathname = usePathname();

    const isMobile = useMediaQuery("(max-width: 768px)");

    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    const resetWidth = useCallback(() => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100% - 240px)",
            );
            navbarRef.current.style.setProperty(
                "left",
                isMobile ? "100%" : "240px",
            );
            setTimeout(() => setIsResetting(false), 300);
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile, resetWidth]);

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [pathname, isMobile]);

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty(
                "width",
                `calc(100% - ${newWidth}px)`,
            );
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    return (
        <>
            <aside
                ref={sidebarRef}
                className={cn(
                    "group/sidebar relative z-[99999] flex h-full w-60 flex-col overflow-y-auto bg-secondary",
                    isResetting && "transition-all duration-300 ease-in-out",
                    isMobile && "w-0",
                )}
            >
                <div
                    onClick={collapse}
                    role="button"
                    className={cn(
                        "absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600",
                        isMobile && "opacity-100",
                    )}
                >
                    <ChevronsLeft className="h-6 w-6" />
                </div>
                <div>
                    <UserItem />
                </div>
                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100"
                />
                <div>Navigation</div>
            </aside>
            <div
                ref={navbarRef}
                className={cn(
                    "absolute left-60 top-0 z-[99999] w-[calc(100%-240px)]",
                    isResetting && "transition-all duration-300 ease-in-out",
                    isMobile && "left-0 w-full",
                )}
            >
                {/* {!!params.documentId ? (
          <Navbar
            isCollapsed={isCollapsed}
            onResetWidth={resetWidth}
          />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && <MenuIcon onClick={resetWidth} role="button" className="h-6 w-6 text-muted-foreground" />}
          </nav>
        )} */}
                <nav className="w-full bg-transparent px-3 py-2">
                    {isCollapsed && (
                        <MenuIcon
                            onClick={resetWidth}
                            role="button"
                            className="h-6 w-6 text-muted-foreground"
                        />
                    )}
                </nav>
            </div>
        </>
    );
};
