import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import { deleteScheduleSelected } from "../../../../services/userService";
import { LANGUAGES } from "../../../../utils";
import "./ConfirmDeleteSchedule.scss";

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

  handleConfirmDelete = async () => {
    let listScheduleDelete = this.props.listSchedule;
    if (listScheduleDelete) {
      await deleteScheduleSelected(
        listScheduleDelete.doctorId,
        listScheduleDelete.date,
        listScheduleDelete.timeType
      );
    }
    this.toggle();
  };

  render() {
    let { isOpenModal, language } = this.props;
    return (
      <Modal
        isOpen={isOpenModal}
        className={"confirm-delete-container"}
        size="lg"
        centered
        toggle={() => {
          this.toggle();
        }}
      >
        <div className="confirm-delete-content">
          <div className="confirm-delete-header">
            <span className="left">
              {language === LANGUAGES.VI ? "Xác nhận xóa" : "Confirm delete"}
            </span>
            <span
              className="right"
              onClick={() => {
                this.toggle();
              }}
            >
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="confirm-delete-body">
            <span className="confirm-delete-text">
              {language === LANGUAGES.VI
                ? "Bạn có chắc bạn muốn xóa mục này?"
                : "Are you sure you want to delete this item?"}
            </span>
          </div>
          <div className="confirm-delete-footer">
            <button
              className="btn btn-primary"
              onClick={() => this.handleConfirmDelete()}
            >
              {language === LANGUAGES.VI ? "Xác nhận" : "Confirm"}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                this.toggle();
              }}
            >
              {language === LANGUAGES.VI ? "Hủy" : "Cancel"}
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
