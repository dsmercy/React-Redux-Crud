import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Employee } from '../models/Employee';
import { addEmployee, editEmployee } from '../reduxSlices/EmployeeSlice';
import agent from '../services/agent';
import { useAppDispatch } from '../store/configureStore';

export default function AddEdit() {
  const { id } = useParams();
  const isAddMode = !id;
  const dispatch = useAppDispatch();
  let history = useNavigate();

  const { register, handleSubmit, reset, setValue, formState: { isSubmitting, errors, isValid } } = useForm({
    mode: 'all'
  });

  useEffect(() => {
    if (!isAddMode) {
      
      agent.Employee.getEmployee(parseInt(id)).then(user => {
        const fields = ['id', 'name', 'email', 'address', 'phone'];
        fields.forEach(field => setValue(field, user[field]));
      });
    }
  }, []);

  function onSubmit(data: FieldValues) {
    return isAddMode
      ? createUser(data)
      : updateUser(id, data);
  }

  async function createUser(data: FieldValues) {
    await dispatch(addEmployee(data));
    history("/");
  }

  async function updateUser(id: string, data: FieldValues) {
    const emp = data as Employee;
    await dispatch(editEmployee({id:parseInt(id), data:emp}));
    history("/");
  }



  return (
    <>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <div className="modal-header">
              <h4 className="modal-title">{isAddMode?'Add Employee':'Edit Employee'}</h4>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" {...register("name", { required: true })} />
                {errors.name && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="text" className="form-control"
                  {...register("email", {
                    required: true, pattern: {
                      value: /^\w+[\w-.]*@\w+((-\w+)|(\w*)).[a-z]{2,3}$/,
                      message: 'Not a valid email address'
                    }
                  })} />
                {errors.email && <span>Enter a valid email</span>}
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea className="form-control"  {...register("address", { required: true })}></textarea>
                {errors.address && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="number" className="form-control" {...register("phone", { required: true })} />
                {errors.phone && <span>This field is required</span>}
              </div>
            </div>
            <div className="modal-footer">
              <Link type="button" className="btn btn-default" to='/' >Cancel</Link>
              <input type="submit" className="btn btn-success" value={isAddMode?'Add':'Edit'} disabled={!isValid} />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
