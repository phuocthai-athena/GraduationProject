import moment from "moment";
import React, { Component } from "react";
import "react-markdown-editor-lite/lib/index.css";
import { connect } from "react-redux";
import {
  deleteScheduleSelected,
  getScheduleDoctorByDate,
} from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import "./TableManageSchedule.scss";

class TableManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSelected: [],
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.currentDate !== prevProps.currentDate) {
      let doctorId = this.props.doctorId;
      let date = this.props.currentDate;
      let formatedDate = moment(date).unix();
      let res = await getScheduleDoctorByDate(doctorId, formatedDate);
      if (res && res.errCode === 0) {
        this.setState({
          timeSelected: res.data ? res.data : [],
        });
      }
    }
  }

  handleDeleteHour = async (listSchedule) => {
    await deleteScheduleSelected(
      listSchedule.doctorId,
      listSchedule.date,
      listSchedule.timeType
    );
    let doctorId = this.props.doctorId;
    let date = this.props.currentDate;
    let formatedDate = moment(date).unix();
    let res = await getScheduleDoctorByDate(doctorId, formatedDate);
    if (res && res.errCode === 0) {
      this.setState({
        timeSelected: res.data ? res.data : [],
      });
    }
  };

  render() {
    let { timeSelected } = this.state;
    let { language } = this.props;
    return (
      <React.Fragment>
        <table id="TableManagerSchedule">
          <tbody>
            <tr>
              <th>Stt</th>
              <th>Lịch đã chọn</th>
              <th>Tác vụ</th>
            </tr>
            {timeSelected && timeSelected.length > 0 ? (
              timeSelected.map((item, index) => {
                let labelVi = `Khung giờ "${item.timeTypeData.valueVi}"`;
                let labelEn = `Time slot "${item.timeTypeData.valueEn}"`;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{language === LANGUAGES.VI ? labelVi : labelEn}</td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteHour(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={"6"} style={{ textAlign: "center" }}>
                  Chưa có lịch hẹn khám
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </React.Fragment>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageSchedule);
