import { ProgressBar } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import SVG from "react-inlinesvg";
import { css } from "aphrodite";
import { Colors, Images } from "../../theme";
import styles from "./styles";
import { ModalView } from "..";
import { useDispatch } from "react-redux";
import {
  addElementBlob,
  addFonts,
  addImageBlob,
} from "../../actions/CanvasDataAction";
import { useMutation } from "@apollo/client";
import {
  UPLOAD_ELEMENT_DATA,
  UPLOAD_FILE_TO_SERVER,
  UPLOAD_FONT_DATA,
  UPLOAD_IMAGE_DATA,
} from "../../graphQueries";
import { connect } from "react-redux";
import { logoutModal } from "../../actions/LayoutAction";
import _ from "lodash";
import { GET_GLYPHS } from "../../services/userHelper";

const UploadFileModal = (props) => {
  const { uploadModal, filesExtensions, setUploadModal, type } = props;

  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [allFiles, setAllFiles] = useState({});
  const [progressBar, setProgressBar] = useState(0);
  const [modalError, setModalError] = useState("");
  const [fontsFace, setFontsFace] = useState({});
  const [imagesBlob, setImagesBlob] = useState({});

  useEffect(() => {
    if (progressBar >= 99) {
      const fonts = { ...fontsFace };

      if (type == "fonts") dispatch(addFonts({ fonts }));

      if (type === "images") {
        const images = { ...imagesBlob };
        dispatch(addImageBlob({ images }));
      }

      if (type === "elements") {
        const elements = { ...imagesBlob };
        dispatch(addElementBlob({ elements }));
      }

      setTimeout(() => {
        setProgressBar(0);
        setAllFiles({});
        setImagesBlob({});
        setUploading(false);
        setModalError("");
        setFontsFace({});
      }, 700);

      setTimeout(() => {
        setUploadModal(false);
      }, 500);
    }
  }, [progressBar]);

  const handleUpdateToInitialState = () => {
    if (uploading) {
      return;
    }
    setTimeout(() => {
      setProgressBar(0);
      setAllFiles({});
      setUploading(false);
      setModalError("");
      setFontsFace({});
      setImagesBlob({});
    }, 300);

    setUploadModal(false);
  };

  const [uploadFileToServer] = useMutation(UPLOAD_FILE_TO_SERVER, {
    async onCompleted(data) {
      if (type === "images")
        addImageFile({
          variables: {
            name: data.upload.data.attributes.name,
            url: data.upload.data.attributes.url,
            height: data.upload.data.attributes.height,
            width: data.upload.data.attributes.width,
            userId: props.user.id,
            s3_imageId: data.upload.data.id,
          },
        });

      if (type === "fonts") {
        addFontFile({
          variables: {
            name: data.upload.data.attributes.name,
            url: data.upload.data.attributes.url,
            ext: data.upload.data.attributes.ext,
            mime: data.upload.data.attributes.mime,
            userId: props.user.id,
            s3_fontId: data.upload.data.id,
          },
        });
      }

      if (type === "elements") {
        addElementFile({
          variables: {
            name: data.upload.data.attributes.name,
            url: data.upload.data.attributes.url,
            height: data.upload.data.attributes.height,
            width: data.upload.data.attributes.width,
            userId: props.user.id,
            s3_elementId: data.upload.data.id,
          },
        });
      }
    },

    onError(err) {
      console.error(err.message);
      console.error(err);

      setUploading(false);

      setModalError(err.message);

      if (err.message.includes("Received status code 401")) {
        dispatch(logoutModal({ data: true }));
      }
    },
  });

  const [addImageFile] = useMutation(UPLOAD_IMAGE_DATA, {
    onCompleted(data) {
      setImagesBlob((state) => ({
        ...state,
        [`${data?.createImage?.data?.attributes.name}_${data?.createImage?.data?.id}`]:
          {
            url: data?.createImage?.data?.attributes?.url,
            id: data?.createImage?.data?.id,
            name: data?.createImage?.data?.attributes.name,
          },
      }));

      setProgressBar((state) => state + addPerc);
    },

    onError(err) {
      console.error(err.message);
      setModalError(err.message);
      if (err.message.includes("Received status code 401")) {
        dispatch(logoutModal({ data: true }));
      }
    },
  });

  const [addFontFile] = useMutation(UPLOAD_FONT_DATA, {
    async onCompleted(data) {
      try {
        const item = data.createFont.data;
        let fontClass = item.attributes.name.split(".")[0];
        fontClass = fontClass.split(" ").join("");
        document.body.classList.add(fontClass);

        const newFont = new FontFace(fontClass, `url(${item.attributes.url})`);

        const allGlyphs = await GET_GLYPHS(item.attributes.url);

        await newFont.load();

        document.fonts.add(newFont);

        let fontName = item.attributes.name.split(".")[0];

        setFontsFace((state) => ({
          ...state,
          [fontName]: {
            fontFamily: newFont.family,
            fontClass,
            name: fontName,
            url: item.attributes.url,
            isDeleted: item.attributes.isDeleted,
            id: item.id,
            fontFace: newFont,
            fontGlyphs: _.isEmpty(allGlyphs) ? [] : allGlyphs,
          },
        }));
        setProgressBar((state) => state + addPerc);
      } catch (error) {
        console.error({ error });
      }
    },
    onError(err) {
      console.error(err.message);
      setModalError(err.message);

      if (err.message.includes("Received status code 401")) {
        dispatch(logoutModal({ data: true }));
      }
    },
  });

  const [addElementFile] = useMutation(UPLOAD_ELEMENT_DATA, {
    onCompleted(data) {
      setImagesBlob((state) => ({
        ...state,
        [`${data?.createElement?.data?.attributes.name}_${data?.createElement?.data?.id}`]:
          {
            url: data?.createElement?.data?.attributes?.url,
            id: data?.createElement?.data?.id,
            name: data?.createElement?.data?.attributes.name,
          },
      }));

      setProgressBar((state) => state + addPerc);
    },

    onError(err) {
      console.error(err.message);

      setModalError(err.message);

      if (err.message.includes("Received status code 401")) {
        dispatch(logoutModal({ data: true }));
      }
    },
  });

  const handleOnClick = (e) => {
    inputRef.current.click();
  };

  const handleChangeFilePicker = (e) => {
    handleFiles(e.target.files);
  };

  const handleDragIn = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDragOut = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();

    handleFiles(e.dataTransfer.files);
  };

  const handleFiles = async (files) => {
    modalError && setModalError("");

    const wrongExtensions = {};

    let data = {};
    Object.keys(files).map((idx) => {
      const splittedFile = files[idx].name.split(".");
      const check = filesExtensions.includes(
        splittedFile[splittedFile.length - 1]?.toLowerCase()
      );

      if (check) {
        data[files[idx].name] = files[idx];
      } else {
        const extension = files[idx].name.split(".")[1]?.toLowerCase();
        wrongExtensions[extension] = extension;
      }
    });

    if (wrongExtensions && Object.keys(wrongExtensions)?.length > 0) {
      setModalError(
        `.${Object.keys(wrongExtensions).join(", .")} invalid file type`
      );
    }

    setAllFiles({ ...allFiles, ...data });
  };

  const uploadFiles = () => {
    if (!allFiles || Object.keys(allFiles).length == 0) {
      setModalError("Files not Found");
      return;
    }

    modalError && setModalError("");

    setUploading(true);

    Object.keys(allFiles).map((file) => {
      uploadFileToServer({
        variables: { file: allFiles[file] },
      });
    });
  };

  const fileLength =
    Object.keys(allFiles).length === 0 ? 1 : Object.keys(allFiles).length;

  const addPerc = 100 / fileLength;

  return (
    <ModalView
      showModal={uploadModal}
      setShowModal={setUploadModal}
      title={"Upload Files"}
      cancelText={`Cancel`}
      cancelOnClick={handleUpdateToInitialState}
      submitText={`Upload`}
      submitOnClick={uploadFiles}
      backdrop={"static"}
    >
      {!uploading ? (
        <div
          className={`d-flex flex-column justify-content-center align-items-center ${css(
            styles.modalMain
          )}`}
          onDragEnter={handleDragIn}
          onDragOver={handleDragOut}
          onDrop={handleDrop}
        >
          {allFiles && Object.keys(allFiles).length === 0 ? (
            <>
              <SVG
                height="auto"
                width="auto"
                src={Images.cloudIcon}
                className={`${css(styles.addIcon)}`}
              />

              <div className={`${css(styles.modalText)}`}>
                Acceptable files (.{filesExtensions.join(", .")})
              </div>

              <div className={`${css(styles.modalText)}`}>
                Drag and drop here
              </div>

              <div className={`${css(styles.modalText)}`}>or</div>

              <div
                className={`${css(styles.modalText)} ${css(styles.filePicker)}`}
                onClick={handleOnClick}
              >
                browse
              </div>

              <div className={`${css(styles.errors)}`}>{modalError}</div>
            </>
          ) : (
            <>
              <div
                className={`d-flex justify-content-center align-items-center flex-column ${css(
                  styles.fontWrapper
                )}`}
              >
                {allFiles &&
                  Object.keys(allFiles).map((key) => (
                    <span className={`${css(styles.fontText)}`} key={key}>
                      {allFiles[key].name?.length > 35
                        ? allFiles[key].name.split(".")[0].substring(0, 35) +
                          "..." +
                          allFiles[key].name.split(".")[1]
                        : allFiles[key].name}
                    </span>
                  ))}
              </div>

              {/* <Divider */}

              <div className={`${css(styles.modalText)}`}>
                Drag and drop here
              </div>

              <div className={`${css(styles.modalText)}`}>or</div>

              <div
                className={`${css(styles.modalText)} ${css(styles.filePicker)}`}
                onClick={handleOnClick}
              >
                Add more files
              </div>

              {modalError && (
                <div className={`${css(styles.errors)}`}>{modalError}</div>
              )}
            </>
          )}

          <input
            type="file"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handleChangeFilePicker}
            multiple
          />
        </div>
      ) : (
        <>
          <ProgressBar animated variant={Colors.themeColor} now={progressBar} />

          {modalError && (
            <div className={`${css(styles.errors)}`}>{modalError}</div>
          )}
        </>
      )}
    </ModalView>
  );
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(UploadFileModal);
