import React, {useState} from 'react';
import Modal from '../Modal/Modal';
import TableContainer from "../Table/TableContainer";
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline'
import {PlusCircleIcon} from '@heroicons/react/24/solid'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {selectDefaultList} from "../../store/customersList/customersList-selector";
import { sortListByQuery } from '../../store/customersList/customersList-slice';

const CustomersList = () => {

    const dispatch = useAppDispatch();
    const defaultList = useAppSelector(selectDefaultList);

    const [searchValue, setSearchValue] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        dispatch(sortListByQuery(e.target.value))
    }

    return (
        <>
        <div className="px-0 rounded-xl overflow-hidden bg-white">
            <div className="sm:flex sm:items-start px-6 pt-4">
                <div className="sm:flex-auto">
                    <div className="mb-4">
                        <div className="flex justify-items-start rounded-md ">
                            <span className="inline-flex items-center px-2.5 rounded-l-md border border-r-0 border-stone-300 text-black sm:text-sm">
                               <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                className="shadow-sm flex-0 min-w-0 block w-60 px-3 py-2 rounded-none rounded-r-md border border-stone-300 sm:text-sm "
                                placeholder="Search"
                                value={searchValue}
                                onChange={onSearch}
                            />
                        </div>
                    </div>
                    <h1 className="total-clients__title inline">Total clients: </h1>
                    <span className="total-clients__number">
                        {defaultList.length}
                    </span>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                    >
                        <PlusCircleIcon className="h-6 w-6 mx-2" aria-hidden="true" />
                        New client
                    </button>
                </div>
            </div>
            <div className="mt-2 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <TableContainer />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal {...{isModalOpen, setIsModalOpen}}>
            form
        </Modal>

        </>
    )
};

export default CustomersList;
