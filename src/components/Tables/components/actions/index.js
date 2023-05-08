import Button from 'components/shared/Button'
import InputField from 'components/shared/InputField'
import Row from 'components/shared/Row'
import React, { useEffect, useRef, useState } from 'react'
import { BsArrowLeft, BsArrowRight, BsChevronLeft, BsChevronRight, BsSearch } from 'react-icons/bs'


// global filter
export const GlobalFilter = ({ filter, setFilter }) => {
    const inputRef = useRef()
    const [border, setBorder] = useState('gray-200')
    useEffect(() => {
        inputRef?.current?.addEventListener('focus', () => {
            setBorder('indigo-600')
        })
        inputRef?.current?.addEventListener('focusout', () => {
            setBorder('gray-200')
        })
    }, [])
    return (
        <Row className={`border border-[1.5px] border-${border} rounded-md px-3 bg-white transition duration-[100ms]`}>
            <BsSearch size={20} className={`text-${border}  transition duration-[100ms]"`} />
            <InputField
                ref={inputRef}
                className="border-0"
                value={filter || ''}
                onChange={e => setFilter(e.target.value)}
                placeholder="Search data"
            />
        </Row>
    )
}

// pagination 
export const Pagination = ({
    onPrev,
    onNext,
    disablePrev,
    disableNext,
    pageOptions,
    pageIndex,
    goToPage,
    pageCount,
    pageLength
}) => {
    return (
        <>
            {
                pageLength > 4 &&
                <Row justify="between">
                    <Row className="text-sm">
                        <span className="text-gray-500 mr-2">Page </span>
                        {pageIndex + 1}
                        <span className="text-gray-500 mx-2">Of </span>
                        {pageOptions.length}
                    </Row>
                    {/* first page */}
                    {/* <Button
                        disabled={disablePrev}
                        className="w-[50px] hover:bg-indigo-800 h-[30px] text-white mx-1 bg-indigo-900 p-1"
                        onClick={() => goToPage(0)}
                    >
                        <BsArrowLeft size={14} className="text-white" />
                    </Button> */}

                    {/* previous page */}
                    <Button
                        disabled={disablePrev}
                        className="w-[50px] hover:bg-indigo-800 h-[30px] text-white mx-1 bg-indigo-900 p-1"
                        onClick={onPrev}
                    >
                        <BsChevronLeft size={14} className="text-white" />
                    </Button>
                    {/* next page */}
                    <Button
                        minHeight="15px"
                        disabled={disableNext}
                        className="w-[50px] hover:bg-indigo-800 h-[30px] text-white mx-1 bg-indigo-900 p-1"
                        onClick={onNext}
                    >
                        <BsChevronRight size={14} className="text-white" />
                    </Button>
                    {/* <Button
                        minHeight="15px"
                        disabled={disableNext}
                        className="w-[50px] hover:bg-indigo-800 h-[30px] text-white mx-1 bg-indigo-900 p-1"
                        onClick={() => goToPage(pageCount - 1)}
                    >
                        <BsArrowRight size={14} className="text-white" />
                    </Button> */}
                </Row>
            }
        </>
    )
}

