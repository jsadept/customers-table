import React, {FC} from 'react';

import {CustomersList, CustomersListHeaders} from "../../types";
import {getRandomId} from "../../utils/getRandomId";
import Dropdown from "../UI/Dropdown/Dropdown";
import ShowMoreButton from "../UI/Button/ShowMoreButton";
import orderArrow from '../../assets/order-arrow.svg';
import grabIcon from '../../assets/grab-dots.svg';

interface TableProps {
    sortColumn: (sortKey: string) => void;
    onExpendAdditional: (id: string) => void;
    handleOnDrop: (e: React.DragEvent) => void;
    handleDragEnter: (e: React.DragEvent) => void;
    handleDragOver: (e: React.DragEvent) => void;
    handleDragStart: (e: React.DragEvent) => void;
    cols: CustomersListHeaders[];
    rows: CustomersList[];
    expendedId: string | undefined;
    dragOver: string;
    sortKey: string;
    order: string;

}

const Table: FC<TableProps> = (props) => {

    const {
        sortColumn,
        onExpendAdditional,
        handleOnDrop,
        handleDragEnter,
        handleDragOver,
        handleDragStart,
        cols,
        rows,
        expendedId,
        dragOver,
        sortKey,
        order
    } = props;


    return (
        <table className="min-w-full divide-y divide-gray-300 table-fixed rounded-b-xl">
            <thead className="bg-gray-50">
            <tr>
                {cols.map((column) => (
                    <th
                        scope="col"
                        className="py-3.5 pl-2 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                        id={column.id}
                        key={column.id}
                        draggable
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDrop={handleOnDrop}
                        onDragEnter={handleDragEnter}
                        style={{
                            opacity: column.id === dragOver ? 0.3 : 1,
                            border: column.id === dragOver ? '1px dashed grey' : 'none',
                            backgroundColor: column.id === dragOver ? 'grey' : 'inherit',
                            cursor: 'pointer',
                            marginRight: '120px',
                            maxWidth: '100px'
                        }}
                        onClick={() => sortColumn(column.id)}
                    >
                        <div className="flex align-bottom column-title" id={column.id}>
                            <div className="grab-icon">
                                <img src={grabIcon} alt="grab icon" />
                            </div>

                            {column.title}

                            {sortKey === column.id &&
                                <>
                                    {order === 'desc' ?
                                        <div className="flex align-bottom ml-2">
                                            <img src={orderArrow} alt="Order desc" style={{width: '10px'}} />
                                        </div>
                                        :
                                        <div className="flex align-bottom ml-2">
                                            <img src={orderArrow} alt="Order asc" style={{transform: 'rotate(180deg)', width: '10px'}} />
                                        </div>
                                    }
                                </>
                            }
                        </div>

                    </th>
                ))}
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                </th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
            {rows.map((row, index) => (
                <>
                <tr
                    style={{
                        backgroundColor: expendedId === row.id ? '#66AFFF' : (index % 2 === 0 ? '#FFFFFF' : '#FCFCFD'),
                        color: expendedId === row.id ? '#FFFFFF' : '#6E6B7B'
                    }}
                    key={row.id!+index}
                    className={expendedId === row.id ? 'is-expended' : ''}
                >
                    {Object.entries(row).map(([k, value], idx) => {
                        const currentHeader = cols[idx]?.id as keyof typeof row;
                        const currentValue = currentHeader ? row[currentHeader] : false;
                        if(!currentValue) {
                            return;
                        }
                        else return (
                            <td
                                key={row.id!+2+idx}
                                style={{
                                    opacity: cols[idx].id === dragOver ? 0.5 : 1,
                                    maxWidth: '100px'
                                }}
                                className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6"
                            >
                                {cols[idx].id === 'status' &&
                                    <span
                                        style={{
                                            backgroundColor: expendedId === row.id+'.1' ? '#007AFF' : (currentValue === 'Active' ? '#EAF9F1' : '#FDEEEE'),
                                            borderColor: expendedId === row.id+'.1' ? '#0069FF' : (currentValue === 'Active' ? '#00BF50' : '#E60000'),
                                            color: expendedId === row.id+'.1' ? '#FFFFFF' : (currentValue === 'Active' ? '#00BF50' : '#E60000'),
                                            borderWidth: '1px',
                                            borderStyle: 'solid',
                                            borderRadius: '30px',
                                            minWidth: '65px'
                                        }}
                                        className="text-xs inline-block py-1 leading-none text-center whitespace-nowrap align-baseline font-bold">
                                        <>{row[cols[idx].id as keyof typeof row]}</>
                                    </span>
                                }

                                {cols[idx].id === 'since' &&
                                    <>{new Date(row[cols[idx].id as keyof typeof row] as Date).toLocaleDateString('en-us', { year:"numeric", month:"short", day: "numeric"})}</>
                                }

                                {cols[idx].id !== 'status' && cols[idx].id !== 'since' &&
                                    <>{row[cols[idx].id as keyof typeof row]}</>
                                }
                            </td>
                        )
                    })
                    }
                    <td
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            height: '100%'
                        }}
                        className="py-4 pr-3 pl-4"
                    >
                        <div style={{cursor: 'pointer'}} onClick={() => onExpendAdditional(row.id!)}><ShowMoreButton expendedId={expendedId!} itemId={row.id+'.1'} /></div>
                        <div className="ml-4 flex align-bottom"><Dropdown tableItemId={row.id} tableItemStatus={row.status} expendedId={expendedId!} itemId={row.id+'.1'}/></div>
                    </td>
                </tr>
                <tr key={row.id!+'.1'} id={row.id!+1} style={{
                    maxHeight: expendedId === row.id ? '100%' : 0,
                    transition: 'max-height 0.15s ease-out',
                    lineHeight: expendedId === row.id ? '100%' : 0,
                    opacity: expendedId === row.id ? '100%' : 0,
                    display: expendedId === row.id ? 'table-row' : 'none',
                }}
                    className={expendedId === row.id ? 'is-expended' : ''}
                >
                    <td
                        style={{padding: expendedId === row.id ? '16px 26px 30px' : '0'}}
                        colSpan={cols.length-1}
                    >
                        <div className='relative h-44'>
                            <div className='absolute left-0 right-0 top-0 bottom-0'>
                                <div className='flex'>
                                    <div className="mr-32 mb-4">
                                        <h5 className='additional__title'>
                                            Client
                                        </h5>
                                        <p className='additional__text'>
                                            {row.client}
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className='additional__title'>
                                            Main Contact
                                        </h5>
                                        <p className='additional__text'>
                                            {row.additional?.main_contact.first_name} {row.additional?.main_contact.last_name || 'unknown'}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <h5 className='additional__title'>
                                        Notes

                                    </h5>

                                    <p className='additional__text'>
                                        {row.additional?.notes || 'unknown'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td
                        style={{padding: expendedId === row.id ? '16px 26px 30px' : '0'}}
                        colSpan={2}
                    >
                        <div className='flex h-full justify-end'>
                            <div className='additional__price'>
                                <div className='additional__price-text'>Total Earning</div>
                                <div className="additional__price-money">{row.total_earnings}</div>
                            </div>
                            <div className="additional__status">
                            <span
                                style={{
                                    backgroundColor: row.status === 'Active' ? '#EAF9F1' : '#FDEEEE',
                                    borderColor: row.status === 'Active' ? '#00BF50' : '#E60000',
                                    color: row.status === 'Active' ? '#00BF50' : '#E60000',
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    borderRadius: '30px',
                                    minWidth: '65px'
                                }}
                                className="text-xs inline-block py-1 leading-none text-center whitespace-nowrap align-baseline font-bold">
                                        <>{row.status}</>
                                    </span>
                            </div>
                        </div>

                    </td>

                </tr>
                </>
            ))}
            </tbody>
        </table>
    )
};

export default Table;
