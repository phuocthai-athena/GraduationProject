import moment from "moment";
import React, { Component } from "react";
import "react-markdown-editor-lite/lib/index.css";
import { connect } from "react-redux";
import { getAllUsers } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import "./TableDoctorStatistical.scss";

class TableDoctorStatistical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
    };
  }

  async componentDidMount() {
    await this.getAllUserStatistical();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        arrUsers: this.props.listUsers,
      });
    }
  }

  getAllUserStatistical = async () => {
    let res = await getAllUsers("ALL");
    if (res && res.errCode === 0) {
      this.setState({
        arrUsers: res.users,
      });
    }
  };

  render() {
    let arrUsers = this.state.arrUsers;
    let { language } = this.props;
    return (
      <React.Fragment>
        <div className="statiscal-title">
          {language === LANGUAGES.VI ? "Danh sách bác sĩ" : "List of doctors"}
        </div>
        <table id="tableManagerUser">
          <tbody>
            <tr>
              <th>Stt</th>
              <th>Email</th>
              <th>{language === LANGUAGES.VI ? "Tên" : "First name"}</th>
              <th>{language === LANGUAGES.VI ? "Họ" : "Last name"}</th>
              <th>{language === LANGUAGES.VI ? "Giới tính" : "Gender"}</th>
              <th>
                {language === LANGUAGES.VI ? "Ngày sinh" : "Date of birth"}
              </th>
              <th>
                {language === LANGUAGES.VI ? "Số điện thoại" : "Phone number"}
              </th>
              <th>{language === LANGUAGES.VI ? "Địa chỉ" : "Address"}</th>
            </tr>
            {arrUsers &&
              arrUsers.length > 0 &&
              arrUsers.map((item, index) => {
                if (item.roleId === "R2") {
                  let sex = "";
                  if (item.gender === "M") {
                    sex = "Nam";
                  } else if (item.gender === "N") {
                    sex = "Nữ";
                  } else {
                    sex = "Khác";
                  }
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{sex}</td>
                      <td>
                        {item.birthday === null
                          ? ""
                          : moment.unix(item.birthday).format("MM/DD/YYYY")}
                      </td>
                      <td>{item.phonenumber}</td>
                      <td>{item.address}</td>
                    </tr>
                  );
                }
              })}
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
)(TableDoctorStatistical);
