import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./AllHandBooks.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import { getAllHandBook } from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";

class AllHandBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handBooks: [],
        };
    }

    async componentDidMount() {
        let res = await getAllHandBook();
        if (res && res.errCode === 0) {
            this.setState({
                handBooks: res.data,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleViewDetailHandBook = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${item.id}`);
        }
    };

    render() {
        let { handBooks } = this.state;
        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body">
                    <div className="h2 text-center">
                        <FormattedMessage id="homepage.list-handbook" />
                    </div>
                    <div>
                        {handBooks &&
                            handBooks.length > 0 &&
                            handBooks.map((item, index) => {
                                console.log(item);
                                return (
                                    <div
                                        className="section-customize specialty-child d-flex py-2"
                                        key={index}
                                        onClick={() => this.handleViewDetailHandBook(item)}
                                    >
                                        <div
                                            className="bg-image section-specialty"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        />
                                        <div className="specialty-name py-0 pl-3">{item.name}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllHandBooks);
