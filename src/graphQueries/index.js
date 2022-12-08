import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(input: { identifier: $email, password: $password }) {
			jwt
			user {
				email
				username
				verified
				id
				etsyConnected
				etsy_refreshToken
				subscribed
				stripeCustomerId
				trialUsed
				paypalMonthCycleEnd
				subscribed
				subscriptionId
				onTrial
				cardNumber
				trialEndDate
				nameOnCard
				subscriptionEnd
				subscriptionEndDate
				accountSuspended
				paypalCustomerId
				isAdmin
			}
		}
	}
`;

export const USER_SIGN_UP = gql`
	mutation Register($email: String!, $password: String!, $username: String!) {
		register(
			input: { email: $email, password: $password, username: $username }
		) {
			jwt
			user {
				email
				username
				verified
				id
				etsyConnected
				etsy_refreshToken
				subscribed
				stripeCustomerId
				trialUsed
				paypalMonthCycleEnd
				subscribed
				subscriptionId
				onTrial
				cardNumber
				trialEndDate
				nameOnCard
				isAdmin
			}
		}
	}
`;

export const GET_USER_INITIAL_DATA = gql`
	query users($id: ID!) {
		usersPermissionsUser(id: $id) {
			data {
				id
				attributes {
					email
					username
					verified
					etsyConnected
					etsy_refreshToken
					stripeCustomerId
					trialUsed
					paypalMonthCycleEnd
					subscribed
					subscriptionId
					onTrial
					cardNumber
					trialEndDate
					nameOnCard
					subscriptionEnd
					subscriptionEndDate
					accountSuspended
					paypalCustomerId
					isAdmin
				}
			}
		}
	}
`;

export const GET_USER_CATEGORIES = gql`
	query getCategories($email: String!) {
		categories(filters: { user: { email: { eq: $email } } }) {
			data {
				id
				attributes {
					name
				}
			}
		}
	}
`;

export const CREATE_USER_CATEGORY = gql`
	mutation createCategoriess($name: String!, $userId: ID!) {
		createCategory(data: { name: $name, user: $userId }) {
			data {
				id
				attributes {
					name
					user {
						data {
							attributes {
								email
								username
							}
						}
					}
				}
			}
		}
	}
`;

export const UPLOAD_FILE_TO_SERVER = gql`
	mutation uploadFile($file: Upload!) {
		upload(file: $file) {
			data {
				id
				attributes {
					name
					url
					previewUrl
					width
					height
					ext
					mime
				}
			}
		}
	}
`;

export const UPLOAD_IMAGE_DATA = gql`
	mutation addImage(
		$url: String!
		$name: String!
		$height: Int!
		$width: Int!
		$userId: ID
		$s3_imageId: String!
	) {
		createImage(
			data: {
				name: $name
				url: $url
				height: $height
				width: $width
				user: $userId
				s3_imageId: $s3_imageId
			}
		) {
			data {
				id
				attributes {
					name
					url
					height
					width
					s3_imageId
					isDeleted
				}
			}
		}
	}
`;

export const GET_USER_IMAGES = gql`
	query getUserImages($email: String!) {
		images(filters: { user: { email: { eq: $email } } }) {
			data {
				id
				attributes {
					url
					name
					isDeleted
				}
			}
		}
	}
`;

export const UPLOAD_FONT_DATA = gql`
	mutation addFonts(
		$name: String!
		$url: String!
		$userId: ID
		$mime: String!
		$ext: String!
		$s3_fontId: String!
	) {
		createFont(
			data: {
				name: $name
				url: $url
				user: $userId
				mime: $mime
				ext: $ext
				s3_fontId: $s3_fontId
			}
		) {
			data {
				id
				attributes {
					name
					url
					isDeleted
				}
			}
		}
	}
`;

export const GET_USER_FONTS = gql`
	query getFonts($email: String!) {
		fonts(filters: { user: { email: { eq: $email } } }) {
			data {
				id
				attributes {
					url
					name
					s3_fontId
					isDeleted
				}
			}
		}
	}
`;

export const UPLOAD_ELEMENT_DATA = gql`
	mutation addElement(
		$url: String!
		$name: String!
		$height: Int!
		$width: Int!
		$userId: ID
		$s3_elementId: String!
	) {
		createElement(
			data: {
				name: $name
				url: $url
				height: $height
				width: $width
				user: $userId
				s3_elementId: $s3_elementId
			}
		) {
			data {
				id
				attributes {
					name
					url
					height
					width
					s3_elementId
					isDeleted
				}
			}
		}
	}
