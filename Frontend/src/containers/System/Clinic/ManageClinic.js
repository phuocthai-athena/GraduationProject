import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewClinic } from "../../../services/userService";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { LANGUAGES } from "../../../utils";

const mdParser = new MarkdownIt(/*MarkDown-it options*/);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    };

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };

    handleSaveNewClinic = async () => {
        let { language } = this.props;

        let res = await createNewClinic(this.state);
        if (res && res.errCode === 0) {
            if (language === LANGUAGES.VI) {
                toast.success("Thêm phòng khám thành công!");
            } else {
                toast.success("Add new clinic succeeds!");
            }
            this.setState({
                name: "",
                imageBase64: "",
                address: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
            });
        } else {
            if (language === LANGUAGES.VI) {
                toast.error("Thêm phòng khám thất bại!");
            } else {
                toast.error("Add new clinic failed!");
            }
        }
    };

    render() {
        return (
            <div className="manage-specialty-container container">
                <div className="ms-title">
                    <FormattedMessage id="manage-clinic.title" />
                </div>

                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>
                            <FormattedMessage id="manage-clinic.name" />
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, "name")}
                        ></input>
                    </div>

                    <div className="col-6 form-group">
                        <label>
                            <FormattedMessage id="manage-clinic.image" />
                        </label>
                        <div className="preview-img-container">
                            <input
                                id="previewImg"
                                type="file"
                                hidden
                                onChange={(event) => this.handleOnChangeImage(event)}
                            />
                            <label className="label-upload" htmlFor="previewImg">
                                <FormattedMessage id="manage-clinic.upload-file" />
                                <i className="fas fa-upload"></i>
                            </label>
                        </div>
                    </div>

                    <div className="col-12 form-group">
                        <label>
                            <FormattedMessage id="manage-clinic.address" />
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.address}
                            onChange={(event) => this.handleOnChangeInput(event, "address")}
                        ></input>
                    </div>

                    <div className="col-12">
                        <label>
                            <FormattedMessage id="manage-clinic.description" />
                        </label>
                        <MdEditor
                            style={{ height: "300px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>

                    <div className="col-12 mt-3">
                        <button
                            className="btn btn-primary"
                            onClick={() => this.handleSaveNewClinic()}
                        >
                            <FormattedMessage id="manage-clinic.button" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
