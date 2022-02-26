import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền thông nói gì về Dental Clinic
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              Với ngân sách dưới 1 triệu đồng, bạn có thể chọn mua máy đo huyết
              áp điện tử chất lượng tốt của các thương hiệu khác nhau. Tuy
              nhiên, trên thị trường hiện nay cũng có nhiều dòng máy trong tầm
              giá này, khiến người dùng băn khoăn không biết nên chọn sản phẩm
              nào. Trong bài viết này, BookingCare sẽ gợi ý bạn 6 loại máy đo
              huyết áp đáng mua trong tầm giá dưới 1 triệu đồng.
            </p>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
