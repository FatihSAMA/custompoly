import { useRef, useEffect, forwardRef, useImperativeHandle } from "react"

const PlaceCards1Back = forwardRef(({ values }, ref) => {
    
    const texts = [
        {
            text: values.pinkText2,
            x: 545,
            y: 1115,
        },
        {
            text: values.pinkText1,
            x: 1308,
            y: 1115,
        },
        {
            text: values.blueText3,
            x: 2071,
            y: 1115,
        },
        {
            text: values.blueText2,
            x: 2834,
            y: 1115,
        },
        {
            text: values.blueText1,
            x: 3597,
            y: 1115,
        },
        {
            text: values.brownText2,
            x: 4360,
            y: 1115,
        },
        {
            text: values.brownText1,
            x: 5123,
            y: 1115,
        },


        {
            text: values.redText3,
            x: 545,
            y: 2235,
        },
        {
            text: values.redText2,
            x: 1308,
            y: 2235,
        },
        {
            text: values.redText1,
            x: 2071,
            y: 2235,
        },
        {
            text: values.orangeText3,
            x: 2834,
            y: 2235,
        },
        {
            text: values.orangeText2,
            x: 3597,
            y: 2235,
        },
        {
            text: values.orangeText1,
            x: 4360,
            y: 2235,
        },
        {
            text: values.pinkText3,
            x: 5123,
            y: 2235,
        },


        {
            text: values.darkBlueText1,
            x: 545,
            y: 3355,
        },
        {
            text: values.greenText3,
            x: 1308,
            y: 3355,
        },
        {
            text: values.greenText2,
            x: 2071,
            y: 3355,
        },

        {
            text: values.greenText1,
            x: 2834,
            y: 3355,
        },
        {
            text: values.yellowText3,
            x: 3597,
            y: 3355,
        },
        {
            text: values.yellowText2,
            x: 4360,
            y: 3355,
        },

        {
            text: values.yellowText1,
            x: 5123,
            y: 3355,
        },

        

    ]

    const canvasRef = useRef(null)

    useImperativeHandle(ref, () => ({
        getCanvasImage: () => {
            const canvas = canvasRef.current
            if(!canvas) return null
            
            const dataUrl = canvas.toDataURL("image/png")

            return dataUrl
        }
    }))

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        const img = new Image()
        img.src = "place1back.jpg"

        img.onload = () => {

            canvas.width = img.width
            canvas.height = img.height

            ctx.globalCompositeOperation = "destination-over"
            ctx.fillStyle = values.boardColor
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.globalCompositeOperation = "source-over"
            ctx.drawImage(img, 0, 0, img.width, img.height)

            // Yazıları ekle
            texts.forEach(({ text, x, y, maxWidth=450, maxHeight=150 }) => {
                ctx.save()

                ctx.beginPath()
                ctx.rect(x - maxWidth / 2, y - maxHeight / 2, maxWidth, maxHeight)
                ctx.clip()

                // bg
                // ctx.fillStyle = "#000"; 
                // ctx.fillRect(x - maxWidth / 2, y - maxHeight / 2, maxWidth, maxHeight);

                // +30 sonradan ekledim
                ctx.translate(x, y+30)
                ctx.font = `900 50px ${values.fontFamily}`
                ctx.textAlign = "center"
                ctx.textBaseline = "middle"
                ctx.fillStyle = "#fff"

                wrapText(ctx, text.toUpperCase(), 0, 0, maxWidth, 55, maxHeight);
                ctx.restore()
            })
        }

    }, [values])

    const wrapText = (ctx, text, x, y, maxWidth, lineHeight, maxHeight) => {
        const words = text.split(' ')
        let line = ''
        const lines = []

        words.forEach(word => {
            let testLine = line + word + ' '
            let metrics = ctx.measureText(testLine)
            let testWidth = metrics.width
            if (testWidth > maxWidth && line !== '') {
                lines.push(line)
                line = word + ' '
            } else {
                line = testLine
            }
        });
        lines.push(line)

        const totalTextHeight = lines.length * lineHeight;
        const startY = y - totalTextHeight / 2

        for (let i = 0; i < lines.length; i++) {
            if (startY + i * lineHeight <= maxHeight / 2) {
                ctx.fillText(lines[i], x, startY + i * lineHeight)
            } else {
                break
            }
        }
    }

    return (
        <canvas ref={canvasRef} className="w-full hidden" />
    )
})

export default PlaceCards1Back
