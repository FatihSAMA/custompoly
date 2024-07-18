import { Field, ErrorMessage } from "formik";

export default function Input({ name, type, error, touched, placeholder, label, value }) {

    const inputClass = error && touched ? "input ring-red-500" 
        : !error && touched ? "input ring-green-500" 
        : "input"

    return (
        <div className="flex flex-col">
            <label htmlFor={name} className={error && touched ? "text-red-500" : "text-primary"}>{label}</label>
            <Field
                type={type}
                name={name}
                className={inputClass}
                placeholder={placeholder}
                value={value}
            />
            <ErrorMessage name={name} component="small" className="error" />
        </div>
    )
}
