import { useRef, useEffect, forwardRef, useImperativeHandle } from "react"

const PlaceCards1 = forwardRef(({ values }, ref) => {
    
    const texts = [
        {
            text: values.empty2Text,
            x: 1308,
            y: 810,
        },

        {
            text: values.empty3Text,
            x: 2071,
            y: 810,
        },
        {
            text: values.station1Text,
            x: 2834,
            y: 750,
        },
        {
            text: values.station2Text,
            x: 3597,
            y: 750,
        },
        {
            text: values.station3Text,
            x: 4360,
            y: 750,
        },
        {
            text: values.station4Text,
            x: 5123,
            y: 750,
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
        img.src = "place2.jpg"

        img.onload = () => {

            canvas.width = img.width
            canvas.height = img.height

            ctx.globalCompositeOperation = "destination-over"
            ctx.fillStyle = values.boardColor
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.globalCompositeOperation = "source-over"
            ctx.drawImage(img, 0, 0, img.width, img.height)

            
            
            // darkblue 2
            ctx.save()
            ctx.beginPath()
            ctx.rect(545 - 450 / 2, 483 - 150 / 2, 450, 150)
            ctx.clip()
            ctx.translate(545, 483+30)
            ctx.font = `900 50px ${values.fontFamily}`
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillStyle = "#fff"
            wrapText(ctx, values.darkBlueText2.toUpperCase(), 0, 0, 450, 50, 150);
            ctx.restore()

            // Yazıları ekle
            texts.forEach(({ text, x, y, maxWidth=480, maxHeight=100 }) => {
                ctx.save()

                ctx.beginPath()
                ctx.rect(x - maxWidth / 2, y - maxHeight / 2, maxWidth, maxHeight)
                ctx.clip()

                // bg
                // ctx.fillStyle = "#ddd"; 
                // ctx.fillRect(x - maxWidth / 2, y - maxHeight / 2, maxWidth, maxHeight);

                ctx.translate(x, y)
                ctx.font = `900 45px ${values.fontFamily}`
                ctx.textAlign = "center"
                ctx.textBaseline = "middle"
                ctx.fillStyle = "#000"

                wrapText(ctx, text.toUpperCase(), 0, 0, maxWidth, 60, maxHeight);
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

export default PlaceCards1
