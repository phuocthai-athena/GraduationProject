import React, { Component, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "./AddHandBook.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import {
  updateHandBookById,
  getHandBookById,
} from "../../../services/userService";
import { CKEditorComponent } from "../../../components/CkEditor";

const mdParser = new MarkdownIt(/*MarkDown-it options*/);

function UpdateHandBook() {
  const [name, setName] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [descriptionHTML, setDescriptionHTML] = useState("");
  const { handBookId } = useParams();
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [handBook, setHandBook] = useState({});
  const history = useHistory();

  useEffect(() => {
    const fetchHandBook = async () => {
      try {
        const { data, errCode } = await getHandBookById(handBookId);

        if (errCode === 0) {
          setHandBook(data);
          setName(data.name);
          setImageBase64(data.image);
          setDescriptionHTML(data.descriptionHTML);
          setIsEditorReady(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchHandBook();
  }, [handBookId]);

  const handleNameChanged = (event) => {
    setName(event.target.value);
  };

  const handleEditorChange = (content) => {
    setDescriptionHTML(content);
  };

  const handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      setImageBase64(base64);
    }
  };

  const handleUpdateHandBook = async () => {
    let res = await updateHandBookById({
      ...handBook,
      name,
      image: imageBase64,
      descriptionHTML,
    });

    if (res) {
      toast.success("Cập nhật cẩm nang thành công!");
      history.push("/system/manage-handbook");
    } else {
      toast.error("Bạn chưa nhập đủ thông tin, mời bạn nhập lại!");
      console.log("Sai, check lai res", res);
    }
  };

  return (
    <div className="manage-handbook-container">
      <div className="hb-title">Cập nhật cẩm nang</div>
      <div className="add-new-handbook row">
        <div className="col-6 form-group">
          <label>Tên cẩm nang</label>
          <input
            className="form-control"
            type="text"
            value={name}
            onChange={(event) => handleNameChanged(event, "name")}
          ></input>
        </div>
        <div className="col-6 form-group">
          <div>Ảnh cẩm nang</div>
          <input
            className="form-control-file"
            type="file"
            onChange={handleOnChangeImage}
          ></input>
        </div>

        <div className="col-12">
          {isEditorReady && (
            <CKEditorComponent
              data={descriptionHTML}
              onChangeData={handleEditorChange}
            />
          )}
        </div>

        <div className="col-12">
          <button className="btn-save-handbook" onClick={handleUpdateHandBook}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateHandBook;
