import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedDate, FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import "./ManagePatient.scss";
import { getAllPatientForDoctor } from "../../../services/userService";

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
        };
    }

    async componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();;
        console.log("check state: ", this.state);
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate,
        })
        console.log("check res: ", res);
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        });
    };

    render() {
        console.log(">>>>", this.props);
        return (
            <div className="manage-patient-container">
                <div className="m-p-title">
                    Quản lý bệnh nhân khám bệnh
                </div>

                <div className="manage-patient-body row">
                    <div className="col-4 form-group">
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className="form-control"
                            value={this.state.currentDate}
                        />
                    </div>
                    <div className="col-12 table-manage-patient">
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th colSpan="2">Telephone</th>
                                </tr>
                                <tr>
                                    <td>Bill Gates</td>
                                    <td>1444444</td>
                                    <td>1888880</td>
                                </tr>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
