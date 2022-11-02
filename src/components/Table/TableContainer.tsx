import React, {ElementType, ReactElement, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {
    selectDefaultList,
    selectHeaders, selectOrder,
    selectSortedList,
    selectSortKey
} from "../../store/customersList/customersList-selector";
import {CustomersList, CustomersListHeaders} from "../../types";
import {sortListByColumn} from "../../store/customersList/customersList-slice";
import Table from "./Table";

const TableContainer = () => {

    const dispatch = useAppDispatch();
    const defaultList = useAppSelector(selectDefaultList);
    const sortedList = useAppSelector(selectSortedList);
    const headers = useAppSelector(selectHeaders);
    const sortKey = useAppSelector(selectSortKey);
    const order = useAppSelector(selectOrder);

    const [cols, setCols] = useState<CustomersListHeaders[]>(headers);
    const [rows, setRows] = useState<CustomersList[]>(defaultList);
    const [isSorted, setIsSorted] = useState<boolean>(false);
    const [dragOver, setDragOver] = useState("");
    const [expendedId, setExpendedId] = useState<string | undefined>(undefined)


    useEffect(() => {
        dispatch(sortListByColumn(''))
        setCols(headers);
        setRows(sortedList || defaultList);


        document.addEventListener('mousedown',closeOpenMenus)

        return () => {
            document.removeEventListener('mousedown',closeOpenMenus)
        }
    }, [])

    useEffect(() => {
        setRows(sortedList);
    }, [defaultList, sortedList])

    const handleDragStart = (e: React.DragEvent) => {
        const { id } = e.target as HTMLTableHeaderCellElement;
        const idx = String(cols.map(e => e.id).indexOf(id));
        e.dataTransfer.setData("colIdx", idx);
    };

    const handleDragOver = (e: React.DragEvent) => e.preventDefault();
    const handleDragEnter = (e: React.DragEvent) => {
        const { id } = e.target as HTMLTableHeaderCellElement;
        setDragOver(id);
    };

    const handleOnDrop = (e: React.DragEvent) => {
        const { id } = e.target as HTMLTableHeaderCellElement;
        const droppedColIdx = Number(cols.map(e => e.id).indexOf(id));
        const draggedColIdx = Number(e.dataTransfer.getData("colIdx"));
        const tempCols = [...cols];

        tempCols[draggedColIdx] = cols[droppedColIdx];
        tempCols[droppedColIdx] = cols[draggedColIdx];
        setCols(tempCols);
        setDragOver("");
    };

    const onExpendAdditional = (id: string) => {
        if(expendedId === id) setExpendedId(undefined)
        else setExpendedId(id);
    }

    const sortColumn = (sortKey: string) => {
        dispatch(sortListByColumn(sortKey))
        setIsSorted(true);
    }

    const closeOpenMenus = (e: Event) => {
        let target = e?.target as HTMLElement;
        if(target.closest('.is-expended') === null){
            setExpendedId(undefined)
        }
    }

    return (
        <Table
            {...{
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
            }}
        />
    )
};

export default TableContainer;
