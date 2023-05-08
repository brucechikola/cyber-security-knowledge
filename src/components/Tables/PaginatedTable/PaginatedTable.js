import Column from 'components/shared/Column'
import React, { useEffect, useMemo } from 'react'
import {
    useTable,
    useGlobalFilter,
    usePagination
} from 'react-table'
import { Unique } from '../../../functions/common'
import { GlobalFilter, Pagination } from '../components/actions'
import Table from '../components/Table'
import TBody from '../components/TBody'
import TD from '../components/TD'
import TH from '../components/TH'
import THead from '../components/THead'
import TR from '../components/TR'
export default function PaginatedTable(props) {
    const columns = useMemo(() => props.columns, [props.columns])
    const { data } = props
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        page,
        pageOptions,
        prepareRow,
        state,
        setGlobalFilter,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        gotoPage,
        pageCount,
        setPageSize,
    } = useTable({ columns, data },
        useGlobalFilter,
        usePagination
    )
    const { globalFilter, pageIndex, pageSize } = state
    useEffect(() => {
        setPageSize(props.pageSize || 5)
    }, [])

    return (
        <Column className="w-full rounded">
            <div className='w-full flex items-center justify-between mb-2'>
                {props.titleContent}
                {
                    props.searchable &&
                    <div className='w-[250px]'><GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /></div>
                }
            </div>
            <Table tableProps={getTableProps()} className={`rounded w-full ${props.className}`}>
                <THead key={Unique()} className="text-gray-600">
                    {
                        headerGroups.map((headerGroup) => (
                            <TR key={Unique()} rowProps={headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <TH key={Unique()} headerProps={column.getHeaderProps()}>
                                            {column.render('Header')}
                                        </TH>
                                    ))
                                }
                            </TR>
                        ))
                    }
                </THead>
                <TBody bodyProps={getTableBodyProps()}>
                    {
                        page.map(row => {
                            prepareRow(row)
                            return (
                                <TR key={Unique()} rowProps={row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return (
                                                <TD key={Unique()} cellProps={cell.getCellProps()}>
                                                    {
                                                        cell.render('Cell')
                                                    }
                                                </TD>
                                            )

                                        })
                                    }
                                </TR>
                            )
                        })
                    }
                </TBody>
            </Table>
            <Pagination
                pageOptions={pageOptions}
                pageIndex={pageIndex}
                disablePrev={!canPreviousPage}
                disableNext={!canNextPage}
                onPrev={() => previousPage()}
                onNext={() => nextPage()}
                goToPage={gotoPage}
                pageCount={pageCount}
                pageLength={rows?.length}
            />
        </Column>
    )


}
