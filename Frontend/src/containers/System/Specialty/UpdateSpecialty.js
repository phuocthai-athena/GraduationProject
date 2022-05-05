import React, { Component, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import { updateSpecialtyById, getDetailSpecialtyById } from "../../../services/userService";
import { CKEditorComponent } from "../../../components/CkEditor";
import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt(/*MarkDown-it options*/);

function UpdateSpecialty() {
    const [name, setName] = useState("");
    const [imageBase64, setImageBase64] = useState("");
    const [descriptionHTML, setDescriptionHTML] = useState("");
    const { specialtyId } = useParams();
    const [isEditorReady, setIsEditorReady] = useState(false);
    const [specialty, setSpecialty] = useState({});
    const history = useHistory();

    useEffect(() => {
        const fetchSpecialty = async () => {
            try {
                const { data, errCode } = await getDetailSpecialtyById({
                    id: specialtyId,
                    location: "ALL",
                });

                if (errCode === 0) {
                    setSpecialty(data);
                    setName(data.name);
                    setImageBase64(data.image);
                    setDescriptionHTML(data.descriptionHTML);
                    setIsEditorReady(true);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchSpecialty();
    }, [specialtyId]);

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

    const handleUpdateSpecialty = async () => {
        let res = await updateSpecialtyById({
            ...specialty,
            name,
            image: imageBase64,
            descriptionHTML,
        });

        if (res) {
            toast.success("Cập nhật chuyên khoa thành công!");
            history.push("/system/manage-specialty");
        } else {
            toast.error("Bạn chưa nhập đủ thông tin, mời bạn nhập lại!");
            console.log("Sai, check lai res", res);
        }
    };

    return (
        <div className="manage-handbook-container">
            <div className="hb-title">
                <FormattedMessage id="admin.manage-handbook.edit-title" />
            </div>
            <div className="add-new-handbook row">
                <div className="col-6 form-group">
                    <label>
                        <FormattedMessage id="admin.manage-handbook.name" />
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        value={name}
                        onChange={(event) => handleNameChanged(event, "name")}
                    ></input>
                </div>
                <div className="col-6 form-group">
                    <div>
                        <FormattedMessage id="admin.manage-handbook.image" />
                    </div>
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
                    <button className="btn-save-handbook" onClick={handleUpdateSpecialty}>
                        <FormattedMessage id="admin.manage-handbook.update" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateSpecialty;
