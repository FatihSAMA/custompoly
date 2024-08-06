import { useState, useRef, useEffect } from "react"
import { Form, Formik } from "formik"
import classNames from "classnames"
import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"

import client from "../../../client"
import goldValidationSchema from "./Validation"

import Input from "../Input"
import GameBoardPreview from "../Gameboard/GameboardPreview"
import PlayCard from "../Cards/PlayCards"
import PlaceCards1 from "../Cards/PlaceCards1"
import PlaceCards1Back from "../Cards/PlaceCards1Back"
import PlaceCards2 from "../Cards/PlaceCards2"
import PlaceCards2Back from "../Cards/PlaceCards2Back"
import { RotatingLines } from "react-loader-spinner"
import { color } from "framer-motion"


const initialValues = {
    step: 1,
    laststep: 46,

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
    textColor : "#000",

    fontFamily : "Aaux Next",
    // Step 5 
    startText : "GO",
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

    // Step 22
    // Gameboard Preview

    // Gameboard Customization End

    // Playing Cards Start
    fontFamily2 : "Kabel",

    // Chance Cards
    chance1 : "text here",
    chance2 : "text here",
    chance3 : "text here",
    chance4 : "text here",
    chance5 : "text here",
    chance6 : "text here",
    chance7 : "text here",
    chance8 : "text here",
    chance9 : "text here",
    chance10 : "text here",
    chance11 : "text here",
    chance12 : "text here",

    // Chest Cards
    chest1 : "text here",
    chest2 : "text here",
    chest3 : "text here",
    chest4 : "text here",
    chest5 : "text here",
    chest6 : "text here",
    chest7 : "text here",
    chest8 : "text here",
    chest9 : "text here",
    chest10 : "text here",
    chest11 : "text here",
    chest12 : "text here",

    // Playing Cards End



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
    
    const [status, setStatus] = useState(false)
    

    const gameboardRef = useRef(null)
    const playCardRef = useRef(null)
    const placeCards1Ref = useRef(null)
    const placeCards1BackRef = useRef(null)
    const placeCards2Ref = useRef(null)
    const placeCards2BackRef = useRef(null)


    
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


    const uploadImage = async (image) => {
        const timestamp = Date.now()
        const uniqueName = `${timestamp}_`
        const uploadedImage = await client.assets.upload('image', image, { filename: uniqueName })
        return {
            _type: "image",
            _key: Date.now() + "key",
            asset: {
                _type: "reference",
                _ref: uploadedImage._id
            }
        }
    }
    
    const uploadCanvas = async (dataURL) => {
       
        const response = await fetch(dataURL)
        const blob = await response.blob()
        
        
        const uniqueFilename = `gameboard_${Date.now()}.png`
        
        try {
            const uploadedImage = await client.assets.upload('image', blob, {
                filename: uniqueFilename,
            })
            
            return {
                _type: "image",
                _key: Date.now() + "key",
                asset: {
                    _type: "reference",
                    _ref: uploadedImage._id
                }
            }
        } catch (error) {
            console.error('Image upload failed:', error)
            throw new Error('Image upload failed')
        }
    }
    

    // Submit
    const handleSubmit = async (values, { resetForm }) => {

        setStatus("loading")

        try{

            const gameboardImage = gameboardRef.current.getCanvasImage()
            const uploadedGameboard = await uploadCanvas(gameboardImage)
            
            const gameCards = playCardRef.current.getCanvasImage()
            const uploadedGameCards = await uploadCanvas(gameCards)

            const placeCards1 = placeCards1Ref.current.getCanvasImage()
            const uploadedPlaceCards1 = await uploadCanvas(placeCards1)

            const placeCards1Back = placeCards1BackRef.current.getCanvasImage()
            const uploadedPlaceCards1Back = await uploadCanvas(placeCards1Back)

            const placeCards2 = placeCards2Ref.current.getCanvasImage()
            const uploadedPlaceCards2 = await uploadCanvas(placeCards2)

            const placeCards2Back = placeCards2BackRef.current.getCanvasImage()
            const uploadedPlaceCards2Back = await uploadCanvas(placeCards2Back)

            let uploadedImages = []
            if(values.images.length > 0){
                for(let img of values.images){
                    const imgRef = await uploadImage(img)
                    uploadedImages.push(imgRef)
                }
            }
    
            let uploadedMoneyImages = []
            if(values.moneyImages.length > 0){
                for(let img of values.moneyImages){
                    const imgRef = await uploadImage(img)
                    uploadedMoneyImages.push(imgRef)
                }
            }

            const uploadedEmpty1Image = await uploadImage(values.empty1Image)
            const uploadedLeftCornerImage = await uploadImage(values.leftCornerImage)
            const uploadedEmpty2Image = await uploadImage(values.empty2Image)
            const uploadedTopLeftImage = await uploadImage(values.topLeftImage)
            const uploadedEmpty3Image = await uploadImage(values.empty3Image)
            const uploadedTopRightImage = await uploadImage(values.topRightImage)
            const uploadedEmpty4Image = await uploadImage(values.empty4Image)

            const formData = {
                email: values.email,
                gameName: values.gameName,

                images: [...uploadedImages],
                moneyImages: [...uploadedMoneyImages],

                gameboardImage: uploadedGameboard,

                gameCards: uploadedGameCards,

                otherCards1: uploadedPlaceCards1,
                otherCards2: uploadedPlaceCards1Back,

                otherCards3: uploadedPlaceCards2,
                otherCards4: uploadedPlaceCards2Back,

                gameboard: {
                    startText: values.startText,
                    startText2: values.startText2,
                    brownText1: values.brownText1,
                    brownText2: values.brownText2,
                    chestText: values.chestText,
                    empty1Text: values.empty1Text,
                    empty1Image: uploadedEmpty1Image,
                    station1Text: values.station1Text,
                    blueText1: values.blueText1,
                    blueText2: values.blueText2,
                    blueText3: values.blueText3,
                    chanceText: values.chanceText,
                    leftCornerText1: values.leftCornerText1,
                    leftCornerText2: values.leftCornerText2,
                    leftCornerImage: uploadedLeftCornerImage,
                    pinkText1: values.pinkText1,
                    pinkText2: values.pinkText2,
                    pinkText3: values.pinkText3,
                    empty2Text: values.empty2Text,
                    empty2Image: uploadedEmpty2Image,
                    station2Text: values.station2Text,
                    orangeText1: values.orangeText1,
                    orangeText2: values.orangeText2,
                    orangeText3: values.orangeText3,
                    topLeftText1: values.topLeftText1,
                    topLeftText2: values.topLeftText2,
                    topLeftImage: uploadedTopLeftImage,
                    redText1: values.redText1,
                    redText2: values.redText2,
                    redText3: values.redText3,
                    station3Text: values.station3Text,
                    yellowText1: values.yellowText1,
                    yellowText2: values.yellowText2,
                    yellowText3: values.yellowText3,
                    empty3Text: values.empty3Text,
                    empty3Image: uploadedEmpty3Image,
                    topRightText1: values.topRightText1,
                    topRightText2: values.topRightText2,
                    topRightImage: uploadedTopRightImage,
                    greenText1: values.greenText1,
                    greenText2: values.greenText2,
                    greenText3: values.greenText3,
                    station4Text: values.station4Text,
                    darkBlueText1: values.darkBlueText1,
                    darkBlueText2: values.darkBlueText2,
                    empty4Text: values.empty4Text,
                    empty4Image: uploadedEmpty4Image,
                },

                chanceCards: {
                    chance1: values.chance1,
                    chance2: values.chance2,
                    chance3: values.chance3,
                    chance4: values.chance4,
                    chance5: values.chance5,
                    chance6: values.chance6,
                    chance7: values.chance7,
                    chance8: values.chance8,
                    chance9: values.chance9,
                    chance10: values.chance10,
                    chance11: values.chance11,
                    chance12: values.chance12,
                },

                chestCards: {
                    chest1: values.chest1,
                    chest2: values.chest2,
                    chest3: values.chest3,
                    chest4: values.chest4,
                    chest5: values.chest5,
                    chest6: values.chest6,
                    chest7: values.chest7,
                    chest8: values.chest8,
                    chest9: values.chest9,
                    chest10: values.chest10,
                    chest11: values.chest11,
                    chest12: values.chest12,
                },

                
            }
            
            await client.create({
                _type: "gold",
                ...formData,
            })

            toast.success("Form sent succesfuly!")
            resetForm()
            setStatus("success")


        }
        catch(err){
            console.log("Hata: ", err)
            toast.error("An error occured! Please resend form.")
            setStatus("fail")
        }

    }
      

    return (
        <div className="flex flex-col justify-center gap-2 max-w-[600px] min-h-[600px] mb-8 mx-auto mt-12 rounded-md p-8 bg-foreground text-primary drop-shadow-box">
            <Formik
                initialValues={initialValues}
                validationSchema={goldValidationSchema}
                validateOnMount={false}
                onSubmit={handleSubmit}
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
                                            onChange={(event) => {
                                                setFieldValue("boardColor", event.target.value)
                                                setFieldValue("textColor", isDarkColor(values.boardColor) ? "#fff" : "#000")
                                            }}
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
                                    <div className={`relative w-[305px] h-[305px] !uppercase ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 font-bold z-10 text-black w-[220px] h-[120px] text-center break-words leading-none overflow-hidden flex items-center justify-center text-6xl"
                                        >
                                            {values.startText}
                                        </span>
                                        <span 
                                            className="absolute top-12 left-4 -rotate-45 font-medium z-10 text-black w-[150px] text-center break-words leading-none overflow-hidden h-[80px] text-xl"
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
                                    <div className={`relative w-[330px] h-[195px] !uppercase ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
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
                                    <div className={`relative w-[170px] h-[293px] !uppercase text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
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
                                    <div className={`relative w-[168px] h-[293px] !uppercase text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
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
                                    <div className={`relative w-[330px] h-[171px] !uppercase text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-14 right-2 text-sm z-10  text-center break-words leading-none overflow-hidden h-[55px] w-[70px] "
                                        >
                                            {values.blueText1}
                                        </span>

                                        <span 
                                            className="absolute top-6 right-[89px] text-sm z-10 text-center break-words leading-none overflow-hidden h-[30px] w-[70px]"
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
                                    <div className={`relative w-[292px] h-[293px] !uppercase text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
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
                                    <div className={`relative w-[327px] h-[146px] !uppercase text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-11 right-2 text-sm z-10  text-center break-words leading-none overflow-hidden h-[55px] w-[70px] "
                                        >
                                            {values.pinkText1}
                                        </span>

                                        <span 
                                            className="absolute top-5 right-[87px] text-sm z-10 text-center break-words leading-none overflow-hidden h-[30px] w-[70px]"
                                        >
                                            {values.empty2Text}
                                        </span>
                                        <img src={values.empty2Image ? URL.createObjectURL(values.empty2Image) : "/Gameboard/imageIcon.png"} className="absolute top-[48px] right-[86px] w-[70px] h-[64px] " />

                                        <span 
                                            className="absolute top-11 left-[88px] text-sm font-medium z-10 text-center break-words leading-none overflow-hidden w-[70px] h-[55px]"
                                        >
                                            {values.pinkText2}
                                        </span>

                                        <span 
                                            className="absolute top-11 left-1.5 text-sm z-10 text-center break-words leading-none overflow-hidden h-[55px] w-[70px]"
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
                                    <div className={`relative w-[168px] h-[293px] !uppercase text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
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
                                    <div className={`relative w-[329px] h-[146px] !uppercase ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-11 right-2 text-base z-10 text-black text-center break-words leading-none overflow-hidden h-[50px] w-[70px] "
                                        >
                                            {values.orangeText1}
                                        </span>
                                        <span 
                                            className="absolute top-5 right-[90px] text-xs font-medium z-10 text-black text-center break-words leading-none overflow-hidden w-[70px] h-[40px]  "
                                        >
                                            {values.chestText}
                                        </span>
                                        <span 
                                            className="absolute top-11 left-[88px] text-base z-10 text-black text-center break-words leading-none overflow-hidden h-[50px] w-[70px]"
                                        >
                                            {values.orangeText2}
                                        </span>
                                        <span 
                                            className="absolute top-11 left-1.5 text-base z-10 text-black text-center break-words leading-none overflow-hidden h-[50px] w-[70px]"
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
                                    <div className={`relative w-[305px] h-[305px] !uppercase ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-10 -left-3 -rotate-45 font-bold z-10 text-black w-[150px] h-[50px] text-center break-words leading-none overflow-hidden flex items-center justify-center text-4xl"
                                        >
                                            {values.topLeftText1}
                                        </span>

                                        <img src={values.topLeftImage ? URL.createObjectURL(values.topLeftImage) : "/Gameboard/imageIcon.png"} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[180px] object-contain -rotate-45 " />

                                        <span 
                                            className="absolute bottom-10 -right-3 -rotate-45 font-bold z-10 text-black w-[150px] h-[50px] text-center break-words leading-none overflow-hidden flex items-center justify-center text-4xl"
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
                                    <div className={`relative w-[330px] h-[171px] !uppercase text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-14 right-2 text-sm z-10  text-center break-words leading-none overflow-hidden h-[55px] w-[70px] "
                                        >
                                            {values.redText1}
                                        </span>

                                        <span 
                                            className="absolute top-[22px] right-[89px] text-sm z-10 text-center break-words leading-none overflow-hidden h-[30px] w-[70px]"
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
                                    <div className={`relative w-[168px] h-[293px] !uppercase text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
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
                                    <div className={`relative w-[328px] h-[146px] !uppercase text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-11 right-2 text-sm z-10 text-center break-words leading-none overflow-hidden h-[55px] w-[70px] "
                                        >
                                            {values.yellowText1}
                                        </span>

                                        <span 
                                            className="absolute top-5 left-[88px] text-sm z-10 text-center break-words leading-none overflow-hidden h-[30px] w-[70px]"
                                        >
                                            {values.empty3Text}
                                        </span>
                                        <img src={values.empty3Image ? URL.createObjectURL(values.empty3Image) : "/Gameboard/imageIcon.png"} className="absolute top-[48px] left-[88px] w-[70px] h-[64px] " />

                                        <span 
                                            className="absolute top-11 right-[88px] text-sm font-medium z-10 text-center break-words leading-none overflow-hidden w-[70px] h-[55px]"
                                        >
                                            {values.yellowText2}
                                        </span>

                                        <span 
                                            className="absolute top-11 left-1.5 text-sm z-10 text-center break-words leading-none overflow-hidden h-[55px] w-[70px]"
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
                                    <div className={`relative w-[305px] h-[305px] !uppercase ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-10 -left-3 -rotate-45 font-bold z-10 text-black w-[150px] h-[50px] text-center break-words leading-none overflow-hidden flex items-center justify-center text-4xl"
                                        >
                                            {values.topRightText1}
                                        </span>

                                        <img src={values.topRightImage ? URL.createObjectURL(values.topRightImage) : "/Gameboard/imageIcon.png"} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[180px] object-contain -rotate-45 " />

                                        <span 
                                            className="absolute bottom-10 -right-3 -rotate-45 font-bold z-10 text-black w-[150px] h-[50px] text-center break-words leading-none overflow-hidden flex items-center justify-center text-4xl"
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
                                    <div className={`relative w-[329px] h-[146px] !uppercase ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-11 right-2 text-base z-10 text-black text-center break-words leading-none overflow-hidden h-[50px] w-[70px] "
                                        >
                                            {values.greenText1}
                                        </span>
                                        <span 
                                            className="absolute top-11 right-[90px] text-base z-10 text-black text-center break-words leading-none overflow-hidden h-[50px] w-[70px]"
                                        >
                                            {values.greenText2}
                                        </span>
                                        <span 
                                            className="absolute top-5 left-[88px] text-xs font-medium z-10 text-black text-center break-words leading-none overflow-hidden w-[70px] h-[40px]  "
                                        >
                                            {values.chestText}
                                        </span>
                                        <span 
                                            className="absolute top-11 left-1.5 text-base z-10 text-black text-center break-words leading-none overflow-hidden h-[50px] w-[70px]"
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
                                    <div className={`relative w-[168px] h-[293px] !uppercase text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
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
                                    <div className={`relative w-[328px] h-[146px] !uppercase text-black ${values.fontFamily === "Aaux Next" ? "font-aaux" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-3 right-2 text-sm z-10  text-center break-words leading-none overflow-hidden h-[24px] w-[70px] "
                                        >
                                            {values.chanceText}
                                        </span>

                                        <span 
                                            className="absolute top-11 right-[88px] text-sm font-medium z-10 text-center break-words leading-none overflow-hidden w-[70px] h-[55px]"
                                        >
                                            {values.darkBlueText1}
                                        </span>

                                        <span 
                                            className="absolute top-5 left-[88px] text-sm z-10 text-center break-words leading-none overflow-hidden h-[30px] w-[70px]"
                                        >
                                            {values.empty4Text}
                                        </span>
                                        <img src={values.empty4Image ? URL.createObjectURL(values.empty4Image) : "/Gameboard/imageIcon.png"} className="absolute top-[48px] left-[88px] w-[70px] h-[64px] " />

                                        <span 
                                            className="absolute top-11 left-1.5 text-sm z-10 text-center break-words leading-none overflow-hidden h-[55px] w-[70px]"
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

                            {/* Gameboard Preview */}
                            {values.step === 22 && (
                                <>
                                    <GameBoardPreview values={values} image={isDarkColor(values.boardColor) ? "white.png" : "black.png"} ref={gameboardRef} />
                                </>
                            )}

                            {/* Gameboard End */}

                            {/* Chance Cards Start */}
                            {values.step === 23 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chance1}
                                        </span>
                                        
                                        <img src="chance.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chance1"
                                            type="text"
                                            error={errors.chance1}
                                            touched={touched.chance1}
                                            placeholder="Please Enter Text"
                                            label="Chance Card 1"
                                            value={values.chance1}
                                        />
                                    </div>
                                </div>
                            )}
                            {values.step === 24 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chance2}
                                        </span>
                                        
                                        <img src="chance.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chance2"
                                            type="text"
                                            error={errors.chance2}
                                            touched={touched.chance2}
                                            placeholder="Please Enter Text"
                                            label="Chance Card 2"
                                            value={values.chance2}
                                        />
                                    </div>
                                </div>
                            )}
                            {values.step === 25 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chance3}
                                        </span>
                                        
                                        <img src="chance.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chance3"
                                            type="text"
                                            error={errors.chance3}
                                            touched={touched.chance3}
                                            placeholder="Please Enter Text"
                                            label="Chance Card 3"
                                            value={values.chance3}
                                        />
                                    </div>
                                </div>
                            )}
                            {values.step === 26 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chance4}
                                        </span>
                                        
                                        <img src="chance.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chance4"
                                            type="text"
                                            error={errors.chance4}
                                            touched={touched.chance4}
                                            placeholder="Please Enter Text"
                                            label="Chance Card 4"
                                            value={values.chance4}
                                        />
                                    </div>
                                </div>
                            )}
                            {values.step === 27 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chance5}
                                        </span>
                                        
                                        <img src="chance.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chance5"
                                            type="text"
                                            error={errors.chance5}
                                            touched={touched.chance5}
                                            placeholder="Please Enter Text"
                                            label="Chance Card 5"
                                            value={values.chance5}
                                        />
                                    </div>
                                </div>
                            )}
                            {values.step === 28 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chance6}
                                        </span>
                                        
                                        <img src="chance.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chance6"
                                            type="text"
                                            error={errors.chance6}
                                            touched={touched.chance6}
                                            placeholder="Please Enter Text"
                                            label="Chance Card 6"
                                            value={values.chance6}
                                        />
                                    </div>
                                </div>
                            )}
                            {values.step === 29 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chance7}
                                        </span>
                                        
                                        <img src="chance.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chance7"
                                            type="text"
                                            error={errors.chance7}
                                            touched={touched.chance7}
                                            placeholder="Please Enter Text"
                                            label="Chance Card 7"
                                            value={values.chance7}
                                        />
                                    </div>
                                </div>
                            )}
                            {values.step === 30 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chance8}
                                        </span>
                                        
                                        <img src="chance.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chance8"
                                            type="text"
                                            error={errors.chance8}
                                            touched={touched.chance2}
                                            placeholder="Please Enter Text"
                                            label="Chance Card 8"
                                            value={values.chance8}
                                        />
                                    </div>
                                </div>
                            )}
                            {values.step === 31 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chance9}
                                        </span>
                                        
                                        <img src="chance.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chance9"
                                            type="text"
                                            error={errors.chance9}
                                            touched={touched.chance9}
                                            placeholder="Please Enter Text"
                                            label="Chance Card 9"
                                            value={values.chance9}
                                        />
                                    </div>
                                </div>
                            )}
                            {values.step === 32 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chance10}
                                        </span>
                                        
                                        <img src="chance.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chance10"
                                            type="text"
                                            error={errors.chance10}
                                            touched={touched.chance10}
                                            placeholder="Please Enter Text"
                                            label="Chance Card 10"
                                            value={values.chance10}
                                        />
                                    </div>
                                </div>
                            )}
                            {values.step === 33 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chance11}
                                        </span>
                                        
                                        <img src="chance.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chance11"
                                            type="text"
                                            error={errors.chance11}
                                            touched={touched.chance11}
                                            placeholder="Please Enter Text"
                                            label="Chance Card 11"
                                            value={values.chance11}
                                        />
                                    </div>
                                </div>
                            )}
                            {values.step === 34 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chance12}
                                        </span>
                                        
                                        <img src="chance.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chance12"
                                            type="text"
                                            error={errors.chance12}
                                            touched={touched.chance12}
                                            placeholder="Please Enter Text"
                                            label="Chance Card 12"
                                            value={values.chance12}
                                        />
                                    </div>
                                </div>
                            )}
                            {/* Chance Cards End */}

                            {/* Chest Cards Start */}
                            {values.step === 35 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chest1}
                                        </span>
                                        
                                        <img src="chest.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chest1"
                                            type="text"
                                            error={errors.chest1}
                                            touched={touched.chest1}
                                            placeholder="Please Enter Text"
                                            label="Chest Card 1"
                                            value={values.chest1}
                                        />
                                    </div>
                                </div>
                            )}
                            {values.step === 36 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chest2}
                                        </span>
                                        
                                        <img src="chest.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chest2"
                                            type="text"
                                            error={errors.chest2}
                                            touched={touched.chest2}
                                            placeholder="Please Enter Text"
                                            label="Chest Card 2"
                                            value={values.chest2}
                                        />
                                    </div>
                                </div>
                            )}
                            {values.step === 37 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chest3}
                                        </span>
                                        
                                        <img src="chest.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chest3"
                                            type="text"
                                            error={errors.chest3}
                                            touched={touched.chest3}
                                            placeholder="Please Enter Text"
                                            label="Chest Card 3"
                                            value={values.chest3}
                                        />
                                    </div>
                                </div>
                            )}
                            {values.step === 38 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chest4}
                                        </span>
                                        
                                        <img src="chest.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chest4"
                                            type="text"
                                            error={errors.chest4}
                                            touched={touched.chest4}
                                            placeholder="Please Enter Text"
                                            label="Chest Card 4"
                                            value={values.chest4}
                                        />
                                    </div>
                                </div>
                            )}
                            {values.step === 39 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chest5}
                                        </span>
                                        
                                        <img src="chest.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chest5"
                                            type="text"
                                            error={errors.chest5}
                                            touched={touched.chest5}
                                            placeholder="Please Enter Text"
                                            label="Chest Card 5"
                                            value={values.chest5}
                                        />
                                    </div>
                                </div>
                            )}                  
                            {values.step === 40 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chest6}
                                        </span>
                                        
                                        <img src="chest.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chest6"
                                            type="text"
                                            error={errors.chest6}
                                            touched={touched.chest6}
                                            placeholder="Please Enter Text"
                                            label="Chest Card 6"
                                            value={values.chest6}
                                        />
                                    </div>
                                </div>
                            )}                         
                            {values.step === 41 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chest7}
                                        </span>
                                        
                                        <img src="chest.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chest7"
                                            type="text"
                                            error={errors.chest7}
                                            touched={touched.chest7}
                                            placeholder="Please Enter Text"
                                            label="Chest Card 7"
                                            value={values.chest7}
                                        />
                                    </div>
                                </div>
                            )}                           
                            {values.step === 42 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chest8}
                                        </span>
                                        
                                        <img src="chest.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chest8"
                                            type="text"
                                            error={errors.chest8}
                                            touched={touched.chest8}
                                            placeholder="Please Enter Text"
                                            label="Chest Card 8"
                                            value={values.chest8}
                                        />
                                    </div>
                                </div>
                            )}                           
                            {values.step === 43 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chest9}
                                        </span>
                                        
                                        <img src="chest.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chest9"
                                            type="text"
                                            error={errors.chest9}
                                            touched={touched.chest9}
                                            placeholder="Please Enter Text"
                                            label="Chest Card 9"
                                            value={values.chest9}
                                        />
                                    </div>
                                </div>
                            )}                            
                            {values.step === 44 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chest10}
                                        </span>
                                        
                                        <img src="chest.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chest10"
                                            type="text"
                                            error={errors.chest10}
                                            touched={touched.chest10}
                                            placeholder="Please Enter Text"
                                            label="Chest Card 10"
                                            value={values.chest10}
                                        />
                                    </div>
                                </div>
                            )}
                            {values.step === 45 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chest11}
                                        </span>
                                        
                                        <img src="chest.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chest11"
                                            type="text"
                                            error={errors.chest11}
                                            touched={touched.chest11}
                                            placeholder="Please Enter Text"
                                            label="Chest Card 11"
                                            value={values.chest11}
                                        />
                                    </div>
                                </div>
                            )}
                            {values.step === 46 && (
                                <div className="flex flex-col items-center h-full justify-evenly gap-6 ">
                                    <div className={`relative w-[301px] h-[202px] !uppercase text-black ${values.fontFamily2 === "Aaux Next" ? "font-aaux" : values.fontFamily2 === "Kabel" ? "font-kabel" : "font-aileron"}`}>
                                        <span 
                                            className="absolute top-[75px] left-4 text-xl font-bold z-10 text-center break-words leading-none overflow-hidden h-[100px] w-[210px] flex items-center justify-center "
                                        >
                                            {values.chest12}
                                        </span>
                                        
                                        <img src="chest.png" className="w-[301px] h-[202px] object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Input 
                                            name="chest12"
                                            type="text"
                                            error={errors.chest12}
                                            touched={touched.chest12}
                                            placeholder="Please Enter Text"
                                            label="Chest Card 12"
                                            value={values.chest12}
                                        />
                                    </div>
                                </div>
                            )}
                            {/* Chance Cards End */}


                            {/* Font Selection */}
                            {values.step > 4 && values.step < 22 && (
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
                            {values.step > 22 && values.step < 47 && (
                                <div className="flex flex-col w-full mt-2">
                                    <label htmlFor="fontFamily2">
                                        Select Font
                                    </label>
                                    <select 
                                        name="fontFamily2" 
                                        id="fontFamily2" 
                                        value={values.fontFamily2} 
                                        onChange={(e) => setFieldValue("fontFamily2", e.target.value)} 
                                        className="p-2 border border-gray-300 rounded-md"  
                                    >
                                        <option value="Aaux Next">Aaux Next</option>
                                        <option value="Aileron">Aileron</option>
                                        <option value="Kabel">Kabel</option>
                                    </select>

                                </div>
                            )}

                            {/* Hidden Canvas */}
                            <GameBoardPreview values={values} image={isDarkColor(values.boardColor) ? "white.png" : "black.png"} ref={gameboardRef} hidden={true} />
                            
                            <PlayCard values={values} ref={playCardRef} />
                            
                            <PlaceCards1 values={values} ref={placeCards1Ref} />
                            <PlaceCards1Back values={values} ref={placeCards1BackRef} />

                            <PlaceCards2 values={values} ref={placeCards2Ref} />
                            <PlaceCards2Back values={values} ref={placeCards2BackRef} />

                            {/* Hidden Canvas End */}

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
                                {values.step === values.laststep && (
                                    <button 
                                        type="submit" 
                                        className={classNames("flex-[3] flex items-center justify-center gap-2 bg-green-700 text-white rounded-md text-xl disabled:bg-opacity-25 hover:bg-green-800 group transition-all", {
                                            "opacity-50 cursor-not-allowed animate-pulse" : status === "loading"
                                        } )}
                                        disabled={(!isValid || !dirty) || status === "loading"}
                                    >
                                        Send
                                        <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-2 transition-all duration-500" width={24} height={24} viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M3 20v-6l8-2l-8-2V4l19 8z"></path>
                                        </svg>
                                    </button>
                                )}
                            </div>
                            
                        </Form>
                    )
                }}
            </Formik>

            {status === "loading" && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <RotatingLines
                    visible={true}
                    height="96"
                    width="96"
                    color="green"
                    strokeWidth="4"
                    animationDuration="1"
                    ariaLabel="rotating-lines-loading"
                    wrapperClass="bg-blue-400"
                    />
                </div>
            )}

            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}
