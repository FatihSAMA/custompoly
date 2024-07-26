import { Form, Formik } from "formik"
import goldValidationSchema from "./Validation"
import Input from "../Input"
import { useState } from "react"
import classNames from "classnames"

const initialValues = {
    step: 1,
    laststep: 24,

    // Step 1
    email: "",
    gameName: "",

    // Step 2
    images: [],
    imageError: "",

    // Step 3
    moneyImages : [],
    moneyImageError : "",

    
    // Step 4 (Gameboard Customization)
    boardColor : "#CCE3C7",

    fontFamily : "Aaux Next",
    // Step 5 
    startText : "GO",
    startTextSize : "6xl",
    startText2 : "COLLECT $200 SALARY AS YOU PASS",

    // Step 6
    brownText1 : "Text 1",
    chestText : "TREASURE TEXT",
    brownText2 : "Text 2",
    
    // Step 7
    empty1Text : "INCOME TAX",
    empty1Image : "",

    // Step 8
    station1Text : "STATION TEXT",

    // Step 9
    blueText1 : "Text 1",
    blueText2 : "Text 2",
    chanceText : "CHANCE",
    blueText3 : "Text 3",

    // Step 10
    leftCornerText1 : "JAIL",
    leftCornerText2 : "VISITOR",
    leftCornerImage : "",

    // Step 11
    pinkText1 : "Text 1",
    pinkText2 : "Text 2",
    empty2Text : "TEST",
    empty2Image : "",
    pinkText3 : "Text 3",

    // Step 12
    station2Text : "STATION TEXT",

    // Step 13
    orangeText1 : "Text 1",
    orangeText2 : "Text 2",
    orangeText3 : "Text 3",

    // Step 14
    topLeftText1 : "FREE",
    topLeftText2 : "PARK",
    topLeftImage : "",
    topLeftTextSize : "4xl",

    // Step 15
    redText1 : "Text 1",
    redText2 : "Text 2",
    redText3 : "Text 3",

    // Step 16
    station3Text : "STATION TEXT",

    // Step 17
    yellowText1 : "Text 1",
    yellowText2 : "Text 2",
    empty3Text : "TEST",
    empty3Image : "",
    yellowText3 : "Text 3",
    
    // Step 18
    topRightText1 : "GO TO",
    topRightText2 : "JAIL",
    topRightImage : "",
    topRightTextSize : "4xl",

    // Step 19
    greenText1 : "Text 1",
    greenText2 : "Text 2",
    greenText3 : "Text 3",

    // Step 20
    station4Text : "STATION TEXT",

    // Step 21
    darkBlueText1 : "Text 1",
    empty4Text : "TEST",
    empty4Image : "",
    darkBlueText2 : "Text 2",

    // Gameboard Customization End


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
                            
                            {/* Email Game Name */}
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
                            
                            {/* Game Box and Board Images */}
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

                            {/* Money Images */}
                            {values.step === 3 && (
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

                            {/* Gameboard Start */}

                            {/* Game Board Color */}
                            {values.step === 4 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6">
                                    <h2 className="text-xl text-center font-bold">What color would you like the GameBoard to be?</h2>
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

                            {/* Start */}
                            {values.step === 5 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6">
                                    <div className={`relative w-[305px] h-[305px] ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className={classNames("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 font-bold z-10 text-black w-[220px] h-[120px] text-center break-words leading-none overflow-hidden flex items-center justify-center", {
                                                "text-6xl" : values.startTextSize === "6xl",
                                                "text-5xl" : values.startTextSize === "5xl",
                                                "text-4xl" : values.startTextSize === "4xl",
                                                "text-3xl" : values.startTextSize === "3xl",
                                            })}
                                        >
                                            {values.startText}
                                        </span>
                                        <span 
                                            className="absolute top-12 left-4 text-xl -rotate-45 font-medium z-10 text-black w-[150px] text-center break-words leading-none overflow-hidden h-[80px] "
                                        >
                                            {values.startText2}
                                        </span>
                                        
                                        <img src="Gameboard/start.png" alt="" className="w-[305px] h-[305px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="startText"
                                            type="text"
                                            error={errors.startText}
                                            touched={touched.startText}
                                            placeholder="Please Enter Text"
                                            label="Text (e.g. Start, Lets go)"
                                            value={values.startText}
                                        />

                                        <div className="flex flex-col w-full mt-2">
                                            <label htmlFor="startTextSize">
                                                Font Size
                                            </label>
                                            <select 
                                                name="startTextSize" 
                                                id="startTextSize" 
                                                value={values.startTextSize} 
                                                onChange={(e) => setFieldValue("startTextSize", e.target.value)} 
                                                className="p-2 border border-gray-300 rounded-md"  
                                            >
                                                <option value="6xl">Large</option>
                                                <option value="5xl">Medium</option>
                                                <option value="4xl">Small</option>
                                                <option value="3xl">XS</option>
                                            </select>

                                        </div>

                                        <Input 
                                            name="startText2"
                                            type="text"
                                            error={errors.startText2}
                                            touched={touched.startText2}
                                            placeholder="Please Enter Text"
                                            label="Second Text"
                                            value={values.startText2}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Brown and Chest */}
                            {values.step === 6 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6">
                                    <div className={`relative w-[330px] h-[195px] ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-14 right-3 text-base z-10 text-black text-center break-words leading-none overflow-hidden h-[50px] w-[90px] "
                                        >
                                            {values.brownText1}
                                        </span>
                                        <span 
                                            className="absolute top-5 left-[120px] text-sm font-medium z-10 text-black text-center break-words leading-none overflow-hidden w-[90px] h-[58px]  "
                                        >
                                            {values.chestText}
                                        </span>
                                        <span 
                                            className="absolute top-14 left-3 text-base z-10 text-black text-center break-words leading-none overflow-hidden h-[50px] w-[90px] "
                                        >
                                            {values.brownText2}
                                        </span>
                                        
                                        <img src="Gameboard/brown.png" alt="" className="w-[330px] h-[195px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="brownText1"
                                            type="text"
                                            error={errors.brownText1}
                                            touched={touched.brownText1}
                                            placeholder="Please Enter Text"
                                            label="Text 1"
                                            value={values.brownText1}
                                        />
                                        <Input 
                                            name="chestText"
                                            type="text"
                                            error={errors.chestText}
                                            touched={touched.chestText}
                                            placeholder="Please Enter Text"
                                            label="Chest Text"
                                            value={values.chestText}
                                        />
                                        <Input 
                                            name="brownText2"
                                            type="text"
                                            error={errors.brownText2}
                                            touched={touched.brownText2}
                                            placeholder="Please Enter Text"
                                            label="Text 2"
                                            value={values.brownText2}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Empty 1 */}
                            {values.step === 7 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[170px] h-[293px] text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-6 left-1/2 -translate-x-1/2 text-base z-10  text-center break-words leading-none overflow-hidden h-[50px] w-[140px] "
                                        >
                                            {values.empty1Text}
                                        </span>

                                        <img src={values.empty1Image ? URL.createObjectURL(values.empty1Image) : "/Gameboard/imageIcon.png"} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[150px] max-h-[140px] " />
                                        
                                        <img src="Gameboard/empty.png" alt="" className="w-[170px] h-[293px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="empty1Text"
                                            type="text"
                                            error={errors.empty1Text}
                                            touched={touched.empty1Text}
                                            placeholder="Please Enter Text"
                                            label="Text"
                                            value={values.empty1Text}
                                        />
                                        <label htmlFor="empty1Image">
                                            Upload Image
                                        </label>
                                        <input
                                            type="file"
                                            name="empty1Image"
                                            id="empty1Image"
                                            accept="image/*"
                                            onChange={(e) => setFieldValue("empty1Image", e.target.files[0])}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Station */}
                            {values.step === 8 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[168px] h-[293px] text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-6 left-1/2 -translate-x-1/2 text-xl z-10 text-center break-words leading-none overflow-hidden h-[85px] w-[140px] "
                                        >
                                            {values.station1Text}
                                        </span>
                                        
                                        <img src="Gameboard/train.png" className="w-[168px] h-[293px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="station1Text"
                                            type="text"
                                            error={errors.station1Text}
                                            touched={touched.station1Text}
                                            placeholder="Please Enter Text"
                                            label="First Station Text"
                                            value={values.station1Text}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Blue and Chance */}
                            {values.step === 9 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6">
                                    <div className={`relative w-[330px] h-[171px] text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-14 right-2 text-sm z-10  text-center break-words leading-none overflow-hidden h-[55px] w-[70px] "
                                        >
                                            {values.blueText1}
                                        </span>

                                        <span 
                                            className="absolute top-5 right-[89px] text-sm z-10 text-center break-words leading-none overflow-hidden h-[30px] w-[70px]"
                                        >
                                            {values.chanceText}
                                        </span>

                                        <span 
                                            className="absolute top-14 left-[89px] text-sm font-medium z-10 text-center break-words leading-none overflow-hidden w-[70px] h-[55px]"
                                        >
                                            {values.blueText2}
                                        </span>

                                        <span 
                                            className="absolute top-14 left-2 text-sm z-10 text-center break-words leading-none overflow-hidden h-[55px] w-[70px]"
                                        >
                                            {values.blueText3}
                                        </span>
                                        
                                        <img src="Gameboard/blue.png" alt="" className="w-[330px] h-[171px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="blueText1"
                                            type="text"
                                            error={errors.blueText1}
                                            touched={touched.blueText1}
                                            placeholder="Please Enter Text"
                                            label="Text 1"
                                            value={values.blueText1}
                                        />
                                        <Input 
                                            name="chanceText"
                                            type="text"
                                            error={errors.chanceText}
                                            touched={touched.chanceText}
                                            placeholder="Please Enter Text"
                                            label="Chance Text"
                                            value={values.chanceText}
                                        />
                                        <Input 
                                            name="blueText2"
                                            type="text"
                                            error={errors.blueText2}
                                            touched={touched.blueText2}
                                            placeholder="Please Enter Text"
                                            label="Text 2"
                                            value={values.blueText2}
                                        />
                                        <Input 
                                            name="blueText3"
                                            type="text"
                                            error={errors.blueText3}
                                            touched={touched.blueText3}
                                            placeholder="Please Enter Text"
                                            label="Text 3"
                                            value={values.blueText3}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Left Corner */}
                            {values.step === 10 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6">
                                    <div className={`relative w-[292px] h-[293px] text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-10 left-[72px] rotate-[135deg] font-medium z-10 w-[100px] h-[20px] text-center break-words leading-none overflow-hidden text-xl"
                                        >
                                            {values.leftCornerText1}
                                        </span>
                                        <span 
                                            className="absolute top-[165px] right-2 -rotate-45 font-medium z-10 w-[100px] h-[20px] text-center break-words leading-none overflow-hidden text-xl"
                                        >
                                            {values.leftCornerText1}
                                        </span>


                                        <span 
                                            className="absolute top-[100px] -left-16 text-3xl rotate-90 font-semibold z-10 text-center leading-none overflow-hidden w-[210px] h-[30px]"
                                        >
                                            {values.leftCornerText2}
                                        </span>
                                        <span 
                                            className="absolute bottom-6 right-2 text-3xl font-semibold z-10 text-center leading-none overflow-hidden w-[210px] h-[30px]"
                                        >
                                            {values.leftCornerText2}
                                        </span>

                                        <img src={values.leftCornerImage ? URL.createObjectURL(values.leftCornerImage) : "/Gameboard/imageIcon.png"} className="absolute top-10 right-10 w-[140px] h-[140px] object-contain rotate-45 " />
                                        
                                        <img src="Gameboard/leftCorner.png" alt="" className="w-[292px] h-[293px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="leftCornerText1"
                                            type="text"
                                            error={errors.leftCornerText1}
                                            touched={touched.leftCornerText1}
                                            placeholder="Please Enter Text"
                                            label="First Text"
                                            value={values.leftCornerText1}
                                        />

                                        <label htmlFor="leftCornerImage">
                                            Upload Image
                                        </label>
                                        <input
                                            type="file"
                                            name="leftCornerImage"
                                            id="leftCornerImage"
                                            accept="image/*"
                                            onChange={(e) => setFieldValue("leftCornerImage", e.target.files[0])}
                                        />

                                        <Input 
                                            name="leftCornerText2"
                                            type="text"
                                            error={errors.leftCornerText2}
                                            touched={touched.leftCornerText2}
                                            placeholder="Please Enter Text"
                                            label="Second Text"
                                            value={values.leftCornerText2}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Pink and Empty 2 */}
                            {values.step === 11 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6">
                                    <div className={`relative w-[327px] h-[146px] text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-14 right-2 text-sm z-10  text-center break-words leading-none overflow-hidden h-[55px] w-[70px] "
                                        >
                                            {values.pinkText1}
                                        </span>

                                        <span 
                                            className="absolute top-5 right-[87px] text-sm z-10 text-center break-words leading-none overflow-hidden h-[30px] w-[70px]"
                                        >
                                            {values.empty2Text}
                                        </span>
                                        <img src={values.empty2Image ? URL.createObjectURL(values.empty2Image) : "/Gameboard/imageIcon.png"} className="absolute top-[52px] right-[86px] w-[70px] h-[64px] " />

                                        <span 
                                            className="absolute top-14 left-[88px] text-sm font-medium z-10 text-center break-words leading-none overflow-hidden w-[70px] h-[55px]"
                                        >
                                            {values.pinkText2}
                                        </span>

                                        <span 
                                            className="absolute top-14 left-1.5 text-sm z-10 text-center break-words leading-none overflow-hidden h-[55px] w-[70px]"
                                        >
                                            {values.pinkText3}
                                        </span>
                                        
                                        <img src="Gameboard/pink.png" alt="" className="w-[327px] h-[146px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="pinkText1"
                                            type="text"
                                            error={errors.pinkText1}
                                            touched={touched.pinkText1}
                                            placeholder="Please Enter Text"
                                            label="Text 1"
                                            value={values.pinkText1}
                                        />
                                        <Input 
                                            name="empty2Text"
                                            type="text"
                                            error={errors.empty2Text}
                                            touched={touched.empty2Text}
                                            placeholder="Please Enter Text"
                                            label="Text"
                                            value={values.empty2Text}
                                        />
                                        <label htmlFor="empty2Image">
                                            Upload Image
                                        </label>
                                        <input
                                            type="file"
                                            name="empty2Image"
                                            id="empty2Image"
                                            accept="image/*"
                                            onChange={(e) => setFieldValue("empty2Image", e.target.files[0])}
                                        />
                                        <Input 
                                            name="pinkText2"
                                            type="text"
                                            error={errors.pinkText2}
                                            touched={touched.pinkText2}
                                            placeholder="Please Enter Text"
                                            label="Text 2"
                                            value={values.pinkText2}
                                        />
                                        <Input 
                                            name="pinkText3"
                                            type="text"
                                            error={errors.pinkText3}
                                            touched={touched.pinkText3}
                                            placeholder="Please Enter Text"
                                            label="Text 3"
                                            value={values.pinkText3}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Station 2 */}
                            {values.step === 12 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[168px] h-[293px] text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-6 left-1/2 -translate-x-1/2 text-xl z-10 text-center break-words leading-none overflow-hidden h-[85px] w-[140px] "
                                        >
                                            {values.station2Text}
                                        </span>
                                        
                                        <img src="Gameboard/train.png" className="w-[168px] h-[293px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="station2Text"
                                            type="text"
                                            error={errors.station2Text}
                                            touched={touched.station2Text}
                                            placeholder="Please Enter Text"
                                            label="Second Station Text"
                                            value={values.station2Text}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Orange and Chest */}
                            {values.step === 13 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6">
                                    <div className={`relative w-[329px] h-[146px] ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-14 right-2 text-base z-10 text-black text-center break-words leading-none overflow-hidden h-[50px] w-[70px] "
                                        >
                                            {values.orangeText1}
                                        </span>
                                        <span 
                                            className="absolute top-5 right-[90px] text-xs font-medium z-10 text-black text-center break-words leading-none overflow-hidden w-[70px] h-[40px]  "
                                        >
                                            {values.chestText}
                                        </span>
                                        <span 
                                            className="absolute top-14 left-[88px] text-base z-10 text-black text-center break-words leading-none overflow-hidden h-[50px] w-[70px]"
                                        >
                                            {values.orangeText2}
                                        </span>
                                        <span 
                                            className="absolute top-14 left-1.5 text-base z-10 text-black text-center break-words leading-none overflow-hidden h-[50px] w-[70px]"
                                        >
                                            {values.orangeText3}
                                        </span>
                                        
                                        <img src="Gameboard/orange.png" alt="" className="w-[329px] h-[146px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="orangeText1"
                                            type="text"
                                            error={errors.orangeText1}
                                            touched={touched.orangeText1}
                                            placeholder="Please Enter Text"
                                            label="Text 1"
                                            value={values.orangeText1}
                                        />
                                        <Input 
                                            name="orangeText2"
                                            type="text"
                                            error={errors.orangeText2}
                                            touched={touched.orangeText2}
                                            placeholder="Please Enter Text"
                                            label="Text 2"
                                            value={values.orangeText2}
                                        />
                                        <Input 
                                            name="orangeText3"
                                            type="text"
                                            error={errors.orangeText3}
                                            touched={touched.orangeText3}
                                            placeholder="Please Enter Text"
                                            label="Text 3"
                                            value={values.orangeText3}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Top Left Corner */}
                            {values.step === 14 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6">
                                    <div className={`relative w-[305px] h-[305px] ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className={classNames("absolute top-10 -left-3 -rotate-45 font-bold z-10 text-black w-[150px] h-[50px] text-center break-words leading-none overflow-hidden flex items-center justify-center", {
                                                "text-5xl" : values.topLeftTextSize === "5xl",
                                                "text-4xl" : values.topLeftTextSize === "4xl",
                                                "text-3xl" : values.topLeftTextSize === "3xl",
                                                "text-2xl" : values.topLeftTextSize === "2xl",
                                                "text-xl" : values.topLeftTextSize === "xl",
                                            })}
                                        >
                                            {values.topLeftText1}
                                        </span>

                                        <img src={values.topLeftImage ? URL.createObjectURL(values.topLeftImage) : "/Gameboard/imageIcon.png"} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[180px] object-contain -rotate-45 " />

                                        <span 
                                            className={classNames("absolute bottom-10 -right-3 -rotate-45 font-bold z-10 text-black w-[150px] h-[50px] text-center break-words leading-none overflow-hidden flex items-center justify-center", {
                                                "text-5xl" : values.topLeftTextSize === "5xl",
                                                "text-4xl" : values.topLeftTextSize === "4xl",
                                                "text-3xl" : values.topLeftTextSize === "3xl",
                                                "text-2xl" : values.topLeftTextSize === "2xl",
                                                "text-xl" : values.topLeftTextSize === "xl",
                                            })}
                                        >
                                            {values.topLeftText2}
                                        </span>
                                        
                                        <img src="Gameboard/topLeftCorner.png" alt="" className="w-[305px] h-[305px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="topLeftText1"
                                            type="text"
                                            error={errors.topLeftText1}
                                            touched={touched.topLeftText1}
                                            placeholder="Please Enter Text"
                                            label="Text 1"
                                            value={values.topLeftText1}
                                        />

                                        <div className="flex flex-col w-full mt-2">
                                            <label htmlFor="topLeftTextSize">
                                                Font Size
                                            </label>
                                            <select 
                                                name="topLeftTextSize" 
                                                id="topLeftTextSize" 
                                                value={values.topLeftTextSize} 
                                                onChange={(e) => setFieldValue("topLeftTextSize", e.target.value)} 
                                                className="p-2 border border-gray-300 rounded-md"  
                                            >
                                                <option value="5xl">Large</option>
                                                <option value="4xl">Medium</option>
                                                <option value="3xl">Small</option>
                                                <option value="2xl">XS</option>
                                                <option value="xl">XXS</option>
                                            </select>
                                        </div>

                                        <label htmlFor="topLeftImage">
                                            Upload Image
                                        </label>
                                        <input
                                            type="file"
                                            name="topLeftImage"
                                            id="topLeftImage"
                                            accept="image/*"
                                            onChange={(e) => setFieldValue("topLeftImage", e.target.files[0])}
                                        />

                                        <Input 
                                            name="topLeftText2"
                                            type="text"
                                            error={errors.topLeftText2}
                                            touched={touched.topLeftText2}
                                            placeholder="Please Enter Text"
                                            label="Text 2"
                                            value={values.topLeftText2}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Red and Chance */}
                            {values.step === 15 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6">
                                    <div className={`relative w-[330px] h-[171px] text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-14 right-2 text-sm z-10  text-center break-words leading-none overflow-hidden h-[55px] w-[70px] "
                                        >
                                            {values.redText1}
                                        </span>

                                        <span 
                                            className="absolute top-5 right-[89px] text-sm z-10 text-center break-words leading-none overflow-hidden h-[30px] w-[70px]"
                                        >
                                            {values.chanceText}
                                        </span>

                                        <span 
                                            className="absolute top-14 left-[89px] text-sm font-medium z-10 text-center break-words leading-none overflow-hidden w-[70px] h-[55px]"
                                        >
                                            {values.redText2}
                                        </span>

                                        <span 
                                            className="absolute top-14 left-2 text-sm z-10 text-center break-words leading-none overflow-hidden h-[55px] w-[70px]"
                                        >
                                            {values.redText3}
                                        </span>
                                        
                                        <img src="Gameboard/red.png" alt="" className="w-[330px] h-[171px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="redText1"
                                            type="text"
                                            error={errors.redText1}
                                            touched={touched.redText1}
                                            placeholder="Please Enter Text"
                                            label="Text 1"
                                            value={values.redText1}
                                        />
                                        <Input 
                                            name="redText2"
                                            type="text"
                                            error={errors.redText2}
                                            touched={touched.redText2}
                                            placeholder="Please Enter Text"
                                            label="Text 2"
                                            value={values.redText2}
                                        />
                                        <Input 
                                            name="redText3"
                                            type="text"
                                            error={errors.redText3}
                                            touched={touched.redText3}
                                            placeholder="Please Enter Text"
                                            label="Text 3"
                                            value={values.redText3}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Station 3 */}
                            {values.step === 16 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[168px] h-[293px] text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-6 left-1/2 -translate-x-1/2 text-xl z-10 text-center break-words leading-none overflow-hidden h-[85px] w-[140px] "
                                        >
                                            {values.station3Text}
                                        </span>
                                        
                                        <img src="Gameboard/train.png" className="w-[168px] h-[293px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="station3Text"
                                            type="text"
                                            error={errors.station3Text}
                                            touched={touched.station3Text}
                                            placeholder="Please Enter Text"
                                            label="Third Station Text"
                                            value={values.station3Text}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Yellow and Empty 3 */}
                            {values.step === 17 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6">
                                    <div className={`relative w-[328px] h-[146px] text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-14 right-2 text-sm z-10  text-center break-words leading-none overflow-hidden h-[55px] w-[70px] "
                                        >
                                            {values.yellowText1}
                                        </span>

                                        <span 
                                            className="absolute top-5 left-[88px] text-sm z-10 text-center break-words leading-none overflow-hidden h-[30px] w-[70px]"
                                        >
                                            {values.empty3Text}
                                        </span>
                                        <img src={values.empty3Image ? URL.createObjectURL(values.empty3Image) : "/Gameboard/imageIcon.png"} className="absolute top-[52px] left-[88px] w-[70px] h-[64px] " />

                                        <span 
                                            className="absolute top-14 right-[88px] text-sm font-medium z-10 text-center break-words leading-none overflow-hidden w-[70px] h-[55px]"
                                        >
                                            {values.yellowText2}
                                        </span>

                                        <span 
                                            className="absolute top-14 left-1.5 text-sm z-10 text-center break-words leading-none overflow-hidden h-[55px] w-[70px]"
                                        >
                                            {values.yellowText3}
                                        </span>
                                        
                                        <img src="Gameboard/yellow.png" alt="" className="w-[328px] h-[146px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="yellowText1"
                                            type="text"
                                            error={errors.yellowText1}
                                            touched={touched.yellowText1}
                                            placeholder="Please Enter Text"
                                            label="Text 1"
                                            value={values.yellowText1}
                                        />
                                        <Input 
                                            name="yellowText2"
                                            type="text"
                                            error={errors.yellowText2}
                                            touched={touched.yellowText2}
                                            placeholder="Please Enter Text"
                                            label="Text 2"
                                            value={values.yellowText2}
                                        />
                                        <Input 
                                            name="empty3Text"
                                            type="text"
                                            error={errors.empty3Text}
                                            touched={touched.empty3Text}
                                            placeholder="Please Enter Text"
                                            label="Text"
                                            value={values.empty3Text}
                                        />
                                        <label htmlFor="empty3Image">
                                            Upload Image
                                        </label>
                                        <input
                                            type="file"
                                            name="empty3Image"
                                            id="empty3Image"
                                            accept="image/*"
                                            onChange={(e) => setFieldValue("empty3Image", e.target.files[0])}
                                        />
                                        <Input 
                                            name="yellowText3"
                                            type="text"
                                            error={errors.yellowText3}
                                            touched={touched.yellowText3}
                                            placeholder="Please Enter Text"
                                            label="Text 3"
                                            value={values.yellowText3}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Top Right Corner */}
                            {values.step === 18 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6">
                                    <div className={`relative w-[305px] h-[305px] ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className={classNames("absolute top-10 -left-3 -rotate-45 font-bold z-10 text-black w-[150px] h-[50px] text-center break-words leading-none overflow-hidden flex items-center justify-center", {
                                                "text-5xl" : values.topRightTextSize === "5xl",
                                                "text-4xl" : values.topRightTextSize === "4xl",
                                                "text-3xl" : values.topRightTextSize === "3xl",
                                                "text-2xl" : values.topRightTextSize === "2xl",
                                                "text-xl" : values.topRightTextSize === "xl",
                                            })}
                                        >
                                            {values.topRightText1}
                                        </span>

                                        <img src={values.topRightImage ? URL.createObjectURL(values.topRightImage) : "/Gameboard/imageIcon.png"} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[180px] object-contain -rotate-45 " />

                                        <span 
                                            className={classNames("absolute bottom-10 -right-3 -rotate-45 font-bold z-10 text-black w-[150px] h-[50px] text-center break-words leading-none overflow-hidden flex items-center justify-center", {
                                                "text-5xl" : values.topRightTextSize === "5xl",
                                                "text-4xl" : values.topRightTextSize === "4xl",
                                                "text-3xl" : values.topRightTextSize === "3xl",
                                                "text-2xl" : values.topRightTextSize === "2xl",
                                                "text-xl" : values.topRightTextSize === "xl",
                                            })}
                                        >
                                            {values.topRightText2}
                                        </span>
                                        
                                        <img src="Gameboard/topLeftCorner.png" alt="" className="w-[305px] h-[305px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="topRightText1"
                                            type="text"
                                            error={errors.topRightText1}
                                            touched={touched.topRightText1}
                                            placeholder="Please Enter Text"
                                            label="Text 1"
                                            value={values.topRightText1}
                                        />

                                        <div className="flex flex-col w-full mt-2">
                                            <label htmlFor="topLeftTextSize">
                                                Font Size
                                            </label>
                                            <select 
                                                name="topRightTextSize" 
                                                id="topRightTextSize" 
                                                value={values.topRightTextSize} 
                                                onChange={(e) => setFieldValue("topRightTextSize", e.target.value)} 
                                                className="p-2 border border-gray-300 rounded-md"  
                                            >
                                                <option value="5xl">Large</option>
                                                <option value="4xl">Medium</option>
                                                <option value="3xl">Small</option>
                                                <option value="2xl">XS</option>
                                                <option value="xl">XXS</option>
                                            </select>
                                        </div>

                                        <label htmlFor="topRightImage">
                                            Upload Image
                                        </label>
                                        <input
                                            type="file"
                                            name="topRightImage"
                                            id="topRightImage"
                                            accept="image/*"
                                            onChange={(e) => setFieldValue("topRightImage", e.target.files[0])}
                                        />

                                        <Input 
                                            name="topRightText2"
                                            type="text"
                                            error={errors.topRightText2}
                                            touched={touched.topRightText2}
                                            placeholder="Please Enter Text"
                                            label="Text 2"
                                            value={values.topRightText2}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Green and Chest */}
                            {values.step === 19 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6">
                                    <div className={`relative w-[329px] h-[146px] ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-14 right-2 text-base z-10 text-black text-center break-words leading-none overflow-hidden h-[50px] w-[70px] "
                                        >
                                            {values.greenText1}
                                        </span>
                                        <span 
                                            className="absolute top-14 right-[90px] text-base z-10 text-black text-center break-words leading-none overflow-hidden h-[50px] w-[70px]"
                                        >
                                            {values.greenText2}
                                        </span>
                                        <span 
                                            className="absolute top-5 left-[88px] text-xs font-medium z-10 text-black text-center break-words leading-none overflow-hidden w-[70px] h-[40px]  "
                                        >
                                            {values.chestText}
                                        </span>
                                        <span 
                                            className="absolute top-14 left-1.5 text-base z-10 text-black text-center break-words leading-none overflow-hidden h-[50px] w-[70px]"
                                        >
                                            {values.greenText3}
                                        </span>
                                        
                                        <img src="Gameboard/green.png" alt="" className="w-[329px] h-[146px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="greenText1"
                                            type="text"
                                            error={errors.greenText1}
                                            touched={touched.greenText1}
                                            placeholder="Please Enter Text"
                                            label="Text 1"
                                            value={values.greenText1}
                                        />
                                        <Input 
                                            name="greenText2"
                                            type="text"
                                            error={errors.greenText2}
                                            touched={touched.greenText2}
                                            placeholder="Please Enter Text"
                                            label="Text 2"
                                            value={values.greenText2}
                                        />
                                        <Input 
                                            name="greenText3"
                                            type="text"
                                            error={errors.greenText3}
                                            touched={touched.greenText3}
                                            placeholder="Please Enter Text"
                                            label="Text 3"
                                            value={values.greenText3}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Station 4 */}
                            {values.step === 20 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[168px] h-[293px] text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-6 left-1/2 -translate-x-1/2 text-xl z-10 text-center break-words leading-none overflow-hidden h-[85px] w-[140px] "
                                        >
                                            {values.station4Text}
                                        </span>
                                        
                                        <img src="Gameboard/train.png" className="w-[168px] h-[293px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="station4Text"
                                            type="text"
                                            error={errors.station4Text}
                                            touched={touched.station4Text}
                                            placeholder="Please Enter Text"
                                            label="Fourth Station Text"
                                            value={values.station4Text}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Dark Blue and Empty 4 and Chance */}
                            {values.step === 21 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6">
                                    <div className={`relative w-[328px] h-[146px] text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-3 right-2 text-sm z-10  text-center break-words leading-none overflow-hidden h-[24px] w-[70px] "
                                        >
                                            {values.chanceText}
                                        </span>

                                        <span 
                                            className="absolute top-14 right-[88px] text-sm font-medium z-10 text-center break-words leading-none overflow-hidden w-[70px] h-[55px]"
                                        >
                                            {values.darkBlueText1}
                                        </span>

                                        <span 
                                            className="absolute top-5 left-[88px] text-sm z-10 text-center break-words leading-none overflow-hidden h-[30px] w-[70px]"
                                        >
                                            {values.empty4Text}
                                        </span>
                                        <img src={values.empty4Image ? URL.createObjectURL(values.empty4Image) : "/Gameboard/imageIcon.png"} className="absolute top-[52px] left-[88px] w-[70px] h-[64px] " />

                                        <span 
                                            className="absolute top-14 left-1.5 text-sm z-10 text-center break-words leading-none overflow-hidden h-[55px] w-[70px]"
                                        >
                                            {values.darkBlueText2}
                                        </span>
                                        
                                        <img src="Gameboard/darkBlue.png" alt="" className="w-[328px] h-[146px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="darkBlueText1"
                                            type="text"
                                            error={errors.darkBlueText1}
                                            touched={touched.darkBlueText1}
                                            placeholder="Please Enter Text"
                                            label="Text 1"
                                            value={values.darkBlueText1}
                                        />
                                        <Input 
                                            name="empty4Text"
                                            type="text"
                                            error={errors.empty4Text}
                                            touched={touched.empty4Text}
                                            placeholder="Please Enter Text"
                                            label="Text"
                                            value={values.empty4Text}
                                        />
                                        <label htmlFor="empty4Image">
                                            Upload Image
                                        </label>
                                        <input
                                            type="file"
                                            name="empty4Image"
                                            id="empty4Image"
                                            accept="image/*"
                                            onChange={(e) => setFieldValue("empty4Image", e.target.files[0])}
                                        />
                                        <Input 
                                            name="darkBlueText2"
                                            type="text"
                                            error={errors.darkBlueText2}
                                            touched={touched.darkBlueText2}
                                            placeholder="Please Enter Text"
                                            label="Text 2"
                                            value={values.darkBlueText2}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Font Selection */}
                            {values.step > 5 && values.step < 22 && (
                                <div className="flex flex-col w-full mt-2">
                                    <label htmlFor="fontFamily">
                                        Select Font
                                    </label>
                                    <select 
                                        name="fontFamily" 
                                        id="fontFamily" 
                                        value={values.fontFamily} 
                                        onChange={(e) => setFieldValue("fontFamily", e.target.value)} 
                                        className="p-2 border border-gray-300 rounded-md"  
                                    >
                                        <option value="Aaux Next">Aaux Next</option>
                                        <option value="Aileron">Aileron</option>
                                    </select>

                                </div>
                            )}

                            {/* Gameboard End */}

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
