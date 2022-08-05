import { FieldValues, useForm } from 'react-hook-form';
import { addEmployee } from '../reduxSlices/EmployeeSlice';
import { useAppDispatch } from '../store/configureStore';
import { useNavigate } from "react-router-dom";
import { useSearchParams} from "react-router-dom";
import { useEffect, useState } from 'react';
import agent from '../services/agent';

export default function Add() {
    const dispatch = useAppDispatch();
    let history = useNavigate();
    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    });

    async function submitForm(data: FieldValues) {
        await dispatch(addEmployee(data));
        history("/");

    }

    return (
        <>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit(submitForm)} noValidate>
                            <div className="modal-header">
                                <h4 className="modal-title">Add Employee</h4>
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
                                <input type="button" className="btn btn-default" value="Reset" />
                                <input type="submit" className="btn btn-success" value="Add" disabled={!isValid} />
                            </div>
                        </form>
                    </div>
                </div>
        </>
    )
}
