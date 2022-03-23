import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import "./BookingModal.scss";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language != prevProps.language) {
    }
  }

  render() {
    let { isOpenModalBooking, handleCloseModal, dataTime } = this.props;
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
              <span className="left">Thông tin đặt lịch khám bệnh</span>
              <span className="right" onClick={handleCloseModal}>
                <i class="fas fa-times"></i>
              </span>
            </div>
            <div className="booking-modal-body">
              {/* {JSON.stringify(dataTime)} */}
              <div className="doctor-info"></div>
              <div className="price">Giá khám: 500.000 VND</div>
              <div className="row">
                <div className="col-6 form-group">
                  <label>Họ và tên</label>
                  <input className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>Số điện thoại</label>
                  <input className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>Địa chỉ email</label>
                  <input className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>Địa chỉ liên hệ</label>
                  <input className="form-control" />
                </div>
                <div className="col-12 form-group">
                  <label>Lý do khám</label>
                  <input type="textarea" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>Đặt cho ai</label>
                  <input className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>Giới tính</label>
                  <input className="form-control" />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button className="btn-booking-confirm">Xác nhận</button>
              <button className="btn-booking-cancel" onClick={handleCloseModal}>
                Hủy
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
