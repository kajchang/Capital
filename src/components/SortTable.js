import React, { createElement, useState } from 'react';
import { Table } from 'reactstrap';

const SortTable = ({ data, initialSortType, footer, style }) => {
    const { columns, rows, comparisons, customComponents } = data;

    const [sortType, setSortType] = useState(initialSortType || [columns[0].key, 'asc']);

    const sort = sortType => (a, b) => comparisons[sortType[0]](a[sortType[0]], b[sortType[0]]) * (sortType[1] === 'asc' ? 1 : -1);

    return (
        <Table style={ style }>
            <thead>
                <tr>
                    {
                        columns.map(({ name, key }, idx) => <th key={ idx }>
                            { name }
                            <span style={ { opacity: sortType[0] === key && sortType[1] === 'desc' ? 0.5 : 1, cursor: 'pointer' } } onClick={ () => setSortType([key, 'asc']) }>▲</span>
                            <span style={ { opacity: sortType[0] === key && sortType[1] === 'desc' ? 1 : 0.5, cursor: 'pointer' } } onClick={ () => setSortType([key, 'desc']) }>▼</span>
                        </th>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    rows
                        .sort(sort(sortType))
                        .map((row, idx) => <tr key={ idx }>
                            {
                                columns.map((column, idx) => <td key={ idx }>
                                    { customComponents[column.key] !== undefined ? createElement(customComponents[column.key], { row }) : row[column.key] }
                                </td>)
                            }
                        </tr>)
                }
                {
                    footer ? createElement(footer, { data }) : null
                }
            </tbody>
        </Table>
    );
};

export default SortTable;
