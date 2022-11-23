import React, { useState } from "react";
import { useEffect } from "react";
import { forwardRef } from "react";
import { Transformer } from "react-konva";
import { Colors } from "../../../../../theme";

const TransformerKonva = forwardRef((props, ref) => {
	const { selectedElement } = props;

	const flipEnabled =
		selectedElement?.name === "image" || selectedElement.name === "text"
			? false
			: true;

	if (props.stroke) {
		return (
			<Transformer
				ref={ref}
				enabledAnchors={[]}
				rotateEnabled={false}
				borderStroke={Colors.themeColor}
				borderStrokeWidth={3}
			/>
		);
	}

	if (selectedElement?.name === "line") {
		return (
			<Transformer
				ref={ref}
				flipEnabled={flipEnabled}
				padding={3}
				boundBoxFunc={(oldBox, newBox) => {
					const minStrokeWidth = 3;

					if (selectedElement.isLocked) {
						return oldBox;
					}

					if (selectedElement?.attrs?.strokeWidth < minStrokeWidth) {
						return oldBox;
					}
					if (
						newBox.height <= minStrokeWidth ||
						newBox.width <= minStrokeWidth
					) {
						return oldBox;
					}

					return newBox;
				}}
			/>
		);
	}

	return (
		<Transformer
			ref={ref}
			flipEnabled={flipEnabled}
			padding={selectedElement.name === "text" ? 8 : 0}
			boundBoxFunc={(oldBox, newBox) => {
				if (selectedElement.isLocked) {
					return oldBox;
				}
				if (selectedElement.name === "text") {
					newBox.width = Math.max(70, newBox.width);
					newBox.height = Math.max(40, newBox.height);
					return newBox;
				}

				return newBox;
			}}
			{...(selectedElement?.name === "text" && {
				// keepRatio: true,
				enabledAnchors: [
					"top-left",
					"top-right",
					"bottom-left",
					"bottom-right",
					"middle-left",
					"middle-right",
				],
			})}
		/>
	);
});

export default TransformerKonva;
