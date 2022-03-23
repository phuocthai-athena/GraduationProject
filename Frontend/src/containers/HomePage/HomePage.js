import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import OutstandingDoctor from "./Section/OutstandingDoctor";
import HandBook from "./Section/HandBook";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookingModal from "../Patient/Doctor/Modal/BookingModal";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    };
  }
  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };

  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    let { isOpenModalBooking, dataScheduleTimeModal } = this.state;
    return (
      <div>
        <HomeHeader />
        <Specialty settings={settings} />
        <MedicalFacility settings={settings} />
        <OutstandingDoctor settings={settings} />
        <HandBook settings={settings} />
        <About />
        <button onClick={() => this.handleClickScheduleTime(123)}>
          Show modal
        </button>
        <BookingModal
          isOpenModalBooking={isOpenModalBooking}
          handleCloseModal={this.handleCloseModal}
          dataTime={dataScheduleTimeModal}
        />
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
