import React, { Component, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import { updateClinicById, getAllDetailClinicById } from "../../../services/userService";
import { CKEditorComponent } from "../../../components/CkEditor";
import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt(/*MarkDown-it options*/);

function UpdateClinic() {
    const [name, setName] = useState("");
    const [imageBase64, setImageBase64] = useState("");
    const [descriptionHTML, setDescriptionHTML] = useState("");
    const [address, setAddress] = useState("");
    const { clinicId } = useParams();
    const [isEditorReady, setIsEditorReady] = useState(false);
    const [clinic, setClinic] = useState({});
    const history = useHistory();

    useEffect(() => {
        const fetchClinic = async () => {
            try {
                const { data, errCode } = await getAllDetailClinicById({
                    id: clinicId,
                });

                if (errCode === 0) {
                    setClinic(data);
                    setName(data.name);
                    setImageBase64(data.image);
                    setAddress(data.address);
                    setDescriptionHTML(data.descriptionHTML);
                    setIsEditorReady(true);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchClinic();
    }, [clinicId]);

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

    const handleUpdateClinic = async () => {
        let res = await updateClinicById({
            ...clinic,
            name,
            image: imageBase64,
            address,
            descriptionHTML,
        });

        if (res) {
            toast.success("Cập nhật phòng khám thành công!");
            history.push("/system/manage-clinic");
        } else {
            toast.error("Bạn chưa nhập đủ thông tin, mời bạn nhập lại!");
            console.log("Sai, check lai res", res);
        }
    };

    return (
        <div className="manage-handbook-container">
            <div className="hb-title">
                <FormattedMessage id="admin.manage-clinic.edit-title" />
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

                <div className="col-12 form-group">
                    <label>
                        <FormattedMessage id="admin.manage-clinic.address" />
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                    />
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
                    <button className="btn-save-handbook" onClick={handleUpdateClinic}>
                        <FormattedMessage id="admin.manage-handbook.update" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateClinic;
