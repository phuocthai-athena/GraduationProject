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
    const [name, setName] = useState("");
    const [htmlDescription, setHtmlDescription] = useState("");

    useEffect(() => {
        const fetchHandBookById = async () => {
            try {
                const res = await getHandBookById(id);
                if (res && res.errCode === 0) {
                    setName(res.data.name);
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
            <div className="container">
                <div className="post-name">{name}</div>
                <div className="post-body">{parse(htmlDescription)}</div>
            </div>
            ;
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
