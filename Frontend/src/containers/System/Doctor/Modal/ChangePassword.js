import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import "./ChangePassword.scss";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  render() {
    let { isOpenModal, closeModal } = this.props;
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
          <div className="change-password-body">inside modal body</div>
          <div className="change-password-footer">
            <button className="btn-change-password-confirm">Xác nhận</button>
            <button
              className="btn-change-password-cancel"
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
