import { useState, useEffect } from "react";
import { css } from "aphrodite";
import { TextField, UploadFileModal } from "..";
import { Images } from "../../theme";
import styles from "./styles";
import SVG from "react-inlinesvg";
import { connect, useDispatch } from "react-redux";
import { deleteFont } from "../../actions/CanvasDataAction";
import { textFilesExtensions } from "../../constants";
import { DELETE_USER_FONT } from "../../graphQueries";
import { useMutation } from "@apollo/client";
import { logoutModal } from "../../actions/LayoutAction";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const TextSideBar = (props) => {
  const { selectedStage } = props;
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [uploadModal, setUploadModal] = useState(false);

  const [displayFiles, setDisplayFiles] = useState({});

  const [deleteUserFont] = useMutation(DELETE_USER_FONT, {
    onError(err) {
      console.error(err);
      if (err.message.includes("Received status code 401")) {
        dispatch(logoutModal({ data: true }));
      }
    },
  });

  useEffect(() => {
    if (props.fonts && Object.keys(props.fonts).length > 0)
      setDisplayFiles(props.fonts);
  }, [props.fonts]);

  const handleDeleteFontFamily = (fontFamily) => {
    document.fonts.delete(displayFiles[fontFamily].fontFace);
    dispatch(deleteFont({ fontFamily }));

    if (displayFiles[fontFamily]?.id) {
      deleteUserFont({ variables: { id: displayFiles[fontFamily].id } });
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddText = () => {
    selectedStage?.canvas?.current?.handleAddText();
  };

  const filteredFonts = Object.keys(displayFiles).filter(
    (font) =>
      font.toLowerCase().match(search.toLocaleLowerCase()) &&
      !displayFiles[font].isDeleted
  );

  return (
    <div className={`${css(styles.main)}`}>
      <div>
        <TextField
          placeholder='Search Fonts'
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
          overlay={<Tooltip>Upload Fonts</Tooltip>}
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

        <span className={`${css(styles.uploadText)}`}>
          Upload your own font
        </span>
      </div>

      <button
        className={`d-flex justify-content-center align-items-center ${css(
          styles.addTextWrapper
        )}`}
        onClick={handleAddText}>
        <span>Add Text</span>
      </button>

      {filteredFonts && filteredFonts.length > 0 && (
        <div className={`d-flex ${css(styles.subHeading)}`}>
          <span>My fonts</span>
        </div>
      )}

      {filteredFonts &&
        filteredFonts.map((item) => (
          <div
            className={`d-flex justify-content-between align-items-center ${css(
              styles.listItemWrapper
            )}`}
            key={item}>
            <span className={`${css(styles.modalText)}`}>
              {item.length > 20 ? item.substring(0, 20) : item}
            </span>

            <SVG
              height='auto'
              width='auto'
              src={Images.trashIcon}
              className={`${css(styles.listIcon)}`}
              onClick={() => handleDeleteFontFamily(item)}
            />
          </div>
        ))}

      <UploadFileModal
        uploadModal={uploadModal}
        setUploadModal={setUploadModal}
        filesExtensions={textFilesExtensions}
        type={"fonts"}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  fonts: state.canvasData.fonts,
});

export default connect(mapStateToProps)(TextSideBar);
