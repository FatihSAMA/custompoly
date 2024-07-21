import { Field, ErrorMessage } from "formik";

export default function Input({ name, type, error, touched, placeholder, label, value }) {

    const inputClass = error && touched ? "input ring-red-600" 
        : !error && touched ? "input ring-green-600" 
        : "input"

    return (
        <div className="flex flex-col w-full">
            <label htmlFor={name} className={error && touched ? "text-red-600" : "text-primary"}>{label}</label>
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
