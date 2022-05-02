import { useEffect, useState } from "react";
import {
  getAllSpecialty,
  deleteSpecialtyById,
} from "../../../services/userService";
import "./ManageSpecialty.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { path } from "../../../utils";

function DashBoardSpecialty() {
  const [specialties, setSpecialties] = useState([]);
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const res = await getAllSpecialty();
        if (res && res.errCode === 0) {
          setSpecialties(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSpecialties();
  }, []);

  const handleDeleteSpecialty = (specialtyId) => async () => {
    try {
      const res = await deleteSpecialtyById(specialtyId);
      if (res && res.errCode === 0) {
        const newSpecialties = specialties.filter(
          (specialty) => specialty.id !== specialtyId
        );
        setSpecialties(newSpecialties);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      <div className="title">MANAGE SPECIALTIES</div>
      <div className="add-handbook-container">
        <Link to="/system/manage-specialty/add" className="btn btn-primary">
          Add new specialty
        </Link>
      </div>
      <div className="table">
        <div className="handbook-table mt-3 mx-1">
          <table id="handbooks">
            <tbody>
              <tr>
                <th className="text-center">ID</th>
                <th className="text-center">Image</th>
                <th className="text-center">Name</th>
                <th className="text-center">Actions</th>
              </tr>
              {specialties.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className="text-center">{item.id}</td>
                    <td className="text-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="handbook-image"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td className="text-center">
                      <Link
                        to={`/system/manage-specialty/update/${item.id}`}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </Link>
                      <button
                        className="btn-delete"
                        onClick={handleDeleteSpecialty(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashBoardSpecialty;
