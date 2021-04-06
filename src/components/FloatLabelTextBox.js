import React from "react";
import Form from "react-bootstrap/Form";
import "./FloatLabelTextBox.css";

export default function FloatLabelTextBox(props) {
    return (
        <>
            <div className="floating-label">
                <Form.Control
                    autoFocus={props.inputAutofocus}
                    type={props.inputType}
                    placeholder={props.inputPlaceholder}
                    value={props.inputValue}
                    name={props.inputName}
                    onChange={(e) => props.handleChangeProps(e)}
                    className={props.inputClassName}
                />
                <label>{props.inputLabel}</label>
            </div>
            <Form.Text className={props.inputClassName}>{props.inputHelperText}</Form.Text>
        </>
    );
}