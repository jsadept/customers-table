import React, {FC, useEffect, useState} from 'react';
import {Dialog} from "@headlessui/react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {getRandomId} from "../../utils/getRandomId";
import {CalendarIcon} from "@heroicons/react/24/outline";
import {useAppDispatch} from "../../hooks/redux";
import {addItem} from "../../store/customersList/customersList-slice";


interface AddCustomerFormProps {
    setIsModalOpen: (value: boolean) => void;
}

const AddCustomerForm: FC<AddCustomerFormProps> = ({setIsModalOpen}) => {

    const dispatch = useAppDispatch();
    const [error, setError] = useState<string[]>([]);
    const [editData, setEditData] = useState({
        client: '',
        total_earnings: 0,
        available_credit: 0,
        since: new Date(),
        first_name: '',
        last_name: '',
        notes: ''
    });

    const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(isValid()){
            const newData = {
                id: getRandomId(),
                created: new Date(),
                status: 'Active',
                client: editData.client,
                total_earnings: toUsd(editData.total_earnings),
                available_credit: toUsd(editData.available_credit),
                since: editData.since,
                additional: {
                    main_contact: {
                        first_name: editData.first_name,
                        last_name: editData.last_name,
                    },
                    notes: editData.notes
                },
            }
            dispatch(addItem(newData))
            setIsModalOpen(false);
        }
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const isValid = (): boolean => {
        setError( [])
      //if(editData)
        const res = Object.entries(editData).filter(item => {
            if(item[1] === '') {
                setError((state) => [...state, item[0]])
                return true
            };
        })

        if(res!.length > 0 || error.length > 0){
            return false;
        }

        return true;
    }
    const toUsd = (number: number): string => {
        return number.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    }

    return (
        <>
            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                New client
            </Dialog.Title>
            <div className="mt-2">

                <form className="mt-6 space-y-6 divide-y-blue-gray-100">
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6 w-full">

                        <div className="sm:col-span-6">
                            <label htmlFor="company"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Company name
                            </label>
                            <input
                                onChange={(e) => setEditData({...editData, client: e.target.value})}
                                value={editData.client}
                                type="text"
                                name="company"
                                id="company"
                                placeholder="Client name"
                                autoComplete="organization-title"
                                className="mt-1 border border-gray-300 block w-full shadow-sm sm:text-sm rounded-md py-2 px-2.5"
                            />
                            <div style={{display: error.some((i) => i === 'client') ? 'block' : 'none'}} className="text-red-700 p-2">Please fill out this field</div>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="total_earnings" className="block text-sm font-medium text-gray-700">
                                Total earnings
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                    onChange={(e) => setEditData({...editData, total_earnings: Number(e.target.value)})}
                                    value={editData.total_earnings}
                                    type="number"
                                    name="total earnings"
                                    id="total_earnings"
                                    className="mt-1 border border-gray-300 block w-full shadow-sm sm:text-sm rounded-md py-2 pr-2.5 pl-8"
                                    placeholder="0.00"
                                    aria-describedby="price-currency"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                  <span className="text-gray-500 sm:text-sm" id="price-currency">
                                    USD
                                  </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="available_credit" className="block text-sm font-medium text-gray-700">
                                Available credit
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                    onChange={(e) => setEditData({...editData, available_credit: Number(e.target.value)})}
                                    value={editData.available_credit}
                                    type="number"
                                    name="available_credit"
                                    id="available_credit"
                                    className="mt-1 border border-gray-300 block w-full shadow-sm sm:text-sm rounded-md py-2 pr-2.5 pl-8"
                                    placeholder="0.00"
                                    aria-describedby="price-currency"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                  <span className="text-gray-500 sm:text-sm" id="price-currency">
                                    USD
                                  </span>
                                </div>
                            </div>
                        </div>


                        <div className="sm:col-span-6">
                            <label htmlFor="notes"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Notes
                            </label>
                            <input
                                onChange={(e) => setEditData({...editData, notes: e.target.value})}
                                value={editData.notes}
                                type="text"
                                name="notes"
                                id="notes"
                                placeholder="Additional information"
                                className="mt-1 border border-gray-300 block w-full shadow-sm sm:text-sm rounded-md py-2 px-2.5"
                            />
                            <div style={{display: error.some((i) => i === 'notes') ? 'block' : 'none'}} className="text-red-700 p-2">Please fill out this field</div>
                        </div>


                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="first-name"
                                   className="block text-sm font-medium text-blue-gray-900 mb-1">
                                Client since
                            </label>
                            <div className="flex justify-items-start rounded-md ">
                                <span className="inline-flex items-center px-2.5 rounded-l-md border border-r-0 border-stone-300 text-black sm:text-sm">
                                   <CalendarIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <DatePicker
                                    className="block w-full border border-gray-300 rounded-none rounded-r-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500 py-2 px-2.5"
                                    shouldCloseOnSelect={true}
                                    selected={editData.since}
                                    value={editData.since.toDateString() || undefined}
                                    onChange={(date: Date) => setEditData({...editData, since: date})}
                                />
                            </div>

                        </div>

                        <div className="col-span-6 sm:col-span-3"></div>

                        <div className="rounded-xl border border-gray-300 p-4 col-span-6 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6 w-full">
                            <h2 className="col-span-6 main-contact">Main contact</h2>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    First Name
                                </label>
                                <input
                                    onChange={
                                        (e) => setEditData({...editData, first_name: e.target.value })}
                                    value={editData.first_name}
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    placeholder='First name'
                                    className="mt-1 border border-gray-300 block w-full shadow-sm sm:text-sm rounded-md py-2 px-2.5"
                                />
                                <div style={{display: error.some((i) => i === 'first_name') ? 'block' : 'none'}} className="text-red-700 p-2">Please fill out this field</div>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>
                                <input
                                    onChange={
                                        (e) => setEditData({...editData,last_name: e.target.value})}
                                    value={editData.last_name}
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    placeholder='Last name'
                                    className="mt-1 border border-gray-300 block w-full shadow-sm sm:text-sm rounded-md py-2 px-2.5"
                                />
                                <div style={{display: error.some((i) => i === 'last_name') ? 'block' : 'none'}} className="text-red-700 p-2">Please fill out this field</div>
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-between mt-0">
                        <button
                            onClick={closeModal}
                            type="button"
                            className="bg-white py-2 px-4 rounded-md text-sm font-medium text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={(e) => submitHandler(e)}
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddCustomerForm;
