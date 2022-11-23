import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
} from "react";
import { Image } from "react-konva";
import "gifler";

const GifImage = forwardRef((props, ref) => {
	const {
		image,
		zoomValue,
		isSelected,
		handleImageDrag,
		handleSelectElement,
		handleDeleteImage,
		trRef,
		strokeEnabled,
		strokeRef,
		setStrokeElement,
	} = props;

	const canvas = useMemo(() => {
		const node = document.createElement("canvas");
		return node;
	}, []);

	const imageRef = useRef();

	useEffect(() => {
		if (isSelected) {
			trRef.current.nodes([imageRef.current]);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

	useEffect(() => {
		if (strokeEnabled) {
			strokeRef.current.nodes([imageRef.current]);
			strokeRef.current.getLayer().batchDraw();
		}
	}, [strokeEnabled]);

	useEffect(() => {
		// save animation instance to stop it on unmount
		let anim;
		const imageSrc = `${image.src}?${Math.random()}`;
		window.gifler(imageSrc).get((a) => {
			anim = a;
			anim.animateInCanvas(canvas);
			anim.onDrawFrame = (ctx, frame) => {
				ctx.drawImage(frame.buffer, frame.x, frame.y);
				imageRef?.current?.getLayer()?.draw();
			};
		});
		return () => anim.stop();
	}, [image.src, canvas]);

	const handleDragEnd = (e) => {
		if (!image.isLocked) {
			const newRect = {
				...image,
				x: e.target.x() / (zoomValue / 100),
				y: e.target.y() / (zoomValue / 100),
			};

			handleImageDrag(newRect.id, newRect);
		}
	};

	const handleTransformEnd = (e) => {
		if (!image.isLocked) {
			const node = imageRef.current;
			const scaleX = node.scaleX();
			const scaleY = node.scaleY();

			node.scaleX(1);
			node.scaleY(1);

			const newImage = {
				...image,
				x: node.x() / (zoomValue / 100),
				y: node.y() / (zoomValue / 100),
				width: Math.max(5, node.width() * scaleX) / (zoomValue / 100),
				height: Math.max(node.height() * scaleY) / (zoomValue / 100),
			};

			handleImageDrag(newImage.id, newImage);
		}
	};

	const handleClick = () => {
		handleSelectElement(imageRef);
	};

	const handlePositions = (type) => {
		if (type === "send to front") imageRef?.current?.moveToTop();
		if (type === "send forward") imageRef?.current?.moveUp();
		if (type === "send back") imageRef?.current?.moveToBottom();
		if (type === "send backward") imageRef?.current?.moveDown();
	};

	useImperativeHandle(ref, () => {
		return {
			handlePositions,
			...ref?.current,
		};
	});

	return (
		<>
			<Image
				{...image}
				ref={imageRef}
				draggable={!image.isLocked}
				onDragEnd={handleDragEnd}
				onClick={handleClick}
				onTap={handleClick}
				onTransformEnd={handleTransformEnd}
				image={canvas}
				x={image.x * (zoomValue / 100)}
				y={image.y * (zoomValue / 100)}
				width={image.width * (zoomValue / 100)}
				height={image.height * (zoomValue / 100)}
				name="image"
				opacity={image.opacity}
				crossOrigin="Anonymous"
        onMouseOver={() => setStrokeElement(image)}
        onMouseOut={() => setStrokeElement({})}
			/>
		</>
	);
});

export default GifImage;
