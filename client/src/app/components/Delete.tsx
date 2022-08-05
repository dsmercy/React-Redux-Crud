import agent from "../services/agent";

export default function Delete(employeeId: number) {

  function handleRemoveItem(id: number) {
    agent.Employee.removeEmployee(id)
    .then(result => { console.log(result) })
        .catch(error => console.log(error))
        // .finally(() => setLoading(false));
}

  return (
    <>
      <div id="deleteEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={()=>handleRemoveItem(employeeId)}>
              <div className="modal-header">
                <h4 className="modal-title">Delete Employee</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete these Records?</p>
                <p className="text-warning"><small>This action cannot be undone.</small></p>
              </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" />
                <input type="submit" className="btn btn-danger" value="Delete"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
