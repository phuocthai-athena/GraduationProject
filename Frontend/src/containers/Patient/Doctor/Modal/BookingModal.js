import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import "./BookingModal.scss";
import ProfileDoctor from "../ProfileDoctor";
import DatePicker from "../../../../components/Input/DatePicker";
import _ from "lodash";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import UserRedux from "../../../../containers/System/Admin/UserRedux";
import { postPatientBookingAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            phoneNumber: "",
            email: "",
            address: "",
            reason: "",
            birthday: "",
            selectedGender: "",
            doctorId: "",
            genders: "",
            timeType: "",
        };
    }

    async componentDidMount() {
        this.props.getGenders();
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            });
        }
        return result;
    };
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language != prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                console.log(this.props.dataTime);
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                });
            }
        }
    }

    handleOnChangeInput = (e, id) => {
        let valueInput = e.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({ ...stateCopy });
    };

    handleOnChangeBirthDay = (date) => {
        this.setState({ birthday: date[0] });
    };

    handleOnChangeGender = (selectedOption) => {
        this.setState({ selectedGender: selectedOption });
    };

    handleConfirmBooking = async () => {
        //validate input
        let language = this.props.language;

        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeString(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime.doctorData);

        let res = await postPatientBookingAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            birthday: this.state.birthday,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            date: date,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        });
        if (res && res.errCode === 0) {
            let message =
                language === LANGUAGES.VI
                    ? "Đặt lịch hẹn thành công!"
                    : "Booking a new appointment succeed!";
            toast.success(message);
            this.props.handleCloseModal();
        } else {
            let message =
                language === LANGUAGES.VI
                    ? "Đặt lịch hẹn thất bại!"
                    : "Booking a new appointment error!";

            toast.error(message);
        }
    };

    buildTimeString = (dataTime) => {
        let { language } = this.props;

        if (dataTime && !_.isEmpty(dataTime)) {
            let date =
                language === LANGUAGES.VI
                    ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
                    : moment.unix(+dataTime.date / 1000).format("MM/DD/YYYY");

            let time =
                language === LANGUAGES.VI
                    ? dataTime.timeTypeData.valueVi
                    : dataTime.timeTypeData.valueEn;
            return `${time} - ${date}`;
        }
        return "";
    };

    buildDoctorName = (doctorData) => {
        let { language } = this.props;
        if (doctorData && !_.isEmpty(doctorData)) {
            let name =
                language === LANGUAGES.VI
                    ? `${doctorData.lastName} ${doctorData.firstName}`
                    : `${doctorData.firstName} ${doctorData.lastName}`;

            return name;
        }
        return "";
    };

    render() {
        let { isOpenModalBooking, handleCloseModal, dataTime } = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime.doctorId) ? dataTime.doctorId : "";
        return (
            <div>
                <Modal
                    isOpen={isOpenModalBooking}
                    centered
                    backdrop="true"
                    size="lg"
                    className="booking-modal-container"
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className="left">
                                <FormattedMessage id="patient.booking-modal.title" />
                            </span>
                            <span className="right" onClick={handleCloseModal}>
                                <i className="fas fa-times"></i>
                            </span>
                        </div>
                        <div className="booking-modal-body">
                            <div className="doctor-info">
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    dataTime={dataTime}
                                    isShowDescriptionDoctor={false}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.fullName" />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={this.state.fullName}
                                        onChange={(e) => this.handleOnChangeInput(e, "fullName")}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={this.state.phoneNumber}
                                        onChange={(e) => this.handleOnChangeInput(e, "phoneNumber")}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.email" />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={this.state.email}
                                        onChange={(e) => this.handleOnChangeInput(e, "email")}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.address" />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={this.state.address}
                                        onChange={(e) => this.handleOnChangeInput(e, "address")}
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.reason" />
                                    </label>
                                    <input
                                        type="textarea"
                                        className="form-control"
                                        value={this.state.reason}
                                        onChange={(e) => this.handleOnChangeInput(e, "reason")}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.birthday" />
                                    </label>
                                    <DatePicker
                                        className="form-control"
                                        onChange={this.handleOnChangeBirthDay}
                                        value={this.state.birthday}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.genders" />
                                    </label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleOnChangeGender}
                                        options={this.state.genders}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button
                                className="btn-booking-confirm"
                                onClick={() => this.handleConfirmBooking()}
                            >
                                <FormattedMessage id="patient.booking-modal.btnConfirm" />
                            </button>
                            <button className="btn-booking-cancel" onClick={handleCloseModal}>
                                <FormattedMessage id="patient.booking-modal.btnCancel" />
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenders: () => {
            dispatch(actions.fetchGenderStart());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
