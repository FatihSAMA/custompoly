import { Form, Formik } from "formik";
import goldValidationSchema from "./Validation";
import Input from "../Input";

const initialValues = {
    step: 1,
    laststep: 12,

    // Step 1
    email: "",
    gameName: "",

    // Step 2
};

export default function GoldForm() {
    return (
        <div className="flex flex-col mt-4 gap-2 max-w-[600px] min-h-[600px] mx-auto rounded-md p-8 bg-foreground text-primary drop-shadow-box">
            <Formik
                initialValues={initialValues}
                validationSchema={goldValidationSchema}
                validateOnMount={false}
                onSubmit={(values, actions) => {
                    console.log(values);
                }}
            >
                {({ values, setFieldValue, errors, touched, isValid, dirty }) => {
                    const nextStep = () => {
                        setFieldValue("step", values.step + 1);
                    };

                    const prevStep = () => {
                        setFieldValue("step", values.step - 1);
                    };

                    return (
                        <Form className="flex flex-col gap-4 w-full h-full">
                            {values.step == 1 && (
                                <>
                                    <div className="w-full flex flex-col gap-2">
                                        <h1 className="text-3xl text-center font-bold text-amber-400">
                                            Custompoly for <br /> Gold Package
                                        </h1>
                                        <div className="h-[250px] overflow-hidden flex items-center justify-center">
                                            <img src="/custompoly.webp" alt="Custom Monopoly" className="mix-blend-multiply h-full object-contain pointer-events-none" />
                                        </div>
                                    </div>
                                    <Input
                                        name="email"
                                        type="email"
                                        error={errors.email}
                                        touched={touched.email}
                                        placeholder="Your Email Address"
                                        label="Email"
                                        value={values.email}
                                    />
                                    <Input
                                        name="gameName"
                                        type="text"
                                        error={errors.gameName}
                                        touched={touched.gameName}
                                        placeholder="Enter Game Name"
                                        label="Game Name"
                                        value={values.gameName}
                                    />
                                </>
                            )}
                            <div className="flex gap-2">
                                {values.step > 1 && (
                                    <button className="btn flex-1" onClick={() => prevStep()} type="button">
                                        Back
                                    </button>
                                )}
                                {values.step < values.laststep && (
                                    <button
                                        className="btn flex-1"
                                        disabled={!isValid || !dirty}
                                        onClick={() => nextStep()}
                                        type="button"
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}
    