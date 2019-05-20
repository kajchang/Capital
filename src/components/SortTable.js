import React, { createElement, useState } from 'react';
import { Table } from 'reactstrap';

const SortTable = ({ data, options, initialSortType, header, footer, style }) => {
    const { columns, rows } = data;
    const { comparisons, customComponents, customHooks } = options;

    const [sortType, setSortType] = useState(initialSortType || [columns[0].key, 'asc']);

    const smartSort = (a, b) => {
        if (typeof a === 'string' && typeof b === 'string')  {
            return b.localeCompare(a);
        } else if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        } else {
            return 0;
        }
    };

    const sort = sortType => (a, b) => {
        const [sortField, sortDirection] = sortType;
        const sortFunction = comparisons[sortField] || smartSort;
        return sortFunction(a[sortField], b[sortField]) * (sortDirection === 'asc' ? -1 : 1)
    };

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
                    header ? createElement(header, { data }) : null
                }
                {
                    rows
                        .sort(sort(sortType))
                        .map((row, idx) => <tr key={ idx }>
                            {
                                columns.map((column, idx) => <td key={ idx } onClick={ (customHooks && customHooks.click) ? () => customHooks.click({ row }) : null } style={ { cursor: customHooks && customHooks.click ? 'pointer' : 'auto' } }>
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
