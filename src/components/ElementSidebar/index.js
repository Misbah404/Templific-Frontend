import { useMutation } from "@apollo/client";
import { css } from "aphrodite";
import React, { useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import { connect, useDispatch } from "react-redux";
import { TextField, UploadFileModal } from "..";
import { DELETE_USER_ELEMENT } from "../../graphQueries";
import { deleteElementBlob } from "../../actions/CanvasDataAction";
// import { RANDOM_ELEMENTS } from "../../constants";
import { Images } from "../../theme";
import styles from "./styles";
import { logoutModal } from "../../actions/LayoutAction";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const ElementSidebar = (props) => {
  const { selectedStage } = props;

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [uploadModal, setUploadModal] = useState(false);
  const [displayFiles, setDisplayFiles] = useState({});

  const filesExtensions = ["svg", "jpg", "jpeg", "png", "gif"];

  const [deleteUserElement] = useMutation(DELETE_USER_ELEMENT, {
    onError(err) {
      console.error(err);
      if (err.message.includes("Received status code 401")) {
        dispatch(logoutModal({ data: true }));
      }
    },
  });

  useEffect(() => {
    if (props.elements && Object.keys(props.elements).length > 0)
      setDisplayFiles(props.elements);
  }, [props.elements]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDeleteElement = (elementKey) => {
    dispatch(deleteElementBlob({ elementKey }));
    const allFiles = { ...displayFiles };
    allFiles[elementKey] = {
      ...allFiles[elementKey],
      isDeleted: true,
    };

    setDisplayFiles(allFiles);

    if (displayFiles[elementKey] && displayFiles[elementKey].id) {
      deleteUserElement({ variables: { id: displayFiles[elementKey].id } });
    }
  };

  const handleAddElement = (imageKey) => {
    selectedStage?.canvas?.current?.handleAddImage(
      imageKey,
      displayFiles[imageKey].url
    );
  };

  const filteredElements = Object.keys(displayFiles).filter(
    (imgName) =>
      imgName.toLowerCase().match(search.toLowerCase()) &&
      !displayFiles[imgName]?.isDeleted
  );

  return (
    <div className={`${css(styles.main)}`}>
      <TextField
        placeholder='Search Elements'
        icon={Images.searchBarIcon}
        styles={[styles.formInput]}
        iconStyles={[styles.searchIcon]}
        value={search}
        onChange={handleChange}
      />

      <div
        className={`d-flex justify-content-start align-items-center ${css(
          styles.colorPickerRow
        )}`}>
        <OverlayTrigger
          overlay={<Tooltip>Upload Elements</Tooltip>}
          placement={"bottom"}>
          {({ ref, ...triggerHandler }) => (
            <button
              className={`${css(styles.addIconWrapper)}`}
              style={{ border: `0.2vw solid #fff` }}
              onClick={() => setUploadModal(true)}
              {...triggerHandler}>
              <SVG
                ref={ref}
                width='auto'
                height='auto'
                src={Images.plusIcon}
                className={`${css(styles.addIcon)}`}
              />
            </button>
          )}
        </OverlayTrigger>

        <span className={`${css(styles.uploadText)}`}>Upload elements</span>
      </div>

      <div className={`d-flex flex-wrap align-item-`}>
        {filteredElements &&
          filteredElements.map((elementKey) => (
            <div
              key={elementKey}
              className={`d-flex justify-content-center flex-column align-items-center ${css(
                styles.imageBox
              )}`}>
              <img
                src={displayFiles[elementKey].url}
                key={elementKey}
                alt={elementKey}
                onClick={() => handleAddElement(elementKey)}
                className={`${css(styles.imageBoxImage)}`}
              />

              <div
                className={`d-flex justify-content-between align-items-center ${css(
                  styles.imageDeleteWrapper
                )}`}>
                <span className={`${css(styles.imageName)}`}>
                  {elementKey.length > 17
                    ? elementKey.substring(0, 13) + "..."
                    : elementKey}
                </span>
                {displayFiles[elementKey] &&
                  !displayFiles[elementKey].default && (
                    <SVG
                      width='auto'
                      height='auto'
                      src={Images.trashIcon}
                      className={`${css(styles.imageDeleteIcon)}`}
                      onClick={() => handleDeleteElement(elementKey)}
                    />
                  )}
              </div>
            </div>
          ))}
      </div>

      <UploadFileModal
        uploadModal={uploadModal}
        setUploadModal={setUploadModal}
        filesExtensions={filesExtensions}
        type={"elements"}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  elements: state.canvasData.elements,
});

export default connect(mapStateToProps)(ElementSidebar);
