import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../assets/images/logo.svg";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";
import { getAllClinic, getAllDoctors, getAllSpecialty } from "../../services/userService";
import SearchResult from "./SearchResults";

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinics: [],
            doctors: [],
            specialties: [],
            searchText: "",
            isSearchTextShown: false,
            searchClinics: [],
            searchDoctors: [],
            searchSpecialties: [],
        };

        this.searchResultRef = React.createRef(null);

        this.handleSearchTextChanged = this.handleSearchTextChanged.bind(this);
    }
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push("/home");
        }
    };

    handleSearchTextChanged = (e) => {
        const searchText = e.target.value;
        const searchClinics = [];
        const searchDoctors = [];
        const searchSpecialties = [];

        this.state.clinics.forEach((clinic) => {
            const index = clinic.name.indexOf(searchText);
            if (index > -1) {
                searchClinics.push(clinic);
            }
        });
        this.state.doctors.forEach((doctor) => {
            const index = `${doctor.firstName} ${doctor.lastName}`.indexOf(searchText);
            if (index > -1) {
                searchDoctors.push(doctor);
            }
        });
        this.state.specialties.forEach((specialty) => {
            const index = specialty.name.indexOf(searchText);
            if (index > -1) {
                searchSpecialties.push(specialty);
            }
        });

        this.setState({
            ...this.state,
            searchText,
            searchClinics,
            searchDoctors,
            searchSpecialties,
        });
    };

    async componentDidMount() {
        const searchInput = document.getElementById("search-input-text");

        let responseFromClinics = await getAllClinic();
        if (responseFromClinics && responseFromClinics.errCode === 0) {
            this.setState({
                clinics: responseFromClinics.data ? responseFromClinics.data : [],
            });
        }
        let responseFromDoctors = await getAllDoctors();
        if (responseFromDoctors && responseFromDoctors.errCode === 0) {
            this.setState({
                doctors: responseFromDoctors.data ? responseFromDoctors.data : [],
            });
        }
        let responseFromSpecialties = await getAllSpecialty();
        if (responseFromSpecialties && responseFromSpecialties.errCode === 0) {
            this.setState({
                specialties: responseFromSpecialties.data ? responseFromSpecialties.data : [],
            });
        }
        console.log(this.state);

        window.addEventListener("click", (e) => {
            if (!this.searchResultRef.current) {
                return;
            }

            if (this.searchResultRef.current.contains(e.target) || searchInput == e.target) {
                this.setState({ ...this.state, isSearchTextShown: true });
            } else {
                this.setState({ ...this.state, isSearchTextShown: false });
            }
        });
    }

    render() {
        let languageCheck = this.props.language;

        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <img
                                className="header-logo"
                                src={logo}
                                alt="logo"
                                onClick={() => this.returnToHome()}
                            />
                            <div className="header-logo"></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.speciality" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.searchdoctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.health-facility" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.select-room" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.doctor" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.select-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.fee" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.check-health" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="homeheader.support" />
                            </div>
                            <div
                                className={
                                    languageCheck === LANGUAGES.VI
                                        ? "language-vi active"
                                        : "language-vi"
                                }
                            >
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                            </div>
                            <div
                                className={
                                    languageCheck === LANGUAGES.EN
                                        ? "language-en active"
                                        : "language-en"
                                }
                            >
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true && (
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1">
                                <FormattedMessage id="banner.title1" />
                            </div>
                            <div className="title2">
                                <FormattedMessage id="banner.title2" />
                            </div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input
                                    type="text"
                                    placeholder={
                                        languageCheck === LANGUAGES.VI
                                            ? "Tìm kiếm bác sĩ, cơ sở khám bệnh, chuyên khoa, ..."
                                            : "Search doctors, clinics, speciality, etc."
                                    }
                                    value={this.state.searchText}
                                    onChange={this.handleSearchTextChanged}
                                    id="search-input-text"
                                    autoComplete="off"
                                />
                                <div
                                    className="search-result-container"
                                    ref={this.searchResultRef}
                                    style={{
                                        display:
                                            this.state.searchText && this.state.isSearchTextShown
                                                ? "block"
                                                : "none",
                                    }}
                                >
                                    <SearchResult
                                        data={{
                                            clinics: this.state.searchClinics,
                                            doctors: this.state.searchDoctors,
                                            specialties: this.state.searchSpecialties,
                                            language: languageCheck,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="content-down">
                            <div className="options">
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="far fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child-1" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-mobile-alt"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child-2" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-procedures"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child-3" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-flask"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child-4" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-user-md"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child-5" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-briefcase-medical"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child-6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
