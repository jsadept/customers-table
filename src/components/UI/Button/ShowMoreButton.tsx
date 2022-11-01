import React, {FC, useEffect, useState} from 'react';

import {ChevronUpIcon} from '@heroicons/react/24/outline'

interface ShowMoreButtonProps {
    expendedId: string;
    itemId: string;
}

const ShowMoreButton: FC<ShowMoreButtonProps> = ({expendedId, itemId}) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if(expendedId === itemId){
            setIsOpen(true);
        }
        if(isOpen){
            setIsOpen(false);
        }
    },[expendedId, itemId])
    return (
        <div
            style={{
                backgroundColor: isOpen ? '#99CAFF' : '#EEF1F2',
                borderRadius: '5px',
                width: '32px',
                height: '32px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <ChevronUpIcon
                style={{
                    color: isOpen ? '#607D8B' : '#FFFFFF',
                    width: '20px',
                    height: '15px',
                    transform: isOpen ? 'rotate(-180deg)' : 'none',
                    transition: 'all 0.4s',
                    stroke: isOpen ? '#FFFFFF' : '#607D8B',
                }}
                className="stroke-white"
                aria-hidden="true"
            />
        </div>
    );
};

export default ShowMoreButton;
