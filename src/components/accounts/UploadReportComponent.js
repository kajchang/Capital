import React, { useRef } from 'react';
import { FormGroup, Label, FormText, Input } from 'reactstrap';

import { connect } from 'react-redux';

import { createTransaction } from '../../redux/actions';
import TransactionModel from '../../models/TransactionModel';

import { readFile } from 'fs';
import parse from 'csv-parse';

const UploadReportComponent = ({ createTransaction, useOnSubmit, setEnabled }) => {
    const reportRef = useRef();

    useOnSubmit(ctx => {
        console.log(ctx);
        readFile(reportRef.current.files[0].path, (err, content) => {
            if (err) return console.error(err);
            parse(content, (err, transactions) => {
                if (err) return console.error(err);
                for (let transaction of transactions) {
                    createTransaction(new TransactionModel({
                        accountId: ctx.accountId,
                        name: transaction[4],
                        created: transaction[0],
                        values: {
                            USD: parseFloat(transaction[1])
                        }
                    }));
                }
            });
        });
    });

    return (
        <FormGroup style={ { marginTop: 10, marginBottom: 10 } }>
            <Label for="wellsFargoReport">Wells Fargo Account Report</Label>
            <Input innerRef={ reportRef } onChange={ () => setEnabled(reportRef.current.files.length > 0) } type="file" id="wellsFargoReport" accept=".csv"/>
            <FormText color="muted">
                Login into Wells Fargo and then go "Download Account Activity" under "Manage Accounts" in the "Accounts" dropdown.
            </FormText>
        </FormGroup>
    );
};

const mapDispatchToProps = dispatch => ({
    createTransaction: transaction => dispatch(createTransaction(transaction))
});

export default connect(null, mapDispatchToProps)(UploadReportComponent);
