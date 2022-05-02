import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import "./ChangePassword.scss";
import { LANGUAGES } from "../../../../utils";
import { toast } from "react-toastify";
import { getPassword } from "../../../../services/userService";
import bcrypt from "bcryptjs";

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowOldPassword: false,
            isShowNewPassword: false,
            isShowNewConfirmPassword: false,
            currentPassword: "",
            oldPassword: "",
            newPassword: "",
            newConfirmPassword: "",
        };
    }

    async componentDidMount() {
        this.callApiGetPassword();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    };

    handleShowHideOldPassword = () => {
        this.setState({
            isShowOldPassword: !this.state.isShowOldPassword,
        });
    };

    handleShowHideNewPassword = () => {
        this.setState({
            isShowNewPassword: !this.state.isShowNewPassword,
        });
    };

    handleShowHideNewConfirmPassword = () => {
        this.setState({
            isShowNewConfirmPassword: !this.state.isShowNewConfirmPassword,
        });
    };

    checkValidateInput = () => {
        let isValid = true;
        let { language } = this.props;
        let arrCheck = ["oldPassword", "newPassword", "newConfirmPassword"];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                if (language === LANGUAGES.VI) {
                    toast.error("bạn chưa nhập trường " + arrCheck[i]);
                } else {
                    toast.error("Not yet entered " + arrCheck[i]);
                }
                break;
            }
        }
        return isValid;
    };

    isCheckOldPassword = (currentPassword, oldPassword) => {
        if (currentPassword && oldPassword && currentPassword === oldPassword) return true;
        return false;
    };

    isCheckPasswordConfirmed = (newPassword, newConfirmPassword) => {
        if (newPassword && newConfirmPassword && newPassword === newConfirmPassword) return true;
        return false;
    };

    callApiGetPassword = async () => {
        let res = await getPassword(this.props.userInfo.id);
        this.setState({
            currentPassword: res.data.password,
        });
        console.log(this.state.currentPassword);
    };

    render() {
        let { isOpenModal, closeModal } = this.props;
        let { oldPassword, newPassword, newConfirmPassword } = this.state;
        return (
            <Modal
                isOpen={isOpenModal}
                className={"change-password-container"}
                size="lg"
                centered
                toggle={() => {
                    this.toggle();
                }}
            >
                <div className="change-password-content">
                    <div className="change-password-header">
                        <span className="left">Thay đổi mật khẩu</span>
                        <span
                            className="right"
                            onClick={() => {
                                this.toggle();
                            }}
                        >
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="change-password-body">
                        <form>
                            <div class="mb-3">
                                <label className="form-label">Mật khẩu cũ</label>
                                <div className="custom-input-password">
                                    <input
                                        className="form-control"
                                        type={this.state.isShowOldPassword ? "text" : "password"}
                                        value={oldPassword}
                                        onChange={(event) =>
                                            this.onChangeInput(event, "oldPassword")
                                        }
                                    />
                                    <span onClick={() => this.handleShowHideOldPassword()}>
                                        <i
                                            className={
                                                this.state.isShowOldPassword
                                                    ? "far fa-eye"
                                                    : "far fa-eye-slash"
                                            }
                                        ></i>
                                    </span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label className="form-label">Mật khẩu mới</label>
                                <div className="custom-input-password">
                                    <input
                                        className="form-control"
                                        type={this.state.isShowNewPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(event) =>
                                            this.onChangeInput(event, "newPassword")
                                        }
                                    />
                                    <span onClick={() => this.handleShowHideNewPassword()}>
                                        <i
                                            className={
                                                this.state.isShowNewPassword
                                                    ? "far fa-eye"
                                                    : "far fa-eye-slash"
                                            }
                                        ></i>
                                    </span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label className="form-label">Xác nhận mật khẩu mới</label>
                                <div className="custom-input-password">
                                    <input
                                        className="form-control"
                                        type={
                                            this.state.isShowNewConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={newConfirmPassword}
                                        onChange={(event) =>
                                            this.onChangeInput(event, "newConfirmPassword")
                                        }
                                    />
                                    <span onClick={() => this.handleShowHideNewConfirmPassword()}>
                                        <i
                                            className={
                                                this.state.isShowNewConfirmPassword
                                                    ? "far fa-eye"
                                                    : "far fa-eye-slash"
                                            }
                                        ></i>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="change-password-footer">
                        <button className="btn btn-primary">Xác nhận</button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                this.toggle();
                            }}
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
