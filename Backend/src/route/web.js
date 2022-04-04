import express from "express";
import doctorController from "../controllers/doctorController";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);

    //CRUD
    router.get("/about", homeController.getAboutPage);
    router.get("/crud", homeController.getCRUD);
    router.post("/post-crud", homeController.postCRUD);
    router.get("/get-crud", homeController.displayGetCRUD);
    router.get("/edit-crud", homeController.getEditCRUD);
    router.post("/put-crud", homeController.putCRUD);
    router.post("/delete-crud", homeController.deleteCRUD);

    //Api user
    router.post("/api/login", userController.handleLogin);
    router.get("/api/get-all-users", userController.handleGetAllUsers);
    router.post("/api/create-new-user", userController.handleCreateNewUser);
    router.put("/api/edit-user", userController.handleEditUser);
    router.delete("/api/delete-user", userController.handleDeleteUser);

    // Api allcode
    router.get("/api/allcode", userController.getAllCode);
    router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
    router.get("/api/get-all-doctors", doctorController.getAllDoctors);
    router.post("/api/save-infor-doctors", doctorController.postInforDoctor);

    router.get("/api/get-profile-doctor-by-id", doctorController.getProfileDoctorById);

    router.post("/api/patient-book-appointment", patientController.postBookAppointment);
    router.post("/api/verify-booking-appointment", patientController.postverifyBookAppointment);



    router.post("/api/create-new-specialty", specialtyController.createSpecialty);
    router.get("/api/get-specialty", specialtyController.getAllSpecialty);
    router.get("/api/get-detail-specialty-by-id", specialtyController.getDetailSpecialtyById);


    return app.use("/", router);
};

module.exports = initWebRoutes;
