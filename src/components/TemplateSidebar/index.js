import React, { useState } from "react";
import { css } from "aphrodite";
import SVG from "react-inlinesvg";
import styles from "./styles";
import { Button, SelectBox, TextField } from "..";
import { Images } from "../../theme";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useMutation } from "@apollo/client";
import {
  CREATE_GROUP_TEMPLATE,
  CREATE_USER_TEMPLATE,
  DELETE_USER_TEMPLATE,
} from "../../graphQueries";
import {
  addGroupTemplates,
  addUserTemplate,
  deleteUserTemplateAction,
} from "../../actions/CanvasDataAction";
import { ModalView } from "..";
import { v4 as uuid } from "uuid";
import { Store } from "react-notifications-component";
import { logoutModal } from "../../actions/LayoutAction";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const TemplateSidebar = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { templates, categories, user } = props;

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteTemplateId, setDeleteTemplateId] = useState(null);
  // const [selectedTemplates, setSelectedTemplates] = useState(() => []);

  const [deleteUserTemplate] = useMutation(DELETE_USER_TEMPLATE, {
    onCompleted(data) {
      dispatch(
        deleteUserTemplateAction({
          key: `${data.deleteTemplate.data.attributes.name}_${data.deleteTemplate.data.id}`,
        })
      );

      setShowModal(false);
    },

    onError(err) {
      console.error(err.message);
      if (err.message.includes("Received status code 401")) {
        dispatch(logoutModal({ data: true }));
      }
      setShowModal(false);
    },
  });

  const [cloneTemplate] = useMutation(CREATE_USER_TEMPLATE, {
    onCompleted(data) {
      const template = {
        id: data.createTemplate.data.id,
        ...data.createTemplate.data.attributes,
        category: {
          name: data.createTemplate.data.attributes?.category?.data?.attributes
            ?.name,
          id: data.createTemplate.data.attributes?.category?.data?.id,
        },
        image: {
          name: data.createTemplate.data.attributes?.image?.data?.attributes
            ?.name,
          url: data.createTemplate.data.attributes?.image?.data?.attributes
            ?.url,
          height:
            data.createTemplate.data.attributes?.image?.data?.attributes
              ?.height,
          width:
            data.createTemplate.data.attributes?.image?.data?.attributes?.width,
          id: data.createTemplate.data.attributes?.image?.data?.id,
        },
      };

      const saveTemplateToStore = {
        ...template,
      };

      dispatch(addUserTemplate(saveTemplateToStore));
      setShowModal(false);
    },

    onError(err) {
      console.error(err.message);
      setShowModal(false);
      if (err.message.includes("Received status code 401")) {
        dispatch(logoutModal({ data: true }));
      }
    },
  });

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDeleteTemplate = (id) => {
    deleteUserTemplate({ variables: { id } });

    setDeleteTemplateId("");
  };

  const duplicateTemplate = (name, id) => {
    if (!props.user.subscribed) {
      Store.addNotification({
        title: "Failed",
        message: "You are not subscribed to templific",
        type: "success",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 4000,
          onScreen: true,
        },
      });

      return;
    }
    const template = templates[`${name}_${id}`];

    const data = {
      height: parseInt(template.height),
      width: parseInt(template.width),
      template: template.template,
      name: `${template.name}-copy`,
      unit: template.unit,
      zoomValue: template.zoomValue,
      categoryId: template.category.id,
      userId: props.user.id,
      image: template.image?.id || id,
      demoId: uuid(),
      transactionId: `${uuid()}_${uuid()}`,
      canvasAttrs: template.canvasAttrs,
    };

    cloneTemplate({ variables: data });
  };

  // const handleCheckTemplate = (templateId) => {
  //   let selectedTemplatesDup = [...selectedTemplates];
  //   const templateIdx = selectedTemplates.findIndex(
  //     (id) => id === templates[templateId].id
  //   );
  //   if (templateIdx === -1) {
  //     setSelectedTemplates((state) => [...state, templates[templateId].id]);
  //   } else {
  //     selectedTemplatesDup = selectedTemplatesDup.filter(
  //       (id) => id !== templates[templateId].id
  //     );

  //     setSelectedTemplates([...selectedTemplatesDup]);
  //   }
  // };

  // const createGroup = () => {
  //   const payload = {
  //     demoLink: uuid(),
  //     transactionLink: `${uuid()}_${uuid()}`,
  //     templates: [...selectedTemplates],
  //     user: user.id,
  //   };

  //   createGroupTemplate({
  //     variables: payload,
  //   });
  // };

  const categoriesName = Object.keys(categories) || [];
  const templateNames = Object.keys(templates) || [];

  let filteredTemplates =
    templateNames.filter((temp) =>
      templates[temp]?.name?.toLowerCase().match(search?.toLowerCase())
    ) || [];

  filteredTemplates =
    filterCategory === "all" || filterCategory === ""
      ? filteredTemplates
      : filteredTemplates.filter(
          (temp) => templates[temp].category.name === filterCategory
        );

  return (
    <div className={`${css(styles.main)}`}>
      <TextField
        placeholder='Search Templates'
        icon={Images.searchBarIcon}
        styles={[styles.formInput]}
        iconStyles={[styles.searchIcon]}
        value={search}
        onChange={handleChange}
      />

      <SelectBox
        styles={[styles.canvasInput]}
        name={`template-name`}
        placeholder='Select category'
        value={filterCategory}
        onChange={(value) => setFilterCategory(value.target.value)}>
        <option disabled value=''>
          Choose category
        </option>

        <option value='all'>All</option>

        {categoriesName.map((res, idx) => (
          <option value={res} key={idx}>
            {res}
          </option>
        ))}
      </SelectBox>
      {/* <Button
        ripple={false}
        title={`Create Group`}
        className={`${css(styles.createGroupBtn)}`}
        disabled={selectedTemplates.length > 1 ? false : true}
        onClick={createGroup}
      /> */}

      {filteredTemplates &&
        filteredTemplates.map((template) => (
          <div
            className={`d-flex justify-content-start align-items-start flex-column  w-100`}
            style={{ marginTop: "1vw" }}
            key={template}>
            <div className={`w-100 ${css(styles.templateWrapper)}`}>
              <img
                src={templates[template].image.url}
                className={`${css(styles.image)}`}
                onClick={() =>
                  history.push({
                    pathname:
                      ROUTES.EDIT_TEMPLATE.split(":")[0] +
                      templates[template].id,
                    // key: templates[template].id,
                  })
                }
                role='button'
              />

              {/* <input
                type="checkbox"
                checked={
                  selectedTemplates.findIndex(
                    (id) => id === templates[template].id
                  ) !== -1
                    ? true
                    : false
                }
                onChange={() => handleCheckTemplate(template)}
                className={`${css(styles.checkbox)}`}
              /> */}
              <div
                className={`d-flex justify-content-between align-items-center ${css(
                  styles.nameWrapper
                )}`}>
                <span>{templates[template].name}</span>

                <div className='d-flex justify-content-start align-items-center'>
                  <OverlayTrigger
                    overlay={<Tooltip>Edit Template</Tooltip>}
                    placement={"bottom"}>
                    {({ ref, ...triggerHandler }) => (
                      <button
                        className={`${css(styles.button)}`}
                        {...triggerHandler}>
                        <SVG
                          ref={ref}
                          height='auto'
                          width='auto'
                          className={`${css(styles.editIcon)}`}
                          src={Images.editIcon}
                          onClick={() =>
                            history.push({
                              pathname:
                                ROUTES.EDIT_TEMPLATE.split(":")[0] +
                                templates[template].id,
                              // key: templates[template].id,
                            })
                          }
                        />
                      </button>
                    )}
                  </OverlayTrigger>
                </div>
              </div>
            </div>

            <div
              className={`d-flex justify-content-between w-100 ${css(
                styles.iconWrapper
              )}`}>
              <div>
                <OverlayTrigger
                  overlay={<Tooltip>Delete Template</Tooltip>}
                  placement={"bottom"}>
                  {({ ref, ...triggerHandler }) => (
                    <button
                      className={`${css(styles.button)}`}
                      {...triggerHandler}>
                      <SVG
                        ref={ref}
                        height='auto'
                        width='auto'
                        className={`${css(styles.templateIcon)}`}
                        src={Images.trashIcon}
                        onClick={() => {
                          setDeleteTemplateId(templates[template].id);
                          setShowModal(true);
                        }}
                      />
                    </button>
                  )}
                </OverlayTrigger>

                <OverlayTrigger
                  overlay={<Tooltip>Duplicate Template</Tooltip>}
                  placement={"bottom"}>
                  {({ ref, ...triggerHandler }) => (
                    <button
                      className={`${css(styles.button)}`}
                      {...triggerHandler}>
                      <SVG
                        ref={ref}
                        height='auto'
                        width='auto'
                        className={`${css(styles.templateIcon)} ${css(
                          styles.templateIconOnRight
                        )} `}
                        src={Images.copyIcon}
                        onClick={() =>
                          duplicateTemplate(
                            templates[template].name,
                            templates[template].id
                          )
                        }
                      />
                    </button>
                  )}
                </OverlayTrigger>
              </div>

              <div>
                <OverlayTrigger
                  overlay={<Tooltip>Copy Demo Link</Tooltip>}
                  placement={"bottom"}>
                  {({ ref, ...triggerHandler }) => (
                    <button
                      {...triggerHandler}
                      className={`${css(styles.button)}`}>
                      <SVG
                        ref={ref}
                        height='auto'
                        width='auto'
                        className={`${css(styles.templateIcon)}`}
                        src={Images.demoLinkIcon}
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${process.env.REACT_APP_ORIGIN}/templates/demo/${templates[template].demoId}`
                          );

                          Store.addNotification({
                            title: "Demo link copied!",
                            type: "success",
                            insert: "bottom",
                            container: "bottom-right",
                            animationIn: [
                              "animate__animated",
                              "animate__fadeIn",
                            ],
                            animationOut: [
                              "animate__animated",
                              "animate__fadeOut",
                            ],
                            dismiss: {
                              duration: 2000,
                              onScreen: true,
                            },
                          });
                        }}
                      />
                    </button>
                  )}
                </OverlayTrigger>

                <OverlayTrigger
                  overlay={<Tooltip>Copy Template</Tooltip>}
                  placement={"bottom"}>
                  {({ ref, ...triggerHandler }) => (
                    <button
                      {...triggerHandler}
                      className={`${css(styles.button)}`}>
                      <SVG
                        ref={ref}
                        height='auto'
                        width='auto'
                        className={`${css(styles.templateIcon)} ${css(
                          styles.templateIconOnRight
                        )} `}
                        src={Images.demoDescriptionIcon}
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `[[templateId:${templates[template].demoId}]]`
                          );
                          Store.addNotification({
                            title: "Template copied!",
                            // message: "Your etsy shop is disconnected",
                            type: "success",
                            insert: "bottom",
                            container: "bottom-right",
                            animationIn: [
                              "animate__animated",
                              "animate__fadeIn",
                            ],
                            animationOut: [
                              "animate__animated",
                              "animate__fadeOut",
                            ],
                            dismiss: {
                              duration: 2000,
                              onScreen: true,
                            },
                          });
                        }}
                      />
                    </button>
                  )}
                </OverlayTrigger>
              </div>
            </div>
          </div>
        ))}

      <ModalView
        title={"Delete Template"}
        showModal={showModal}
        setShowModal={setShowModal}
        cancelText={"No"}
        submitText={"Yes"}
        cancelOnClick={() => {
          setShowModal(false);
          setDeleteTemplateId("");
        }}
        submitOnClick={() => {
          handleDeleteTemplate(deleteTemplateId);
        }}>
        <div className={`d-flex ${css(styles.modalDelete)}`}>
          Are you sure you want to delete this template ?
        </div>
      </ModalView>
    </div>
  );
};

const mapStateToProps = ({ canvasData, user }) => ({
  categories: canvasData.categories,
  templates: canvasData.templates,
  user,
});

export default connect(mapStateToProps)(TemplateSidebar);
