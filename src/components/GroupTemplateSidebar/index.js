import React, { useState } from "react";
import { css } from "aphrodite";
import SVG from "react-inlinesvg";
import styles from "./styles";
import { Images } from "../../theme";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useMutation } from "@apollo/client";
import {
  CREATE_GROUP_TEMPLATE,
  DELETE_GROUP_TEMPLATE,
  UPDATE_GROUP_TEMPLATES,
} from "../../graphQueries";
import { addGroupTemplates, deleteGroup } from "../../actions/CanvasDataAction";
import { ModalView, Button, TextField } from "..";
import { Store } from "react-notifications-component";
import { logoutModal } from "../../actions/LayoutAction";
import { OverlayTrigger, Tooltip, Accordion } from "react-bootstrap";
import _ from "lodash";
import { useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";

const GroupTemplateSidebar = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation().pathname?.split("/");
  const {
    groupTemplates,
    demoGroupTemplates,
    transactionGroupTemplates,
    templates,
    user,
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [deleteTemplateId, setDeleteTemplateId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(() => false);
  const [selectedTemplates, setSelectedTemplates] = useState(() => []);
  const [selectedId, setSelectedId] = useState(() => null);
  const [editError, setEditError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");

  const [createGroupTemplate] = useMutation(CREATE_GROUP_TEMPLATE, {
    onCompleted(data) {
      let groupTemplate = {};
      const allTemplates = data?.createGroupTemplate.data;

      let templates = {};

      const allGrpTemplates = allTemplates?.attributes?.templates?.data;
      allGrpTemplates.map((template) => {
        templates[`${template.attributes.name}_${template.id}`] = {
          name: template?.attributes?.name,
          height: template?.attributes?.height,
          width: template?.attributes?.width,
          template: template?.attributes?.template,
          unit: template?.attributes?.unit,
          zoomValue: template?.attributes?.zoomValue,
          canvasAttrs: template?.attributes?.canvasAttrs,
          demoId: template?.attributes?.demoId,
          id: template?.id,
          category: {
            name: template?.attributes?.category?.data?.attributes?.name,
            id: template?.attributes?.category?.data?.id,
          },
          image: {
            name: template?.attributes?.image?.data?.attributes?.name,
            url: template?.attributes?.image?.data?.attributes?.url,
            height: template?.attributes?.image?.data?.attributes?.height,
            width: template?.attributes?.image?.data?.attributes?.width,
            id: template?.attributes?.image?.data?.id,
          },
        };
      });

      groupTemplate = {
        id: allTemplates.id,
        demoLink: allTemplates.attributes?.demoLink,
        name: allTemplates.attributes?.name,
        templates,
      };

      dispatch(
        addGroupTemplates({ [`group-${groupTemplate.id}`]: groupTemplate })
      );

      Store.addNotification({
        title: "Group successfully created",
        message: "templates group created.",
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

      setSelectedTemplates([]);
      setShowEditModal(false);
      setGroupName("");
    },
    onError(err) {
      console.error(err);
    },
  });

  const [deleteGroupTemplate] = useMutation(DELETE_GROUP_TEMPLATE, {
    onCompleted() {
      dispatch(deleteGroup({ name: "group-" + deleteTemplateId }));
      setShowModal(false);

      setDeleteTemplateId("");

      Store.addNotification({
        title: "Group successfully deleted",
        message: "templates group deleted.",
        type: "success",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    },

    onError(err) {
      console.error(err.message);
      if (err.message.includes("Received status code 401")) {
        dispatch(logoutModal({ data: true }));
      }
      setShowModal(false);
    },
  });

  const handleDeleteGroup = () => {
    deleteGroupTemplate({ variables: { id: deleteTemplateId } });
  };

  const [handleUpdateTemplate] = useMutation(UPDATE_GROUP_TEMPLATES, {
    onCompleted(data) {
      let groupTemplate = {};
      const allTemplates = data?.updateGroupTemplate.data;

      let templates = {};

      const allGrpTemplates = allTemplates?.attributes?.templates?.data;
      allGrpTemplates.map((template) => {
        templates[`${template.attributes.name}_${template.id}`] = {
          name: template?.attributes?.name,
          height: template?.attributes?.height,
          width: template?.attributes?.width,
          template: template?.attributes?.template,
          unit: template?.attributes?.unit,
          zoomValue: template?.attributes?.zoomValue,
          canvasAttrs: template?.attributes?.canvasAttrs,
          demoId: template?.attributes?.demoId,
          id: template?.id,
          category: {
            name: template?.attributes?.category?.data?.attributes?.name,
            id: template?.attributes?.category?.data?.id,
          },
          image: {
            name: template?.attributes?.image?.data?.attributes?.name,
            url: template?.attributes?.image?.data?.attributes?.url,
            height: template?.attributes?.image?.data?.attributes?.height,
            width: template?.attributes?.image?.data?.attributes?.width,
            id: template?.attributes?.image?.data?.id,
          },
        };
      });

      groupTemplate = {
        id: allTemplates.id,
        demoLink: allTemplates.attributes?.demoLink,
        name: allTemplates.attributes?.name,
        templates,
      };

      dispatch(
        addGroupTemplates({ [`group-${groupTemplate.id}`]: groupTemplate })
      );

      Store.addNotification({
        title: "Group successfully updated",
        message: "templates group updated.",
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

      setSelectedTemplates([]);
      setSelectedId("");
      setShowEditModal(false);
      setGroupName("");
    },
    onError(err) {
      console.error({ err });
    },
  });

  const handleShowEditModal = (groupId) => {
    const groupData = groupTemplates[`group-${groupId}`];

    if (_.isEmpty(groupData)) {
      return;
    }

    setIsEdit(true);

    let ids = [];

    Object.keys(groupData?.templates).forEach((temp) => {
      ids.push(groupData?.templates[temp]?.id);
    });

    setSelectedTemplates(ids);
    setGroupName(groupData.name ?? "");
    setSelectedId(groupId);
    setShowEditModal(true);
  };

  const handleShowCreateModal = () => {
    setSelectedTemplates([]);
    setSelectedId("");
    groupName && setGroupName("");
    isEdit && setIsEdit(false);
    setShowEditModal(true);
  };

  const handleCheckTemplate = (templateId) => {
    let selectedTemplatesDup = [...selectedTemplates];
    const templateIdx = selectedTemplates.findIndex(
      (id) => id === templates[templateId].id
    );
    if (templateIdx === -1) {
      setSelectedTemplates((state) => [...state, templates[templateId].id]);
    } else {
      selectedTemplatesDup = selectedTemplatesDup.filter(
        (id) => id !== templates[templateId].id
      );

      setSelectedTemplates([...selectedTemplatesDup]);
    }
  };

  const handleSave = () => {
    if (selectedTemplates?.length <= 1) {
      setEditError("Minimum Two templates are required.");
      return;
    }

    if (_.isEmpty(groupName)) {
      setEditError("Name is required");
      return;
    }

    const allGroupNames = [];
    Object.keys(groupTemplates).forEach((temp) =>
      allGroupNames.push(groupTemplates[temp].name)
    );

    if (allGroupNames.includes(groupName.trim())) {
      setEditError("Name is already taken");
      return;
    }

    if (isEdit) {
      handleUpdateTemplate({
        variables: {
          id: selectedId,
          templates: [...selectedTemplates],
          name: groupName,
        },
      });
    } else {
      const payload = {
        demoLink: uuid(),
        transactionLink: `${uuid()}_${uuid()}`,
        templates: [...selectedTemplates],
        user: user.id,
        name: groupName,
      };

      createGroupTemplate({
        variables: payload,
      });
    }

    editError && setEditError("");
  };

  const allGroupTemplates = location.includes("demo")
    ? demoGroupTemplates
    : location.includes("transaction")
    ? transactionGroupTemplates
    : groupTemplates;

  const EDIT_TEMPLATE = location.includes("demo")
    ? "TEMPLATE_DEMO"
    : location.includes("transaction")
    ? "TEMPLATE_TRANSACTION"
    : "EDIT_TEMPLATE";

  const routingId = location.includes("demo")
    ? "demoId"
    : location.includes("transaction")
    ? "transactionId"
    : "id";

  const filteredTemplates = Object.keys(templates) || [];

  const groupTemplateskeys = Object.keys(allGroupTemplates).map((key) => ({
    key,
    name: allGroupTemplates[key].name,
  }));

  const filteredGroupTemplates = groupTemplateskeys.filter((temp) =>
    temp.name?.toLowerCase()?.match(search?.toLowerCase())
  );

  const filteredGroupTemplatesKeys = filteredGroupTemplates?.map(
    (temp) => temp.key
  );

  return (
    <div className={`${css(styles.main)}`}>
      {EDIT_TEMPLATE === "EDIT_TEMPLATE" && (
        <>
          <TextField
            placeholder='Search Templates'
            icon={Images.searchBarIcon}
            styles={[styles.formInput]}
            iconStyles={[styles.searchIcon]}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button
            ripple={false}
            title={`Create Group`}
            className={`${css(styles.createGroupBtn)}`}
            onClick={handleShowCreateModal}
          />
        </>
      )}

      <Accordion>
        {!_.isEmpty(filteredGroupTemplatesKeys) &&
          filteredGroupTemplatesKeys?.map((grpTemp) => (
            <>
              <Accordion.Toggle
                className={`w-100 ${css(styles.accordionHeader)}`}
                eventKey={grpTemp}>
                <div
                  className={`d-flex justify-content-between w-100 align-items-center ${css(
                    styles.title
                  )}`}>
                  <span className={`${css(styles.title)}`}>
                    {allGroupTemplates[grpTemp]?.name}
                  </span>
                  <div className='d-flex justify-content-center align-items-center'>
                    {EDIT_TEMPLATE === "EDIT_TEMPLATE" && (
                      <>
                        <button className={`${css(styles.button)}`}>
                          {/* <SVG
                            height="auto"
                            width="auto"
                            className={`${css(styles.templateIcon)}`}
                            src={Images.arrowDown}
                          /> */}
                          <img
                            src={Images.arrowDown}
                            className={`${css(styles.templateIcon)}`}
                          />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </Accordion.Toggle>

              <Accordion.Collapse eventKey={grpTemp}>
                <>
                  {!_.isEmpty(
                    Object.keys(allGroupTemplates[grpTemp]?.templates)
                  ) &&
                    Object.keys(allGroupTemplates[grpTemp]?.templates).map(
                      (template) => {
                        const templates = allGroupTemplates[grpTemp]?.templates;
                        return (
                          <div
                            className={`d-flex justify-content-start align-items-start flex-column  w-100`}
                            style={{ marginBottom: "1vw" }}
                            key={template}>
                            <div
                              className={`w-100 ${css(
                                styles.templateWrapper
                              )}`}>
                              <img
                                src={templates[template].image.url}
                                className={`${css(styles.image)}`}
                                onClick={() =>
                                  history.push({
                                    pathname:
                                      ROUTES[EDIT_TEMPLATE].split(":")[0] +
                                      templates[template][routingId],
                                    key: templates[template][routingId],
                                  })
                                }
                                role='button'
                              />

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
                                                ROUTES[EDIT_TEMPLATE].split(
                                                  ":"
                                                )[0] +
                                                templates[template][routingId],
                                              key: templates[template][
                                                routingId
                                              ],
                                            })
                                          }
                                        />
                                      </button>
                                    )}
                                  </OverlayTrigger>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  {EDIT_TEMPLATE === "EDIT_TEMPLATE" && (
                    <div className='d-flex align-items-center justify-content-between'>
                      <div className='d-flex justify-content-end align-items-center'>
                        {EDIT_TEMPLATE === "EDIT_TEMPLATE" && (
                          <>
                            <OverlayTrigger
                              overlay={<Tooltip>Edit Group</Tooltip>}
                              placement={"bottom"}>
                              {({ ref, ...triggerHandler }) => (
                                <button
                                  className={`${css(styles.button)}`}
                                  onClick={() => {
                                    // setDeleteTemplateId(allGroupTemplates[grpTemp].id);
                                    handleShowEditModal(
                                      allGroupTemplates[grpTemp].id
                                    );
                                  }}
                                  style={{ marginRight: ".5vw" }}
                                  {...triggerHandler}>
                                  <SVG
                                    ref={ref}
                                    height='auto'
                                    width='auto'
                                    className={`${css(styles.templateIcon)}`}
                                    src={Images.editIcon}
                                  />
                                </button>
                              )}
                            </OverlayTrigger>

                            <OverlayTrigger
                              overlay={<Tooltip>Delete Group</Tooltip>}
                              placement={"bottom"}>
                              {({ ref, ...triggerHandler }) => (
                                <button
                                  className={`${css(styles.button)}`}
                                  onClick={() => {
                                    setDeleteTemplateId(
                                      allGroupTemplates[grpTemp].id
                                    );
                                    setShowModal(true);
                                  }}
                                  {...triggerHandler}>
                                  <SVG
                                    ref={ref}
                                    height='auto'
                                    width='auto'
                                    className={`${css(styles.templateIcon)}`}
                                    src={Images.trashIcon}
                                  />
                                </button>
                              )}
                            </OverlayTrigger>
                          </>
                        )}
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
                                    `${process.env.REACT_APP_ORIGIN}${
                                      ROUTES.TEMPLATE_GROUP_DEMO.split(":")[0]
                                    }${allGroupTemplates[grpTemp]?.demoLink}`
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
                                    `[[groupId:${allGroupTemplates[grpTemp]?.demoLink}]]`
                                  );
                                  Store.addNotification({
                                    title: "Template copied!",
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
                  )}
                </>
              </Accordion.Collapse>

              <div className={`${css(styles.hr)}`} />
            </>
          ))}
      </Accordion>

      <ModalView
        title={"Delete Group Template"}
        showModal={showModal}
        setShowModal={setShowModal}
        cancelText={"No"}
        submitText={"Yes"}
        cancelOnClick={() => {
          setShowModal(false);
          setDeleteTemplateId("");
        }}
        submitOnClick={() => {
          handleDeleteGroup();
        }}>
        <div className={`d-flex ${css(styles.modalDelete)}`}>
          Are you sure you want to delete this group ?
        </div>
      </ModalView>
      {EDIT_TEMPLATE === "EDIT_TEMPLATE" && (
        <ModalView
          title={isEdit ? "Edit Group Template" : "Create Group Template"}
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          cancelText={"Cancel"}
          submitText={"Save"}
          cancelOnClick={() => {
            setShowEditModal(false);
            setSelectedTemplates([]);
            setSelectedId("");
            setGroupName("");
          }}
          submitOnClick={() => {
            handleSave();
          }}>
          <TextField
            placeholder='Name:'
            styles={[styles.formInput]}
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />

          <div className={`d-flex ${css(styles.modalDelete)}`}>
            Choose Templates
          </div>

          <div className={`row ${css(styles.row)}`}>
            {filteredTemplates &&
              filteredTemplates.map((template) => (
                <div
                  className={`col-6 ${css(styles.templateModalWrapper)}`}
                  style={{ marginTop: "1vw" }}
                  key={template}>
                  <div
                    className={`${css(styles.templateWrapper)} ${css(
                      styles.templateModalWrapper
                    )}`}>
                    <img
                      src={templates[template].image.url}
                      className={`${css(styles.modalImage)}`}
                      role='button'
                    />

                    <input
                      type='checkbox'
                      checked={
                        selectedTemplates.findIndex(
                          (id) => id === templates[template].id
                        ) !== -1
                          ? true
                          : false
                      }
                      onChange={() => handleCheckTemplate(template)}
                      className={`${css(styles.checkbox)}`}
                    />
                    <div
                      className={`d-flex justify-content-between align-items-center ${css(
                        styles.nameWrapper
                      )}`}>
                      <span>{templates[template].name}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {editError && (
            <div
              className={`${css(styles.modalDelete)}`}
              style={{ marginTop: "0.5vw", color: "red" }}>
              {" "}
              {editError}{" "}
            </div>
          )}
        </ModalView>
      )}
    </div>
  );
};

const mapStateToProps = ({ canvasData, user }) => ({
  categories: canvasData.categories,
  groupTemplates: canvasData.groupTemplates,
  demoGroupTemplates: canvasData.demoGroupTemplates,
  templates: canvasData.templates,
  transactionGroupTemplates: canvasData.transactionGroupTemplates,
  user,
});

export default connect(mapStateToProps)(GroupTemplateSidebar);