`;

export const GET_USER_ELEMENTS = gql`
	query getUserElements($email: String!) {
		elements(filters: { user: { email: { eq: $email } } }) {
			data {
				id
				attributes {
					url
					name
					s3_elementId
					isDeleted
				}
			}
		}
	}
`;

export const GET_DEFAULT_ELEMENTS = gql`
	query getDefaultElements {
		defaultElement {
			data {
				attributes {
					element {
						id
						element {
							data {
								attributes {
									name
									url
								}
							}
						}
					}
				}
			}
		}
	}
`;

export const CREATE_USER_TEMPLATE = gql`
	mutation createTemplate(
		$name: String!
		$height: Float!
		$template: JSON!
		$unit: String!
		$width: Float!
		$zoomValue: Int!
		$categoryId: ID!
		$userId: ID!
		$image: ID!
		$canvasAttrs: JSON!
		$demoId: String!
		$transactionId: String!
	) {
		createTemplate(
			data: {
				name: $name
				height: $height
				width: $width
				template: $template
				unit: $unit
				zoomValue: $zoomValue
				category: $categoryId
				user: $userId
				image: $image
				canvasAttrs: $canvasAttrs
				demoId: $demoId
				transactionId: $transactionId
			}
		) {
			data {
				attributes {
					name
					height
					width
					template
					zoomValue
					unit
					canvasAttrs
					demoId
					image {
						data {
							id
							attributes {
								height
								url
								width
								name
							}
						}
					}

					category {
						data {
							id
							attributes {
								name
							}
						}
					}
				}
				id
			}
		}
	}
`;

export const UPDATE_USER_TEMPLATE = gql`
	mutation updateTemplate(
		$templateId: ID!
		$template: JSON!
		$zoomValue: Int!
		$name: String!
		$image: ID!
	) {
		updateTemplate(
			id: $templateId
			data: {
				template: $template
				zoomValue: $zoomValue
				name: $name
				image: $image
			}
		) {
			data {
				attributes {
					name
					height
					width
					template
					zoomValue
					unit
					canvasAttrs
					demoId
					image {
						data {
							id
							attributes {
								height
								url
								width
								name
							}
						}
					}

					category {
						data {
							id
							attributes {
								name
							}
						}
					}
				}
				id
			}
		}
	}
`;

export const DELETE_USER_TEMPLATE = gql`
	mutation deleteTemplate($id: ID!) {
		deleteTemplate(id: $id) {
			data {
				id
				attributes {
					template
					name
				}
			}
		}
	}
`;

export const DELETE_IMAGE = gql`
	mutation deleteImage($id: ID!) {
		updateImage(id: $id, data: { isDeleted: true }) {
			data {
				id
				attributes {
					name
				}
			}
		}
	}
`;

export const DELETE_USER_ELEMENT = gql`
	mutation deleteElement($id: ID!) {
		updateElement(id: $id, data: { isDeleted: true }) {
			data {
				id
				attributes {
					name
				}
			}
		}
	}
`;

export const DELETE_USER_FONT = gql`
	mutation deleteFont($id: ID!) {
		updateFont(id: $id, data: { isDeleted: true }) {
			data {
				id
				attributes {
					name
				}
			}
		}
	}
`;

export const GET_TEMPLATES = gql`
	query getTemplates($email: String!) {
		templates(
			filters: { user: { email: { eq: $email } } }
			pagination: { limit: 500 }
		) {
			data {
				attributes {
					name
					width
					template
					unit
					height
					zoomValue
					canvasAttrs
					demoId
					category {
						data {
							id
							attributes {
								name
							}
						}
					}
					image {
						data {
							id
							attributes {
								height
								url
								name
								width
							}
						}
					}
				}
				id
			}
		}
	}
`;

export const GET_DEMO_TEMPLATE = gql`
	query getTemplates($demoId: String!) {
		templates(
			filters: { demoId: { eq: $demoId } }
			pagination: { limit: 500 }
		) {
			data {
				attributes {
					name
					width
					template
					unit
					height
					zoomValue
					canvasAttrs
					category {
						data {
							id
							attributes {
								name
							}
						}
					}
					image {
						data {
							id
							attributes {
								height
								url
								name
								width
							}
						}
					}
				}
				id
			}
		}
	}
