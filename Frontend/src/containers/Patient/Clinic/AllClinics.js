import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./AllClinics.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import { getAllClinic } from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";

class AllClinics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinics: [],
        };
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                clinics: res.data,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleViewDetailClinics = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`);
        }
    };

    render() {
        let { language } = this.props;
        let { clinics } = this.state;
        return (
            <div className="detail-clinics-container">
                <HomeHeader />
                <div className="detail-clinics-body">
                    <div className="h2 text-center">
                        <FormattedMessage id="manage-clinic.list-clinics" />
                    </div>
                    <div>
                        {clinics &&
                            clinics.length > 0 &&
                            clinics.map((item, index) => {
                                console.log(item);
                                return (
                                    <div
                                        className="clinic-customize specialty-child d-flex py-2"
                                        key={index}
                                        onClick={() => this.handleViewDetailClinics(item)}
                                    >
                                        <div
                                            className="bg-image clinic-specialty"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        />
                                        <div className="clinic-name py-0 pl-3">{item.name}</div>
                                    </div>
                                );
                            })}
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

export default connect(mapStateToProps, mapDispatchToProps)(AllClinics);
