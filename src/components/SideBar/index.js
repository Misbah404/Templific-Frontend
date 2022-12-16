import { connect } from "react-redux";
import { css } from "aphrodite";
import styles from "./styles";
import {
	ColorPicker,
	ElementSidebar,
	GroupTemplateSidebar,
	ImageSideBar,
	PreDefineTemplates,
	TemplateSidebar,
	TextSideBar,
} from "..";

const SideBar = (props) => {
	const { selectedStage } = props;
	return (
		<section className={`${css(styles.main)}`}>
			{props?.layout?.sideBarElement === "bkground" && (
				<ColorPicker selectedStage={selectedStage} />
			)}

			{props?.layout?.sideBarElement === "text" && (
				<TextSideBar selectedStage={selectedStage} />
			)}

			{props?.layout?.sideBarElement === "photos" && (
				<ImageSideBar selectedStage={selectedStage} />
			)}

			{props?.layout?.sideBarElement === "elements" && (
				<ElementSidebar selectedStage={selectedStage} />
			)}

			{props?.layout?.sideBarElement === "template" && (
				<TemplateSidebar selectedStage={selectedStage} />
			)}

			{props?.layout?.sideBarElement === "group templates" && (
				<GroupTemplateSidebar selectedStage={selectedStage} />
			)}

			{props?.layout?.sideBarElement === "pre-define templates" && (
				<PreDefineTemplates selectedStage={selectedStage} />
			)}
		</section>
	);
};

const mapStateToProps = (state) => ({
	layout: state.layout,
});

export default connect(mapStateToProps)(SideBar);
