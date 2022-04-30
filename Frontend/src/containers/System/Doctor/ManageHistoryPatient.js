import React, { Component } from "react";
import { connect } from "react-redux";
import './ManageHistoryPatient.scss'
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatientForHistory } from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";

class ManageHistoryPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    let res = await getAllPatientForHistory({
      doctorId: user.id,
      date: formatedDate,
    })
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data
      })
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    }, async () => {
      await this.getDataPatient();
    });
  };

  render() {
    let { dataPatient } = this.state;
    let { language } = this.props;
    return (
      <div className="manage-history-patient">
        <div className="m-p-title">
          Quản lý lịch sử bệnh nhân khám bệnh
        </div>
        <div className="manage-history-patient-body row">
          <div className="col-4 form-group">
            <label>Chọn ngày khám</label>
            <DatePicker
              onChange={this.handleOnChangeDatePicker}
              className="form-control"
              value={this.state.currentDate}
            />
          </div>
          <div className="col-12 table-manage-history-patient">
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <th>STT</th>
                  <th>Thời gian</th>
                  <th>Họ tên</th>
                  <th>Địa chỉ</th>
                  <th>Giới tính</th>
                </tr>
                {dataPatient && dataPatient.length > 0 ?
                  dataPatient.map((item, index) => {
                    let time = language === LANGUAGES.VI ?
                      item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                    let gender = language === LANGUAGES.VI ?
                      item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{time}</td>
                        <td>{item.patientData.firstName}</td>
                        <td>{item.patientData.address}</td>
                        <td>{gender}</td>
                      </tr>
                    )
                  })
                  :
                  <tr>
                    <td colSpan={"6"} style={{ textAlign: "center" }}>No data</td>
                  </tr>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHistoryPatient);
