import React, { useRef, useEffect, useState } from "react";
import events, { Event } from "@/public/events";
import styles from "./timeline.module.css";

const Timeline = () => {
	// save canvas DOM element as a ref
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvasWrapRef = useRef<HTMLDivElement>(null);

	// related to zooming and scrolling
	const [scale, setScale] = useState(1);
	const [scroll, setScroll] = useState(0);
	const canvasWidth = scale * (events.length + 1) * 100;

	// redraw canvas when scale changes
	useEffect(() => {
		//draw canvas
		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.clearRect(0, 0, canvasWidth, canvas.height);
				// draw the line
				ctx.fillStyle = "#f4f4f4";
				ctx.fillRect(0, 48, canvasWidth, 4);
				// draw the time nodes
				let elementOrder = 0;
				for (let event of events) {
					let color = event.rank === "major" ? "#000" : "#bbb";
					drawDiamond(ctx, (elementOrder + 1) * 100 * scale, 50, 5, color);
					elementOrder++;
				}
			}
		}
		//adjust to the mouse pointer
		const canvasWrap = canvasWrapRef.current;
		if (canvasWrap) {
			canvasWrap.scrollLeft = scroll;
		}
	}, [scale]);

	// event handler for button zooming
	const handleButtonZoom = (e: React.MouseEvent<HTMLButtonElement>) => {
		let newScale;
		if (e.currentTarget.name === "out") {
			if (scale <= 1) {
				return;
			} else {
				newScale = scale - 0.1;
				setScale(newScale);
			}
		} else {
			if (scale >= 5) {
				return;
			} else {
				newScale = scale + 0.1;
				setScale(newScale);
			}
		}

		// adjust the zooming center to the previous center
		const rect = canvasWrapRef.current?.getBoundingClientRect();
		if (rect?.width !== undefined) {
			const x = rect.width / 2;
			const scrollX = canvasWrapRef.current?.scrollLeft;
			if (scrollX && newScale) {
				const newScrollX = (scrollX + x) * (newScale / scale) - x;
				setScroll(newScrollX);
			}
		}
	};

	// event handler for wheel zooming
	const handleWheelZoom = (e: React.WheelEvent) => {
		e.preventDefault();
		let newScale;
		if (scale >= 1 && scale <= 3) {
			newScale = scale + e.deltaY * 0.001;
			setScale(newScale);
		} else if (scale > 3) {
			if (e.deltaY < 0) {
				newScale = scale + e.deltaY * 0.001;
				setScale(newScale);
			}
		} else if (scale < 1) {
			if (e.deltaY > 0) {
				newScale = scale + e.deltaY * 0.001;
				setScale(newScale);
			}
		}

		// adjust the zooming center to the mouse pointer
		const rect = canvasWrapRef.current?.getBoundingClientRect();
		if (rect?.left) {
			const x = e.clientX - rect?.left;
			const scrollX = canvasWrapRef.current?.scrollLeft;
			if (scrollX !== undefined && newScale) {
				const newScrollX = (scrollX + x) * (newScale / scale) - x;
				setScroll(newScrollX);
			}
		}
	};

	return (
		<div className={styles.timeline}>
			<div ref={canvasWrapRef} className={styles.canvasWrap} onWheel={handleWheelZoom}>
				{events.map((event, i) => {
					return <EventButton key={i} event={event} scale={scale} />;
				})}
				<canvas ref={canvasRef} width={canvasWidth} height={100} />
			</div>
			<div className={styles.control}>
				<button name="out" onClick={handleButtonZoom}>
					Zoom Out
				</button>
				<button name="in" onClick={handleButtonZoom}>
					Zoom In
				</button>
				<button onClick={() => setScale(1)}>Reset</button>
			</div>
		</div>
	);
};

export default Timeline;

// timenode name box component
const EventButton = ({ event, scale }: { event: Event; scale: number }) => {
	return (
		<div
			className={styles.eventButton}
			style={{
				width: `${scale * 100}px`,
				top: "60px",
				left: `${(event.id + 1) * 100 * scale}px`,
			}}>
			{event.name}
		</div>
	);
};

// draw a diamond shape on the canvas
function drawDiamond(
	ctx: CanvasRenderingContext2D,
	centerX: number,
	centerY: number,
	size: number,
	color: string
) {
	ctx.beginPath();

	// move to the top vertex of the diamond
	ctx.moveTo(centerX, centerY - size);

	// draw lines to the other vertices
	ctx.lineTo(centerX + size, centerY);
	ctx.lineTo(centerX, centerY + size);
	ctx.lineTo(centerX - size, centerY);
	ctx.lineTo(centerX, centerY - size);

	// close the path and stroke
	ctx.closePath();
	ctx.fillStyle = color;
	ctx.fill();
}
