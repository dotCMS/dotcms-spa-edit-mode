import React from 'react';
import styled from 'styled-components';

const FormWrapper = styled.form`
    button,
    input,
    optgroup,
    select,
    textarea {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.15;
        margin: 0; /* 2 */
    }

    button,
    input {
        overflow: visible;
    }

    button,
    select {
        text-transform: none;
    }

    button,
    [type='button'],
    [type='reset'],
    [type='submit'] {
        -webkit-appearance: button;
    }

    button::-moz-focus-inner,
    [type='button']::-moz-focus-inner,
    [type='reset']::-moz-focus-inner,
    [type='submit']::-moz-focus-inner {
        border-style: none;
        padding: 0;
    }

    button:-moz-focusring,
    [type='button']:-moz-focusring,
    [type='reset']:-moz-focusring,
    [type='submit']:-moz-focusring {
        outline: 1px dotted;
    }

    fieldset {
        padding: 0.35em 0.75em 0.625em;
    }

    legend {
        box-sizing: border-box;
        color: inherit; /* 2 */
        display: table;
        max-width: 100%;
        padding: 0; /* 3 */
        white-space: normal;
    }

    progress {
        vertical-align: baseline;
    }

    textarea {
        overflow: auto;
    }

    [type='checkbox'],
    [type='radio'] {
        box-sizing: border-box;
        padding: 0; /* 2 */
    }

    [type='number']::-webkit-inner-spin-button,
    [type='number']::-webkit-outer-spin-button {
        height: auto;
    }

    [type='search'] {
        -webkit-appearance: textfield;
        outline-offset: -2px; /* 2 */
    }

    [type='search']::-webkit-search-decoration {
        -webkit-appearance: none;
    }

    ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit; /* 2 */
    }

    dot-form form input[type='text']:focus {
        border-radius: 3px;
    }
    dot-autocomplete {
        margin: 0 !important;
    }
    dot-form form input[type='text'],
    dot-autocomplete input {
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 0.4rem;
    }

    dot-textarea textarea {
        border: 1px solid #ccc;
        min-height: 250px;
        border-radius: 3px;
    }

    dot-binary-upload-button button {
        padding: 0.4rem 1rem !important;
        margin-left: 15px !important;
        border-radius: 3px !important;
    }

    #label-accept {
        display: flex;
        flex-direction: row;
        margin-right: 10px;
    }

    .hint-i-agree-to-all-terms-and-conditions-of-travellux-resort-destinations input {
        margin-top: 5px;
        margin-left: 15px;
    }
`;

const Form = ({ rendered }) => {
    return <FormWrapper dangerouslySetInnerHTML={{ __html: rendered }} />;
};

export default Form;
