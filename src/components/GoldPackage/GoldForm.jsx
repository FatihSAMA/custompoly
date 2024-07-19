import { Form, Formik } from "formik"
import goldValidationSchema from "./Validation"
import Input from "../Input"
import { useState } from "react"

const initialValues = {
    step: 1,
    laststep: 12,

    // Step 1
    email: "",
    gameName: "",

    // Step 2
    images: [],
    imageError: "",

    // Step 3
    boardColor : "#CCE3C7",

    // Step 4
    moneyImages : [],
    moneyImageError : "",

    // Step 5

}

const isDarkColor = (color = "#CCE3C7") => {
    const rgb = parseInt(color.substring(1), 16) 
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return luma < 128
}

export default function GoldForm() {
    const [dragActive, setDragActive] = useState(false)

    const handleDrag = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setDragActive(event.type === "dragenter" || event.type === "dragover")
    }

    const handleDrop = (event, setFieldValue, images, err, value, limit) => {
        event.preventDefault()
        event.stopPropagation()
        setDragActive(false)

        const files = Array.from(event.dataTransfer.files)
        if (files.length + images.length > limit) {
            setFieldValue(err, `You can upload a maximum of ${limit} images.`)
            return
        }

        setFieldValue(value, [...images, ...files])
        setFieldValue(err, "")
    }

    const handleFileChange = (event, setFieldValue, images, err, value, limit) => {
        const files = Array.from(event.target.files)

        if (files.length + images.length > limit) {
            setFieldValue(err, `You can upload a maximum of ${limit} images.`)
            return
        }

        setFieldValue(value, [...images, ...files])
        setFieldValue(err, "")
    }

    const handleFileRemove = (index, setFieldValue, images, value) => {
        const newImages = images.filter((_, i) => i !== index)
        setFieldValue(value, newImages)
    }


    return (
        <div className="flex flex-col justify-center gap-2 max-w-[600px] min-h-[600px] mb-8 mx-auto mt-12 rounded-md p-8 bg-foreground text-primary drop-shadow-box">
            <Formik
                initialValues={initialValues}
                validationSchema={goldValidationSchema}
                validateOnMount={false}
                onSubmit={(values, actions) => {
                    console.log(values)
                }}
            >
                {({ values, setFieldValue, errors, touched, isValid, dirty }) => {
                    const nextStep = () => {
                        setFieldValue("step", values.step + 1)
                    }

                    const prevStep = () => {
                        setFieldValue("step", values.step - 1)
                    }

                    return (
                        <Form className="flex flex-col justify-between w-full h-full">
                            {values.step === 1 && (
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
                            
                            {values.step === 2 && (
                                <div className="flex flex-col gap-8 h-full justify-evenly mb-2 ">
                                    <h2 className="text-xl text-center font-bold">
                                        Upload the photo or photos you want to put on the GameBox and GameBoard
                                    </h2>
                                    <div
                                        className={`flex flex-col gap-2 px-4 py-12 border-2 border-dashed rounded-md ${
                                            dragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
                                        }`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={(event) => handleDrop(event, setFieldValue, values.images, "imageError", "images", 5)}
                                    >
                                        <label htmlFor="images" className="text-primary text-center cursor-pointer flex flex-col items-center gap-4">
                                            {dragActive ? "Drop your images here" : "Drag & Drop your images here or click to upload (max 5)"}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16zm-5 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z" />
                                            </svg>
                                        </label>
                                        <input
                                            type="file"
                                            name="images"
                                            id="images"
                                            accept="image/*"
                                            multiple
                                            onChange={(event) => handleFileChange(event, setFieldValue, values.images, "imageError", "images" , 5)}
                                            className="hidden"
                                        />
                                        {values.imageError && <small className="text-red-600 text-center">{values.imageError}</small>}
                                        <div className="flex flex-wrap justify-center gap-2 mt-2">
                                            {values.images.map((image, index) => (
                                                <div key={index} className="relative h-28 w-28 overflow-hidden rounded-md bg-gray-200">
                                                    <img src={URL.createObjectURL(image)} alt={`Uploaded ${index + 1}`} className="object-cover w-full h-full" />
                                                    <button
                                                        type="button"
                                                        className="absolute top-0 right-0 flex items-center justify-center p-2 h-8 w-8 text-white bg-red-600 rounded-full hover:bg-red-500 transition-colors"
                                                        onClick={() => handleFileRemove(index, setFieldValue, values.images, "images")}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {values.step === 3 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6">
                                    <h2 className="text-xl text-center font-bold">What color would you like the GameBoard to be?                                    </h2>
                                    <div className="relative w-[300px] h-[300px] ">
                                        <span className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 opacity-40 text-zinc-400 text-xl">Preview</span>
                                        <img 
                                            src={isDarkColor(values.boardColor) ? "white.png" : "black.png"} 
                                            alt="Monopoly Game Board"
                                            className="absolute top-0 left-0 w-full h-full z-10" 
                                        />
                                        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundColor : values.boardColor }} />
                                    </div>
                                    <div className="flex gap-2.5 items-center">
                                        <label htmlFor="boardColor">Chance Color : </label>
                                        <input
                                            type="color"
                                            name="boardColor"
                                            value={values.boardColor}
                                            onChange={(event) => setFieldValue("boardColor", event.target.value)}
                                            className="w-[50px] h-[50px] cursor-pointer "
                                        />
                                        <button type="button" onClick={() => setFieldValue("boardColor", "#CCE3C7")} className=" underline flex items-center justify-center gap-1 text-red-600 hover:text-red-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 32 32">
                                            <path fill="currentColor" d="M18 28A12 12 0 1 0 6 16v6.2l-3.6-3.6L1 20l6 6l6-6l-1.4-1.4L8 22.2V16a10 10 0 1 1 10 10Z"></path>
                                        </svg>
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            {values.step === 4 && (
                                <div className="flex flex-col gap-8 h-full justify-evenly mb-2 ">
                                    <img src="money.png" alt="" />
                                    <h2 className="text-xl text-center">
                                        Please upload the photos you want to add on the money. (If you want the <b>same photo</b> as the <b>Game Box</b>, you don't need to upload it.)
                                    </h2>
                                    <div
                                        className={`flex flex-col gap-2 px-4 py-12 border-2 border-dashed rounded-md ${
                                            dragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
                                        }`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={(event) => handleDrop(event, setFieldValue, values.moneyImages, "moneyImageError", "moneyImages", 7)}
                                    >
                                        <label htmlFor="moneyImages" className="text-primary text-center cursor-pointer flex flex-col items-center gap-4">
                                            {dragActive ? "Drop your images here" : "Drag & Drop your images here or click to upload (max 7)"}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16zm-5 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z" />
                                            </svg>
                                        </label>
                                        <input
                                            type="file"
                                            name="moneyImages"
                                            id="moneyImages"
                                            accept="image/*"
                                            multiple
                                            onChange={(event) => handleFileChange(event, setFieldValue, values.moneyImages, "moneyImageError", "moneyImages", 7)}
                                            className="hidden"
                                        />
                                        {values.moneyImageError && <small className="text-red-600 text-center">{values.moneyImageError}</small>}
                                        <div className="flex flex-wrap justify-center gap-2 mt-2">
                                            {values.moneyImages.map((image, index) => (
                                                <div key={index} className="relative h-28 w-28 overflow-hidden rounded-md bg-gray-200">
                                                    <img src={URL.createObjectURL(image)} alt={`Uploaded ${index + 1}`} className="object-cover w-full h-full" />
                                                    <button
                                                        type="button"
                                                        className="absolute top-0 right-0 flex items-center justify-center p-2 h-8 w-8 text-white bg-red-600 rounded-full hover:bg-red-500 transition-colors"
                                                        onClick={() => handleFileRemove(index, setFieldValue, values.moneyImages, "moneyImages")}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            



                            {/* Buttons */}
                            <div className="flex gap-2 mt-4">
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
                    )
                }}
            </Formik>
        </div>
    )
}
