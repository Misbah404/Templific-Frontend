import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { createRef } from "react";
import { Image } from "react-konva";
import "gifler";

const ImageKonva = forwardRef((props, ref) => {
  const {
    image,
    zoomValue,
    isSelected,
    handleImageDrag,
    handleSelectElement,
    handleDeleteImage,
    trRef,
    user,
  } = props;

  const [imageSrc, setImageSrc] = useState(null);

  let imageData = {};

  const imageRef = createRef();

  useEffect(() => {
    if (isSelected && imageSrc) {
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, image, imageSrc]);

  const handleSetImageSrc = () => {
    setImageSrc(imageData);
  };

  useEffect(() => {
    imageData = new window.Image();
    imageData.addEventListener("load", handleSetImageSrc);
    imageData.crossOrigin = "Anonymous";
    imageData.src = `${image.src}?${Math.random()}`;

    return () => {
      imageData.removeEventListener("load", handleSetImageSrc);
    };
  }, [image.src]);

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

  useImperativeHandle(ref, () => {
    return {
      ...ref?.current,
    };
  });

  return (
    <>
      {imageSrc !== null && (
        <Image
          {...image}
          ref={imageRef}
          draggable={!image.isLocked}
          onDragEnd={handleDragEnd}
          onClick={handleClick}
          onTap={handleClick}
          onTransformEnd={handleTransformEnd}
          image={imageSrc}
          x={image.x * (zoomValue / 100)}
          y={image.y * (zoomValue / 100)}
          width={image.width * (zoomValue / 100)}
          height={image.height * (zoomValue / 100)}
          name="image"
          opacity={image.opacity}
          crossOrigin="Anonymous"
        />
      )}
    </>
  );
});

export default ImageKonva;
