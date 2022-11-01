
import React, {FC, Fragment, useEffect, useState} from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon, ArchiveBoxIcon, TrashIcon } from '@heroicons/react/24/outline'
import {useAppDispatch} from "../../../hooks/redux";
import {changeStatus, removeItem} from '../../../store/customersList/customersList-slice';


interface DropdownProps {
    tableItemId?: string;
    tableItemStatus?: string;
    expendedId: string;
    itemId: string;
}

const Dropdown: FC<DropdownProps> = ({tableItemId, tableItemStatus, expendedId, itemId}) => {

    const dispatch = useAppDispatch();

    const [isAdditionalOpen, setIsAdditionalOpen] = useState<boolean>(false);

    useEffect(() => {
        if(expendedId === itemId){
            setIsAdditionalOpen(true);
        }
        if(isAdditionalOpen){
            setIsAdditionalOpen(false);
        }
    },[expendedId, itemId])

    const onArchive = () => {
        dispatch(changeStatus(tableItemId!))
    }

    const onDelete = () => {
        dispatch(removeItem(tableItemId!))
    }


    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }



    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button
                    style={{
                        color: isAdditionalOpen ? 'white' : 'inherit'
                    }}
                    className="rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon className="h-8 w-8" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    onClick={onDelete}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'group flex items-center px-4 py-2 text-sm w-full'
                                    )}
                                >
                                    <TrashIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                    Delete
                                </div>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    onClick={onArchive}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'group flex items-center px-4 py-2 text-sm w-full'
                                    )}
                                >
                                    <ArchiveBoxIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                    {tableItemStatus === 'Archived' ? 'Active' :'Archive'}
                                </div>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default Dropdown;
