import moment from "moment";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatientForHistory } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import "./ManageHistoryPatient.scss";

class ManageHistoryPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: "",
      dataPatient: [],
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = moment(currentDate).unix();
    let res = await getAllPatientForHistory({
      doctorId: user.id,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

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

  status = (item) => {
    if (item === "S1") {
      return "Lịch hẹn mới";
    } else if (item === "S2") {
      return "Đã xác nhận";
    } else if (item === "S3") {
      return "Đã khám xong";
    } else if (item === "S4") {
      return "Đã hủy";
    }
  };

  render() {
    let { dataPatient } = this.state;
    let { language } = this.props;
    return (
      <div className="manage-history-patient container">
        <div className="history-title">
          <FormattedMessage id="history-patient.title" />
        </div>
        <div className="manage-history-patient-body row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="history-patient.choose-date" />
            </label>
            <div className="date-picker">
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
              />
              <i className="fas fa-calendar-alt calendar"></i>
            </div>
          </div>

          <div className="col-12 table-manage-history-patient">
            <table id="TableManagerPatient" style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <th>STT</th>
                  <th>
                    {language === LANGUAGES.VI
                      ? "Lịch khám"
                      : "Selected calendar"}
                  </th>
                  <th>{language === LANGUAGES.VI ? "Họ tên" : "Full name"}</th>
                  <th>{language === LANGUAGES.VI ? "Địa chỉ" : "Address"}</th>
                  <th>{language === LANGUAGES.VI ? "Giới tính" : "Gender"}</th>
                  <th>
                    {language === LANGUAGES.VI ? "Lý do khám bệnh" : "Reason"}
                  </th>
                  <th>{language === LANGUAGES.VI ? "Trạng thái" : "Status"}</th>
                </tr>
                {dataPatient && dataPatient.length > 0 ? (
                  dataPatient.map((item, index) => {
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
                        <td>{item.reason}</td>
                        <td>{this.status(item.statusId)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={"7"} style={{ textAlign: "center" }}>
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageHistoryPatient);
