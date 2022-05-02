import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import parse from "html-react-parser";
import "./DetailHandBook.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import { useParams } from "react-router-dom";
import { getHandBookById } from "../../../services/userService";

function DetailHandBook() {
  const { id } = useParams();
  const [htmlDescription, setHtmlDescription] = useState("");

  useEffect(() => {
    const fetchHandBookById = async () => {
      try {
        const res = await getHandBookById(id);
        if (res && res.errCode === 0) {
          setHtmlDescription(res.data.descriptionHTML);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchHandBookById();
  }, []);

  return (
    <>
      <HomeHeader />
      <div className="container">{parse(htmlDescription)}</div>;
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandBook);
