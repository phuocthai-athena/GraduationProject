import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/Admin/UserRedux";
import Header from "../containers/Header/Header";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import ManageSpecialty from "../containers/System/Specialty/ManageSpecialty";
import AddSpecialty from "../containers/System/Specialty/AddSpecialty";
import UpdateSpecialty from "../containers/System/Specialty/UpdateSpecialty";
import ManageClinic from "../containers/System/Clinic/ManageClinic";
import ManageHandBook from "../containers/System/HandBook/ManageHandBook";
import AddHandBook from "../containers/System/HandBook/AddHandBook";
import UpdateHandBook from "../containers/System/HandBook/UpdateHandBook";

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/user-redux" component={UserRedux} />
              <Route path="/system/manager-doctor" component={ManageDoctor} />

              <Route
                path="/system/manage-specialty"
                exact
                component={ManageSpecialty}
              />
              <Route
                path="/system/manage-specialty/add"
                component={AddSpecialty}
              />
              <Route
                path="/system/manage-specialty/update/:specialtyId"
                component={UpdateSpecialty}
              />

              <Route path="/system/manage-clinic" component={ManageClinic} />
              <Route
                path="/system/manage-handbook"
                exact
                component={ManageHandBook}
              />
              <Route
                path="/system/manage-handbook/add"
                component={AddHandBook}
              />
              <Route
                path="/system/manage-handbook/update/:handBookId"
                component={UpdateHandBook}
              />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
