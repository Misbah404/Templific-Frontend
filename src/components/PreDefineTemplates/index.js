import React, { useState } from "react";
import { css } from "aphrodite";
import styles from "./styles";
import { TextField } from "..";
import { Images } from "../../theme";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../constants";

const PreDefineTemplates = (props) => {
	const history = useHistory();
	const { mainCategoryList } = props;

	const [search, setSearch] = useState("");

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	let filteredCategories =
		mainCategoryList.filter((temp) =>
			temp?.name?.toLowerCase().match(search?.toLowerCase())
		) || [];

	return (
		<div className={`${css(styles.main)}`}>
			<h1 className={css(styles.heading)}>All Categories</h1>

			<TextField
				placeholder="Search Category"
				icon={Images.searchBarIcon}
				styles={[styles.formInput]}
				iconStyles={[styles.searchIcon]}
				value={search}
				onChange={handleChange}
			/>

			{filteredCategories &&
				filteredCategories.map((category) => (
					<div
						className={`d-flex justify-content-start align-items-start flex-column  w-100`}
						style={{ marginTop: "1vw" }}
						key={category?.id}
					>
						<div className={`w-100 ${css(styles.templateWrapper)}`}>
							<img
								src={category?.image?.url}
								className={`${css(styles.image)}`}
								onClick={() =>
									history.push(
										ROUTES.USER_SUB_CATEGORIES?.replace(
											":mainCategoryId",
											category?.id
										)
									)
								}
								role="button"
							/>

							<div
								className={`d-flex justify-content-center align-items-center ${css(
									styles.nameWrapper
								)}`}
							>
								<span>{category?.name}</span>
							</div>
						</div>
					</div>
				))}
		</div>
	);
};

const mapStateToProps = ({ canvasData, user, category }) => ({
	categories: canvasData.categories,
	templates: canvasData.templates,
	user,
	mainCategoryList: category?.mainCategory,
});

export default connect(mapStateToProps)(PreDefineTemplates);
