import { useState, useRef, useEffect } from "react";
import { css } from "aphrodite";
import { v4 as uuid } from "uuid";
import { TextField, UploadFileModal } from "..";
import { Images } from "../../theme";
import styles from "./styles";
import { OverlayTrigger, ProgressBar, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { connect, useDispatch } from "react-redux";
import {
  addFonts,
  addImageBlob,
  deleteFont,
  deleteImageBlob,
} from "../../actions/CanvasDataAction";
import { imageFilesExtension } from "../../constants";
import { useLazyQuery, useMutation } from "@apollo/client";
import { DELETE_IMAGE } from "../../graphQueries";
import { logoutModal } from "../../actions/LayoutAction";

const ImageSideBar = (props) => {
  const { selectedStage } = props;
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [uploadModal, setUploadModal] = useState(false);

  const [displayFiles, setDisplayFiles] = useState({});

  useEffect(() => {
    if (props.images && Object.keys(props.images).length > 0)
      setDisplayFiles(props.images);
  }, [props.images]);

  const [deleteUserImage] = useMutation(DELETE_IMAGE, {
    onError(err) {
      console.error(err);
      if (err.message.includes("Received status code 401")) {
        dispatch(logoutModal({ data: true }));
      }
    },
  });

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddImage = (imageKey) => {
    selectedStage?.canvas?.current?.handleAddImage(
      imageKey,
      displayFiles[imageKey].url
    );
  };

  const handleImageDelete = (imgKey) => {
    dispatch(deleteImageBlob({ imgKey }));

    if (displayFiles[imgKey] && displayFiles[imgKey].id) {
      deleteUserImage({ variables: { id: displayFiles[imgKey].id } });
    }
  };

  const filteredImages = Object.keys(displayFiles).filter(
    (imgName) =>
      imgName.toLowerCase().match(search.toLowerCase()) &&
      !displayFiles[imgName]?.isDeleted
  );

  return (
    <div className={`${css(styles.main)}`}>
      <div className=''>
        <TextField
          placeholder='Search Photos'
          icon={Images.searchBarIcon}
          styles={[styles.formInput]}
          iconStyles={[styles.searchIcon]}
          value={search}
          onChange={handleChange}
        />
      </div>

      <div
        className={`d-flex justify-content-start align-items-center ${css(
          styles.colorPickerRow
        )}`}>
        <OverlayTrigger
          overlay={<Tooltip>Upload Photos</Tooltip>}
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

        <span className={`${css(styles.uploadText)}`}>Add Photo</span>
      </div>

      <div className={`d-flex flex-wrap align-item-`}>
        {filteredImages &&
          filteredImages.map((imgKey) => (
            <div
              key={imgKey}
              className={`d-flex justify-content-center flex-column align-items-center ${css(
                styles.imageBox
              )}`}>
              <img
                src={displayFiles[imgKey].url}
                key={imgKey}
                alt={imgKey}
                onClick={() => handleAddImage(imgKey)}
                className={`${css(styles.imageBoxImage)}`}
              />

              <div
                className={`d-flex justify-content-between align-items-center ${css(
                  styles.imageDeleteWrapper
                )}`}>
                <span className={`${css(styles.imageName)}`}>
                  {imgKey.length > 17
                    ? imgKey.substring(0, 13) + "..."
                    : imgKey}
                </span>

                <SVG
                  width='auto'
                  height='auto'
                  src={Images.trashIcon}
                  className={`${css(styles.imageDeleteIcon)}`}
                  onClick={() => handleImageDelete(imgKey)}
                />
              </div>
            </div>
          ))}
      </div>

      <UploadFileModal
        uploadModal={uploadModal}
        setUploadModal={setUploadModal}
        filesExtensions={imageFilesExtension}
        type={"images"}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  images: state.canvasData.images,
});

export default connect(mapStateToProps)(ImageSideBar);
