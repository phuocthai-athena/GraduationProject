import { useEffect, useState } from "react";
import { getAllHandBook, deleteHandBookById } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import "./ManageHandBook.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { path } from "../../../utils";

function DashBoardHandBook() {
    const [handBooks, setHandBooks] = useState([]);
    useEffect(() => {
        const fetchHandBooks = async () => {
            try {
                const res = await getAllHandBook();
                if (res && res.errCode === 0) {
                    setHandBooks(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchHandBooks();
    }, []);

    const handleDeleteHandBook = (handBookId) => async () => {
        try {
            const res = await deleteHandBookById(handBookId);
            if (res && res.errCode === 0) {
                const newHandBooks = handBooks.filter((handBook) => handBook.id !== handBookId);
                setHandBooks(newHandBooks);
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
            <div className="title">
                <FormattedMessage id="admin.manage-handbook.title" />
            </div>
            <div className="add-handbook-container">
                <Link to="/system/manage-handbook/add" className="btn btn-primary">
                    <FormattedMessage id="admin.manage-handbook.new-handbook" />
                </Link>
            </div>
            <div className="table">
                <div className="handbook-table mt-3 mx-1">
                    <table id="handbooks">
                        <tbody>
                            <tr>
                                <th className="text-center">ID</th>
                                <th className="text-center">
                                    <FormattedMessage id="admin.manage-handbook.name" />
                                </th>
                                <th className="text-center">
                                    <FormattedMessage id="admin.manage-handbook.image" />
                                </th>
                                <th className="text-center">Actions</th>
                            </tr>
                            {handBooks.map((item) => {
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
                                                to={`/system/manage-handbook/update/${item.id}`}
                                                className="btn-edit"
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </Link>
                                            <button
                                                className="btn-delete"
                                                onClick={handleDeleteHandBook(item.id)}
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

export default DashBoardHandBook;
