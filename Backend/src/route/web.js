import express from "express";
import doctorController from "../controllers/doctorController";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import handbookController from "../controllers/handbookController";

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
    router.get("/api/allcode", userController.getAllCode);

    // Api allcode
    router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
    router.get("/api/get-all-doctors", doctorController.getAllDoctors);
    router.post("/api/save-infor-doctors", doctorController.postInforDoctor);
    router.get("/api/get-detail-doctor-by-id", doctorController.getDetailDoctorById);
    router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
    router.get("/api/get-schedule-doctor-by-date", doctorController.getScheduleByDate);
    router.get("/api/get-extra-infor-doctor-by-id", doctorController.getExtraInforDoctorById);

    router.get("/api/get-profile-doctor-by-id", doctorController.getProfileDoctorById);

    router.get("/api/get-list-patient-for-doctor", doctorController.getListPatientForDoctor);
    router.post("/api/send-remedy", doctorController.sendRemedy);

    router.get("/api/get-password", doctorController.getPassword);

    router.post("/api/patient-book-appointment", patientController.postBookAppointment);
    router.post("/api/verify-booking-appointment", patientController.postverifyBookAppointment);

    router.post("/api/create-new-specialty", specialtyController.createSpecialty);
    router.get("/api/get-specialty", specialtyController.getAllSpecialty);
    router.get("/api/get-detail-specialty-by-id", specialtyController.getDetailSpecialtyById);
    router.delete(
        "/api/delete-specialty-by-id/:specialtyId",
        specialtyController.deleteSpecialtyById
    );
    router.put("/api/update-specialty-by-id", specialtyController.updateSpecialtyById);

    // Api clinic
    router.post("/api/create-new-clinic", clinicController.createClinic);
    router.get("/api/get-clinic", clinicController.getAllClinic);
    router.get("/api/get-detail-clinic-by-id", clinicController.getDetailClinicById);
    router.delete("/api/delete-clinic-by-id/:clinicId", clinicController.deleteClinicById);
    router.put("/api/update-clinic-by-id", clinicController.updateClinicById);

    // Api Handbook
    router.post("/api/create-new-handbook", handbookController.createHandBook);
    router.get("/api/get-handbook", handbookController.getAllHandBook);
    router.get("/api/get-detail-handbook-by-id", handbookController.getDetailHandBookById);
    router.delete("/api/delete-handbook-by-id/:handBookId", handbookController.deleteHandBookById);
    router.put("/api/update-handbook-by-id", handbookController.updateHandBookById);

    return app.use("/", router);
};

module.exports = initWebRoutes;
