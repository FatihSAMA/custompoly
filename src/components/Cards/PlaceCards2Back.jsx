import { useRef, useEffect, forwardRef, useImperativeHandle } from "react"

const PlaceCards2Back = forwardRef(({ values }, ref) => {
    
    const texts = [
        {
            text: values.station4Text,
            x: 545,
            y: 1115,
        },
        {
            text: values.station3Text,
            x: 1308,
            y: 1115,
        },
        {
            text: values.station2Text,
            x: 2071,
            y: 1115,
        },
        {
            text: values.station1Text,
            x: 2834,
            y: 1115,
        },
        {
            text: values.empty3Text,
            x: 3597,
            y: 1115,
        },
        {
            text: values.empty2Text,
            x: 4360,
            y: 1115,
        },
        {
            text: values.darkBlueText2,
            x: 5123,
            y: 1115,
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
        img.src = "place2back.jpg"

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

export default PlaceCards2Back
