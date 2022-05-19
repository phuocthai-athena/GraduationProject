import moment from "moment";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getAllPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import "./ManagePatient.scss";
import ConfirmDeletePatient from "./Modal/ConfirmDeletePatient";
import RemedyModal from "./RemedyModal";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: "",
      dataPatient: [],
      isOpenConfirmDelete: false,
      isOpenRemedyModal: false,
      isDeleteSucceed: false,
      dataModal: {},
      itemDelete: {},
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.state.isOpenConfirmDelete !== prevState.isOpenConfirmDelete) {
      await this.getDataPatient();
    }
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = moment(currentDate).unix();
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  handleDeletePatient = async (item) => {
    this.setState({ itemDelete: item });
    this.handleOpenModal();
  };

  handleOpenModal = () => {
    this.setState({ isOpenConfirmDelete: true });
  };

  toggleConfirmDelete = () => {
    this.setState({
      isOpenConfirmDelete: !this.state.isOpenConfirmDelete,
    });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };

  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });
    if (res && res.errCode === 0) {
      if (this.props.language === LANGUAGES.VI) {
        toast.success("Gửi biện pháp khắc phục thành công");
      } else {
        toast.success("Send remedy succeeds");
      }
      this.closeRemedyModal();
      await this.getDataPatient();
    } else {
      if (this.props.language === LANGUAGES.VI) {
        toast.error("Có gì đó không đúng...");
      } else {
        toast.error("Something wrong...");
      }
    }
  };

  render() {
    let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="manage-patient-container container">
          <div className="title">
            <FormattedMessage id="manage-patient.title" />
          </div>

          <div className="manage-patient-body row">
            <div className="container">
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="manage-patient.choose-date" />
                </label>
                <div className="date-picker">
                  <DatePicker
                    onChange={this.handleOnChangeDatePicker}
                    className="form-control choose-date"
                    value={this.state.currentDate}
                  />
                  <i className="fas fa-calendar-alt calendar"></i>
                </div>
              </div>
              <div className="col-12 table-manage-patient">
                <table id="TableManagerPatient" style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>
                        {language === LANGUAGES.VI
                          ? "Lịch đã chọn"
                          : "Selected calendar"}
                      </th>
                      <th>
                        {language === LANGUAGES.VI ? "Họ tên" : "Full name"}
                      </th>
                      <th>
                        {language === LANGUAGES.VI ? "Địa chỉ" : "Address"}
                      </th>
                      <th>
                        {language === LANGUAGES.VI ? "Giới tính" : "Gender"}
                      </th>
                      <th className="text-center">
                        {language === LANGUAGES.VI ? "Tác vụ" : "Actions"}
                      </th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        console.log("test1", item);
                        let time =
                          language === LANGUAGES.VI
                            ? item.timeTypeDataPatient.valueVi
                            : item.timeTypeDataPatient.valueEn;
                        let gender =
                          language === LANGUAGES.VI
                            ? item.patientData.genderData.valueVi
                            : item.patientData.genderData.valueEn;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            <td>{item.patientData.firstName}</td>
                            <td>{item.patientData.address}</td>
                            <td>{gender}</td>
                            <td className="text-center">
                              <button
                                className="btn btn-info"
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                {language === LANGUAGES.VI
                                  ? "Xác nhận"
                                  : "Confirm"}
                              </button>
                              <button
                                className="btn btn-danger mb-btn-cancel"
                                onClick={() => this.handleDeletePatient(item)}
                              >
                                {language === LANGUAGES.VI ? "Hủy" : "Cancel"}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={"6"} style={{ textAlign: "center" }}>
                          No data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <RemedyModal
          isOpenModal={isOpenRemedyModal}
          dataModal={dataModal}
          closeRemedyModal={this.closeRemedyModal}
          sendRemedy={this.sendRemedy}
        />
        <ConfirmDeletePatient
          isOpenModal={this.state.isOpenConfirmDelete}
          toggleFromParent={this.toggleConfirmDelete}
          item={this.state.itemDelete}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
