import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import React, { Component } from "react";
import "react-markdown-editor-lite/lib/index.css";

import { connect } from "react-redux";
import Select from "react-select";
// import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import "./ManageDoctor.scss";
import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // save to Markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      listDoctor: [],




      // save to doctor_infor table           (92...thêm vào bảng này)
      listClinic: [],
      listSpecialty: [],

      selectedClinic: '',
      selectedSpecialty: '',

      clinicId: '',
      specialtyId: ''


    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;

        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctor: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      
      
      this.setState({
        listDoctor: dataSelect,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {

    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,


      clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
      specialtyId: this.state.selectedSpecialty.value
    });
  };

  handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };

  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  render() {
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Thêm thông tin bác sĩ</div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label>Chọn bác sĩ</label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChange}
              options={this.state.listDoctor}
            />
          </div>
          <div className="content-right">
            <label>Thông tin giới thiệu</label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(event) => this.handleOnChangeDesc(event)}
              value={this.state.description}
            ></textarea>
          </div>
        </div>

        <div className="row">
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.specialty"/></label>
            <Select
              value={this.state.selectedSpecialty}
              options={this.state.listSpecialty}
              placeholder={<FormattedMessage id="admin.manage-doctor.specialty"/>}
              onChange={this.handleChangeSelectDoctorInfor}
              name="selectedSpecialty"
            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.select-clinic"/></label>
            <Select
              value={this.state.selectedClinic}
              options={this.state.listClinic}
              placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic"/>}
              onChange={this.handleChangeSelectDoctorInfor}
              name="selectedClinic"
            />
          </div>
        </div>

        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={() => this.handleEditorChange}
          />
        </div>

        <button
          className="save-content-doctor"
          onClick={() => this.handleSaveContentMarkdown()}
        >
          Lưu thông tin
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: () => dispatch(actions.saveDetailDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
