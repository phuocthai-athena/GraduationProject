import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import localization from "moment/locale/vi";

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }

    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId);
        this.setState({ dataProfile: data });
    }

    getInfoDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language != prevProps.language) {
        }
        if (this.props.doctorId != prevProps.doctorId) {
        }
    }

    renderTimeBooking = (dataTime) => {
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
            return (
                <>
                    <div>
                        {time} - {date}
                    </div>
                    <div>
                        <FormattedMessage id="patient.booking-modal.bookingPrice" />
                    </div>
                </>
            );
        }
        return <></>;
    };

    render() {
        let { dataProfile } = this.state;
        let { language, dataTime, isShowDescriptionDoctor } = this.props;
        let nameVi = "",
            nameEn = "";
        // if (dataProfile && dataProfile.positionData) {
        //     nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastname} ${dataProfile.firstName}`;
        //     nameEn = `${dataProfile.positionData.valueen}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        // }
        if (dataProfile) {
            nameVi = `${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div
                        className="content-left"
                        style={{
                            backgroundImage: `url(${
                                dataProfile && dataProfile.image
                                    ? dataProfile.image
                                    : "https://cdn.bookingcare.vn/fr/w200/2020/03/17/114430-bshung.jpg"
                            })`,
                        }}
                    ></div>

                    <div className="content-right">
                        <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                        <div className="down">
                            {/* {isShowDescriptionDoctor === true ? (
                                <>
                                    {dataProfile &&
                                        dataProfile.Markdown &&
                                        dataProfile.Markdown.description && (
                                            <span>sdfgsfdgsdfg</span>
                                        )}
                                </>
                            ) : (
                                <>{this.renderTimeBooking()}</>
                            )} */}

                            {isShowDescriptionDoctor === true ? (
                                <>
                                    Bác sĩ đầu ngành chuyên khoa Tâm thần, tâm bệnh Nguyên Viện
                                    trưởng Viện Sức khỏe Tâm thần quốc gia, Bệnh viện Bạch Mai
                                    Nguyên Phó Chủ nhiệm Bộ môn Tâm thần trường Đại học Y Hà Nội
                                </>
                            ) : (
                                <>{this.renderTimeBooking(dataTime)}</>
                            )}
                        </div>
                    </div>
                </div>
                <div className="price">
                    <FormattedMessage id="patient.booking-modal.price" />:
                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI ? (
                        <NumberFormat
                            className="currency"
                            displayType={"text"}
                            thousandsSeparator={true}
                            suffix={"VND"}
                            value={dataProfile.Doctor_Infor.priceData.valueVi}
                        />
                    ) : (
                        "500,000VND"
                    )}
                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN ? (
                        <NumberFormat
                            className="currency"
                            displayType={"text"}
                            thousandsSeparator={true}
                            suffix={"$"}
                            value={dataProfile.Doctor_Infor.priceData.valueEn}
                        />
                    ) : (
                        "$50"
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