`;

export const GET_TRANSACTION_TEMPLATE = gql`
	query getTemplates($transactionId: String!) {
		templates(
			filters: { transactionId: { eq: $transactionId } }
			pagination: { limit: 500 }
		) {
			data {
				attributes {
					name
					width
					template
					unit
					height
					zoomValue
					canvasAttrs
					category {
						data {
							id
							attributes {
								name
							}
						}
					}
					image {
						data {
							id
							attributes {
								height
								url
								name
								width
							}
						}
					}
				}
				id
			}
		}
	}
`;

export const GET_USER_DATA = gql`
	query users($email: String!) {
		usersPermissionsUsers(filters: { email: { eq: $email } }) {
			data {
				attributes {
					email
					username
					verified
					subscribed
					subscriptionId
					onTrial
					cardNumber
					trialEndDate
					nameOnCard
					subscriptionEnd
					subscriptionEndDate
					accountSuspended
					paypalCustomerId
					isAdmin
				}
			}
		}
	}
`;

export const UPDATE_USER_ETSY_CONNECTION = gql`
	mutation updateUser(
		$id: ID!
		$etsyConnected: Boolean!
		$etsy_refreshToken: String!
		$etsyUserId: String
		$etsyShopId: String
	) {
		updateUsersPermissionsUser(
			id: $id
			data: {
				etsyConnected: $etsyConnected
				etsy_refreshToken: $etsy_refreshToken
				etsyUserId: $etsyUserId
				etsyShopId: $etsyShopId
			}
		) {
			data {
				id
			}
		}
	}
`;

export const UPDATE_CARD_INFO = gql`
	mutation updateSubscription(
		$id: ID!
		$subscribed: Boolean
		$onTrial: Boolean
		$subscriptionId: String
		$cardNumber: String
		$trialEndDate: DateTime
		$subscriptionStartDate: DateTime
		$nameOnCard: String
		$subscriptionEnd: Boolean
		$subscriptionEndDate: DateTime
		$paypalCustomerId: String
		$paypalMonthCycleEnd: String
		$trialUsed: Boolean
	) {
		updateUsersPermissionsUser(
			id: $id
			data: {
				subscribed: $subscribed
				subscriptionId: $subscriptionId
				onTrial: $onTrial
				trialUsed: $trialUsed
				cardNumber: $cardNumber
				trialEndDate: $trialEndDate
				nameOnCard: $nameOnCard
				subscriptionEnd: $subscriptionEnd
				subscriptionEndDate: $subscriptionEndDate
				paypalCustomerId: $paypalCustomerId
				paypalMonthCycleEnd: $paypalMonthCycleEnd
				subscriptionStartDate: $subscriptionStartDate
			}
		) {
			data {
				attributes {
					subscribed
					subscriptionId
					onTrial
					cardNumber
					trialEndDate
					nameOnCard
					subscriptionEnd
					subscriptionEndDate
					accountSuspended
					stripeCustomerId
					trialUsed
					paypalMonthCycleEnd
					paypalCustomerId
					isAdmin
				}
			}
		}
	}
`;

export const CREATE_GROUP_TEMPLATE = gql`
	mutation createGroup(
		$demoLink: String!
		$templates: [ID]!
		$user: ID!
		$transactionLink: String!
		$name: String!
	) {
		createGroupTemplate(
			data: {
				demoLink: $demoLink
				transactionLink: $transactionLink
				templates: $templates
				user: $user
				name: $name
			}
		) {
			data {
				id
				attributes {
					demoLink
					name
					templates {
						data {
							attributes {
								name
								width
								template
								unit
								height
								zoomValue
								canvasAttrs
								demoId
								category {
									data {
										id
										attributes {
											name
										}
									}
								}
								image {
									data {
										id
										attributes {
											height
											url
											name
											width
										}
									}
								}
							}
							id
						}
					}
				}
			}
		}
	}
