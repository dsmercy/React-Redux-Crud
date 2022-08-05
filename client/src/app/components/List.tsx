import { Link, useNavigate } from "react-router-dom";
import { removeEmployeeAsync } from "../reduxSlices/EmployeeSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";

export default function List() {

    const { Employees } = useAppSelector(state => state.employee);
    const dispatch = useAppDispatch();

    async function handleRemoveItem(event:any,Id: number) {
        event.preventDefault();
        await dispatch(removeEmployeeAsync({Id}));
    }


    return (
        <>
            <div className="container">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-xs-6">
                                    <h2>Manage <b>Employees</b></h2>
                                </div>
                                <div className="col-xs-6">
                                    <Link to='/addedit' className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Employee</span></Link>
                                    {/* <a href="#deleteEmployeeModal" className="btn btn-danger" data-toggle="modal"><i className="material-icons">&#xE15C;</i> <span>Delete</span></a> */}
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Employees && Employees.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <Link to={`/addedit/${item.id}`} className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></Link>
                                            <button style={{border: 'none',padding: 'unset',backgroundColor: 'inherit'}} onClick={(e)=>handleRemoveItem(e,item.id)} ><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="clearfix">
                            {/* <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div> */}
                            <ul className="pagination">
                                <li className="page-item disabled"><a href="#">Previous</a></li>
                                <li className="page-item"><a href="#" className="page-link">1</a></li>
                                <li className="page-item"><a href="#" className="page-link">2</a></li>
                                <li className="page-item active"><a href="#" className="page-link">3</a></li>
                                <li className="page-item"><a href="#" className="page-link">4</a></li>
                                <li className="page-item"><a href="#" className="page-link">5</a></li>
                                <li className="page-item"><a href="#" className="page-link">Next</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