`;

export const UPDATE_GROUP_TEMPLATES = gql`
	mutation updateGroupTemplate($templates: [ID]!, $id: ID!, $name: String!) {
		updateGroupTemplate(id: $id, data: { templates: $templates, name: $name }) {
			data {
				id
				attributes {
					demoLink
					name
					templates {
						data {
							attributes {
								name
								width
								template
								unit
								height
								zoomValue
								canvasAttrs
								demoId
								category {
									data {
										id
										attributes {
											name
										}
									}
								}
								image {
									data {
										id
										attributes {
											height
											url
											name
											width
										}
									}
								}
							}
							id
						}
					}
				}
			}
		}
	}
`;

export const GET_GROUP_TEMPLATES = gql`
	query getGroupTemplates($email: String!) {
		groupTemplates(
			filters: { user: { email: { eq: $email } } }
			pagination: { limit: 500 }
		) {
			data {
				id
				attributes {
					demoLink
					transactionLink
					name
					templates {
						data {
							attributes {
								name
								width
								template
								unit
								height
								zoomValue
								canvasAttrs
								demoId
								category {
									data {
										id
										attributes {
											name
										}
									}
								}
								image {
									data {
										id
										attributes {
											height
											url
											name
											width
										}
									}
								}
							}
							id
						}
					}
				}
			}
		}
	}
`;

export const GET_GROUP_DEMO_TEMPLATES = gql`
	query getGroupTemplates($demoLink: String!) {
		groupTemplates(
			filters: { demoLink: { eq: $demoLink } }
			pagination: { limit: 500 }
		) {
			data {
				id
				attributes {
					demoLink
					transactionLink
					name
					templates {
						data {
							attributes {
								name
								width
								template
								unit
								height
								zoomValue
								canvasAttrs
								demoId
								transactionId
								category {
									data {
										id
										attributes {
											name
										}
									}
								}
								image {
									data {
										id
										attributes {
											height
											url
											name
											width
										}
									}
								}
							}
							id
						}
					}
				}
			}
		}
	}
`;

export const GET_GROUP_TRANSACTION_TEMPLATES = gql`
	query getGroupTemplates($transactionLink: String!) {
		groupTemplates(
			filters: { transactionLink: { eq: $transactionLink } }
			pagination: { limit: 500 }
		) {
			data {
				id
				attributes {
					demoLink
					transactionLink
					name
					templates {
						data {
							attributes {
								name
								width
								template
								unit
								height
								zoomValue
								canvasAttrs
								demoId
								transactionId
								category {
									data {
										id
										attributes {
											name
										}
									}
								}
								image {
									data {
										id
										attributes {
											height
											url
											name
											width
										}
									}
								}
							}
							id
						}
					}
				}
			}
		}
	}
`;

export const DELETE_GROUP_TEMPLATE = gql`
	mutation deleteGroup($id: ID!) {
		deleteGroupTemplate(id: $id) {
			data {
				attributes {
					demoLink
				}
			}
		}
	}
`;

export const CREATE_MAIN_CATEGORY = gql`
	mutation createMainCategory($name: String!, $imageId: ID!) {
		createMainCategory(data: { name: $name, image: $imageId }) {
			data {
				id
				attributes {
					name
					image {
						data {
							id
							attributes {
								name
								url
							}
						}
					}
					sub_categories {
						data {
							id
							attributes {
								name
								image {
									data {
										id
										attributes {
											name
											url
										}
									}
								}
								pre_define_templates {
									data {
										id
										attributes {
											name
											height
											width
											unit
											template
											canvasAttrs
											image {
												data {
													id
													attributes {
														name
														url
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

export const GET_MAIN_CATEGORIES = gql`
	query getMainCategories {
		mainCategories {
			data {
				id
				attributes {
					name
					image {
						data {
							attributes {
								url
								name
								width
								width
							}
						}
					}
				}
			}
		}
	}
`;

export const CREATE_SUB_CATEGORY = gql`
	mutation createSubCategory(
		$name: String!
		$imageId: ID!
		$mainCategoryId: ID!
	) {
		createSubCategory(
			data: { name: $name, image: $imageId, main_category: $mainCategoryId }
		) {
			data {
				id
			}
		}
	}
`;

export const GET_SUB_CATEGORIES = gql`
	query getSubCategories {
		subCategories {
			data {
				id
				attributes {
					name
					main_category {
						data {
							id
							attributes {
								name
							}
						}
					}
					image {
						data {
							attributes {
								name
								url
							}
						}
					}
				}
			}
		}
	}
`;
